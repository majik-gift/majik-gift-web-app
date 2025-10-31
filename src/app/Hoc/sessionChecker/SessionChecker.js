"use client";

import React, { useContext, useEffect, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { APP_TOKEN } from "@/global";
import {
  closeToast,
  handleLoader,
  setBanners,
  setProducts,
  setReviews,
  setServices,
  setTimezone,
  setToast,
  setUser,
} from "@/store/reducer";
import { Toast } from "@/pure-components";
import { Alert, Snackbar } from "@mui/material";
import Header from "@/app/components/Header";
import GetInTouch from "@/app/components/GetInTouch";
import Footer from "@/app/components/Footer";
import ApiManager from "@/helper/api-manager";
import { useGuestLogIn } from "../guestLogIn";
import { createCookie, deleteCookie } from "@/helper/cookies";
import SplashScreen from "@/app/components/SplashScreen";
import { SocketContext } from "@/shared/context/socket/socketReducer";
import useHandleForeGroundNotifications from "@/hook/useHandleForeGroundNotifications";
import useFCM from "@/hook/useFCM";

const SessionChecker = ({ children }) => {
  const dispatch = useDispatch();
  const { connectSocket, connected } = useContext(SocketContext);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useSelector((state) => state.appReducer);
  const showMessage = (type, msg) =>
    dispatch(setToast({ type: type, message: msg }));
  const path = usePathname();
  const router = useRouter();
  const shouldShowFooter = [
    "/contact-us",
    "/sign-up",
    "/log-in",
    "/opt-verification",
    "forgot-password",
    "reset-password",
  ];
  const check = !shouldShowFooter
    .map((data) => {
      const tech = path.includes(data);
      return tech;
    })
    .includes(true);
  useFCM();
  useHandleForeGroundNotifications();
  useEffect(() => {
    async function init() {
      try {
        let token = localStorage.getItem(process.env.NEXT_PUBLIC_APP_TOKEN);
        if (!token) {
          await useGuestLogIn({ dispatch });
        }
        if (token) {
          let { data } = await ApiManager({ path: "auth/me" });
          dispatch(setUser(data?.response?.details));
          // createCookie(
          //   JSON.stringify({
          //     user: data?.response?.details,
          //     access_token: data?.response?.access_token,
          //   })
          // );
          let data1 = await ApiManager({
            path: "customer/home?getFromWebApp=10",
          });
          dispatch(setReviews(data1?.data?.response?.details?.reviews));
          dispatch(setProducts(data1?.data?.response?.details?.products));
          dispatch(setBanners(data1?.data?.response?.details?.banners));
          dispatch(setServices(data1?.data?.response?.details?.services));
        }
        if (!connected) {
          console.log("socket connect horha ha");
          connectSocket();
        }
      } catch (error) {
        showMessage("error", error?.response?.data?.message);
        if (error?.response?.status === 401) {
          localStorage.removeItem(process.env.NEXT_PUBLIC_APP_TOKEN);
          router.push("/log-in");
          await deleteCookie(process.env.NEXT_PUBLIC_APP_TOKEN);
        }
      } finally {
        // Set loading to false after a timeout of 3 seconds.
        setIsLoading(false);
      }
    }
    init();
  }, []);
  const handleClose = () => {
    dispatch(closeToast());
  };
  // if (isLoading) {
  //   return <SplashScreen />;
  // }

  return (
    <>
      {toast.message && (
        <Toast
          open={true}
          message={toast.message}
          type={toast.type}
          vertical={toast?.vertical}
          horizontal={toast?.horizontal}
          duration={toast?.duration || 3000}
          handleClose={() => dispatch(closeToast())}
        />
      )}
      {/* {toast?.message && (
        <Snackbar
          open={true}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert severity={toast.type} variant="filled" sx={{ width: "100%" }}>
            {toast.message}
          </Alert>
        </Snackbar>
      )} */}
      {/* <Loader /> */}
      {0 ? (
        <SplashScreen />
      ) : (
        <>
          <Header />
          {children}
          {check && <GetInTouch />}
          <Footer />
        </>
      )}
    </>
  );
};

export default SessionChecker;
