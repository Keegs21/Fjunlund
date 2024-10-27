"use client";
import profileBanner from "@/public/img/profile-banner.png";
import userProfile from "@/public/img/user-profile.png";
import Image from "next/image";
import { useState } from "react";
const ProfileBanner = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    setX(e.nativeEvent.offsetX);
    setY(e.nativeEvent.offsetY);
  };
  const style = {
    "--x": `${x}px`,
    "--y": `${y}px`,
  } as React.CSSProperties;
  const icons = [
    "ti ti-brand-facebook fs-2xl",
    "ti ti-brand-twitter fs-2xl",
    "ti ti-brand-instagram fs-2xl",
    "ti ti-brand-discord fs-2xl",
  ];

  return (
    <section className="profile-banner-section pb-120 pt-120 mt-lg-0 mt-sm-15 mt-10">
      <div className="container position-relative">
        <div className="row">
          <div className="col-12 mb-lg-0 mb-10">
            <div className="parallax-banner-area parallax-container">
              <div className="change-banner-btn position-absolute py-1 px-2 rounded bgn-4 top-0 end-0 mt-sm-10 mt-15 me-10 z-2">
                <i className="ti ti-camera fs-2xl"></i>
              </div>
              <div className="parallax-img profile-banner position-relative">
                <Image
                  className="w-100 h-100 tbi rounded-5"
                  src={profileBanner}
                  alt="profile banner"
                />
                <div className="user-profile d-between position-absolute z-1 w-100 px-xxl-15 px-md-10 px-sm-6">
                  <div className="d-flex align-items-center gap-sm-6 gap-3">
                    <div className="profile-thumb">
                      <Image
                        className="w-100 rounded-circle"
                        src={userProfile}
                        alt="team logo"
                      />
                    </div>
                    <div className="user-details mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <h3 className="user-name">Mohammad Rony</h3>
                        <div className="edit-btn">
                          <i className="ti ti-edit-circle fs-2xl"></i>
                        </div>
                      </div>
                      <ul className="user-social d-flex align-items-center gap-sm-3 gap-1">
                        {icons.map((icon, i) => (
                          <li
                            key={i}
                            style={style}
                            onMouseMove={handleMouseMove}
                            className="box-style"
                          >
                            <a href="#">
                              <i className={icon}></i>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBanner;
