import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Rating,
  TextField,
  Button,
  Avatar,
  Fade,
  Backdrop,
  Snackbar,
  Alert,
} from "@mui/material";

const labels = {
  1: "Very Bad",
  2: "Poor",
  3: "Average",
  4: "Good",
  5: "Excellent",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const ReviewModal = ({ open, onClose, onSubmit, user = {}, loading }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(-1);
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    onSubmit({ rating, review });
    setSuccess(true);
    setRating(0);
    setReview("");
  };

  const handleCloseSnackbar = () => setSuccess(false);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 300 }}
      >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <Box display="flex" alignItems="center" mb={2}>
              <Avatar
                src={user.profile_image || "s"}
                alt={user?.full_name?.toUpperCase()}
                sx={{ mr: 2 }}
              />
              <Typography variant="h6">{user.name || "Your Review"}</Typography>
            </Box>

            <Box display="flex" alignItems="center" mb={1}>
              <Rating
                name="hover-feedback"
                value={rating}
                precision={1}
                onChange={(event, newValue) => setRating(newValue)}
                onChangeActive={(event, newHover) => setHover(newHover)}
              />
              {rating !== null && (
                <Box sx={{ ml: 2 }}>
                  {labels[hover !== -1 ? hover : rating]}
                </Box>
              )}
            </Box>

            <TextField
              fullWidth
              multiline
              rows={4}
              margin="normal"
              label="Write your review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              variant="outlined"
            />

            <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                disabled={rating === 0 || review.trim() === ""}
                loading={loading}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Review submitted successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default ReviewModal;
