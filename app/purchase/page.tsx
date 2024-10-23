'use client';

import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  VStack,
  HStack,
  Flex,
  Spinner,
  Select,
} from '@chakra-ui/react';
import TranslucentBox from 'app/components/TranslucentBox';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/landNFT.sol/LandNFT.json';
import UnitNFTABI from '../../artifacts/contracts/UnitNFT.sol/UnitNFT.json';
import { useAccount } from 'wagmi';
import { LandNFT } from '../../typechain-types/contracts/landNFT.sol/LandNFT';
import { UnitNFT } from '../../typechain-types/contracts/UnitNFT.sol/UnitNFT';

enum MintOption {
  RANDOM = 0,
  ADJACENT = 1,
}

const LAND_NFT_CONTRACT = '0xbDAa58F7f2C235DD93a0396D653AEa09116F088d'; // Replace with your actual LandNFT contract address
const UNIT_NFT_CONTRACT = '0x782b9f1855d6FA94819B677c2b81D81E5CE715d9'; // Your UnitNFT contract address


export default function Purchase() {
  const { address } = useAccount(); // Get the connected user's address
  const [isMinting, setIsMinting] = useState(false);
  const [mintPrice, setMintPrice] = useState<string>('0'); // Mint price in ETH
  const [loading, setLoading] = useState(true);
  // New state variables
  const [selectedUnit, setSelectedUnit] = useState<typeof unitTypes[0] | null>(null);
  const [isMintingUnit, setIsMintingUnit] = useState(false);
  const [userLands, setUserLands] = useState<number[]>([]);
  const [selectedLand, setSelectedLand] = useState<number | null>(null);

  // Fetch mint price from the contract
  const fetchMintPrice = async () => {
    try {
      if (window.ethereum) {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as unknown as LandNFT;

        // Fetch mintPrice from the contract
        const mintPriceBN = await landNFTContract.mintPrice();
        const mintPriceEth = ethers.formatEther(mintPriceBN);

        setMintPrice(mintPriceEth);
        console.log('Mint price:', mintPriceEth);
      } else {
        alert('Please install MetaMask to interact with this feature.');
      }
    } catch (error) {
      console.error('Error fetching mint price:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLands = async () => {
    try {
      if (window.ethereum && address) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as unknown as LandNFT;
  
        const balanceBN = await landNFTContract.balanceOf(address);
        const balance = Number(balanceBN);
        const tokenIds = [];
  
        for (let i = 0; i < balance; i++) {
          const tokenIdBN = await landNFTContract.tokenOfOwnerByIndex(address, i);
          tokenIds.push(Number(tokenIdBN));
        }
  
        setUserLands(tokenIds);
        if (tokenIds.length > 0 && !selectedLand && tokenIds[0] !== undefined) {
          setSelectedLand(tokenIds[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching user lands:', error);
    }
  };
  
  useEffect(() => {
    fetchMintPrice();
    if (address) {
      fetchUserLands();
    }
  }, [address]);

  const mintNFT = async () => {
    try {
      setIsMinting(true);

      if (!window.ethereum) {
        alert('Please install MetaMask to mint an NFT');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const landNFTContract = new ethers.BaseContract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      ) as unknown as LandNFT;

      // Get mint price from the contract
      const mintPriceBN = await landNFTContract.mintPrice();

      // Set the minting option to RANDOM
      const mintOption = MintOption.RANDOM;
      const existingTokenId = 0; // Not used for RANDOM option
      const x = 0; // Not used for RANDOM option
      const y = 0; // Not used for RANDOM option

      const estimatedGas = await landNFTContract.mint.estimateGas(mintOption, existingTokenId, { value: mintPriceBN });

      // Call the mint function with required arguments and transaction overrides
      const tx = await landNFTContract.mint(
        mintOption,
        existingTokenId,
        { value: mintPriceBN,
        gasLimit: estimatedGas,
         }
      );

      console.log('Transaction sent:', tx.hash);

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      console.log('Transaction mined:', receipt);

      // Notify user of success
      alert('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      alert('Error minting NFT');
    } finally {
      setIsMinting(false);
    }
  };

  const mintUnitNFT = async () => {
    try {
      if (!selectedUnit) {
        alert('Please select a unit type to mint.');
        return;
      }
      if (!selectedLand) {
        alert('Please select a land to associate with the unit.');
        return;
      }
      setIsMintingUnit(true);
  
      if (!window.ethereum) {
        alert('Please install MetaMask to mint an NFT');
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const unitNFTContract = new ethers.Contract(
        UNIT_NFT_CONTRACT,
        UnitNFTABI.abi,
        signer
      ) as unknown as UnitNFT;
  
      // Estimate gas limit (optional)
      const estimatedGas = await unitNFTContract.mintUnit.estimateGas(
        selectedUnit.unitTypeKey,
        selectedLand
      );
  
      // Call the mintUnit function
      const tx = await unitNFTContract.mintUnit(
        selectedUnit.unitTypeKey,
        selectedLand,
        {
          gasLimit: estimatedGas,
        }
      );
  
      console.log('Transaction sent:', tx.hash);
  
      // Wait for transaction to be mined
      const receipt = await tx.wait();
  
      console.log('Transaction mined:', receipt);
  
      alert(`Successfully minted ${selectedUnit.name}!`);
    } catch (error) {
      console.error('Error minting unit NFT:', error);
      alert('Error minting unit NFT');
    } finally {
      setIsMintingUnit(false);
    }
  };
  
    // Define the unit types and their details
  const unitTypes = [
    {
      name: 'Footman',
      imageUrl: '/images/footman.webp',
      description: 'Basic melee infantry unit with balanced attack and defense.',
      unitTypeKey: 'Footman',
    },
    {
      name: 'Archer',
      imageUrl: '/images/archer.webp',
      description: 'Ranged unit with long-range attacks, effective against infantry.',
      unitTypeKey: 'Archer',
    },
    {
      name: 'Knight',
      imageUrl: '/images/knight.webp',
      description: 'Heavy cavalry with high attack power and speed.',
      unitTypeKey: 'Knight',
    },
    {
      name: 'Catapult',
      imageUrl: '/images/catapult.webp',
      description: 'Siege unit capable of area damage, effective against structures and clusters.',
      unitTypeKey: 'Catapult',
    },
    {
      name: 'Spearman',
      imageUrl: '/images/pikeman.webp',
      description: 'Anti-cavalry infantry unit with bonus damage against mounted units.',
      unitTypeKey: 'Spearman',
    },
    {
      name: 'Wizard',
      imageUrl: '/images/wizard.webp',
      description: 'Magic user capable of casting spells, effective against infantry.',
      unitTypeKey: 'Wizard',
    },
    {
      name: 'Necromancer',
      imageUrl: '/images/necromancer.webp',
      description: 'Summoner of undead units, can overwhelm enemies with numbers.',
      unitTypeKey: 'Necromancer',
    },
    {
      name: 'Goblin',
      imageUrl: '/images/dwarf.webp',
      description: 'Fast melee unit with resource-stealing abilities.',
      unitTypeKey: 'Goblin',
    },
  ];


  // NFT Details (replace with actual data or fetch from an API)
  const nftDetails = {
    imageUrl: '/images/nft-image.png', // Replace with actual image URL
    title: 'Fjunlund Land Parcel',
    description: 'Own a piece of Fjunlund and begin your adventure.',
    price: mintPrice, // ETH
  };

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <TranslucentBox textAlign="center">
          <Spinner size="xl" thickness="4px" color="secondary.500" speed="0.65s" />
          <Text fontSize="xl" mt={4}>
            Loading mint price...
          </Text>
        </TranslucentBox>
      </Flex>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" p={4}>
      <TranslucentBox bg="rgba(78, 211, 255, 0.8)">
        <Box p={8}>
          <Heading as="h2" size="lg" mb={4} color="secondary.500">
            Mint Your NFT
          </Heading>
          <HStack spacing={8} alignItems="flex-start">
            {/* Land NFT Image */}
            <Image
              src="images/Fjunland.webp"
              alt={nftDetails.title}
              boxSize="300px"
              objectFit="cover"
              borderRadius="md"
              shadow="md"
            />
            {/* Land NFT Details */}
            <VStack align="start" spacing={4}>
              <Heading as="h3" size="md" color="secondary.500">
                {nftDetails.title}
              </Heading>
              <Text>{nftDetails.description}</Text>
              <Text>
                <strong>Price:</strong> {nftDetails.price} S
              </Text>
              <Button
                colorScheme="teal"
                onClick={mintNFT}
                isLoading={isMinting}
                loadingText="Minting"
                isDisabled={!address}
              >
                {address ? 'Mint Land NFT' : 'Connect Wallet'}
              </Button>
            </VStack>
          </HStack>

          {/* Divider */}
          <Box mt={8} mb={8} borderBottom="1px solid" borderColor="gray.200" />

          {/* Unit NFT Minting Section */}
          <VStack align="start" spacing={4}>
            <Heading as="h2" size="lg" mb={4} color="secondary.500">
              Mint a Unit
            </Heading>

            {/* Land Selection */}
            {userLands.length > 0 ? (
              <Select
                placeholder="Select a land"
                value={selectedLand || ''}
                onChange={(e) => setSelectedLand(Number(e.target.value))}
              >
                {userLands.map((landId) => (
                  <option key={landId} value={landId}>
                    Land #{landId}
                  </option>
                ))}
              </Select>
            ) : (
              <Text>You need to own a Land NFT to mint units.</Text>
            )}

            {/* Unit Type Selection */}
            <Select
              placeholder="Select a unit type"
              onChange={(e) => {
                const unit = unitTypes.find((u) => u.unitTypeKey === e.target.value);
                setSelectedUnit(unit || null);
              }}
            >
              {unitTypes.map((unit) => (
                <option key={unit.unitTypeKey} value={unit.unitTypeKey}>
                  {unit.name}
                </option>
              ))}
            </Select>

            {/* Display Selected Unit Details */}
            {selectedUnit && selectedLand && (
              <VStack align="start" spacing={4}>
                <Heading as="h3" size="md" color="secondary.500">
                  {selectedUnit.name}
                </Heading>
                <Text>{selectedUnit.description}</Text>
                <Image
                  src={selectedUnit.imageUrl}
                  alt={selectedUnit.name}
                  boxSize="300px"
                  objectFit="cover"
                  borderRadius="md"
                  shadow="md"
                />
                <Button
                  colorScheme="teal"
                  onClick={mintUnitNFT}
                  isLoading={isMintingUnit}
                  loadingText="Minting"
                  isDisabled={!address || !selectedLand}
                >
                  Mint {selectedUnit.name}
                </Button>
              </VStack>
            )}
          </VStack>
        </Box>
      </TranslucentBox>
    </Box>
  );
}