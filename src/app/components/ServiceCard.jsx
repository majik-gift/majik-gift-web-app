import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Rectangle } from "@/assets";
import Link from "next/link";

export default function ServiceCard({ src, text, href }) {
  return (
    <Stack
      gap={2}
      alignItems={"center"}
      component={Link}
      href={href}
      color="white"
      sx={{ 
        textDecoration: "none",
        position: "relative",
        borderRadius: 3,
        overflow: "hidden",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-8px)",
          "& .service-image": {
            transform: "scale(1.05)",
          },
          "&::before": {
            opacity: 1,
          },
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(211, 175, 201, 0.1) 0%, rgba(156, 144, 194, 0.1) 100%)",
          opacity: 0,
          transition: "opacity 0.3s ease",
          zIndex: 1,
        },
      }}
    >
      <Stack
        sx={{
          position: "relative",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
          transition: "transform 0.3s ease",
        }}
      >
        <Image
          src={src}
          width={250}
          height={250}
          className="service-image"
          alt={text}
          priority
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
      </Stack>
      <Typography
        variant="h5"
        textAlign={"center"}
        fontFamily={"Libre Bodoni"}
        fontWeight={500}
        sx={{
          color: "#1A1A1A",
          position: "relative",
          zIndex: 2,
          transition: "color 0.3s ease",
        }}
      >
        {text}
      </Typography>
    </Stack>
  );
}
