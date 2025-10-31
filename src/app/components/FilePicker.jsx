// / eslint-disable no-unused-vars /
"use client";

import React, { useEffect, useState } from "react";

import { DeleteForever, UploadFile } from "@mui/icons-material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import UploadIcon from "@mui/icons-material/Upload";
import { Box, Button, Divider, Fab, Stack, Tooltip, Typography } from "@mui/material";

import { AddIcon } from "@/assets";
import ImagePreview from "./ImagePreview";
import useImagePicker from "@/hook/useImagePicker";

const FilePicker = ({ onImageSelect = () => {}, previewImage, error, formError, showDelete = true, register, name }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { getRootProps, getInputProps, isDragActive, errors, selectedImages, setSelectedImages } = useImagePicker(true);
  const deleteImage = () => {
    setActiveImage(null);
    setSelectedImages([]);
  };

  useEffect(() => {
    if (selectedImages?.length) {
      onImageSelect(selectedImages);
      setActiveImage(0);
    }
  }, [selectedImages]);

  return (
    <>
      <Box
        sx={{
          position: "relative",
          ":hover": {
            "& .image-picker-delete-overlay": {
              scale: "1 !important",
            },
          },
          background: "#DEDEDE",
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "214px",
            border: 1,
            borderColor: error ? "#d32f2f" : "#236D7D",
            borderStyle: "dashed",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "center",
            background: "#ffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {(!!selectedImages?.length || previewImage) && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                background: "rgba(255,255,255,0.6)",
                zIndex: "999",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                scale: 0,
                transition: "0.1s",
              }}
              className="image-picker-delete-overlay"
            >
              <Stack spacing={1} direction={"row"}>
                <Tooltip title="Click to upload the file or drag and drop ">
                  <Fab color="primary" onClick={getRootProps().onClick}>
                    <UploadFile />
                  </Fab>
                </Tooltip>
                {previewImage && (
                  <Tooltip title="Open the document in a new tab.">
                    <Fab color="info" href={previewImage} target="_blank">
                      <OpenInNewIcon />
                    </Fab>
                  </Tooltip>
                )}
                {showDelete && (
                  <Fab
                    color="error"
                    onClick={() => {
                      onImageSelect(selectedImages);
                      deleteImage();
                    }}
                  >
                    <DeleteForever />
                  </Fab>
                )}
              </Stack>
            </Box>
          )}
          {selectedImages?.length || previewImage ? (
            <ImagePreview imgUrl={selectedImages[0]?.imageDataUrl || previewImage} width="100%" height={"214px"} />
          ) : (
            <>
              <Stack {...getRootProps()} justifyContent="center" width="100%" alignItems="center" spacing={1}>
                <Fab sx={{bgcolor:"secondary.main"}} size="small">
                  <UploadIcon sx={{color: "white"}} />
                </Fab>
                <Typography>Drag your file(s) to start uploading</Typography>
                <Divider style={{ width: "80%", color: "text.hint" }}>OR</Divider>

                <Button color="secondary">Browse files</Button>
                <Typography variant="caption" color="text.hint">
                  Only support .jpg, .png and .jpeg
                </Typography>
              </Stack>
              <input {...getInputProps()} id="pickerInput" />
            </>
          )}
        </Box>
      </Box>
      {(error || errors) && (
        <Typography color="error" mt={0.5} fontSize="13px">
          {error || errors}
        </Typography>
      )}
    </>
  );
};

export default FilePicker;