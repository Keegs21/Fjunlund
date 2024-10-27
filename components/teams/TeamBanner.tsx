// Banner.tsx
import React from "react";
import NFTCard from "../shared/NFTCard/NFTCard";

const Banner = () => {
  const tokenId = "1"; // You can change this as needed

  return (
    <section className="teams-section pb-sm-10 pb-6 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container">
        <h2 className="display-four tcn-1 cursor-scale growUp title-anim mb-4">
          Your Land NFT
        </h2>
        <NFTCard tokenId={tokenId} />
      </div>
    </section>
  );
};

export default Banner;
