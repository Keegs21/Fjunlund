"use client";
import clsx from "clsx";
import React, { useState } from "react";
import Brackets from "./moredetails/Brackets";
import Players from "./moredetails/Players";
import Rules from "./moredetails/Rules";
import Winners from "./moredetails/Winners";
const tabData = [
  {
    id: 1,
    title: "Brackets",
    content: <Brackets />,
  },
  {
    id: 2,
    title: "Players",
    content: <Players />,
  },
  {
    id: 3,
    title: "Winners",
    content: <Winners />,
  },
  {
    id: 4,
    title: "Rules",
    content: <Rules />,
  },
];

const TournamentsMoreDetails = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <section className="tournament-more-details pb-120">
      <div className="container">
        <div className="singletab tournaments-tab">
          <ul className="tablinks d-flex flex-wrap align-items-center gap-3 pb-10">
            {tabData.map(({ id, title }) => (
              <li
                key={id}
                onClick={() => setActiveTab(id)}
                className={clsx("nav-links", activeTab == id && "active")}>
                <button className="tablink py-sm-3 py-2 px-sm-8 px-6 rounded-pill tcn-1">
                  {title}
                </button>
              </li>
            ))}
          </ul>
          <div className="tabcontents">
            {tabData.map(({ id, content }) => (
              <React.Fragment key={id}>
                {id == activeTab && (
                  <div className={clsx("tabitem", activeTab == id && "active")}>
                    {content}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TournamentsMoreDetails;
