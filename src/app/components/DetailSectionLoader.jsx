import React from "react";
import { Container, Stack, Skeleton, Typography } from "@mui/material";

const DetailSectionLoader = () => {
  return (
    <Stack py={5} gap={4} width={"100%"}>
      <Stack direction={{ xs: "column", md: "row" }} gap={4} width={"100%"}>
        <Stack width={{ xs: "100%", md: "50%" }} height={400}>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </Stack>
        <Stack gap={2} alignItems="flex-start" width="100%">
          <Skeleton variant="text" width="60%" height={40} />
          <Stack direction="row" gap={1.5}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </Stack>
          <Stack gap={1} width="100%">
            <Skeleton variant="text" width="30%" height={30} />
            <Stack direction="row" gap={1}>
              <Skeleton variant="text" width="20%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Stack>
            <Stack direction="row" gap={1}>
              <Skeleton variant="text" width="20%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Stack>
            <Stack direction="row" gap={1}>
              <Skeleton variant="text" width="20%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Stack>
            <Stack direction="row" gap={1}>
              <Skeleton variant="text" width="20%" height={24} />
              <Skeleton variant="text" width="40%" height={24} />
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" gap={6} width={"100%"}>
            <Skeleton variant="text" width="20%" height={40} />
            <Skeleton variant="text" width="20%" height={40} />
          </Stack>
          <Stack direction="row" gap={2} alignItems="center">
            <Stack direction="row" gap={2} alignItems="center">
              <Skeleton variant="circular" width={40} height={40} />
              {/* <Skeleton variant="text" width={40} height={40} /> */}
              <Skeleton variant="circular" width={40} height={40} />
            </Stack>
            <Skeleton variant="rectangular" width={100} height={40} />
          </Stack>
        </Stack>
      </Stack>
      <Stack gap={2}>
        <Skeleton variant="text" width="30%" height={40} />
        <Skeleton variant="text" width="100%" height={100} />
        <Stack gap={1}>
          <Skeleton variant="text" width="20%" height={30} />
          <Stack direction="row" gap={1}>
            <Skeleton variant="text" width="20%" height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>
          <Stack direction="row" gap={1}>
            <Skeleton variant="text" width="20%" height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>
          <Stack direction="row" gap={1}>
            <Skeleton variant="text" width="20%" height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>
          <Stack direction="row" gap={1}>
            <Skeleton variant="text" width="20%" height={24} />
            <Skeleton variant="text" width="40%" height={24} />
          </Stack>
        </Stack>
        <Stack gap={2}>
          <Skeleton variant="text" width="30%" height={40} />
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" gap={1}>
              {[...Array(5)].map((_, index) => (
                <Skeleton
                  key={index}
                  variant="circular"
                  width={24}
                  height={24}
                />
              ))}
            </Stack>
            <Stack direction="row" alignItems="center" gap={0.5}>
              <Skeleton variant="text" width={60} height={40} />
              <Skeleton variant="text" width={60} height={24} />
            </Stack>
          </Stack>
          <Skeleton variant="text" width="20%" height={24} />
          <Stack direction={{ xs: "column", sm: "row" }} gap={4}>
            {[...Array(2)].map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width="100%"
                height={100}
              />
            ))}
          </Stack>
          <Stack justifyContent={'center'}>
            <Skeleton variant="text" width="20%" height={24} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DetailSectionLoader;
