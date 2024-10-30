"use client";
import fbanner from "@/public/img/fbanner.png";
import logo2 from "@/public/img/favicon.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Footer = () => {
  const pathname = usePathname();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".footer-banner-img", {
      scrollTrigger: {
        trigger: "#cta",
        start: "top 40%", // Adjust as needed
        end: "bottom bottom", // Adjust as needed
        scrub: 1, // Adjust as needed
      },
      right: "0%",
      left: "unset",
      bottom: "0%",
      opacity: 1,
      scale: 1,
    });

    // Clean up on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill(); // Kill all ScrollTriggers
      });
    };
  }, [pathname]);
  return (
    <>

      {/* <!-- footer section start  --> */}
      <footer className="footer bgn-4 bt">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-sm-6 br py-lg-20 pt-sm-15 pt-10 footer-card-area">
              <div className="py-lg-10">
                <div className="footer-logo mb-8">
                  <Link href="#" className="d-grid gap-6">
                    <div className="flogo-2">
                      <h1>Fjunlund</h1>
                      <h4>Follow Us</h4>
                    </div>
                  </Link>
                </div>
                <div className="social-links">
                  <ul className="d-flex align-items-center gap-3 flex-wrap">
                    <li>
                      <Link href="https://x.com/Fjunlund">
                        <i className="ti ti-brand-twitter fs-2xl"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="https://discord.gg/jPFJm9NK">
                        <i className="ti ti-brand-discord fs-2xl"></i>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 br br-res py-lg-20 pt-sm-15 pt-10 footer-card-area">
              <div className="py-lg-10">
                <h4 className="footer-title mb-8 title-anim">Quick Links</h4>
                <ul className="footer-list d-grid gap-4">
                  <li>
                    <Link
                      href="/faq"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="docs.fjunlund.com"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Docs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 br py-lg-20 pt-sm-15 pt-10 footer-card-area">
              <div className="py-lg-10">
                <h4 className="footer-title mb-8 title-anim">Explore</h4>
                <ul className="footer-list d-grid gap-4">
                  <li>
                    <Link
                      href="/profile"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Profile
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row pb-4 pt-lg-4 pt-8 justify-content-between g-2">
            <div className="col-xxl-4 col-lg-6 order-last order-lg-first">
              <span>
                Copyright © <span> {new Date().getFullYear()}</span> Fjunlund |
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
