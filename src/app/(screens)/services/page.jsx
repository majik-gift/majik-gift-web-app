"use client";
import ProductSlider from "@/app/components/ProductSlider";
import ServiceSection from "@/app/components/ServiceSection";
import SwipperSlider from "@/app/components/SwiperSlider";
import useFilterApiData from "@/hook/useFilterApiData";
import { setFilter } from "@/store/reducer";
import { Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Services() {
  const [data, setData] = useState({});
  const { apiData } = useFilterApiData("category?type=service_category");

  const dispatch = useDispatch();

  return (
    <Box id="services">
      {/* <ServiceSlider head={'Cherry Golden'} para={'Animal Healer'} button={'Book Now'} /> */}
      <SwipperSlider />
      <Container maxWidth={"lg"}>
        <Stack gap={2} mt={3}>
          <Typography variant="h4" fontWeight={"SemiBold"} textAlign={"center"}>
            Top Categories
          </Typography>
          <ProductSlider categoryType="service_category" />
        </Stack>
        <ServiceSection
          data={data}
          href={"/services"}
          type={"service"}
          apiData={apiData}
        />
      </Container>
    </Box>
  );
}
