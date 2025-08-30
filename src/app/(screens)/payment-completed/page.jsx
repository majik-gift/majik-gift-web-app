"use client";
import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Stack } from "@mui/material";
import CompletePage from "@/app/components/CompletePage";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
export default function PaymentCompleted() {
  return (
    <Stack justifyContent={'center'} alignItems={'center'}>
      <Stack width={'100%'} minHeight={'50vh'}>
        <Elements stripe={stripePromise}>
          <CompletePage />
        </Elements>
      </Stack>
    </Stack>
  );
}