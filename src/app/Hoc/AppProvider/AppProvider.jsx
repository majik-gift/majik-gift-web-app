"use client";
import React, { Suspense, useEffect, useState } from "react";

// import { LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { MuiThemeProvider } from "@/pure-components";
import GetInTouch from "@/app/components/GetInTouch";
import Footer from "@/app/components/Footer";
import { usePathname } from "next/navigation";
import Header from "@/app/components/Header";
import { useRouter } from "next/navigation";
import { Provider, useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { store } from "@/store/store";
import ApiManager from "@/helper/api-manager";
import {
  closeToast,
  setBanners,
  setProducts,
  setReviews,
  setServices,
  setUser,
} from "@/store/reducer";
import { createCookie } from "@/helper/cookies";
import "font-awesome/css/font-awesome.min.css";
import { Alert, Snackbar } from "@mui/material";
import { useGuestLogIn } from "../guestLogIn";
import SessionChecker from "../sessionChecker/SessionChecker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { SocketProvider } from "@/shared/context/socket/SocketContext";
import { UIProvider } from "@/shared/context/UIContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import UIThemeProvider from "@/shared/theme/ThemeProvider";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ModalProvider } from "@/shared/context/ModalContext";
import { SnackbarProvider } from 'notistack';

const AppProvider = ({ children }) => {
  const authRoutes = [
    "/log-in",
    "/reset-password",
    "/forgot-password",
    "/verify-otp",
  ];
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );

  return (
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <MuiThemeProvider>
          {/* <UIThemeProvider> */}
          {/* <LocalizationProvider dateAdapter={AdapterMoment}> */}
          <Suspense>
            {/* <SnackbarProvider> */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
              >
                <UIProvider>
                  <ModalProvider>
                    <ToastProvider>
                      <SocketProvider>
                        <SessionChecker>{children}</SessionChecker>
                      </SocketProvider>
                    </ToastProvider>
                  </ModalProvider>
                </UIProvider>
              </SnackbarProvider>
            </LocalizationProvider>
            {/* <SnackbarProvider /> */}
          </Suspense>
          {/* </LocalizationProvider> */}
          {/* </UIThemeProvider> */}
        </MuiThemeProvider>
      </Provider>
    </Elements>
  );
};

export default AppProvider;
