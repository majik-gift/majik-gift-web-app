import { Classess, Events, Healers, Spiritual } from "@/assets";
import { Container, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Categories() {
  return (
    <Stack 
      sx={{
        background: "linear-gradient(135deg, rgba(156, 144, 194, 0.08) 0%, rgba(211, 175, 201, 0.08) 100%)",
        padding: 6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth={"lg"}>
        <Grid2 container spacing={{ xs: 6, md: 12 }}>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              gap={1}
            >
              <Image src={Classess} alt="Classess" />
              <Typography
                fontFamily={"Lato"}
                variant="h6"
                fontWeight={600}
                sx={{
                  color: "#1A1A1A",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#9C90C2",
                  },
                }}
              >
                Classes & Workshops
              </Typography>
              <Typography
                fontFamily={"Lato"}
                color="text.darkGrey"
                variant="body2"
              >
                Find your spiritual path with some of the most trusted teachers
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              gap={1}
            >
              <Image src={Healers} alt="Healers" />
              <Typography
                fontFamily={"Lato"}
                variant="h6"
                fontWeight={600}
                sx={{
                  color: "#1A1A1A",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#9C90C2",
                  },
                }}
              >
                Healers
              </Typography>
              <Typography
                fontFamily={"Lato"}
                color="text.darkGrey"
                variant="body2"
              >
                Receive healings from around the world
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              gap={1}
            >
              <Image src={Spiritual} alt="Spiritual" />
              <Typography
                fontFamily={"Lato"}
                variant="h6"
                fontWeight={600}
                sx={{
                  color: "#1A1A1A",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#9C90C2",
                  },
                }}
              >
                Spiritual shop
              </Typography>
              <Typography
                fontFamily={"Lato"}
                color="text.darkGrey"
                variant="body2"
              >
                From Books you might not find anywhere else, Downloads, Tarot
                Cards, Worry Pets, Art, Musical Instruments and much more
              </Typography>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              textAlign={"center"}
              gap={1}
            >
              <Image src={Events} alt="Workshop" />
              <Typography
                fontFamily={"Lato"}
                variant="h6"
                fontWeight={600}
                sx={{
                  color: "#1A1A1A",
                  transition: "color 0.3s ease",
                  "&:hover": {
                    color: "#9C90C2",
                  },
                }}
              >
                Workshops
              </Typography>
              <Typography
                fontFamily={"Lato"}
                color="text.darkGrey"
                variant="body2"
              >
                Join Shows, Parties, Seminars, Meditations, Classes, Hypnosis
                Groups, Fundraisers, Church Services & Much More
              </Typography>
            </Stack>
          </Grid2>
        </Grid2>
      </Container>
    </Stack>
  );
}
