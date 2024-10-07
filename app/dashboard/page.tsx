'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  SimpleGrid,
  Avatar,
  Progress,
  Divider,
  VStack,
  HStack,
  Button,
  Image
} from '@chakra-ui/react';

interface AccountData {
  username: string;
  balance: number;
  change24h: number; // percentage
  changeEpoch: number; // percentage
}

interface Investment {
  id: number;
  name: string;
  amount: number;
  performance: number; // percentage
}

interface NFTData {
  tokensOwned: number;
  population: number;
  buildings: number;
  happiness: number; // percentage
}

export default function Dashboard() {
  // Placeholder data
  const [accountData, setAccountData] = useState<AccountData>({
    username: 'User123',
    balance: 5000,
    change24h: 2.5, // percentage
    changeEpoch: 5.0, // percentage
  });

  const [investments, setInvestments] = useState<Investment[]>([
    {
      id: 1,
      name: 'Investment A',
      amount: 2000,
      performance: 3.0, // percentage
    },
    {
      id: 2,
      name: 'Investment B',
      amount: 3000,
      performance: -1.5, // percentage
    },
  ]);

  const [nftData, setNftData] = useState<NFTData>({
    tokensOwned: 150,
    population: 1200,
    buildings: 35,
    happiness: 80, // percentage
  });

  // Fetch actual data from APIs or wallet connections in real implementation
  useEffect(() => {
    // Fetch data and update state
  }, []);

  return (
    <Box p={8}>
      {/* User Account Data */}
      <Heading as="h2" size="lg" mb={4} color="primary.500">
        Account Overview
      </Heading>
      <Flex alignItems="center" mb={6}>
        <Avatar name={accountData.username} size="lg" mr={4} />
        <Box>
          <Text fontSize="xl" fontWeight="bold" color="secondary.500">
            {accountData.username}
          </Text>
          <Text fontSize="md">
            Balance: ${accountData.balance.toLocaleString()}
          </Text>
        </Box>
      </Flex>
      <SimpleGrid columns={[1, 2]} spacing={4} mb={8}>
        <Stat>
          <StatLabel>Last 24 Hours</StatLabel>
          <StatNumber>
            {accountData.change24h}%
            <StatArrow
              type={accountData.change24h >= 0 ? 'increase' : 'decrease'}
            />
          </StatNumber>
          <StatHelpText>Since yesterday</StatHelpText>
        </Stat>
        <Stat>
          <StatLabel>Current Epoch</StatLabel>
          <StatNumber>
            {accountData.changeEpoch}%
            <StatArrow
              type={accountData.changeEpoch >= 0 ? 'increase' : 'decrease'}
            />
          </StatNumber>
          <StatHelpText>Since Friday 00:00 UTC</StatHelpText>
        </Stat>
      </SimpleGrid>

      <Divider my={6} />

      {/* Investments */}
      <Heading as="h2" size="lg" mb={4} color="primary.500">
        Your Investments
      </Heading>
      {investments.map((investment) => (
        <Box
          key={investment.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          mb={4}
          borderColor="secondary.500"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {investment.name}
              </Text>
              <Text fontSize="md">
                Amount Invested: ${investment.amount.toLocaleString()}
              </Text>
            </Box>
            <Stat>
              <StatLabel>Performance</StatLabel>
              <StatNumber>
                {investment.performance}%
                <StatArrow
                  type={
                    investment.performance >= 0 ? 'increase' : 'decrease'
                  }
                />
              </StatNumber>
              <StatHelpText>Since Investment</StatHelpText>
            </Stat>
          </Flex>
        </Box>
      ))}

      <Divider my={6} />

      {/* NFT Card */}
      <Heading as="h2" size="lg" mb={4} color="primary.500">
        Your NFT Land
      </Heading>
      <Box p={4} borderWidth="1px" borderRadius="md" mb={4} borderColor="secondary.500">
        <Flex
          direction={['column', 'row']}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex="1" mb={[4, 0]} mr={[0, 4]}>
            <VStack align="start" spacing={3}>
              <Text fontSize="md">
                <strong>Tokens Owned:</strong> {nftData.tokensOwned}
              </Text>
              <Text fontSize="md">
                <strong>Population:</strong> {nftData.population}
              </Text>
              <Text fontSize="md">
                <strong>Buildings:</strong> {nftData.buildings}
              </Text>
              <Box width="100%">
                <Text fontSize="md" mb={1}>
                  <strong>Happiness:</strong>
                </Text>
                <Progress
                  value={nftData.happiness}
                  colorScheme="green"
                  size="sm"
                  borderRadius="md"
                />
                <Text fontSize="sm">{nftData.happiness}%</Text>
              </Box>
            </VStack>
          </Box>
          {/* Placeholder for NFT image or visualization */}
          <Box flex="1" textAlign="center">
            {/* Replace with actual NFT image */}
            <Image
                src="images/Fjunland.webp"
                boxSize="300px"
                objectFit="cover"
                borderRadius="md"
                shadow="md"
                />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}
