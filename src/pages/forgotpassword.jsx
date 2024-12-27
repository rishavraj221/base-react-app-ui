import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import HeaderComponent from "@/components/app/header";
import FooterComponent from "@/components/app/footer";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Call API to send OTP
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Call API to verify OTP
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // Call API to reset password
    // Redirect to login page after success
    window.location.href = "/login";
  };

  return (
    <>
      <HeaderComponent />

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Forgot Password
            </CardTitle>
          </CardHeader>

          <CardContent>
            {step === 1 && (
              <>
                <p className="mb-4 text-center text-gray-600">
                  Enter your email address and we'll send you an OTP to reset
                  your password.
                </p>
                <form className="space-y-4" onSubmit={handleEmailSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="mt-1 block w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Send OTP
                  </Button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <p className="mb-4 text-center text-gray-600">
                  Enter the 6-digit OTP sent to your email.
                </p>
                <form className="space-y-4" onSubmit={handleOtpSubmit}>
                  <div>
                    <label
                      htmlFor="otp"
                      className="block text-sm font-medium text-gray-700"
                    >
                      OTP
                    </label>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <InputOTP
                        maxLength={6}
                        //   pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={otp}
                        onChange={(value) => setOtp(value)}
                        className="mt-1 block w-full"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <p className="mb-4 text-center text-gray-600">
                  Enter your new password.
                </p>
                <form className="space-y-4" onSubmit={handlePasswordSubmit}>
                  <div>
                    <label
                      htmlFor="new-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      New Password
                    </label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="mt-1 block w-full"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirm-password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm New Password
                    </label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1 block w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </form>
              </>
            )}
          </CardContent>

          <CardFooter>
            <div className="text-center">
              {step === 1 && (
                <p className="text-sm text-gray-600">
                  Remembered your password?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    Log in
                  </span>
                </p>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>

      <FooterComponent />
    </>
  );
};

export default ForgotPasswordPage;
