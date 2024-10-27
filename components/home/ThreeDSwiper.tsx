"use client";
import bitcoin from "@/public/img/bitcoin.png";
import slide3d1 from "@/public/img/footman.webp";
import slide3d2 from "@/public/img/archer.webp";
import slide3d3 from "@/public/img/knight.webp";
import slide3d4 from "@/public/img/pikeman.webp";
import slide3d5 from "@/public/img/catapult.webp";
import slide3d6 from "@/public/img/wizard.webp";
import slide3d7 from "@/public/img/necromancer.webp";
import slide3d8 from "@/public/img/dwarf.webp"
import tether from "@/public/img/tether.png";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../shared/Button";

const slides = [
  {
    id: 1,
    img: slide3d1,
    title: "Footman",
  },
  {
    id: 2,
    img: slide3d2,
    title: "Archer",
  },
  {
    id: 3,
    img: slide3d3,
    title: "Knight",
  },
  {
    id: 4,
    img: slide3d4,
    title: "Pikeman",
  },
  {
    id: 5,
    img: slide3d5,
    title: "Catapult",
  },
  {
    id: 6,
    img: slide3d6,
    title: "Wizard",
  },
  {
    id: 7,
    img: slide3d7,
    title: "Necromancer",
  },
  {
    id: 8,
    img: slide3d8,
    title: "Dwarf",
  },
];
const ThreeDSwiper = () => {
  return (
    <section className="swiper-3d-section position-relative z-1" id="swiper-3d">
      <div className="w-fit px-0 sm:px-3">
      <h2 className="text-3xl sm:text-4xl font-head-font text-n1 text-center mb-8">
          Army Units
        </h2>
        {/* <!-- Slider main container --> */}
        <Swiper
          slidesPerView="auto"
          loop={true}
          centeredSlides={true}
          speed={1000}
          freeMode={true}
          effect="coverflow"
          modules={[Autoplay, Navigation, EffectCoverflow]}
          autoplay={{ delay: 3000 }}
          coverflowEffect={{
            rotate: 5,
            stretch: 30,
            depth: 0,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            prevEl: ".swiper-3d-button-prev",
            nextEl: ".swiper-3d-button-next",
          }}
          breakpoints={{
            1400: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2.4,
            },
            640: {
              slidesPerView: 2,
            },
          }}
          className="swiper swiper-3d-container"
        >
          {slides.map(({ id, img, title }) => (
            <SwiperSlide key={id}>
              <div className="card-3d d-grid justify-content-center p-3">
                <div className="img-area w-100 mb-8 position-relative">
                  <Image
                    src={img}
                    alt="game"
                    width={150} // Adjusted width
                    height={150} // Adjusted height
                    className="object-cover rounded-md" // Added rounded corners for better aesthetics
                  />
                </div>
                <h5 className="card-title text-center tcn-1 mb-4 title-anim">
                  {title}
                </h5>
                <div className="d-center">
                  <div className="card-info d-center gap-3 py-1 px-3">
                    <div className="d-flex align-items-center gap-2">
                      <Image className="w-100" src={bitcoin} alt="bitcoin" />
                      <span className="tcn-1 fs-xs">75</span>
                    </div>
                    <div className="v-line"></div>
                    <div className="d-flex align-items-center gap-2">
                      <Image className="w-100" src={tether} alt="tether" />
                      <span className="tcn-1 fs-xs">$49.97</span>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-btn-area d-center gap-6">
          <Button classes="swiper-btn swiper-3d-button-prev">
            <i className="ti ti-chevron-left fs-xl"></i>
          </Button>
          <Button classes="swiper-btn swiper-3d-button-next">
            <i className="ti ti-chevron-right fs-xl"></i>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ThreeDSwiper;
