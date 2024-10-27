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
      {/* <!-- call to action section start --> */}
      <div
        className="call-to-action pt-120 pb-120 bgn-4 overflow-x-hidden"
        id="cta">
        <div className="container">
          <div className="row justify-content-between g-6">
            <div className="col-lg-6">
              <span className="display-three tcn-1 cursor-scale growUp mb-8 d-block title-anim">
                Stay up to date
              </span>
              <span className="fs-lg tcn-6">
                Have questions or feedback? We&apos;d love to hear from you.
                Reach out to our team or use our contact form.
              </span>
            </div>
            <div className="col-xl-5 col-lg-6">
              <form action="#">
                <div className="single-input mb-6">
                  <input type="email" placeholder="Enter your email" />
                </div>
                <div className="d-flex align-items-md-center align-items-start justify-content-between gap-lg-8 gap-6 flex-md-row flex-column">
                  <div className="d-flex align-items-center gap-lg-4 gap-2">
                    <label className="custom-checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                    <span className="fs-base tcn-6">
                      I agree with{" "}
                      <Link href="#" className="tcp-1">
                        Privacy Policy
                      </Link>
                      and{" "}
                      <Link href="terms-condition" className="tcp-1">
                        Terms &amp; Conditions
                      </Link>
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bttn py-sm-4 py-3 px-lg-10 px-sm-8 px-6 bgp-1 tcn-1 rounded-4">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- call to action section end --> */}

      {/* <!-- footer section start  --> */}
      <footer className="footer bgn-4 bt">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-3 col-sm-6 br py-lg-20 pt-sm-15 pt-10 footer-card-area">
              <div className="py-lg-10">
                <div className="footer-logo mb-8">
                  <Link href="#" className="d-grid gap-6">
                    <div className="flogo-1">
                      <Image className="w-100" src={logo2} alt="favicon" />
                    </div>
                    <div className="flogo-2">
                      <h1>Fjunlund</h1>
                    </div>
                  </Link>
                </div>
                <div className="social-links">
                  <ul className="d-flex align-items-center gap-3 flex-wrap">
                    <li>
                      <Link href="#">
                        <i className="ti ti-brand-facebook fs-2xl"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="ti ti-brand-twitter fs-2xl"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="ti ti-brand-youtube fs-2xl"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="ti ti-brand-linkedin fs-2xl"></i>
                      </Link>
                    </li>
                    <li>
                      <Link href="#">
                        <i className="ti ti-brand-instagram fs-2xl"></i>
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
                      href="/tournaments"
                      className="footer-link d-flex align-items-center tcn-6">
                      <i className="ti ti-chevron-right"></i> Tournaments
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/game"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Games{" "}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/teams"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Teams
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> FAQ
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
                      href="#"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Top Players
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/chat"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> messages
                    </Link>
                  </li>
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
            <div className="col-lg-3 col-sm-6 py-lg-20 pt-sm-15 pt-10 footer-card-area">
              <div className="py-lg-10">
                <h4 className="footer-title mb-8 title-anim">Follow Us</h4>
                <ul className="footer-list d-grid gap-4">
                  <li>
                    <Link
                      href="#"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Facebook
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Instagram
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Twitter
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className="footer-link d-flex align-items-center tcn-6">
                      {" "}
                      <i className="ti ti-chevron-right"></i> Linkedln
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row pb-4 pt-lg-4 pt-8 justify-content-between g-2">
            <div className="col-xxl-4 col-lg-6 order-last order-lg-first">
              <span>
                Copyright © <span> {new Date().getFullYear()}</span> GamePlex |
                Designed by{" "}
                <Link
                  href="https://themeforest.net/user/pixelaxis"
                  className="tcp-1">
                  Pixelaxis{" "}
                </Link>
              </span>
            </div>
            <div className="col-xxl-3 col-lg-5">
              <ul className="d-flex align-items-center gap-lg-10 gap-sm-6 gap-4">
                <li>
                  <Link href="/terms-condition">Terms &amp; Conditions</Link>
                </li>
                <li>
                  <Link href="#">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- footer banner img  --> */}
        <div className="footer-banner-img" id="faa">
          <Image className="w-100" src={fbanner} alt="banner" />
        </div>
      </footer>
    </>
  );
};

export default Footer;
