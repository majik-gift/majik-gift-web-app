"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Stack,
  IconButton,
  Typography,
  InputAdornment,
  ButtonGroup,
  Checkbox,
} from "@mui/material";
import { CloseIcon } from "@/assets";
import AuthPage from "./AuthPage";
import StartIconButton from "./StartIconButton";
import Link from "next/link";
import { useForm } from "react-hook-form";
import ApiManager from "@/helper/api-manager";
import { setToast, setUser } from "@/store/reducer";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCookie } from "@/helper/cookies";
import { useRouter } from "next/navigation";
import UIPasswordField from "@/shared/components/form-controls/PasswordField";
import PasswordField from "@/pure-components/PasswordField";

// import { useDispatch } from "react-redux";
// import apiManager from "@/app/helper/api-manager";
// import { setToast } from "@/store/reducer";
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// import CheckoutForm from "./CheckoutForm";
// import CompletePage from "./CompletePage";

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
// );
const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password must be at least 8 characters")
      .max(20, "Password must be no more than 20 characters"),
  })
  .required();
const LogInModal = ({ open, handleClose, TransitionComponent }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    resolver: yupResolver(schema),
  });

  const handleLogIn = async (formData) => {
    setLoading(true);
    try {
      const { data } = await ApiManager({
        method: "post",
        path: "auth/sign-in",
        params: formData,
      });
      // console.log("🚀 ~ handleLogIn ~ data:", data);
      dispatch(setUser(data?.response?.details));
      createCookie(JSON.stringify({user:data?.response?.details , access_token: data?.response?.access_token}));
      localStorage.setItem(
        process.env.NEXT_PUBLIC_APP_TOKEN,
        data.response.access_token
      );
      {
        data?.status === 201 &&
          dispatch(setToast({ message: data?.message, type: "success" }));
      }
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
    <Stack>
      <Dialog
        open={open}
        style={{ width: "100%" }}
        // onClose={handleClose}
        TransitionComponent={TransitionComponent}
      >
        <DialogTitle
          width={{ xs: "100%", sm: "500px", md: "600px" }}
          overflow={"hidden"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={3}
        >
          <Typography
            fontWeight={"Bold"}
            sx={{
              typography: { xs: "h3", md: "h4" },
              marginTop: { md: "30px" },
              fontFamily: "Libre Bodoni",
            }}
          >
            Log in To Your Account
          </Typography>
          <Typography
            textAlign={"center"}
            width={{ xs: "80%", sm: "70%", md: "60%" }}
            sx={{ typography: { xs: "body2", md: "body1" } }}
          >
            To place an order you must need to logged into your account.{" "}
          </Typography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          {/* <form onSubmit={handleSubmit(handleLogIn)}> */}
            <Stack
              alignItems={"center"}
              gap={2}
              component={'form'}
               onSubmit={handleSubmit(handleLogIn)}
            >
              <Stack gap={4} width={{ xs: "100%", sm: "90%", md: "80%" }}>
                <TextField
                  label={"Username/Email"}
                  type="email"
                  {...register("email")}
                  placeholder="Enter Username/Email"
                  error={!!errors["email"]}
                  helperText={errors["email"]?.message}
                />
                <Stack gap={1}>
                  <PasswordField
                    label={"Password"}
                    register={register}
                    name="password"
                    placeholder="Enter Password"
                    error={!!errors["password"]}
                    helperText={errors["password"]?.message}
                  />
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                    gap={2}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Remember Me"
                    />
                    <Link href={"/forgot-password"}>
                      <Typography fontFamily={"Lato"} color="text.about">
                        Forget Password?
                      </Typography>
                    </Link>
                  </Stack>
                </Stack>
              </Stack>
              <Stack width={{ xs: "100%", sm: "90%", md: "80%" }} gap={4}>
                <StartIconButton
                type={'submit'}
                  color={"#000"}
                  text={loading ? "Loading..." : "Login"}
                />
                <Stack direction={"row"} justifyContent={"center"}>
                  <Typography>"Don't have an account?"</Typography>
                  <Link color="text.about" href={"/sign-up"}>
                    <Typography fontFamily={"Lato"} color="text.about">
                      Sign Up
                    </Typography>
                  </Link>
                </Stack>
              </Stack>
            </Stack>
          {/* </form> */}
        </DialogContent>
      </Dialog>
    </Stack>
  );
};

export default LogInModal;
