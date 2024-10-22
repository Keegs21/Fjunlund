// src/components/Navbar.tsx

'use client';

import { Box, Button, Flex, Text, HStack, useToast } from '@chakra-ui/react';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import customTheme from 'app/theme/theme';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/landNFT.sol/LandNFT.json';
import LeaderboardABI from '../../artifacts/contracts/leaderboard.sol/Leaderboard.json';
import RewardsDistributorABI from '../../artifacts/contracts/rewardsDistributor.sol/RewardsDistributor.json'; // Import the RewardsDistributor ABI

// Contract details
const LAND_NFT_CONTRACT = '0xbDAa58F7f2C235DD93a0396D653AEa09116F088d'; // Replace with your deployed contract address
const LEADERBOARD_CONTRACT = '0xD4DAaCdA8b37D9aB583EDE425545529dd5b70a66'; // Replace with your deployed contract address
const REWARDS_DISTRIBUTOR_CONTRACT = '0x9957f22eEA344BE9d3c8B4Da4519B5a2164b53c1'; // Deployed RewardsDistributor
const ERC20_TOKEN_ADDRESS = '0x05C5eCEe53692524F72e10588A787aeD324DE367'; // FJT Token

export default function Navbar() {
  const [isUpdating, setIsUpdating] = useState(false); // State to manage loading state of the button
  const [isUpdatingLeaderboard, setIsUpdatingLeaderboard] = useState(false);
  const [isDistributing, setIsDistributing] = useState(false); // State for distributing rewards
  const [isOwner, setIsOwner] = useState(false); // State to check if connected user is owner
  const [isMounted, setIsMounted] = useState(false);
  const { address } = useAccount();

  const toast = useToast();

  useEffect(() => {
    // Set the mounted state to true after the component has been mounted
    setIsMounted(true);
  }, []);

  // Function to handle updating the epoch for all NFTs at once
  const updateEpoch = async () => {
    try {
      setIsUpdating(true);

      if (!window.ethereum) {
        alert('Please install MetaMask to interact with this feature.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      );

      // Estimate the gas required for the updateEpoch call
      if (landNFTContract.updateEpoch) {
        const estimatedGas = await landNFTContract.updateEpoch.estimateGas();

        // Call the updateEpoch function for all NFTs
        const tx = await landNFTContract.updateEpoch({
          gasLimit: estimatedGas,
        });

        console.log('Transaction sent:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction mined:', receipt);

        alert('Epoch updated successfully for all NFTs!');
      } else {
        throw new Error('updateEpoch function is not defined on the contract');
      }
    } catch (error) {
      console.error('Error updating epoch:', error);
      alert('Error updating epoch');
    } finally {
      setIsUpdating(false);
    }
  };

  // Function to update the leaderboard
  const updateLeaderboard = async () => {
    try {
      setIsUpdatingLeaderboard(true);

      if (!window.ethereum) {
        alert('Please install MetaMask to interact with this feature.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const leaderboardContract = new ethers.Contract(
        LEADERBOARD_CONTRACT,
        LeaderboardABI.abi,
        signer
      );

      // Estimate the gas required for the updateLeaderboard call
      if (leaderboardContract.updateLeaderboard) {
        const estimatedGas = await leaderboardContract.updateLeaderboard.estimateGas();

        const tx = await leaderboardContract.updateLeaderboard({
          gasLimit: estimatedGas,
        });
        console.log('Transaction sent:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Transaction mined:', receipt);

        toast({
          title: 'Leaderboard updated successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error('updateLeaderboard function is not defined on the contract');
      }
    } catch (error) {
      console.error('Error updating leaderboard:', error);
      toast({
        title: 'Error updating leaderboard',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsUpdatingLeaderboard(false);
    }
  };

  // Function to distribute rewards
  const distributeRewards = async () => {
    try {
      setIsDistributing(true);

      if (!window.ethereum) {
        alert('Please install MetaMask to interact with this feature.');
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const rewardsDistributorContract = new ethers.Contract(
        REWARDS_DISTRIBUTOR_CONTRACT,
        RewardsDistributorABI.abi,
        signer
      );

      // Estimate the gas required for the distributeRewards call
      if (rewardsDistributorContract.distributeRewards) {
        const estimatedGas = await rewardsDistributorContract.distributeRewards.estimateGas();

        // Call the distributeRewards function
        const tx = await rewardsDistributorContract.distributeRewards({
          gasLimit: estimatedGas,
        });

        console.log('Distribute Rewards Transaction sent:', tx.hash);

        // Wait for the transaction to be mined
        const receipt = await tx.wait();
        console.log('Distribute Rewards Transaction mined:', receipt);

        toast({
          title: 'Rewards distributed successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error('distributeRewards function is not defined on the contract');
      }
    } catch (error) {
      console.error('Error distributing rewards:', error);
      toast({
        title: 'Error distributing rewards',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsDistributing(false);
    }
  };

  // Function to check if connected user is owner of RewardsDistributor
  useEffect(() => {
    const checkOwner = async () => {
      if (!window.ethereum || !address) return;

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const rewardsDistributorContract = new ethers.Contract(
          REWARDS_DISTRIBUTOR_CONTRACT,
          RewardsDistributorABI.abi,
          provider
        );

        if (rewardsDistributorContract.owner) {
          const contractOwner: string = await rewardsDistributorContract.owner();
          console.log('RewardsDistributor Owner:', contractOwner);
          setIsOwner(contractOwner.toLowerCase() === address.toLowerCase());
        } else {
          throw new Error('owner function is not defined on the contract');
        }
      } catch (error) {
        console.error('Error checking RewardsDistributor owner:', error);
      }
    };

    checkOwner();
  }, [address]);

  if (!isMounted) {
    // While the component is mounting, return null or a loader if you prefer
    return null;
  }

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
          <Link href="/marketplace" passHref>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: customTheme.colors.secondary[500] }}
            >
              Market
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

        {/* Buttons */}
        <HStack spacing={4}>
          {/* Update Epoch Button */}
          <Button
            colorScheme="teal"
            onClick={updateEpoch}
            isLoading={isUpdating}
            loadingText="Updating"
            isDisabled={!window.ethereum} // Disable button if wallet is not connected
          >
            Update Epoch
          </Button>

          {/* Update Leaderboard Button */}
          <Button
            colorScheme="orange"
            onClick={updateLeaderboard}
            isLoading={isUpdatingLeaderboard}
            loadingText="Updating Leaderboard"
            isDisabled={!window.ethereum} // Disable button if wallet is not connected
          >
            Update Leaderboard
          </Button>

          {/* Distribute Rewards Button - only visible to owner */}
          {isOwner && (
            <Button
              colorScheme="purple"
              onClick={distributeRewards}
              isLoading={isDistributing}
              loadingText="Distributing"
              isDisabled={!window.ethereum} // Disable button if wallet is not connected
            >
              Distribute Rewards
            </Button>
          )}

          <ConnectButton showBalance={false} accountStatus="address" chainStatus="icon" />
        </HStack>
      </Flex>
    </Box>
  );
}
