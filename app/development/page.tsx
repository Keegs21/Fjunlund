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
  Image
} from '@chakra-ui/react';
import TranslucentBox from 'app/components/TranslucentBox';

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
  const [communityUpdates, setCommunityUpdates] = useState<CommunityUpdate[]>([
    {
      id: 1,
      title: 'FE 0.1 released',
      date: 'October 9, 2024',
      content:
        'We are excited to announce the release of our first frontend version. This version includes the basic layout and design of the application and integrations of contracts and web3 into our front end.',
    },
    {
      id: 2,
      title: 'Founding Team put together',
      date: 'October 9, 2024',
      content:
        'We have put together a founding team of 6 people. DevKeegs, Atakan, Designer, Dev, Socials, Tyler',
    },
  ]);

  const [gameUpdates, setGameUpdates] = useState<GameUpdate[]>([
    {
      id: 1,
      title: 'NFT smartContract under construction',
      date: 'October 9, 2024',
      content:
        'We are currently working on the smart contract for our NFTs. This will allow users to mint their own NFTs to govern a land, and trade them on the marketplace.',
    },
    {
      id: 2,
      title: 'New Features: Resource Management and army decks',
      date: 'October 9, 2024',
      content:
        'The first in game features that we are working on developing are resources that you will have to manage within the NFT that represent the resources of the land you govern. Second users will be able to create decks of armies that they can use to attack other players. These decks will consist of NFT cards that users will put together into a deck.',
    },
    {
      id: 3,
      title: 'NFT Character art alpha',
      date: 'October 9, 2024',
      content:
        'Below are the alpha designs for the character art for the NFT cards that users will collect to assemble their army deck. Their Army decks will drop into an RTS battle for a winner take all battle.',
    }
  ]);

  const [characterArtImages, setCharacterArtImages] = useState<string[]>([
    // Add your image URLs here
    '/images/foot_soldier.webp',
    '/images/archer.webp',
    '/images/knight.webp',
    '/images/catapult.webp',
    '/images/wizard.webp',
    '/images/necromancer.webp',
    '/images/pikeman.webp',
    '/images/dwarf.webp',
  ]);

  useEffect(() => {
    // Fetch data and update state
  }, []);

  return (
    <Box p={8}>
      {/* Community Updates */}
      <TranslucentBox width="fit-content" p={4} mb={8}>
        <Heading as="h2" size="lg" mb={4} color="primary.500">
          Community Updates
        </Heading>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
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
      </TranslucentBox>

      <Divider my={6} />

      {/* Game Development Updates */}
      <TranslucentBox width="fit-content" p={4} mb={8}>
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
      </TranslucentBox>

      <Divider my={6} />

      {/* Character Art Cards Section */}
      <TranslucentBox width="fit-content" p={4}>
        <Heading as="h2" size="lg" mb={4} color="primary.500">
          NFT Character Art Alpha
        </Heading>
        <Text mb={4}>
          Below are the alpha designs for the character art for the NFT cards
          that users will collect to assemble their army deck.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          {characterArtImages.map((imageSrc, index) => (
            <Box key={index} textAlign="center">
              <Image
                src={imageSrc}
                alt={`Character Art ${index + 1}`}
                borderRadius="md"
                boxShadow="md"
                maxHeight="300px"
                objectFit="cover"
              />
              <Text mt={2} fontWeight="bold">
                Unit {index + 1}
              </Text>
            </Box>
          ))}
        </SimpleGrid>
      </TranslucentBox>
    </Box>
  );
}