"use client";
import React, { useEffect, useState } from "react";
import { Pagination, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Container, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image"; // Import Next.js Image component
import { SliderBanner } from "@/assets";
// import EndIconButton from "./EndIconButton";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-flip";
import "./clientSwiper.css";
import StartIconButton from "./StartIconButton";
import ClientComment from "./ClientComment";
import { useSelector } from "react-redux";

export default function ClientSaySlider() {
  const { reviews } = useSelector((state) => state.appReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (reviews) {
      setTimeout(() => setIsLoading(false), 1000); // Simulate loading
    }
  }, [reviews]);
  return (
    <Stack justifyContent={"center"}>
      {/* Overlay content */}
      <Container
        maxWidth="lg"
        style={{ height: "300px", display: "flex" , flexDirection:'column-reverse', position: "relative",justifyContent:'center' }}
      >
        <Swiper
          effect={"flip"}
          lazy={"true"}
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, EffectFade]}
          breakpoints={{
            950: {
              slidesPerView: 2, // Show 2 slides on small screens
            },
            0: {
              slidesPerView: 1, // Show 1 slide on extra small screens
            },
          }}
          className="custom-swipper"
          spaceBetween={90}
          style={{
            "--swiper-pagination-size": "clamp(30px, 5vw, 60px)", // Responsive size
            padding: "40px 70px",
            width: "100%",
            // backgroundColor:'red'
          }}
        >
          {!isLoading
            ? reviews?.map((review, key) => (
                <SwiperSlide
                  style={{
                    width: "100%",
                    display: "flex",
                  }}
                  key={key}
                >
                  <ClientComment data={review} />
                </SwiperSlide>
              ))
            : Array(2)
                .fill(null)
                .map((_, key) => (
                  <SwiperSlide
                    style={{
                      width: "100%",
                      display: "flex",
                    }}
                    key={key}
                  >
                    <Skeleton
                      variant="rectangular"
                      width={"300px"}
                      height={200}
                      animation="pulse"
                    />
                  </SwiperSlide>
                ))}
        </Swiper>
        {!isLoading && !reviews.length && <Typography alignSelf={'center'} justifySelf={'center'} color="text.darkGrey" variant="h5">There are no reviews yet!</Typography> }
      </Container>
    </Stack>
  );
}
