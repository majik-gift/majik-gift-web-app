import AccordionUsage from "@/app/components/AccordionUsage";
import Categories from "@/app/components/Categories";
import ClientSay from "@/app/components/ClientSay";
import LightWorkerCard from "@/app/components/LightWorkerCard";
import LightWorkerSection from "@/app/components/LightWorkerSection";
import Section from "@/app/components/Section";
import { About, plus } from "@/assets";
import ApiManager from "@/helper/api-manager";
import { Container, Grid2, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function page() {
  return (
    <>
      <Section
        paraHead={"The Spiritual Shop"}
        para1={
          "Receive Messages of Love and Guidance from some of the World's Most Trusted Readers."
        }
        src={About}
        color={"#000"}
      />
      <Stack py={10} bgcolor={"secondary.category"}>
        <Container
          maxWidth={"lg"}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid2 container display={"flex"} alignItems={"center"} spacing={20}>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Stack gap={5} alignItems={"center"}>
                <Image src={plus} alt="plus" />
                <Typography variant="h6" fontFamily={"Lato"}>
                  AWESOME CLIENTS
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Stack gap={5} alignItems={"center"}>
                <Image src={plus} alt="plus" />
                <Typography variant="h6" fontFamily={"Lato"}>
                  LIGHTWORKER
                </Typography>
              </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
              <Stack gap={5} alignItems={"center"}>
                <Image src={plus} alt="plus" />
                <Typography variant="h6" fontFamily={"Lato"}>
                  STALL HOLDERS
                </Typography>
              </Stack>
            </Grid2>
          </Grid2>
        </Container>
      </Stack>
      <LightWorkerSection />
      <ClientSay />
      <AccordionUsage />
    </>
  );
}
