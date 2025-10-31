"use client";
import {
  Autocomplete,
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
import ComboBox from "./ComboBox";
import TextField from "@mui/material/TextField";

import {
  ArrowBackIcon,
  ServiceProvider,
  ProductImg,
  Paypal,
  CheckCircleIcon,
  AiFillCreditCard,
  StarRateRoundedIcon,
  avatar,
} from "@/assets";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import HorizontalLine from "./HorizontalLine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FetchSingleData } from "@/global";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Schema } from "yup";
import * as yup from "yup";
import InputField from "./InputField";
import shippingSchema from "../schema/ShippingSchema";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "./PaymentModal";
import { AiOutlineConsoleSql } from "react-icons/ai";
import Link from "next/link";

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

export default function OrderSummary({ orderType, event = false }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
    control,
  } = useForm({
    resolver: yupResolver(shippingSchema),
  });
  console.log("TCL: OrderSummary -> errors", errors);
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [countryOptions, setCountryOptions] = useState(null);
  const pathname = usePathname();
  const [clientSecret, setClientSecret] = useState(null);
  const [open, setOpen] = useState(false);
  let { quantity } = useSelector((state) => state.appReducer);
  const selectedCountry = watch("shipping_country");
  const dispatch = useDispatch();
  const router = useRouter();
  let [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    let a = pathname.split("/");
    a.pop();
    {
      a.includes("services") && a.splice(1, 1, "service");
    }
    FetchSingleData(a.join("/"), setProductDetail);
  }, []);
  const handleClose = () => {
    setOpen(!open);
  };
  // extracting the shipping countries
  useEffect(() => {
    extractCountries(productDetail?.shippings);
  }, [productDetail]);

  const extractCountries = (arr) => {
    let countries = arr?.map((ele) => {
      const {
        cost,
        country: { name: label },
        id,
      } = ele;
      return { label, id, cost };
    });
    setCountryOptions(countries);
  };
  const handleOrder = async (data) => {
    setLoading(true);
    let { termsAndConditions, couponCode, ...value } = data;
    value = {
      ...value,
      shipping_country: value?.shipping_country?.id,
      coupon_code: value?.coupon_code,
      product: [{ id: productDetail?.id, quantity }],
    };

    try {
      if (productDetail?.created_by?.country === "Australia") {
        let { data } = await ApiManager({
          method: "post",
          path: "orders/create-payment-intent",
          params: value,
        });
        let { stripe_payment_intent_response } = data?.response?.details;
        localStorage.setItem(
          "order",
          JSON.stringify({
            type: event ? "ticket_id" : "order_id",
            id: data?.response?.details?.id,
          })
        );
        setClientSecret(stripe_payment_intent_response?.client_secret);
        setOpen(true);
        // dispatch(
        //   setToast({
        //     message:
        //       "Product Order Successfully placed! You will receive a confirmation email shortly.",
        //     type: "success",
        //   })
        // );
      } else {
        value = {
          ...value,
          success: true,
        };

        // console.log("TCL: handleOrder -> ...value", value);

        if (!value?.payment_screenshot) {
          setError("payment_screenshot", {
            message: "Payment proof is required",
            type: "error",
          });

          dispatch(
            setToast({
              message: "Payment proof is required",
              type: "error",
            })
          );
          return;
        }
        let { data } = await ApiManager({
          method: "post",
          path: "orders/create-paypal-payment-intent",
          params: value,
          header: {
            "Content-Type": "multipart/form-data",
          },
        });
        // dispatch(
        //   setToast({
        //     message:
        //       "Order placed successfully! You will receive a confirmation email shortly.",
        //     type: "success",
        //   })
        // );
        router.replace(`/order-details/${data?.response?.details?.id}`);
      }
    } catch (error) {
      console.log("🚀 ~ handleOrder ~ error:", error);
      setValue("coupon_code", "");
      dispatch(
        setToast({
          message: "Order Failed! Please try again later.",
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
        path: `coupons/coupon?code=${watch("coupon_code")}&product_id=${
          productDetail?.id
        }`,
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
      setValue("coupon_code", "");
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

  const handleServiceOrder = () => {
    console.log("service order");
  };

  // if (errors) {
  //   console.log("TCL: OrderSummary -> errors", errors)
  // }
  // console.log("TCL: OrderSummary -> errors", watch("shipping_country"));

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
            onSubmit={
              orderType === "Shipping Address"
                ? handleSubmit(handleOrder)
                : handleServiceOrder
            }
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
                  style={{ cursor: "pointer" }}
                  onClick={() => router.back()}
                />
                Order Summary
              </Typography>

              <Typography
                variant={"h6"}
                fontFamily={"Lato"}
                fontWeight={"Regular"}
              >
                {orderType}
              </Typography>

              {orderType === "Shipping Address" ? (
                <>
                  <ComboBox
                    countryOptions={countryOptions}
                    registerName="shipping_country"
                    setValue={setValue}
                    label="Select Country"
                    errors={errors}
                    control={control}
                  />
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Select State"
                    variant="outlined"
                    {...register("shipping_state")}
                    error={!!errors["shipping_state"]}
                    helperText={errors["shipping_state"]?.message}
                  />
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Enter Town/City"
                    variant="outlined"
                    {...register("shipping_city")}
                    error={!!errors["shipping_city"]}
                    helperText={errors["shipping_city"]?.message}
                  />
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Enter Post Code"
                    variant="outlined"
                    {...register("shipping_postal_code")}
                    error={!!errors["shipping_postal_code"]}
                    helperText={errors["shipping_postal_code"]?.message}
                  />
                  <TextField
                    style={{ width: "100%" }}
                    id="outlined-basic"
                    label="Enter Address"
                    variant="outlined"
                    {...register("shipping_address")}
                    error={!!errors["shipping_address"]}
                    helperText={errors["shipping_address"]?.message}
                  />
                  {productDetail?.created_by?.country !== "Australia" && (
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
              ) : (
                <>
                  <Stack gap={1}>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
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
                        {productDetail?.title}
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      height={"0.05rem"}
                      backgroundColor="background.colorOfBorder"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        variant={"h6"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                      >
                        {event ? "Event" : "Service"}
                      </Typography>
                      <Typography
                        variant={"h6"}
                        fontFamily={"Lato"}
                        fontWeight={"Regular"}
                      >
                        {productDetail?.type}
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      height={"0.05rem"}
                      backgroundColor="background.colorOfBorder"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
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
                        {productDetail?.title}
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      height={"0.05rem"}
                      backgroundColor="background.colorOfBorder"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Stack
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
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
                        {productDetail?.title}
                      </Typography>
                    </Stack>
                    <Stack
                      width={"100%"}
                      height={"0.05rem"}
                      backgroundColor="background.colorOfBorder"
                    />
                  </Stack>
                </>
              )}

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
                    {...register("coupon_code")}
                    error={!!errors["coupon_code"]}
                    helperText={errors["coupon_code"]?.message}
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
                <Stack direction={"row"}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        {...register("termsAndConditions")}
                        onChange={(e) => setChecked(e.target.checked)}
                      />
                    }
                  />
                  <Typography fontSize={"15px"}>
                    By clicking this, you are agreeing to our{" "}
                    <span style={{ color: "gray", fontWeight: "bold" }}>
                      <Link
                        href={"https://majikgift.com/terms-and-condition"}
                        style={{ color: "grey", textDecoration: "none" }}
                        target="_blank"
                      >
                        Terms and Conditions
                      </Link>
                    </span>{" "}
                    and{" "}
                    <span style={{ color: "gray", fontWeight: "bold" }}>
                      <Link
                        href={"https://majikgift.com/privacy-and-policy"}
                        style={{ color: "grey", textDecoration: "none" }}
                        target="_blank"
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </Typography>
                </Stack>
                {errors.termsAndConditions && (
                  <Typography color="error" variant="body2">
                    {errors.termsAndConditions.message}
                  </Typography>
                )}
              </Stack>

              <StartIconButton
                onClick={handleSubmit(handleOrder)}
                text={loading ? "loading..." : "Order"}
                color={"black"}
                textC={"white"}
                type={"submit"}
              />

              {/* <Button variant="contained" color="#fff">
                Cancel
              </Button> */}
            </Item>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Item>
              <Stack display={"flex"} flexDirection={"row"} gap={4}>
                <Image
                  priority
                  src={productDetail?.banner_image || avatar}
                  alt="no image"
                  width={120}
                  height={100}
                />
                <Stack>
                  <Typography
                    variant={"h5"}
                    fontFamily={"Lato"}
                    fontWeight={"bold"}
                  >
                    {productDetail?.name || productDetail?.title}
                  </Typography>
                  <Typography
                    fontSize={"17px"}
                    variant={"p"}
                    fontFamily={"Lato"}
                    fontWeight={"Regular"}
                  >
                    Quantity: {quantity < 10 ? `0${quantity}` : quantity}
                  </Typography>
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
                <Stack width={"100%"}>
                  <Stack width={"100%"}>
                    <Stack
                      width={"100%"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      gap={1}
                    >
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
                          Subtotal
                        </Typography>
                        <Typography
                          fontSize={"17px"}
                          variant={"p"}
                          fontFamily={"Lato"}
                          fontWeight={"Regular"}
                        >
                          $
                          {Number(
                            productDetail?.total_price * quantity ?? "0.00"
                          ).toFixed(2)}
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
                      {orderType === "Shipping Address" && (
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
                            Shipping
                          </Typography>
                          <Typography
                            fontSize={"17px"}
                            variant={"p"}
                            fontFamily={"Lato"}
                            fontWeight={"Regular"}
                          >
                            ${selectedCountry?.cost || "0.00"}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
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
                  {(
                    Number(productDetail?.total_price) * Number(quantity) +
                    Number(selectedCountry?.cost ?? "0.00") -
                    (Number(productDetail?.total_price) * discountPercentage) /
                      100
                  ).toFixed(2) || "0.00"}
                </Typography>
              </Stack>
            </Item>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <PaymentModal
          handleClose={handleClose}
          open={open}
          type={"product"}
          client_secret={clientSecret}
        />
      )}
    </Container>
  );
}
