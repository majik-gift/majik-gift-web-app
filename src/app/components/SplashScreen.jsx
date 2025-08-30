import { Logo } from "@/assets";
import { Stack } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function SplashScreen() {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      width={"100%"}
      height={"100vh"}
    >
      <Image
        src={Logo}
        alt="Logo"
        width={200}
        style={{ maxWidth: "200px", minWidth: "200px" }}
      />
    </Stack>
  );
}
