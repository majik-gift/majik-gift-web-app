import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function CustomDialog({ open, setOpen, handleAgree, data }) {
  const [checkedPay, setCheckedPay] = React.useState("");
  function handleClose() {
    setOpen(false);
  }
  function handlePay(e) {
    let { name, value } = e?.target;
    if (name === "stillPay") {
      setCheckedPay(checkedPay === "stillPay" ? "" : "stillPay");
    } else if (name === "alreadyPay") {
      setCheckedPay(checkedPay === "alreadyPay" ? "" : "alreadyPay");
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        color: "black",
      }}
    >
      <DialogTitle id="alert-dialog-title">
        <Typography variant="h5" fontWeight={"SemiBold"}>
          Confirm
        </Typography>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Stack gap={2} color={"black"}>
            <Typography variant="body1">
              In order to proceed, you need to pay via{" "}
              <Link href={`https://www.paypal.me/${data}`} target="_blank">
                https://www.paypal.me/{data}
              </Link>
              , once paid take a screenshot of receipt and submit at checkout
              page
            </Typography>
            <Typography variant="h6">PayPal Handle:</Typography>
            <Stack direction={"row"}>
              <Typography variant="body1">
                {data || "--"}
              </Typography>
            </Stack>
            <Stack>
              <Stack>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="stillPay"
                      checked={checkedPay === "stillPay"}
                      onChange={handlePay}
                    />
                  }
                  label="I need to pay the seller still"
                />
              </Stack>
              <Stack direction={"row"}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="alreadyPay"
                      checked={checkedPay === "alreadyPay"}
                      onChange={handlePay}
                    />
                  }
                  label="I have already pay the seller"
                />
              </Stack>
            </Stack>
          </Stack>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          disabled={checkedPay === ""}
          onClick={() => {
            if (checkedPay === "alreadyPay") {
              handleAgree();
            } else if (checkedPay === "stillPay") {
              handleClose();
            }
          }}
          autoFocus
        >
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
}
