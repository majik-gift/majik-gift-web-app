"use client";
import React from "react";
import { Pagination, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image"; // Import Next.js Image component
import { ServiceSliderBanner, SliderBanner } from "@/assets";
// import EndIconButton from "./EndIconButton";
// import "swiper/css/navigation";
import "swiper/css/pagination";
import "./serviceSlider.css";
import "swiper/css/effect-flip";
import StartIconButton from "./StartIconButton";

export default function ServiceSlider({head , para , button}) {
  return (
    <Box
      width={"100%"}
      height={"450px"}
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Optimized background image */}
      <Image
        src={ServiceSliderBanner.src || ServiceSliderBanner}
        alt="Slider Banner"
        layout="fill"
        objectFit="contain"
        style={{width:'100%'}}
        priority // Ensure it's loaded quickly
      />
      <Stack sx={{ zIndex: 2, }} justifyContent={'center'}>
        {/* Overlay content */}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, height: '400px', display: 'flex',justifyContent:'start' }}>
          <Swiper
            effect={"flip"}
            lazy={"true"}
            // cssMode={true}
            // grabCursor={true}
            pagination={{ clickable: true }}
            modules={[Pagination, EffectFade,]}
            slidesPerView={1}
            className="custom-swipper"
            style={{
              "--swiper-pagination-size": "clamp(30px, 5vw, 60px)", // Responsive size
            }}
          >
            {/* Slide 1 */}
            <SwiperSlide style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              color:'#000'
            }}>
              <Stack>
                <Stack
                  // width={{ xs: "80%", sm: "80%", md: "60%" }}
                  alignItems={"flex-start"}
                  gap={{ xs: 6, md: 4 }}
                  paddingLeft={10}
                  color={"#000"}
                >
                  <Typography
                    fontFamily={"Dancing Script"}
                    variant="h2"
                    fontWeight="bold"
                  >
                    {head}
                  </Typography>
                  <Typography
                    sx={{
                      typography: { xs: "body1", md: "h5" }, // Responsive typography variants
                    }}
                  >
                    {para}
                  </Typography>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap={{ xs: 2, md: 4 }}
                  >
                    <StartIconButton color={'#000'} text={button}/>
                  </Stack>
                </Stack>
              </Stack>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              color:'#000'
            }}>
              <Stack>
                <Stack
                  // width={{ xs: "80%", sm: "80%", md: "60%" }}
                  alignItems={"flex-start"}
                  gap={{ xs: 6, md: 4 }}
                  paddingLeft={10}
                  color={"#000"}
                >
                  <Typography
                    fontFamily={"Dancing Script"}
                    variant="h2"
                    fontWeight="bold"
                  >
                    {head}
                  </Typography>
                  <Typography
                    sx={{
                      typography: { xs: "body1", md: "h5" }, // Responsive typography variants
                    }}
                  >
                    {para}
                  </Typography>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap={{ xs: 2, md: 4 }}
                  >
                    <StartIconButton color={'#000'} text={button}/>
                  </Stack>
                </Stack>
              </Stack>
            </SwiperSlide>
            <SwiperSlide style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              color:'#000'
            }}>
              <Stack>
                <Stack
                  // width={{ xs: "80%", sm: "80%", md: "60%" }}
                  alignItems={"flex-start"}
                  gap={{ xs: 6, md: 4 }}
                  paddingLeft={10}
                  color={"#000"}
                >
                  <Typography
                    fontFamily={"Dancing Script"}
                    variant="h2"
                    fontWeight="bold"
                  >
                    {head}
                  </Typography>
                  <Typography
                    sx={{
                      typography: { xs: "body1", md: "h5" }, // Responsive typography variants
                    }}
                  >
                    {para}
                  </Typography>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    gap={{ xs: 2, md: 4 }}
                  >
                    <StartIconButton color={'#000'} text={button}/>
                  </Stack>
                </Stack>
              </Stack>
            </SwiperSlide>
          </Swiper>
        </Container>
      </Stack>
    </Box >
  );
}
