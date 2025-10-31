"use client";
import ProductSlider from "@/app/components/ProductSlider";
import ServiceSection from "@/app/components/ServiceSection";
import SwipperSlider from "@/app/components/SwiperSlider";
import useFilterApiData from "@/hook/useFilterApiData";
import { setFilter } from "@/store/reducer";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

export default function Events() {
  const { apiData } = useFilterApiData("category?type=event_category");
  const dispatch = useDispatch();

  return (
    <Box id="events">
      <SwipperSlider />
      <Container maxWidth={"lg"}>
        <Stack gap={2} mt={3}>
          <Typography variant="h4" fontWeight={"SemiBold"} textAlign={"center"}>
            Top Categories
          </Typography>
          <ProductSlider categoryType="event_category" />
        </Stack>
        <ServiceSection type={"events"} href={"/events"} apiData={apiData} />
      </Container>
    </Box>
  );
}
