// contexts/ModalContext.js
import React, { createContext, useContext, useState } from "react";
import { Modal, Box, Typography, Button, Stack } from "@mui/material";

const ModalContext = createContext();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  // p: 4,
  borderRadius: 2,
  pt: 4,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
};

export const ModalProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalProps, setModalProps] = useState({
    title: "",
    description: "",
    onAccept: () => {},
    onClose: () => {},
  });

  const showModal = (props) => {
    setModalProps(props);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleAccept = async () => {
    setLoading(true);
    await modalProps.onAccept();
    setLoading(false);
    // hideModal();
  };

  const handleClose = async () => {
    setLoading(true);
    await modalProps.onClose();
    hideModal();
    setLoading(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography
            fontWeight={"bold"}
            id="modal-title"
            variant="h6"
            component="h2"
            mb={2}
          >
            {modalProps.title}
          </Typography>
          <Typography
            textAlign={"center"}
            id="modal-description"
            sx={{ mb: 3 }}
          >
            {modalProps.description}
          </Typography>
          <Stack direction="column" width={"100%"} height={"55px"}>
            <Box
              sx={{
                width: "100%",
                height: "1px",
                backgroundColor: "divider",
              }}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              width={"100%"}
              height={"55px"}
            >
              <Button
                sx={{ width: "50%" }}
                variant="text"
                onClick={handleAccept}
                disabled={loading}
                loading={loading}
              >
                Confirm
              </Button>
              <Box
                sx={{
                  width: "1px",
                  height: "100%",
                  backgroundColor: "divider",
                }}
              />
              <Button
                sx={{ width: "50%" }}
                variant="text"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
