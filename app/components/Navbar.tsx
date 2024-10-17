'use client';

import { Box, Button, Flex, Text, HStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import customTheme from 'app/theme/theme';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/landNFT.sol/LandNFT.json';

// Contract details
const LAND_NFT_CONTRACT = '0xf0917dB35E39B32D67A632A311bF04580557632C'; // Replace with your deployed contract address

export default function Navbar() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null); // Timer state

  useEffect(() => {
    const fetchEpochData = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(LAND_NFT_CONTRACT, LandNFTABI.abi, provider);

        // Fetch epochDuration from the contract (BigInt)
        if (contract.epochDuration) {
          const epochDurationBigInt = await contract.epochDuration();
          const epochDuration = Number(epochDurationBigInt.toString());

          // Calculate the remaining time for the current epoch
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

          // Calculate the epochStartTime based on currentTime and epochDuration
          const epochsElapsed = Math.floor(currentTime / epochDuration);
          const epochStartTime = epochsElapsed * epochDuration;
          const epochEndTime = epochStartTime + epochDuration;
          const timeRemaining = epochEndTime - currentTime;

          // Set the initial time left
          setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
        } else {
          console.error('epochDuration is undefined');
        }
      } catch (error) {
        console.error('Error fetching epoch data:', error);
      }
    };

    fetchEpochData();
  }, []);

  // Update the timer every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime && prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Helper function to format time
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <Box
      as="nav"
      bg={customTheme.colors.primary[700]}
      px={8}
      py={8}
      boxShadow="md"
      position="sticky"
      top={0}
      zIndex={1}
    >
      <Flex alignItems="center" justifyContent="space-between">
        <HStack>
          <Text fontSize="xl" fontWeight="bold" color="white">
            Fjunlund
          </Text>

          {/* Menu Buttons */}
          <Link href="/" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Home
            </Button>
          </Link>
          <Link href="/dashboard" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Dashboard
            </Button>
          </Link>
          <Link href="/map" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Map
            </Button>
          </Link>
          <Link href="/purchase" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Purchase
            </Button>
          </Link>
          <Link href="/development" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Development
            </Button>
          </Link>
        </HStack>

        {/* Epoch Timer */}
        <Text fontSize="lg" color="white" fontWeight="bold">
          {timeLeft !== null
            ? timeLeft > 0
              ? `Epoch ends in: ${formatTime(timeLeft)}`
              : 'Epoch ending...'
            : 'Loading epoch data...'}
        </Text>

        <ConnectButton showBalance={false} accountStatus="address" chainStatus="icon" />
      </Flex>
    </Box>
  );
}
