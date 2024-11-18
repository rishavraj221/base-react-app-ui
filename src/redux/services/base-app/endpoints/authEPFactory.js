/**
 * Authentication Mutations
 * 
 * This module exports a set of mutations for handling user authentication processes,
 * including signup, account verification, login, token refreshing, and logout. 
 * Each exported function uses a "builder" to construct mutations that serve as 
 * API calls to respective authentication endpoints. These functions are designed 
 * to be used with a data-fetching library that utilizes this builder pattern.
 */

export const signup = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "auth/signup", // Endpoint to create a new user account
      method: "POST",
      body, // Should include user's email, password, etc.
    }),
  });

export const verify = (builder) =>
  builder.mutation({
    query: ({ email, confirmationCode }) => ({
      url: "auth/verify", // Endpoint to verify user's account with confirmation code
      method: "POST",
      body: {
        email, // The user's email
        confirmationCode, // Code sent to user's email for verification
      },
    }),
  });

export const login = (builder) =>
  builder.mutation({
    query: ({ email, password }) => ({
      url: "auth/login", // Endpoint to authenticate user and obtain tokens
      method: "POST",
      body: {
        email, // User's email for login
        password, // User's password for login
      },
    }),
  });

export const refreshToken = (builder) =>
  builder.mutation({
    query: ({ email, refreshToken }) => ({
      url: "auth/refresh-token", // Endpoint to get a new access token using refresh token
      method: "POST",
      body: {
        email, // User's email associated with the refresh token
        refreshToken, // Token to refresh the access token
      },
    }),
  });

export const logout = (builder) =>
  builder.mutation({
    query: ({ accessToken }) => ({
      url: "auth/logout", // Endpoint to terminate user's session
      method: "POST",
      body: {
        accessToken, // Access token to be invalidated
      },
    }),
  });
