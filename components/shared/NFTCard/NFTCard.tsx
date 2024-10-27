'use client';
// NFTCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import "./NFTCard.css"; // Import the CSS file

interface NFTCardProps {
  tokenId: string;
}

const NFTCard: React.FC<NFTCardProps> = ({ tokenId }) => {
  // Static example data
  const nft = {
    metadata: {
      name: `Land NFT #${tokenId}`,
      description: "A unique piece of land in Fjunlund.",
      image: "/img/desert.webp", // Replace with your placeholder image
    },
  };

  const landStats = {
    population: 100,
    production: 50,
    happiness: 75,
    technology: 20,
    piety: 10,
    strength: 15,
  };

  const resources = {
    food: 500,
    wood: 300,
    stone: 200,
    brass: 100,
    iron: 100,
    gold: 250,
  };

  const coordinates = {
    x: 10,
    y: 20,
  };

  // State to track hovered building index
  const [hoveredBuildingIndex, setHoveredBuildingIndex] = useState<number | null>(null);

  // Static Buildings List with Details
  const buildings = [
    {
      name: "Farm",
      output: "Produces food resources.",
      upkeep: "Consumes 10 wood per epoch.",
    },
    {
      name: "Lumber Mill",
      output: "Produces wood resources.",
      upkeep: "Consumes 5 stone per epoch.",
    },
    {
      name: "Iron Mine",
      output: "Produces iron resources.",
      upkeep: "Consumes 15 food per epoch.",
    },
    {
      name: "Workshop",
      output: "Increases production efficiency.",
      upkeep: "Consumes 10 iron per epoch.",
    },
    {
      name: "Marketplace",
      output: "Allows trading resources.",
      upkeep: "Consumes 5 gold per epoch.",
    },
    {
      name: "Barracks",
      output: "Trains military units.",
      upkeep: "Consumes 20 food and 10 wood per epoch.",
    },
  ];

  return (
    <div className="nft-card card mb-3">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center p-3">
          <Image
            src={nft.metadata.image}
            alt={nft.metadata.name}
            width={200}
            height={200}
            className="img-fluid rounded-start nft-image"
          />

          {/* Buildings List */}
          <div className="mt-4 w-100 position-relative">
            <h6 className="fw-bold mb-2">Buildings</h6>
            <ul className="list-group list-group-flush">
              {buildings.map((building, index) => (
                <li
                  key={index}
                  className="list-group-item building-item position-relative"
                  onMouseEnter={() => setHoveredBuildingIndex(index)}
                  onMouseLeave={() => setHoveredBuildingIndex(null)}
                >
                  {building.name}

                  {/* Show Popup if this building is hovered */}
                  {hoveredBuildingIndex === index && (
                    <div className="building-popup position-absolute">
                      <p>
                        <strong>Output:</strong> {building.output}
                      </p>
                      <p>
                        <strong>Upkeep:</strong> {building.upkeep}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details Section */}
        <div className="col-md-8">
          <div className="card-body">
            {/* Name and Description */}
            <h5 className="card-title">{nft.metadata.name}</h5>
            <p className="card-text">{nft.metadata.description}</p>

            <hr className="my-3" />

            {/* Land Statistics and Resources in the Same Row */}
            <div className="row">
              {/* Land Statistics */}
              <div className="col-md-6">
                <h6 className="fw-bold">Land Statistics</h6>
                <ul className="list-unstyled ms-2">
                  <li>
                    <strong>Population:</strong> {landStats.population}
                  </li>
                  <li>
                    <strong>Production:</strong> {landStats.production}
                  </li>
                  <li>
                    <strong>Happiness:</strong> {landStats.happiness}
                  </li>
                  <li>
                    <strong>Technology:</strong> {landStats.technology}
                  </li>
                  <li>
                    <strong>Piety:</strong> {landStats.piety}
                  </li>
                  <li>
                    <strong>Strength:</strong> {landStats.strength}
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div className="col-md-6">
                <h6 className="fw-bold">Resources</h6>
                <ul className="list-unstyled ms-2">
                  <li>
                    <strong>Food:</strong> {resources.food}
                  </li>
                  <li>
                    <strong>Wood:</strong> {resources.wood}
                  </li>
                  <li>
                    <strong>Stone:</strong> {resources.stone}
                  </li>
                  <li>
                    <strong>Brass:</strong> {resources.brass}
                  </li>
                  <li>
                    <strong>Iron:</strong> {resources.iron}
                  </li>
                  <li>
                    <strong>Gold:</strong> {resources.gold}
                  </li>
                </ul>
              </div>
            </div>

            <hr className="my-3" />

            {/* Coordinates */}
            <div>
              <h6 className="fw-bold">Coordinates</h6>
              <p className="ms-2">
                X: {coordinates.x}, Y: {coordinates.y}
              </p>
            </div>

            {/* Actions */}
            <div className="mt-3">
              <button className="btn btn-primary btn-sm me-2">
                Action Button
              </button>
              {/* Add more buttons as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
