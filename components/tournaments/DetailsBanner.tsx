"use client";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import tourDetailsBanner from "@/public/img/tour-details-banner.png";
import runningGame from "@/public/img/running-game.png";
import Image from "next/image";

const DetailsBanner = () => {
  const targetDate = new Date(
    "September 20, 2026 00:00:00 GMT+00:00",
  ).getTime();

  const getTimeRemaining = useCallback(() => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Target date has passed
      return { years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365);

    return { years, days, hours, minutes, seconds };
  }, [targetDate]);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(getTimeRemaining());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [getTimeRemaining]);
  const gotoBack = () => {
    window.history.back();
  };
  return (
    <div className="tournament-details pb-10 pt-120 mt-lg-0 mt-sm-15 mt-10 overflow-hidden">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center gap-4 mb-4">
              <Link href="#" onClick={gotoBack} className="back-btn">
                <i className="ti ti-arrow-narrow-left fs-2xl"></i>
              </Link>
              <h3 className="tcn-1 cursor-scale growDown title-anim">
                TDL SEA Pro Series 11
              </h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="parallax-banner-area parallax-container position-relative rounded-5 overflow-hidden">
              <Image
                className="w-100 h-100 parallax-img"
                src={tourDetailsBanner}
                alt="tournament banner"
              />
              {/* <!-- running tournament content here --> */}
              <div className="running-tournament d-flex flex-lg-row flex-column position-absolute top-50 start-50 translate-middle w-100">
                <div className="running-tournament-thumb w-100">
                  <Image
                    className="w-100 h-100"
                    src={runningGame}
                    alt="tournament thumb"
                  />
                </div>
                <div className="running-tour-info py-sm-6 py-4 px-xl-15 px-lg-10 px-sm-6 px-2 w-100">
                  <h3 className="tcn-1 mb-lg-6 mb-4">Torneo Individual</h3>
                  <span className="tcn-1 d-block fs-five fw-semibold mb-4">
                    Tournament ending in
                  </span>
                  <div className="ending-date d-flex align-items-center gap-sm-5 gap-2 mb-lg-8 mb-6">
                    <div className="date-box-area">
                      <div className="date-box mb-4">
                        <h3
                          className="tcn-1 title-anim cursor-scale growDown"
                          id="days"
                        >
                          {timeRemaining.days}
                        </h3>
                      </div>
                      <span className="tcn-1 text-center d-block">Days</span>
                    </div>
                    <div className="date-box-area">
                      <div className="date-box mb-4">
                        <h3
                          className="tcn-1 title-anim cursor-scale growDown"
                          id="hours"
                        >
                          {timeRemaining.hours < 10
                            ? "0" + timeRemaining.hours
                            : timeRemaining.hours}
                        </h3>
                      </div>
                      <span className="tcn-1 text-center d-block">Hours</span>
                    </div>
                    <div className="date-box-area">
                      <div className="date-box mb-4">
                        <h3
                          className="tcn-1 title-anim cursor-scale growDown"
                          id="minutes"
                        >
                          {timeRemaining.minutes < 10
                            ? "0" + timeRemaining.minutes
                            : timeRemaining.minutes}
                        </h3>
                      </div>
                      <span className="tcn-1 text-center d-block">Minutes</span>
                    </div>
                    <div className="date-box-area">
                      <div className="date-box mb-4">
                        <h3
                          className="tcn-1 title-anim cursor-scale growDown"
                          id="seconds"
                        >
                          {timeRemaining.seconds < 10
                            ? "0" + timeRemaining.seconds
                            : timeRemaining.seconds}
                        </h3>
                      </div>
                      <span className="tcn-1 text-center d-block">Seconds</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-md-6 gap-3">
                    <Link
                      href="/tournaments"
                      className="btn-half-border position-relative d-inline-block py-2 bgp-1 px-sm-6 px-4 rounded-pill"
                    >
                      View More
                    </Link>
                    <div className="d-flex align-items-center flex-wrap gap-md-6 gap-3 w-50">
                      <div className="end-date">
                        <span className="tcn-6">OCT 07, 5:10 AM</span>
                      </div>
                      <div className="players">
                        <i className="ti ti-users-group tcn-1"></i>
                        <span className="tcn-6">115/115 Players</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBanner;
