'use client';

import { useEffect, useState, useMemo } from 'react';
import { Box, Flex, Text, Spinner, Image, Tooltip } from '@chakra-ui/react';
import { ethers } from 'ethers';
import LandNFTABI from '../../artifacts/contracts/landNFT.sol/LandNFT.json';
import MapContractABI from '../../artifacts/contracts/mapContract.sol/MapContract.json';
import { LandNFT } from '../../typechain-types/contracts/landNFT.sol/LandNFT';
import { MapContract } from '../../typechain-types/contracts/mapContract.sol/MapContract';
import { FixedSizeGrid as Grid } from 'react-window';
import medievalTile from '/public/images/medieval-tile.png'; // Tile image for land
import nftMarker from '/public/images/nft-marker.png'; // NFT marker image
import mountainTile from '/public/images/mountain-tile.png'; // Mountain image for unownable land

const LAND_NFT_CONTRACT = '0xbDAa58F7f2C235DD93a0396D653AEa09116F088d'; // Replace with your LandNFT contract address
const MAP_CONTRACT_ADDRESS = '0xf2459e359F94cCDB899ddf193df703ECB5dC6F53'; // Replace with your MapContract address

interface NFTData {
  tokenId: number;
  x: number;
  y: number;
}

export default function MapPage() {
  const [nftData, setNftData] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tileSize, setTileSize] = useState<number>(32); // Default tile size
  const [gridWidth, setGridWidth] = useState<number>(100); // Grid width for 10,000 locations
  const [gridHeight, setGridHeight] = useState<number>(100); // Grid height for 10,000 locations
  const [minCoordinate, setMinCoordinate] = useState<number>(0);
  const [maxCoordinateX, setMaxCoordinateX] = useState<number>(99); // Max X coordinate for 100x100 grid
  const [maxCoordinateY, setMaxCoordinateY] = useState<number>(99); // Max Y coordinate for 100x100 grid
  const [unownableCoords, setUnownableCoords] = useState<{ [key: string]: boolean }>({}); // Store unownable coordinates
  
  const provider = useMemo(() => {
    return window.ethereum ? new ethers.BrowserProvider(window.ethereum) : ethers.getDefaultProvider();
  }, []);

  // Calculate tile size to fit the screen width
  const calculateTileSize = () => {
    const maxWidth = window.innerWidth * 0.95; // 95% of viewport width
    const maxHeight = window.innerHeight * 0.8; // 80% of viewport height

    const sizeBasedOnWidth = maxWidth / gridWidth;
    const sizeBasedOnHeight = maxHeight / gridHeight;

    const calculatedTileSize = Math.floor(Math.min(sizeBasedOnWidth, sizeBasedOnHeight));

    // Set a minimum and maximum tile size to ensure usability
    const minimumTileSize = 10;
    const maximumTileSize = 50;
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
  }, [gridWidth, gridHeight]);

  // Fetch all NFT coordinates and unownable coordinates
  const fetchNFTCoordinates = async () => {
    try {
      setLoading(true);

      const mapContract = new ethers.Contract(
        MAP_CONTRACT_ADDRESS,
        MapContractABI.abi,
        provider
      ) as unknown as MapContract;

      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        provider
      ) as unknown as LandNFT;

      const nftCoordinates: NFTData[] = [];

      // Fetch all token IDs from LandNFT in a batch
      const nextTokenIdBN = await landNFTContract.nextTokenId();
      const nextTokenId = Number(nextTokenIdBN.toString());

      // Fetch coordinates for all NFTs
      const coordinatePromises = Array.from({ length: nextTokenId - 1 }, (_, tokenId) => 
        mapContract.getTokenCoordinates(tokenId + 1)
          .then(([x, y]) => ({ tokenId: tokenId + 1, x: Number(x), y: Number(y) }))
          .catch(() => null)
      );

      const nftCoordinatesResult = await Promise.all(coordinatePromises);
      setNftData(nftCoordinatesResult.filter(Boolean) as NFTData[]); // Filter out any failed fetches

    } catch (error) {
      console.error('Error fetching map data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTCoordinates();
  }, [provider]);

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
    const y = maxCoordinateY - rowIndex; // Reverse y-axis to match original rendering
    const nftAtPosition = nftData.find((nft) => nft.x === x && nft.y === y);
    const isUnownable = unownableCoords[`${x}_${y}`];

    return (
      <Box
        style={style}
        backgroundImage={`url(${isUnownable ? mountainTile.src : medievalTile.src})`}
        backgroundSize="cover"
        border="1px solid #ccc"
        boxSizing="border-box"
        position="relative"
      >
        {nftAtPosition && !isUnownable && (
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
          columnCount={gridWidth}
          columnWidth={tileSize}
          height={Math.min(600, gridHeight * tileSize)}
          rowCount={gridHeight}
          rowHeight={tileSize}
          width={Math.min(1200, gridWidth * tileSize)}
        >
          {Cell}
        </Grid>
      </Box>
    </Box>
  );
}
