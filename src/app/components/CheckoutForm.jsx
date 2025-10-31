"use client";
import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: process.env.NEXT_PUBLIC_APP_URL + "/payment-completed",
      },
    });
    setLoading(false);

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}  style={{ display: "flex", flexDirection: "column" }}>
      <PaymentElement />
      <button
        disabled={!stripe || loading}
        style={{
          borderRadius: 4,
          cursor: "pointer",
          border: "none",
          alignSelf: "flex-end",
          marginTop: 8,
          fontSize: "14px",
          padding: "5px 11px",
          fontWeight: 500,
          width: "fit-content",
          backgroundColor: "rgba(255, 255, 255, 1)",
          border: "1px solid lightgray",
          color: "text.darkBlue",
          display: "flex",
          gap: "5px",
          textTransform: "capitalize",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Processing" : "Pay Now"}
      </button>
      {/* Show error message to your customers */}
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
};

export default CheckoutForm;
