"use client";
import { tournamentsData } from "@/public/data/tournaments";
import bitcoin from "@/public/img/bitcoin.png";
import tether from "@/public/img/tether.png";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Tournaments = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [tournaments, setTournaments] = useState(tournamentsData);
  const handleFilter = (type: string) => {
    setActiveTab(type);
    if (type == "All") {
      setTournaments(tournamentsData);
    } else {
      const filtered = tournamentsData.filter(
        (tournament) => tournament.type === type,
      );
      setTournaments(filtered);
    }
  };
  return (
    <section className="tournament-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="tournament-wrapper alt">
        <div className="container">
          <div className="row justify-content-between align-items-end mb-8">
            <div className="col">
              <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                Land NFT Types
              </h2>
            </div>
          </div>
          <div className="singletab tournaments-tab">
            <div className="d-between gap-6 flex-wrap mb-lg-15 mb-sm-10 mb-6">
              <ul className="tablinks d-flex flex-wrap align-items-center gap-3">
                {["All", "Active", "Upcoming", "Finished"].map((type) => (
                  <li
                    key={type}
                    onClick={() => handleFilter(type)}
                    className={clsx("nav-links", activeTab == type && "active")}
                  >
                    <button className="tablink py-sm-3 py-2 px-sm-8 px-6 rounded-pill tcn-1">
                      {type}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="px-6">
                <Link
                  href="#"
                  className="btn-half-border position-relative d-inline-block py-2 bgp-1 px-6 rounded-pill"
                >
                  View More
                </Link>
              </div>
            </div>
            <div className="tabcontents">
              <div className={clsx("tabitem", "active")}>
                <div className="row justify-content-md-start justify-content-center g-6">
                  {tournaments.map(({ id, img, team, title }) => (
                    <div key={id} className="col-xl-4 col-md-6 col-sm-10">
                      <div className="tournament-card p-xl-4 p-3 pb-xl-8 bgn-4">
                        <div className="tournament-img mb-8 position-relative">
                          <div className="img-area overflow-hidden">
                            <Image
                              className="w-100"
                              src={img}
                              alt="tournament"
                            />
                          </div>
                          <span className="card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm">
                            <span className="dot-icon alt-icon ps-3">
                              Playing
                            </span>
                          </span>
                        </div>
                        <div className="tournament-content px-xxl-4">
                          <div className="tournament-info mb-5">
                            <Link
                              href={`/tournaments/${id}`}
                              className="d-block"
                            >
                              <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                                {title}
                              </h4>
                            </Link>
                            <span className="tcn-6 fs-sm">{team}</span>
                          </div>
                          <div className="hr-line line3"></div>
                          <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                            <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                              <div className="d-flex align-items-center gap-2">
                                <Image
                                  className="w-100"
                                  src={bitcoin}
                                  alt="bitcoin"
                                />
                                <span className="tcn-1 fs-sm">75</span>
                              </div>
                              <div className="v-line"></div>
                              <div className="d-flex align-items-center gap-2">
                                <Image
                                  className="w-100"
                                  src={tether}
                                  alt="tether"
                                />
                                <span className="tcn-1 fs-sm">$49.97</span>
                              </div>
                            </div>
                            <div className="ticket-fee bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                              <i className="ti ti-ticket fs-base tcp-2"></i>
                              <span className="tcn-1 fs-sm">Free Entry</span>
                            </div>
                            <div className="date-time bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                              <i className="ti ti-calendar fs-base tcn-1"></i>
                              <span className="tcn-1 fs-sm">
                                OCT 07, 5:10 AM
                              </span>
                            </div>
                          </div>
                          <div className="hr-line line3"></div>
                          <div className="card-more-info d-between mt-6">
                            <div className="teams-info d-between gap-xl-5 gap-3">
                              <div className="teams d-flex align-items-center gap-1">
                                <i className="ti ti-users fs-base"></i>
                                <span className="tcn-6 fs-sm">12/12 Teams</span>
                              </div>
                              <div className="player d-flex align-items-center gap-1">
                                <i className="ti ti-user fs-base"></i>
                                <span className="tcn-6 fs-sm">128 Players</span>
                              </div>
                            </div>
                            <Link href={`/tournaments/${id}`} className="btn2">
                              <i className="ti ti-arrow-right fs-2xl"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
