"use client";
import ClientComment from "@/app/components/ClientComment";
import StartIconButton from "@/app/components/StartIconButton";
import {
  LuBookText,
  StarBorderPurple500OutlinedIcon,
  StarRateRoundedIcon,
  VolunteerActivismOutlinedIcon,
} from "@/assets";
import { FetchSingleData } from "@/global";
import {
  Box,
  Button,
  Container,
  Grid2,
  IconButton,
  Skeleton,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DetailSectionSlider from "./DetailSectionSlider";
import LogInModal from "./LogInModal";
import { AddAPhoto, Remove, Add, StarRateOutlined } from "@mui/icons-material";
import { setQuantity } from "@/store/reducer";
import ApiManager from "@/helper/api-manager";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TimeSlot from "./TimeSlot";
import DetailSectionLoader from "./DetailSectionLoader";
import Dialog from "./Dialog";
import CustomDialog from "./Dialog";
import Service from "./Service";
import EventCard from "./EventCard";
import ProductCard from "./ProductCard";

export default function DetailSection({
  products = false,
  events = false,
  services = false,
  lightworker = false,
}) {
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // states
  const [open, setOpen] = useState(false);
  const [nonAustralian, setNonAustralian] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userEvents, setUserEvents] = useState(null);
  let { quantity } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [cards, setCards] = useState([]);
  // selectors
  const { user, isLogged } = useSelector((state) => state.appReducer);
  const pathname = usePathname();
  const router = useRouter();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    FetchSingleData(
      lightworker ? pathname?.replace("light-worker", "users") : pathname,
      setData,
      setLoading
    );
  }, []);

  const fullText =
    data?.description?.length > 400 && !expanded
      ? data?.description?.slice(0, 400) + "..."
      : data?.description || "";

  // Split fullText into bullet lines
  const bulletSplitRegex = /\n?[\u2022•]\s+/;
  const allLines = fullText
    ?.split(bulletSplitRegex)
    ?.map((line) => line?.trim())
    ?.filter((line) => line !== "");

  const fetchData = async (id) => {
    try {
      let { data } = await ApiManager({
        method: "get",
        path: `service?userId=${id}&status=active`,
      });
      setCards(data?.response?.details);
    } catch (error) {
      console.log(error, "error while fetching data");
      setCards([]);
    }
  };

  const fetchUserEvents = async (id) => {
    try {
      let { data } = await ApiManager({
        path: `events?search=&perPage=20&page=1&registration_status=approved&status=active&userId[]=${id}`,
        method: "get",
      });
      setUserEvents(data?.response?.details);
    } catch (e) {
      console.log(e, "error: user event fetch function.");
    }
  };

  useEffect(() => {
    if (data !== null) {
      fetchData(data?.id);
      fetchUserEvents(data?.id);
    }
  }, [data]);

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOrder = () => {
    // open model if role is guest
    if (isLogged && user?.role === "guest") return setOpen(!open);

    // redirect to order summary page.
    if (data?.created_by?.country !== "Australia") {
      if (events) {
        setNonAustralian(data?.organizer?.country !== "Australia");
      } else {
        setNonAustralian(data?.created_by?.country !== "Australia");
      }
    }
    if (
      data?.created_by?.country === "Australia" ||
      data?.organizer?.country === "Australia"
    ) {
      router.push(pathname + `/order-summary`);
    }
  };
  useEffect(() => {
    dispatch(setQuantity(quantity));
  }, [quantity]);

  // Render Star Rating
  const RenderStars = (numOfReviews) => {
    return Array(5)
      .fill("null")
      .map((_, i) =>
        i < numOfReviews ? (
          <StarRateRoundedIcon key={i} sx={{ color: "text.ratedStar" }} />
        ) : (
          <StarBorderPurple500OutlinedIcon
            key={i}
            sx={{ color: "text.ratedStar" }}
          />
        )
      );
  };

  return (
    <Container maxWidth={"lg"}>
      {loading ? (
        <DetailSectionLoader />
      ) : (
        <Stack py={5} gap={4}>
          <Grid2
            container
            direction={{ xs: "column", md: "row" }}
            alignItems={"center"}
            gap={4}
            sx={{ bgcolor: "#F5F5F5" }}
            justifyContent={"space-around"}
          >
            <Grid2
              size={{ xs: 10, sm: 8, md: 4 }}
              height={{ xs: 220, sm: 320, md: 330 }}
            >
              {data?.image && data?.banner_image && (
                <DetailSectionSlider
                  images={[...data?.image, data?.banner_image]}
                />
              )}
              {data?.profile_image && (
                <Image
                  src={data?.profile_image}
                  alt={"naah"}
                  width={400}
                  height={400}
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </Grid2>
            <Grid2 size={{ xs: 10, md: 5 }} gap={2} alignItems={"flex-start"}>
              <Typography
                fontFamily={"Libre Bodoni"}
                variant="h3"
                sx={{ textTransform: "capitalize" }}
              >
                {products ? data?.name : data?.title || data?.full_name || "--"}
              </Typography>
              <Stack direction={"row"} gap={1.5}>
                {products ? (
                  <StarRateRoundedIcon sx={{ color: "text.ratedStar" }} />
                ) : lightworker ? (
                  <StarRateOutlined sx={{ color: "text.ratedStar" }} />
                ) : (
                  <Stack direction={"row"} gap={1}>
                    <Typography
                      display={
                        data?.joined_people && data?.joined_people !== 0
                          ? "block"
                          : "none"
                      }
                      variant="body1"
                      fontWeight={"SemiBold"}
                    >
                      {data?.joined_people}
                    </Typography>
                    <Typography
                      display={
                        data?.joined_people && data?.joined_people !== 0
                          ? "block"
                          : "none"
                      }
                      variant="body1"
                    >
                      People are joined
                    </Typography>
                  </Stack>
                )}
                <Stack direction={"row"} gap={1}>
                  {events && <></>}
                  <Typography
                    variant="body1"
                    fontFamily={"Lato"}
                    fontWeight={"SemiBold"}
                  >
                    {data?.rating || 0}
                  </Typography>
                  <Typography
                    variant="body1"
                    fontFamily={"Lato"}
                    color="text.darkGrey"
                  >
                    Reviews({data?.reviews?.length || data?.review?.length || 0}
                    )
                  </Typography>
                </Stack>
              </Stack>
              <Stack maxWidth={{ xs: "100%", md: "500px" }}>
                <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                  {data?.note}
                </Typography>
              </Stack>
              {products && (
                <Stack gap={1}>
                  <Typography variant="h6" fontWeight={"SemiBold"}>
                    Item Specs:
                  </Typography>
                  <Stack
                    direction={"row"}
                    gap={1}
                    maxWidth={{ xs: "100%", md: "500px" }}
                  >
                    <Typography variant="body1" fontWeight={"SemiBold"}>
                      Note:
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.darkGrey"
                      sx={{ wordBreak: "break-word" }}
                    >
                      {data?.note || "--"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="body1" fontWeight={"SemiBold"}>
                      Diameter:
                    </Typography>
                    <Typography variant="body1" color="text.darkGrey">
                      {data?.diameter || "--"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="body1" fontWeight={"SemiBold"}>
                      Height:
                    </Typography>
                    <Typography variant="body1" color="text.darkGrey">
                      {data?.height || "--"}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} gap={1}>
                    <Typography variant="body1" fontWeight={"SemiBold"}>
                      Weight:
                    </Typography>
                    <Typography variant="body1" color="text.darkGrey">
                      {data?.weight || "--"}
                    </Typography>
                  </Stack>
                </Stack>
              )}
              <Stack direction={"row"} alignItems={"center"} gap={6}>
                {!lightworker && (
                  <Typography
                    variant="h4"
                    fontWeight={"SemiBold"}
                    fontFamily={"Libre Bodoni"}
                  >
                    ${data?.total_price || "0.00"}
                  </Typography>
                )}
                {/* {products && (
                  <Typography
                    variant="h5"
                    fontFamily={"Libre Bodoni"}
                    style={{ textDecoration: "line-through" }}
                    color="text.lightGrey"
                  >
                    ${data?.total_price || "0.00"}
                  </Typography>
                )} */}
              </Stack>
              <Stack direction={"row"} gap={2} alignItems={"center"}>
                {products && (
                  <Stack
                    direction={"row"}
                    gap={0.5}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <IconButton
                      onClick={() => {
                        if (quantity > 1) {
                          dispatch(setQuantity(quantity - 1));
                        }
                      }}
                      variant={"outlined"}
                    >
                      <Remove />
                    </IconButton>
                    <Typography variant="h5">{quantity || 0}</Typography>
                    <IconButton
                      onClick={() => {
                        if (quantity < data?.quantity) {
                          dispatch(setQuantity(quantity + 1));
                        }
                      }}
                    >
                      <Add />
                    </IconButton>
                  </Stack>
                )}
                {/* button */}
                {!lightworker && (
                  <StartIconButton
                    onClick={handleOrder}
                    color={"#000"}
                    disabled={
                      events
                        ? data?.alreadyPurchased ||
                          data?.event_cycle_status === "completed"
                        : data?.quantity < quantity || data?.quantity === 0
                    }
                    text={products ? "Order" : "Buy Tickets"}
                  />
                )}
              </Stack>
            </Grid2>
          </Grid2>
          <Stack gap={2}>
            {!lightworker && (
              <Stack gap={2}>
                <Stack gap={2}>
                  <Typography variant="h4" fontWeight={"SemiBold"}>
                    Description
                  </Typography>
                  {/* <Typography>{data?.description || "--"}</Typography> */}
                  <>
                    {allLines?.length > 0 ? (
                      <ul style={{ paddingLeft: "1.2em", margin: 0 }}>
                        {allLines?.map((line, idx) => (
                          <li key={idx}>
                            <Typography>{line}</Typography>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <Typography>--</Typography>
                    )}

                    {fullText?.length > 400 && (
                      <Button
                        size="small"
                        onClick={() => setExpanded((prev) => !prev)}
                        sx={{ mt: 1, textTransform: "none", paddingLeft: 0 }}
                      >
                        {expanded ? "See less" : "See more"}
                      </Button>
                    )}
                  </>
                </Stack>
                {events && (
                  <Stack gap={1}>
                    <Typography variant="h4" fontWeight={"SemiBold"}>
                      Schedule
                    </Typography>
                    <Typography>
                      Date:{" "}
                      {data?.event_date
                        ? dayjs(data?.event_date).format("D MMMM, YYYY")
                        : "--"}
                    </Typography>
                    <Typography>
                      Day:{" "}
                      {data?.event_date
                        ? dayjs(data?.event_date).format("dddd")
                        : "--"}
                    </Typography>
                    <Typography>
                      Time:{" "}
                      {dayjs.unix(data?.start_time).format("hh:mm A") || "--"}
                    </Typography>
                    <Typography>Venue: {data?.venue || "--"}</Typography>
                  </Stack>
                )}
              </Stack>
            )}
            {lightworker && (
              <>
                <Typography variant="h4" fontWeight={"SemiBold"}>
                  Services
                </Typography>
                <Grid2 container spacing={5}>
                  {cards?.length ? (
                    cards?.map((card) => {
                      return (
                        <Grid2
                          size={{ md: 4, sm: 6, xs: 12 }}
                          justifyItems={"center"}
                          key={card?.id}
                        >
                          <Service item={card} />
                        </Grid2>
                      );
                    })
                  ) : (
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      align="center"
                    >
                      No services available for this lightworker yet
                    </Typography>
                  )}
                </Grid2>
              </>
            )}
            {lightworker && (
              <>
                <Typography variant="h4" fontWeight={"SemiBold"}>
                  Group Activities
                </Typography>
                <Grid2 container spacing={5}>
                  {userEvents?.length ? (
                    userEvents?.map((card) => {
                      return (
                        <Grid2
                          size={{ md: 4, sm: 6, xs: 12 }}
                          justifyItems={"center"}
                          key={card?.id}
                        >
                          <ProductCard item={card} />
                        </Grid2>
                      );
                    })
                  ) : (
                    <Typography
                      variant="subtitle1"
                      color="text.secondary"
                      align="center"
                    >
                      No Group Activities available for this lightworker yet.
                    </Typography>
                  )}
                </Grid2>
              </>
            )}
            {/* //*item details */}
            {/* {products && (
              <Stack gap={1}>
                <Typography variant="h6" fontWeight={"SemiBold"}>
                  Item Specs:
                </Typography>
                <Stack
                  direction={"row"}
                  gap={1}
                  maxWidth={{ xs: "100%", md: "500px" }}
                >
                  <Typography variant="body1" fontWeight={"SemiBold"}>
                    Note:
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.darkGrey"
                    sx={{ wordBreak: "break-word" }}
                  >
                    {data?.note || "--"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={1}>
                  <Typography variant="body1" fontWeight={"SemiBold"}>
                    Diameter:
                  </Typography>
                  <Typography variant="body1" color="text.darkGrey">
                    {data?.diameter || "--"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={1}>
                  <Typography variant="body1" fontWeight={"SemiBold"}>
                    Height:
                  </Typography>
                  <Typography variant="body1" color="text.darkGrey">
                    {data?.height || "--"}
                  </Typography>
                </Stack>
                <Stack direction={"row"} gap={1}>
                  <Typography variant="body1" fontWeight={"SemiBold"}>
                    Weight:
                  </Typography>
                  <Typography variant="body1" color="text.darkGrey">
                    {data?.weight || "--"}
                  </Typography>
                </Stack>
              </Stack>
            )} */}
            {/* // *light worker section */}
            {/* {events && <Lightworkers data={data?.invitations} />} */}

            {/* Reviews Section */}
            {!!(data?.reviews?.length || data?.review?.length) && (
              <Stack gap={2}>
                <Typography variant="h4" fontWeight={"SemiBold"}>
                  Reviews
                </Typography>
                {(data?.reviews?.length || data?.review?.length) && (
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack direction={"row"}>
                      {RenderStars(data?.rating || 0)}
                    </Stack>
                    <Stack direction={"row"} alignItems={"center"} gap={0.5}>
                      <Typography variant="h5" fontWeight={"SemiBold"}>
                        {data?.rating || 0}
                      </Typography>
                      <Typography variant="body1" color="text.darkGrey">
                        out of 5
                      </Typography>
                    </Stack>
                  </Stack>
                )}
                <Typography variant="h6" color="text.darkGrey">
                  {data?.reviews?.length || data?.review?.length || "No"} Review{" "}
                  {data?.reviews?.length > 1 ? "s" : ""}
                </Typography>
                <Grid2
                  container
                  spacing={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {data?.reviews?.length || data?.review?.length
                    ? (!showAllReviews
                        ? data?.reviews?.slice(0, 6) ||
                          data?.review?.slice(0, 6)
                        : data?.reviews || data?.review
                      )?.map((ele, index) => {
                        return (
                          <Grid2
                            key={index}
                            size={{ xs: 11, sm: 6, lg: 4 }}
                            justifyItems={"center"}
                          >
                            <ClientComment data={ele} key={ele?.id} />
                          </Grid2>
                        );
                      })
                    : null}
                </Grid2>
                {(data?.reviews?.length ?? data?.review?.length) > 6 && (
                  <Typography
                    alignSelf={"center"}
                    variant="link"
                    sx={{ cursor: "pointer" }}
                    color="background.black"
                    onClick={() => setShowAllReviews(!showAllReviews)}
                  >
                    {showAllReviews ? "Show less reviews" : "Show more reviews"}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      {open && (
        <LogInModal
          TransitionComponent={Transition}
          handleClose={handleClose}
          open={open}
        />
      )}
      {nonAustralian && (
        <CustomDialog
          open={nonAustralian}
          data={data?.created_by?.paypal_connect || data?.paypal_connect}
          setOpen={setNonAustralian}
          handleAgree={() => {
            setNonAustralian(false);
            router.push(pathname + `/order-summary`);
          }}
        />
      )}
    </Container>
  );
}

// light-Workers Component
const Lightworkers = ({ data }) => {
  return (
    <>
      <Typography
        variant="h4"
        fontWeight={"SemiBold"}
        fontFamily={"Libre Bodoni"}
      >
        Lightworkers
      </Typography>
      {!data || data?.length == 0 ? (
        <span>No LightWorkers Found</span>
      ) : (
        <Grid2 container spacing={3}>
          {data?.map((ele) => {
            let {
              user: { full_name, profile_image },
            } = ele;
            return (
              <Grid2
                sx={{
                  padding: "10px",
                  overflow: "hidden",
                  wordWrap: "break-word",
                }}
                size={6}
              >
                <Stack
                  direction={"row"}
                  gap={{ md: 1.5, xs: 0.5 }}
                  alignItems={"center"}
                >
                  {profile_image !== "" && (
                    <Image
                      src={profile_image || null}
                      alt={"naah"}
                      width={40}
                      height={40}
                      style={{ borderRadius: "50%" }}
                    />
                  )}
                  <Typography variant="h6" fontWeight={"Medium"}>
                    {full_name}
                  </Typography>
                </Stack>
              </Grid2>
            );
          })}
        </Grid2>
      )}
    </>
  );
};

function LoaderSkeleton() {
  return Array.from({ length: 9 }).map((ele, index) => (
    <Grid2 size={{ md: 4, sm: 6, xs: 12 }} key={index} justifyItems={"center"}>
      <Box sx={{ pt: 0.5 }} maxWidth={"350px"} width={"100%"}>
        <Skeleton variant="rectangular" width={"100%"} height={300} />
        <Stack
          pt={0.5}
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
        >
          <Skeleton width="90%" />
          <Skeleton variant="circular" width="22px" height="22px" />
        </Stack>
        <Skeleton width="90%" />
        <Skeleton width="90%" />
      </Box>
    </Grid2>
  ));
}
