// src/app/marketplace/page.tsx

"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Select,
  SimpleGrid,
  Spinner,
  Text,
  VStack,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from "@chakra-ui/react";
import { ethers, Contract, formatUnits } from "ethers";
import { useAccount } from "wagmi";
import LandNFTABI from "../../artifacts/contracts/landNFT.sol/LandNFT.json";
import MarketContractABI from "../../artifacts/contracts/marketcontract.sol/MarketContract.json";
import ERC20ABI from "../../artifacts/contracts/erc20.sol/erc20.json";
import TranslucentBox from "../components/TranslucentBox"; // Adjust the path as needed

// Define the structure of an NFT
interface NFT {
  tokenId: number;
}

// Define the structure for resource prices using BigInt
interface ResourcePrice {
    foodPrice: bigint;
    woodPrice: bigint;
    stonePrice: bigint;
    brassPrice: bigint;
    ironPrice: bigint;
    goldPrice: bigint;
  }
  

// Define the structure for desired resources
interface DesiredResources {
  food: number;
  wood: number;
  stone: number;
  brass: number;
  iron: number;
  gold: number;
}

const MARKETPLACE_ADDRESS = "0x1AA9923fF53d97cFe7665321587B230e207eb78F"; // Replace with actual MarketContract address
const LANDNFT_ADDRESS = "0xbDAa58F7f2C235DD93a0396D653AEa09116F088d"; // Replace with actual LandNFT address
const ERC20_ADDRESS = "0x05C5eCEe53692524F72e10588A787aeD324DE367"; // Provided ERC20 token address

