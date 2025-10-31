"use client";
import EventCard from "@/app/components/EventCard";
import LightWorkerProductCard from "@/app/components/LightWorkerProductCard";
import ProductCard from "@/app/components/ProductCard";
import SkeletonCard from "@/app/components/ProductCardSkeleton";
import Service from "@/app/components/Service";
import Wishlistection from "@/app/components/WishlistsSection";
import { ArrowBackIcon, FavoriteBorderIcon, IoSearch } from "@/assets";
import ApiManager from "@/helper/api-manager";
import { Star } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Container,
  Grid2,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { set } from "date-fns";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [wishlists, setWishlists] = useState(null);
  const [search, setSearch] = useState("");
  let [loading, setLoading] = useState(true);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [filteredWishlists, setFilteredWishlists] = useState({
    products: [],
    services: [],
    events: [],
    light_workers: [],
  });

  // filter wishlist items
  useEffect(() => {
    if (!wishlists) return;

    const newFilteredWishlists = {
      products: [],
      services: [],
      events: [],
      light_workers: [],
    };

    wishlists.forEach((wishlist) => {
      if (wishlist?.product) {
        newFilteredWishlists.products.push(wishlist.product);
      } else if (wishlist?.service) {
        newFilteredWishlists.services.push(wishlist.service);
      } else if (wishlist?.event) {
        newFilteredWishlists.events.push(wishlist.event);
      } else if (wishlist?.light_worker) {
        newFilteredWishlists.light_workers.push(wishlist.light_worker);
      } else {
          // console.log(
          //   wishlist,
          //   "filter wishlist item did not match any one case"
          // );
      }
    });

    setFilteredWishlists(newFilteredWishlists);
  }, [wishlists]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search || "");
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      setLoading(true);
      getWishlists(debouncedSearch);
    } else {
      getWishlists();
    }
  }, [debouncedSearch]);

   async function getWishlists(debouncedSearch) {
    setLoading(true);
    try {
      let path = `wishlists?registration_status=approved`;
      if (debouncedSearch) {
        path += `&search=${debouncedSearch}`;
      }
      let { data } = await ApiManager({
        method: "get",
        path: path,
      });
      setWishlists(data?.response?.details);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getWishlists();
  }, []);

  return (
    <Container maxWidth={"lg"}>
      <Stack width={"100%"} gap={{ xs: 3, md: 5 }} mt={3}>
        <Stack direction={"row"} alignItems={"center"} gap={1.5}>
          <Link href={"/"}>
            <ArrowBackIcon sx={{ cursor: "pointer" }} />
          </Link>
          <Typography
            variant="h4"
            fontWeight={"Medium"}
            fontFamily={"Libre Bodoni"}
          >
            Wishlist
          </Typography>
        </Stack>
        {/* <Stack direction={"row"} width={"100%"} gap={1}> */}
        {/* <TextField
            label="Search"
            fullWidth
            style={{ borderRadius: 0 }}
            onChange={(e) => setSearch(e.target.value)}
            />
          <Stack
            border={"1px solid black"}
            borderRadius={1.5}
            borderColor={"text.lightGrey"}
            width={50}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <IoSearch style={{ fontSize: "25px" }} />
            </Stack> */}
        {/* </Stack> */}
        <Wishlistection
          heading={"Products"}
          wishlists={filteredWishlists?.products}
          setWishlists={setFilteredWishlists}
          data={filteredWishlists?.products}
          loading={loading}
        />
        <Wishlistection
          heading={"Services"}
          data={filteredWishlists?.services}
          type="service"
          setWishlists={setFilteredWishlists}
          loading={loading}
          />
        <Wishlistection
          heading={"Events"}
          data={filteredWishlists?.events}
          type="event"
          setWishlists={setFilteredWishlists}
          loading={loading}
          />
        <Wishlistection
          heading={"Lightworkers"}
          data={filteredWishlists?.light_workers}
          type="user"
          setWishlists={setFilteredWishlists}
          loading={loading}
          />
      </Stack>
    </Container>
  );
}