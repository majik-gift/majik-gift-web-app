"use client";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  Avatar,
  Badge,
  Collapse,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import StartIconButton from "./StartIconButton";
import Image from "next/image";
import {
  KeyboardArrowDownIcon,
  Logo,
  NotificationsNoneOutlinedIcon,
  PiStarFourFill,
  ProfilePic,
  VscSparkleFilled,
} from "@/assets";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import BasicMenu from "./BasicMenu";
import { useDispatch, useSelector } from "react-redux";
import { KeyboardArrowDown, Rotate90DegreesCcw } from "@mui/icons-material";
import { resetFilters } from "@/store/filterSlice";

const drawerWidth = 240;
const navItems = [
  "Home",
  "Services",
  "Shop",
  "Group Activities",
  "Lightworkers",
]; //  ,'Chat'
const menuLinks = ["/", "/services", "/products", "/events", "/light-worker"]; // ,'/chat'

export default function Header(props) {
  const { user, isLogged } = useSelector((state) => state.appReducer);
  const { window } = props;
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const path = usePathname();
  const dispatch = useDispatch();
  const isActivePath = (itemPath) => {
    if (itemPath === "/") return path === itemPath; // Ensure only "/" matches exactly
    return path.startsWith(itemPath); // For other paths, allow partial matches
  };
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (anchorEl !== undefined) {
      handleClose();
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Stack alignItems={"center"} mb={3}>
        <Image src={Logo} alt="Logo" height={100} width={100} />
      </Stack>
      <Divider />
      <List>
        {navItems.map((item, key) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ justifyContent: "center", mt: 2, color: "black" }}
              onClick={() => {
                router.push(menuLinks[key]);
                handleDrawerToggle();
              }}
            >
              <Stack
                direction={"row"}
                justifyContent={"center"}
                key={key}
                alignItems={"center"}
                gap={1}
              >
                {isActivePath(menuLinks[key]) && <PiStarFourFill />}
                <Link
                  href={menuLinks[key]}
                  key={item}
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    style={{
                      color: "black",
                      textDecoration:
                        isActivePath(menuLinks[key]) && "underline",
                    }}
                    variant="body1"
                    fontWeight={"Medium"}
                    fontFamily={"Lato"}
                  >
                    {item}
                  </Typography>
                </Link>
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ display: "block" }}>
          {/* Main Pages button */}
          <ListItemButton
            id="pages-menu-button"
            aria-controls="pages-menu"
            aria-expanded={open ? "true" : "false"}
            onClick={handleClick}
            sx={{
              mx: "auto",
              width: "10rem",
              px: 2,
              py: 1.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ListItemIcon sx={{ minWidth: 36 }}>
              {isActivePath("/pages") && (
                <PiStarFourFill
                  style={{ color: "theme.palette.primary.main" }}
                />
              )}
            </ListItemIcon>
            <ListItemText
              primary="Pages"
              primaryTypographyProps={{
                fontWeight: isActivePath("/pages") ? 600 : 400,
                fontSize: "16px",
              }}
            />
            <KeyboardArrowDown
              sx={{
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          </ListItemButton>

          {/* Collapsible submenu */}
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            onClick={handleClose}
          >
            <List
              disablePadding
              sx={{
                pl: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "13rem",
              }}
            >
              <ListItemButton
                onClick={() => {
                  router.push("/pages/about-us");
                  handleClose();
                  handleDrawerToggle();
                }}
                sx={{
                  py: 1,
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                <ListItemText primary="About Us" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  router.push("/pages/why-us");
                  handleClose();
                  handleDrawerToggle();
                }}
                sx={{
                  py: 1,
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                <ListItemText primary="Why Us" />
              </ListItemButton>

              <ListItemButton
                onClick={() => {
                  router.push("/pages/contact-us");
                  handleClose();
                  handleDrawerToggle();
                }}
                sx={{
                  py: 1,
                  "&:hover": {
                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                  },
                }}
              >
                <ListItemText primary="Contact Us" />
              </ListItemButton>
            </List>
          </Collapse>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Stack>
      <AppBar
        component="nav"
        sx={{ background: "#fff", color: "#000", top: 0 }}
        position="sticky"
      >
        <Container maxWidth={"lg"} sx={{ px: "0 !important" }}>
          <Toolbar width={"100%"}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Image
                src={Logo}
                onClick={() => router.push("/")}
                style={{ cursor: "pointer" }}
                alt="Logo"
                width={60}
                height={60}
              />
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <Stack direction={"row"} gap={{ xs: 2, md: 5 }}>
                  {navItems.map((item, key) => (
                    <Stack
                      direction={"row"}
                      key={key}
                      alignItems={"center"}
                      gap={1}
                    >
                      {isActivePath(menuLinks[key]) && <PiStarFourFill />}
                      <Link
                        href={menuLinks[key]}
                        key={item}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography
                          style={{
                            color: "black",
                            textDecoration:
                              isActivePath(menuLinks[key]) && "underline",
                          }}
                          variant="body1"
                          fontWeight={"Medium"}
                          fontFamily={"Lato"}
                        >
                          {item}
                        </Typography>
                      </Link>
                    </Stack>
                  ))}
                </Stack>
              </Box>
              {isLogged && user?.role !== "guest" ? (
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  sx={{ cursor: "pointer" }}
                >
                  <IconButton LinkComponent={Link} href="/notifications">
                    {/* <Badge color="secondary" badgeContent={100}> */}
                    <NotificationsNoneOutlinedIcon />
                    {/* </Badge> */}
                  </IconButton>
                  <IconButton>
                    <BasicMenu fontSize={"small"} />
                  </IconButton>
                </Stack>
              ) : (
                <Stack direction={"row"} gap={{ xs: 1, md: 5 }}>
                  <Button
                    variant="outlined"
                    sx={{ px: 4 }}
                    style={{ fontSize: "16px", borderRadius: 0 }}
                    startIcon={<VscSparkleFilled />}
                    onClick={() => router.push("/log-in")}
                  >
                    Log In
                  </Button>
                  <StartIconButton
                    color={"#000"}
                    text={"Sign Up"}
                    onClick={() => router.push("/sign-up")}
                  />
                </Stack>
              )}
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Stack>
  );
}
