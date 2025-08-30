"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowBackIcon } from "@/assets";
import ReviewModal from "./ReviewModal";
import { useDispatch, useSelector } from "react-redux";
import { setLocale } from "yup";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import { delay } from "lodash";
import { status } from "@/constant/constant";
import { format } from "date-fns";

// groupActivities for group activities
// classes for my classes

const SubscriptionDetails = React.memo(
  ({
    title,
    orderDetailsOpt,
    groupActivities = false,
    classes = false,
    setReload,
    setSubscriptions = () => {},
    setGroupActivities = () => {},
  }) => {
    const [detailsPageName, setDetailsPageName] = useState("");
    useEffect(() => {
      if (title == "My Readings") {
        setDetailsPageName("readings"); // service-orders
      } else if (title == "My Subscriptions") {
        setDetailsPageName("subscriptions"); // service-orders
      } else if (title == "My Orders") {
        setDetailsPageName("orders"); // product-orders
      } else if (title == "My Group Activities") {
        setDetailsPageName("group-activities"); // event-ticket-orders
      }
    }, [title]);

    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [serviceId, setServiceId] = useState("");
    const [loading, setLoading] = useState({
      reviewLoading: false,
      subscriptionLoading: false,
      chatLoading: "",
    });
    const { user } = useSelector((state) => state.appReducer);
    const dispatch = useDispatch();

    const handleCancelSubscribe = async (id) => {
      // console.log(id);
      setLoading((prev) => ({ ...prev, subscriptionLoading: true }));
      try {
        let { data } = await ApiManager({
          method: "patch",
          path: `service-orders/${id}/cancel-service-subscription`,
        });
        // console.log("data", data);
        if (data?.status === 200) {
          setSubscriptions((prev) => {
            return prev.map((item) => {
              if (item.id === id) {
                return {
                  ...item,
                  subscription: { ...item.subscription, status: "canceled" },
                };
              }
              return item;
            });
          });
        }
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading((prev) => ({ ...prev, subscriptionLoading: false }));
      }
    };

    const redirectToChat = async (id) => {
      setLoading((prev) => ({ ...prev, chatLoading: id }));
      try {
        let { data } = await ApiManager({
          method: "get",
          path: `chat/by-order-id?order_id=${Number(id)}&type=${
            groupActivities ? "event_order" : "service_order"
          }`,
        });
        // console.log("data", data);
        router.push(`/chat?chatId=${data?.response?.details?.id}`);
      } catch (err) {
        console.log("err", err);
      } finally {
        setLoading((prev) => ({ ...prev, chatLoading: "" }));
      }
    };

    const handleReviewSubmit = async (data) => {
      // console.log("Submitted review:", data);
      setLoading((prev) => ({ ...prev, reviewLoading: true }));
      const params = {
        service_order_id: serviceId,
        rating: data.rating,
        review: data.review,
      };
      const productParams = {
        order_id: serviceId,
        rating: data.rating,
        review: data.review,
      };
      const eventParams = {
        event_ticket_id: serviceId,
        rating: data.rating,
        review: data.review,
      };

      try {
        let { data } = await ApiManager({
          method: "post",
          path:
            detailsPageName === "group-activities"
              ? `event-ticket-orders/review`
              : detailsPageName === "orders"
              ? `orders/review`
              : `service-orders/review`,
          params:
            detailsPageName === "group-activities"
              ? eventParams
              : detailsPageName === "orders"
              ? productParams
              : params,
        });

        setSubscriptions((prev) => {
          return prev.map((item) => {
            if (item?.id === serviceId) {
              return { ...item, reviews: "completed" };
            }
            return item;
          });
        });

        setGroupActivities((prev) => {
          return prev.map((item) => {
            if (item?.id === serviceId) {
              return { ...item, reviews: "fulfilled" };
            }
            return item;
          });
        });

        dispatch(
          setToast({
            message: "Thank for your review",
            type: "success",
            delay: 2000,
          })
        );
        setReload((prev) => !prev);
      } catch (error) {
        console.log("Error submitting review:", error);
      } finally {
        setLoading((prev) => ({ ...prev, reviewLoading: false }));
        setModalOpen(false);
      }
      // You can send this data to your backend here
    };
    console.log(orderDetailsOpt,'orderDetailsOpt')
    return (
      <Container maxWidth={"lg"} width={"100%"}>
        <Stack mt={6} mb={3}>
          <Typography
            display={"flex"}
            alignItems={"center"}
            gap={2}
            variant={"h5"}
            fontFamily={"Libre Bodoni"}
            fontWeight={"SemiBold"}
          >
            <ArrowBackIcon
              style={{ cursor: "pointer" }}
              onClick={() => router.back()}
            />
            {title || "My Subscriptions"}
          </Typography>
        </Stack>
        <Stack gap={6} mb={6}>
          {orderDetailsOpt?.length > 0 ? (
            orderDetailsOpt?.map((item) => {
              return (
                <Stack
                  key={item.id}
                  width={"100%"}
                  gap={3}
                  p={3}
                  border={1}
                  borderColor={"background.primary"}
                  style={{ cursor: "pointer" }}
                >
                  <Stack width={"min-content"}>
                    {classes ? (
                      item?.subscription?.status && (
                        <Button
                          variant="contained"
                          sx={{
                            bgcolor: status[item?.subscription?.status]?.color,
                          }}
                        >
                          {/* item?.subscriptions?.status === "completed"
                    ? "Paid"
                    :  */}
                          {status[item?.subscription?.status]?.label}
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: status[item?.status]?.color,
                        }}
                      >
                        {/* item?.subscriptions?.status === "completed"
                    ? "Paid"
                    :  */}
                        {status[item?.status]?.label}
                      </Button>
                    )}
                  </Stack>
                  <Box
                    sx={{ flexGrow: 1, width: "100%" }}
                    onClick={() =>
                      router.push(
                        detailsPageName === "group-activities"
                          ? `/${detailsPageName}/activities?event_id=${item.id}`
                          : `/${detailsPageName}/` + item.id
                      )
                    }
                  >
                    <Grid
                      container
                      justifyContent={"space-between"}
                      gap={{ xs: 4 }}
                      flexDirection={{ xs: "column-reverse", sm: "row" }}
                    >
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Stack
                          flexDirection={"row"}
                          justifyContent={"space-between"}
                        >
                          <Stack gap={1}>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              Name:
                            </Typography>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              Order Id:
                            </Typography>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              {groupActivities ? "Date:" : "Day:"}
                            </Typography>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              Coupon:
                            </Typography>
                          </Stack>
                          <Stack gap={1} color={"text.darkGrey"}>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              {groupActivities
                                ? item?.event?.title
                                : item?.service?.title || "---"}
                            </Typography>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              #{item?.id || "--"}
                            </Typography>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              {classes && "Every "}
                              {groupActivities
                                ? item?.event?.event_date
                                  ? format(
                                      new Date(item.event.event_date),
                                      "dd MMM, yyyy"
                                    )
                                  : "--"
                                : item?.day?.charAt(0)?.toUpperCase() +
                                    item?.day?.slice(1) || "--"}
                            </Typography>
                            <Typography
                              display={"flex"}
                              alignItems={"center"}
                              gap={2}
                              variant={"p"}
                              fontFamily={"Libre Bodoni"}
                            >
                              {item?.coupon_code || "No"}
                            </Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid size={{ xs: 12, sm: 4 }}>
                        <Stack
                          mt={-2}
                          gap={4}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Image
                            priority
                            src={
                              groupActivities
                                ? item?.event?.image[0]
                                : item?.service?.image[0] || []
                            }
                            alt=""
                            width={150}
                            height={150}
                            style={{ cursor: "pointer" }}
                          />
                        </Stack>
                      </Grid>
                      {/* <Grid size={12}>
                    <Stack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      direction={'row'}
                    >
                      <Typography>${item?.final_amount}</Typography>
                      <Button variant="contained" color="secondary">Add Review</Button>
                    </Stack>
                  </Grid> */}
                    </Grid>
                  </Box>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Typography
                      display={"flex"}
                      alignItems={"center"}
                      gap={2}
                      variant={"p"}
                      fontFamily={"Libre Bodoni"}
                      fontSize={25}
                      fontWeight={"Bold"}
                      color="background.primary"
                    >
                      ${groupActivities ? item?.total_price : item.final_amount}
                    </Typography>
                    <Stack direction={"row"} gap={2}>
                      <Button
                        variant="contained"
                        sx={{ borderRadius: 0 }}
                        color="secondary"
                        loading={loading?.chatLoading === item?.id}
                        onClick={() => {
                          redirectToChat(item?.id);
                        }}
                      >
                        Chat
                      </Button>
                      {classes && item?.subscription?.status === "active" && (
                        <Button
                          variant="contained"
                          sx={{ borderRadius: 0 }}
                          color="secondary"
                          disabled={loading.subscriptionLoading}
                          onClick={() => {
                            handleCancelSubscribe(item?.id);
                          }}
                        >
                          Cancel Subscription
                        </Button>
                      )}

                      {(item?.status === "completed" ||
                        item?.status === "fulfilled") &&
                        item?.reviews?.length === 0 && (
                          <Button
                            variant="contained"
                            sx={{ borderRadius: 0 }}
                            color="secondary"
                            onClick={() => {
                              setModalOpen(true);
                              setServiceId(item?.id);
                            }}
                          >
                            Add Review
                          </Button>
                        )}
                    </Stack>
                  </Stack>
                  {!!item?.reviews?.length && (
                    <Typography color="secondary.main" textAlign={"right"}>
                      You have reviewed this order
                    </Typography>
                  )}{" "}
                </Stack>
              );
            })
          ) : (
            <Typography variant="h5" textAlign={"center"}>
              No Order's Yet!
            </Typography>
          )}
        </Stack>
        {modalOpen && (
          <ReviewModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleReviewSubmit}
            user={user}
            loading={loading.reviewLoading}
          />
        )}
      </Container>
    );
  }
);

export default SubscriptionDetails;
