"use client";

import React, { useEffect, useState } from "react";
import StartIconButton from "@/app/components/StartIconButton";
import {
  Checkbox,
  Container,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { VscSparkleFilled } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToast, setUser } from "@/store/reducer";
import ApiManager from "@/helper/api-manager";
import { useRouter } from "next/navigation";
import { createCookie } from "@/helper/cookies";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// username field validation
const usernameValidation = {
  required: {
    value: true,
    message: "Username or Email is required.",
  },
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Please enter a valid email address.",
  },
};

const passwordValidation = {
  required: {
    value: true,
    message: "Password is required.",
  },
  minLength: {
    value: 6,
    message: "Password must contain at least 6 characters.",
  },
  maxLength: {
    value: 20,
    message: "Password must not exceed 20 characters.",
  },
};

export default function AuthPage({ title }) {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { },
  });
  const handleLogIn = async (formData) => {
    setLoading(true);
    try {
      const { data } = await ApiManager({
        method: "post",
        path: "auth/sign-in",
        params: {
          ...formData,
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
      });
      dispatch(setToast({ message: data?.message, type: "success" }));
      dispatch(setUser(data?.response?.details));
      createCookie(
        JSON.stringify({
          user: data?.response?.details,
          access_token: data?.response?.access_token,
        })
      );
      localStorage.setItem(
        process.env.NEXT_PUBLIC_APP_TOKEN,
        data.response.access_token
      );
      router.push("/");
    } catch (error) {
      console.log("🚀 ~ handleSubmit ~ error:", error);
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
    } finally {
      setLoading(false);
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
      <Stack alignItems={"center"} py={5} textAlign={"center"} gap={6}>
        <Stack width={{ xs: "60%", sm: "50%", md: "30%" }} gap={3}>
          <Typography
            variant="h2"
            display={"flex"}
            justifyContent={"center"}
            fontFamily={"Libre_Bodoni"}
            gap={1}
          >
            {title} <VscSparkleFilled />
          </Typography>
          <Typography variant="h6" fontWeight={"Regular"} fontFamily={"lato"}>
            Please enter your credentials to access your account.
          </Typography>
        </Stack>

        <form onSubmit={handleSubmit(handleLogIn)} style={{ width: "100%" }}>
          <Stack
            marginInline={"auto"}
            gap={4}
            width={{ xs: "80%", sm: "70%", md: "50%" }}
          >
            {/* Username */}
            <TextField
              label={"Email"}
              {...register("email", usernameValidation)}
              error={!!errors["email"]}
              helperText={errors["email"]?.message}
            />
            <Stack gap={1}>
              {/* Password */}
              <TextField
                type={showPassword ? "text" : "password"}
                label={"Password"}
                {...register("password", passwordValidation)}
                error={!!errors["password"]}
                helperText={errors["password"]?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Stack
                direction={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Link href={"/forgot-password"} className="link">
                  <Typography fontFamily={"Lato"} color="text.about">
                    Forget Password?
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Stack>

          <Stack
            marginInline={"auto"}
            width={{ xs: "80%", sm: "70%", md: "50%" }}
            gap={4}
          >
            <StartIconButton
              type={"submit"}
              color={"#000"}
              text={loading ? "Loading..." : "Login"}
            />
            <Stack direction={"row"} justifyContent={"center"} gap={0.5}>
              <Typography>Don't have an account?</Typography>
              <Link color="text.about" href="/sign-up" className="link">
                <Typography fontFamily={"Lato"} color="text.about">
                  Sign Up
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </form>

        {/* <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={errorMessage}
          key={"top" + "center"}
        /> */}
      </Stack>
    </Container>
  );
}
