"use client";


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


const Hero = () => {
  return (
    <>
    <section className="hero-section pt-20 pb-12 position-relative">
      <div className="gradient-bg"></div>
      <div className="gradient-bg2"></div>
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
              <h2 className="hero-subtitle tcs-1 fw-medium mb-10">
                Mint an NFT now to Start Managing Resources, Developing Lands, and
                Building Armies
              </h2>
              <a
                href="https://www.youtube.com/watch?v=G5kzUpWAusI"
                className="btn-half-border position-relative d-inline-block py-2 px-6 bgp-1 rounded-pill popupvideo mfp-iframe"
              >
                Play Now
              </a>
            </div>
          </div>
          <div className="col-xl-3 col-md-2 col-4 order-md-last order-lg-1">
            <div className="hero-banner-area">
              <div className="hero-banner-bg">
                <Image className="w-100" src={bg1} alt="banner" />
              </div>
                <div className="hero-banner-img" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                <Image className="w-100 hero" src={hero} alt="banner" />
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
    <div
      className="container text-center"
      style={{
        width: '90%',        // Sets the container to 90% of the viewport width
        maxWidth: '1200px',  // Sets a maximum width to prevent it from becoming too wide on large screens
        marginTop: 128,    // Centers the container horizontally
      }}
    >
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-10">
          <div className="intro-text p-4 bgp-2 rounded">
            <h3 className="fw-bold mb-3">Welcome to Fjunlund</h3>
            <p className="mb-3">
              Fjunlund is an Epoch-Based Strategy game of accumulating resources,
              developing lands, and winning wars.
            </p>
            <p className="mb-3">
              We also aim to be a beacon of good for the infrastructure and security
              of the DeFi world itself as we believe it will serve a vitally important
              financial role as the world continues to adopt crypto.
            </p>
            <p className="mb-3">
              We aim to achieve this by being a Validator of the highest order with top
              security while maintaining speeds to keep the blockchain operating at a
              high efficiency and speed.
            </p>
            <p className="mb-0">
              Our game will revolve around our NFTs that represent the land that users
              will need to govern. How well they govern this land will determine how
              much they are paid out per epoch.
            </p>
          </div>
        </div>
      </div>
    </div>

      </>
  );
};

export default Hero;
