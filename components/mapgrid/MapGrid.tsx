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
  // Decide on the display size
  const displayWidth = 800; // Adjust as needed
  const displayHeight = 600; // Adjust as needed

  // Calculate the scale factor to fit the map within the display area
  const totalWidth = GRID_SIZE * CELL_SIZE;
  const totalHeight = GRID_SIZE * CELL_SIZE;

  const scaleX = displayWidth / totalWidth;
  const scaleY = displayHeight / totalHeight;
  const scale = Math.min(scaleX, scaleY);

  // Adjust the cell size accordingly
  const adjustedCellSize = CELL_SIZE * scale;

  return (
    <div
      style={{
        width: displayWidth,
        height: displayHeight,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          width: totalWidth * scale,
          height: totalHeight * scale,
          position: "relative",
          backgroundImage: "url('/img/map1.webp')",
          backgroundSize: "100% 100%",
          backgroundPosition: "top left",
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
                transform: "translate(-50%, -50%)",
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
                layout="fill"
                objectFit="cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapGrid;
