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

const SignupPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderComponent />
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Create an Account
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  className="mt-1 block w-full"
                />
              </div>
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
                  placeholder="Create a password"
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your password"
                  required
                  className="mt-1 block w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <div className="text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <span
                  className="cursor-pointer text-blue-600 hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Log in
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

export default SignupPage;
