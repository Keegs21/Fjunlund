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
} from '@chakra-ui/react';
import TranslucentBox from 'app/components/TranslucentBox';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/LandNFT.sol/LandNFT.json';
import { useAccount } from 'wagmi';
import { LandNFT } from '../../typechain-types/contracts/landNFT.sol/LandNFT';

enum MintOption {
  RANDOM = 0,
  ADJACENT = 1,
}

const LAND_NFT_CONTRACT = '0xf0917dB35E39B32D67A632A311bF04580557632C'; // Replace with your actual LandNFT contract address

export default function Purchase() {
  const { address } = useAccount(); // Get the connected user's address
  const [isMinting, setIsMinting] = useState(false);
  const [mintPrice, setMintPrice] = useState<string>('0'); // Mint price in ETH
  const [loading, setLoading] = useState(true);

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
      } else {
        alert('Please install MetaMask to interact with this feature.');
      }
    } catch (error) {
      console.error('Error fetching mint price:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMintPrice();
  }, []);

  const mintNFT = async () => {
    try {
      setIsMinting(true);

      if (!window.ethereum) {
        alert('Please install MetaMask to mint an NFT');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const landNFTContract = new ethers.Contract(
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

      // Call the mint function with required arguments and transaction overrides
      const tx = await landNFTContract.mint(
        mintOption,
        existingTokenId,
        x,
        y,
        { value: mintPriceBN }
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
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh" // Ensures the Box takes the full viewport height
      p={4} // Optional padding around the content
    >
      <TranslucentBox bg="rgba(78, 211, 255, 0.8)">
        <Box p={8}>
          <Heading as="h2" size="lg" mb={4} color="secondary.500">
            Mint Your NFT
          </Heading>
          <HStack spacing={8} alignItems="flex-start">
            {/* NFT Image */}
            <Image
              src="images/Fjunland.webp"
              alt={nftDetails.title}
              boxSize="300px"
              objectFit="cover"
              borderRadius="md"
              shadow="md"
            />
            {/* NFT Details */}
            <VStack align="start" spacing={4}>
              <Heading as="h3" size="md" color="secondary.500">
                {nftDetails.title}
              </Heading>
              <Text>{nftDetails.description}</Text>
              <Text>
                <strong>Price:</strong> {nftDetails.price} ETH
              </Text>
              <Button
                colorScheme="teal"
                onClick={mintNFT}
                isLoading={isMinting}
                loadingText="Minting"
                isDisabled={!address} // Disable button if wallet is not connected
              >
                {address ? 'Mint NFT' : 'Connect Wallet'}
              </Button>
            </VStack>
          </HStack>
        </Box>
      </TranslucentBox>
    </Box>
  );
}
