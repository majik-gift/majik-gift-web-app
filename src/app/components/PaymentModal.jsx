"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  Typography,
  InputAdornment,
  ButtonGroup,
  Checkbox,
} from "@mui/material";
import { CloseIcon } from "@/assets";
import AuthPage from "./AuthPage";
import StartIconButton from "./StartIconButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ApiManager from "@/helper/api-manager";
import { setToast, setUser } from "@/store/reducer";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCookie } from "@/helper/cookies";
import { useRouter } from "next/navigation";

// import { useDispatch } from "react-redux";
// import apiManager from "@/app/helper/api-manager";
// import { setToast } from "@/store/reducer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement } from "@stripe/react-stripe-js";
import CompletePage from "./CompletePage.jsx";
import CheckoutForm from "./CheckoutForm";
import AddCard from "./AddCard";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const PaymentModal = ({
  type,
  open,
  card,
  handleClose,
  TransitionComponent,
  client_secret,
  setState,
}) => {
  // console.log("TCL: type", type)

  const order = JSON.parse(localStorage?.getItem("order"));

  // path or params for cancel order
  const cancel_order_path = {
    service: {
      path: `service-orders/confirm-payment-intent`,
      params: { service_order_id: Number(order?.id), success: false },
    },
    product: {
      path: `orders/confirm-payment-intent`,
      params: { order_id: Number(order?.id), success: false },
    },
    subscription: {
      path: `event-ticket-orders/confirm-payment-intent`,
      params: { ticket_id: Number(order?.id), success: false },
    },
  };

  const cancel_order = async () => {
    try {
      let { data } = await ApiManager({
        path: cancel_order_path[type]?.path,
        method: "post",
        params: { ...cancel_order_path[type]?.params },
      });
      // console.log("TCL: cancel_order -> data", data)
    } catch (error) {
      console.log("TCL: error", error);
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
    } finally {
      handleClose();
    }
  };

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const options = client_secret
    ? {
        clientSecret: client_secret, // Ensure this is a valid client secret
        appearance: { theme: "stripe" },
      }
    : null;

  return (
    <Stack>
      <Dialog
        open={open}
        style={{ width: "100%" }}
        onClose={cancel_order}
        TransitionComponent={TransitionComponent}
      >
        <DialogTitle
          width={{ xs: "100%", sm: "500px", md: "600px" }}
          overflow={"hidden"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={3}
        >
          <Typography
            fontWeight={"Bold"}
            sx={{
              typography: { xs: "h3", md: "h4" },
              marginTop: { md: "30px" },
              fontFamily: "Libre Bodoni",
            }}
          >
            {card ? "Add Card" : "Complete your payment"}
          </Typography>
          {/* <Typography
            textAlign={"center"}
            width={{ xs: "80%", sm: "70%", md: "60%" }}
            sx={{ typography: { xs: "body2", md: "body1" } }}
          >
            To place an order you must need to logged into your account.{" "}
          </Typography> */}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={cancel_order}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {card ? (
            <AddCard setState={setState} />
          ) : client_secret ? (
            <Elements
              options={{ clientSecret: client_secret }}
              stripe={stripePromise}
            >
              <CheckoutForm />
            </Elements>
          ) : (
            <Typography color="error">Error: Missing client secret</Typography>
          )}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default PaymentModal;
