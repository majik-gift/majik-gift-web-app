'use client'
import {
  GetInTouchBanner,
  LocationOnIcon,
  MailIcon,
  PhoneIcon,
} from "@/assets";
import { Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import StartIconButton from "./StartIconButton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GetInTouch() {
  const router = useRouter();
  return (
    <Container
      maxWidth={"lg"}
      width={"100%"}
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <Image
        src={GetInTouchBanner}
        alt="GetInTouchBanner"
        layout="fill"
        objectFit="cover"
        priority
      />
      <Stack
        color={"text.white"}
        textAlign={{ xs: "center", md: "start" }}
        justifyContent={{ xs: "center", md: "space-between" }}
        direction={{ sm: "column", md: "row" }}
        zIndex={2}
        gap={{ xs: 5, md: 0 }}
        width={"100%"}
        padding={6}
      >
        <Stack
          gap={3}
          alignItems={{ xs: "center", md: "flex-start" }}
          width={{ xs: "100%", md: "40%" }}
        >
          <Typography
            variant={"h2"}
            fontFamily={"Libre Bodoni"}
            fontWeight={"SemiBold"}
          >
            Get In Touch With Us
          </Typography>
          <Typography
            variant={"body1"}
            fontFamily={"Lato"}
            fontWeight={"Regular"}
          >
            Feel free to contact us for any queries.
          </Typography>
          <StartIconButton onClick={()=>router.push('/pages/contact-us')} text={"Contact Us"} />
        </Stack>
        <Stack
          color={"#000"}
          padding={{ xs: 2, md: 4 }}
          gap={3}
          alignItems={{ md: "flex-start" }}
          bgcolor={"secondary.main"}
        >
          <Typography
            variant="h4"
            fontFamily={"Libre Bodoni"}
            fontWeight={"SemiBold"}
          >
            Contact Us
          </Typography>
          <Stack direction={"row"} gap={3} alignItems={"center"}>
            <MailIcon />
            <Typography
              style={{ textDecoration: "underline" }}
              variant="h6"
              fontFamily={"Lato"}
              fontWeight={"Regular"}
            >
              <Link
                href="mailto:Info@majikgift.com"
                underline="none"
                color="black"
                style={{
                  color:'black'
                }}
              >
                Info@majikgift.com
              </Link>
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={3} alignItems={"center"}>
            <PhoneIcon />
            <Typography variant="h6" fontFamily={"Lato"} fontWeight={"Regular"}>
              +61 417 004 284
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={3} alignItems={"center"}>
            <LocationOnIcon />
            <Typography variant="h6" fontFamily={"Lato"} fontWeight={"Regular"}>
              Australia
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
