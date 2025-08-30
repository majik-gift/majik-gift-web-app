"use client";
import React, { useEffect, useState } from "react";
import { Pagination, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Box,
  Container,
  Grid2,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image"; // Import Next.js Image component
import { image1, image20, SliderBanner } from "@/assets";
// import EndIconButton from "./EndIconButton";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./clientSwiper.css";
import "swiper/css/effect-flip";
import StartIconButton from "./StartIconButton";
import ClientComment from "./ClientComment";
import ApiManager from "@/helper/api-manager";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { resetFilters, setFilters } from "@/store/filterSlice";
import { useDispatch } from "react-redux";
import { setFilter } from "@/store/reducer";

export default function ProductSlider({ categoryType = "product_category" }) {
  const [categories, setCategories] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const filter =
    categoryType === "product_category"
      ? "product-name-az"
      : categoryType === "service_category"
      ? "service-name-az"
      : "event-name-az";

  useEffect(() => {
    (async function () {
      try {
        let { data } = await ApiManager({
          method: "get",
          path: `category?type=${categoryType}`,
        });
        setCategories(data?.response?.details);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // dispatch(
  //   setFilters({
  //     categoryId: firstDropdownValue,
  //     sortOption: secondDropdownValue,
  //   })
  // );

  return (
    <Stack justifyContent={"center"}>
      {/* Overlay content */}
      <Container
        maxWidth="lg"
        style={{
          height: "300px",
          // backgroundColor: "red",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        <Swiper
          effect={"flip"}
          lazy={"true"}
          // navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, EffectFade]}
          breakpoints={{
            950: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            750: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            500: {
              slidesPerView: 2,
              spaceBetween: 4,
            },
          }}
          className="custom-swipper"
          style={{
            "--swiper-pagination-size": "clamp(30px, 5vw, 60px)", // Responsive size
            padding: "45px 0px",
            paddingBottom: "60px",
            width: "100%",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 5,
          }}
        >
          {isLoading ? (
            <>
              {/* //   direction={"row"}
            //   justifyContent={"space-between"}
            //   overflow={"hidden"}
            // > */}
              {Array(4)
                .fill(null)
                .map((_, key) => (
                  <Stack
                    mr={{ xs: 2, md: 4, lg: 7 }}
                    position={"relative"}
                    key={key}
                    alignItems={"center"}
                  >
                    <Skeleton width={200} height={200} variant="circular" />
                    <Skeleton
                      width={120}
                      height={50}
                      variant="rectangular"
                      style={{
                        position: "absolute",
                        bottom: "-10px",
                      }}
                    />
                  </Stack>
                ))}
            </>
          ) : (
            // </Stack>
            categories?.map((category, key) => (
              <SwiperSlide
                key={key}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Stack
                  onClick={() => {
                    dispatch(
                      setFilters({
                        categoryId: category?.id,
                        sortOption: filter,
                      })
                    );
                  }}
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    position: "relative",
                    bgcolor: "background.primary",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                >
                  {category?.image ? (
                    <Image
                      src={category.image} // Ensure it's valid
                      alt={category?.name || "Category"}
                      width={200}
                      height={200}
                      style={{
                        borderRadius: "50%",
                      }}
                      priority
                    />
                  ) : (
                    category?.icon && (
                      <i
                        className={`fas ${category.icon}`}
                        style={{ fontSize: "80px", color: "black" }}
                      ></i>
                    )
                  )}
                  <Typography
                    variant="h6"
                    bgcolor="secondary.main"
                    px={1.2}
                    py={1}
                    sx={{ position: "absolute", bottom: "-10px", mt: 1 }}
                    fontFamily="Libre Bodoni"
                  >
                    {category?.name}
                  </Typography>
                </Stack>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </Container>
    </Stack>
  );
}
