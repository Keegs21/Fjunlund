// Teams.tsx
import React from "react";
import dynamic from "next/dynamic";

// Dynamically import MapGrid without SSR
const MapGrid = dynamic(() => import("../mapgrid/MapGrid"), { ssr: false });

const Teams = () => {
  return (
    <section className="teams-map-section pb-120">
      <div className="container">
        <h2 className="display-four tcn-1 cursor-scale growUp title-anim mb-10">
          Find Lands
        </h2>
        <MapGrid />
      </div>
    </section>
  );
};

export default Teams;
