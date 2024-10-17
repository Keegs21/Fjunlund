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
} from '@chakra-ui/react';
import TranslucentBox from 'app/components/TranslucentBox';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/LandNFT.sol/LandNFT.json';
import BuildingManagerABI from '../../artifacts/contracts/BuildingManager.sol/BuildingManager.json';
import { LandNFT, BuildingManager } from '../../typechain-types';

const LAND_NFT_CONTRACT = '0xf0917dB35E39B32D67A632A311bF04580557632C'; 
const BUILDING_MANAGER_CONTRACT = '0x652358bc97b6A234afc58B12A78578A04Ab70872'; 

export default function Dashboard() {
  const { address } = useAccount();
  const [userTokens, setUserTokens] = useState<TokenData[]>([]);
  const [buildingsInfo, setBuildingsInfo] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  interface TokenData {
    tokenId: number;
    landStats: any;
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
          const buildingData: any[] = [];
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

  const StartBuildingButton = ({
    building,
    tokenId,
    resources,
  }: {
    building: any;
    tokenId: number;
    resources: any;
  }) => {
    const estimateGas = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as LandNFT;
  
        // Correct syntax for Ethers.js v6
        const estimatedGas = await landNFTContract.startBuildingConstruction.estimateGas(
          tokenId,
          building.name,
          building.level
        );
  
        console.log('Estimated Gas:', estimatedGas);
        return estimatedGas;
      } catch (error) {
        console.error('Error estimating gas:', error);
        return undefined;
      }
    };
  
    const handleClick = async () => {
      const estimatedGas = await estimateGas();
      if (estimatedGas !== undefined) {
        startBuilding(tokenId, building.name, Number(building.level), estimatedGas);
      } else {
        console.error('Estimated gas is undefined');
      }
    };
  
    return (
      <Button
        colorScheme={canBuild(building.baseCost, resources) ? 'green' : 'gray'}
        isDisabled={!canBuild(building.baseCost, resources)}
        onClick={handleClick}
        mt={4}
      >
        {canBuild(building.baseCost, resources) ? 'Start Building' : 'Not Enough Resources'}
      </Button>
    );
  };

  const startBuilding = async (
    tokenId: number,
    buildingName: string,
    level: number,
    estimatedGas: bigint
  ) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      ) as LandNFT;
  
      const tx = await landNFTContract.startBuildingConstruction(
        tokenId,
        buildingName,
        level,
        {
          gasLimit: estimatedGas,
        }
      );
  
      console.log('Transaction sent:', tx.hash);
      const receipt = await tx.wait();
      console.log('Transaction mined:', receipt);
  
      // Refresh data after building starts
      fetchNFTData();
    } catch (error) {
      console.error('Error starting building construction:', error);
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
              tokenData.landStats.buildings.map((building: any, index: number) => (
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
                      {building.name} (Level {building.level})
                    </strong>
                    {building.isActive ? ' - Active' : ' - Inactive'}
                  </Text>
                </Box>
              ))
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
                          <Text fontSize="sm">
                            Food: {building.resourceProduction.foodPerEpoch}
                          </Text>
                          <Text fontSize="sm">
                            Wood: {building.resourceProduction.woodPerEpoch}
                          </Text>
                          <Text fontSize="sm">
                            Stone: {building.resourceProduction.stonePerEpoch}
                          </Text>
                          <Text fontSize="sm">
                            Brass: {building.resourceProduction.brassPerEpoch}
                          </Text>
                          <Text fontSize="sm">
                            Iron: {building.resourceProduction.ironPerEpoch}
                          </Text>
                          <Text fontSize="sm">
                            Gold: {building.resourceProduction.goldPerEpoch}
                          </Text>
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

                      {/* Button */}
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
