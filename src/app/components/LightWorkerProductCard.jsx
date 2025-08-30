"use client";
import { useState } from "react";

import { Card, IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";

import {
  avatar,
  FavoriteBorderIcon,
  FavoriteIcon,
  StarRateRoundedIcon,
} from "@/assets";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";

export default function LightWorkerProductCard({
  item,
  sale = false,
  wishlist,
  wishlists,
  setWishlists,
}) {
  const router = useRouter();
  const { user } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(wishlist || item?.wishlists?.length);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    setLoading(true);
    try {
      let { data } = await ApiManager({
        method: "post",
        path: "wishlists",
        params: { lightworkerId: item?.id },
      });

      if (wishlist) {
        // Filter out the product that was just removed from wishlist
        const updatedWishlists = wishlists?.filter(
          (wishlist) =>
            data?.response?.details?.light_worker?.id !== wishlist?.id
        );
        // Update wishlist state with filtered products
        setWishlists((prev) => ({
          ...prev,
          light_workers: updatedWishlists,
        }));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card
      sx={{
        borderRadius: 0,
        maxWidth: "350px",
        width: "100%",
        maxHeight: "410px",
        padding: "10px",
        // boxShadow: "0 0px 5px rgba(129, 129, 129, 0.5)",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Stack
        sx={{
          bgcolor: "#9C90C2",
        }}
        alignItems={"center"}
      >
        <Stack
          gap={1}
          width={"100%"}
          justifyContent={"center"}
          textAlign={"center"}
          alignItems={"center"}
          marginTop={1}
          px={2}
          marginBottom={2}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            mt={1}
            width={"100%"}
          >
            {item?.is_on_sale ? (
              <Typography
                variant="h5"
                bgcolor="secondary.main"
                px={1}
                py={0.3}
                fontFamily="Libre Bodoni"
              >
                Sale
              </Typography>
            ) : (
              <Stack></Stack>
            )}

            {user?.role !== "guest" && (
              <IconButton
                sx={{ zIndex: 2 }}
                onClick={() => {
                  if (!wishlist) {
                    setIsLike((prev) => !prev);
                  }
                  handleLike();
                }}
                style={{ background: "#fff", alignSelf: "flex-end" }}
              >
                {isLike ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon sx={{ color: "black" }} />
                )}
              </IconButton>
            )}
          </Stack>
          <Stack
            sx={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/light-worker/${item?.id}`);
            }}
            p={2}
          >
            <Image
              src={item?.profile_image || avatar}
              alt={item?.full_name || "--"}
              width={150}
              height={150}
            />
          </Stack>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        py={2}
        justifyContent={"space-between"}
        sx={{ cursor: "pointer" }}
        onClick={() => {
          router.push(`/light-worker/${item?.id}`);
        }}
      >
        <Stack gap={1}>
          <Typography
            variant="h5"
            fontFamily={"Lato"}
            fontWeight={"SemiBold"}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "balance",
            }}
          >
            {item?.full_name || "--"}
          </Typography>
          <Typography
            variant="body1"
            fontWeight={"Regular"}
            color="text.dim"
            fontFamily={"Lato"}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "balance",
            }}
          >
            {item?.note || "--"}
          </Typography>
          {/* <Typography
            variant="h5"
            fontFamily={"Lato"}
            fontWeight={"SemiBold"}
          >{`$${item?.price ?? "0.00"} `}</Typography> */}
        </Stack>
        <Stack justifyContent={"space-between"} alignItems={"flex-end"}>
          <Stack direction={"row"}>
            <StarRateRoundedIcon sx={{ color: "text.ratedStar" }} />
            <Typography
              variant="body1"
              fontFamily={"Lato"}
              fontWeight={"Medium"}
            >
              {item?.rating ?? 0}
            </Typography>
          </Stack>
          {/* {item?.is_on_sale && item?.discounted_price ? (
            <Typography
              variant="h5"
              fontFamily={"Lato"}
              style={{ textDecoration: "line-through" }}
              color="text.lightGrey"
            >
              {item?.discounted_price ?? 0.0}
            </Typography>
          ) : (
            <Stack></Stack>
          )} */}
        </Stack>
      </Stack>
    </Card>
  );
}
