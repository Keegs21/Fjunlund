// src/app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  Avatar,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Flex,
  Image as ChakraImage,
  Stack,
} from '@chakra-ui/react';
import TranslucentBox from './components/TranslucentBox';
import { useAccount, useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import LeaderboardABI from '../artifacts/contracts/leaderboard.sol/Leaderboard.json';
import RewardsDistributorABI from '../artifacts/contracts/rewardsDistributor.sol/RewardsDistributor.json'; // Import RewardsDistributor ABI
import ERC20ABI from '../artifacts/contracts/erc20.sol/erc20.json'; // Import ERC20 ABI
import { Parallax } from 'react-parallax';

// Contract Addresses
const LEADERBOARD_CONTRACT = '0xD4DAaCdA8b37D9aB583EDE425545529dd5b70a66';
const REWARDS_DISTRIBUTOR_CONTRACT = '0x9957f22eEA344BE9d3c8B4Da4519B5a2164b53c1';
const ERC20_TOKEN_ADDRESS = '0x05C5eCEe53692524F72e10588A787aeD324DE367'; // FJT Token

interface LeaderboardEntry {
  rank: number;
  tokenId: number;
  score: number;
  reward: string; // Reward displayed as a string with decimals
  avatarUrl?: string;
}

export default function HomePage() {
  const { address } = useAccount();

  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch leaderboard data
  const { data: leaderboardEntries, isError: isLeaderboardError } = useReadContract({
    address: LEADERBOARD_CONTRACT,
    abi: LeaderboardABI.abi,
    functionName: 'getLeaderboard',
  });

  // Fetch rewardWeights from RewardsDistributor
  const { data: rewardWeights, isError: isRewardWeightsError } = useReadContract({
    address: REWARDS_DISTRIBUTOR_CONTRACT,
    abi: RewardsDistributorABI.abi,
    functionName: 'getRewardWeights',
  });

  // Fetch ERC20 token balance of RewardsDistributor
  const { data: rewardsDistributorBalance, isError: isBalanceError } = useReadContract({
    address: ERC20_TOKEN_ADDRESS,
    abi: ERC20ABI,
    functionName: 'balanceOf',
    args: [REWARDS_DISTRIBUTOR_CONTRACT],
  });

  // Fetch total weight (sum of rewardWeights)
  const totalWeight = Array.isArray(rewardWeights)
    ? (rewardWeights as bigint[]).reduce((acc: bigint, weight: bigint) => acc + weight, BigInt(0))
    : BigInt(0);

  useEffect(() => {
    if (leaderboardEntries && rewardWeights && rewardsDistributorBalance) {
      console.log('Leaderboard Entries:', leaderboardEntries);
      console.log('Reward Weights:', rewardWeights);
      console.log('Rewards Distributor Balance:', rewardsDistributorBalance.toString());

      // Convert leaderboardEntries to an array
      let entriesArray: any[] = [];
      if (Array.isArray(leaderboardEntries)) {
        entriesArray = leaderboardEntries;
      } else if (typeof leaderboardEntries === 'object') {
        entriesArray = Object.values(leaderboardEntries);
      }

      // Convert rewardsDistributorBalance to bigint
      const distributorBalanceBigInt: bigint = BigInt(rewardsDistributorBalance.toString());

      // Format the leaderboard data with rewards
      const formattedData: LeaderboardEntry[] = entriesArray.map((entry: any, index: number) => {
        const tokenId = Number(entry.tokenId ?? entry[0]);
        const score = Number(entry.score ?? entry[1]);

        // Get the reward weight for this rank
        const rewardWeight: bigint = Array.isArray(rewardWeights)
          ? (rewardWeights[index] as bigint) || BigInt(0)
          : BigInt(0);

        // Calculate rewardAmount = (rewardWeight * balance) / totalWeight
        let rewardAmount: bigint = BigInt(0);
        if (totalWeight > BigInt(0)) {
          rewardAmount = (distributorBalanceBigInt * rewardWeight) / totalWeight;
        }

        // Format rewardAmount to human-readable form
        const rewardFormatted = ethers.formatUnits(rewardAmount.toString(), 18); // Assuming ERC20 has 18 decimals

        return {
          rank: index + 1,
          tokenId: tokenId,
          score: score,
          reward: rewardFormatted,
          avatarUrl: undefined, // Placeholder for avatar URL if available
        };
      });

      setLeaderboardData(formattedData);
      setLoading(false);
    }
  }, [leaderboardEntries, rewardWeights, rewardsDistributorBalance]);

  return (
    <Box>
      {/* Hero Section */}
      <Parallax bgImage="/images/bg.webp" strength={500}>
        <Box
          height="100vh"
          display="flex"
          alignItems="center"
          justifyContent="center"
          position="relative"
        >
          {/* Overlay for better text readability */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0,0,0,0.1)" // Semi-transparent overlay
            zIndex={0}
          />

          {/* Main Content */}
          <VStack spacing={6} textAlign="center" color="white" zIndex={1} px={4}>
            {/* Icon Above CTA Buttons */}
            <ChakraImage
              src="/images/fjunlund2.png" // Replace with your actual icon path
              alt="Fjunlund Icon"
              borderRadius="50%"
              width={{ base: '150px', md: '200px' }}
              height={{ base: '150px', md: '200px' }}
              opacity={0.8} // Adjust opacity as needed
            />

            <Text fontSize={{ base: 'md', md: 'xl' }} fontStyle="italic">
              Build your army, manage resources, and conquer the leaderboard!
            </Text>
            <HStack spacing={4}>
              <Link href="/purchase" passHref>
                <Button colorScheme="teal" size="lg">
                  Buy Your First NFT
                </Button>
              </Link>
              <Link href="/dashboard" passHref>
                <Button colorScheme="orange" size="lg">
                  Explore Dashboard
                </Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Parallax>

      {/* Features Section */}
      <Parallax bgImage="/images/howtoplay.webp" strength={300}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
          {/* Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.2)"
            zIndex={0}
          />

          {/* Content */}
          <Flex
            direction="column"
            align="center"
            maxW="1200px"
            mx="auto"
            px={4}
            position="relative"
            zIndex={1}
          >
            <Heading mb={6} color="secondary.500">
              Game Features
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8} justify="center">
              {/* Feature 1 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1">
                <ChakraImage src="/images/features/nft.png" alt="NFT Ownership" boxSize="100px" mb={4} />
                <Heading size="md" mb={2}>
                  NFT Ownership
                </Heading>
                <Text>
                  Own unique unit NFTs, each with distinct attributes and abilities that shape your army.
                </Text>
              </TranslucentBox>

              {/* Feature 2 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1">
                <ChakraImage src="/images/features/resources.png" alt="Resource Management" boxSize="100px" mb={4} />
                <Heading size="md" mb={2}>
                  Resource Management
                </Heading>
                <Text>
                  Develop and manage various resources to build structures, train units, and expand your empire.
                </Text>
              </TranslucentBox>

              {/* Feature 3 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1">
                <ChakraImage src="/images/features/battle.png" alt="Battle System" boxSize="100px" mb={4} />
                <Heading size="md" mb={2}>
                  Battle System
                </Heading>
                <Text>
                  Engage in strategic battles against other players, utilizing your army's strengths to dominate.
                </Text>
              </TranslucentBox>
            </Flex>
          </Flex>
        </Box>
      </Parallax>

      {/* How to Play Section */}
      <Parallax bgImage="/images/frozen.webp" strength={300}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
          {/* Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.3)"
            zIndex={0}
          />

          {/* Content */}
          <Flex
            direction="column"
            align="center"
            maxW="1200px"
            mx="auto"
            px={4}
            position="relative"
            zIndex={1}
          >
            <Heading mb={6} color="secondary.500">
              How to Play
            </Heading>
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={8}
              justify="center"
              align="center"
              width="100%"
            >
              {/* Step 1 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1" maxW="300px">
                <ChakraImage src="/images/how-to-play/purchase-nft.png" alt="Purchase NFT" boxSize="80px" mb={4} />
                <Heading size="md" mb={2}>
                  Purchase an NFT
                </Heading>
                <Text>
                  Connect your wallet, acquire ETH, and purchase unique unit NFTs to start building your army.
                </Text>
              </TranslucentBox>

              {/* Step 2 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1" maxW="300px">
                <ChakraImage src="/images/how-to-play/resource-management.png" alt="Resource Management" boxSize="80px" mb={4} />
                <Heading size="md" mb={2}>
                  Develop Resources
                </Heading>
                <Text>
                  Construct buildings to generate and manage resources essential for expanding your empire.
                </Text>
              </TranslucentBox>

              {/* Step 3 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1" maxW="300px">
                <ChakraImage src="/images/how-to-play/battle.png" alt="Engage in Battles" boxSize="80px" mb={4} />
                <Heading size="md" mb={2}>
                  Engage in Battles
                </Heading>
                <Text>
                  Formulate your army deck and challenge other players to strategic battles to earn rewards.
                </Text>
              </TranslucentBox>
            </Stack>
          </Flex>
        </Box>
      </Parallax>

      {/* Leaderboard Section */}
      <Parallax bgImage="/images/desert.webp" strength={300}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
          {/* Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.3)"
            zIndex={0}
          />

          {/* Content */}
          <Flex
            direction="column"
            align="center"
            maxW="1200px"
            mx="auto"
            px={4}
            position="relative"
            zIndex={1}
          >
            <Heading mb={6} color="secondary.500">
              Leaderboard
            </Heading>
            {loading ? (
              <Spinner size="xl" thickness="4px" color="secondary.500" speed="0.65s" />
            ) : (
              <TranslucentBox width="100%" p={6} borderRadius="md" boxShadow="lg">
                <TableContainer>
                  <Table variant="striped" colorScheme="blackAlpha">
                    <Thead>
                      <Tr>
                        <Th>Rank</Th>
                        <Th>Player</Th>
                        <Th isNumeric>Score</Th>
                        <Th isNumeric>Reward (FJT)</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {leaderboardData.map((entry) => (
                        <Tr key={entry.rank} color={'secondary.500'}>
                          <Td>{entry.rank}</Td>
                          <Td>
                            <HStack spacing={2}>
                              <Avatar
                                size="sm"
                                name={`Player ${entry.tokenId}`}
                                src={entry.avatarUrl}
                              />
                              <Text>Player #{entry.tokenId}</Text>
                            </HStack>
                          </Td>
                          <Td isNumeric>{entry.score.toLocaleString()}</Td>
                          <Td isNumeric>{entry.reward}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </TranslucentBox>
            )}
          </Flex>
        </Box>
      </Parallax>

      {/* Rewards Section */}
      <Parallax bgImage="/images/rewards.webp" strength={300}>
        <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
          {/* Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.3)"
            zIndex={0}
          />

          {/* Content */}
          <Flex
            direction="column"
            align="center"
            maxW="1200px"
            mx="auto"
            px={4}
            position="relative"
            zIndex={1}
          >
            <Heading mb={6} color="secondary.500">
              Rewards
            </Heading>
            <Flex direction={{ base: 'column', md: 'row' }} gap={8} justify="center">
              {/* Reward 1 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1">
                <ChakraImage src="/images/rewards/erc20.png" alt="ERC20 Tokens" boxSize="100px" mb={4} />
                <Heading size="md" mb={2}>
                  ERC20 Tokens
                </Heading>
                <Text>
                  Earn ERC20 tokens by winning battles, climbing the leaderboard, and completing missions.
                </Text>
              </TranslucentBox>

              {/* Reward 2 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1">
                <ChakraImage src="/images/rewards/exclusive-nft.png" alt="Exclusive NFTs" boxSize="100px" mb={4} />
                <Heading size="md" mb={2}>
                  Exclusive NFTs
                </Heading>
                <Text>
                  Obtain rare and powerful NFTs that enhance your army's capabilities and unlock new features.
                </Text>
              </TranslucentBox>

              {/* Reward 3 */}
              <TranslucentBox p={6} borderRadius="md" boxShadow="lg" flex="1">
                <ChakraImage src="/images/rewards/resource-bonus.png" alt="Resource Bonuses" boxSize="100px" mb={4} />
                <Heading size="md" mb={2}>
                  Resource Bonuses
                </Heading>
                <Text>
                  Boost your resource pools with additional bonuses earned through strategic gameplay.
                </Text>
              </TranslucentBox>
            </Flex>
          </Flex>
        </Box>
      </Parallax>

      {/* Footer Section */}
      <Parallax bgImage="/images/footer-bg.jpg" strength={300}>
        <Box height="50vh" display="flex" alignItems="center" justifyContent="center">
          {/* Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            width="100%"
            height="100%"
            bg="rgba(0, 0, 0, 0.6)"
            zIndex={0}
          />

          {/* Content */}
          <Flex
            direction="column"
            align="center"
            maxW="1200px"
            mx="auto"
            px={4}
            position="relative"
            zIndex={1}
            color="white"
          >
            <HStack spacing={4} mb={4}>
              <Link href="/privacy-policy">
                <Text>Privacy Policy</Text>
              </Link>
              <Link href="/terms-of-service">
                <Text>Terms of Service</Text>
              </Link>
              <Link href="/contact">
                <Text>Contact Us</Text>
              </Link>
            </HStack>
            <HStack spacing={4} mb={4}>
              {/* Social Media Icons */}
              <Link href="https://twitter.com" passHref>
                <Button variant="ghost" colorScheme="whiteAlpha">
                  <ChakraImage src="/images/social/twitter.png" alt="Twitter" boxSize="24px" />
                </Button>
              </Link>
              <Link href="https://discord.com" passHref>
                <Button variant="ghost" colorScheme="whiteAlpha">
                  <ChakraImage src="/images/social/discord.png" alt="Discord" boxSize="24px" />
                </Button>
              </Link>
              <Link href="https://telegram.org" passHref>
                <Button variant="ghost" colorScheme="whiteAlpha">
                  <ChakraImage src="/images/social/telegram.png" alt="Telegram" boxSize="24px" />
                </Button>
              </Link>
            </HStack>
            <Text>© {new Date().getFullYear()} Fjunlund. All rights reserved.</Text>
          </Flex>
        </Box>
      </Parallax>
    </Box>
  );
}

// Styles for the table headers and cells (optional if using Chakra's built-in styling)
const tableHeaderStyle = {
  borderBottom: '2px solid #4ED3FF',
  padding: '12px',
  textAlign: 'left',
};

const tableCellStyle = {
  borderBottom: '1px solid #E2E8F0',
  padding: '12px',
};
