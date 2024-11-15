"use client";

import localFont from "next/font/local";

import "./globals.css";
import { AppProvider } from "../context/AppContext.js";
import { Provider } from "react-redux";
import store from "@/redux";
import AlertHandler from "@/redux/handler/alert";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Lean AI</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider store={store}>
          <AppProvider>
            <AlertHandler />
            {children}
          </AppProvider>
        </Provider>
      </body>
    </html>
  );
}
