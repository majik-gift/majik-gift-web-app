"use client";
import GetInTouch from "@/app/components/GetInTouch";
import ServiceSection from "@/app/components/ServiceSection";
import ServiceSlider from "@/app/components/ServiceSlider";
import {
  Button,
  Container,
  Stack,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import {
  ArrowBackIcon,
  FileUploadOutlinedIcon,
  LuBox,
  P1,
  P2,
  P3,
  Ziczak,
} from "@/assets";

import Image from "next/image";
import OrderDetails from "@/app/components/OrderDetails";
import SearchField from "@/app/components/SearchField";
import HorizontalLine from "@/app/components/HorizontalLine";
import StartIconButton from "@/app/components/StartIconButton";
import ApiManager from "@/helper/api-manager";
import { status } from "@/constant/constant";
import { useDispatch } from "react-redux";
import { setToast } from "@/store/reducer";
import dayjs from "dayjs";

export default function Events() {
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [review, setReview] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Ensures 24-hour format
  };

  let addReviews = async () => {
    try {
      setLoading(true);
      let formData = {
        order_id: orderId,
        rating: 5,
        review: review,
        tip: false,
      };
      let { data } = await ApiManager({
        method: "post",
        path: `orders/review`,
        params: {
          ...formData,
        },
      });
      dispatch(
        setToast({
          message: " Thank you! Your review has been successfully added",
          type: "success",
          duration: 3000,
        })
      );
      setReview("");
      // console.log("🚀 ~ addReviews ~ data:", data);
    } catch (error) {
      console.log("🚀 ~ addReviews ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  let getOrderDetail = async () => {
    try {
      let { data } = await ApiManager({
        method: "get",
        path: `orders/${orderId}`,
      });
      // console.log("🚀 ~ getOrderDetail ~ data:", data?.response?.details);
      setOrderDetails(data?.response?.details);
    } catch (error) {}
  };
  useEffect(() => {
    getOrderDetail();
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <Stack gap={4} paddingY={5}>
        <Stack
          mt={4}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography
            display={"flex"}
            alignItems={"center"}
            gap={2}
            variant={"h5"}
            fontFamily={"Libre Bodoni"}
            fontWeight={"SemiBold"}
          >
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={() => router.back()}
            />
            Order Details
          </Typography>
          <FileUploadOutlinedIcon style={{ cursor: "pointer" }} />
        </Stack>

        <Stack
          bgcolor={status?.[orderDetails?.status]?.color}
          padding={4}
          color={"white"}
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          width={"100%"}
        >
          <Stack>
            <Typography
              display={"flex"}
              alignItems={"center"}
              gap={2}
              variant={"h5"}
              fontFamily={"Libre Bodoni"}
              fontWeight={"SemiBold"}
            >
              {status?.[orderDetails?.status]?.label}
            </Typography>
            <Typography
              display={"flex"}
              alignItems={"center"}
              gap={2}
              variant={"p"}
              fontFamily={"Libre Bodoni"}
            >
              {new Date(orderDetails?.created_at).toLocaleString(
                "en-US",
                options
              )}
            </Typography>
          </Stack>
          <svg
            style={{ marginTop: -30, marginRight: -15 }}
            width="45"
            height="58"
            viewBox="0 0 45 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.1429 16.1029C23.5216 16.6228 16.6227 23.5219 16.1028 32.1429H16.0398C15.5199 23.5219 8.62099 16.6228 0 16.1029V16.04C8.62099 15.52 15.5199 8.62124 16.0398 0H16.1028C16.6227 8.62124 23.5216 15.52 32.1429 16.04V16.1029Z"
              fill="white"
            />
            <path
              d="M45.0003 49.3031C40.4023 49.5803 36.7229 53.2598 36.4456 57.8577H36.412C36.1347 53.2598 32.4553 49.5803 27.8574 49.3031V49.2695C32.4553 48.9922 36.1347 45.3128 36.412 40.7148H36.4456C36.7229 45.3128 40.4023 48.9922 45.0003 49.2695V49.3031Z"
              fill="white"
            />
          </svg>
        </Stack>

        <Stack
          padding={2}
          gap={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={"100%"}
          border={0.3}
          borderColor={"gray"}
        >
          <Stack
            flexDirection={"row"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <LuBox size={30} />
            <Typography variant="h6" fontWeight={"SemiBold"}>
              Product details
            </Typography>
          </Stack>
          <Stack gap={1}>
            <Typography variant="h6">
              {orderDetails?.order_items[0]?.product?.name || "--"}
            </Typography>
            <Typography variant="p" color="gray" fontSize={17}>
              {orderDetails?.order_items[0]?.product?.description || "--"}
            </Typography>
            <Typography variant="p" fontSize={17}>
              Qty: {orderDetails?.order_items[0]?.quantity || 0}
            </Typography>
            <Typography variant="p" fontSize={17}>
              Product Price: ${orderDetails?.start_amount || 0}
            </Typography>
            <Typography variant="p" fontSize={17}>
              Final Amount: ${orderDetails?.final_amount || 0}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          gap={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={"100%"}
          height={175}
          position={"relative"}
        >
          <Image
            src={Ziczak}
            priority
            alt="Background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              width: "100%", // Ensures the image spans the full width
              height: "175px", // Fixes the height to 400px
              objectFit: "cover", // Ensures the image maintains its aspect ratio
            }}
          />
          <Stack padding={3} gap={1} width={"100%"}>
            <Stack
              flexDirection={"row"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Typography variant="p" fontSize={17}>
                Applied Coupon:
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.coupon_code || "No"}
              </Typography>
            </Stack>
            <Stack
              flexDirection={"row"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Typography variant="p" fontSize={17}>
                Discount Percentage:
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.discount_percentage}%
              </Typography>
            </Stack>

            {/* <HorizontalLine bgColor="#DEDEDE" /> */}
            <Stack
              // mb={6}
              flexDirection={"row"}
              width={"100%"}
              justifyContent={"space-between"}
            >
              <Typography variant="p" fontSize={17}>
                Discounted Amount:
              </Typography>
              <Typography variant="p" fontSize={17}>
                ${orderDetails?.discount_amount || 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          gap={1}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={"100%"}
        >
          <Stack
            flexDirection={"row"}
            display={"flex"}
            alignItems={"center"}
            gap={2}
          >
            <Typography variant="h6" fontWeight={"SemiBold"}>
              More Details
            </Typography>
          </Stack>
          <Stack
            width={"100%"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack gap={1}>
              <Typography variant="p" fontSize={17}>
                Placed on:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Courier Service:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Tracking Id:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Tip Amount:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Refund Amount:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Shipping Postal Code:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Shipping City:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Shipping Cost:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Shipping State:
              </Typography>
              <Typography variant="p" fontSize={17}>
                Shipping Address:
              </Typography>
            </Stack>
            <Stack gap={1} width={"50%"}>
              <Typography variant="p" fontSize={17}>
                {dayjs(orderDetails?.created_at).format("dddd, DD MMM, HH:mm")}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.carrier_service || "--"}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.tracking_id || "--"}
              </Typography>
              <Typography variant="p" fontSize={17}>
                ${orderDetails?.tips_amount || 0}
              </Typography>
              <Typography variant="p" fontSize={17}>
                ${orderDetails?.refund_amount || 0}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.shipping_postal_code || "--"}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.shipping_city}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.shipping_cost}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.shipping_state || "--"}
              </Typography>
              <Typography variant="p" fontSize={17}>
                {orderDetails?.shipping_address || "--"}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* {orderDetails?.status === "delivered" && (
          <Stack gap={4}>
            <TextareaAutosize
              minRows={5}
              style={{
                outline: "1px solid black",
                padding: "20px",
                borderRadius: "5px",
              }}
              placeholder="Add Your Review"
              variant={"outlined"}
              onChange={(e) => setReview(e?.target?.value)}
              value={review}
            />
            <Button
              variant="outlined"
              loading={loading}
              sx={{
                alignSelf: "flex-end",
                borderRadius: 0,
                paddingLeft: 6,
                paddingRight: 6,
                fontSize: "16px",
              }}
              onClick={addReviews}
            >
              Add
            </Button>
          </Stack>
        )} */}
        {/* <Stack
          display={"flex"}
          alignItems={"flex-start"}
          justifyContent={"center"}
        >
          <StartIconButton
            color={"black"}
            textC={"white"}
            text={"Order Again"}
          />
        </Stack> */}
      </Stack>
    </Container>
  );
}
