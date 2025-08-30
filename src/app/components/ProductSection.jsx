"use client";
import React, { useState } from "react";

import { Container, Grid2, Skeleton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import StartIconButton from "./StartIconButton";
import { useSelector } from "react-redux";
import { VisibilitySharp } from "@mui/icons-material";
import Link from "next/link";

const ShopSection = () => {
  const [visibleProducts, setVisibleProducts] = useState(9); // Show initial 3 cards
  const { products } = useSelector((state) => state.appReducer);
  const handleViewMore = () => {
    setVisibleProducts((prevVisible) => prevVisible + 3); // Show 3 more cards
  };

  return (
    <Container maxWidth={"lg"}>
      <Stack alignItems={"center"} padding={10} gap={6}>
        <Typography
          textAlign="center"
          fontFamily="Libre Bodoni"
          variant="h3"
          fontWeight="400"
        >
          Our Products
        </Typography>
        <Grid2
          width={"100%"}
          container
          spacing={{ xs: 4, sm: 12 }}
          mt={2}
          justifyContent={"center"}
        >
          {products
            ? products?.slice(0, visibleProducts)?.map((shop, i) => (
              <Grid2
                size={{ xs: 12, sm: 6, md: 4 }}
                key={i}
                sx={{
                  opacity: 0,
                  animation: 'fadeIn 0.2s ease-in forwards',
                  '@keyframes fadeIn': {
                    '0%': { opacity: 0, transform: 'translateY(-20px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' }
                  },
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ position: "relative", color: 'black', textDecoration: 'none' }}
                  component={Link}
                  href={`/products/${shop?.id}`}
                >
                  <Image
                    src={shop.banner_image}
                    width={300}
                    height={250}
                    alt="shop"
                    priority
                    sx={{ width: '100%', height: '100%' }}
                  />
                  <Typography
                    variant="h5"
                    bgcolor="secondary.main"
                    px={2}
                    py={1}
                    sx={{ position: "absolute", bottom: "-20px", mt: 1 }}
                    fontFamily="Libre Bodoni"
                    textAlign={'center'}
                  >
                    {shop.name}
                  </Typography>
                </Stack>
              </Grid2>
            ))
            : Array(9)
              .fill(null)
              .map((_, i) => (
                <Grid2
                  size={{ xs: 12, sm: 6, md: 4 }}
                  key={i}
                  justifyContent={"center"}
                >
                  <Stack
                    alignItems={"center"}
                    style={{ position: "relative" }}
                  >
                    <Skeleton variant="rectangular" width={250} height={250} />
                    <Skeleton
                      variant="rectangular"
                      width={120}
                      height={40}
                      style={{
                        position: "absolute",
                        bottom: "-10px",
                        zIndex: 2,
                      }}
                    />
                  </Stack>
                </Grid2>
              ))}
        </Grid2>
        {visibleProducts < products?.length ? (
          <StartIconButton
            color={"#000"}
            text={"View More"}
            onClick={handleViewMore}
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />
        ) : visibleProducts > 9 && <StartIconButton
          color={"#000"}
          text={"View Less"}
          onClick={() => setVisibleProducts(9)}
          sx={{
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)'
            }
          }}
        />}
      </Stack>
    </Container>
  );
};

export default ShopSection;
