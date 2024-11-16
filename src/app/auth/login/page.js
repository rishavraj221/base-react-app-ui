"use client";

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

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

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

      localStorage.setItem(
        "id-token",
        result.data?.AuthenticationResult?.IdToken
      );
      localStorage.setItem(
        "access-token",
        result.data?.AuthenticationResult?.AccessToken
      );
      localStorage.setItem(
        "refresh-token",
        result.data?.AuthenticationResult?.RefreshToken
      );

      setUser(jwtDecode(result.data?.AuthenticationResult?.IdToken));

      router.push("/game");
    }
  } catch (err) {
    console.log(err);
  }
};

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
                // Navigate to login page
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
