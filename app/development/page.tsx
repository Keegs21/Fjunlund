'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Heading,
  Text,
  Divider,
  VStack,
  HStack,
  StackDivider,
  Badge,
  SimpleGrid,
} from '@chakra-ui/react';

interface CommunityUpdate {
  id: number;
  title: string;
  date: string;
  content: string;
}

interface GameUpdate {
  id: number;
  title: string;
  date: string;
  content: string;
}

export default function Development() {
  // Placeholder data for community updates
  const [communityUpdates, setCommunityUpdates] = useState<CommunityUpdate[]>([
    {
      id: 1,
      title: 'Investment Opportunity Alpha Released',
      date: 'October 1, 2023',
      content:
        'We are excited to announce a new investment opportunity in DeFi farming...',
    },
    {
      id: 2,
      title: 'Weekly Performance Highlights',
      date: 'September 24, 2023',
      content:
        'This week, our community has seen a 10% growth in overall investments...',
    },
  ]);

  // Placeholder data for game updates
  const [gameUpdates, setGameUpdates] = useState<GameUpdate[]>([
    {
      id: 1,
      title: 'Godot Game Beta Launch',
      date: 'September 15, 2023',
      content:
        'The beta version of our Godot game is now live. Players can now see a preview of how their NFT data will translate into governable land...',
    },
    {
      id: 2,
      title: 'New Features: Resource Management',
      date: 'September 30, 2023',
      content:
        'We have added resource management mechanics to enhance gameplay. Manage your land’s resources efficiently to boost happiness and productivity...',
    },
  ]);

  // Fetch actual data from APIs or content management system in real implementation
  useEffect(() => {
    // Fetch data and update state
  }, []);

  return (
    <Box p={8}>
      {/* Community Updates */}
      <Heading as="h2" size="lg" mb={4} color="primary.500">
        Community Updates
      </Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        mb={8}
      >
        {communityUpdates.map((update) => (
          <Box key={update.id}>
            <HStack justifyContent="space-between">
              <Heading as="h3" size="md" color="secondary.500">
                {update.title}
              </Heading>
              <Badge colorScheme="teal">{update.date}</Badge>
            </HStack>
            <Text mt={2}>{update.content}</Text>
          </Box>
        ))}
      </VStack>

      <Divider my={6} />

      {/* Game Development Updates */}
      <Heading as="h2" size="lg" mb={4} color="primary.500">
        Game Development Updates
      </Heading>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
      >
        {gameUpdates.map((update) => (
          <Box key={update.id}>
            <HStack justifyContent="space-between">
              <Heading as="h3" size="md" color="secondary.500">
                {update.title}
              </Heading>
              <Badge colorScheme="teal">{update.date}</Badge>
            </HStack>
            <Text mt={2}>{update.content}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
