"use client";
import React, { useEffect, useState } from "react";
import { Forgotpassword, optVerify } from "@/assets";
import { Button, Container, Stack, TextField, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import * as Yup from "yup";

export const schemaotp = Yup.object().shape({
  otp: Yup.string()
    .required("OTP is required")
    .max(6, "OTP must be exactly 6 digits"),
});

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(null); // 120 seconds
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Check if otp was requested
      const otpRequested = localStorage.getItem("otpRequested");

      if (!otpRequested) {
        // Redirect to forgot password if accessed manually
        // router.replace("/forget-password");
        // return;
      }

      // Get stored timer start time
      const storedStartTime = localStorage.getItem("otpTimerStart");
      if (storedStartTime) {
        // console.log(storedStartTime)
        const elapsed = Math.floor(
          (Date.now() - parseInt(storedStartTime)) / 1000
        );
        const remaining = Math.max(120 - elapsed, 0);
        setTimeLeft(remaining);
        setIsDisabled(remaining > 0);
      }
    }
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

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
      otp: "",
    },
    resolver: yupResolver(schemaotp),
  });
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure it's running in the browser
      const data = localStorage?.getItem("email");
      if (data) {
        setEmail(data);
      }
    }
  }, []);

  // If user navigates back/forward, remove otpRequested flag
  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem("otpRequested");
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleForgetPassword = async () => {
    try {
      setIsLoading(true);
      setIsDisabled(true);

      // Store new timer start time

      let { data } = await ApiManager({
        method: "post",
        path: "auth/forget-password",
        params: { email },
      });
      // console.log(data);
      if (data.status == 201) {
        setTimeLeft(120);
        localStorage.setItem("otpTimerStart", Date.now().toString());
        dispatch(setToast({ message: data?.message, type: "success" }));
      }
    } catch (error) {
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleotpVerification = async (fd) => {
    fd.email = email;
    // console.log(fd)
    try {
      setIsLoading(true);
      let { data } = await ApiManager({
        method: "post",
        path: "auth/verify-otp",
        params: { ...fd },
      });
      // console.log(data);
      if (data.status == 201) {
        dispatch(setToast({ message: data?.message, type: "success" }));
        fd.otp_id = data?.response?.details?.otpId;
        localStorage.setItem("data", JSON.stringify(fd));
        localStorage.removeItem("otpRequested");
        localStorage.removeItem("otpTimerStart");
        router.push("/reset-password");
      }
    } catch (error) {
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
      console.log(error);
    } finally {
      setIsLoading(false);
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
        <Image src={optVerify} alt="opt-verification" />
        <Stack
          gap={{ xs: 3, md: 6 }}
          component={"form"}
          onSubmit={handleSubmit(handleotpVerification)}
        >
          <Stack textAlign={"center"} alignItems={"center"} gap={3}>
            <Typography
              variant="h3"
              display={"flex"}
              justifyContent={"center"}
              fontFamily={"Libre_Bodoni"}
              gap={1}
            >
              OPT Verification
            </Typography>
            <Typography
              width={{ xs: "80%", sm: "70%", md: "60%" }}
              variant="body1"
              fontWeight={"Regular"}
              fontFamily={"lato"}
            >
              An Email has been sent to your email.
            </Typography>
          </Stack>
          <TextField
            variant="standard"
            placeholder="Enter 4-digits otp "
            {...register("otp")}
            error={!!errors.otp}
            helperText={errors.otp?.message}
          />
          <Stack textAlign={"center"} gap={1}>
            <Typography>{formatTime(timeLeft)} Sec</Typography>
            <Stack direction={"row"} justifyContent={"center"} gap={0.5}>
              <Typography>Don't recieve code?</Typography>
              <Typography
                fontFamily={"Lato"}
                color="text.about"
                style={{
                  textAlign: "center",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
                onClick={isDisabled ? () => {} : handleForgetPassword}
              >
                Re-send
              </Typography>
            </Stack>
          </Stack>
          <Button variant={"contained"} type="submit" disabled={isSubmitting}>
            Continue
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
