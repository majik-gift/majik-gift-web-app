"use client";

import { useState } from "react";
import { Lato, Libre_Bodoni, Dancing_Script } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme, responsiveFontSizes } from "@mui/material";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
const libreBodoni = Libre_Bodoni({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const MuiThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  // Import your local fonts

  let theme = createTheme({
    typography: {
      fontFamily: `${lato.style.fontFamily}, ${libreBodoni.style.fontFamily}, ${dancingScript.style.fontFamily}`,
      Regular: 400,
      Medium: 500,
      SemiBold: 600,
      Bold: 700,
      ExtraBold: 900,
      button: {
        textTransform: "none",
        fontWeight: 500,
      },
    },
    palette: {
      mode: mode,
      ...themeMode[mode],
    },
    shape: {
      borderRadius: 12,
    },
    shadows: [
      'none',
      '0px 2px 8px rgba(0, 0, 0, 0.08)',
      '0px 4px 16px rgba(0, 0, 0, 0.12)',
      '0px 8px 24px rgba(0, 0, 0, 0.16)',
      '0px 12px 32px rgba(0, 0, 0, 0.2)',
      '0px 16px 40px rgba(0, 0, 0, 0.24)',
      ...Array(19).fill('0px 16px 48px rgba(0, 0, 0, 0.28)'),
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: 12,
            fontWeight: 500,
            padding: "10px 24px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.16)",
            },
            "&:active": {
              transform: "translateY(0)",
            },
          },
          contained: {
            background: "linear-gradient(135deg, #D3AFC9 0%, #9C90C2 100%)",
            "&:hover": {
              background: "linear-gradient(135deg, #B288A4 0%, #8A7AB8 100%)",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.16)",
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            textAlign: "center",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
          },
        },
      },
    },
  });

  theme = responsiveFontSizes(theme);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default MuiThemeProvider;

let themeMode = {
  light: {
    divider: "#E5E7EB",
    background: {
      default: "#FAFAFA",
      primary: "#9C90C2",
      secondary: "#F5F3F9",
      third: "#01A43D",
      colorOfBorder: "#E5E7EB",
      paper: "#FFFFFF",
    },
    primary: {
      main: "#9C90C2",
      light: "#CAC4E0",
      dark: "#7866AE",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D3AFC9",
      category: "rgba(156, 144, 194, 0.16)",
      light: "#F0DDE6",
      dimLight: "#F5F5F5",
    },
    text: {
      primary: "#1A1A1A",
      secondary: "#4B5563",
      dim: "#111827",
      lightGrey: "#9CA3AF",
      darkGrey: "#6B7280",
      heading: "#111827",
      icon: "#9CA3AF",
      success: "#10B981",
      danger: "#EF4444",
      paper: "#FFFFFF",
      about: "#9C90C2",
      white: "#FFFFFF",
      lightWorkerCardText: "#6B7280",
      unratedStar: "#D1D5DB",
      ratedStar: "#F59E0B",
    },
    button: {
      main: "#9C90C2",
      light: "#10B981",
      background: "#ECFDF5",
    },
  },
  dark: {
    divider: "rgba(70, 70, 70, 1)",
    background: {
      default: "#121212", // Dark background color
    },
    primary: {
      main: "rgb(102, 179, 255)",
    },
    secondary: {
      main: "#06B0BA",
      medium: "rgba(0, 151, 161, 1)",
      light: "#333", // Adjust this for dark mode
      dimLight: "#444", // Adjust this for dark mode
    },
    text: {
      primary: "#ffffff", // Light text for dark mode
      secondary: "#aaaaaa", // Adjust this to your preferred secondary text color
      lightGrey: "#888888",
      darkGrey: "#bbbbbb",
      heading: "#cccccc",
      icon: "rgba(232, 232, 233, 1)",
      success: "#06B0BA",
      danger: "#FF5252",
      paper: "#121212", // Adjust this for dark mode
    },
    button: {
      light: "#06B0BA",
      background: "#005D70",
    },
  },
};
