import ServiceOrderSummary from "@/app/components/ServiceOrderSummary";
import { Container } from "@mui/material";
import React from "react";

export default function Services() {
  return (
    <Container maxWidth={"lg"}>
      <ServiceOrderSummary />
    </Container>
  );
}
