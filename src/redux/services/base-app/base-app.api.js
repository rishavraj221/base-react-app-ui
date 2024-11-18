/**
 * Authentication API module using Redux Toolkit's createApi.
 * 
 * This module is designed to handle user authentication processes including signup, verification, login, 
 * refreshing tokens, and logout operations. It leverages the Redux Toolkit's 'createApi' feature for 
 * managing API interactions with a clean and maintainable approach.
 * 
 * The API endpoints are defined using factory functions imported from 'endpoints'. Each endpoint 
 * represents a specific user action and is tailored for typical authentication workflows.
 * 
 * API_BASE_URL defines the root URL for all requests, ensuring all endpoints interact with 
 * the appropriate backend services.
 * 
 * The baseApi object is created which includes:
 * - reducerPath: Identifies the specific slice in the Redux store for this API.
 * - tagTypes: Helps in caching and invalidating data in the store. 'user' is used 
 *   for tagging cache related to user data.
 * - baseQuery: Configures the base URL for all endpoint requests.
 * - endpoints: Defines a set of user-authentication related endpoints.
 * 
 * Usage:
 * This API is integrated into React components using hooks like useSignupMutation, 
 * useVerifyMutation, and others. These hooks allow components to initiate the corresponding 
 * API request and access the result and request status.
 */

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
  reducerPath: "baseApi", // Path in the Redux store
  tagTypes: ["user"], // Caching tags for efficient store management
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL, // Sets the base URL for API requests
  }),
  endpoints: (builder) => ({
    // Factory functions that create endpoint definition
    signup: signupEPFactory(builder),
    verify: verifyEPFactory(builder),
    login: loginEPFactory(builder),
    refreshToken: refreshTokenEPFactory(builder),
    logout: logoutEPFactory(builder),
  }),
});

// Hooks generated to be used in React components for performing specific API actions.
export const {
  useSignupMutation,
  useVerifyMutation,
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
} = baseApi;
