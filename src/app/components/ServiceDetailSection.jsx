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
  Grid,
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
import { AddAPhoto, Remove, Add } from "@mui/icons-material";
import { setQuantity } from "@/store/reducer";
import ApiManager from "@/helper/api-manager";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import TimeSlot from "./TimeSlot";
import CustomDialog from "./Dialog";

export default function ServiceDetailSection() {
  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  // states
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nonAustralian, setNonAustralian] = useState(false);
  const dispatch = useDispatch();

  const [showAllReviews, setShowAllReviews] = useState(false);
  // selectors
  const { user, isLogged } = useSelector((state) => state.appReducer);
  const pathname = usePathname();

  const id = pathname.split("/");
  const router = useRouter();

  const selectedDay = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  const selectedDayName = data?.time_slots?.map((ele) => selectedDay[ele.day]);
  // console.log("🚀 ~ file: ServiceDetailSection.jsx:71 ~ selectedDayName:", selectedDayName)
  const [selectedDate, setSelectedDate] = useState(dayjs().day(dayjs().day()));

  useEffect(() => {
    if (selectedDayName?.length) {
      setSelectedDate(
        dayjs()?.day(selectedDayName?.[0]).isBefore(dayjs(), "day")
          ? dayjs()?.add(7, "day")?.day(selectedDayName?.[0])
          : dayjs()?.day(selectedDayName?.[0])
      );
    }
  }, [data]);

  useEffect(() => {
    FetchSingleData(`/service/${id[2]}`, setData);
  }, []);

  useEffect(() => {
    getTimeSlots();
  }, [selectedDate]);

  const getTimeSlots = async () => {
    setLoading(true);
    try {
      const { data } = await ApiManager({
        path: `time-slot/app?serviceId=${id[2]}&date=${selectedDate}`,
      });
      setSlots(data?.response?.details);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const handleOrder = () => {
    // open model if role is guest
    if (isLogged && user?.role === "guest") return setOpen(!open);
    // redirect to order summary page.
    if (data?.type === "service" && data?.created_by?.country !== "Australia") {
      setNonAustralian(true);
    } else {
      router.push(
        pathname +
          `/order-summary${selectedSlot && `?slot=${selectedSlot?.id}`}`
      );
    }
    localStorage.setItem(
      "time_slot",
      JSON.stringify({ slot: selectedSlot, date: selectedDate })
    );
  };

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
      <Stack py={5} gap={4}>
        <Stack direction={{ xs: "column", md: "row" }} gap={4}>
          <Stack width={{ xs: "100%", md: "50%" }} height={400}>
            {data?.image && data?.banner_image && (
              <DetailSectionSlider
                images={[...data?.image, data?.banner_image]}
              />
            )}
          </Stack>
          <Stack gap={2} alignItems={"flex-start"}>
            <Typography
              fontFamily={"Libre Bodoni"}
              variant="h3"
              sx={{ textTransform: "capitalize" }}
            >
              {data?.title}
            </Typography>
            <Stack direction={"row"} gap={1.5}>
              {data?.joined_people && data?.joined_people !== 0 && (
                <Stack direction={"row"} gap={1}>
                  <Typography variant="body1" fontWeight={"SemiBold"}>
                    {data?.joined_people}
                  </Typography>
                  <Typography variant="body1">People are joined</Typography>
                </Stack>
              )}

              <Stack direction={"row"} gap={1}>
                <Typography
                  variant="body1"
                  fontFamily={"Lato"}
                  fontWeight={"SemiBold"}
                >
                  {!!data?.rating && data?.rating}
                </Typography>
                <Typography
                  variant="body1"
                  fontFamily={"Lato"}
                  color="text.darkGrey"
                >
                  Reviews({data?.reviews?.length || 0})
                </Typography>
              </Stack>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={6}>
              <Typography
                variant="h4"
                fontWeight={"SemiBold"}
                fontFamily={"Libre Bodoni"}
              >
                ${data?.total_price}
              </Typography>
            </Stack>

            <Stack direction={"row"} gap={2} alignItems={"center"}>
              <DatePicker
                label="Select Date"
                value={selectedDate}
                minDate={dayjs()}
                onChange={(date) => setSelectedDate(date)}
                views={["day"]}
                openTo="day"
                disableOpenPicker={false}
                format="DD/MMMM/YYYY"
                shouldDisableDate={(date) =>
                  !selectedDayName?.includes(date.day())
                } // 1=Monday, 2=Tuesday, 3=Wednesday
                slotProps={{
                  textField: {
                    error: false, // Prevent red border by setting error to false
                  },
                }}
              />
            </Stack>
            <Stack gap={1}>
              <Typography variant="h6" fontWeight={"SemiBold"}>
                Time Slots
              </Typography>
              {loading ? (
                <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                  {Array(2)
                    .fill()
                    .map((_, i) => {
                      return <TimeSlot loading={loading} key={i} />;
                    })}
                </Stack>
              ) : slots?.length ? (
                <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                  {slots?.map((slot, i) => (
                    <TimeSlot
                      slot={slot}
                      key={i}
                      onClick={() => setSelectedSlot(slot)}
                      selectedSlot={selectedSlot}
                    />
                  ))}
                </Stack>
              ) : (
                <Typography variant="body1">No Slots Available</Typography>
              )}
            </Stack>
            <StartIconButton
              disabled={!selectedSlot || selectedSlot?.booked}
              onClick={handleOrder}
              color={"#000"}
              text={"Order"}
            />
          </Stack>
        </Stack>
        <Stack gap={2}>
          {/* <Stack gap={1}>
            <Typography variant="h6" fontWeight={"SemiBold"}>
              Time Slots
            </Typography>
            {loading ? (
              <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                {Array(3)
                  .fill()
                  .map((_, i) => {
                    return <TimeSlot loading={loading} key={i} />;
                  })}
              </Stack>
            ) : slots?.length ? (
              <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
                {slots?.map((slot, i) => (
                  <TimeSlot
                    slot={slot}
                    key={i}
                    onClick={() => setSelectedSlot(slot)}
                    selectedSlot={selectedSlot}
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body1">No Slots Available</Typography>
            )}
          </Stack> */}
          <Typography variant="h4" fontWeight={"SemiBold"}>
            Description
          </Typography>
          <Typography>{data?.description}</Typography>
          {/* //*item details */}

          {/* <Stack gap={2}>
            <Typography
              variant="h4"
              fontWeight={"SemiBold"}
              fontFamily={"Libre Bodoni"}
            >
              Services
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
              <Box
                width={35}
                height={35}
                borderRadius={"50%"}
                bgcolor={"secondary.main"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                p={1}
              >
                <LuBookText />
              </Box>
              <Typography fontFamily={"Lato"}>Email Reading</Typography>
            </Stack>
            <Stack direction={"row"} alignItems={"center"} gap={1.5}>
              <Box
                width={35}
                height={35}
                borderRadius={"50%"}
                bgcolor={"secondary.main"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                p={1}
              >
                <VolunteerActivismOutlinedIcon />
              </Box>
              <Typography fontFamily={"Lato"}>Healing</Typography>
            </Stack>
          </Stack> */}
          {/* Reviews Section */}
          <Stack gap={2}>
            <Typography variant="h4" fontWeight={"SemiBold"}>
              Reviews
            </Typography>
            {!!data?.reviews?.length && (
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
              {data?.reviews?.length || "No"} Reviews
            </Typography>
            <Grid container spacing={4}>
              {data?.review || data?.reviews?.length
                ? (!showAllReviews
                    ? data?.reviews?.slice(0, 2)
                    : data?.reviews
                  ).map((ele) => {
                    return (
                      <Grid item xs={12} sm={6} md={6} key={ele?.id}>
                        <ClientComment data={ele} />
                      </Grid>
                    );
                  })
                : null}
            </Grid>
            {data?.reviews?.length > 2 && (
              <Typography
                alignSelf={"center"}
                variant="link"
                sx={{ cursor: "pointer" }}
                color="background.black"
                onClick={() => setShowAllReviews(!showAllReviews)}
              >
                Show All Reviews
              </Typography>
            )}
          </Stack>
        </Stack>
      </Stack>

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
            router.push(
              pathname +
                `/order-summary${selectedSlot && `?slot=${selectedSlot?.id}`}`
            );
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

const TimeSlotSkeleton = () => {
  return (
    <Grid2 container spacing={1}>
      {Array(5)
        .fill()
        ?.map((_, i) => (
          <Grid2 item size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={i}>
            <Skeleton style={{ height: 100, width: "100%" }} />
          </Grid2>
        ))}
    </Grid2>
  );
};
