"use client";
import React from "react";
import {
  Pagination,
  EffectFade,
  Autoplay,
  EffectCards,
  EffectCoverflow,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import StartIconButton from "./StartIconButton";
import "./index.css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

export default function SwipperSlider() {
  const path = usePathname();
  const router = useRouter();
  const { banners, loading } = useSelector((state) => state.appReducer);
  return (
    <Swiper
      effect={"coverflow"}
      lazy={"true"}
      loop={"true"}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Pagination, EffectCoverflow, Autoplay]}
      slidesPerView={1}
      className="custom-swipper"
      spaceBetween={10}
    >
      {!loading?.banners ? (
        banners?.map((banner, key) => (
          <SwiperSlide
            key={key}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              background: `url(${banner?.banner_image}) center/cover no-repeat`,
            }}
          >
            <Stack
              padding={{ xs: "0px 20px", md: "0px 100px" }}
              width="100%"
              zIndex={2}
            >
              <Stack
                width={{ xs: "80%", sm: "80%", md: "60%" }}
                alignItems="flex-start"
                gap={{ xs: 3, md: 10 }}
                padding={{ xs: "0px 30px" }}
              >
                <Typography
                  fontFamily="Dancing Script"
                  sx={{
                    fontWeight: "bold",
                    color: banner?.button_text_color,
                    fontSize: {
                      xs: "2rem", // ~h4 on small screens
                      sm: "2.5rem", // ~h3
                      md: "3rem", // ~h2
                      lg: "3.5rem", // ~h1
                      xl: "4rem", // extra large screens
                    },
                  }}
                >
                  {banner?.title}
                </Typography>

                <Typography
                  sx={{ typography: { xs: "body1", md: "h5" } }}
                  color="white"
                >
                  {banner?.description}
                </Typography>
                <Stack
                  direction={{ xs: "column", md: "row", mb: 2 }}
                  gap={{ xs: 2, md: 4 }}
                >
                  <StartIconButton
                    onClick={() => {
                      router.push(
                        `/${banner?.type}s/${
                          banner?.[bannerTypes[banner?.type]]?.id
                        }`
                      );
                    }}
                    text={banner?.button_text}
                  />
                </Stack>
              </Stack>
            </Stack>
          </SwiperSlide>
        ))
      ) : (
        <SwiperSlide>
          <Skeleton
            variant="rectangular"
            height={path === "/" ? 550 : 400}
            width="100%"
          />
        </SwiperSlide>
      )}
    </Swiper>
  );
}

export const bannerTypes = {
  service: "service",
  product: "product",
  light_worker: "light_worker",
  event: "event",
};
