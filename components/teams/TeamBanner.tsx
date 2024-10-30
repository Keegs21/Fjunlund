"use client";

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import LandNFTABI from "../../contracts/artifacts/contracts/landNFT.sol/LandNFT.json";
import { useAccount } from "wagmi";
import { LandNFT } from "../../contracts/typechain-types/contracts/landNFT.sol/LandNFT";
import NFTCard from "../shared/NFTCard/NFTCard";

const LAND_NFT_CONTRACT = "0xbDAa58F7f2C235DD93a0396D653AEa09116F088d"; // Your LandNFT contract address

const Banner = () => {
  const { address } = useAccount();
  const [userTokens, setUserTokens] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // For error messages

  useEffect(() => {
    const fetchUserTokens = async () => {
      try {
        // Ensure window is defined (client-side)
        if (typeof window === "undefined") {
          return;
        }

        if (window.ethereum && address) {
          setLoading(true);
          setError(null); // Reset error state

          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const landNFTContract = new ethers.Contract(
            LAND_NFT_CONTRACT,
            LandNFTABI.abi,
            signer
          ) as unknown as LandNFT;

          // Fetch the number of tokens the user owns
          const balanceBN = await landNFTContract.balanceOf(address);
          const balance = Number(balanceBN);

          if (balance === 0) {
            setUserTokens([]);
            return;
          }

          const tokens: number[] = [];

          for (let i = 0; i < balance; i++) {
            const tokenIdBN = await landNFTContract.tokenOfOwnerByIndex(address, i);
            const tokenId = Number(tokenIdBN);
            tokens.push(tokenId);
          }

          setUserTokens(tokens);
        }
      } catch (error) {
        console.error("Error fetching user tokens:", error);
        setError("Failed to load your Land NFTs. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (address) {
      fetchUserTokens();
    } else {
      // If no address, reset tokens
      setUserTokens([]);
    }
  }, [address]); // Dependency array only includes 'address'

  return (
    <section className="teams-section pb-sm-10 pb-6 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container">
        <h2 className="display-four tcn-1 cursor-scale growUp title-anim mb-4">
          Your Land NFT
        </h2>
        {loading ? (
          <div className="flex items-center">
            {/* Replace with a spinner or loader component if available */}
            <svg
              className="animate-spin h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="ml-2">Loading your Land NFTs...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : userTokens.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {userTokens.map((tokenId) => (
              <NFTCard key={tokenId} tokenId={tokenId.toString()} />
            ))}
          </div>
        ) : (
          <p>You don't own any Land NFTs.</p>
        )}
      </div>
    </section>
  );
};

export default Banner;