const Marketplace: React.FC = () => {
  // Wagmi hook to get the connected user's address
  const { address } = useAccount();

  // State variables
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [resourcePrices, setResourcePrices] = useState<ResourcePrice | null>(null);
  const [loadingPrices, setLoadingPrices] = useState<boolean>(false);
  const [buying, setBuying] = useState<boolean>(false);
  const [desiredResources, setDesiredResources] = useState<DesiredResources>({
    food: 0,
    wood: 0,
    stone: 0,
    brass: 0,
    iron: 0,
    gold: 0,
  });
  const toast = useToast();

  // Initialize Ethers provider and signer when address is available
  useEffect(() => {
    const initProvider = async () => {
      if (address && window.ethereum) {
        try {
          const newProvider = new ethers.BrowserProvider(window.ethereum);
          const newSigner = await newProvider.getSigner();
          setProvider(newProvider);
          setSigner(newSigner);
        } catch (error) {
          console.error("Provider initialization failed:", error);
          toast({
            title: "Connection Error",
            description: "Failed to initialize Ethereum provider.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    };

    initProvider();
  }, [address, toast]);

  // Function to fetch user's NFTs
  const fetchNFTs = async () => {
    if (!provider || !address) return;

    try {
      const landNFTContract = new Contract(LANDNFT_ADDRESS, LandNFTABI.abi, provider);

      if (landNFTContract.balanceOf) {
        const balance: bigint = await landNFTContract.balanceOf(address);
        const balanceNum = Number(balance);

        const fetchedNFTs: NFT[] = [];

        for (let i = 0; i < balanceNum; i++) {
          if (landNFTContract.tokenOfOwnerByIndex) {
            const tokenId: bigint = await landNFTContract.tokenOfOwnerByIndex(address, i);
            fetchedNFTs.push({ tokenId: Number(tokenId) });
          } else {
            throw new Error("tokenOfOwnerByIndex method is undefined on the contract");
          }
        }
        setNFTs(fetchedNFTs);
      } else {
        throw new Error("balanceOf method is undefined on the contract");
      }
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your NFTs.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Function to fetch resource prices from MarketContract
const fetchResourcePrices = async () => {
    if (!provider) return;
  
    setLoadingPrices(true);
  
    try {
      const marketContract = new Contract(MARKETPLACE_ADDRESS, MarketContractABI.abi, provider);
      if (marketContract.getResourcePrices) {
      // Fetch raw prices from the contract (returns an array of BigInt)
      const pricesRaw: any = await marketContract.getResourcePrices();
      console.log("Resource Prices:", pricesRaw);
  
      // Map the array to an object with named properties
      const prices: ResourcePrice = {
        foodPrice: pricesRaw[0],
        woodPrice: pricesRaw[1],
        stonePrice: pricesRaw[2],
        brassPrice: pricesRaw[3],
        ironPrice: pricesRaw[4],
        goldPrice: pricesRaw[5],
      };
  
      setResourcePrices(prices);
    } else {
        throw new Error("getResourcePrices method is undefined on the contract");
        }
    } catch (error) {
      console.error("Error fetching resource prices:", error);
      toast({
        title: "Error",
        description: "Failed to fetch resource prices.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoadingPrices(false);
    }
  };
  
  // Effect: Fetch NFTs and resource prices when provider is ready
  useEffect(() => {
    if (provider && address) {
      fetchNFTs();
      fetchResourcePrices();
    }
  }, [provider, address]);

  // Handle NFT selection from dropdown
  const handleNFTSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tokenId = parseInt(e.target.value);
    const nft = nfts.find((nft) => nft.tokenId === tokenId) || null;
    console.log("Selected NFT:", nft);
    setSelectedNFT(nft);
  };

  // Handle quantity changes for resources
  const handleQuantityChange = (resource: keyof DesiredResources, value: string) => {
    const quantity = parseInt(value) || 0;
    setDesiredResources((prev) => ({
      ...prev,
      [resource]: quantity,
    }));
  };

  // Function to check ERC20 allowance
  const checkAllowance = async (totalCost: bigint): Promise<boolean> => {
    if (!provider || !signer) return false;

    try {
      const erc20Contract = new Contract(ERC20_ADDRESS, ERC20ABI, provider);
      if (erc20Contract.allowance) {
        const allowance: bigint = await erc20Contract.allowance(address, MARKETPLACE_ADDRESS);
        return allowance >= totalCost;
      } else {
        throw new Error("allowance method is undefined on the contract");
      }
    } catch (error) {
      console.error("Error checking allowance:", error);
      toast({
        title: "Error",
        description: "Failed to check ERC20 allowance.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  };

  // Function to approve ERC20 tokens
  const approveERC20 = async (totalCost: bigint): Promise<boolean> => {
    if (!signer) return false;

    try {
      const erc20Contract = new Contract(ERC20_ADDRESS, ERC20ABI, signer);
      if (erc20Contract.approve) {
        const tx = await erc20Contract.approve(MARKETPLACE_ADDRESS, totalCost);
        toast({
          title: "Approval Transaction",
          description: "Approving ERC20 tokens...",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        await tx.wait();
        toast({
          title: "Approval Successful",
          description: "ERC20 tokens approved.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        return true;
      } else {
        throw new Error("approve method is undefined on the contract");
      }
    } catch (error) {
      console.error("ERC20 Approval failed:", error);
      toast({
        title: "Approval Failed",
        description: "Could not approve ERC20 tokens.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return false;
    }
  };

 // Function to purchase selected resources
const buySelectedResources = async () => {
    if (!signer || !selectedNFT || !resourcePrices) return;
  
    // Validate that at least one resource is being purchased
    const totalQuantity = Object.values(desiredResources).reduce((acc, qty) => acc + qty, 0);
    if (totalQuantity === 0) {
      toast({
        title: "No Resources Selected",
        description: "Please select at least one resource to purchase.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
  
    setBuying(true);
  
    try {
      const marketContract = new Contract(MARKETPLACE_ADDRESS, MarketContractABI.abi, signer);
  
      // Construct desiredResources object with all fields
      const desiredResourcesStruct: Record<keyof DesiredResources, number> = {
        food: desiredResources.food,
        wood: desiredResources.wood,
        stone: desiredResources.stone,
        brass: desiredResources.brass,
        iron: desiredResources.iron,
        gold: desiredResources.gold,
      };
  
      // Calculate total cost using BigInt arithmetic
      let totalCost: bigint = BigInt(0); // Initialize to zero
      totalCost += resourcePrices.foodPrice * BigInt(desiredResources.food);
      totalCost += resourcePrices.woodPrice * BigInt(desiredResources.wood);
      totalCost += resourcePrices.stonePrice * BigInt(desiredResources.stone);
      totalCost += resourcePrices.brassPrice * BigInt(desiredResources.brass);
      totalCost += resourcePrices.ironPrice * BigInt(desiredResources.iron);
      totalCost += resourcePrices.goldPrice * BigInt(desiredResources.gold);
  
      if (totalCost === BigInt(0)) {
        toast({
          title: "Invalid Purchase",
          description: "Total cost must be greater than zero.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        setBuying(false);
        return;
      }
  
      // Check ERC20 allowance
      const isApproved = await checkAllowance(totalCost);
  
      if (!isApproved) {
        const approved = await approveERC20(totalCost);
        if (!approved) {
          setBuying(false);
          return;
        }
      }
  
      console.log("token id is", selectedNFT.tokenId);
      // Convert tokenId to BigInt
      const tokenIdBigInt = BigInt(selectedNFT.tokenId);
      console.log("Token ID (BigInt):", tokenIdBigInt);

      // ... rest of your function
      if (marketContract.buyResources) {
        const tx = await marketContract.buyResources(tokenIdBigInt + BigInt(1), desiredResourcesStruct);
      } else {
        throw new Error("buyResources method is undefined on the contract");
      }
      const tx = await marketContract.buyResources(tokenIdBigInt + BigInt(1), desiredResourcesStruct);
      toast({
        title: "Transaction Sent",
        description: "Purchasing resources...",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      await tx.wait();
      toast({
        title: "Purchase Successful",
        description: "Successfully purchased selected resources.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
  
      // Reset desired resources and refresh data
      setDesiredResources({
        food: 0,
        wood: 0,
        stone: 0,
        brass: 0,
        iron: 0,
        gold: 0,
      });
      fetchResourcePrices();
    } catch (error: any) {
      console.error("Purchase failed:", error);
      const errorMessage = error?.error?.message || error?.message || "Could not complete the purchase.";
      toast({
        title: "Purchase Failed",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setBuying(false);
    }
  };
  

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          Marketplace
        </Heading>

        {/* NFT Selection Dropdown */}
        {address && (
          <Box bgColor={'grey'}>
            <Text fontWeight="bold" mb={2}>
              Select Your NFT:
            </Text>
            {nfts.length > 0 ? (
              <Select placeholder="Select NFT" onChange={handleNFTSelect}>
                {nfts.map((nft) => (
                  <option key={nft.tokenId} value={nft.tokenId}>
                    NFT #{nft.tokenId}
                  </option>
                ))}
              </Select>
            ) : (
              <Text>You do not own any NFTs.</Text>
            )}
          </Box>
        )}

        {/* Resource Cards with Quantity Inputs */}
        {selectedNFT && resourcePrices && (
          <>
            <Heading as="h2" size="lg" textAlign="center">
              Resources for NFT #{selectedNFT.tokenId}
            </Heading>

            <SimpleGrid columns={[1, 2, 3]} spacing={6} bgColor={'grey'}>
              {/* Food */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                shadow="md"
              >
                <Text fontSize="2xl" mb={4}>
                  Food
                </Text>
                <Text mb={2}>
                  Price: {formatUnits(resourcePrices.foodPrice, 18)} Fjunlund Tokens per unit
                </Text>
                <NumberInput
                  min={0}
                  value={desiredResources.food}
                  onChange={(value) => handleQuantityChange("food", value)}
                >
                  <NumberInputField placeholder="Quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              {/* Wood */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                shadow="md"
              >
                <Text fontSize="2xl" mb={4}>
                  Wood
                </Text>
                <Text mb={2}>
                  Price: {formatUnits(resourcePrices.woodPrice, 18)} Fjunlund Tokens Tokens per unit
                </Text>
                <NumberInput
                  min={0}
                  value={desiredResources.wood}
                  onChange={(value) => handleQuantityChange("wood", value)}
                >
                  <NumberInputField placeholder="Quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              {/* Stone */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                shadow="md"
              >
                <Text fontSize="2xl" mb={4}>
                  Stone
                </Text>
                <Text mb={2}>
                  Price: {formatUnits(resourcePrices.stonePrice, 18)} Fjunlund Tokens Tokens per unit
                </Text>
                <NumberInput
                  min={0}
                  value={desiredResources.stone}
                  onChange={(value) => handleQuantityChange("stone", value)}
                >
                  <NumberInputField placeholder="Quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              {/* Brass */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                shadow="md"
              >
                <Text fontSize="2xl" mb={4}>
                  Brass
                </Text>
                <Text mb={2}>
                  Price: {formatUnits(resourcePrices.brassPrice, 18)} Fjunlund Tokens Tokens per unit
                </Text>
                <NumberInput
                  min={0}
                  value={desiredResources.brass}
                  onChange={(value) => handleQuantityChange("brass", value)}
                >
                  <NumberInputField placeholder="Quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              {/* Iron */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                shadow="md"
              >
                <Text fontSize="2xl" mb={4}>
                  Iron
                </Text>
                <Text mb={2}>
                  Price: {formatUnits(resourcePrices.ironPrice, 18)} Fjunlund Tokens Tokens per unit
                </Text>
                <NumberInput
                  min={0}
                  value={desiredResources.iron}
                  onChange={(value) => handleQuantityChange("iron", value)}
                >
                  <NumberInputField placeholder="Quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>

              {/* Gold */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                p={6}
                shadow="md"
              >
                <Text fontSize="2xl" mb={4}>
                  Gold
                </Text>
                <Text mb={2}>
                  Price: {formatUnits(resourcePrices.goldPrice, 18)} Fjunlund Tokens Tokens per unit
                </Text>
                <NumberInput
                  min={0}
                  value={desiredResources.gold}
                  onChange={(value) => handleQuantityChange("gold", value)}
                >
                  <NumberInputField placeholder="Quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </Box>
            </SimpleGrid>

            {/* Buy Selected Resources Button */}
            <Center>
              <Button
                colorScheme="teal"
                mt={6}
                onClick={buySelectedResources}
                isLoading={buying}
                loadingText="Purchasing"
                isDisabled={buying}
              >
                Buy Selected Resources
              </Button>
            </Center>
          </>
        )}

        {/* Loading Resource Prices */}
        {selectedNFT && !resourcePrices && (
          <Center>
            <Spinner size="xl" />
          </Center>
        )}
      </VStack>
    </Container>
  );
};

export default Marketplace;
