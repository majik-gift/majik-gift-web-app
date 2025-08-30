"use client";
import ApiManager from "@/helper/api-manager";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime);

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const searchParams = useSearchParams();
  const event_id = searchParams.get("event_id");
  const [activities, setActivities] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  async function getGroupActivities() {
    try {
      setLoading(true);
      const { data } = await ApiManager({
        path: `activities`,
        method: "get",
        params: {
          event_id: event_id,
        },
      });
      setActivities(data?.response?.details?.activities?.items || []);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (event_id) {
      getGroupActivities();
    }
  }, [event_id]);

  // Format date with dayjs
  const formatDate = (dateString) => {
    return dayjs(dateString).fromNow();
  };

  // For detailed date when needed
  const detailedDate = (dateString) => {
    return dayjs(dateString).format("MMMM D, YYYY [at] h:mm A");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={6}
      >
        {loading ? (
          <Skeleton variant="text" width={200} height={40} />
        ) : (
          <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Activities
          </Typography>
        )}

        {loading ? (
          <Skeleton variant="rectangular" width={180} height={40} />
        ) : (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => router.push(`/group-activities/${event_id}`)}
          >
            Subscription Details
          </Button>
        )}
      </Stack>

      {loading ? (
        <Grid container spacing={3}>
          {[...Array(8)].map((_, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card sx={{ height: "100%", minHeight: 160 }}>
                <CardContent>
                  <Stack direction="row" spacing={2}>
                    <Skeleton variant="circular" width={48} height={48} />
                    <Stack sx={{ flex: 1 }} gap={1}>
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems={isMobile ? "flex-start" : "center"}
                      >
                        <Skeleton variant="text" width={120} height={24} />
                        <Skeleton variant="text" width={80} height={20} />
                      </Stack>
                      <Skeleton variant="text" width="100%" height={20} />
                      <Skeleton variant="text" width="80%" height={20} />
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : activities.length > 0 ? (
        <Grid container spacing={3}>
          {activities.map((activity) => (
            <Grid item xs={12} sm={6} key={activity.id}>
              <Card
                sx={{
                  height: "100%",
                  minHeight: 160,
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                  boxShadow: 1,
                  "&:hover": {
                    boxShadow: 3,
                  },
                  transition: "box-shadow 0.3s ease",
                  bgcolor: theme.palette.secondary.light,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      src={activity.user?.avatar || ""}
                      alt={activity.user?.full_name || "User"}
                      sx={{ width: 48, height: 48 }}
                    />
                    <Stack sx={{ flex: 1 }}>
                      <Stack
                        direction={isMobile ? "column" : "row"}
                        justifyContent="space-between"
                        alignItems={isMobile ? "flex-start" : "center"}
                        spacing={1}
                      >
                        <Typography
                          variant="subtitle1"
                          component="div"
                          sx={{ fontWeight: 600 }}
                        >
                          {activity.user?.full_name || "Unknown User"}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          title={detailedDate(activity.created_at)}
                        >
                          {formatDate(activity.created_at)}
                        </Typography>
                      </Stack>
                      <Typography variant="body1" sx={{ mt: 1.5 }}>
                        {activity.content}
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card>
          <CardContent>
            <Typography variant="body1" textAlign="center" py={2}>
              No activities found
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Page;