"use client";

import React from "react";

import {
  // Box,
  // InputLabel,
  FormHelperText,
  TextField,
  useMediaQuery,
  Typography,
  FormControl,
} from "@mui/material";
import { Controller } from "react-hook-form";

// import Utils from "@/utils/utils";

const InputField = ({
  control,
  name,
  rules = {},
  labelTop = "",
  label = "",
  styles,
  helperText = "",
  icon,
  fullWidth = true,
  size,
  variant = "outlined",
  min = "",
  max = "",
  ...props
}) => {
  const matches = useMediaQuery("(min-width:600px)");
//   const _id = `myInput__${Utils.generateId()}`;
  const adjustSize = size ? size : matches ? "large" : "small";

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormControl
            sx={{ ...styles, width: 1 }}
            error={Boolean(error?.message)}
          >
            {labelTop && (
              <Typography
                sx={{
                  marginBottom: "5px",
                  fontWeight: "Medium",
                }}
              >
                {labelTop}
              </Typography>
            )}
            <TextField
          //     id={_id}
              label={label}
              variant={variant}
              fullWidth={fullWidth}
              size={adjustSize}
              autoComplete="off"
              inputProps={{ min, max }}
              error={error}
              InputLabelProps={{
                shrink: !!field.value, // Ensure label shrinks when value is present
              }}
              {...field} // Connect input to React Hook Form
              {...props}
              sx={{
                "& input[type=number]": {
                  MozAppearance: "textfield",
                  WebkitAppearance: "none",
                  appearance: "textfield",
                  margin: 0,
                },
                "& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button":
                  {
                    WebkitAppearance: "none",
                  },
              }}
            />
            {helperText && (
              <FormHelperText
                sx={{
                  mt: "0 !important",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#6C6A6A",
                  fontWeight: 500,
                }}
              >
                {helperText}
                {icon}
              </FormHelperText>
            )}
            {error && (
              <FormHelperText
                sx={{ mt: "0 !important" }}
              >{`${error.message}*`}</FormHelperText>
            )}
          </FormControl>
        );
      }}
    />
  );
};

// Add displayName for the component
InputField.displayName = "InputField";

export default InputField;
