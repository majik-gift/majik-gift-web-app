"use client";
import { useState } from "react";

import { Box, Card, Fab, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";

import {
  FavoriteBorderIcon,
  FavoriteIcon,
  StarRateRoundedIcon,
} from "@/assets";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";

const ProductCard = ({
  item,
  sale = false,
  wishlist = false,
  wishlists,
  type,
  setWishlists,
}) => {
  // console.log(((type === 'service'&& item?.type === 'class') ? '/Monthly' :''))
  const router = useRouter();
  const { user } = useSelector((state) => state.appReducer);

  const [isLike, setIsLike] = useState(wishlist || item?.wishlists?.length);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const isLightWorker = type === "users";

  const handleLike = async () => {
    setLoading(true);
    try {
      let { data } = await ApiManager({
        method: "post",
        path: "wishlists",
        params: { [typesOfCard[type]?.params]: item?.id },
      });
      // dispatch(setToast({ message: data?.message, type: "success" }));
      if (wishlist) {
        // Filter out the product that was just removed from wishlist
        const updatedWishlists = wishlists?.filter(
          (wishlist) => data?.response?.details?.product?.id !== wishlist?.id
        );
        // Update wishlist state with filtered products
        setWishlists((prev) => ({
          ...prev,
          products: updatedWishlists,
        }));
      }
    } catch (error) {
      dispatch(
        setToast({
          message:
            error?.response?.data?.message ||
            error?.message ||
            "Something went wrong",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 3,
        width: "100%",
        aspectRatio: "1 / 1.2", // Adjust ratio as needed (1/1 = square)
        maxWidth: 350,
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
      }}
      onClick={() => router.push(`/${typesOfCard[type]?.path}/${item?.id}`)}
    >
      <Stack
        sx={{ bgcolor: "#9C90C2", position: "relative", flex: "1 1 60%" }}
        alignItems="center"
        justifyContent="center"
      >
        {/* Sale & Like */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            left: 8,
            zIndex: 2,
          }}
        >
          {item?.event_cycle_status === "completed" ? (
            <Typography
              variant="h6"
              bgcolor="secondary.main"
              px={1}
              py={0.3}
              fontFamily="Libre Bodoni"
            >
              Completed
            </Typography>
          ) : (
            <Box />
          )}

          {user?.role !== "guest" && (
            <Fab
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (!wishlist) setIsLike((prev) => !prev);
                handleLike();
              }}
              sx={{ background: "#fff" }}
            >
              {isLike ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon sx={{ color: "black" }} />
              )}
            </Fab>
          )}
        </Stack>

        {/* Product Image */}
        <Image
          src={item?.banner_image || item?.profile_image || ""}
          alt="Product Image"
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
      </Stack>

      {/* Bottom Section */}
      <Stack
        direction="row"
        justifyContent="space-between"
        p={2}
        sx={{ flex: "1 1 40%", cursor: "pointer" }}
      >
        <Stack gap={1} flex={1}>
          <Typography
            variant="h6"
            fontFamily="Lato"
            fontWeight="600"
            sx={{
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              overflow: "hidden",
              textTransform: "capitalize",
            }}
          >
            {item?.name || item?.title || item?.full_name || "--"}
          </Typography>
          <Typography
            variant="body2"
            fontFamily="Lato"
            color="text.secondary"
            sx={{
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              display: "-webkit-box",
              overflow: "hidden",
            }}
          >
            {item?.note || item?.description || "--"}
          </Typography>
          {!isLightWorker && (
            <Typography variant="h6" fontFamily="Lato" fontWeight="600">
              ${item?.total_price ?? "0.00"}{(type === 'service' && item?.type === 'class') ? '/Monthly' : ''}
            </Typography>
          )}
        </Stack>

        <Stack justifyContent="space-between" alignItems="flex-end">
          <Stack direction="row" alignItems="center">
            <StarRateRoundedIcon sx={{ color: "text.ratedStar" }} />
            <Typography variant="body2" fontFamily="Lato" fontWeight="500">
              {item?.rating ?? 0}
            </Typography>
          </Stack>
          {item?.is_on_sale && item?.discounted_price && (
            <Typography
              variant="body2"
              sx={{ textDecoration: "line-through", color: "text.disabled" }}
            >
              ${item?.discounted_price} 
            </Typography>
          )}
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProductCard;

export const typesOfCard = {
  service: { params: "serviceId", path: "services" },
  events: { params: "eventId", path: "events" },
  users: { params: "lightworkerId", path: "light-worker" },
  products: { params: "productId", path: "products" },
};
