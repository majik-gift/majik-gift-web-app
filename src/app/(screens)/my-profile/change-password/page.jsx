"use client";
import ApiManager from "@/helper/api-manager";
import { UIButton } from "@/shared/components";
import { setToast } from "@/store/reducer";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Stack,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import UIPasswordField from "@/shared/components/form-controls/PasswordField";
import PasswordField from "@/pure-components/PasswordField";

const changePassword = yup.object({
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  new_password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  confirm_Password: yup
    .string()
    .required("Confirm password is required.")
    .oneOf([yup.ref("new_password"), null], "Passwords must match."),
});

const ChangePasswordPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(changePassword),
  });

  const handlePasswordUpdate = async (formData) => {
    const { confirm_Password, ...finalData } = formData;
    try {
      let { data } = await ApiManager({
        method: "patch",
        path: "auth/change-password",
        params: { ...finalData },
      });
      {
        data?.status === 200 &&
          dispatch(
            setToast({
              message: data?.message,
              type: "success",
            })
          );
      }
    } catch (error) {
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
        p: isMobile ? 2 : 4,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: isMobile ? 3 : 4,
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          component={"form"}
          onSubmit={handleSubmit(handlePasswordUpdate)}
          spacing={4}
        >
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Change Password
          </Typography>

          <Stack spacing={3}>
            {[
              { label: "Old Password", name: "password", type: "password" },
              { label: "New Password", name: "new_password", type: "password" },
              { label: "Confirm Password", name: "confirm_Password", type: "password" },
            ].map(({ label, name, type = "text" }) => (
              type === "password" ? (
                <PasswordField
                  key={name}
                  label={label}
                  // {...register(name)}
                  register={register}
                  name={name}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                />
              ) : (
                <TextField
                  key={name}
                  label={label}
                  type={type}
                  placeholder={`Enter ${label}`}
                  {...register(name)}
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                />
              )
            ))}
          </Stack>

          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            justifyContent="flex-end"
          >
            <UIButton
              fullWidth={isMobile}
              variant="outlined"
              onClick={() => router.back()}
              type="button"
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Cancel
            </UIButton>

            <UIButton
              fullWidth={isMobile}
              variant="contained"
              type="submit"
              isLoading={isSubmitting}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                backgroundColor: theme.palette.success.main,
                "&:hover": {
                  backgroundColor: theme.palette.success.dark,
                },
              }}
            >
              Save Changes
            </UIButton>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChangePasswordPage;
