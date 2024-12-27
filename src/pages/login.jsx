import React from "react";
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
import HeaderComponent from "@/components/app/header";
import FooterComponent from "@/components/app/footer";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />

      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
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
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div className="text-right">
                <span
                  className="cursor-pointer text-sm text-blue-600 hover:underline"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </span>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => navigate("/signup")}
                >
                  Sign up
                </span>
              </p>
            </div>
          </CardFooter>
        </Card>
      </div>

      <FooterComponent />
    </>
  );
};

export default LoginPage;
