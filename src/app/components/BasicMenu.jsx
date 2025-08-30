import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaBars } from "react-icons/fa";
import {
  AccountCircleOutlined,
  AccountCircleOutlinedIcon,
  CurrencyExchangeOutlinedIcon,
  FavoriteBorderOutlinedIcon,
  FiBox,
  LogoutOutlinedIcon,
  LuBookText,
  LuBox,
  PeopleAltOutlined,
  VolunteerActivismOutlinedIcon,
} from "@/assets";
import { Avatar, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { handleLoader, logoutUser, setToast } from "@/store/reducer";
import { useDispatch, useSelector } from "react-redux";
import { deleteCookie } from "@/helper/cookies";
import ApiManager from "@/helper/api-manager";
import { useGuestLogIn } from "../Hoc/guestLogIn";
import { ChatOutlined } from "@mui/icons-material";

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((state) => state.appReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (path) => {
    handleClose();
    router.push(path);
  };

  // handleLogOut
  const handleLogout = async () => {
    let access_token = localStorage.getItem(process.env.NEXT_PUBLIC_APP_TOKEN);
    try {
      const { data } = await ApiManager({
        method: "post",
        path: "auth/sign-out",
        params: { access_token: access_token },
      });
      dispatch(logoutUser());
      deleteCookie();
      localStorage.removeItem(process.env.NEXT_PUBLIC_APP_TOKEN);
      await useGuestLogIn({ dispatch });
      dispatch(setToast({ message: data?.message, type: "success" }));
      router.push("/log-in");
    } catch (error) {
      console.log(error, "error");
      dispatch(
        setToast({ message: error?.response?.data?.message, type: "error" })
      );
    }
  };

  return (
    <div>
      {/* <FaBars
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      /> */}
      <Avatar
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        src={user?.profile_image || user?.first_name}
        alt={user?.first_name}
        sx={{ width: 35, height: 35 }}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
          <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleMenuClick("/chat")}
        >
          <ChatOutlined style={{ fontSize: "20px" }} />
          <Typography>Inbox</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleMenuClick("/my-profile")}
        >
          <AccountCircleOutlined style={{ fontSize: "20px" }} />
          <Typography>My Profile</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleMenuClick("/order-details")}
        >
          <FiBox fontSize={"20px"} />
          <Typography>My Products</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleMenuClick("/readings")}
        >
          <LuBookText fontSize={"20px"} />
          <Typography>My Readings</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleMenuClick("/subscriptions")}
        >
          <PeopleAltOutlined sx={{ width: 20 }} />
          <Typography>My Classes</Typography>
        </MenuItem>

        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleMenuClick("/group-activities")}
        >
          <VolunteerActivismOutlinedIcon fontSize={"20px"} />
          <Typography>My Group Activities</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
            width: 200,
          }}
          onClick={() => handleMenuClick("/wishlist")}
        >
          <FavoriteBorderOutlinedIcon sx={{ width: 20 }} />
          <Typography>Wishlist</Typography>
        </MenuItem>
        <MenuItem
          sx={{
            display: "flex",
            gap: 2,
          }}
          onClick={() => handleLogout()}
        >
          <LogoutOutlinedIcon sx={{ width: 20 }} />
          <Typography>Logout</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
