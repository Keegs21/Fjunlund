'use client';

import React from "react";
import Image from "next/image";

// NFT data remains the same...
const nftData = [
  { id: 1, x: 10, y: 20, imageUrl: "/img/nft-marker.png" },
  { id: 2, x: 50, y: 75, imageUrl: "/img/nft-marker.png" },
  // ...additional NFTs
];

const GRID_SIZE = 100; // 100 rows and 100 columns
const CELL_SIZE = 50; // Original pixels per cell

const MapGrid = () => {
  // Define the display size (you can adjust these values as needed)
  const displayWidth = 1600; // Width of the display area in pixels
  const displayHeight = 1200; // Height of the display area in pixels

  // Calculate the total size of the grid
  const totalWidth = GRID_SIZE * CELL_SIZE;
  const totalHeight = GRID_SIZE * CELL_SIZE;

  // Calculate the scale factor to fit the grid within the display area
  const scaleX = displayWidth / totalWidth;
  const scaleY = displayHeight / totalHeight;
  const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

  // Adjust the cell size based on the scale factor
  const adjustedCellSize = CELL_SIZE * scale;

  return (
    <div
      style={{
        width: displayWidth,
        height: displayHeight,
        overflow: "hidden",
        position: "relative",
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <div
        style={{
          width: totalWidth * scale,
          height: totalHeight * scale,
          position: "relative",
          backgroundImage: "url('/img/map1.webp')",
          backgroundSize: "cover", // Ensure the image covers the entire div
          backgroundPosition: "center", // Center the background image
          backgroundRepeat: "no-repeat",
        }}
      >
        {nftData.map((nft) => {
          const xPos = nft.x * adjustedCellSize;
          const yPos = nft.y * adjustedCellSize;

          return (
            <div
              key={nft.id}
              style={{
                position: "absolute",
                top: yPos,
                left: xPos,
                width: adjustedCellSize,
                height: adjustedCellSize,
                transform: "translate(-50%, -50%)", // Center the NFT within the cell
                border: "1px solid rgba(0, 0, 0, 0.1)",
                boxSizing: "border-box",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => {
                alert(`NFT ID: ${nft.id}`);
              }}
            >
              <Image
                src={nft.imageUrl}
                alt={`NFT ${nft.id}`}
                fill // Use 'fill' to make the image cover the parent div
                style={{ objectFit: "cover" }} // Ensure the image covers the div without distortion
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapGrid;
