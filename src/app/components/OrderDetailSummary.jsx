"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBackIcon, FileUploadOutlinedIcon, LuBox, Ziczak } from "@/assets";
import Image from "next/image";
import Detail from "@/app/components/Detail";
import Link from "next/link";
import ApiManager from "@/helper/api-manager";
import { useParams, useRouter } from "next/navigation";
import { status } from "@/constant/constant";

//  readings , subscriptions , group activities ,
export default function OrderDetailSummary({ from }) {
  const [subscription, setSubscription] = useState({});
  const { id } = useParams();
  const router = useRouter();
  const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  async function getOrderDetails() {
    const path = {
      readings: `service-orders/${id}`,
      service: `service-orders/${id} `,
      groupActivities: `event-ticket-orders/${id}`,
      subscriptions: `service-orders/${id}`,
    };
    try {
      const { data } = await ApiManager({
        path: path[from == "group activities" ? "groupActivities" : from],
        method: "get",
      });
      setSubscription(data?.response?.details);
    } catch (error) {
      console.log("🚀 ~ getOrderDetails ~ error:", error);
    }
  }

  useEffect(() => {
    getOrderDetails();
  }, [id]);

  

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString("en-US", options) : "--";
  };

  const capitalizeFirst = (str) => {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : "--";
  };

  const capitalizeAllWords = (str) => {
    if (!str) return "--";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Container maxWidth="lg" sx={{ paddingBottom: "30px" }}>
      <Stack gap={4}>
        <Stack
          mt={4}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            display="flex"
            alignItems="center"
            gap={2}
            variant="h5"
            fontFamily="Libre Bodoni"
            fontWeight="SemiBold"
          >
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={() => router.back()}
            />
            {capitalizeAllWords(from)} Details
          </Typography>
          <FileUploadOutlinedIcon style={{ cursor: "pointer" }} />
        </Stack>

        <Stack
          bgcolor={status[subscription?.status]?.color}
          padding={4}
          color="white"
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
        >
          <Stack>
            <Typography
              display="flex"
              alignItems="center"
              gap={2}
              variant="h5"
              fontFamily="Libre Bodoni"
              fontWeight="SemiBold"
            >
              {status[subscription?.status]?.label}
            </Typography>
            <Typography
              display="flex"
              alignItems="center"
              gap={2}
              variant="body1"
              fontFamily="Libre Bodoni"
            >
              {formatDate(subscription?.updated_at)}
            </Typography>
          </Stack>
          {/* SVG remains unchanged */}
          <svg
            style={{ marginTop: -30, marginRight: -15 }}
            width="45"
            height="58"
            viewBox="0 0 45 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M32.1429 16.1029C23.5216 16.6228 16.6227 23.5219 16.1028 32.1429H16.0398C15.5199 23.5219 8.62099 16.6228 0 16.1029V16.04C8.62099 15.52 15.5199 8.62124 16.0398 0H16.1028C16.6227 8.62124 23.5216 15.52 32.1429 16.04V16.1029Z"
              fill="white"
            />
            <path
              d="M45.0003 49.3031C40.4023 49.5803 36.7229 53.2598 36.4456 57.8577H36.412C36.1347 53.2598 32.4553 49.5803 27.8574 49.3031V49.2695C32.4553 48.9922 36.1347 45.3128 36.412 40.7148H36.4456C36.7229 45.3128 40.4023 48.9922 45.0003 49.2695V49.3031Z"
              fill="white"
            />
          </svg>
        </Stack>

        {/* Details Section */}
        <Stack
          padding={2}
          gap={1}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          width="100%"
          border={0.3}
          borderColor="gray"
        >
          <Stack direction="row" alignItems="center" gap={2}>
            <LuBox size={30} />
            <Typography variant="h6" fontWeight="SemiBold">
              Details
            </Typography>
          </Stack>
          <Stack width="100%" direction="row" justifyContent="space-between">
            <Stack gap={1}>
              <Typography variant="h6">Title:</Typography>
              <Typography variant="body1" fontSize={17}>
                Created By:
              </Typography>
              <Typography variant="body1" fontSize={17}>
                Purchased At:
              </Typography>
              <Typography variant="body1" fontSize={17}>
                {from === "group activities" ? "Booking Date:" : "Booking Day:"}
              </Typography>
            </Stack>
            <Stack gap={1}>
              <Typography variant="h6" color="gray">
                {from === "group activities"
                  ? subscription?.event?.title
                  : subscription?.service?.title || "--"}
              </Typography>
              <Typography variant="body1" color="gray" fontSize={17}>
                {from === "group activities"
                  ? subscription?.event?.organizer?.full_name || ""
                  : `${subscription?.service?.created_by?.first_name || ""} ${
                      subscription?.service?.created_by?.last_name || ""
                    }` || "---"}
              </Typography>
              <Typography variant="body1" color="gray" fontSize={17}>
                {formatDate(subscription?.created_at)}
              </Typography>
              <Typography variant="body1" color="gray" fontSize={17}>
                {from === "group activities"
                  ? subscription?.event?.event_date
                  : capitalizeFirst(subscription?.day)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {/* Financial Details Section */}
        <Stack gap={1} position="relative" width="100%">
          <Image
            src={Ziczak || null}
            priority
            alt="Background"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: -1,
              width: "100%",
              height: "300px",
              objectFit: "cover",
            }}
          />
          <Stack padding={3} gap={2} width="100%" marginBottom={10}>
            <Stack width="100%" gap={1}>
              <Detail
                title="Applied Coupon:"
                value={subscription?.coupon_code || "No"}
              />
              <Detail
                title="Tip Amount:"
                value={`$${subscription?.tip_amounts ?? "0"}`}
              />
              <Detail
                title="Refund Amount:"
                value={`$${subscription?.refund_amount ?? "0"}`}
              />
              <Detail
                title="Discount Amount:"
                value={`$${subscription?.discount_amount ?? "0"}`}
              />
              <Detail
                title="Discount Percentage:"
                value={`${subscription?.discount_percentage ?? "0"}%`}
              />
              <Detail
                title="Total Price:"
                value={`$${
                  subscription?.total_price ||
                  subscription?.service?.total_price ||
                  "0"
                }`}
              />
            </Stack>
          </Stack>
        </Stack>

        {/* Invoices Section */}
        {from === "subscriptions" && (
          <Stack gap={1} width="100%">
            <Typography variant="h5" fontWeight="SemiBold">
              Invoices
            </Typography>
            <Paper
              sx={{
                padding: "20px",
                border: "0.5px solid lightgray",
                display: "flex",
                gap: 1.5,
                flexDirection: "column",
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6" fontWeight="SemiBold">
                  Invoice #{subscription?.subscription?.invoices[0]?.id || "0"}
                </Typography>
                <Link
                  href={
                    subscription?.subscription?.invoices[0]?.stripe_invoice
                      ?.invoice_pdf || "#"
                  }
                  download
                >
                  <Button variant="contained" color="secondary">
                    Download Invoice
                  </Button>
                </Link>
              </Stack>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body1" fontSize={17}>
                  Status
                </Typography>
                <Chip
                  color={color({
                    status: subscription?.subscription?.invoices[0]?.status,
                  })}
                  label={capitalizeFirst(
                    subscription?.subscription?.invoices[0]?.status
                  )}
                />
              </Stack>
              <Detail
                title="Payment Date"
                value={formatDate(
                  subscription?.subscription?.invoices[0]?.created_at
                )}
              />
              <Detail
                title="Amount Due"
                value={`$${
                  subscription?.subscription?.invoices[0]?.amount_due ?? "0"
                }`}
              />
              <Detail
                title="Amount Paid"
                value={`$${
                  subscription?.subscription?.invoices[0]?.amount_paid ?? "0"
                }`}
              />
            </Paper>
          </Stack>
        )}
      </Stack>
    </Container>
  );
}

function color({ status }) {
  if (status === "paid") return "success";
  else if (status === "pending") return "info";
  else if (status === "delivered") return "success";
  else if (status === "completed") return "success";
  else if (status === "cancelled") return "error";
  else return "";
}
