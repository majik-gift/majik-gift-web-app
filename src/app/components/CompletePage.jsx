"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Stack,
  Box,
  Button,
} from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { CheckCircle, Cancel, HourglassEmpty } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import ApiManager from "@/helper/api-manager";
const PaymentStatusCard = () => {
  // let order_id = localStorage?.getItem('order_id')
  const stripe = useStripe();
  const [orderId, setOrderId] = useState("");
  const [service_order_id, setServiceOrderId] = useState("");
  const [ticket_id, setTicketId] = useState("");
  const [status, setStatus] = useState("processing");
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Now we are sure we are in the browser
      const order = JSON.parse(localStorage?.getItem("order"));
      setOrderId(order);
    }
  }, []);
  const confirmationCall = async ({ status }) => {
    // const path = orderId
    //   ? "orders/confirm-payment-intent"
    //   : service_order_id
    //   ? "service-orders/confirm-payment-intent"
    //   : "event_ticket_orders/confirm-payment-intent";
    let path = {
      ["order_id"]: {
        path: "orders/confirm-payment-intent",
        params: { order_id: Number(orderId?.id) },
      },
      ["service_order_id"]: {
        path: "service-orders/confirm-payment-intent",
        params: { service_order_id: Number(orderId?.id) },
      },
      ["ticket_id"]: {
        path: "event-ticket-orders/confirm-payment-intent",
        params: { ticket_id: Number(orderId?.id) },
      },
    };
    try {
      let { data } = await ApiManager({
        method: "post",
        path: path[orderId?.type]?.path,
        params: {
          ...path[orderId?.type]?.params,
          success: status,
        },
      });
    } catch (error) {
      console.log("🚀 ~ confirmationCall ~ error:", error);
    }
  };

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    stripe?.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setStatus("success");
          break;
        case "processing":
          setStatus("processing");
          break;
        case "requires_payment_method":
          setStatus("failed");
          break;
        default:
          setStatus("unknown");
      }
      confirmationCall({ status: paymentIntent?.status === "succeeded" });
    });
  }, [stripe]);
  const router = useRouter();
  let icon, title, message, color;
  switch (status) {
    case "success":
      icon = <CheckCircle sx={{ fontSize: 80, color: "green" }} />;
      title = "Payment Successful!";
      message =
        "Thank you for your payment. Your transaction has been completed successfully.";
      color = "green";
      break;
    case "failed":
      icon = <Cancel sx={{ fontSize: 80, color: "red" }} />;
      title = "Payment Failed";
      message = "There was an issue processing your payment. Please try again.";
      color = "red";
      break;
    case "processing":
      icon = <HourglassEmpty sx={{ fontSize: 80, color: "orange" }} />;
      title = "Payment Pending";
      message =
        "Your payment is still being processed. Please check back later.";
      color = "orange";
      break;
    default:
      icon = <CircularProgress size={80} />;
      title = "Loading...";
      message = "Fetching payment status. Please wait.";
      color = "primary";
  }

  //   const { text, icon,message,color } = getStatusContent();

  return (
    <Card
      sx={{
        maxWidth: 700,
        margin: "auto",
        textAlign: "center",
        paddingY: 6,
        paddingX: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          {icon}
        </Box>
        <Typography variant="h4" component="div" sx={{ mb: 2, color }}>
          {title}
        </Typography>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {message}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            router.push(
              `/${
                orderId?.type === "service_order_id"
                  ? "readings"
                  : orderId?.type === "order_id"
                  ? "order-details"
                  : "group-activities"
              }/${orderId?.id}`
            )
          }
          fullWidth
        >
          Show Order Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentStatusCard;
