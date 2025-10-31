"use client";
import GetInTouch from "@/app/components/GetInTouch";
import ServiceSection from "@/app/components/ServiceSection";
import ServiceSlider from "@/app/components/ServiceSlider";
import {
  Container,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { P1, P2, P3, ArrowBackIcon, FileUploadOutlinedIcon } from "@/assets";

import Image from "next/image";
import OrderDetails from "@/app/components/OrderDetails";
import SearchField from "@/app/components/SearchField";
import ApiManager from "@/helper/api-manager";
import { useDispatch, useSelector } from "react-redux";
import { setToast } from "@/store/reducer";
import OrderDetailsSkeleton from "./OrderDetailsSkeleton";

export default function Events() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  let dispatch = useDispatch();
  const { user } = useSelector((state) => state.appReducer);
  let [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      getOrderDetails(debouncedSearch);
    } else {
      getOrderDetails();
    }
  }, [debouncedSearch]);
  const getOrderDetails = async (debouncedSearch) => {
    setLoading(true);
    let path = `orders?userId[]=${user?.id}`;

    if (debouncedSearch) {
      path += `&search=${debouncedSearch}`;
    }
    try {
      let { data } = await ApiManager({
        method: "get",
        path: path,
      });
      setOrderDetails(data?.response?.details);
    } catch (error) {
      console.log("🚀 ~ getOrderDetails ~ error:", error);
      // dispatch(
      //   setToast({ message: "Failed to load order details!", type: "error" })
      // );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getOrderDetails();
  }, [user]);

  return (
    <Container maxWidth={"lg"} sx={{ px: "0 !important" }}>
      <Stack gap={8} px={0}>
        <Stack mt={4} display={"flex"} flexDirection={"row"} gap={2}>
          <ArrowBackIcon
            style={{ cursor: "pointer" }}
            onClick={() => router.back()}
          />
          <Typography
            display={"flex"}
            alignItems={"center"}
            gap={2}
            variant={"h5"}
            fontFamily={"Libre Bodoni"}
            fontWeight={"SemiBold"}
          >
            My Orders
          </Typography>
          {/* <FileUploadOutlinedIcon style={{ cursor: "pointer" }} /> */}
        </Stack>
        {/* <SearchField search={search} setSearch={setSearch} /> */}
        {loading ? (
          <Container
            maxWidth={"lg"}
            width={"100%"}
            sx={{ paddingBottom: "20px" }}
          >
            <Stack gap={6} mb={6}>
              {Array(4)
                .fill(null)
                .map((_, index) => (
                  // <Skeleton
                  //   key={index}
                  //   variant="rectangular"
                  //   animation="pulse"
                  //   width={"100%"}
                  //   height={250}
                  // />
                  <OrderDetailsSkeleton />
                ))}
            </Stack>
          </Container>
        ) : (
          <OrderDetails
            orderDetailsOpt={orderDetails}
            setOrderDetails={setOrderDetails}
          />
        )}
      </Stack>
    </Container>
  );
}
