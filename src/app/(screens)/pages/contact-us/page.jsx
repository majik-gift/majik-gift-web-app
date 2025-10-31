"use client";
import {
  Box,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  FaFacebookF,
  InstagramIcon,
  VscSparkleFilled,
  XIcon,
  YouTubeIcon,
} from "@/assets";
import StartIconButton from "@/app/components/StartIconButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { setToast } from "@/store/reducer";
import ApiManager from "@/helper/api-manager";

// Define validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .max(50, "Name must be at most 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  subject: yup
    .string()
    .required("Subject is required")
    .max(50, "Subject must be at most 50 characters"),
  message: yup
    .string()
    .required("Message is required")
    .max(250, "Message must be at most 250 characters"),
});

export default function page() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const dispatch = useDispatch();

  const onSubmit = async (formData) => {
    try {
      const { data } = await ApiManager({
        method: "post",
        path: "contact-us",
        params: {
          ...formData,
        },
      });
      dispatch(setToast({ message: data?.message, type: "success" }));
      reset();
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
    }
  };

  return (
    <Container
      maxWidth={"lg"}
      style={{
        backgroundColor: "#EFEDF5",
        marginTop: "80px",
        marginBottom: "80px",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid2 container spacing={6} py={10}>
          <Grid2
            display={"flex"}
            flexDirection={"column"}
            size={{ xs: 12, md: 6 }}
            gap={{xs:2,md:6}}
          >
            <Typography 
              gap={2} 
              variant="h3" 
              display={"flex"}
              sx={{
                fontSize: {
                  xs: '1.8rem',
                  sm: '2.2rem',
                  md: '2.5rem',
                  lg: '3rem'
                }
              }}
            >
              Get In Touch <VscSparkleFilled />
            </Typography>
            <Stack direction={"row"} gap={{xs:2,md:10}}>
              <Stack gap={{xs:2,md:4}}>
                <Stack gap={{xs:2,md:3}}>
                  <Typography variant="h5" fontWeight={"Medium"}
                    sx={{
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1.1rem',
                        lg: '1.2rem'
                      }
                    }}
                  >
                    Phone
                  </Typography>
                  <Typography variant="h6" fontWeight={"Medium"}
                    sx={{
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1.1rem',
                        lg: '1.2rem'
                      },
                      lineHeight: { 
                        xs: 1.5,
                        sm: 1.6,
                        md: 1.7,
                        lg: 1.8
                      }
                    }}
                  >
                    +61 417 004 284
                  </Typography>
                </Stack>
                <Stack gap={{xs:2,md:3}}>
                  <Typography variant="h5" fontWeight={"Medium"}
                    sx={{
                      fontSize: {
                        xs: '0.9rem',
                        sm: '1rem',
                        md: '1.1rem',
                        lg: '1.2rem'
                      }
                    }}
                  >
                    Follow Us
                  </Typography>
                  <Stack direction={"row"} gap={{xs:1,md:2}}>
                    <Box
                      width={{xs:30,md:35}}
                      height={{xs:30,md:35}}
                      borderRadius={"50%"}
                      bgcolor={"#000"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={1}
                      sx={{ cursor: "pointer" }}
                      component={Link}
                      href="https://www.facebook.com/majikgift"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaFacebookF
                        style={{ color: "#fff", fontSize: "16.5px" }}
                        fontSize="small"
                      />
                    </Box>
                    <Box
                      width={{xs:30,md:35}}
                      height={{xs:30,md:35}}
                      borderRadius={"50%"}
                      bgcolor={"#000"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={1}
                      sx={{ cursor: "pointer" }}
                      component={Link}
                      href="https://www.instagram.com/majik_gift/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramIcon
                        style={{ color: "#fff" }}
                        fontSize="small"
                      />
                    </Box>
                    <Box
                      width={{xs:30,md:35}}
                      height={{xs:30,md:35}}
                      borderRadius={"50%"}
                      bgcolor={"#000"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                      p={1}
                      sx={{ cursor: "pointer" }}
                      component={Link}
                      href="https://www.instagram.com/majik_gift/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <XIcon style={{ color: "#fff" }} fontSize="small" />
                    </Box>
                    <Box
                      width={{xs:30,md:35}}
                      height={{xs:30,md:35}}
                      borderRadius="50%"
                      bgcolor="#000"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      p={1}
                      sx={{ cursor: "pointer" }}
                      component={Link}
                      href="https://www.youtube.com/@donnayoung7512"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <YouTubeIcon style={{ color: "#fff" }} fontSize="small" />
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
              <Stack gap={3}>
                <Typography variant="h5" fontWeight={"Medium"}
                  sx={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem',
                      lg: '1.2rem'
                    }
                  }}
                >
                  Email
                </Typography>
                <Typography
                  variant="h6"
                  style={{ textDecoration: "underline" }}
                  fontWeight={"Medium"}
                  sx={{
                    fontSize: {
                      xs: '0.9rem',
                      sm: '1rem',
                      md: '1.1rem',
                      lg: '1.2rem'
                    }
                  }}
                >
                  <Link
                    href="mailto:Info@majikgift.com"
                    underline="none"
                    color="inherit"
                    style={{ color: "black" }}
                  >
                    Info@majikgift.com
                  </Link>
                </Typography>
              </Stack>
            </Stack>
          </Grid2>
          <Grid2 size={{ xs: 12, md: 6 }}>
            <Stack gap={5}>
              <TextField
                variant="standard"
                label={"Name"}
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                inputProps={{ maxLength: 50 }}
              />
              <TextField
                variant="standard"
                label={"Email Address"}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                variant="standard"
                label={"Subject"}
                {...register("subject")}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
              <Stack gap={1}>
                <TextField
                  variant="standard"
                  label={"Message"}
                  multiline
                  minRows={3}
                  {...register("message")}
                  error={!!errors.message}
                  helperText={errors.message?.message}
                  inputProps={{ maxLength: 250 }}
                />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "text.secondary",
                    textAlign: "right",
                  }}
                >
                  {(watch("message")?.length &&
                    watch("message")?.length + "/250") ||
                    "0/250"}
                </Typography>
              </Stack>
              <StartIconButton
                disabled={isSubmitting}
                text={"Submit"}
                color={"#000"}
                type="submit"
              />
            </Stack>
          </Grid2>
        </Grid2>
      </form>
    </Container>
  );
}
