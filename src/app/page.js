"use client";
import { Container, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import SwipperSlider from "./components/SwiperSlider";
import Categories from "./components/Categories";
import Section from "./components/Section";
import {
  About,
  HeadlingService,
  MedicationService,
  MediumShipService,
} from "@/assets";
import { Link } from "next/link";
import ServiceCard from "./components/ServiceCard";
import { MedicalInformation } from "@mui/icons-material";
import StartIconButton from "./components/StartIconButton";
import GetStartedToday from "./components/GetStartedToday";
import LightWorkerSection from "./components/LightWorkerSection";
import ClientSay from "./components/ClientSay";
import GetInTouch from "./components/GetInTouch";
import Header from "./components/Header";
import ShopSection from "./components/ProductSection";
import { useEffect, useState } from "react";
import ApiManager from "@/helper/api-manager";
import { setBanners, setProducts, setReviews } from "@/store/reducer";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [visibleCards, setVisibleCards] = useState(3); // Show initial 3 cards
  const { services, loading } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const handleViewMore = () => {
    setVisibleCards((prevVisible) => prevVisible + 3); // Show 3 more cards
  };

  // useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/firebase-messaging-sw.js')
  //       .then((registration) => {
  //         console.log('Service Worker registered:', registration);
  //       })
  //       .catch((err) => {
  //         console.error('Service Worker registration failed:', err);
  //       });
  //   }
  // }, []);
  
  return (
    <Stack>
      <SwipperSlider />
      <Categories />
      <Section
        buttonText={"Learn More"}
        color={"#000"}
        src={About || About}
        paraHead={"The Spiritual Shop"}
        para1={
          "Receive messages of love and guidance from some of the world's most trusted readers."
        }
      />
      {/* Service We Provide */}
      <Stack
        bgcolor={"background.primary"}
        color={"text.white"}
        alignItems={"center"}
        padding={{ xs: 3, md: 6 }}
      >
        <Container maxWidth={"lg"}>
          <Stack
            bgcolor={"background.primary"}
            color={"text.white"}
            alignItems={"center"}
            gap={{ xs: 3, md: 6 }}
          >
            <Typography
              fontFamily={"Libre Bodoni"}
              fontWeight={"SemiBold"}
              variant="h4"
            >
              Services We Provide
            </Typography>
            <Grid2
              width={"100%"}
              container
              direction={"row"}
              justifyContent={"center"}
              spacing={6}
            >
              {!loading.services
                ? services?.slice(0, visibleCards).map((service, key) => (
                    <Grid2 
                      size={{ xs: 12, sm: 6, md: 4 }} 
                      key={key}
                      sx={{
                        opacity: 0,
                        animation: 'fadeIn 0.2s ease-in forwards',
                        '@keyframes fadeIn': {
                          '0%': { opacity: 0, transform: 'translateY(-20px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' }
                        },
                        animationDelay: `${key * 0.1}s`
                      }}
                    >
                        <ServiceCard
                          src={service?.banner_image}
                          text={service?.title}
                          href={`/services/${service?.id}`}
                        />
                    </Grid2>
                  ))
                : Array(3)
                    .fill(null)
                    .map((_, key) => (
                      <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                        <Stack gap={1} alignItems={"center"}>
                          <Skeleton
                            width={250}
                            height={250}
                            variant="rectangular"
                          />
                          <Skeleton variant="rectangular" width={250} />
                        </Stack>
                      </Grid2>
                    ))}
            </Grid2>
            {services ? (
              visibleCards > 3 ? (
                <StartIconButton
                  text={"View Less"}
                  onClick={() => setVisibleCards(3)}
                  sx={{
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                />
              ) : (
                visibleCards < services?.length && (
                  <StartIconButton
                    text={"View More"}
                    onClick={handleViewMore}
                    sx={{
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                )
              )
            ) : (
              <Skeleton variant="rectangular" width={120} height={40} />
            )}
          </Stack>
        </Container>
      </Stack>
      <ShopSection />
      <GetStartedToday />
      <LightWorkerSection />
      <ClientSay />
    </Stack>
  );
}
