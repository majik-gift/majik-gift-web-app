"use client";
import SubscriptionDetails from "@/app/components/SubscriptionDetails";
import ApiManager from "@/helper/api-manager";
import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrderDetailsSkeleton from "../order-details/OrderDetailsSkeleton";

export default function GroupActivities() {
  let [groupActivities, setGroupActivities] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useSelector((state) => state.appReducer);
  useEffect(() => {
    if (!user) {
      return;
    } else {
      (async function () {
        try {
          let { data } = await ApiManager({
            path: `event-ticket-orders?userId[]=${user?.id}`,
          });
          setGroupActivities(data?.response?.details);
        } catch (err) {
          console.log("🚀 ~ err:", err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [user]);

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
          title={"My Group Activities"}
          groupActivities
          orderDetailsOpt={groupActivities}
          setGroupActivities={setGroupActivities}
        />
      )}
    </Stack>
  );
}
