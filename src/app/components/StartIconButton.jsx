import { VscSparkleFilled } from "@/assets";
import { Button } from "@mui/material";
import React from "react";

export default function StartIconButton({
  text,
  color,
  textC,
  onClick,
  type,
  disabled = false,
  loading = false,
}) {
  return (
    <Button
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      type={type && "submit"}
      sx={{
        bgcolor: color || "#fff",
        color: color ? textC || "#fff" : "#000",
        fontWeight: "regular",
        fontFamily: "Lato",

        borderRadius: "0px",
        fontSize: {
          xs: "0.75rem", // ~12px on extra-small screens
          sm: "0.875rem", // ~14px
          md: "1rem", // ~16px
        },
        px: {
          xs: 2,
          sm: 2,
          md: 2,
        },
        py: {
          xs: 1,
          sm: 1,
        },
        boxShadow: "none",
        minWidth: {
          xs: "100px",
          sm: "120px",
          md: "120px",
        },
      }}
      startIcon={<VscSparkleFilled />}
      loading={loading}
    >
      {text}
    </Button>
  );
}
