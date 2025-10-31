import React from "react";
import SkeletonCard from "./ProductCardSkeleton";
import { Grid2, Typography, Box } from "@mui/material";
import Service from "./Service";
import EventCard from "./EventCard";
import ProductCard from "./ProductCard";
import LightWorkerProductCard from "./LightWorkerProductCard";

export default function Wishlistection({
  heading,
  loading,
  data,
  type = "product",
  wishlists,
  setWishlists,
}) {
  const getEmptyMessage = () => {
    switch (type) {
      case "service":
        return "Your Services Wishlist is Empty";
      case "event":
        return "Your Events Wishlist is Empty";
      case "user":
        return "Your LightWorkers Wishlist is Empty";
      default:
        return "Your Products Wishlist is Empty";
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        fontFamily={"Libre Bodoni"}
        fontWeight={"Medium"}
      >
        {heading}
      </Typography>
      <Grid2 container justifyContent={"center"} spacing={{ xs: 4, md: 5 }} mb={5}>
        {loading ? (
          Array(3)
            .fill(null)
            .map((_, key) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                <SkeletonCard />
              </Grid2>
            ))
        ) : data?.length ? (
          data?.map((wishlist, key) => {
            return (
              <Grid2 justifyItems={"center"} size={{ xs: 12, sm: 6, md: 4 }} key={key}>
                {type === "service" ? (
                  <Service
                    wishlist
                    item={wishlist}
                    wishlists={data}
                    setWishlists={setWishlists}
                  />
                ) : type === "event" ? (
                  <EventCard
                    wishlist
                    item={wishlist}
                    wishlists={data}
                    setWishlists={setWishlists}
                  />
                ) : type === "product" ? (
                  <ProductCard
                    wishlist
                    item={wishlist}
                    wishlists={wishlists}
                    setWishlists={setWishlists}
                    type={'products'}
                  />
                ) : (
                  type === "user" && (
                    <LightWorkerProductCard
                      wishlist
                      item={wishlist}
                      wishlists={data}
                      setWishlists={setWishlists}
                    />
                  )
                )}
              </Grid2>
            );
          })
        ) : (
          <Grid2
            container
            size={{ xs: 12 }}
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "200px" }}
          >
            <Box textAlign="center">
              <Typography
                variant="h5"
                color="text.darkGrey"
                sx={{
                  fontFamily: "Libre Bodoni",
                  mb: 2,
                }}
              >
                {getEmptyMessage()}
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: "400px", mx: "auto" }}
              >
                Start adding items to your wishlist to keep track of all the
                things you love!
              </Typography>
            </Box>
          </Grid2>
        )}
      </Grid2>
    </>
  );
}
