"use client";
import player1 from "@/public/img/player1.png";
import player2 from "@/public/img/player2.png";
import player3 from "@/public/img/player3.png";
import player4 from "@/public/img/player4.png";
import star from "@/public/img/star.png";
import teamthumb1 from "@/public/img/team-thumb1.png";
import teamx from "@/public/img/team-x.png";
import trophy2 from "@/public/img/tropy2.png";
import wallet2 from "@/public/img/wallet2.png";
import Image from "next/image";
import Link from "next/link";

const TeamDetailsBanner = () => {
  const goToBack = () => {
    window.history.back();
  };
  return (
    <section className="team-profile-banner pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container position-relative">
        <div className="row">
          <div className="col-12">
            <Link href="#" onClick={goToBack} className="back-btn">
              <i className="ti ti-arrow-narrow-left fs-2xl"></i>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-lg-20 mb-15 pb-lg-10 pb-6">
            <div className="parallax-banner-area parallax-container">
              <div className="parallax-img team-banner position-relative">
                <Image
                  className="w-100 h-100 tbi rounded-5"
                  src={teamx}
                  alt="tournament banner"
                />
                <div className="team-profile d-between position-absolute z-1 w-100 px-lg-15 px-md-10 px-sm-6 px-4">
                  <div className="d-flex align-items-center gap-sm-6 gap-3">
                    <div className="team-thumb">
                      <Image
                        className="w-100 h-100 alt rounded-circle"
                        src={teamthumb1}
                        alt="team logo"
                      />
                    </div>
                    <div className="team-details mb-3">
                      <h3 className="team-name">TEAM XR</h3>
                      <div className="d-flex gap-sm-6 gap-2 align-items-center flex-wrap">
                        <div className="d-flex gap-sm-3 gap-1 align-items-center">
                          <i className="ti ti-users fs-2xl"></i>
                          <span className="tcn-6">3 players</span>
                        </div>
                        <div className="d-flex gap-sm-3 gap-1 align-items-center">
                          <i className="ti ti-world fs-2xl"></i>
                          <span className="tcn-6">English</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ul className="player-lists d-md-flex align-items-center d-none">
                    <li className="rounded-circle overflow-hidden me-n4">
                      <Image src={player1} alt="player" />
                    </li>
                    <li className="rounded-circle overflow-hidden me-n4">
                      <Image src={player2} alt="player" />
                    </li>
                    <li className="rounded-circle overflow-hidden me-n4">
                      <Image src={player3} alt="player" />
                    </li>
                    <li className="rounded-circle overflow-hidden me-n4">
                      <Image src={player4} alt="player" />
                    </li>
                    <li className="rounded-circle overflow-hidden heading-font fs-base">
                      99+
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row g-lg-6 g-4">
          <div className="col-lg-4 col-sm-6">
            <div className="team-info p-xl-8 p-md-6 p-2 bgn-4 d-flex align-items-center gap-lg-6 gap-4 rounded">
              <div className="team-info-icon">
                <Image className="w-100" src={wallet2} alt="img" />
              </div>
              <div className="team-info-details">
                <h3 className="team-info-text tcn-1">$5960</h3>
                <span className="team-info-title tcn-6">Money Earned</span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="team-info p-xl-8 p-md-6 p-2 bgn-4 d-flex align-items-center gap-lg-6 gap-4 rounded">
              <div className="team-info-icon">
                <Image className="w-100" src={star} alt="img" />
              </div>
              <div className="team-info-details">
                <h3 className="team-info-text tcn-1">20</h3>
                <span className="team-info-title tcn-6">
                  Tournaments Played
                </span>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-sm-6">
            <div className="team-info p-xl-8 p-md-6 p-2 bgn-4 d-flex align-items-center gap-lg-6 gap-4 rounded">
              <div className="team-info-icon">
                <Image className="w-100" src={trophy2} alt="img" />
              </div>
              <div className="team-info-details">
                <h3 className="team-info-text tcn-1">15</h3>
                <span className="team-info-title tcn-6">Tournaments Won</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamDetailsBanner;
