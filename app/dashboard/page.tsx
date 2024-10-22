'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Button,
  HStack,
  Divider,
  Image,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import TranslucentBox from 'app/components/TranslucentBox';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/landNFT.sol/LandNFT.json';
import BuildingManagerABI from '../../artifacts/contracts/BuildingManager.sol/BuildingManager.json';
import erc20abi from '../../artifacts/contracts/erc20.sol/erc20.json';
import { LandNFT, BuildingManager, IERC20 } from '../../typechain-types';

const LAND_NFT_CONTRACT = '0xbDAa58F7f2C235DD93a0396D653AEa09116F088d'; 
const BUILDING_MANAGER_CONTRACT = '0x058aBf1000EF621EEE1bf186ed76B44C8bdBe5d6';
const ERC20_CONTRACT_ADDRESS = '0x05c5ecee53692524f72e10588a787aed324de367'

export default function Dashboard() {
  const { address } = useAccount();
  const [userTokens, setUserTokens] = useState<TokenData[]>([]);
  const [buildingsInfo, setBuildingsInfo] = useState<BuildingInfo[]>([]);
  const [completingConstruction, setCompletingConstruction] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  interface ResourceProduction {
    foodPerEpoch: number;
    woodPerEpoch: number;
    stonePerEpoch: number;
    brassPerEpoch: number;
    ironPerEpoch: number;
    goldPerEpoch: number;
  }

  interface BuildingInfo {
    name: string;
    level: number;
    baseCost: {
      food: number;
      wood: number;
      stone: number;
      brass: number;
      iron: number;
      gold: number;
    };
    productionBoost: number;
    happinessBoost: number;
    technologyBoost: number;
    pietyBoost: number;
    strengthBoost: number;
    resourceProduction: ResourceProduction;
    baseConstructionTime: number;
    imageURI: string; // New field for image URI
  }

  interface TokenData {
    tokenId: number;
    landStats: {
      population: number;
      production: number;
      happiness: number;
      technology: number;
      piety: number;
      strength: number;
      resources: {
        food: number;
        wood: number;
        stone: number;
        brass: number;
        iron: number;
        gold: number;
      };
      buildings: Array<{
        name: string;
        level: number;
        isActive: boolean;
      }>;
      constructions: Array<{
        name: string;
        level: number;
        completionTime: number;
      }>;
    };
    coordinates: { x: number; y: number };
  }

  const fetchNFTData = async () => {
    try {
      if (window.ethereum && address) {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as unknown as LandNFT;
        const buildingManagerContract = new ethers.Contract(
          BUILDING_MANAGER_CONTRACT,
          BuildingManagerABI.abi,
          signer
        ) as unknown as BuildingManager;

        // Fetch the number of tokens the user owns
        const balanceBN = await landNFTContract.balanceOf(address);
        const balance = Number(balanceBN);

        const tokensData: TokenData[] = [];

        for (let i = 0; i < balance; i++) {
          const tokenIdBN = await landNFTContract.tokenOfOwnerByIndex(address, i);
          const tokenId = Number(tokenIdBN);

          // Fetch land stats for this tokenId
          const landStats = await landNFTContract.getLandStats(tokenId);

          // Fetch coordinates
          const [xBN, yBN] = await landNFTContract.getLandCoordinates(tokenId);
          const x = xBN;
          const y = yBN;
          const coordinates = { x: Number(x), y: Number(y) };

          tokensData.push({
            tokenId,
            landStats: {
              population: Number(landStats.population),
              production: Number(landStats.production),
              happiness: Number(landStats.happiness),
              technology: Number(landStats.technology),
              piety: Number(landStats.piety),
              strength: Number(landStats.strength),
              resources: {
                food: Number(landStats.resources.food),
                wood: Number(landStats.resources.wood),
                stone: Number(landStats.resources.stone),
                brass: Number(landStats.resources.brass),
                iron: Number(landStats.resources.iron),
                gold: Number(landStats.resources.gold),
              },
              buildings: landStats.buildings.map((b: any) => ({
                name: b.name,
                level: Number(b.level),
                isActive: b.isActive,
              })),
              constructions: landStats.constructions.map((c: any) => ({
                name: c.name,
                level: c.level,
                completionTime: Number(c.completionTime.toString()),
              })),
            },
            coordinates,
          });
        }

        setUserTokens(tokensData);

        // Fetch Building Info (Level 1 & 2)
        const level1Buildings = [
          'Farm',
          'Lumber Mill',
          'Quarry',
          'Iron Mine',
          'Workshop',
          'Marketplace',
          'Barracks',
          'Temple',
          'Academy',
          'Stables',
        ];
        const level2Buildings = [
          'Estate',
          'University',
          'Cathedral',
          'Sawmill',
          'Stoneworks',
          'Steelworks',
          'Factory',
          'Trading Post',
          'Fortress',
          'Cavalry School',
        ];

        const fetchBuildingInfo = async (buildingNames: string[], level: number) => {
          const buildingData: BuildingInfo[] = [];
          for (const name of buildingNames) {
            const buildingInfo = await buildingManagerContract.getBuildingInfo(name, level);
            buildingData.push({
              name,
              level,
              baseCost: {
                food: Number(buildingInfo.baseCost.food),
                wood: Number(buildingInfo.baseCost.wood),
                stone: Number(buildingInfo.baseCost.stone),
                brass: Number(buildingInfo.baseCost.brass),
                iron: Number(buildingInfo.baseCost.iron),
                gold: Number(buildingInfo.baseCost.gold),
              },
              productionBoost: Number(buildingInfo.productionBoost),
              happinessBoost: Number(buildingInfo.happinessBoost),
              technologyBoost: Number(buildingInfo.technologyBoost),
              pietyBoost: Number(buildingInfo.pietyBoost),
              strengthBoost: Number(buildingInfo.strengthBoost),
              resourceProduction: {
                foodPerEpoch: Number(buildingInfo.resourceProduction.foodPerEpoch),
                woodPerEpoch: Number(buildingInfo.resourceProduction.woodPerEpoch),
                stonePerEpoch: Number(buildingInfo.resourceProduction.stonePerEpoch),
                brassPerEpoch: Number(buildingInfo.resourceProduction.brassPerEpoch),
                ironPerEpoch: Number(buildingInfo.resourceProduction.ironPerEpoch),
                goldPerEpoch: Number(buildingInfo.resourceProduction.goldPerEpoch),
              },
              baseConstructionTime: Number(buildingInfo.baseConstructionTime),
              imageURI: buildingInfo.imageURI, // Fetch the imageURI
            });
          }
          return buildingData;
        };

        const level1BuildingData = await fetchBuildingInfo(level1Buildings, 1);
        const level2BuildingData = await fetchBuildingInfo(level2Buildings, 2);

        setBuildingsInfo([...level1BuildingData, ...level2BuildingData]);
      }
    } catch (error) {
      console.error('Error fetching NFT or building data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchNFTData();
    }
  }, [address]);

  // Helper function to format IPFS URIs
  const formatIPFS = (uri: string): string => {
    if (uri.startsWith('ipfs://')) {
      const cid = uri.replace('ipfs://', '');
      return `https://ipfs.io/ipfs/${cid}`;
    }
    return uri; // Return as-is if it's not an IPFS URI
  };

  // Function to start building construction
  function StartBuildingButton({
    building,
    tokenId,
    resources,
  }: {
    building: BuildingInfo;
    tokenId: number;
    resources: any;
  }) {
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    // Helper function to check if user can build
    const canBuild = () => {
      return (
        resources.food >= building.baseCost.food &&
        resources.wood >= building.baseCost.wood &&
        resources.stone >= building.baseCost.stone &&
        resources.brass >= building.baseCost.brass &&
        resources.iron >= building.baseCost.iron &&
        resources.gold >= building.baseCost.gold
      );
    };

    // Function to handle button click
    const handleClick = async () => {
      if (!window.ethereum) {
        toast({
          title: 'MetaMask Not Found',
          description: 'Please install MetaMask to interact with this feature.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
        return;
      }

      setIsLoading(true);

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []); // Prompt user to connect wallet
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();

        // Instantiate contracts
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as unknown as LandNFT;

        const erc20Contract = new ethers.Contract(
          ERC20_CONTRACT_ADDRESS,
          erc20abi,
          signer
        ) as unknown as IERC20;

        // Calculate ERC20 cost: gold cost * 10^8
        const erc20CostInUnits = ethers.parseUnits(building.baseCost.gold.toString(), 8);

        // Check ERC20 balance
        const balance = await erc20Contract.balanceOf(userAddress);
        if (balance < erc20CostInUnits) {
          toast({
            title: 'Insufficient ERC20 Tokens',
            description: 'You do not have enough ERC20 tokens to pay for this building.',
            status: 'error',
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
          return;
        }

        // Check ERC20 allowance
        const allowance = await erc20Contract.allowance(userAddress, LAND_NFT_CONTRACT);
        if (allowance < erc20CostInUnits) {
          // Prompt user to approve ERC20 tokens
          toast({
            title: 'Approving ERC20 Tokens',
            description: 'Please approve the required amount of ERC20 tokens for this transaction.',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });

          const approveTx = await erc20Contract.approve(LAND_NFT_CONTRACT, ethers.parseUnits('1000000', 18)); // Approving a high amount to reduce future approvals
          await approveTx.wait();

          toast({
            title: 'ERC20 Tokens Approved',
            description: 'You have successfully approved the ERC20 tokens.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }

        // Estimate gas
        const estimatedGas = await landNFTContract.startBuildingConstruction.estimateGas(tokenId, building.name, building.level);
        
        // Execute transaction
        const tx = await landNFTContract.startBuildingConstruction(
          tokenId,
          building.name,
          building.level,
          {
            gasLimit: estimatedGas, // Adding buffer to gas limit
          }
        );

        toast({
          title: 'Building Construction Started',
          description: `Transaction sent: ${tx.hash}`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        await tx.wait();

        toast({
          title: 'Building Construction Confirmed',
          description: `Your building construction for ${building.name} has been started.`,
          status: 'success',
          duration: 9000,
          isClosable: true,
        });

        // Optionally, trigger a refresh of NFT data here
        fetchNFTData();
      } catch (error: any) {
        console.error('Error starting building construction:', error);
        toast({
          title: 'Transaction Failed',
          description: error?.reason || 'An error occurred while starting building construction.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <Button
        colorScheme={canBuild() ? 'green' : 'gray'}
        isDisabled={!canBuild()}
        onClick={handleClick}
        isLoading={isLoading}
        loadingText="Processing"
        mt={4}
      >
        {canBuild() ? 'Start Building' : 'Not Enough Resources'}
      </Button>
    );
  }

  // Function to complete building construction
  const completeBuildingConstruction = async (tokenId: number) => {
    try {
      setCompletingConstruction(tokenId);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      ) as unknown as LandNFT;

      // Call the contract function to complete construction
      const tx = await landNFTContract.completeBuildingConstruction(tokenId);
      await tx.wait();

      // Refetch data after completing construction
      fetchNFTData();

      setCompletingConstruction(null);
    } catch (error) {
      console.error('Error completing construction:', error);
      setCompletingConstruction(null);
    }
  };

  const formatCompletionTime = (completionTime: number) => {
    const timeRemaining = Math.max(0, completionTime * 1000 - Date.now());
    const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const canBuild = (buildingBaseCost: any, resources: any) => {
    return (
      resources.food >= buildingBaseCost.food &&
      resources.wood >= buildingBaseCost.wood &&
      resources.stone >= buildingBaseCost.stone &&
      resources.brass >= buildingBaseCost.brass &&
      resources.iron >= buildingBaseCost.iron &&
      resources.gold >= buildingBaseCost.gold
    );
  };

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <TranslucentBox textAlign="center">
          <Spinner size="xl" thickness="4px" color="secondary.500" speed="0.65s" />
          <Text fontSize="xl" mt={4}>
            Loading blockchain data...
          </Text>
        </TranslucentBox>
      </Flex>
    );
  }

  if (!userTokens.length) {
    return (
      <Box p={8}>
        <TranslucentBox textAlign="center">
          <Text fontSize="xl" mt={4}>
            You don't own any Land NFTs.
          </Text>
        </TranslucentBox>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <Flex direction={['column', 'row']} mb={6} gap={6}>
        <TranslucentBox bg="rgba(78, 211, 255, 0.8)" flex="1">
          <Heading as="h2" size="lg" mb={4} color="secondary.500">
            Account Overview
          </Heading>
          <Flex alignItems="center" mb={6}>
            <Box>
              <Text fontSize="xl" fontWeight="bold" color="secondary.500">
                {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
              </Text>
            </Box>
          </Flex>
        </TranslucentBox>
      </Flex>

      <Divider my={6} />

      {userTokens.map((tokenData) => (
        <Box key={tokenData.tokenId} mb={8}>
          {/* NFT Card */}
          <TranslucentBox bg="rgba(78, 211, 255, 0.8)" width="100%">
            <Heading as="h2" size="lg" mb={4} color="secondary.500">
              Land NFT (Token ID: {tokenData.tokenId})
            </Heading>
            <Box
              p={4}
              borderWidth="1px"
              borderRadius="md"
              mb={4}
              borderColor="secondary.500"
            >
              <Flex
                direction={['column', 'row']}
                alignItems="center"
                justifyContent="space-between"
              >
                <Box flex="1" textAlign="center">
                  <Image
                    src="images/Fjunland.webp"
                    boxSize="300px"
                    objectFit="cover"
                    borderRadius="md"
                    shadow="md"
                  />
                </Box>

                {/* Management Column */}
                <Box flex="1" mb={[4, 0]} mr={[0, 4]}>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="md">
                      <strong>Population:</strong> {tokenData.landStats.population}
                    </Text>
                    <Text fontSize="md">
                      <strong>Production:</strong> {tokenData.landStats.production}
                    </Text>
                    <Text fontSize="md">
                      <strong>Happiness:</strong> {tokenData.landStats.happiness}
                    </Text>
                    <Text fontSize="md">
                      <strong>Technology:</strong> {tokenData.landStats.technology}
                    </Text>
                    <Text fontSize="md">
                      <strong>Piety:</strong> {tokenData.landStats.piety}
                    </Text>
                    <Text fontSize="md">
                      <strong>Strength:</strong> {tokenData.landStats.strength}
                    </Text>
                    <Text fontSize="md">
                      <strong>Coordinates:</strong> ({tokenData.coordinates.x},{' '}
                      {tokenData.coordinates.y})
                    </Text>
                  </VStack>
                </Box>

                {/* Resources Column */}
                <Box flex="1" mb={[4, 0]} ml={[0, 4]}>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="md">
                      <strong>Resources:</strong>
                    </Text>
                    <HStack align="start" spacing={10}>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm">
                          <strong>Food:</strong> {tokenData.landStats.resources.food}
                        </Text>
                        <Text fontSize="sm">
                          <strong>Wood:</strong> {tokenData.landStats.resources.wood}
                        </Text>
                        <Text fontSize="sm">
                          <strong>Stone:</strong> {tokenData.landStats.resources.stone}
                        </Text>
                      </VStack>
                      <VStack align="start" spacing={1}>
                        <Text fontSize="sm">
                          <strong>Brass:</strong> {tokenData.landStats.resources.brass}
                        </Text>
                        <Text fontSize="sm">
                          <strong>Iron:</strong> {tokenData.landStats.resources.iron}
                        </Text>
                        <Text fontSize="sm">
                          <strong>Gold:</strong> {tokenData.landStats.resources.gold}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              </Flex>
            </Box>
          </TranslucentBox>

          <Divider my={6} />

          {/* Under Construction Buildings */}
          <TranslucentBox bg="rgba(78, 211, 255, 0.8)" width="100%" mt={6}>
            <Heading as="h2" size="lg" mb={4} color="secondary.500">
              Buildings Under Construction
            </Heading>
            {tokenData.landStats.constructions.length > 0 ? (
              tokenData.landStats.constructions.map((construction: any, index: number) => (
                <Box
                  key={index}
                  mb={4}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  shadow="md"
                  width="300px"
                >
                  <Text fontSize="md">
                    <strong>
                      {construction.name} (Level {construction.level})
                    </strong>
                  </Text>
                  <Text fontSize="sm">
                    Completion Time: {formatCompletionTime(construction.completionTime)}
                  </Text>
                   {/* Complete Construction Button */}
                   <Button
                    mt={2}
                    colorScheme="teal"
                    isLoading={completingConstruction === tokenData.tokenId}
                    onClick={() => completeBuildingConstruction(tokenData.tokenId)}
                  >
                    Complete Construction
                  </Button>
                </Box>
              ))
            ) : (
              <Text fontSize="md">No buildings under construction</Text>
            )}
          </TranslucentBox>

       {/* Already Constructed Buildings */}
        <TranslucentBox bg="rgba(78, 211, 255, 0.8)" width="100%" mt={6}>
          <Heading as="h2" size="lg" mb={4} color="secondary.500">
            Constructed Buildings
          </Heading>
          {tokenData.landStats.buildings.length > 0 ? (
            <Flex wrap="wrap" gap={4}>
              {tokenData.landStats.buildings.map((building: any, index: number) => {
                // Find the corresponding building info to get the imageURI and boosts
                const buildingInfo = buildingsInfo.find(
                  (b) => b.name === building.name && b.level === building.level
                );

                // Format the image URI using the helper function
                const imageUrl = buildingInfo ? formatIPFS(buildingInfo.imageURI) : '/placeholder-image.png';

                return (
                  <Box
                    key={index}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    shadow="md"
                    width={{ base: '100%', sm: '45%', md: '30%' }}
                    bg="whiteAlpha.800"
                  >
                    <VStack align="start" spacing={3}>
                      {/* Building Image */}
                      <Image
                        src={imageUrl}
                        alt={`${building.name} Image`}
                        boxSize="100px"
                        objectFit="cover"
                        borderRadius="md"
                        shadow="sm"
                        fallback={<Spinner size="sm" />}
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-image.png'; // Path to your placeholder image
                        }}
                      />

                      {/* Building Name and Level */}
                      <Text fontSize="md">
                        <strong>
                          {building.name} (Level {building.level})
                        </strong>
                        {building.isActive ? ' - Active' : ' - Inactive'}
                      </Text>

                      {/* Production and Resource Boosts */}
                      {buildingInfo && (
                        <Box>
                          <Text fontSize="sm" color="gray.600">
                            <strong>Production Boost:</strong> {buildingInfo.productionBoost}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            <strong>Happiness Boost:</strong> {buildingInfo.happinessBoost}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            <strong>Technology Boost:</strong> {buildingInfo.technologyBoost}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            <strong>Piety Boost:</strong> {buildingInfo.pietyBoost}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            <strong>Strength Boost:</strong> {buildingInfo.strengthBoost}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            <strong>Resource Production:</strong>
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Food: {buildingInfo.resourceProduction.foodPerEpoch}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Wood: {buildingInfo.resourceProduction.woodPerEpoch}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Stone: {buildingInfo.resourceProduction.stonePerEpoch}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Brass: {buildingInfo.resourceProduction.brassPerEpoch}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Iron: {buildingInfo.resourceProduction.ironPerEpoch}
                          </Text>
                          <Text fontSize="sm" color="gray.600">
                            Gold: {buildingInfo.resourceProduction.goldPerEpoch}
                          </Text>
                        </Box>
                      )}
                    </VStack>
                  </Box>
                );
              })}
            </Flex>
          ) : (
            <Text fontSize="md">No buildings constructed</Text>
          )}
        </TranslucentBox>


          {/* Available Buildings Section */}
          <TranslucentBox bg="rgba(78, 211, 255, 0.8)" width="100%" mt={6}>
            <Heading as="h2" size="lg" mb={4} color="secondary.500">
              Available Buildings and Requirements
            </Heading>
            <Flex wrap="wrap" justifyContent="space-between" width="100%">
              {buildingsInfo.length > 0 ? (
                buildingsInfo.map((building, index) => (
                  <Box
                    key={index}
                    mb={4}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    shadow="md"
                    width="100%"
                    maxWidth="700px"
                  >
                    <VStack align="start" spacing={4} width="100%">
                      {/* Building Name and Level */}
                      <Box>
                        <Text fontSize="lg" fontWeight="bold" color="secondary.500">
                          {building.name} (Level {building.level})
                        </Text>
                      </Box>

                      {/* Building Image */}
                      {building.imageURI && (
                        <Image
                          src={formatIPFS(building.imageURI)}
                          alt={`${building.name} Image`}
                          boxSize="150px"
                          objectFit="cover"
                          borderRadius="md"
                          shadow="sm"
                          fallback={<Spinner size="sm" />}
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-image.png'; // Path to a local placeholder image
                          }}
                        />
                      )}

                      {/* Base Cost - Horizontal Layout */}
                      <HStack justifyContent="space-between" width="100%">
                        <Text fontSize="md" color="secondary.500" fontWeight="bold">
                          Base Cost:
                        </Text>
                        <HStack spacing={4}>
                          <Text fontSize="sm">Food: {building.baseCost.food}</Text>
                          <Text fontSize="sm">Wood: {building.baseCost.wood}</Text>
                          <Text fontSize="sm">Stone: {building.baseCost.stone}</Text>
                          <Text fontSize="sm">Brass: {building.baseCost.brass}</Text>
                          <Text fontSize="sm">Iron: {building.baseCost.iron}</Text>
                          <Text fontSize="sm">Gold: {building.baseCost.gold}</Text>
                        </HStack>
                      </HStack>

                      {/* Construction Time */}
                      <HStack justifyContent="space-between" width="100%">
                        <Text fontSize="md" color="secondary.500" fontWeight="bold">
                          Construction Time:
                        </Text>
                        <Text fontSize="sm">
                          {(building.baseConstructionTime / 3600).toFixed(2)} hours
                        </Text>
                      </HStack>

                      {/* Production Levels - Horizontal Layout */}
                      <HStack justifyContent="space-between" width="100%">
                        <Text fontSize="md" color="secondary.500" fontWeight="bold">
                          Production Levels:
                        </Text>
                        <HStack spacing={4}>
                          <Text fontSize="sm">Food: {building.resourceProduction.foodPerEpoch}</Text>
                          <Text fontSize="sm">Wood: {building.resourceProduction.woodPerEpoch}</Text>
                          <Text fontSize="sm">Stone: {building.resourceProduction.stonePerEpoch}</Text>
                          <Text fontSize="sm">Brass: {building.resourceProduction.brassPerEpoch}</Text>
                          <Text fontSize="sm">Iron: {building.resourceProduction.ironPerEpoch}</Text>
                          <Text fontSize="sm">Gold: {building.resourceProduction.goldPerEpoch}</Text>
                        </HStack>
                      </HStack>

                      {/* Boosts - Horizontal Layout */}
                      <HStack justifyContent="space-between" width="100%">
                        <Text fontSize="md" color="secondary.500" fontWeight="bold">
                          Boosts Provided:
                        </Text>
                        <HStack spacing={4}>
                          <Text fontSize="sm">Prod: {building.productionBoost}</Text>
                          <Text fontSize="sm">Happiness: {building.happinessBoost}</Text>
                          <Text fontSize="sm">Tech: {building.technologyBoost}</Text>
                          <Text fontSize="sm">Piety: {building.pietyBoost}</Text>
                          <Text fontSize="sm">Strength: {building.strengthBoost}</Text>
                        </HStack>
                      </HStack>

                      {/* Start Building Button */}
                      <StartBuildingButton
                        building={building}
                        tokenId={tokenData.tokenId}
                        resources={tokenData.landStats.resources}
                      />
                    </VStack>
                  </Box>
                ))
              ) : (
                <Text fontSize="md">No available buildings found</Text>
              )}
            </Flex>
          </TranslucentBox>
        </Box>
      ))}
    </Box>
  );
}
