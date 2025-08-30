"use client";
import React, { useEffect, useState } from "react";

import ChatIcon from "@mui/icons-material/Chat";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import LightWorkerCard from "./LightWorkerCard";
import { Profile2 } from "@/assets";
import ApiManager from "@/helper/api-manager";

const LightWorkerSection = () => {
  const [lightWorkers, setLightWorkers] = useState(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    (async function () {
      try {
        const { data } = await ApiManager({
          method: "get",
          path: "users?role=light_worker&registration_status=approved&status=active&sort_by=exclusive",
        });
        setLightWorkers(data?.response?.details);
      } catch (error) {
        console.log("🚀 ~ error:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Container sx={{ mt: 13, mb: 10 }}>
      <Typography
        textAlign="center"
        fontFamily="Libre Bodoni"
        variant="h3"
        fontWeight="400"
      >
        Meet Our Lightworkers
      </Typography>
      <Grid2 container spacing={4} mt={2}>
        {!isLoading
          ? lightWorkers?.slice(0, 4).map((lightWorker, key) => (
              <Grid2 size={{ xs: 12, md: 6 }} key={key}>
                <LightWorkerCard
                  image={lightWorker.profile_image}
                  name={lightWorker?.full_name}
                  medium="Medium"
                  mediumType={lightWorker?.medium_type}
                  href={`/light-worker/${lightWorker?.id}`}
                />
              </Grid2>
            ))
          : Array(4)
              .fill(null)
              .map((_, key) => (
                <Grid2
                  size={{ xs: 12, md: 6 }}
                  justifyItems={"center"}
                  key={key}
                >
                  <Skeleton
                    variant="rectangular"
                    width={"60%"}
                    height={"300px"}
                  />
                </Grid2>
              ))}

        {/* <Grid  size={{xs:12,md:6}}>
          <LightWorkerCard
            image={Profile2}
            name="Jennifer David"
            medium="Card Reader"
          />
        </Grid>
        <Grid  size={{xs:12,md:6}}>
          <LightWorkerCard
            image={Profile2}
            name="Alexander White"
            medium="Palm Reader"
          />
        </Grid>
        <Grid  size={{xs:12,md:6}}>
          <LightWorkerCard
            image={Profile2}
            name="Alexander White"
            medium="Palm Reader"
          />
        </Grid> */}
        {/* <Grid  size={{xs:12,md:6}}>
          <LightWorkerCard image={profile6} name="Angela" />
        </Grid> */}
      </Grid2>
    </Container>
  );
};

export default LightWorkerSection;
