"use client";
import SubscriptionDetails from "@/app/components/SubscriptionDetails";
import ApiManager from "@/helper/api-manager";
import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderDetailsSkeleton from "../order-details/OrderDetailsSkeleton";

export default function page() {
  let [subscriptions, setSubscriptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        let { data } = await ApiManager({
          path: "service-orders?type=service",
        });
        setSubscriptions(data?.response?.details);
      } catch (err) {
        console.log("🚀 ~ err:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [reload]);

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
          title={"My Readings"}
          orderDetailsOpt={subscriptions}
          setReload={setReload}
          readings
        />
      )}
    </Stack>
  );
}
