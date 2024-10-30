"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import LandNFTABI from "../../contracts/artifacts/contracts/landNFT.sol/LandNFT.json";
import { useAccount } from "wagmi";
import { LandNFT } from "../../contracts/typechain-types/contracts/landNFT.sol/LandNFT";
import clsx from "clsx";
import Image from "next/image";

enum MintOption {
  RANDOM = 0,
  ADJACENT = 1,
}

const LAND_NFT_CONTRACT = "0xbDAa58F7f2C235DD93a0396D653AEa09116F088d"; // Replace with your actual LandNFT contract address

const Tournaments = () => {
  // State variables
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [mintPrice, setMintPrice] = useState<string>("0");
  const [loading, setLoading] = useState(true);

  // Fetch mint price from the contract
  const fetchMintPrice = async () => {
    try {
      if (window.ethereum) {
        setLoading(true);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const landNFTContract = new ethers.Contract(
          LAND_NFT_CONTRACT,
          LandNFTABI.abi,
          signer
        ) as unknown as LandNFT;

        // Fetch mintPrice from the contract
        const mintPriceBN = await landNFTContract.mintPrice();
        const mintPriceEth = ethers.formatEther(mintPriceBN);

        setMintPrice(mintPriceEth);
        console.log("Mint price:", mintPriceEth);
      } else {
        alert("Please install MetaMask to interact with this feature.");
      }
    } catch (error) {
      console.error("Error fetching mint price:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMintPrice();
  }, [address]);

  // NFT Details (for Land NFTs)
  const nftDetails = [
    {
      id: 1,
      img: "/images/Fjunland.webp",
      title: "Fjunlund Land Parcel",
      description: "Own a piece of Fjunlund and begin your adventure.",
      price: mintPrice, // ETH
      type: "Land",
    },
  ];

  // Since we have only land NFTs, nftData is nftDetails
  const nftData = [...nftDetails];

  const mintNFT = async () => {
    try {
      setIsMinting(true);

      if (!window.ethereum) {
        alert("Please install MetaMask to mint an NFT");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const landNFTContract = new ethers.Contract(
        LAND_NFT_CONTRACT,
        LandNFTABI.abi,
        signer
      ) as unknown as LandNFT;

      // Get mint price from the contract
      const mintPriceBN = await landNFTContract.mintPrice();

      // Set the minting option to RANDOM
      const mintOption = MintOption.RANDOM;
      const existingTokenId = 0; // Not used for RANDOM option

      console.log("Starting mint process...");
      console.log("Mint option:", mintOption);
      console.log("Existing token ID:", existingTokenId);
      console.log("Mint price (BN):", mintPriceBN);

      // Estimate gas limit
      const estimatedGas = await landNFTContract.mint.estimateGas(
        mintOption,
        existingTokenId,
        { value: mintPriceBN }
      );
      console.log("Estimated gas limit:", estimatedGas.toString());

      // Call the mint function with required arguments and transaction overrides
      const tx = await landNFTContract.mint(mintOption, existingTokenId, {
        value: mintPriceBN,
        gasLimit: estimatedGas,
      });

      console.log("Transaction sent:", tx.hash);

      // Wait for transaction to be mined
      const receipt = await tx.wait();

      console.log("Transaction mined:", receipt);

      // Notify user of success
      alert("NFT minted successfully!");
    } catch (error) {
      console.error("Error minting NFT:", error);
      alert("Error minting NFT");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <section className="tournament-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="tournament-wrapper alt">
        <div className="container">
          <div className="row justify-content-between align-items-end mb-8">
            <div className="col">
              <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                Mint Land NFT
              </h2>
            </div>
          </div>
          <div className="singletab tournaments-tab">
            <div className="tabcontents">
              <div className={clsx("tabitem", "active")}>
                <div className="row justify-content-md-start justify-content-center g-6">
                  {nftData.map((nft) => (
                    <div
                      key={nft.id}
                      className="col-xl-4 col-md-6 col-sm-10"
                    >
                      <div className="tournament-card p-xl-4 p-3 pb-xl-8 bgn-4">
                        <div className="tournament-img mb-8 position-relative">
                          <div className="img-area overflow-hidden">
                            <Image
                              className="w-100"
                              width={100}
                              height={100}
                              src={nft.img}
                              alt={nft.title}
                            />
                          </div>
                        </div>
                        <div className="tournament-content px-xxl-4">
                          <div className="tournament-info mb-5">
                            <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                              {nft.title}
                            </h4>
                            <span className="tcn-6 fs-sm">
                              {nft.description}
                            </span>
                          </div>
                          <div className="hr-line line3"></div>
                          <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                            <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                              <span className="tcn-1 fs-sm">
                                Price: {nft.price} ETH
                              </span>
                            </div>
                          </div>
                          <div className="hr-line line3"></div>
                          <div className="card-more-info d-between mt-6">
                            <div>{/* Additional info if needed */}</div>
                            <button
                              className="btn-half-border position-relative d-inline-block py-2 bgp-1 px-6 rounded-pill"
                              onClick={mintNFT}
                              disabled={isMinting || loading || !address}
                            >
                              {isMinting ? "Minting..." : "Mint Land NFT"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Handle loading and minting states */}
                  {loading && (
                    <div className="col-12 text-center">
                      <p>Loading mint price...</p>
                    </div>
                  )}
                  {isMinting && (
                    <div className="col-12 text-center">
                      <p>Minting in progress...</p>
                    </div>
                  )}
                  {!address && (
                    <div className="col-12 text-center">
                      <p>Please connect your wallet to mint.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tournaments;
