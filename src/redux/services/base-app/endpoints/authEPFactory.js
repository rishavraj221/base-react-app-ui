export const signup = (builder) =>
  builder.mutation({
    query: ({ body }) => ({
      url: "auth/signup",
      method: "POST",
      body,
    }),
  });

export const verify = (builder) =>
  builder.mutation({
    query: ({ email, confirmationCode }) => ({
      url: "auth/verify",
      method: "POST",
      body: {
        email,
        confirmationCode,
      },
    }),
  });

export const login = (builder) =>
  builder.mutation({
    query: ({ email, password }) => ({
      url: "auth/login",
      method: "POST",
      body: {
        email,
        password,
      },
    }),
  });

export const refreshToken = (builder) =>
  builder.mutation({
    query: ({ email, refreshToken }) => ({
      url: "auth/refresh-token",
      method: "POST",
      body: {
        email,
        refreshToken,
      },
    }),
  });

export const logout = (builder) =>
  builder.mutation({
    query: ({ accessToken }) => ({
      url: "auth/logout",
      method: "POST",
      body: {
        accessToken,
      },
    }),
  });
