import "./globals.css";
import Head from "next/head";
import AppProvider from "./Hoc/AppProvider/AppProvider";

export const metadata = {
  title: "Majik Gift",
  description: "Majik Gift",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />

        <title>Magik Gift</title>
      </Head>
      <body>
          <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
