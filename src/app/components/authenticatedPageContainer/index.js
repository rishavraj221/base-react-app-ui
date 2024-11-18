/**
 * AuthenticatedPageContainer is a higher-order component designed to protect
 * pages by ensuring the user is authenticated and has valid session tokens.
 * If the session is expired, it attempts refreshing the tokens, otherwise
 * navigates the user to the login page with appropriate messaging.
 */

import React, { useCallback, useEffect } from "react";
import { useStorage } from "@/context/AppContext";
import { pushToast } from "@/redux/reducers/toast";
import { useRefreshTokenMutation } from "@/redux/services/base-app";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const AuthenticatedPageContainer = ({ children }) => {
  const { user, setUser } = useStorage();
  const router = useRouter();
  const dispatch = useDispatch();
  const [refreshToken, { isLoading, error }] = useRefreshTokenMutation();

  /**
   * Prompts a relogin by displaying a toast message and navigating to the login page.
   *
   * @param {string} message - The message to display in the toast notification.
   */
  const handleAskRelogin = (message) => {
    dispatch(
      pushToast({
        message,
        severity: "error",
      })
    );

    router.push("/auth/login");
  };

  /**
   * Refreshes the authentication tokens using the stored refresh token.
   * On success, updates the local storage and user context with the new tokens and user information.
   * On failure, calls handleAskRelogin to notify the user and redirect them to login.
   */
  const handleTokenRefresh = useCallback(async () => {
    try {
      const result = await refreshToken({
        email: jwtDecode(localStorage.getItem("id-token"))?.email,
        refreshToken: localStorage.getItem("refresh-token"),
      }).unwrap();

      if (result?.data) {
        const authResult = result.data?.AuthenticationResult;

        localStorage.setItem("id-token", authResult?.IdToken);
        localStorage.setItem("access-token", authResult?.AccessToken);

        setUser(jwtDecode(authResult?.IdToken));
      }
    } catch (err) {
      console.error("Token refresh error:", err); // Improved error logging
      handleAskRelogin("Session expired, kindly login again.");
    }
  }, [refreshToken, setUser]);

  useEffect(() => {
    // Check if the ID token is present and not expired
    const idToken = localStorage.getItem("id-token");

    if (!idToken) {
      handleAskRelogin("Unauthorized, kindly login.");
    } else {
      const decodedToken = jwtDecode(idToken);
      if (decodedToken.exp * 1000 <= Date.now()) {
        handleTokenRefresh();
      }
    }
  }, [handleTokenRefresh]);

  if (isLoading) return <div>Refreshing session...</div>; // Consistent capitalization

  return <>{children}</>;
};

export default AuthenticatedPageContainer;
