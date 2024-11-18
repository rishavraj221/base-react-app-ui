"use client";

/**
 * File: RootLayout.jsx
 * 
 * This file defines the RootLayout component which serves as the main layout for the application.
 * It integrates font styles, context providers, and redux state management to offer a consistent
 * and structured environment for all child components. 
 * 
 * Fonts are added using the `localFont` utility, providing custom variable font support for 
 * different typography options. The application state is managed globally using Redux and custom 
 * context, ensuring scalable state management and better modularity. The component is wrapped with 
 * `Provider` for Redux store access and `AppProvider` for application-wide context management.
 */

import localFont from "next/font/local";
import "./globals.css";
import { AppProvider } from "../context/AppContext.js";
import { Provider } from "react-redux";
import store from "@/redux";
import AlertHandler from "@/redux/handler/alert";

// Define font styles using local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900"
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900"
});

/**
 * RootLayout component providing the main layout structure.
 * 
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - Child components to be rendered within this layout.
 * 
 * @returns {JSX.Element} The root layout with providers and necessary global styles.
 */
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Lean AI</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Redux provider for state management */}
        <Provider store={store}>
          {/* Custom context provider for additional app-wide state */}
          <AppProvider>
            {/* Component to manage alert messages throughout the application */}
            <AlertHandler />
            {/* Rendering child components */}
            {children}
          </AppProvider>
        </Provider>
      </body>
    </html>
  );
}
