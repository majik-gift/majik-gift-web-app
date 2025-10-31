"use client";
import { Forgotpassword, resetPassword } from "@/assets";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import UIPasswordField from "@/shared/components/form-controls/PasswordField";
import PasswordField from "@/pure-components/PasswordField";

export const schemaResetPassword = Yup.object().shape({
  new_password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("new_password")], "Confirm password must match password")
    .required("Confirm password is required"),
});

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState(null);
  const [otpId, setOtpId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure it's running in the browser
      const data = localStorage?.getItem("data");
      if (data) {
        const parsedData = JSON.parse(data);
        // console.log(parsedData);
        setEmail(parsedData.email);
        setOtpId(parsedData.otp_id);
      }
    }
  }, []);

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
      password: "",
      confirm_password: "",
    },
    resolver: yupResolver(schemaResetPassword),
  });

  const handleResetPassword = async (fd) => {
    fd.otp_id = otpId;
    const { password, confirm_password, ...rest } = fd;

    // console.log(fd);
    try {
      setIsLoading(true);
      let { data } = await ApiManager({
        method: "post",
        path: "auth/reset-password",
        params: { ...rest },
      });
      // console.log(data);
      if (data.status == 201) {
        dispatch(setToast({ message: data?.message, type: "success" }));
        localStorage.removeItem("data");
        localStorage.removeItem("email");
        router.push("/log-in");
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
        <Image src={resetPassword} alt="reset password" />
        <Stack
          gap={{ xs: 3, md: 6 }}
          width={{ xs: "80%", sm: "60%", md: "50%" }}
          component={"form"}
          onSubmit={handleSubmit(handleResetPassword)}
        >
          <Stack textAlign={"center"} alignItems={"center"} gap={3}>
            <Typography
              variant="h3"
              display={"flex"}
              justifyContent={"center"}
              fontFamily={"Libre_Bodoni"}
              gap={1}
            >
              Reset Password?
            </Typography>
            <Typography
              width={{ xs: "80%", sm: "70%", md: "60%" }}
              variant="body1"
              fontWeight={"Regular"}
              fontFamily={"lato"}
            >
              Update your password for added security and peace of mind. Keep
              your account safe with a new, strong password.
            </Typography>
          </Stack>
          <PasswordField
            label={"New Password"}
            name={"new_password"}
            placeholder="New Password"
            register={register}
            error={!!errors.new_password}
            helperText={errors.new_password?.message}
            />
          <PasswordField
            label={"Confirm Password"}
            name={"confirm_password"}
            placeholder="Confirm Password"
            register={register}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
          <Button variant={"contained"} type="submit" disabled={isSubmitting}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
