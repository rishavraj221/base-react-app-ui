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

  const handleAskRelogin = (message) => {
    dispatch(
      pushToast({
        message,
        severity: "error",
      })
    );

    router.push("/auth/login");
  };

  const handleTokenRefresh = useCallback(async () => {
    try {
      const result = await refreshToken({
        email: jwtDecode(localStorage.getItem("id-token"))?.email,
        refreshToken: localStorage.getItem("refresh-token"),
      }).unwrap();

      if (result?.data) {
        localStorage.setItem(
          "id-token",
          result.data?.AuthenticationResult?.IdToken
        );
        localStorage.setItem(
          "access-token",
          result.data?.AuthenticationResult?.AccessToken
        );

        setUser(jwtDecode(result.data?.AuthenticationResult?.IdToken));
      }
    } catch (err) {
      console.log(err);

      handleAskRelogin("Session expired, kindly login again.");
    }
  }, []);

  useEffect(() => {
    // condition to verify if the token is not expired
    const idToken = localStorage.getItem("id-token");

    if (!idToken) handleAskRelogin("Unauthorized, kindly login.");
    else if (jwtDecode(idToken).exp * 1000 <= Date.now()) {
      handleTokenRefresh();
    }
  }, []);

  if (isLoading) return <div>refreshing session ...</div>;

  return <>{children}</>;
};

export default AuthenticatedPageContainer;
