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
      },
    },
    palette: {
      mode: mode,
      ...themeMode[mode],
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            // "&:last-child":
            // "&:nth-last-child(-n+2)": {
            textAlign: "center",
            // },
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
    divider: "#C4C4C4",
    background: {
      default: "#fff",
      primary: "#9C90C2",
      secondary: "#EFEDF5",
      third: "#01A43D",
      colorOfBorder: "#EBEBEB",
    },
    primary: {
      main: "#000000",
    },
    secondary: {
      main: "#D3AFC9",
      category: "#9C90C229",
      light: "#CAC4E0",
      dimLight: "#F3F3F3",
    },
    text: {
      primary: "#000", // Adjust this to your preferred primary text color
      secondary: "#3C3F43",
      dim: "#0D0D0D",
      lightGrey: "#C4C4C4",
      darkGrey: "rgba(102, 102, 102, 1)",
      heading: "#001646",
      icon: "rgba(232, 232, 233, 1)",
      success: "#06B0BA",
      danger: "#FF5252",
      paper: "#F3F4F8",
      about: "#9C90C2",
      white: "#fff",
      lightWorkerCardText: "#76726C",
      unratedStar: "#D9D9D9",
      ratedStar: "#F8BE02",
    },
    button: {
      main: "#D3AFC9",
      light: "#06B0BA",
      background: "#B9FBFF",
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
