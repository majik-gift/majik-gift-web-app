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
        bgcolor: color || "transparent",
        background: color ? color : "linear-gradient(135deg, #D3AFC9 0%, #9C90C2 100%)",
        color: color ? (textC || "#fff") : "#fff",
        fontWeight: 500,
        fontFamily: "Lato",
        borderRadius: 2,
        fontSize: {
          xs: "0.875rem",
          sm: "0.9375rem",
          md: "1rem",
        },
        px: {
          xs: 3,
          sm: 4,
          md: 4,
        },
        py: {
          xs: 1.25,
          sm: 1.5,
        },
        boxShadow: "0 4px 16px rgba(156, 144, 194, 0.3)",
        minWidth: {
          xs: "120px",
          sm: "140px",
          md: "140px",
        },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 8px 24px rgba(156, 144, 194, 0.4)",
          background: color ? `linear-gradient(135deg, ${color}dd 0%, ${color}aa 100%)` : "linear-gradient(135deg, #B288A4 0%, #8A7AB8 100%)",
        },
        "&:active": {
          transform: "translateY(0)",
        },
        "&:disabled": {
          opacity: 0.6,
          transform: "none",
        },
      }}
      startIcon={<VscSparkleFilled />}
      loading={loading}
    >
      {text}
    </Button>
  );
}
