import React from "react";

import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Toast({
  open = false,
  type = "error",
  message = "",
  handleClose = () => {},
  duration = 2000,
  vertical,
  horizontal,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={() => handleClose()}
      anchorOrigin={{
        vertical: vertical || "bottom",
        horizontal: horizontal || "right",
      }}
    >
      <Alert
        onClose={() => handleClose()}
        severity={type}
        sx={{ width: "100%" }}
      >
        {message || "Something Went Wrong."}
      </Alert>
    </Snackbar>
  );
}
