"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import UnitNFTABI from "../../contracts/artifacts/contracts/UnitNFT.sol/UnitNFT.json";
import LandNFTABI from "../../contracts/artifacts/contracts/landNFT.sol/LandNFT.json";
import { useAccount } from "wagmi";
import { UnitNFT } from "../../contracts/typechain-types/contracts/UnitNFT.sol/UnitNFT";
import { LandNFT } from "../../contracts/typechain-types/contracts/landNFT.sol/LandNFT";
import Image from "next/image";

// Import unit images
import gamex1 from "@/public/img/footman.webp";
import gamex2 from "@/public/img/archer.webp";
import gamex3 from "@/public/img/pikeman.webp";
import gamex4 from "@/public/img/catapult.webp";
import gamex5 from "@/public/img/knight.webp";
import gamex6 from "@/public/img/wizard.webp";
import gamex7 from "@/public/img/necromancer.webp";
import gamex8 from "@/public/img/dwarf.webp";

const UNIT_NFT_CONTRACT = "0x782b9f1855d6FA94819B677c2b81D81E5CE715d9";
const LAND_NFT_CONTRACT = "0xbDAa58F7f2C235DD93a0396D653AEa09116F088d";

const Game = () => {
  const { address } = useAccount();
  const [userLands, setUserLands] = useState<number[]>([]);
  const [selectedLand, setSelectedLand] = useState<number | null>(null);
  const [isMintingUnit, setIsMintingUnit] = useState(false);

  useEffect(() => {
    if (address) {
      fetchUserLands();
    }
  }, [address]);

  const fetchUserLands = async () => {
    try {
      if (window.ethereum && address) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as unknown as LandNFT;
  
        const balanceBN = await landNFTContract.balanceOf(address);
        const balance = Number(balanceBN);
        const tokenIds = [];
  
        for (let i = 0; i < balance; i++) {
          const tokenIdBN = await landNFTContract.tokenOfOwnerByIndex(address, i);
          tokenIds.push(Number(tokenIdBN));
        }
  
        setUserLands(tokenIds);
        if (tokenIds.length > 0 && !selectedLand && tokenIds[0] !== undefined) {
          setSelectedLand(tokenIds[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching user lands:", error);
    }
  };

  const mintUnitNFT = async (unit: any) => {
    try {
      if (!unit) {
        alert("Unit information is missing.");
        return;
      }
      if (!selectedLand) {
        alert("Please select a land to associate with the unit.");
        return;
      }
      setIsMintingUnit(true);
  
      if (!window.ethereum) {
        alert("Please install MetaMask to mint an NFT");
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const unitNFTContract = new ethers.Contract(
        UNIT_NFT_CONTRACT,
        UnitNFTABI.abi,
        signer
      ) as unknown as UnitNFT;
  
      console.log("Starting mint process...");
      console.log("Unit type key:", unit.unitTypeKey);
      console.log("Selected land ID:", selectedLand);
  
      // Estimate gas limit (optional)
      const estimatedGas = await unitNFTContract.mintUnit.estimateGas(
        unit.unitTypeKey,
        selectedLand
      );
  
      console.log("Estimated gas limit:", estimatedGas.toString());
  
      // Call the mintUnit function
      const tx = await unitNFTContract.mintUnit(unit.unitTypeKey, selectedLand, {
        gasLimit: estimatedGas,
      });
  
      console.log("Transaction sent:", tx.hash);
  
      // Wait for transaction to be mined
      const receipt = await tx.wait();
  
      console.log("Transaction mined:", receipt);
  
      alert(`Successfully minted ${unit.title}!`);
    } catch (error) {
      console.error("Error minting unit NFT:", error);
      alert("Error minting unit NFT");
    } finally {
      setIsMintingUnit(false);
    }
  };  

  const handleUnitClick = async (unit: any) => {
    if (!address) {
      alert("Please connect your wallet to mint units.");
      return;
    }
    if (userLands.length === 0) {
      alert("You need to own a Land NFT to mint units.");
      return;
    }
  
    // Prompt the user to select a land
    const landId = prompt(
      `Enter the ID of the land you want to associate with the ${unit.title}: Available Lands: ${userLands.join(", ")}`
    );
    if (landId) {
      setSelectedLand(Number(landId));
      await mintUnitNFT(unit);
    }
  };

  const games = [
    {
      id: 1,
      title: "Footman",
      image: gamex1,
      description:
        "Basic melee infantry unit with balanced attack and defense.",
      unitTypeKey: "Footman",
    },
    {
      id: 2,
      title: "Archer",
      image: gamex2,
      description:
        "Ranged unit with high attack and low defense. Can attack flying units.",
      unitTypeKey: "Archer",
    },
    {
      id: 3,
      title: "Pikeman",
      image: gamex3,
      description:
        "Spear-wielding infantry unit with high defense and low attack.",
      unitTypeKey: "Pikeman",
    },
    {
      id: 4,
      title: "Catapult",
      image: gamex4,
      description:
        "Siege unit with high attack and low defense. Can attack buildings.",
      unitTypeKey: "Catapult",
    },
    {
      id: 5,
      title: "Knight",
      image: gamex5,
      description:
        "Heavy cavalry unit with high attack and defense. Has charge attack ability.",
      unitTypeKey: "Knight",
    },
    {
      id: 6,
      title: "Wizard",
      image: gamex6,
      description:
        "Magic user with ranged attack and low defense. Can cast powerful spells.",
      unitTypeKey: "Wizard",
    },
    {
      id: 7,
      title: "Necromancer",
      image: gamex7,
      description:
        "Dark magic user with ranged attack and low defense. Can raise undead minions.",
      unitTypeKey: "Necromancer",
    },
    {
      id: 8,
      title: "Dwarf",
      image: gamex8,
      description:
        "Short but sturdy unit with high defense and low speed. Can mine resources.",
      unitTypeKey: "Dwarf",
    },
    // ... other units ...
  ];
  

  return (
    <section className="game-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container">
        <div className="row align-items-center justify-content-between mb-lg-15 mb-md-8 mb-sm-6 mb-4">
          <div className="col-6">
            <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
              Army Unit Types
            </h2>
          </div>
        </div>
        <div className="row gy-lg-10 gy-6">
          {games.map((game, index) => (
            <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
              <div className="game-card-wrapper mx-auto">
                <div
                  className="game-card mb-5 p-2"
                  onClick={() => handleUnitClick(game)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="game-card-border"></div>
                  <div className="game-card-border-overlay"></div>
                  <div className="game-img">
                    <Image
                      className="w-100 h-100"
                      src={game.image}
                      alt={game.title}
                    />
                  </div>
                  {isMintingUnit && (
                    <div className="minting-overlay">
                      <p>Minting...</p>
                    </div>
                  )}
                </div>
                <h4 className="game-title mb-0 tcn-1 cursor-scale growDown2 title-anim">
                  {game.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Game;
