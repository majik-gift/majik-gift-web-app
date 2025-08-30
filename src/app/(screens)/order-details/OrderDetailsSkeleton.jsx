"use client";
import { Button, Container, Stack, Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";

const OrderDetailsSkeleton = () => {
  return (
    <Container maxWidth={"lg"} width={"100%"}>
      {/* Heading Skeleton - Left Aligned */}
      <Box sx={{ mb: 4, textAlign: 'left' }}>
        <Skeleton 
          variant="text" 
          width={200} 
          height={50} 
          sx={{ fontSize: '2rem' }} 
        />
      </Box>

      <Stack gap={6} mb={6}>
        {[1, 2, 3].map((item) => (
          <Stack
            key={item}
            width={"100%"}
            gap={3}
            p={3}
            border={1}
            borderColor={"background.primary"}
          >
            {/* Status Button Skeleton */}
            <Stack width={"min-content"}>
              <Skeleton variant="rounded" width={120} height={36} />
            </Stack>

            {/* Main Content Grid */}
            <Box sx={{ flexGrow: 1, width: "100%" }}>
              <Grid
                container
                justifyContent={"space-between"}
                gap={{ xs: 4 }}
                flexDirection={{ xs: "column-reverse", sm: "row" }}
              >
                {/* Left Column - Order Details */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Stack flexDirection={"row"} justifyContent={"space-between"}>
                    <Stack gap={1}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} width={100} height={24} />
                      ))}
                    </Stack>
                    <Stack gap={1}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} width={150} height={24} />
                      ))}
                    </Stack>
                  </Stack>
                </Grid>

                {/* Right Column - Product Image */}
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Stack
                    mt={-2}
                    gap={4}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Skeleton variant="rectangular" width={150} height={150} />
                  </Stack>
                </Grid>
              </Grid>
            </Box>

            {/* Price and Delivery Date */}
            <Stack
              width={"87.5%"}
              flexDirection={"row"}
              justifyContent={"space-between"}
            >
              <Skeleton width={100} height={36} />
              <Skeleton width={120} height={30} />
            </Stack>

            {/* Final Amount and Buttons */}
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Skeleton width={100} height={36} />
              <Stack direction={"row"} gap={2}>
                <Skeleton variant="rounded" width={80} height={36} />
                <Skeleton variant="rounded" width={100} height={36} />
              </Stack>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Container>
  );
};

export default OrderDetailsSkeleton;