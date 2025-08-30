"use client";
import GetInTouch from "@/app/components/GetInTouch";
import ProductSlider from "@/app/components/ProductSlider";
import ServiceSection from "@/app/components/ServiceSection";
import ServiceSlider from "@/app/components/ServiceSlider";
import SwipperSlider from "@/app/components/SwiperSlider";
import useFilterApiData from "@/hook/useFilterApiData";
import { setFilter } from "@/store/reducer";
import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";

export default function Products() {
  const { apiData } = useFilterApiData("category?type=product_category");
  const dispatch = useDispatch();

  return (
    <Stack gap={5}>
      {/* <ServiceSlider head={'Antique Bowl'} para={'Singing Bowl'} button={'Buy Now'} /> */}
      <SwipperSlider />
      <Container>
        <Stack id="products">
          <Typography variant="h4" fontWeight={"SemiBold"} textAlign={"center"}>
            Top Categories
          </Typography>
          <ProductSlider />
          <ServiceSection
            type="products"
            href={"/products"}
            apiData={apiData}
          />
        </Stack>
      </Container>
    </Stack>
  );
}
