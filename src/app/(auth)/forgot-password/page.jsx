"use client";
import { Forgotpassword } from "@/assets";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

export const schemaForgetPassword = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});

export default function page() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    control,
    watch,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
    },
    resolver: yupResolver(schemaForgetPassword),
  });

  const handleForgetPassword = async (fd) => {
    // console.log(fd);
    try {
      let { data } = await ApiManager({method:"post",path: "auth/forget-password", 
        params:{...fd},
      });
      // console.log(data);
      if (data.status == 201) {
        dispatch(setToast({ message: data?.message, type: "success" }));
        localStorage.setItem("email", fd.email);
        localStorage.setItem("otpRequested", "true");
        // Store new timer start time
        localStorage.setItem("otpTimerStart", Date.now().toString());
        router.push("/otp-verification");
      }
    } catch (error) {
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
      console.log(error);
    }
  };

  return (
    <Container
      maxWidth={"lg"}
      style={{
        backgroundColor: "#EFEDF5",
        marginTop: "120px",
        marginBottom: "80px",
      }}
    >
      <Stack alignItems={"center"} py={{ xs: 5, md: 10 }}>
        <Image src={Forgotpassword} alt="forgot password" />
        <Stack
          gap={{ xs: 3, md: 6 }}
          component={"form"}
          onSubmit={handleSubmit(handleForgetPassword)}
        >
          <Stack textAlign={"center"} alignItems={"center"} gap={3}>
            <Typography
              variant="h3"
              display={"flex"}
              justifyContent={"center"}
              fontFamily={"Libre_Bodoni"}
              gap={1}
            >
              Forgot Password?
            </Typography>
            <Typography
              width={{ xs: "80%", sm: "70%", md: "60%" }}
              variant="body1"
              fontWeight={"Regular"}
              fontFamily={"lato"}
            >
              Locked out of your account? Regain access hassle-free with a
              password reset.
            </Typography>
          </Stack>
          <TextField
            label={"Email Address"}
            placeholder="Enter Email Address"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button variant={"contained"} type="submit" disabled={isSubmitting}>
            Send Code
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
