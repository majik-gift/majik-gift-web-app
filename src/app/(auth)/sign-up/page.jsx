"use client";
import React, { useEffect, useState } from "react";
import StartIconButton from "@/app/components/StartIconButton";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  Tab,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Link from "next/link";
import { VscSparkleFilled } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ApiManager from "@/helper/api-manager";
import { createCookie } from "@/helper/cookies";
import { setToast, setUser } from "@/store/reducer";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import UIAutocomplete from "@/app/components/UIAutocomplete";
import FilePicker from "@/app/components/FilePicker";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import UIPasswordField from "@/shared/components/form-controls/PasswordField";
import PasswordField from "@/pure-components/PasswordField";
// import FilePicker from "@/app/components/FilePicker";

const lightWorker = yup.object({
  first_name: yup
    .string()
    .required("First name is required.")
    .min(3, "First name must be at least 3 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "First name cannot contain numbers"),
  last_name: yup
    .string()
    .required("Last name is required.")
    .min(3, "Last name must be at least 3 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "Last name cannot contain numbers"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  // confirmPassword: yup
  //   .string()
  //   .required("Confirm password is required.")
  //   .oneOf([yup.ref("password"), null], "Passwords must match."),
  phone_number: yup.string().nullable(),
  // .test(
  //   "is-valid-phone",
  //   "Invalid phone number format for selected country",
  //   function (value) {
  //     const { country } = this.parent;
  //     if (!value || !country?.value) return true; // Skip validation if phone number or country is missing
  //     try {
  //       const phoneNumber = parsePhoneNumberFromString(value);
  //       if (!phoneNumber) return false;

  //       console.log("Parsed Phone Number:", phoneNumber);

  //       // Check if the detected country matches the selected country
  //       if (phoneNumber.country !== country.value) {
  //         console.error(
  //           `Phone number country mismatch: Expected ${country.value}, but got ${phoneNumber.country}`
  //         );
  //         return false;
  //       }

  //       return phoneNumber.isValid();
  //     } catch (error) {
  //       console.error("Phone number parsing error:", error);
  //       return false;
  //     }
  //   }
  // ),
  address: yup
    .string()
    .required("Address is required.")
    .min(5, "Address must be at least 5 characters.")
    .max(100, "Address cannot exceed 100 characters."),
  note: yup.string().optional().max(200, "Note cannot exceed 200 characters."),
  country: yup.mixed().required("Country is required."),
  bussiness_name: yup
    .string()
    .required("Bussiness Name is Required.")
    .min(5, "Bussiness Name must be at least 5 characters."),
  website: yup.string().required("WebsiteURL is Required."),
});
const stallHolder = yup.object({
  first_name: yup
    .string()
    .required("First name is required.")
    .min(3, "First name must be at least 3 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "First name cannot contain numbers"),
  last_name: yup
    .string()
    .required("Last name is required.")
    .min(3, "Last name must be at least 3 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "Last name cannot contain numbers"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  // confirmPassword: yup
  //   .string()
  //   .required("Confirm password is required.")
  //   .oneOf([yup.ref("password"), null], "Passwords must match."),
  phone_number: yup.string().nullable(),
  // .test(
  //   "is-valid-phone",
  //   "Invalid phone number format for selected country",
  //   // function (value) {
  //   //   const { country } = this.parent;
  //   //   if (!value || !country?.value) return true; // Skip validation if phone number or country is missing
  //   //   try {
  //   //     // const phoneNumber = parsePhoneNumberFromString(value);
  //   //     // if (!phoneNumber) return false;

  //   //     // console.log("Parsed Phone Number:", phoneNumber);

  //   //     // Check if the detected country matches the selected country
  //   //     // if (phoneNumber.country !== country.value) {
  //   //     //   console.error(
  //   //     //     `Phone number country mismatch: Expected ${country.value}, but got ${phoneNumber.country}`
  //   //     //   );
  //   //     //   return false;
  //   //     // }

  //   //     // return phoneNumber.isValid();
  //   //     return true;
  //   //   } catch (error) {
  //   //     console.error("Phone number parsing error:", error);
  //   //     return false;
  //   //   }
  //   // }
  // ),
  address: yup
    .string()
    .required("Address is required.")
    .min(5, "Address must be at least 5 characters.")
    .max(100, "Address cannot exceed 100 characters."),
  note: yup.string().optional().max(200, "Note cannot exceed 200 characters."),
  marketingEmails: yup.boolean(),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions."),
  country: yup.mixed().required("Country is required."),
});
const customer = yup.object({
  first_name: yup
    .string()
    .required("First name is required.")
    .min(3, "First name must be at least 3 characters.")
    .max(50, "First name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "First name cannot contain numbers"),
  last_name: yup
    .string()
    .required("Last name is required.")
    .min(3, "Last name must be at least 3 characters.")
    .max(50, "Last name cannot exceed 50 characters.")
    .matches(/^[A-Za-z\s]+$/, "Last name cannot contain numbers"),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters.")
    .max(20, "Password cannot exceed 20 characters."),
  // confirmPassword: yup
  //   .string()
  //   .required("Confirm password is required.")
  //   .oneOf([yup.ref("password"), null], "Passwords must match."),
  country: yup.mixed().required("Country is required."),
  phone_number: yup.string().nullable(),
  // .test(
  //   "is-valid-phone",
  //   "Invalid phone number format for selected country",
  //   function (value) {
  //     const { country } = this.parent;
  //     if (!value || !country?.value) return true; // Skip validation if phone number or country is missing
  //     try {
  //       const phoneNumber = parsePhoneNumberFromString(value);
  //       if (!phoneNumber) return false;

  //       console.log("Parsed Phone Number:", phoneNumber);

  //       // Check if the detected country matches the selected country
  //       if (phoneNumber.country !== country.value) {
  //         console.error(
  //           `Phone number country mismatch: Expected ${country.value}, but got ${phoneNumber.country}`
  //         );
  //         return false;
  //       }

  //       return phoneNumber.isValid();
  //     } catch (error) {
  //       console.error("Phone number parsing error:", error);
  //       return false;
  //     }
  //   }
  // ),
  address: yup
    .string()
    .required("Address is required.")
    .min(5, "Address must be at least 5 characters.")
    .max(100, "Address cannot exceed 100 characters."),
  note: yup.string().optional().max(200, "Note cannot exceed 200 characters."),
  marketingEmails: yup.boolean(),
  termsAndConditions: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions."),
});

export default function page() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState("customer");
  const [image, setImage] = useState({});
  const [showPassword, setShowPassword] = useState({});
  const [isAustralian, setIsAustralian] = useState(false);
  const [loading, setLoading] = useState(false);

  // console.log(value , 'sfsdf')

  const handleClickShowPassword = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const schemaResolver = {
    customer,
    light_worker: lightWorker,
    stall_holder: stallHolder,
  };
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaResolver[value]),
  });
  useEffect(() => {
    console.log(errors, "errors");
  }, [errors]);
  // Handling Tab Change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // console.log(watch(),'sdf')
  useEffect(() => {
    setIsAustralian(watch("country")?.value === "AU");
    // console.log("wat", watch("country"));
  }, [watch("country")]);

  // console.log(image , 'image')

  const handleSignUp = async (formData) => {
    // console.log("TCL: handleSignUp -> formData", formData, image);
    setLoading(true);
    formData.country = formData.country.label;
    try {
      if (value) {
        formData["role"] = value;
      }
      let {
        bussiness_name,
        marketingEmails,
        termsAndConditions,
        confirmPassword,
        paypal_connect,
        ...params
      } = formData;
      // console.log(isAustralian,'isAustralian',params)

      let { data } = await ApiManager({
        method: "post",
        path: "auth/sign-up",
        header: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          ...params,
          business_name: bussiness_name,
          ...(params?.country !== "Australia" && {
            paypal_connect: paypal_connect,
          }),
          ...(image?.length && { insurance: image[0]?.file }),
        },
      });
      // console.log(data,'data')

      {
        data?.status === 201 &&
          dispatch(
            setToast({
              message: data?.message,
              type: "success",
            })
          );
      }
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
      console.log("🚀 ~ file: page.jsx:340 ~ error:", error);
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
    } finally {
      setLoading(false);
    }
  };

  const onFileSelect = (img) => {
    if (img && img.length == 0) return;
    setImage(img);
  };

  const renderPasswordField = (name, label) => (
    <TextField
      key={name}
      label={label}
      type={showPassword[name] ? "text" : "password"}
      placeholder={`Enter ${label}`}
      {...register(name)}
      error={!!errors[name]}
      helperText={errors[name]?.message}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={() => handleClickShowPassword(name)}
              edge="end"
            >
              {showPassword[name] ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

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
            Sign Up <VscSparkleFilled />
          </Typography>
          <Typography variant="h6" fontWeight={"Regular"} fontFamily={"lato"}>
            Claim Your Account: Register today for access to our platform.
          </Typography>
        </Stack>
        <Stack width={{ xs: "80%", sm: "70%", md: "50%" }}>
          <TabContext value={value}>
            <Stack direction={"row"} justifyContent={"center"}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={<Typography>Customer</Typography>}
                  value="customer"
                />
                <Tab
                  label={<Typography>LightWorker</Typography>}
                  value="light_worker"
                />
                <Tab
                  label={<Typography>Stall Holder</Typography>}
                  value="stall_holder"
                />
              </TabList>
            </Stack>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <TabPanel value="customer">
                <Stack gap={5}>
                  <Stack gap={4}>
                    {[
                      { label: "First Name", name: "first_name" },
                      { label: "Last Name", name: "last_name" },
                      { label: "Email", name: "email" },
                      { label: "Password", name: "password", type: "password" },
                      {
                        label: "Confirm Password",
                        name: "confirmPassword",
                        type: "password",
                      },
                      {
                        label: "Country",
                        name: "country",
                        type: "autocomplete",
                      },
                      { label: "Phone Number", name: "phone_number" },
                      { label: "Address", name: "address" },
                      { label: "Note", name: "note" },
                    ].map(({ label, name, type = "text" }) =>
                      type === "password" ? (
                        <PasswordField
                          key={name}
                          label={label}
                          name={name}
                          register={register}
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      ) : type === "autocomplete" ? (
                        <UIAutocomplete
                          name="country"
                          label="Country"
                          placeholder="Country"
                          type="text"
                          key={name}
                          multiple={false}
                          fullWidth
                          control={control}
                          url={"country/countries?"}
                          errorMessage={errors.country?.message}
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
                    )}
                  </Stack>
                  <Stack>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("marketingEmails")}
                          error={!!errors["marketingEmails"]}
                          helperText={errors["marketingEmails"]?.message}
                        />
                      }
                      label="I would like to receive marketing e-mails."
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("termsAndConditions")}
                          error={!!errors["termsAndConditions"]}
                          helperText={errors["termsAndConditions"]?.message}
                        />
                      }
                      label={
                        <Stack
                          direction={"row"}
                          gap={0.5}
                          flexWrap={"wrap"}
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          I have read and agree to the{" "}
                          <Link href={"/pages/privacy-policy"} className="link">
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              Privacy Policy
                            </Typography>
                          </Link>
                          and
                          <Link href={"/terms-and-conditions"} className="link">
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              terms and conditions.
                            </Typography>
                          </Link>
                          {value !== "customer" && (
                            <>
                              and Light Worker
                              <Link
                                href={"Light_Worker_Terms_and_Conditions.pdf"}
                                className="link"
                                target="_blank"
                              >
                                <Typography
                                  color="text.about"
                                  fontWeight={"SemiBold"}
                                  sx={{ whiteSpace: "nowrap" }}
                                >
                                  terms and conditions.
                                </Typography>
                              </Link>
                            </>
                          )}
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack gap={4}>
                    <StartIconButton
                      color={"#000"}
                      type={"submit"}
                      text={"Sign Up"}
                      loading={loading}
                    />
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      gap={0.5}
                    >
                      <Typography>Already have an account?</Typography>
                      <Link
                        color="text.about"
                        href={"/log-in"}
                        className="link"
                      >
                        <Typography fontFamily={"Lato"} color="text.about">
                          Log In
                        </Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </TabPanel>
            </form>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <TabPanel value="light_worker">
                <Stack gap={5}>
                  <Stack gap={4}>
                    {[
                      { label: "First Name", name: "first_name" },
                      { label: "Last Name", name: "last_name" },
                      { label: "Bussiness Name", name: "bussiness_name" },
                      { label: "Email", name: "email" },
                      { label: "Address", name: "address" },
                      { label: "Area Of Work", name: "area_of_work" },
                      {
                        label: "Country",
                        name: "country",
                        type: "autocomplete",
                      },

                      ...(isAustralian
                        ? [{ label: "ABN", name: "abn", type: "password" }]
                        : [
                            {
                              label: "Paypal Handle",
                              name: "paypal_connect",
                            },
                          ]),
                      { label: "Phone Number", name: "phone_number" },
                      { label: "Note", name: "note" },
                      { label: "Password", name: "password", type: "password" },
                      {
                        label: "Confirm Password",
                        name: "confirmPassword",
                        type: "password",
                      },
                      { label: "Website", name: "website" },
                      { label: "Facebook", name: "facebook" },
                      { label: "Instagram", name: "instagram" },
                      { label: "Tiktok", name: "tiktok" },
                      {
                        label: "Other Social Media",
                        name: "other_social_media",
                      },
                      {
                        label: "Insurance Expiry",
                        name: "insurance_expire_date",
                        type: "date",
                      },
                      {
                        label: "Upload of Insurance",
                        name: "insurance",
                        type: "file",
                      },
                    ].map(({ label, name, type = "text" }) =>
                      type === "file" ? (
                        <FilePicker
                          key={name}
                          onImageSelect={onFileSelect}
                          error={errors?.insurance?.message}
                          register={register}
                          name={name}
                        />
                      ) : type === "password" ? (
                        <PasswordField
                          key={name}
                          label={label}
                          placeholder={`Enter ${label}`}
                          name={name}
                          register={register}
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      ) : type === "autocomplete" ? (
                        <UIAutocomplete
                          name="country"
                          label="Country"
                          placeholder="Country"
                          type="text"
                          key={name}
                          multiple={false}
                          fullWidth
                          control={control}
                          url={"country/countries?"}
                          errorMessage={errors.country?.message}
                        />
                      ) : (
                        !!name && (
                          <TextField
                            key={name}
                            label={label}
                            InputLabelProps={
                              type === "date" ? { shrink: true } : undefined
                            }
                            type={type}
                            placeholder={`Enter ${label}`}
                            {...register(name)}
                            error={!!errors[name]}
                            helperText={errors[name]?.message}
                          />
                        )
                      )
                    )}
                  </Stack>
                  <Stack>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("marketingEmails")}
                          error={!!errors["marketingEmails"]}
                          helperText={errors["marketingEmails"]?.message}
                        />
                      }
                      label="I would like to receive marketing e-mails."
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("termsAndConditions")}
                          error={!!errors["termsAndConditions"]}
                          helperText={errors["termsAndConditions"]?.message}
                        />
                      }
                      label={
                        <Stack
                          direction={"row"}
                          gap={0.5}
                          flexWrap={"wrap"}
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          I have read and agree to the{" "}
                          <Link href={"/privacy-policy"} className="link">
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              Privacy Policy
                            </Typography>
                          </Link>
                          and
                          <Link href={"/terms-and-conditions"} className="link">
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              terms and conditions.
                            </Typography>
                          </Link>
                          and Light Worker
                          <Link
                            href={"Light_Worker_Terms_and_Conditions.pdf"}
                            className="link"
                            target="_blank"
                          >
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              terms and conditions.
                            </Typography>
                          </Link>
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack gap={4}>
                    <StartIconButton
                      color={"#000"}
                      type={"submit"}
                      text={"Sign Up"}
                      loading={loading}
                    />
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      gap={0.5}
                    >
                      <Typography>Already have an account?</Typography>
                      <Link
                        color="text.about"
                        href={"/log-in"}
                        className="link"
                      >
                        <Typography fontFamily={"Lato"} color="text.about">
                          Log In
                        </Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </TabPanel>
            </form>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <TabPanel value="stall_holder">
                <Stack gap={5}>
                  <Stack gap={4}>
                    {[
                      { label: "First Name", name: "first_name" },
                      { label: "Last Name", name: "last_name" },
                      { label: "Email", name: "email" },
                      { label: "Password", name: "password", type: "password" },
                      {
                        label: "Confirm Password",
                        name: "confirmPassword",
                        type: "password",
                      },
                      { label: "Bussiness Name", name: "bussiness_name" },
                      { label: "Area Of Work", name: "area_of_work" },
                      {
                        label: "Country",
                        name: "country",
                        type: "autocomplete",
                      },
                      ...(isAustralian
                        ? [{ label: "ABN", name: "abn", type: "password" }]
                        : [
                            {
                              label: "Paypal Handle",
                              name: "paypal_connect",
                            },
                          ]),
                      { label: "Phone Number", name: "phone_number" },
                      { label: "Address", name: "address" },
                      { label: "Note", name: "note" },
                      { label: "Website", name: "website" },
                      { label: "Facebook", name: "facebook" },
                      { label: "Instagram", name: "instagram" },
                      { label: "Tiktok", name: "tiktok" },
                      {
                        label: "Other Social Media",
                        name: "other_social_media",
                      },
                      {
                        label: "Insurance Expiry",
                        name: "insurance_expire_date",
                        type: "date",
                      },
                      {
                        label: "Upload of Insurance",
                        name: "insurance",
                        type: "file",
                      },
                    ].map(({ label, name, type = "text" }) =>
                      type === "password" ? (
                        <PasswordField
                          key={name}
                          label={label}
                          placeholder={`Enter ${label}`}
                          register={register}
                          name={name}
                          error={!!errors[name]}
                          helperText={errors[name]?.message}
                        />
                      ) : type === "autocomplete" ? (
                        <UIAutocomplete
                          name="country"
                          label="Country"
                          placeholder="Country"
                          type="text"
                          key={name}
                          multiple={false}
                          fullWidth
                          control={control}
                          url={"country/countries?"}
                          errorMessage={errors.country?.message}
                        />
                      ) : type === "file" ? (
                        <FilePicker
                          key={name}
                          onImageSelect={onFileSelect}
                          error={errors?.insurance?.message}
                          register={register}
                          name={name}
                        />
                      ) : (
                        name && (
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
                      )
                    )}
                  </Stack>
                  <Stack>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("marketingEmails")}
                          error={!!errors["marketingEmails"]}
                          helperText={errors["marketingEmails"]?.message}
                        />
                      }
                      label="I would like to receive marketing e-mails."
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register("termsAndConditions")}
                          error={!!errors["termsAndConditions"]}
                          helperText={errors["termsAndConditions"]?.message}
                        />
                      }
                      label={
                        <Stack
                          direction={"row"}
                          gap={0.5}
                          flexWrap={"wrap"}
                          sx={{ whiteSpace: "nowrap" }}
                        >
                          I have read and agree to the{" "}
                          <Link href={"/privacy-policy"} className="link">
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              Privacy Policy
                            </Typography>
                          </Link>
                          and
                          <Link href={"/terms-and-conditions"} className="link">
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              terms and conditions.
                            </Typography>
                          </Link>
                          and Stall Holder
                          <Link
                            href={"Terms_and_Conditions.pdf"}
                            className="link"
                            target="_blank"
                          >
                            <Typography
                              color="text.about"
                              fontWeight={"SemiBold"}
                              sx={{ whiteSpace: "nowrap" }}
                            >
                              terms and conditions.
                            </Typography>
                          </Link>
                        </Stack>
                      }
                    />
                  </Stack>
                  <Stack gap={4}>
                    <StartIconButton
                      color={"#000"}
                      type={"submit"}
                      text={"Sign Up"}
                      loading={loading}
                    />
                    <Stack
                      direction={"row"}
                      justifyContent={"center"}
                      gap={0.5}
                    >
                      <Typography>Already have an account?</Typography>
                      <Link
                        color="text.about"
                        href={"/log-in"}
                        className="link"
                      >
                        <Typography fontFamily={"Lato"} color="text.about">
                          Log In
                        </Typography>
                      </Link>
                    </Stack>
                  </Stack>
                </Stack>
              </TabPanel>
            </form>
          </TabContext>
        </Stack>
      </Stack>
    </Container>
  );
}
