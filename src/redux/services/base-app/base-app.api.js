import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  signupEPFactory,
  verifyEPFactory,
  loginEPFactory,
  refreshTokenEPFactory,
  logoutEPFactory,
} from "./endpoints";
import { API_BASE_URL } from "@/settings";

export const baseApi = createApi({
  reducerPath: "baseApi",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  endpoints: (builder) => ({
    signup: signupEPFactory(builder),
    verify: verifyEPFactory(builder),
    login: loginEPFactory(builder),
    refreshToken: refreshTokenEPFactory(builder),
    logout: logoutEPFactory(builder),
  }),
});

export const {
  useSignupMutation,
  useVerifyMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = baseApi;
