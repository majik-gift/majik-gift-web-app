import React, { useState } from "react";
import {
  Stack,
  Typography,
  IconButton,
  Box,
  Tooltip,
  Button,
} from "@mui/material";
import { AiFillCreditCard } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  MdCheckCircle,
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import { useModal } from "@/shared/context/ModalContext";
import ApiManager from "@/helper/api-manager";
import { setToast } from "@/store/reducer";
export default function CreditCard({ card, onClick, updateCard, setCards }) {
  const { user } = useSelector((state) => state.appReducer);
  const cardStyle = getCardStyle(card?.brand);
  let selected = card?.is_default;
  const [isExpanded, setIsExpanded] = useState(card?.is_default ? true : false);
  const { showModal, hideModal, setLoading } = useModal();
  const dispatch = useDispatch();

  const onDelete = async (id) => {
    try {
      let { data } = await ApiManager({
        path: `cards/${id}`,
        method: "delete",
      });
      setCards((prev) => prev?.filter((card) => card?.id !== id));
    } catch (error) {
      console.error("Error deleting card:", error);
      dispatch(
        setToast({
          message: "Error deleting card",
          type: "error",
        })
      );
    }
  };

  // set default card modal
  const handleShowModal = () => {
    showModal({
      title: "Default Card",
      description:
        "This card will be used as the default card for your account.",
      onAccept: async () => {
        // Add your accept logic here
        try {
          //   setLoading(true);
          let { data } = await ApiManager({
            path: `cards/${card?.id}/default`,
            method: "patch",
          });
          dispatch(
            setToast({
              message: data?.message,
              type: "success",
            })
          );
          await updateCard();
          hideModal();
        } catch (error) {
          console.error("Error setting default card:", error);
          dispatch(
            setToast({
              message: "Error setting default card",
              type: "error",
            })
          );
        } finally {
          //   setLoading(false);
        }
      },
      onClose: () => {
        // Add your close logic here
      },
    });
  };

  // delete card modal
  const handleDeleteModal = () => {
    showModal({
      title: "Delete Card",
      description: "Are you sure you want to delete this card?",
      onAccept: async () => {
        await onDelete(card?.id);
        hideModal();
      },
      onClose: () => {
    }});
  };

  return (
    <Stack
      key={card?.id}
      onClick={() => {
        setIsExpanded(!isExpanded);
      }}
      sx={{
        background: cardStyle.background,
        borderRadius: "12px",
        width: "100%",
        padding: "15px 20px",
        color: "white",
        boxShadow: selected
          ? "0 0 0 2px #fff, 0 0 0 4px #1976d2"
          : "0 4px 8px rgba(0,0,0,0.1)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.2s ease",
        minHeight: isExpanded ? "180px" : "60px",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: selected
            ? "0 0 0 2px #fff, 0 0 0 4px #1976d2"
            : "0 6px 12px rgba(0,0,0,0.15)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.1) 0%, transparent 60%)",
        },
      }}
    >
      {/* Action Buttons - Shown in both views */}
      <Stack
        direction="row"
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          zIndex: 1,
          gap: 1,
        }}
      >
        {selected && <MdCheckCircle size={16} color="#4CAF50" />}

        {!card?.is_default && (
          <Button
            variant="contained"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleShowModal();
            }}
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#fff",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.3)",
              },
              minWidth: "auto",
              padding: "4px 8px",
              display: isExpanded ? "flex" : "none",
            }}
          >
            Set Default
          </Button>
        )}

        {!card?.is_default && (
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteModal();
            }}
            sx={{
              padding: 0,
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1)",
              },
              display: isExpanded ? "flex" : "none",
            }}
          >
            <MdDelete size={24} color="#fff" />
          </IconButton>
        )}
      </Stack>

      {/* Expanded View Content */}
      <Stack
        spacing={2}
        sx={{
          opacity: isExpanded ? 1 : 0,
          transition: "opacity 0.3s ease, height 0.3s ease",
          height: isExpanded ? "auto" : 0,
          overflow: "hidden",
          pointerEvents: isExpanded ? "auto" : "none",
          marginTop: "20px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h6"
            fontFamily="Lato"
            fontWeight="Bold"
            sx={{
              color: cardStyle.logoColor,
              textShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            {cardStyle.logo}
            {selected && " (Default)"}
          </Typography>
          <AiFillCreditCard sx={{ fontSize: 32, color: cardStyle.logoColor }} />
        </Stack>

        <Stack spacing={2}>
          <Typography
            variant="h5"
            fontFamily="monospace"
            letterSpacing={2}
            sx={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
          >
            •••• •••• •••• {card?.last4}
          </Typography>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                }}
              >
                CARD HOLDER
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Lato"
                sx={{ textShadow: "0 1px 1px rgba(0,0,0,0.2)" }}
              >
                {user?.name || "CARD HOLDER"}
              </Typography>
            </Stack>
            <Stack>
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  textShadow: "0 1px 1px rgba(0,0,0,0.2)",
                }}
              >
                EXPIRES
              </Typography>
              <Typography
                variant="body2"
                fontFamily="Lato"
                sx={{ textShadow: "0 1px 1px rgba(0,0,0,0.2)" }}
              >
                {card?.exp_month?.toString().padStart(2, "0")}/
                {card?.exp_year?.toString().slice(-2)}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* Compact View Content - Conditionally rendered via styles */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 0.3s ease",
          position: "absolute",
          top: "50%",
          left: "20px",
          right: "60px",
          transform: "translateY(-50%)",
          pointerEvents: isExpanded ? "none" : "auto",
        }}
      >
        <Typography
          variant="h6"
          fontFamily="Lato"
          fontWeight="Bold"
          sx={{
            color: cardStyle.logoColor,
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          {cardStyle.logo} {selected && " (Default)"}
        </Typography>
        <Typography
          variant="body1"
          fontFamily="monospace"
          letterSpacing={1}
          sx={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)" }}
        >
          •••• {card?.last4}
        </Typography>
      </Stack>
    </Stack>
  );
}

export const getCardStyle = (brand) => {
  switch (brand?.toLowerCase()) {
    case "visa":
      return {
        background: "linear-gradient(45deg, #1a1f71 30%, #4d4dff 90%)",
        logo: "VISA",
        logoColor: "#fff",
      };
    case "mastercard":
      return {
        background: "linear-gradient(45deg, #ff5f6d 30%, #ffc371 90%)",
        logo: "MASTERCARD",
        logoColor: "#fff",
      };
    case "amex":
      return {
        background: "linear-gradient(45deg, #2E3192 30%, #1BFFFF 90%)",
        logo: "AMEX",
        logoColor: "#fff",
      };
    case "unionpay":
      return {
        background: "linear-gradient(45deg, #D40000 30%, #FF4D4D 90%)",
        logo: "UNIONPAY",
        logoColor: "#fff",
      };
    case "discover":
      return {
        background: "linear-gradient(45deg, #FF6B00 30%, #FFA366 90%)",
        logo: "DISCOVER",
        logoColor: "#fff",
      };
    case "diners":
      return {
        background: "linear-gradient(45deg, #004A98 30%, #00A1E4 90%)",
        logo: "DINERS CLUB",
        logoColor: "#fff",
      };
    case "jcb":
      return {
        background: "linear-gradient(45deg, #006CB8 30%, #00A864 90%)",
        logo: "JCB",
        logoColor: "#fff",
      };
    default:
      return {
        background: "linear-gradient(45deg, #1a237e 30%, #283593 90%)",
        logo: brand?.toUpperCase() || "CARD",
        logoColor: "#fff",
      };
  }
};
