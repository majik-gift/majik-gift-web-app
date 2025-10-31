import React, { useState, useEffect } from "react";
import {
  AppleBtn,
  GooglePlayBtn,
  homeScreenMockup,
  PhoneScreen,
  ScanBar,
  splashScreenMockup,
} from "@/assets";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { Android, Apple, PlayArrow } from "@mui/icons-material";

export default function GetStartedToday() {
  const [responsiveWidth, setResponsiveWidth] = useState(450); // Default width

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 600) {
        setResponsiveWidth(155);
      } else if (width < 900) {
        setResponsiveWidth(300);
      } else {
        setResponsiveWidth(450);
      }
    };

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Stack
      bgcolor={"background.primary"}
      sx={{
        maxHeight: 400,
        height: { xs: 200, sm: 300, md: 400 },
        //    border: "2px solid black",
      }}
      marginTop={25}
    >
      <Container maxWidth={"lg"} padding={10} style={{ height: "100%" }}>
        <Stack
          justifyContent={"space-between"}
          direction={"row"}
          position="relative"
          height={"100%"}
        >
          <Stack></Stack>
          <Stack direction={"row"} position={"absolute"} bottom={0}>
            <Image src={PhoneScreen} alt="mockup" width={responsiveWidth} />
          </Stack>
          <Stack justifyContent={"space-evenly"} zIndex={2}>
            <Stack color={"#fff"}>
              <Stack
                display={{ xs: "none", sm: "flex" }}
                direction={"row"}
                alignSelf={"flex-end"}
              >
                <Typography fontFamily={"Lato"} fontWeight={"SemiBold"}>
                  Join our &nbsp;
                </Typography>
                <Typography
                  fontFamily={"Lato"}
                  fontWeight={"Bold"}
                  color="#000"
                >
                  {" "}
                  100+ users
                </Typography>
              </Stack>
              <Typography
                variant={"h4"}
                fontFamily={"Libre Bodomi"}
                fontWeight={"SemiBold"}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Get Started Today
              </Typography>
            </Stack>
            <Stack
              direction={{ xs: "column-reverse", sm: "row" }}
              color={"#fff"}
              gap={{ xs: 1, sm: 2 }}
              justifyContent={{ xs: "center", sm: "flex-end" }}
            >
              <Stack alignItems={{ xs: "center", sm: "flex-end" }}>
                <Stack direction={"row"} gap={0.6}>
                  <Typography color="#000">Scan</Typography>
                  <Typography>to</Typography>
                </Stack>
                <Stack
                  direction={{ xs: "row", sm: "column" }}
                  sx={{ textAlign: "right" }}
                  gap={{ xs: 0.6, sm: 0 }}
                >
                  <Typography>download the</Typography>
                  <Typography>app</Typography>
                </Stack>
              </Stack>

              <>
                <Stack direction="column" spacing={1} alignItems="center">
                  <Box
                    sx={{
                      height: 42,
                      width: "auto",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://apps.apple.com/us/app/majik-gift/id6740135219",
                        "_blank"
                      )
                    }
                  >
                    <Image
                      src={AppleBtn}
                      alt="Download on App Store"
                      style={{
                        height: "100%",
                        width: "auto",
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      height: 57,
                      width: "auto",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      window.open(
                        "https://play.google.com/store/apps/details?id=com.majikgift.app&hl=en&pli=1",
                        "_blank"
                      )
                    }
                  >
                    <Image
                      src={GooglePlayBtn}
                      alt="Get it on Google Play"
                      style={{
                        height: "100%",
                        width: "auto",
                      }}
                    />
                  </Box>
                </Stack>
              </>

              {/* <Stack direction="row" spacing={2}>
                <Box
                  sx={{ maxWidth: 150, maxHeight: 50, position: "relative" }}
                >
                  <Image
                    src={AppleBtn}
                    alt="Download on App Store"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
                <Box
                  sx={{ maxWidth: 150, maxHeight: 50, position: "relative" }}
                >
                  <Image
                    src={GooglePlayBtn}
                    alt="Get it on Google Play"
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </Box>
              </Stack> */}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
