"use client";

import React from "react";
import { TextField, Typography, Container, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { useStorage } from "@/context/AppContext";
import { useLoginMutation, useVerifyMutation } from "@/redux/services/base-app";
import { pushToast } from "@/redux/reducers/toast";
import { useDispatch } from "react-redux";
import { handleUserLogin } from "../login/page";
import UnauthenticatedPageContainer from "@/app/components/unAuthenticatedPageContainer";

// Validation schema using Yup
const validationSchema = Yup.object({
  confirmationCode: Yup.string()
    .matches(
      /^\d{6}$/,
      "Confirmation code must be numeric and exactly 6 digits"
    )
    .required("Confirmation code is required"),
});

const ConfirmationCodePage = () => {
  const router = useRouter();
  const { user, setUser } = useStorage();
  const dispatch = useDispatch();

  const [verifyCode, { isLoading, error }] = useVerifyMutation();
  const [loginUser, { isLoading: isLoggingIn }] = useLoginMutation();

  const handleVerifyCode = async (values) => {
    try {
      const result = await verifyCode({
        email: user?.email,
        confirmationCode: values.confirmationCode.toString(),
      }).unwrap();

      if (result?.message) {
        dispatch(
          pushToast({
            message: "Signup successful, logging in...",
            severity: "success",
          })
        );

        await handleUserLogin(
          { email: user?.email, password: user?.password },
          loginUser,
          dispatch,
          router,
          setUser
        );
      }
    } catch (err) {
      console.log(err);
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
          <Typography variant="h5" component="h1" gutterBottom>
            Verify Your Account
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mb: 3 }}
          >
            Please enter the 6-digit confirmation code sent to your email.
          </Typography>
          <Formik
            initialValues={{ confirmationCode: "" }}
            validationSchema={validationSchema}
            onSubmit={handleVerifyCode}
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
                  label="Confirmation Code"
                  name="confirmationCode"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={values.confirmationCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.confirmationCode && Boolean(errors.confirmationCode)
                  }
                  helperText={
                    touched.confirmationCode && errors.confirmationCode
                  }
                />

                <LoadingButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                  loading={isLoading || isLoggingIn}
                >
                  Verify
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Box>
      </Container>
    </UnauthenticatedPageContainer>
  );
};

export default ConfirmationCodePage;
