"use client";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Box, Avatar, CircularProgress } from "@mui/material";
import { CameraAltOutlined } from "@mui/icons-material";
import { useState } from "react";
import { useToast } from "../context/ToastContext";
import ApiManager from "@/helper/api-manager";
import { setUser } from "@/store/reducer";

const AvatarWithImageUpload = ({
  src,
  width=120,
  height=120,
  alt,
  size,
  path = "users",
}) => {
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.appReducer);
  return (
    <Box sx={{ position: "relative" }}>
      <Avatar
        alt={alt || "User"}
        src={src || "https://via.placeholder.com/150"}
        sx={{ width: width, height: height }}
      />
      <IconButton
        sx={{
          position: "absolute",
          bottom: -8,
          right: -8,
          backgroundColor: "white",
          border: "1px solid #e0e0e0",
          padding: "4px",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
        component="label"
      >
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={async (e) => {
            const file = e?.target?.files[0];
            if (file) {
              const formData = new FormData();
              formData.append("profile_image", file);
              try {
                setLoading(true);
                const { data } = await ApiManager({
                  path: path,
                  method: "put",
                  params: formData,
                  header: {
                    "Content-Type": "multipart/form-data",
                  },
                });
                dispatch(
                  setUser({
                    ...user,
                    profile_image: data.response.details.profile_image,
                  })
                );
                showToast(data?.message);
              } catch (error) {
                console.error(error);
                showToast(
                  error?.response?.data?.message || "Something went wrong",
                  "error"
                );
              } finally {
                setLoading(false);
              }
            }
          }}
        />
        {loading ? (
          <CircularProgress size={16} />
        ) : (
          <CameraAltOutlined sx={{ fontSize: 16 }} />
        )}
      </IconButton>
    </Box>
  );
};

export default AvatarWithImageUpload;
