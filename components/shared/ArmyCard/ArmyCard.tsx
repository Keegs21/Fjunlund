"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import UnitNFTABI from "../../../contracts/artifacts/contracts/UnitNFT.sol/UnitNFT.json";
import { useAccount } from "wagmi";
import { UnitNFT } from "../../../contracts/typechain-types/contracts/UnitNFT.sol/UnitNFT";
import Image from "next/image";
import "./ArmyCard.css";

const UNIT_NFT_CONTRACT = "0x782b9f1855d6FA94819B677c2b81D81E5CE715d9"; // Your UnitNFT contract address

interface UnitData {
  tokenId: number;
  unitStats: {
    name: string;
    attack: number;
    defense: number;
    speed: number;
    range: number;
    abilities: string;
    isActive: boolean;
  };
}

const NFTPage: React.FC = () => {
  const { address } = useAccount();
  const [userUnits, setUserUnits] = useState<UnitData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUserUnits = async () => {
    try {
      if (window.ethereum && address) {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const unitNFTContract = new ethers.Contract(
          UNIT_NFT_CONTRACT,
          UnitNFTABI.abi,
          signer
        ) as unknown as UnitNFT;

        // Fetch the unit IDs owned by the user
        const unitIds: ethers.BigNumberish[] = await unitNFTContract.getUnitsByOwner(address);

        const unitsData: UnitData[] = [];

        for (const id of unitIds) {
          const tokenId = Number(id);

          // Fetch unit stats for this tokenId
          const unit = await unitNFTContract.getUnitStats(tokenId);

          unitsData.push({
            tokenId,
            unitStats: {
              name: unit.name,
              attack: Number(unit.attack),
              defense: Number(unit.defense),
              speed: Number(unit.speed),
              range: Number(unit.range),
              abilities: unit.abilities,
              isActive: unit.isActive,
            },
          });
        }

        setUserUnits(unitsData);
      }
    } catch (error) {
      console.error("Error fetching user units:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchUserUnits();
    }
  }, [address]);

  if (!address) {
    return (
      <div className="nft-page-container">
        <h2 className="page-title">Your Army Deck</h2>
        <p>Please connect your wallet to view your army units.</p>
      </div>
    );
  }

  return (
    <div className="nft-page-container">
      <h2 className="page-title">Your Army Deck</h2>
      {loading ? (
        <p>Loading your units...</p>
      ) : userUnits.length > 0 ? (
        <div className="army-deck">
          <div className="army-cards">
            {userUnits.map((unit) => (
              <div key={unit.tokenId} className="army-card">
                {/* Unit Image */}
                <div className="unit-image">
                  <Image
                    src={`/img/${unit.unitStats.name.toLowerCase()}.webp`}
                    alt={unit.unitStats.name}
                    width={150}
                    height={150}
                    onError={(e) => {
                      e.currentTarget.src = "/img/placeholder.webp";
                    }}
                  />
                </div>

                {/* Unit Name */}
                <h3 className="unit-name">{unit.unitStats.name}</h3>

                {/* Unit Details */}
                <div className="unit-details">
                  {/* Unit Stats */}
                  <div className="unit-stats">
                    <h4 className="section-title">Unit Stats</h4>
                    <ul>
                      <li>Attack: {unit.unitStats.attack}</li>
                      <li>Defense: {unit.unitStats.defense}</li>
                      <li>Speed: {unit.unitStats.speed}</li>
                      <li>Range: {unit.unitStats.range}</li>
                      <li>Abilities: {unit.unitStats.abilities || "None"}</li>
                    </ul>
                  </div>
                </div>

                {/* Status */}
                <p className="status">
                  Status: {unit.unitStats.isActive ? "Active" : "Inactive"}
                </p>

                {/* Action Buttons */}
                {/* You can implement activate/deactivate functionality if available */}
                {/* <div className="unit-actions">
                  <button className="action-button">
                    {unit.unitStats.isActive ? "Deactivate Unit" : "Activate Unit"}
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>You don't own any units.</p>
      )}
    </div>
  );
};

export default NFTPage;
