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
      sx={{ textDecoration: "none" }}
    >
      <Image
        src={src}
        width={250}
        height={250}
        sx={{ width: "250px", height: "250px" }}
        alt={text}
        priority
      />
      <Typography
        variant="h5"
        textAlign={"center"}
        fontFamily={"Libre Bodoni"}
        fontWeight={"Regular"}
      >
        {text}
      </Typography>
    </Stack>
  );
}
