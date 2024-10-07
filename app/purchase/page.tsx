'use client';
import { useEffect } from 'react';
// import { useStore } from '../store/useStore';
import {
  Box,
  Heading,
  Text,
  Image,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  VStack,
  HStack,
} from '@chakra-ui/react';

export default function Purchase() {
//   const {
//     isMinting,
//     mintError,
//     mintNFT,
//   } = useStore();

  // NFT Details (replace with actual data or fetch from an API)
  const nftDetails = {
    imageUrl: '/images/nft-image.png', // Replace with actual image URL
    title: 'Fjunlund Land Parcel',
    description: 'Own a piece of Fjunlund and begin your adventure.',
    price: '0.1', // ETH
  };

  return (
    <Box p={8}>
      <Heading as="h2" size="lg" mb={4} color="primary.500">
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
          {/* {mintError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error:</AlertTitle>
              <AlertDescription>{mintError}</AlertDescription>
            </Alert>
          )} */}
          <Button
            colorScheme="teal"
            // onClick={mintNFT}
            // isLoading={isMinting}
            loadingText="Minting"
          >
            Mint NFT
          </Button>
        </VStack>
      </HStack>
    </Box>
  );
}
