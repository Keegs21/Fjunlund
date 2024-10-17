'use client';

import { useEffect, useState } from 'react';
import { Box, Flex, Text, Spinner, Image, Tooltip } from '@chakra-ui/react';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/landNFT.sol/LandNFT.json';
import MapContractABI from '../../artifacts/contracts/mapContract.sol/MapContract.json';
import { LandNFT } from '../../typechain-types/contracts/landNFT.sol/LandNFT';
import { MapContract } from '../../typechain-types/contracts/mapContract.sol/MapContract';
import { FixedSizeGrid as Grid } from 'react-window';
import medievalTile from '/public/images/medieval-tile.png'; // Replace with your tile image
import nftMarker from '/public/images/nft-marker.png'; // Replace with your NFT marker image

const LAND_NFT_CONTRACT = '0xf0917dB35E39B32D67A632A311bF04580557632C'; // Replace with your LandNFT contract address
const MAP_CONTRACT_ADDRESS = '0x5c701e91cf32F6B4EDA87F47C796B4f4848e080a'; // Replace with your MapContract address

interface NFTData {
  tokenId: number;
  x: number;
  y: number;
}

export default function MapPage() {
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tileSize, setTileSize] = useState<number>(32); // Default tile size
  const [gridSize, setGridSize] = useState<number>(100); // Default value, will be updated
  const [minCoordinate, setMinCoordinate] = useState<number>(0);
  const [maxCoordinate, setMaxCoordinate] = useState<number>(99); // Default value, will be updated

  // Calculate tile size to fit the screen width
  const calculateTileSize = () => {
    const maxWidth = window.innerWidth * 0.95; // 95% of viewport width
    const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

    const sizeBasedOnWidth = maxWidth / gridSize;
    const sizeBasedOnHeight = maxHeight / gridSize;

    const calculatedTileSize = Math.floor(Math.min(sizeBasedOnWidth, sizeBasedOnHeight));

    // Set a minimum and maximum tile size to ensure usability
    const minimumTileSize = 20; // Adjust as needed
    const maximumTileSize = 50; // Adjust as needed
    const finalTileSize = Math.max(Math.min(calculatedTileSize, maximumTileSize), minimumTileSize);

    setTileSize(finalTileSize);
  };

  useEffect(() => {
    // Recalculate tile size on window resize
    window.addEventListener('resize', calculateTileSize);
    // Initial calculation
    calculateTileSize();

    return () => {
      window.removeEventListener('resize', calculateTileSize);
    };
  }, [gridSize]);

  // Fetch all NFT coordinates
  const fetchNFTCoordinates = async () => {
    try {
      setLoading(true);
      const provider = window.ethereum
        ? new ethers.BrowserProvider(window.ethereum)
        : ethers.getDefaultProvider();

      const mapContract = new ethers.Contract(
          MAP_CONTRACT_ADDRESS,
          MapContractABI.abi,
          provider
      ) as unknown as MapContract;

      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        provider
      ) as LandNFT;

      // Fetch GRID_SIZE, MIN_COORDINATE, and MAX_COORDINATE from the MapContract
      const GRID_SIZE = await mapContract.GRID_SIZE();
      const MIN_COORDINATE = await mapContract.MIN_COORDINATE();
      const MAX_COORDINATE = await mapContract.MAX_COORDINATE();

      setGridSize(Number(GRID_SIZE));
      setMinCoordinate(Number(MIN_COORDINATE));
      setMaxCoordinate(Number(MAX_COORDINATE));

      const nftCoordinates: NFTData[] = [];

      // Fetch all token IDs from LandNFT
      const nextTokenIdBN = await landNFTContract.nextTokenId();
      const nextTokenId = Number(nextTokenIdBN.toString());

      for (let tokenId = 1; tokenId < nextTokenId; tokenId++) {
        try {
          // Fetch coordinates from MapContract
          const [x, y] = await mapContract.getTokenCoordinates(tokenId);
          const xNum = Number(x.toString());
          const yNum = Number(y.toString());

          nftCoordinates.push({ tokenId, x: xNum, y: yNum });
        } catch (error) {
          console.error(`Error fetching coordinates for token ${tokenId}:`, error);
        }
      }

      setNftData(nftCoordinates);
    } catch (error) {
      console.error('Error fetching NFT coordinates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTCoordinates();
  }, []);

  const Cell = ({
    columnIndex,
    rowIndex,
    style,
  }: {
    columnIndex: number;
    rowIndex: number;
    style: React.CSSProperties;
  }) => {
    const x = columnIndex + minCoordinate;
    const y = maxCoordinate - rowIndex; // Reverse y-axis to match original rendering
    const nftAtPosition = nftData.find((nft) => nft.x === x && nft.y === y);

    return (
      <Box
        style={style}
        backgroundImage={`url(${medievalTile.src})`}
        backgroundSize="cover"
        border="1px solid #ccc"
        boxSizing="border-box"
        position="relative"
      >
        {nftAtPosition && (
          <Tooltip label={`Token ID: ${nftAtPosition.tokenId}`} placement="top">
            <Image
              src={nftMarker.src}
              alt={`NFT Token ${nftAtPosition.tokenId}`}
              position="absolute"
              top="0"
              left="0"
              width="100%"
              height="100%"
            />
          </Tooltip>
        )}
      </Box>
    );
  };

  if (loading) {
    return (
      <Flex height="100vh" alignItems="center" justifyContent="center" direction="column">
        <Spinner size="xl" thickness="4px" color="secondary.500" speed="0.65s" />
        <Text fontSize="xl" mt={4}>
          Loading map data...
        </Text>
      </Flex>
    );
  }

  return (
    <Box p={4}>
      <Text fontSize="2xl" mb={4} textAlign="center" color="secondary.500">
        Fjunlund Map
      </Text>
      <Box
        width="100%"
        overflowX="auto"
        overflowY="auto"
        maxHeight={`${window.innerHeight * 0.8}px`}
        border="1px solid #444"
        margin="0 auto"
      >
        <Grid
          columnCount={gridSize}
          columnWidth={tileSize}
          height={gridSize * tileSize}
          rowCount={gridSize}
          rowHeight={tileSize}
          width={gridSize * tileSize}
        >
          {Cell}
        </Grid>
      </Box>
    </Box>
  );
}
