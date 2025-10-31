"use client";
import ApiManager from "@/helper/api-manager";
import { UIButton } from "@/shared/components";
import AvatarWithImageUpload from "@/shared/components/AvatarWithImageUpload";
import { setToast, setUser } from "@/store/reducer";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Stack,
  TextField,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const customer = yup.object({
  first_name: yup
    .string()
    .required("First name is required.")
    .min(3, "First name must be at least 3 characters.")
    .max(50, "First name cannot exceed 50 characters."),
  last_name: yup
    .string()
    .required("Last name is required.")
    .min(3, "Last name must be at least 3 characters.")
    .max(50, "Last name cannot exceed 50 characters."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  phone_number: yup.string().required("Phone number is required."),
  address: yup
    .string()
    .required("Address is required.")
    .min(5, "Address must be at least 5 characters.")
    .max(100, "Address cannot exceed 100 characters."),
});

const EditProfilePage = () => {
  const { user } = useSelector((state) => state.appReducer);
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
    resolver: yupResolver(customer),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      email: user?.email,
      phone_number: user?.phone_number,
      address: user?.address,
    },
  });

  const handleProfileUpdate = async (formData) => {
    // console.log(formData);
    try {
      let { data } = await ApiManager({
        method: "put",
        path: "users",
        params: { ...formData },
      });
      if (data?.status === 200) {
        dispatch(setUser(data?.response?.details));
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
          maxWidth: "600px",
          p: isMobile ? 3 : 4,
          borderRadius: 4,
          boxShadow: theme.shadows[2],
          backgroundColor: theme.palette.background.paper,
        }}
      >
        <Stack
          component={"form"}
          onSubmit={handleSubmit(handleProfileUpdate)}
          spacing={4}
        >
          {/* Header */}
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Edit Profile
          </Typography>

          {/* Avatar Section */}
          <Stack alignItems="center" spacing={2}>
            <AvatarWithImageUpload
              src={user?.profile_image}
              alt={user?.first_name || "-"}
              size="small"
            />
          </Stack>

          {/* Form Fields */}
          <Stack spacing={3}>
            {[
              { label: "First Name", name: "first_name" },
              { label: "Last Name", name: "last_name" },
              { label: "Email", name: "email" },
              { label: "Phone Number", name: "phone_number" },
              { label: "Address", name: "address" },
            ].map(({ label, name, type = "text" }) => (
              <TextField
                key={name}
                label={label}
                type={type}
                placeholder={`Enter ${label}`}
                {...register(name)}
                disabled={name === "email"}
                error={!!errors[name]}
                helperText={errors[name]?.message}
                size={isMobile ? "small" : "medium"}
                multiline={name === "address"}
                rows={name === "address" ? 3 : undefined}
              />
            ))}
          </Stack>

          {/* Action Buttons */}
          <Stack
            direction={isMobile ? "column" : "row"}
            spacing={2}
            justifyContent="space-between"
          >
            <UIButton
              fullWidth={isMobile}
              variant="text"
              type="button"
              onClick={() => router.push("/my-profile/change-password")}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              Change Password
            </UIButton>
            <Stack flexDirection={"row"} gap={2} flexWrap={"wrap"}>
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
                onClick={() => console.log("Save changes")}
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
        </Stack>
      </Box>
    </Box>
  );
};

export default EditProfilePage;
