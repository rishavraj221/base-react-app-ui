import React from "react";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const componentData = {
  headline: "About Us",
  diary: [
    {
      title: "Our Mission",
      subtitle:
        "To lead innovation in the tech industry with creativity and passion, staying ahead of technological advancements to deliver unrivaled solutions.",
      image: "mission.svg",
    },
    {
      title: "Our Story",
      subtitle:
        "Established in 2000, we have expanded from a small tech firm to a global technology leader, committed to making a difference through innovative solutions.",
      image: "story.svg",
    },
  ],
  foundersData: [
    {
      name: "Founder1",
      image: "16.png",
      role: "CEO - Steering the company with strategic foresight.",
    },
    {
      name: "Founder2",
      image: "14.png",
      role: "CTO - Leading technological innovations with a forefront vision.",
    },
    {
      name: "Founder3",
      image: "15.png",
      role: "COO - Managing operations efficiently to achieve excellence.",
    },
  ],
};

const HomeAboutUs = () => {
  return (
    <section
      id="about-us"
      className="bg-gradient-to-r from-gray-50 via-white to-gray-100 py-16"
    >
      <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
          {componentData.headline}
        </h2>

        {componentData.diary.map((aud, i) => (
          <div
            key={i}
            className={`mb-16 flex flex-col ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } items-center justify-between gap-8`}
          >
            <div className="flex-1">
              <Card className="transform rounded-lg bg-white p-4 shadow-md transition hover:translate-y-2">
                <CardHeader>
                  <h3 className="text-xl font-semibold text-gray-800 md:text-2xl">
                    {aud.title}
                  </h3>
                </CardHeader>
                <CardContent className="md:text-md mt-2 text-sm text-gray-600">
                  <p>{aud.subtitle}</p>
                </CardContent>
              </Card>
            </div>
            <img
              src={aud.image}
              alt={aud.title}
              className="h-[200px] w-[250px] rounded-md object-cover md:h-[250px] md:w-[400px]"
            />
          </div>
        ))}

        <div className="flex flex-col items-center justify-center">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {componentData.foundersData.map((founder, index) => (
              <Card
                key={index}
                className="max-w-[400px] transform rounded-lg bg-white p-6 shadow-md transition hover:translate-y-2 hover:shadow-xl"
              >
                <div className="-mt-12 flex items-center justify-center">
                  <img
                    src={founder.image}
                    alt={`founder_img_${index + 1}`}
                    className="h-20 w-20 rounded-full border-4 border-white shadow-lg md:h-24 md:w-24"
                  />
                </div>
                <CardHeader className="mt-6 text-center">
                  <CardTitle className="text-lg font-bold text-gray-800 md:text-xl">
                    {founder.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-4 text-center text-gray-600">
                  <p>{founder.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAboutUs;
