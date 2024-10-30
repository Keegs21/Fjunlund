"use client";
import Button from "@/components/shared/Button";
import topplayer1 from "@/public/img/food.png";
import topplayer2 from "@/public/img/wood.png";
import topplayer3 from "@/public/img/stone.png";
import topplayer4 from "@/public/img/gold.png";
import topplayer5 from "@/public/img/iron.jpeg";
import topplayer6 from "@/public/img/brass.png";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const topPlayers = [
  {
    id: 1,
    img: topplayer1,
    title: "Food",
  },
  {
    id: 2,
    img: topplayer2,
    title: "Wood",
  },
  {
    id: 3,
    img: topplayer3,
    title: "Stone",
  },
  {
    id: 4,
    img: topplayer6,
    title: "Brass",
  },
  {
    id: 5,
    img: topplayer5,
    title: "Iron",
  },
  {
    id: 6,
    img: topplayer4,
    title: "Gold",
  },
];

const TopPlayer = () => {
  return (
    <section className="top-player-section pt-120 pb-120" id="top-player">
      {/* Removed sword animation */}
      <div className="red-ball end-0"></div>
      <div className="container">
        <div className="row justify-content-between mb-15">
          <div className="col-sm-6">
            <h2 className="display-four tcn-1 cursor-scale growUp title-anim">
              Resources
            </h2>
          </div>
          <div className="col-sm-6 d-none d-sm-block">
            <div className="d-flex justify-content-end align-items-center gap-6">
              <Button classes="swiper-btn top-player-prev">
                <i className="ti ti-chevron-left fs-xl"></i>
              </Button>
              <Button classes="swiper-btn top-player-next">
                <i className="ti ti-chevron-right fs-xl"></i>
              </Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Swiper
              slidesPerView="auto"
              loop={true}
              centeredSlides={true}
              spaceBetween={24}
              freeMode={true}
              speed={1000}
              modules={[Autoplay, Navigation]}
              autoplay={{
                delay: 2000,
              }}
              navigation={{
                prevEl: ".top-player-prev",
                nextEl: ".top-player-next",
              }}
              breakpoints={{
                1024: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 2,
                },
              }}
              wrapperClass="my-1"
              className="swiper swiper-top-player">
              {topPlayers.map(({ id, img, title }) => (
                <SwiperSlide key={id}>
                  <div
                    className="player-card d-grid gap-6 p-6 card-tilt"
                    data-tilt>
                    <div className="player-info-area d-between w-100">
                      <div className="player-info d-flex align-items-center gap-4">
                        <div className="player-img position-relative">
                          <Image
                            className="w-100 h-100 rounded-circle"
                            src={img}
                            alt={title}
                          />
                        </div>
                        <div>
                          <h5 className="player-name tcn-1 mb-1 title-anim">
                            {title}
                          </h5>
                        </div>
                      </div>
                      <form action="#">
                        <Button classes="follow-btn">
                          <i className="ti ti-user-plus fs-xl"></i>
                        </Button>
                      </form>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPlayer;
