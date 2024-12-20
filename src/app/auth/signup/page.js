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
import { useSignupMutation } from "@/redux/services/base-app";
import { useStorage } from "@/context/AppContext";
import UnauthenticatedPageContainer from "@/app/components/unAuthenticatedPageContainer";

// Validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const SignupForm = () => {
  const router = useRouter();
  const { setUser } = useStorage();

  const [signUpUser, { isLoading, error }] = useSignupMutation();

  const handleSignUp = async (values) => {
    try {
      const result = await signUpUser({ body: { ...values } }).unwrap();

      if (result?.data?.CodeDeliveryDetails) {
        setUser({
          email: values.email,
          password: values.password,
        });

        router.push("/auth/verify");
      }
    } catch (err) {
      console.log("Signup failed:", err);
    }
  };

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
            Sign Up
          </Typography>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
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
                  label="Name"
                  name="name"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
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
                <TextField
                  label="Confirm Password"
                  name="confirm_password"
                  type="password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirm_password && Boolean(errors.confirm_password)
                  }
                  helperText={
                    touched.confirm_password && errors.confirm_password
                  }
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  loading={isLoading}
                >
                  Continue
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
              Already have an account?
            </Typography>
            <Button
              variant="text"
              color="primary"
              sx={{ ml: 1 }}
              onClick={() => {
                // Navigate to login page
                router.push("/auth/login");
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </UnauthenticatedPageContainer>
  );
};

export default SignupForm;
