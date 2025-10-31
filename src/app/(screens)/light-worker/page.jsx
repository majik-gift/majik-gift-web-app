import ServiceSection from "@/app/components/ServiceSection";
import { Container, Stack } from "@mui/material";
import React from "react";

export default function LightWorker() {
  return (
    <Container maxWidth={"lg"}>
      <Stack>
        <ServiceSection type={"users"} href={"/light-worker"} />
      </Stack>
    </Container>
  );
}
