"use client";
import {
  FaFacebookF,
  InstagramIcon,
  liness,
  Logo,
  MajikLogo,
  PiStarFourFill,
  XIcon,
  YouTubeIcon,
} from "@/assets";
import { useModal } from "@/shared/context/ModalContext";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Footer() {
  const path = usePathname();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const navItems = [
    "Home",
    "Services",
    "Products",
    "Group Activities",
    "Lightworkers",
    "About Us",
    "Why Us",
    "Privacy Policy",
    "Contact Us",
  ];
  const menuLinks = [
    "/",
    "/services",
    "/products",
    "/events",
    "/light-worker",
    "/pages/about-us",
    "/pages/why-us",
    "/pages/privacy-policy",
    "/pages/contact-us",
  ];

  const isActivePath = (itemPath) => {
    if (itemPath === "/") return path === itemPath;
    return path.startsWith(itemPath);
  };

  return (
    <Stack
      bgcolor={"#9C90C2"}
      position={"relative"}
      pt={{ xs: 7, md: 10 }}
      pb={{ xs: 2 }}
      mt={12}
      overflow="hidden"
    >
      <Image
        src={liness}
        alt="lines"
        style={{
          position: "absolute",
          right: 0,
          bottom: 0,
          zIndex: 1,
          width: isMobile ? "50%" : "auto",
          height: isMobile ? "auto" : "100%",
        }}
      />
      <Container sx={{ px: "0 !important" }} maxWidth={"lg"}>
        <Grid
          container
          spacing={{ xs: 4, md: 8 }}
          justifyContent={"center"}
          alignItems="center"
        >
          {/* Logo Section */}
          <Grid
            item
            xs={12}
            md={2}
            display={"flex"}
            justifyContent={{ xs: "center", md: "flex-end" }}
            mb={{ xs: 2, md: 0 }}
          >
            <Link href={"/"}>
              <Image
                src={MajikLogo}
                alt="logo"
                style={{
                  width: "100%",
                  maxWidth: "180px",
                  minWidth: "100px",
                  maxHeight: "160px",
                }}
              />
            </Link>
          </Grid>

          {/* Navigation Links */}
          <Grid item xs={12} md={8} display={"flex"} justifyContent="center">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={"center"}
              alignItems={"center"}
              gap={{ xs: 2, sm: 3, md: 5 }}
              flexWrap="wrap"
            >
              {navItems.map((item, key) => (
                <Stack
                  direction={"row"}
                  key={key}
                  alignItems={"center"}
                  gap={1}
                  sx={{ cursor: "pointer", zIndex: 2 }}
                >
                  {isActivePath(menuLinks[key]) && <PiStarFourFill size={14} />}
                  <Link
                    href={menuLinks[key]}
                    key={item}
                    style={{ color: "#000", textDecoration: "none" }}
                  >
                    <Typography
                      variant="body1"
                      fontWeight={"Medium"}
                      fontFamily={"Lato"}
                      sx={{
                        textDecoration: isActivePath(menuLinks[key])
                          ? "underline"
                          : "none",
                        fontSize: { xs: "0.875rem", sm: "1rem" },
                      }}
                    >
                      {item}
                    </Typography>
                  </Link>
                </Stack>
              ))}
            </Stack>
          </Grid>

          {/* Social Icons */}
          <Grid
            item
            xs={12}
            md={1.5}
            display={"flex"}
            justifyContent="center"
            mt={{ xs: 2, md: 0 }}
            zIndex={2}
          >
            <Stack
              direction={"row"}
              gap={1}
              flexWrap="wrap"
              justifyContent="center"
            >
              {[
                {
                  icon: (
                    <FaFacebookF
                      style={{ color: "#fff", fontSize: "16.5px" }}
                    />
                  ),
                  href: "https://www.facebook.com/majikgift",
                },
                {
                  icon: <InstagramIcon style={{ color: "#fff" }} />,
                  href: "https://www.instagram.com/majik_gift/",
                },
                {
                  icon: <XIcon style={{ color: "#fff" }} />,
                  href: "https://www.instagram.com/majik_gift/",
                },
                {
                  icon: <YouTubeIcon style={{ color: "#fff" }} />,
                  href: "https://www.youtube.com/@donnayoung7512",
                },
              ].map((social, index) => (
                <Box
                  key={index}
                  width={35}
                  height={35}
                  borderRadius={"50%"}
                  bgcolor={"#000"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{ cursor: "pointer" }}
                  component={Link}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.icon}
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
      <Container
        sx={{
          px: "0 !important",
          mt: 12,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
        maxWidth={"100vw"}
      >
        <Stack bgcolor={"#000"} height={"1px"} width={"100vw"} />
        <Container
          maxWidth={"lg"}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          {/* Copyright */}
          <Stack
            direction={"row"}
            justifyContent={{ xs: "center", lg: "space-between" }}
            alignItems={"center"}
            gap={2}
            flexWrap={{ xs: "wrap", lg: "nowrap" }}
          >
            <Typography
              variant="body2"
              fontWeight={"Regular"}
              textAlign={"center"}
              position="relative"
              zIndex={2}
              sx={{ cursor: "pointer" }}
            >
              Copyright © 2025 Majik Gift. All rights reserved.
            </Typography>
            <Typography
              variant="body2"
              fontWeight={"Regular"}
              textAlign={"center"}
              position="relative"
              zIndex={2}
              sx={{ cursor: "pointer" }}
            >
              Privacy | Terms and Conditions
            </Typography>
          </Stack>
        </Container>
      </Container>
    </Stack>
  );
}
