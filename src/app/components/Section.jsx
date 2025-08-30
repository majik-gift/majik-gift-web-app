"use client";
import { Box, Container, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import StartIconButton from "./StartIconButton";
import { useRouter } from "next/navigation";

export default function Section({
  src,
  para1,
  para2,
  paraHead,
  reverse = false,
  buttonText,
  color,
  whyUs = false,
}) {

  const router = useRouter();
  return (

    <Container maxWidth={"lg"} style={{ padding: "80px 10px" }}>
      <Grid2
        container
        spacing={{ xs: 4, md: 10 }}
        sx={{
          display: "flex",
          flexDirection: reverse && "row-reverse",
          justifyContent: "space-evenly",
          color: whyUs && "#fff",
        }}
      >
        <Grid2
          size={{ xs: 12, md: 5.6 }}
          display={{ xs: "flex", md: "block" }}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "300px", md: "400px" }, // adjust as needed
              maxWidth: "350px",
            }}
          >
            <Image
              src={src}
              alt="Asset Image"
              fill
              style={{
                objectFit: "contain", // or 'cover' depending on your needs
              }}
              priority
            />
          </Box>
        </Grid2>
        <Grid2
          size={{ xs: 12, md: 6 }}
          width={"100%"}
          justifyItems={{ xs: "center", md: "flex-start" }}
          alignContent={"space-evenly"}
          textAlign={{ xs: "center", md: "start" }}
        >
          <Typography
            fontFamily={"Libre Bodoni"}
            variant="body1"
            fontWeight={"SemiBold"}
            color="text.about"
          >
            About MajikGift
          </Typography>
          <Typography
            variant="h3"
            fontFamily={"Libre Bodoni"}
            fontWeight={"SemiBold"}
            gutterBottom
          >
            {paraHead}
          </Typography>
          <Stack
            width={"100%"}
            direction={"column"}
            alignItems={{ xs: "center", md: "flex-start" }}
            gap={{ xs: 1, md: 2 }}
          >
            <Typography
              variant="body1"
              fontWeight={"Regular"}
              lineHeight={"30px"}
              fontFamily={"Lato"}
              gutterBottom
            >
              {para1}
            </Typography>
            <Typography
              variant="body1"
              fontWeight={"Regular"}
              lineHeight={"30px"}
              fontFamily={"Lato"}
              gutterBottom
            >
              {para2}
            </Typography>
            {buttonText && <StartIconButton onClick={() => router.push("/pages/about-us")} color={color} text={buttonText} />}
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
}
