import React from "react";

import ChatIcon from "@mui/icons-material/Chat";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

import { avatar, LightWorkerCardBg, Profile2 } from "@/assets";
import Link from "next/link";

const LightWorkerCard = ({ name, image, medium, href, mediumType }) => {
  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: "350px",
        margin: "0 auto",
        backgroundColor: "#e7e0db",
        position: "relative",
        borderRadius: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textDecoration: "none",
      }}
      component={Link}
      href={href}
    >
      <Image
        src={LightWorkerCardBg}
        alt="LightWorkerCard"
        layout="fill"
        objectFit="cover"
        priority
      />
      <Stack
        zIndex={2}
        gap={1}
        position={"relative"}
        width={"80%"}
        justifyContent={"center"}
        textAlign={"center"}
        alignItems={"center"}
        marginTop={1}
        marginBottom={2}
      >
        <Typography
          variant="h5"
          color="text.lightWorkerCardText"
          fontFamily={"Lato"}
        >
          {mediumType}
        </Typography>
        <Stack
          bgcolor={"#fff"}
          paddingTop={2}
          paddingLeft={2}
          paddingRight={2}
          justifyContent={"space-between"}
        >
          <Image
            src={image ? image : avatar}
            height={210}
            alt="Profile2"
            width={200}
          />
          <Typography fontFamily={"Lato"} fontWeight={"Regular"} variant="h5">
            {name}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default LightWorkerCard;
