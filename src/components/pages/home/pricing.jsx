import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const pricingData = {
  heading: "Choose Your Plan",
  subheading: "Save 20% with annual billing. No hidden fees, cancel anytime.",
  switchText: {
    prefix: "Monthly",
    postfix: "Annual",
  },
  plans: [
    {
      name: "Basic",
      type: "number",
      price: 10,
      annualPrice: 8,
      features: ["Feature 1", "Feature 2", "Feature 3"],
    },
    {
      name: "Pro",
      type: "number",
      price: 20,
      annualPrice: 16,
      features: ["Feature A", "Feature B", "Feature C"],
    },
    {
      name: "Enterprise",
      type: "text",
      price: "Contact Us",
      annualPrice: "Contact Us",
      features: ["Custom Feature 1", "Custom Feature 2", "Priority Support"],
    },
  ],
  mostPopular: {
    planName: "Pro",
    text: "Most Popular",
  },
};

const HomePricingComponent = () => {
  const navigate = useNavigate();
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 py-16 text-gray-800">
      <div className="container mx-auto max-w-[1000px] px-6">
        {/* Heading */}
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {pricingData.heading}
        </h2>
        <p className="mb-8 text-center text-base text-gray-600 sm:text-lg">
          {pricingData.subheading}
        </p>

        {/* Toggle Switch */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <span className="font-medium text-gray-700">
            {pricingData.switchText.prefix}
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={setIsAnnual}
            className="transition-transform"
          />
          <span className="font-medium text-gray-700">
            {pricingData.switchText.postfix}
          </span>
        </div>

        {/* Plans */}
        <div className="flex flex-wrap justify-center gap-6">
          {pricingData.plans.map((plan) => (
            <div
              key={plan.name}
              className={`w-full max-w-[300px] rounded-lg border ${
                plan.name === "Pro"
                  ? "border-teal-600 shadow-xl"
                  : "border-gray-200 shadow-md"
              } transition-transform hover:scale-105`}
            >
              <div className="p-6 text-center">
                <h3
                  className={`text-2xl font-semibold ${
                    plan.name === "Pro" ? "text-teal-600" : "text-gray-600"
                  }`}
                >
                  {plan.name}
                </h3>
                <p className="mt-2 text-3xl font-bold text-gray-800">
                  {plan.type === "number"
                    ? `$${isAnnual ? plan.annualPrice : plan.price} / month`
                    : `${plan.price}`}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {plan.type === "number"
                    ? isAnnual
                      ? "billed annually"
                      : "billed monthly"
                    : "."}
                </p>
              </div>

              {/* Features List */}
              <ul className="space-y-4 border-t p-6">
                {plan.features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="h-5 w-5 text-teal-600"
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <div className="px-6 pb-6 text-center">
                <Button
                  variant={
                    plan.name === pricingData.mostPopular.planName
                      ? "default"
                      : "outline"
                  }
                  className="w-full"
                >
                  {plan.name === pricingData.mostPopular.planName
                    ? "Get Started"
                    : `Choose ${plan.name}`}
                </Button>
                {plan.name === pricingData.mostPopular.planName && (
                  <p className="mt-2 text-sm font-medium text-teal-600">
                    {pricingData.mostPopular.text}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Need help deciding?{" "}
            <span
              onClick={() => navigate("/#contact-us")}
              className="cursor-pointer font-medium text-teal-600 underline"
            >
              Contact us
            </span>{" "}
            for a custom plan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomePricingComponent;
