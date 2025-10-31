import ApiManager from "@/helper/api-manager";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

export default function AddCard({setState}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   
  }, [stripe, elements]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded yet");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      console.error("CardElement not found");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Error creating payment method:", error);
      setError(error.message);
    } else {

      let { data } = await ApiManager({
        path: "cards",
        method: "post",
        params: {
          paymentMethodId: paymentMethod.id,
        },
      });
      setState(false);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          display: "block",
          margin: "0 auto",
          marginTop: "20px",
        }}
        disabled={!stripe}
      >
        {loading ? "Loading..." : "Add Card"}
      </button>
    </form>
  );
}
