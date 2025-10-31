"use client";
import { Button, Container, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { status } from "@/constant/constant";
import { useDispatch, useSelector } from "react-redux";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import ReviewModal from "./ReviewModal";

const OrderDetails = React.memo(({ orderDetailsOpt, setOrderDetails }) => {
  const router = useRouter();

  const [modalOpen, setModalOpen] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [loading, setLoading] = useState({
    reviewLoading: false,
    chatLoading: "",
  });
  const { user } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();

  const redirectToChat = async (id) => {
    setLoading((prev) => ({ ...prev, chatLoading: id }));
    try {
      let { data } = await ApiManager({
        method: "get",
        path: `chat/by-order-id?order_id=${Number(id)}&type=order`,
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
      order_id: serviceId,
      rating: data.rating,
      review: data.review,
    };
    try {
      let { data } = await ApiManager({
        method: "post",
        path: `orders/review`,
        params: params,
      });
      // console.log(data, "service api call");
      dispatch(
        setToast({
          message: "Thank for your review",
          type: "success",
          delay: 2000,
        })
      );
      setOrderDetails((prev) =>
        prev.map((item) => {
          if (item?.id === serviceId) {
            return { ...item, reviews: "fulfilled" };
          }
          return item;
        })
      );
    } catch (error) {
      console.log("Error submitting review:", error);
    } finally {
      setLoading((prev) => ({ ...prev, reviewLoading: false }));
      setModalOpen(false);
    }
  };

  return (
    <Container maxWidth={"lg"} width={"100%"} sx={{ px: "0 !important" }}>
      <Stack gap={6} mb={6} px={0}>
        {orderDetailsOpt?.length > 0 ? (
          orderDetailsOpt?.map((item) => (
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
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: status[item?.status]?.color,
                  }}
                >
                  {status[item?.status]?.label}
                </Button>
              </Stack>
              <Box
                sx={{ flexGrow: 1, width: "100%" }}
                onClick={() => router.push("/order-details/" + item.id)}
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
                          Name
                        </Typography>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          Quantity
                        </Typography>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          Date
                        </Typography>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          Shipping
                        </Typography>
                        {/* <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          Payment Method
                        </Typography> */}
                      </Stack>
                      <Stack gap={1}>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          {item?.order_items[0]?.product?.name}
                        </Typography>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          {item?.order_items[0]?.quantity}
                        </Typography>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          {item?.created_at
                            ? format(new Date(item?.created_at), "dd-MMM-yyyy")
                            : "---"}
                        </Typography>
                        <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          {`${item?.shipping_country} / ${item?.shipping_city}` ||
                            "---"}
                        </Typography>
                        {/* <Typography
                          display={"flex"}
                          alignItems={"center"}
                          gap={2}
                          variant={"p"}
                          fontFamily={"Libre Bodoni"}
                        >
                          {item?.stripe_payment_amount_transfer_response?.source_type?.toUpperCase() ||
                            "---"}
                        </Typography> */}
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
                        src={item?.order_items[0]?.product?.image[0] || []}
                        alt=""
                        width={150}
                        height={150}
                        style={{ cursor: "pointer" }}
                      />
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <Stack
                width={"87.5%"}
                flexDirection={"row"}
                justifyContent={"space-between"}
              >
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
                  {item.price}
                </Typography>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={2}
                  variant={"p"}
                  fontFamily={"Libre Bodoni"}
                  fontSize={20}
                >
                  {item.dateOfDelivery}
                </Typography>
              </Stack>
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
                  ${item.final_amount}
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
                  {item?.status === "delivered" && !item?.reviews?.length && (
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
          ))
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
});

export default OrderDetails;
