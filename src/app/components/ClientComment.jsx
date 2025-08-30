"use client";
import {
  avatar,
  Naah,
  StarBorderPurple500OutlinedIcon,
  StarOutlineRoundedIcon,
  StarRateRoundedIcon,
} from "@/assets";
import { StarOutline } from "@mui/icons-material";
import { Avatar, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";

export default function ClientComment({ data }) {
  const rate = 5;
  const [imgSrc, setImgSrc] = useState(data?.user?.profile_image || avatar);
  return (
    <Stack
      border={"1px solid black"}
      gap={{ xs: 0.5, sm: 1, md: 2 }}
      padding={{ xs: 1, md: 2 }}
      minWidth={"fit-content"}
      width={"100%"}
      overflow={"hidden"}
    >
      <Stack direction={"row"} gap={2}>
        <Avatar
          src={imgSrc}
          alt={data?.user?.full_name}
          sx={{
            width: {
              xs: "30px",
              sm: "35px",
              md: "40px",
              lg: "45px",
            },
            height: {
              xs: "30px",
              sm: "35px",
              md: "40px",
              lg: "45px",
            },
          }}
        />
        <Stack>
          <Stack direction={"row"}>
            {Array(parseInt(data?.rating) || 0)
              .fill(null)
              .map((_, key) => (
                <StarRateRoundedIcon
                  key={key}
                  sx={{ color: "text.ratedStar", fontSize: "18px" }}
                />
              ))}
            {Array(rate - (parseInt(data?.rating) || 0))
              .fill(null)
              .map((_, key) => (
                <StarBorderPurple500OutlinedIcon
                  key={key}
                  sx={{ color: "text.ratedStar", fontSize: "18px" }}
                />
              ))}
          </Stack>
          <Typography
            fontFamily={"Lato"}
            sx={{
              fontSize: {
                xs: "0.7rem",
                sm: "0.8rem",
                md: "0.9rem",
                lg: "1rem",
              },
              fontWeight: 600,
            }}
          >
            {data?.user?.full_name}
          </Typography>
        </Stack>
      </Stack>
      <Typography
        minHeight={"130px"}
        maxHeight={"130px"}
        fontFamily={"Lato"}
        variant="body1"
        style={{
          typography: { xs: "body1", md: "h6" },
        }}
        sx={{
          fontSize: {
            xs: "0.7rem",
            sm: "0.8rem",
            md: "0.9rem",
            lg: "1rem",
          },
          display: "-webkit-box",
          WebkitLineClamp: { xs: 4, sm: 5, md: 6, lg: 7 },
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          overflowY: "scroll",
          overflowX: "hidden",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data?.review}
      </Typography>
    </Stack>
  );
}
