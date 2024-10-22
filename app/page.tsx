// src/app/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Box,
  Text,
  Heading,
  Button,
  Stack,
  Divider,
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
} from '@chakra-ui/react';
import TranslucentBox from './components/TranslucentBox';
import { useAccount, useReadContract } from 'wagmi';
import { ethers } from 'ethers';
import LeaderboardABI from '../artifacts/contracts/leaderboard.sol/Leaderboard.json';
import RewardsDistributorABI from '../artifacts/contracts/RewardsDistributor.sol/RewardsDistributor.json'; // Import RewardsDistributor ABI
import ERC20ABI from '../artifacts/contracts/erc20.sol/erc20.json'; // Import ERC20 ABI

// Contract Addresses
const LEADERBOARD_CONTRACT = '0xD4DAaCdA8b37D9aB583EDE425545529dd5b70a66';
const REWARDS_DISTRIBUTOR_CONTRACT = '0x9957f22eEA344BE9d3c8B4Da4519B5a2164b53c1';
const ERC20_TOKEN_ADDRESS = '0x05C5eCEe53692524F72e10588A787aeD324DE367'; // FJT Token


export default function Web() {
  const { address } = useAccount();

  interface LeaderboardEntry {
    rank: number;
    tokenId: number;
    score: number;
    reward: string; // Reward displayed as a string with decimals
    avatarUrl?: string;
  }

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
    <Box p={8} display="flex" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
      {/* Welcome Section */}
      <Heading as="h1" size="2xl" mb={4} color={'secondary.500'}>
        Welcome to Fjunlund
      </Heading>
      <Text fontSize="xl" color='black' fontStyle="italic" mb={6}>
        Where DeFi Investment Meets Immersive NFT Gaming
      </Text>

      <Divider my={6} />

      {/* Embark on a New Adventure */}
      <Heading as="h2" size="lg" mb={4} color={'secondary.500'}>
        Embark on a New Adventure
      </Heading>
      <Text mb={4} color='black'>
        Fjunlund is a revolutionary blockchain game that seamlessly integrates
        decentralized finance (DeFi) with the exciting world of non-fungible
        tokens (NFTs). We offer a unique platform where your investment
        performance in DeFi doesn't just grow your portfolio—it rewards you in our game.
      </Text>

      <Divider my={6} />

      {/* Top 10 Earners of the Previous Epoch */}
      <Heading as="h2" size="lg" mb={4} color="secondary.500">
        Top 10 Earners of the Previous Epoch
      </Heading>
      {loading ? (
        <Spinner size="xl" thickness="4px" color="secondary.500" speed="0.65s" />
      ) : (
        <TranslucentBox>
        <TableContainer>
          <Table variant="striped" colorScheme="blackAlpha">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Token ID</Th>
                <Th isNumeric>Score</Th>
                <Th isNumeric>Reward (FJT)</Th> {/* New Column */}
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
                        name={`Token #${entry.tokenId}`}
                        src={entry.avatarUrl}
                      />
                      <Text>Token #{entry.tokenId}</Text>
                    </HStack>
                  </Td>
                  <Td isNumeric>{entry.score.toLocaleString()}</Td>
                  <Td isNumeric>{entry.reward}</Td> {/* Display Reward */}
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        </TranslucentBox>
      )}
    </Box>
  );
}
