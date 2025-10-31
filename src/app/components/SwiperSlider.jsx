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
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 100%)",
                zIndex: 1,
              }}
            />
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
                    color: banner?.button_text_color || "#FFFFFF",
                    fontSize: {
                      xs: "2.5rem",
                      sm: "3rem",
                      md: "3.5rem",
                      lg: "4rem",
                      xl: "4.5rem",
                    },
                    textShadow: "0 2px 12px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                    zIndex: 2,
                  }}
                >
                  {banner?.title}
                </Typography>

                <Typography
                  sx={{ 
                    typography: { xs: "body1", md: "h5" },
                    color: "#FFFFFF",
                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                    position: "relative",
                    zIndex: 2,
                    maxWidth: { xs: "100%", md: "80%" },
                  }}
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
