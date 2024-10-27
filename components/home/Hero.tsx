"use client";
import avatar1 from "@/public/img/avatar1.png";
import avatar2 from "@/public/img/avatar2.png";
import avatar3 from "@/public/img/avatar3.png";
import award from "@/public/img/award.png";
import bg1 from "@/public/img/bg-2.png";
import bigStar from "@/public/img/sonic.png";
import hero from "@/public/img/bg.webp";
import player1 from "@/public/img/player1.png";
import player2 from "@/public/img/player2.png";
import player3 from "@/public/img/player3.png";
import player4 from "@/public/img/player4.png";
import smallStar from "@/public/img/small-star.png";
import Image from "next/image";
import React from "react";
import Tilt from "react-parallax-tilt";

const winners = [
  {
    id: 1,
    name: "User 0x03m...",
    img: avatar1,
    prizeMoney: 350,
  },
  {
    id: 2,
    name: "User 0x9im...",
    img: avatar2,
    prizeMoney: 250,
  },
  {
    id: 3,
    name: "User 0xfw3...",
    img: avatar3,
    prizeMoney: 150,
  },
];
const Hero = () => {
  return (
    <section className="hero-section pt-20 pb-120 position-relative">
      <div className="gradient-bg"></div>
      <div className="gradient-bg2"></div>
      <div className="star-area">
        <div className="big-star">
          <Image className="w-100 h-25" src={bigStar} alt="star" />
        </div>
        <div className="small-star">
          <Image className="w-100" src={smallStar} alt="star" />
        </div>
      </div>
      <div className="rotate-award">
        <Image className="w-100" src={award} alt="award" />
      </div>
      <div className="container pt-120 pb-15">
        <div className="row g-6 justify-content-between">
          <div className="col-lg-5 col-md-6 col-sm-8">
            <div className="hero-content">
              <ul className="d-flex gap-3 fs-2xl fw-semibold heading-font mb-5 list-icon title-anim">
                <li>Play</li>
                <li>Earn</li>
                <li>Enjoy</li>
              </ul>
              <h1 className="hero-title display-one tcn-1 cursor-scale growUp mb-10">
                <span className="d-block tcp-1">Fjunlund</span>
              </h1>
              <h3>Where DeFi meets GameFi and NFT Ownership</h3>
              <h2 className="hero-subtitle tcs-1 fw-medium mb-10">Mint an NFT now to Start Managing Resources, Developing Lands, and Building Armies</h2>
              <a
                href="https://www.youtube.com/watch?v=G5kzUpWAusI"
                className="btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill popupvideo mfp-iframe">
                Play Now
              </a>
            </div>
          </div>
          <div className="col-xl-3 col-md-2 col-4 order-md-last order-lg-1">
            <div className="hero-banner-area">
              <div className="hero-banner-bg">
                <Image className="w-100" src={bg1} alt="banner" />
              </div>
              <div className="hero-banner-img">
                <Image className="w-100 hero" src={hero} alt="banner" />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6 order-md-1 order-lg-last">
            <div className="hero-content">
              <Tilt
                className="card-area py-lg-8 py-6 px-lg-6 px-3 rounded-5 tilt mb-10"
                data-tilt>
                <h3 className="tcn-1 dot-icon cursor-scale growDown mb-6 title-anim">
                  Previous Epoch Leaderboard
                </h3>
                <div className="hr-line mb-6"></div>
                <div className="card-items d-grid gap-5">
                  {winners.map(({ id, img, name, prizeMoney }) => (
                    <React.Fragment key={id}>
                      <div className="card-item d-flex align-items-center gap-4">
                        <div className="card-img-area rounded-circle overflow-hidden">
                          <Image className="w-100" src={img} alt="profile" />
                        </div>
                        <div className="card-info">
                          <h4 className="card-title fw-semibold tcn-1 mb-1 cursor-scale growDown2 title-anim">
                            {name}
                          </h4>
                          <p className="card-text tcs-1 fw-medium">
                            +${prizeMoney}
                          </p>
                        </div>
                      </div>
                      {id !== 3 && <div className="hr-line"></div>}
                    </React.Fragment>
                  ))}
                </div>
              </Tilt>
              <div className="active-player-list d-grid justify-content-end gap-2">
                <ul className="player-lists d-flex align-items-center">
                  <li className="rounded-circle overflow-hidden me-n6">
                    <Image src={player1} alt="player" />
                  </li>
                  <li className="rounded-circle overflow-hidden me-n6">
                    <Image src={player2} alt="player" />
                  </li>
                  <li className="rounded-circle overflow-hidden me-n6">
                    <Image src={player3} alt="player" />
                  </li>
                  <li className="rounded-circle overflow-hidden me-n6">
                    <Image src={player4} alt="player" />
                  </li>
                  <li className="rounded-circle overflow-hidden me-n6 heading-font fs-xl">
                    99+
                  </li>
                </ul>
                <span className="d-block tcn-1 dot-icon cursor-scale growDown2 fs-xl text-end">
                  Active Players
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid-lines overflow-hidden">
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <div className="lines">
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
          <div className="line-vertical"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
