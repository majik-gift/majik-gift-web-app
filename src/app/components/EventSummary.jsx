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
import TextField from "@mui/material/TextField";
import { format } from "date-fns";

import { ArrowBackIcon, avatar } from "@/assets";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import HorizontalLine from "./HorizontalLine";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FetchSingleData } from "@/global";
import { useForm } from "react-hook-form";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import { useDispatch, useSelector } from "react-redux";
import PaymentModal from "./PaymentModal";
import dayjs from "dayjs";
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

export default function EventSummary({}) {
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(true);
  const [clientSecret, setClientSecret] = useState(null);
  const [open, setOpen] = useState(false);
  let { quantity } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const router = useRouter();
  let { slot } = useSearchParams();
  const pathname = usePathname();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  console.log("TCL: errors", errors)
  // fetching the event details
  useEffect(() => {
    FetchSingleData(`/events/${pathname?.split("/")[2]}`, setProductDetail);
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOrder = async (data) => {
    setLoading(true);
    let { termsAndConditions, ...value } = data;
    // setError({})
    try {
      if (productDetail?.organizer?.country === "Australia") {
        let { data } = await ApiManager({
          method: "post",
          path: "event-ticket-orders/create-payment-intent",
          params: { event_id: productDetail?.id },
        });
        let { stripe_payment_intent_response } = data?.response?.details;
        localStorage.setItem("order", JSON.stringify({
          type: "ticket_id",
          id: data?.response?.details?.id,
        }));
        setClientSecret(stripe_payment_intent_response?.client_secret);
        setOpen(true);
      } else {
        if (!(value?.payment_screenshot)) {
          setError("payment_screenshot", {
            message: "Payment screenshot is required",
          });
          return;
        }

        let { data } = await ApiManager({
          method: "post",
          path: "event-ticket-orders/create-paypal-payment-intent",
          params: {
            event_id: productDetail?.id,
            payment_screenshot: value?.payment_screenshot,
          },
          header: {
            "Content-Type": "multipart/form-data",
          },
        });
        router.replace(`/order-details/${data?.response?.details?.id}`);
      }
    } catch (error) {
      console.log("🚀 ~ handleOrder ~ error:", error);
      dispatch(
        setToast({
          message: error?.response?.data?.message || error?.message || "Order Failed! Please try again later.",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  const handleServiceOrder = () => {
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
          <Grid size={{ xs: 12, md: 6 }} width={"100%"}>
            <Item width={"100%"}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={2}
                variant={"h5"}
                fontFamily={"Libre Bodoni"}
                fontWeight={"SemiBold"}
              >
                <ArrowBackIcon style={{ cursor: "pointer" }} onClick={() => router.back()} />
                Order Summary
              </Typography>
              <Stack gap={1}>
                <Stack flexDirection={"row"} justifyContent={"space-between"}>
                  <Typography
                    variant={"h6"}
                    fontFamily={"Lato"}
                    fontWeight={"Regular"}
                  >
                    Group Activity Name
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
                    Date
                  </Typography>
                  <Typography
                    variant={"h6"}
                    fontFamily={"Lato"}
                    fontWeight={"Regular"}
                  >
                    {productDetail?.event_date
                      ? format(
                          new Date(productDetail?.event_date),
                          "dd MMM yyyy"
                        )
                      : "--"}
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
                    {/* {productDetail?.start_time
                      ? format(new Date(productDetail?.start_time), "h:mm a")
                      : "--"}{" "}
                    -{" "}
                    {productDetail?.end_time
                      ? format(new Date(productDetail?.end_time), "h:mm a")
                      : "--"} */}
                      {dayjs.unix(productDetail?.start_time).format("h:mm A") +
                        " - " +
                        dayjs.unix(productDetail?.end_time).format("h:mm A") || "--"}
                  </Typography>
                </Stack>
                <Stack
                                    width={"100%"}
                                    height={"0.05rem"}
                                    backgroundColor="background.colorOfBorder"
                                />
              </Stack>
              {productDetail?.organizer?.country !== "Australia" && (
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
                <Stack alignItems={"center"} justifyContent={"center"}>
                  <Typography
                    variant={"h5"}
                    fontFamily={"Lato"}
                    fontWeight={"bold"}
                  >
                    {productDetail?.title || "--"}
                  </Typography>
                  {/* <Typography
                    fontSize={"17px"}
                    variant={"p"}
                    fontFamily={"Lato"}
                    fontWeight={"Regular"}
                  >
                    Quantity: {quantity < 10 ? `0${quantity}` : quantity}
                  </Typography> */}
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
                        $
                        {Number(productDetail?.total_price ?? "0.00").toFixed(
                          2
                        )}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>

              {/* <HorizontalLine /> */}

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
                    Number(productDetail?.total_price) * Number(quantity)
                  ).toFixed(2) || "0.00"}
                </Typography>
              </Stack>

              {/* <HorizontalLine /> */}
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
                text={"Confirm"}
                color={"black"}
                textC={"white"}
                type={"submit"}
                loading={loading}
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
      {open && (
        <PaymentModal
          handleClose={handleClose}
          type={"subscription"}
          open={open}
          client_secret={clientSecret}
        />
      )}
    </Container>
  );
}
