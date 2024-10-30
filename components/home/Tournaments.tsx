"use client";
import bitcoin from "@/public/img/bitcoin.png";
import gameConsole from "@/public/img/nft-marker.png";
import tether from "@/public/img/tether.png";
import tournament1 from "@/public/img/frozen.webp";
import tournament2 from "@/public/img/desert.webp";
import tournament3 from "@/public/img/forest.webp";
import Image from "next/image";
import Link from "next/link";

const tournaments = [
  {
    id: 1,
    img: tournament1,
    title: "Northern Lands",
  },
  {
    id: 2,
    img: tournament2,
    title: "Desert Lands",
  },
  {
    id: 3,
    img: tournament3,
    title: "Forest Lands",
  },
];

const Tournaments = () => {
  return (
    <section className="tournament-section pb-120" id="tournament-hero">
      {/* Removed diamond animation */}
      {/* Removed game console animation */}
      <div className="red-ball top-50"></div>
      <div className="tournament-wrapper">
        <div className="tournament-wrapper-border">
          <div className="container pt-120 pb-120">
            <div className="row justify-content-between align-items-center gy-sm-0 gy-4 mb-15">
              <div className="col-md-6 col-sm-8">
                <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
                  LAND NFTs
                </h2>
              </div>
              <div className="col-md-6 col-sm-4 text-sm-end">
                <Link
                  href="/tournaments"
                  className="btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill"
                >
                  Get Now
                </Link>
              </div>
            </div>
            <div className="row justify-content-between align-items-center g-6">
              {tournaments.map(({ id, img, title }) => (
                <div key={id} className="col-xl-4 col-md-6">
                  <div className="tournament-card p-xl-4 p-3 bgn-4">
                    <div className="tournament-img mb-8 position-relative">
                      <div className="img-area overflow-hidden">
                        <Image className="w-100" src={img} alt="tournament" />
                      </div>
                      <span className="card-status position-absolute start-0 py-2 px-6 tcn-1 fs-sm">
                        <span className="dot-icon alt-icon ps-3">Playing</span>
                      </span>
                    </div>
                    <div className="tournament-content px-xl-4 px-sm-2">
                      <div className="tournament-info mb-5">
                        <Link href={`/tournaments/${id}`} className="d-block">
                          <h4 className="tournament-title tcn-1 mb-1 cursor-scale growDown title-anim">
                            {title}
                          </h4>
                        </Link>
                        <span className="tcn-6 fs-sm">Torneo Individual</span>
                      </div>
                      <div className="hr-line line3"></div>
                      <div className="card-info d-flex align-items-center gap-3 flex-wrap my-5">
                        <div className="price-money bgn-3 d-flex align-items-center gap-3 py-2 px-3 h-100">
                        <div className="ticket-fee bgn-3 d-flex align-items-center gap-1 py-2 px-3 h-100">
                          <i className="ti ti-ticket fs-base tcp-2"></i>
                          <span className="tcn-1 fs-sm">Free Entry</span>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tournaments;
