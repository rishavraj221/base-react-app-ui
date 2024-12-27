import React from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, CardContent } from "@/components/ui/card";

const socialProofData = {
  headline: "Trusted by Over 10,000 Happy Customers",
  subheadline: "With a 98% satisfaction rate, our community is thriving.",
  testimonials: [
    {
      name: "John Doe",
      feedback:
        "This product changed my life! The quality and support are outstanding.",
      image: "/13.png",
    },
    {
      name: "Jane Smith",
      feedback:
        "A wonderful experience from start to finish. Highly recommend!",
      image: "/14.png",
    },
    {
      name: "Jack Ma",
      feedback: "A wonderful experience from start to finish. Good to have!",
      image: "/15.png",
    },
  ],
  awards: [
    { name: "Best Product 2023", logo: "/iso_cert.png" },
    {
      name: "Innovative Design Award",
      logo: "/soc_cert.png",
    },
  ],
  explore: {
    title: "Explore our case studies",
    href: "/case-studies",
  },
};

const HomeSocialProofComponent = () => {
  const navigate = useNavigate();

  return (
    <section className="social-proof-section bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-[1000px]">
        {/* Headline */}
        <h2 className="mb-8 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {socialProofData.headline}
        </h2>
        <p className="mb-12 text-center text-base text-gray-700 sm:text-lg">
          {socialProofData.subheadline}
        </p>

        {/* Testimonials */}
        <div className="testimonials mb-16 flex grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {socialProofData.testimonials.map((testimonial, index) => (
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
                    {testimonial.role}
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
          {socialProofData.awards.map((award, index) => (
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
            onClick={() => navigate(socialProofData.explore.href)}
            className="cursor-pointer text-blue-500 underline transition hover:text-blue-700"
          >
            {socialProofData.explore.title}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSocialProofComponent;
