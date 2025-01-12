import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

const componentData = {
  headline: "Empowering Development Teams Worldwide",
  subheadline: "Join over 15,000 teams achieving success with SDLC Builder.",
  testimonials: [
    {
      name: "Alice Johnson",
      feedback: "SDLC Builder transformed our workflow! The efficiency is remarkable.",
      image: "/alice.png",
    },
    {
      name: "Michael Brown",
      feedback: "We streamlined our processes significantly. Highly useful tool for developers!",
      image: "/michael.png",
    },
    {
      name: "Sara Wilson",
      feedback: "A game-changer for team collaboration. We can now complete projects faster.",
      image: "/sara.png",
    },
  ],
  awards: [
    { name: "Best DevOps Tool 2023", logo: "/devops_award.png" },
    { name: "Most Innovative Software", logo: "/innovation_award.png" },
  ],
  explore: {
    title: "Discover our success stories",
    href: "/success-stories",
  },
};

const HomeSocialProofComponent = () => {
  const navigate = useNavigate();

  return (
    <section className="social-proof-section bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-[1000px]">
        {/* Headline */}
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {componentData.headline}
        </h2>
        <p className="mb-12 text-center text-base text-gray-700 sm:text-lg">
          {componentData.subheadline}
        </p>

        {/* Testimonials */}
        <div className="testimonials mb-16 flex grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {componentData.testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="flex max-w-[400px] flex-col overflow-hidden rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105"
            >
              <CardHeader className="mb-4 flex items-center border-b pb-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}`}
                  className="h-16 w-16 rounded-full object-cover"
                />
                <div>
                  <div className="mt-4 text-center text-lg font-semibold text-gray-800">
                    {testimonial.name}
                  </div>
                  <span className="text-sm text-gray-500">
                    Developer
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="italic text-gray-600">"{testimonial.feedback}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Awards Section */}
        <div className="awards mb-16 flex flex-row items-center justify-center gap-8">
          {componentData.awards.map((award, index) => (
            <div
              key={index}
              className="award flex max-w-[120px] flex-col items-center text-center"
            >
              <img
                src={award.logo}
                alt={`${award.name} logo`}
                className="mb-2 h-12 w-12 object-contain"
              />
              <span className="text-sm text-gray-600">{award.name}</span>
            </div>
          ))}
        </div>

        {/* Explore Case Studies */}
        <div className="case-studies text-center">
          <div
            onClick={() => navigate(componentData.explore.href)}
            className="cursor-pointer text-blue-500 underline transition hover:text-blue-700"
          >
            {componentData.explore.title}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSocialProofComponent;