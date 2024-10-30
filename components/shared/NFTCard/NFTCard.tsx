// NFTCard.tsx
'use client';
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import LandNFTABI from "../../../contracts/artifacts/contracts/landNFT.sol/LandNFT.json";
import BuildingManagerABI from "../../../contracts/artifacts/contracts/BuildingManager.sol/BuildingManager.json";
import ERC20ABI from "../../../contracts/artifacts/contracts/erc20.sol/erc20.json"; // Ensure you have the correct path
import "./NFTCard.css"; // Import the CSS file

// Smart Contract Addresses
const LAND_NFT_CONTRACT = "0xbDAa58F7f2C235DD93a0396D653AEa09116F088d"; // Replace with your actual LandNFT contract address
const BUILDING_MANAGER_CONTRACT = "0x058aBf1000EF621EEE1bf186ed76B44C8bdBe5d6"; // Replace with your actual BuildingManager contract address
const ERC20_CONTRACT_ADDRESS = "0x05c5ecee53692524f72e10588a787aed324de367"; // Replace with your actual ERC20 contract address

interface NFTCardProps {
  tokenId: string;
}

interface LandStats {
  population: number;
  production: number;
  happiness: number;
  technology: number;
  piety: number;
  strength: number;
  resources: {
    food: number;
    wood: number;
    stone: number;
    brass: number;
    iron: number;
    gold: number;
  };
  buildings: Array<{
    name: string;
    level: number;
    isActive: boolean;
  }>;
  constructions: Array<{
    name: string;
    level: number;
    completionTime: number;
  }>;
}

interface Coordinates {
  x: number;
  y: number;
}

interface BuildingInfo {
  name: string;
  level: number;
  baseCost: {
    food: number;
    wood: number;
    stone: number;
    brass: number;
    iron: number;
    gold: number;
  };
  upkeepCost: {
    food: number;
    wood: number;
    stone: number;
    brass: number;
    iron: number;
    gold: number;
  };
  productionBoost: number;
  happinessBoost: number;
  technologyBoost: number;
  pietyBoost: number;
  strengthBoost: number;
  resourceProduction: {
    foodPerEpoch: number;
    woodPerEpoch: number;
    stonePerEpoch: number;
    brassPerEpoch: number;
    ironPerEpoch: number;
    goldPerEpoch: number;
  };
  baseConstructionTime: number;
  imageURI: string;
}

const capitalize = (s: string): string => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const resourceImages: { [key: string]: string } = {
  food: "/img/food.png",
  wood: "/img/wood.png",
  stone: "/img/stone.png",
  brass: "/img/brass.png",
  iron: "/img/iron.jpeg",
  gold: "/img/gold.png",
};

const NFTCard: React.FC<NFTCardProps> = ({ tokenId }) => {
  const { address } = useAccount();
  const [nftData, setNftData] = useState<{
    landStats: LandStats;
    coordinates: Coordinates;
  } | null>(null);
  const [buildingsInfo, setBuildingsInfo] = useState<BuildingInfo[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [buildingLoading, setBuildingLoading] = useState<boolean>(false);
  const [completeLoading, setCompleteLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatIPFS = (uri: string): string => {
    if (uri.startsWith("ipfs://")) {
      const cid = uri.replace("ipfs://", "");
      return `https://ipfs.io/ipfs/${cid}`; // Using IPFS gateway
    }
    return uri; // Return as-is if it's not an IPFS URI
  };

  const getTimeLeft = (completionTime: number): string => {
    const now = Math.floor(Date.now() / 1000); // Current time in UNIX timestamp
    const secondsLeft = completionTime - now;

    if (secondsLeft <= 0) {
      return "Completed";
    }

    const days = Math.floor(secondsLeft / (3600 * 24));
    const hours = Math.floor((secondsLeft % (3600 * 24)) / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    const daysDisplay = days > 0 ? `${days}d ` : "";
    const hoursDisplay = hours > 0 ? `${hours}h ` : "";
    const minutesDisplay = minutes > 0 ? `${minutes}m ` : "";
    const secondsDisplay = `${seconds}s`;

    return `${daysDisplay}${hoursDisplay}${minutesDisplay}${secondsDisplay}`;
  };

  // Fetch NFT Data (Land Stats & Coordinates)
  const fetchNFTData = async () => {
    try {
      if (window.ethereum && address) {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        );

        // Fetch land stats for this tokenId
        const landStats = await landNFTContract.getLandStats(tokenId);

        // Fetch coordinates
        const [xBN, yBN] = await landNFTContract.getLandCoordinates(tokenId);
        const x = Number(xBN);
        const y = Number(yBN);
        const coordinates = { x, y };

        // Structure the data
        const structuredData = {
          landStats: {
            population: Number(landStats.population),
            production: Number(landStats.production),
            happiness: Number(landStats.happiness),
            technology: Number(landStats.technology),
            piety: Number(landStats.piety),
            strength: Number(landStats.strength),
            resources: {
              food: Number(landStats.resources.food),
              wood: Number(landStats.resources.wood),
              stone: Number(landStats.resources.stone),
              brass: Number(landStats.resources.brass),
              iron: Number(landStats.resources.iron),
              gold: Number(landStats.resources.gold),
            },
            buildings: landStats.buildings.map((b: any) => ({
              name: b.name,
              level: Number(b.level),
              isActive: b.isActive,
            })),
            constructions: landStats.constructions.map((c: any) => ({
              name: c.name,
              level: Number(c.level),
              completionTime: Number(c.completionTime.toString()),
            })),
          },
          coordinates,
        };

        setNftData(structuredData);
        setError(null);
      } else {
        setError("Please install MetaMask to interact with this feature.");
      }
    } catch (err: any) {
      console.error("Error fetching NFT data:", err);
      setError(err.message || "Error fetching NFT data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Buildings Info from BuildingManager Contract
  const fetchBuildingsInfo = async () => {
    try {
      if (window.ethereum && address) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const buildingManagerContract = new ethers.Contract(
          BUILDING_MANAGER_CONTRACT,
          BuildingManagerABI.abi,
          signer
        );

        // Define building names and levels
        const buildings = [
          { name: "Farm", level: 1 },
          { name: "Lumber Mill", level: 1 },
          { name: "Quarry", level: 1 },
          { name: "Iron Mine", level: 1 },
          { name: "Workshop", level: 1 },
          { name: "Marketplace", level: 1 },
          { name: "Barracks", level: 1 },
          { name: "Temple", level: 1 },
          { name: "Academy", level: 1 },
          { name: "Stables", level: 1 },
          { name: "Estate", level: 2 },
          { name: "University", level: 2 },
          { name: "Cathedral", level: 2 },
          { name: "Sawmill", level: 2 },
          { name: "Stoneworks", level: 2 },
          { name: "Steelworks", level: 2 },
          { name: "Factory", level: 2 },
          { name: "Trading Post", level: 2 },
          { name: "Fortress", level: 2 },
          { name: "Cavalry School", level: 2 },
        ];

        const buildingData: BuildingInfo[] = [];

        for (const building of buildings) {
          const info = await buildingManagerContract.getBuildingInfo(building.name, building.level);
          buildingData.push({
            name: building.name,
            level: building.level,
            baseCost: {
              food: Number(info.baseCost.food),
              wood: Number(info.baseCost.wood),
              stone: Number(info.baseCost.stone),
              brass: Number(info.baseCost.brass),
              iron: Number(info.baseCost.iron),
              gold: Number(info.baseCost.gold),
            },
            upkeepCost: {
              food: Number(info.upkeepCost.food),
              wood: Number(info.upkeepCost.wood),
              stone: Number(info.upkeepCost.stone),
              brass: Number(info.upkeepCost.brass),
              iron: Number(info.upkeepCost.iron),
              gold: Number(info.upkeepCost.gold),
            },
            productionBoost: Number(info.productionBoost),
            happinessBoost: Number(info.happinessBoost),
            technologyBoost: Number(info.technologyBoost),
            pietyBoost: Number(info.pietyBoost),
            strengthBoost: Number(info.strengthBoost),
            resourceProduction: {
              foodPerEpoch: Number(info.resourceProduction.foodPerEpoch),
              woodPerEpoch: Number(info.resourceProduction.woodPerEpoch),
              stonePerEpoch: Number(info.resourceProduction.stonePerEpoch),
              brassPerEpoch: Number(info.resourceProduction.brassPerEpoch),
              ironPerEpoch: Number(info.resourceProduction.ironPerEpoch),
              goldPerEpoch: Number(info.resourceProduction.goldPerEpoch),
            },
            baseConstructionTime: Number(info.baseConstructionTime),
            imageURI: info.imageURI,
          });
        }

        setBuildingsInfo(buildingData);
      }
    } catch (err) {
      console.error("Error fetching buildings info:", err);
    }
  };

  // Handle Building Selection Change
  const handleBuildingSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = event.target.value;
    const building = buildingsInfo.find((b) => b.name === selectedName);
    setSelectedBuilding(building || null);
  };

  // Function to start building construction
  const startBuildingConstruction = async () => {
    if (!selectedBuilding || !nftData) return;

    try {
      if (!window.ethereum) {
        alert("Please install MetaMask to interact with this feature.");
        return;
      }

      setBuildingLoading(true);

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Prompt user to connect wallet
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      // Instantiate contracts
      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      );
      const buildingManagerContract = new ethers.Contract(
        BUILDING_MANAGER_CONTRACT,
        BuildingManagerABI.abi,
        signer
      );
      const erc20Contract = new ethers.Contract(
        ERC20_CONTRACT_ADDRESS,
        ERC20ABI,
        signer
      );

      console.log("LandNFT Contract Instance:", landNFTContract);
      console.log("BuildingManager Contract Instance:", buildingManagerContract);
      console.log("ERC20 Contract Instance:", erc20Contract);

      // Calculate ERC20 cost: gold cost * 10^8
      const erc20CostInUnits = ethers.parseUnits(selectedBuilding.baseCost.gold.toString(), 8);
      console.log("ERC20 Cost in Units:", erc20CostInUnits.toString());

      // Check ERC20 balance
      const balance = await erc20Contract.balanceOf(userAddress);
      console.log("User ERC20 Balance:", balance.toString());
      if (balance.lt(erc20CostInUnits)) { // Use .lt for BigNumber comparison
        alert("You do not have enough ERC20 tokens to pay for this building.");
        setBuildingLoading(false);
        return;
      }

      // Check ERC20 allowance
      const allowance = await erc20Contract.allowance(userAddress, BUILDING_MANAGER_CONTRACT);
      console.log("ERC20 Allowance:", allowance.toString());
      if (allowance.lt(erc20CostInUnits)) { // Use .lt for BigNumber comparison
        // Prompt user to approve ERC20 tokens
        alert("Approving ERC20 Tokens. Please confirm the transaction in MetaMask.");

        const approveTx = await erc20Contract.approve(
          BUILDING_MANAGER_CONTRACT,
          ethers.parseUnits("1000000", 18)
        ); // Approving a high amount to reduce future approvals
        console.log("Approval Transaction Sent:", approveTx.hash);
        await approveTx.wait();
        console.log("ERC20 Tokens Approved Successfully.");

        alert("ERC20 Tokens Approved Successfully.");
      }

      // Estimate gas using correct syntax
      const estimatedGas = await landNFTContract.startBuildingConstruction.estimateGas(
        Number(tokenId),
        selectedBuilding.name,
        selectedBuilding.level
      );
      console.log("Estimated Gas Limit:", estimatedGas.toString());

      // Execute transaction
      const tx = await landNFTContract.startBuildingConstruction(
        Number(tokenId),
        selectedBuilding.name,
        selectedBuilding.level,
        {
          gasLimit: estimatedGas, // Using estimated gas
        }
      );
      console.log("Transaction Sent:", tx.hash);
      alert(`Building Construction Started. Transaction Hash: ${tx.hash}`);

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Transaction Mined:", receipt.transactionHash);

      alert(`Your building construction for ${selectedBuilding.name} has been started.`);

      // Refresh NFT data to reflect changes
      fetchNFTData();
      setSelectedBuilding(null); // Reset selection
    } catch (error: any) {
      console.error("Error starting building construction:", error);
      alert(`Transaction Failed: ${error?.message || "Unknown error."}`);
    } finally {
      setBuildingLoading(false);
    }
  };

  // Function to complete constructions
  const completeConstructions = async () => {
    if (!canCompleteConstructions) return;

    try {
      setCompleteLoading(true);

      if (!window.ethereum) {
        alert("Please install MetaMask to interact with this feature.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []); // Prompt user to connect wallet
      const signer = await provider.getSigner();

      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      );

      // Estimate gas for the transaction
      const estimatedGas = await landNFTContract.completeBuildingConstruction.estimateGas(tokenId);
      console.log("Estimated Gas Limit for Completion:", estimatedGas.toString());

      // Execute the transaction
      const tx = await landNFTContract.completeBuildingConstruction(tokenId, {
        gasLimit: estimatedGas, // Using estimated gas
      });
      console.log("Completion Transaction Sent:", tx.hash);
      alert(`Building constructions are being completed. Transaction Hash: ${tx.hash}`);

      // Wait for transaction to be mined
      const receipt = await tx.wait();
      console.log("Completion Transaction Mined:", receipt.transactionHash);

      alert(`Your buildings have been successfully completed.`);

      // Refresh NFT data to reflect changes
      fetchNFTData();
    } catch (error: any) {
      console.error("Error completing building constructions:", error);
      alert(`Completion Failed: ${error?.message || "Unknown error."}`);
    } finally {
      setCompleteLoading(false);
    }
  };

  useEffect(() => {
    if (tokenId && address) {
      fetchNFTData();
      fetchBuildingsInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenId, address]);

  // Calculate Total Upkeep by aggregating upkeepCost from all buildings
  const totalUpkeep = useMemo(() => {
    const upkeepTotals = buildingsInfo.reduce((acc, buildingInfo) => {
      acc.food += buildingInfo.upkeepCost.food;
      acc.wood += buildingInfo.upkeepCost.wood;
      acc.stone += buildingInfo.upkeepCost.stone;
      acc.brass += buildingInfo.upkeepCost.brass;
      acc.iron += buildingInfo.upkeepCost.iron;
      acc.gold += buildingInfo.upkeepCost.gold;
      return acc;
    }, { food: 0, wood: 0, stone: 0, brass: 0, iron: 0, gold: 0 });

    return upkeepTotals;
  }, [buildingsInfo]);

  // Calculate Total Output by aggregating resourceProduction from all buildings
  const totalOutput = useMemo(() => {
    const outputTotals = buildingsInfo.reduce((acc, buildingInfo) => {
      acc.food += buildingInfo.resourceProduction.foodPerEpoch;
      acc.wood += buildingInfo.resourceProduction.woodPerEpoch;
      acc.stone += buildingInfo.resourceProduction.stonePerEpoch;
      acc.brass += buildingInfo.resourceProduction.brassPerEpoch;
      acc.iron += buildingInfo.resourceProduction.ironPerEpoch;
      acc.gold += buildingInfo.resourceProduction.goldPerEpoch;
      return acc;
    }, { food: 0, wood: 0, stone: 0, brass: 0, iron: 0, gold: 0 });

    return outputTotals;
  }, [buildingsInfo]);

  // Calculate Total Stat Boosts by aggregating boosts from all buildings
  const totalStatBoosts = useMemo(() => {
    const statBoostTotals = buildingsInfo.reduce((acc, buildingInfo) => {
      acc.production += buildingInfo.productionBoost;
      acc.happiness += buildingInfo.happinessBoost;
      acc.technology += buildingInfo.technologyBoost;
      acc.piety += buildingInfo.pietyBoost;
      acc.strength += buildingInfo.strengthBoost;
      return acc;
    }, { production: 0, happiness: 0, technology: 0, piety: 0, strength: 0 });

    return statBoostTotals;
  }, [buildingsInfo]);

  if (loading) {
    return (
      <div className="nft-card card mb-3">
        <div className="card-body text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading NFT data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="nft-card card mb-3">
        <div className="card-body">
          <p className="text-danger">{error}</p>
        </div>
      </div>
    );
  }

  if (!nftData) {
    return (
      <div className="nft-card card mb-3">
        <div className="card-body">
          <p>NFT data not available.</p>
        </div>
      </div>
    );
  }

  // Determine if there are constructions ready to be completed
  const canCompleteConstructions = nftData.landStats.constructions.some(
    (construction) => construction.completionTime <= Math.floor(Date.now() / 1000)
  );

  return (
    <div className="nft-card card mb-3">
      <div className="row g-0">
        {/* Image Section */}
        <div className="col-md-4 d-flex flex-column align-items-center justify-content-center p-3">
          <Image
            src={`/images/land/${nftData.landStats.population}.webp`} // Example: dynamic image based on population
            alt={`Land NFT #${tokenId}`}
            width={200}
            height={200}
            className="img-fluid rounded-start nft-image"
            onError={(e) => {
              e.currentTarget.src = "/img/bg.webp"; // Fallback image
            }}
          />

          {/* Buildings List */}
          <div className="mt-4 w-100 position-relative">
            <h6 className="fw-bold mb-2">Buildings</h6>
            <ul className="list-group list-group-flush">
              {nftData.landStats.buildings.map((building, index) => {
                // Find the corresponding BuildingInfo for the current building
                const buildingInfo = buildingsInfo.find(
                  (b) => b.name === building.name && b.level === building.level
                );

                // If BuildingInfo is found, format the image URI; else, use a placeholder
                const imageURI = buildingInfo ? formatIPFS(buildingInfo.imageURI) : "/img/placeholder.webp";

                return (
                  <li
                    key={index}
                    className="list-group-item building-item d-flex align-items-center"
                    tabIndex={0} // Makes the <li> focusable
                    aria-describedby={`tooltip-${index}`} // Associates tooltip with the list item
                  >
                    <Image
                      src={imageURI}
                      alt={`${building.name} Image`}
                      width={48} // Increased size for better visibility
                      height={48}
                      className="me-2"
                      onError={(e) => {
                        e.currentTarget.src = "/img/placeholder.webp"; // Fallback image
                      }}
                      loading="lazy" // Enables lazy loading
                    />
                    <div className="building-info">
                      <h6 id={`tooltip-${index}`}>{building.name} (Level {building.level})</h6>
                      {buildingInfo && (
                        <div className="tooltip-text" role="tooltip">
                          <strong>Output:</strong>
                          <ul className="list-unstyled mb-1">
                            {Object.entries(buildingInfo.resourceProduction)
                              .filter(([resource, amount]) => amount > 0)
                              .map(([resource, amount], idx) => (
                                <li key={idx}>
                                  {capitalize(resource)}: {amount} per epoch
                                </li>
                              ))}
                          </ul>
                          <strong>Upkeep:</strong>
                          <ul className="list-unstyled">
                            {Object.entries(buildingInfo.upkeepCost)
                              .filter(([resource, amount]) => amount > 0)
                              .map(([resource, amount], idx) => (
                                <li key={idx}>
                                  {capitalize(resource)}: {amount}
                                </li>
                              ))}
                          </ul>
                          <strong>Stat Boosts:</strong>
                          <ul className="list-unstyled">
                            {buildingInfo.productionBoost > 0 && (
                              <li>{capitalize("production")} Boost: +{buildingInfo.productionBoost}</li>
                            )}
                            {buildingInfo.happinessBoost > 0 && (
                              <li>{capitalize("happiness")} Boost: +{buildingInfo.happinessBoost}</li>
                            )}
                            {buildingInfo.technologyBoost > 0 && (
                              <li>{capitalize("technology")} Boost: +{buildingInfo.technologyBoost}</li>
                            )}
                            {buildingInfo.pietyBoost > 0 && (
                              <li>{capitalize("piety")} Boost: +{buildingInfo.pietyBoost}</li>
                            )}
                            {buildingInfo.strengthBoost > 0 && (
                              <li>{capitalize("strength")} Boost: +{buildingInfo.strengthBoost}</li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Details Section */}
        <div className="col-md-8">
          <div className="card-body">
            {/* Name and Description */}
            <h5 className="card-title">Land NFT #{tokenId}</h5>
            <p className="card-text">A unique piece of land in Fjunlund.</p>

            <hr className="my-3" />

            {/* Land Statistics and Resources in the Same Row */}
            <div className="row">
              {/* Land Statistics */}
              <div className="col-md-3">
                <h6 className="fw-bold">Land Statistics</h6>
                <ul className="list-unstyled ms-2">
                  <li>
                    <strong>Population:</strong> {nftData.landStats.population}
                  </li>
                  <li>
                    <strong>Production:</strong> {nftData.landStats.production}
                  </li>
                  <li>
                    <strong>Happiness:</strong> {nftData.landStats.happiness}
                  </li>
                  <li>
                    <strong>Technology:</strong> {nftData.landStats.technology}
                  </li>
                  <li>
                    <strong>Piety:</strong> {nftData.landStats.piety}
                  </li>
                  <li>
                    <strong>Strength:</strong> {nftData.landStats.strength}
                  </li>
                </ul>
              </div>

              {/* Resources, Upkeep, and Output in a Single Row */}
              <div className="col-md-8">
                <h6 className="fw-bold">Resources</h6>
                <div className="d-flex justify-content-between">
                  {/* Resources */}
                  <div className="resources-section">
                    <ul className="list-unstyled">
                      {Object.entries(nftData.landStats.resources)
                        .filter(([resource, amount]) => amount > 0) // Filter out resources with 0
                        .map(([resource, amount], index) => (
                          <li key={index} className="d-flex align-items-center mb-2">
                            <Image
                              src={resourceImages[resource.toLowerCase()]}
                              alt={`${resource} Icon`}
                              width={24}
                              height={24}
                              className="me-2"
                              onError={(e) => {
                                e.currentTarget.src = "/img/placeholder.webp"; // Fallback image
                              }}
                            />
                            <strong className="me-1">{capitalize(resource)}:</strong> {amount}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Total Upkeep Cost */}
                  <div className="upkeep-section">
                    <h6 className="fw-bold">Total Upkeep Cost</h6>
                    <ul className="list-unstyled">
                      {Object.entries(totalUpkeep)
                        .filter(([resource, amount]) => amount > 0) // Filter out costs with 0
                        .map(([resource, amount], index) => (
                          <li key={index} className="d-flex align-items-center mb-2">
                            <Image
                              src={resourceImages[resource.toLowerCase()]}
                              alt={`${resource} Icon`}
                              width={24}
                              height={24}
                              className="me-2"
                              onError={(e) => {
                                e.currentTarget.src = "/img/placeholder.webp"; // Fallback image
                              }}
                            />
                            <strong className="me-1">{capitalize(resource)}:</strong> {amount}
                          </li>
                        ))}
                    </ul>
                  </div>

                  {/* Total Output */}
                  <div className="output-section">
                    <h6 className="fw-bold">Total Output</h6>
                    <ul className="list-unstyled">
                      {Object.entries(totalOutput)
                        .filter(([resource, amount]) => amount > 0) // Filter out outputs with 0
                        .map(([resource, amount], index) => (
                          <li key={index} className="d-flex align-items-center mb-2">
                            <Image
                              src={resourceImages[resource.toLowerCase()]}
                              alt={`${resource} Icon`}
                              width={24}
                              height={24}
                              className="me-2"
                              onError={(e) => {
                                e.currentTarget.src = "/img/placeholder.webp"; // Fallback image
                              }}
                            />
                            <strong className="me-1">{capitalize(resource)}:</strong> {amount}
                          </li>
                        ))}
                    </ul>
                  </div>
                  {/* Total Boosts */}
                  <div className="output-section">
                    <h6 className="fw-bold">Total Stat Boosts</h6>
                    <ul className="list-unstyled">
                      {Object.entries(totalStatBoosts)
                        .filter(([resource, amount]) => amount > 0) // Filter out outputs with 0
                        .map(([resource, amount], index) => (
                          <li key={index} className="d-flex align-items-center mb-2">
                            <strong className="me-1">{capitalize(resource)}:</strong> +{amount}
                          </li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>

            <hr className="my-3" />

            {/* Coordinates */}
            <div>
              <h6 className="fw-bold">Coordinates</h6>
              <p className="ms-2">
                X: {nftData.coordinates.x}, Y: {nftData.coordinates.y}
              </p>
            </div>

            {/* Buildings Under Construction */}
            <div className="mt-4">
              <h6 className="fw-bold">Buildings Under Construction</h6>
              {nftData.landStats.constructions.length === 0 ? (
                <p className="ms-2">No ongoing constructions.</p>
              ) : (
                <>
                  <ul className="list-group list-group-flush">
                    {nftData.landStats.constructions.map((construction, index) => {
                      // Find the building info
                      const buildingInfo = buildingsInfo.find(
                        (b) => b.name === construction.name && b.level === construction.level
                      );

                      // Determine if the construction is completed
                      const isCompleted = construction.completionTime <= Math.floor(Date.now() / 1000);

                      return (
                        <li
                          key={index}
                          className={`list-group-item p-1 d-flex justify-content-between align-items-center ${isCompleted ? "completed" : ""}`}
                          style={{ position: 'relative' }} // Ensure the parent is relative for absolute positioning
                        >
                          <div className="building-info">
                            <h6>{construction.name} (Level {construction.level})</h6>
                            {/* Remove Tooltip from Buildings Under Construction */}
                            {/* Tooltip has been moved to Buildings List */}
                          </div>
                          <span>{getTimeLeft(construction.completionTime)}</span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Complete Construction Button */}
                  {canCompleteConstructions && (
                    <button
                      className={`btn btn-primary mt-3 ${completeLoading ? "disabled" : ""}`}
                      onClick={completeConstructions}
                      disabled={completeLoading}
                    >
                      {completeLoading ? "Completing..." : "Complete Constructions"}
                    </button>
                  )}
                </>
              )}
            </div>

            <hr className="my-3" />

            {/* Building Construction Dropdown */}
            <div className="mt-4">
              <h6 className="fw-bold">Construct a Building</h6>
              <div className="mb-3">
                <select
                  className="form-select"
                  onChange={handleBuildingSelect}
                  value={selectedBuilding ? selectedBuilding.name : ""}
                >
                  <option value="">-- Select a Building --</option>
                  {buildingsInfo.map((building, index) => (
                    <option key={index} value={building.name}>
                      {building.name} (Level {building.level})
                    </option>
                  ))}
                </select>
              </div>

              {/* Building Details */}
              {selectedBuilding && (
                <div className="container mb-3">
                  <div className="row g-0">
                    {/* Building Image */}
                    <div className="col-md-4 d-flex align-items-center justify-content-center p-3">
                      <Image
                        src={formatIPFS(selectedBuilding.imageURI)}
                        alt={`${selectedBuilding.name} Image`}
                        width={150}
                        height={150}
                        className="img-fluid rounded-start"
                        onError={(e) => {
                          e.currentTarget.src = "/img/placeholder.webp"; // Fallback image
                        }}
                      />
                    </div>

                    {/* Building Info */}
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{selectedBuilding.name} (Level {selectedBuilding.level})</h5>

                        {/* Resources, Upkeep Cost, Output, and Stat Boosts in a Single Row */}
                        <div className="row">
                          {/* Resources */}
                          {Object.values(selectedBuilding.baseCost).some((cost) => cost > 0) && (
                            <div className="col-md-3">
                              <p className="card-text"><strong>Resources:</strong></p>
                              <ul className="list-unstyled">
                                {Object.entries(selectedBuilding.baseCost)
                                  .filter(([resource, amount]) => amount > 0) // Filter out 0 values
                                  .map(([resource, amount], index) => (
                                    <li key={index}>{capitalize(resource)}: {amount}</li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {/* Upkeep Cost */}
                          {selectedBuilding.upkeepCost && Object.values(selectedBuilding.upkeepCost).some((cost) => cost > 0) && (
                            <div className="col-md-3">
                              <p className="card-text"><strong>Upkeep:</strong></p>
                              <ul className="list-unstyled">
                                {Object.entries(selectedBuilding.upkeepCost)
                                  .filter(([resource, amount]) => amount > 0) // Filter out costs with 0
                                  .map(([resource, amount], index) => (
                                    <li key={index}>{capitalize(resource)}: {amount}</li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {/* Resource Production */}
                          {selectedBuilding.resourceProduction && Object.values(selectedBuilding.resourceProduction).some((output) => output > 0) && (
                            <div className="col-md-3">
                              <p className="card-text"><strong>Resource Production:</strong></p>
                              <ul className="list-unstyled">
                                {Object.entries(selectedBuilding.resourceProduction)
                                  .filter(([resource, amount]) => amount > 0) // Filter out outputs with 0
                                  .map(([resource, amount], index) => (
                                    <li key={index}>{capitalize(resource)}: {amount} per epoch</li>
                                  ))}
                              </ul>
                            </div>
                          )}

                          {/* Stat Boosts */}
                          {(selectedBuilding.productionBoost > 0 ||
                            selectedBuilding.happinessBoost > 0 ||
                            selectedBuilding.technologyBoost > 0 ||
                            selectedBuilding.pietyBoost > 0 ||
                            selectedBuilding.strengthBoost > 0) && (
                            <div className="col-md-3">
                              <p className="card-text"><strong>Stat Boosts:</strong></p>
                              <ul className="list-unstyled">
                                {selectedBuilding.productionBoost > 0 && (
                                  <li>{capitalize("production")} Boost: +{selectedBuilding.productionBoost}</li>
                                )}
                                {selectedBuilding.happinessBoost > 0 && (
                                  <li>{capitalize("happiness")} Boost: +{selectedBuilding.happinessBoost}</li>
                                )}
                                {selectedBuilding.technologyBoost > 0 && (
                                  <li>{capitalize("technology")} Boost: +{selectedBuilding.technologyBoost}</li>
                                )}
                                {selectedBuilding.pietyBoost > 0 && (
                                  <li>{capitalize("piety")} Boost: +{selectedBuilding.pietyBoost}</li>
                                )}
                                {selectedBuilding.strengthBoost > 0 && (
                                  <li>{capitalize("strength")} Boost: +{selectedBuilding.strengthBoost}</li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>

                        {/* Start Building Button */}
                        <button
                          className={`btn btn-${selectedBuilding ? "success" : "secondary"} mt-3`}
                          onClick={startBuildingConstruction}
                          disabled={buildingLoading}
                        >
                          {buildingLoading ? "Processing..." : "Start Building"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Additional Sections Can Be Added Here */}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NFTCard;
