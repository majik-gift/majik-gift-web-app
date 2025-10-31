"use client";
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import StartIconButton from "./StartIconButton";
import TextField from "@mui/material/TextField";

import { ArrowBackIcon, StarRateRoundedIcon, avatar } from "@/assets";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import HorizontalLine from "./HorizontalLine";
import { usePathname, useSearchParams } from "next/navigation";
import { FetchSingleData } from "@/global";
import { useForm } from "react-hook-form";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "./PaymentModal";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CreditCard from "./CreditCard";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const Item = styled(Paper)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  // textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function ServiceOrderSummary() {
  const [productDetail, setProductDetail] = useState(null);

  const schema = yup.object().shape({
    termsAndConditions: yup
      .boolean()
      .oneOf([true], "You must accept the terms and conditions")
      .required("You must accept the terms and conditions"),
    payment_screenshot: yup.mixed().when(["productType", "isNonAustralian"], {
      is: (productType, isNonAustralian) =>
        productDetail?.created_by?.country !== "Australia" &&
        productDetail?.type === "service",
      then: (schema) =>
        schema
          .required("Payment screenshot is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value) return true; // Let required handle null/undefined
            return ["image/jpeg", "image/png", "image/jpg"].includes(
              value?.type
            );
          })
          .test("fileSize", "File size must be less than 10MB", (value) => {
            if (!value) return true; // Let required handle null/undefined
            return value?.size <= 10000000; // 10MB in bytes
          }),
      otherwise: (schema) => schema.optional(),
    }),
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let [client_secret, setClientSecret] = useState(null);
  let [card, setCard] = useState(false);
  let [selectedCard, setSelectedCard] = useState(null);
  let [couponCode, setCouponCode] = useState("");
  let [discountPercentage, setDiscountPercentage] = useState(0);
  let [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [cards, setCards] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  let id = pathname.split("/")[2];
  let searchParam = useSearchParams();
  let slotId = searchParam?.get("slot");
  const { user } = useSelector((state) => state.appReducer);
  // get the time slot and date from the local storage
  const { slot, date } = JSON.parse(localStorage.getItem("time_slot"));

  // get all cards of the user
  const getCards = async () => {
    try {
      let { data } = await ApiManager({
        path: `cards?customerId=${user?.id}&perPage=999999`,
        method: "get",
      });
      setCards(data?.response?.details?.items);
    } catch (error) {
      console.log("🚀 ~ getCards ~ error:", error);
    }
  };

  useEffect(() => {
    getCards();
  }, [card]);

  useEffect(() => {
    if (user?.role === "guest") {
      router.back();
    }
    FetchSingleData(`/service/${id}`, setProductDetail);
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOrder = async (formData) => {
    setLoading(true);
    try {
      if (productDetail?.type === "class") {
        let { data } = await ApiManager({
          method: "post",
          path: "service-orders/create-service-subscription",
          params: {
            time_slot: Number(slotId),
            service: productDetail?.id,
            ...(couponCode && { coupon_code: couponCode }),
          },
        });
        setCouponCode("");
        setDiscountPercentage(0);
        setChecked(false);
        dispatch(
          setToast({
            message: "Service Subscription Created Successfully!",
            type: "success",
          })
        );
        router.replace(`/subscriptions/${data?.response?.details?.id}`);
      } else if (productDetail?.created_by?.country === "Australia") {
        let { data } = await ApiManager({
          method: "post",
          path: "service-orders/create-payment-intent",
          params: {
            time_slot: Number(slotId),
            service: productDetail?.id,
            booking_date: date,
            ...(couponCode && { coupon_code: couponCode }),
          },
        });
        let { stripe_payment_intent_response } = data?.response?.details;
        localStorage.setItem(
          "order",
          JSON.stringify({
            type: "service_order_id",
            id: data?.response?.details?.id,
          })
        );
        setClientSecret(stripe_payment_intent_response?.client_secret);
        if (productDetail?.type === "service") {
          setOpen(true);
        }
        setCouponCode("");
        setDiscountPercentage(0);
        setChecked(false);
      } else {
        let { data } = await ApiManager({
          method: "post",
          path: "service-orders/create-paypal-payment-intent",
          params: {
            time_slot: slotId,
            success: true,
            service: productDetail?.id,
            booking_date: date,
            ...(formData?.payment_screenshot && {
              payment_screenshot: formData?.payment_screenshot,
            }),
            ...(couponCode && { coupon_code: couponCode }),
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
        });

        router.replace(
          `/${
            productDetail?.type === "service" ? "readings" : "subscriptions"
          }/${data?.response?.details?.id}`
        );
        setCouponCode("");
        setDiscountPercentage(0);
        setChecked(false);
      }
    } catch (error) {
      console.log("🚀 ~ handleOrder ~ error:", error);
      dispatch(
        setToast({
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Service Order Failed! Please try again later.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCoupon = async () => {
    try {
      let { data } = await ApiManager({
        method: "get",
        path: `coupons/coupon?code=${couponCode}&service_id=${productDetail?.id}`,
        // params: {
        //   code: couponCode,
        //   service_id: productDetail?.id,
        // },
      });
      if (data.status === 200) {
        setDiscountPercentage(data?.response?.details?.discount_percentage);
        dispatch(
          setToast({
            message: "Coupon Applied Successfully!",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log("🚀 ~ handleApplyCoupon ~ error:", error);
      setCouponCode("");
      dispatch(
        setToast({
          message:
            error?.response?.data?.message ||
            "Coupon Not Found! Please try again.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth={"lg"}
      width={"100%"}
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        py: 5,
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container justifyContent={"space-between"} width={"100%"}>
          <Grid
            size={{ xs: 12, md: 6 }}
            component={"form"}
            onSubmit={handleSubmit(handleOrder)}
            width={"100%"}
          >
            <Item width={"100%"}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={2}
                variant={"h5"}
                fontFamily={"Libre Bodoni"}
                fontWeight={"SemiBold"}
              >
                <ArrowBackIcon
                  onClick={() => router.back()}
                  style={{ cursor: "pointer" }}
                />
                Order Summary
              </Typography>

              <Typography
                variant={"h6"}
                fontFamily={"Lato"}
                fontWeight={"Regular"}
              >
                Service Order
              </Typography>

              <>
                <Stack gap={1}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      Name
                    </Typography>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      {productDetail?.title || "--"}
                    </Typography>
                  </Stack>
                  <Stack
                    width={"100%"}
                    height={"0.05rem"}
                    backgroundColor="background.colorOfBorder"
                  />
                </Stack>
                <Stack gap={1}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      Service
                    </Typography>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      {productDetail?.type || "--"}
                    </Typography>
                  </Stack>
                  <Stack
                    width={"100%"}
                    height={"0.05rem"}
                    backgroundColor="background.colorOfBorder"
                  />
                </Stack>
                <Stack gap={1}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      Date
                    </Typography>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      {dayjs(date).format("DD-MM-YYYY") || "--"}
                    </Typography>
                  </Stack>
                  <Stack
                    width={"100%"}
                    height={"0.05rem"}
                    backgroundColor="background.colorOfBorder"
                  />
                </Stack>
                <Stack gap={1}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      Time
                    </Typography>
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      {dayjs.unix(slot?.start_time).format("h:mm A") +
                        " - " +
                        dayjs.unix(slot?.end_time).format("h:mm A") || "--"}
                    </Typography>
                  </Stack>
                  <Stack
                    width={"100%"}
                    height={"0.05rem"}
                    backgroundColor="background.colorOfBorder"
                  />
                </Stack>
                {productDetail?.type === "service" &&
                  productDetail?.created_by?.country !== "Australia" && (
                    <>
                      <Stack
                        width={"100%"}
                        direction="row"
                        height={90}
                        justifyContent={"space-between"}
                        spacing={2}
                        alignItems="center"
                      >
                        {watch("payment_screenshot") ? (
                          <Box sx={{ width: 90, height: 90 }}>
                            <img
                              src={URL.createObjectURL(
                                watch("payment_screenshot")
                              )}
                              alt="Payment proof"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: "10px",
                                border: "1px solid #000",
                              }}
                            />
                          </Box>
                        ) : (
                          <Stack flexDirection={"column"} gap={1}>
                            <Typography
                              variant="p"
                              fontSize={18}
                              fontFamily={"Lato"}
                              fontWeight={"Regular"}
                            >
                              No File Uploaded
                            </Typography>
                            {errors["payment_screenshot"] && (
                              <Typography color="error" variant="caption">
                                {errors["payment_screenshot"].message}
                              </Typography>
                            )}
                          </Stack>
                        )}

                        <Button
                          variant="contained"
                          component="label"
                          sx={{ height: 56 }}
                        >
                          Upload Payment Proof
                          <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => {
                              setValue("payment_screenshot", e.target.files[0]);
                            }}
                          />
                        </Button>
                      </Stack>
                    </>
                  )}
              </>

              <Stack width={"100%"} display={"flex"} gap={2}>
                <Stack
                  width={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography
                    variant={"h6"}
                    fontFamily={"Lato"}
                    fontWeight={"Regular"}
                  >
                    Have a coupon Code?
                  </Typography>
                  <Typography
                    variant={"p"}
                    fontSize={18}
                    fontFamily={"Lato"}
                    color="gray"
                    fontWeight={"Regular"}
                  >
                    (Optional)
                  </Typography>
                </Stack>
                <Stack
                  width={"100%"}
                  display={"flex"}
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                >
                  <TextField
                    style={{ width: "80%", borderRadius: "0" }}
                    id="outlined-basic"
                    label="Enter you coupon code"
                    variant="outlined"
                    onChange={(e) => setCouponCode(e.target.value)}
                    value={couponCode}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ borderRadius: "0", width: "20%" }}
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </Stack>
              </Stack>

              <Stack className="flex flex-col gap-4">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      {...register("termsAndConditions")}
                      onChange={(e) => setChecked(e.target.checked)}
                    />
                  }
                  label={
                    <Typography fontSize={"15px"}>
                      By clicking this, you are agreeing to our{" "}
                      <span style={{ color: "gray", fontWeight: "bold" }}>
                        Terms and Conditions
                      </span>{" "}
                      and{" "}
                      <span style={{ color: "gray", fontWeight: "bold" }}>
                        Privacy Policy
                      </span>
                    </Typography>
                  }
                />
                {errors.termsAndConditions && (
                  <Typography color="error" variant="body2">
                    {errors.termsAndConditions.message}
                  </Typography>
                )}
              </Stack>

              <StartIconButton
                onClick={handleSubmit(handleOrder)}
                text={"Order"}
                color={"black"}
                textC={"white"}
                loading={loading}
                type={"submit"}
              />

              <Button
                onClick={() => router.back()}
                variant="contained"
                color="#fff"
              >
                Cancel
              </Button>
            </Item>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Item>
              <Stack display={"flex"} flexDirection={"row"} gap={4}>
                <Image
                  priority
                  src={productDetail?.image[0] || avatar}
                  alt=""
                  width={120}
                  height={100}
                />
                <Stack>
                  <Typography
                    variant={"h6"}
                    fontFamily={"Lato"}
                    fontWeight={"bold"}
                  >
                    {productDetail?.title || "--"}
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    // display={"flex"}
                    // alignItems={"center"}
                    // justifyContent={"space-between"}
                    // fontSize={"15px"}
                    // variant={"p"}
                    // fontFamily={"Lato"}
                    // fontWeight={"Regular"}
                  >
                    <StarRateRoundedIcon sx={{ color: "text.ratedStar" }} />
                    {productDetail?.rating || 0}{" "}
                    <Typography
                      fontSize={"15px"}
                      variant={"p"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                      color="gray"
                    >
                      ( {productDetail?.reviews?.length || 0} Reviews )
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>

              <HorizontalLine />

              <Stack width={"100%"} display={"flex"} gap={2}>
                <Typography
                  fontSize={"17px"}
                  variant={"p"}
                  fontFamily={"Lato"}
                  fontWeight={"bold"}
                >
                  Price details
                </Typography>
                <Stack width={"100%"} gap={1}>
                  <Stack
                    width={"100%"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      fontSize={"17px"}
                      variant={"p"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      Sub Total
                    </Typography>
                    <Typography
                      fontSize={"17px"}
                      variant={"p"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      ${productDetail?.total_price}
                    </Typography>
                  </Stack>
                  {discountPercentage > 0 && (
                    <Stack
                      width={"100%"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        fontSize={"17px"}
                        variant={"p"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                      >
                        Discounted Percentage
                      </Typography>
                      <Typography
                        fontSize={"17px"}
                        variant={"p"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                      >
                        {discountPercentage || 0} %
                      </Typography>
                    </Stack>
                  )}
                  {discountPercentage > 0 && (
                    <Stack
                      width={"100%"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        fontSize={"17px"}
                        variant={"p"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                      >
                        Discounted Amount
                      </Typography>
                      <Typography
                        fontSize={"17px"}
                        variant={"p"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                      >
                        $
                        {(productDetail?.total_price * discountPercentage) /
                          100}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Stack>

              <HorizontalLine />

              <Stack
                width={"100%"}
                flexDirection={"row"}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Typography
                  fontSize={"22px"}
                  variant={"p"}
                  fontFamily={"Lato"}
                  fontWeight={"bold"}
                >
                  Grand Total
                </Typography>
                <Typography
                  fontSize={"22px"}
                  variant={"p"}
                  fontFamily={"Lato"}
                  fontWeight={"bold"}
                >
                  $
                  {productDetail?.total_price -
                    (productDetail?.total_price * discountPercentage) / 100}
                </Typography>
              </Stack>
              {productDetail?.type === "class" && (
                <Stack gap={1}>
                  <Stack
                    flexDirection={"row"}
                    mb={2}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      variant={"h6"}
                      fontFamily={"Lato"}
                      fontWeight={"Regular"}
                    >
                      Your Cards
                    </Typography>
                    <Link href={"#"} onClick={() => setCard(true)}>
                      <Typography
                        variant={"h6"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                        textAlign={"right"}
                      >
                        Add Card
                      </Typography>
                    </Link>
                  </Stack>
                  {cards?.length ? (
                    cards?.map((card) => {
                      return (
                        <CreditCard
                          card={card}
                          onClick={(e) => setSelectedCard(e)}
                          setCards={setCards}
                          updateCard={() => getCards()}
                        />
                      );
                    })
                  ) : (
                    <Stack
                      sx={{
                        border: "2px dashed #ccc",
                        borderRadius: "12px",
                        padding: "20px",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontFamily="Lato"
                        fontWeight="Regular"
                        color="text.secondary"
                      >
                        No Card Found
                      </Typography>
                    </Stack>
                  )}
                  <Stack
                    width={"100%"}
                    height={"0.05rem"}
                    backgroundColor="background.colorOfBorder"
                  />
                </Stack>
              )}
            </Item>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <PaymentModal
          handleClose={handleClose}
          type={"service"}
          open={open}
          client_secret={client_secret}
        />
      )}
      {
        <PaymentModal
          handleClose={() => setCard(false)}
          open={card}
          client_secret={client_secret}
          card={true}
          setState={setCard}
        />
      }
    </Container>
  );
}
