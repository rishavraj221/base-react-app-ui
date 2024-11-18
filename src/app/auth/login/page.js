"use client";

/**
 * This file contains the LoginForm component which provides a user login interface using React, Material UI, and Formik.
 * It validates the form input using Yup schema validation, handles user login upon form submission by interacting with
 * the Redux store and React context, and navigates the user upon successful login. Error messages are displayed appropriately.
 * This component also includes a navigation link for users to sign up if they are new.
 */

import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Box,
  Divider,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";
import { useLoginMutation } from "@/redux/services/base-app";
import { pushToast } from "@/redux/reducers/toast";
import { useDispatch } from "react-redux";
import { useStorage } from "@/context/AppContext";
import { jwtDecode } from "jwt-decode";
import UnauthenticatedPageContainer from "@/app/components/unAuthenticatedPageContainer";

// Schema for form validation using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

/**
 * Handles login logic. Authenticates user and updates application state.
 * 
 * @param {Object} values - Form values containing email and password
 * @param {Function} loginUser - Mutation function to execute user login
 * @param {Function} dispatch - Redux dispatch function to update the store
 * @param {Object} router - Next.js router object for navigation
 * @param {Function} setUser - Context function to update the user state
 */
export const handleUserLogin = async (
  values,
  loginUser,
  dispatch,
  router,
  setUser
) => {
  try {
    const result = await loginUser({ ...values }).unwrap();

    if (result?.data) {
      dispatch(
        pushToast({
          message: "Login Successful!",
          severity: "success",
        })
      );

      const { IdToken, AccessToken, RefreshToken } = result.data?.AuthenticationResult;

      localStorage.setItem("id-token", IdToken);
      localStorage.setItem("access-token", AccessToken);
      localStorage.setItem("refresh-token", RefreshToken);

      setUser(jwtDecode(IdToken));

      router.push("/game");
    }
  } catch (err) {
    // Display an error toast/message
    dispatch(
      pushToast({
        message: "Login failed. Please try again.",
        severity: "error",
      })
    );
    console.error("Login error: ", err);
  }
};

/**
 * Functional component for the Login Form.
 * Integrates with Formik for state management and MUI components for styling.
 */
const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { setUser } = useStorage();

  const [loginUser, { isLoading, error }] = useLoginMutation();

  return (
    <UnauthenticatedPageContainer>
      <Container maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 8,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Login
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) =>
              handleUserLogin(values, loginUser, dispatch, router, setUser)
            }
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  loading={isLoading}
                >
                  Login
                </LoadingButton>
              </Form>
            )}
          </Formik>

          {/* OR Divider */}
          <Divider sx={{ width: "100%", my: 3 }}>
            <Typography variant="body2" color="textSecondary">
              OR
            </Typography>
          </Divider>

          {/* Message and Button */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Typography variant="body2" color="textSecondary">
              New User?
            </Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ ml: 1 }}
              onClick={() => {
                // Navigate to signup page
                router.push("/auth/signup");
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </UnauthenticatedPageContainer>
  );
};

export default LoginForm;
