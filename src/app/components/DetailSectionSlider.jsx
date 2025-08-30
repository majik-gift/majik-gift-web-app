"use client";
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./detailSlider.css";
import "./clientSwiper.css";

// import required modules
import { FreeMode, Navigation, Pagination, Thumbs } from "swiper/modules";

export default function DetailSectionSlider({ images = [] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Pagination, Thumbs]}
        className="mySwiper2"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={`slide-main-${index}`}>
            <img
              src={item || item}
              alt={`Slide ${index}`}
              style={{ height: "100%", width: "100%", objectFit: "fill" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={`slide-thumb-${index}`}>
            <img src={item || item} alt={`Thumbnail ${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
