"use client";
import SubscriptionDetails from "@/app/components/SubscriptionDetails";
import ApiManager from "@/helper/api-manager";
import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderDetailsSkeleton from "../order-details/OrderDetailsSkeleton";

export default function Subscriptions() {
  let [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      try {
        let { data } = await ApiManager({ path: "service-orders?type=class" });
        setSubscriptions(data?.response?.details);
      } catch (err) {
        console.log("🚀 ~ err:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // return ;
  return (
    <Stack>
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
                <OrderDetailsSkeleton />
              ))}
          </Stack>
        </Container>
      ) : (
        <SubscriptionDetails
          title={"My Subscriptions"}
          classes
          orderDetailsOpt={subscriptions}
          setSubscriptions={setSubscriptions}
        />
      )}
    </Stack>
  );
}
