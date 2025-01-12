import React from "react";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const componentData = {
  headline: "About Us",
  diary: [
    {
      title: "Our Mission",
      subtitle:
        "To empower users with a multi-agent software that continuously tracks and extracts information from various sources, providing results in the formats and channels of their choice.",
      image: "mission.svg",
    },
    {
      title: "Our Story",
      subtitle:
        "Founded by three innovators from prestigious institutions including Trinity College and IITM, Source Bot was created to solve the challenges faced in building comprehensive applications for information extraction and tracking.",
      image: "story.svg",
    },
  ],
  foundersData: [
    {
      name: "Mayank Sharma",
      image: "16.png",
      role: "Scientist turned entrepreneur, dedicated to innovation in software development.",
    },
    {
      name: "Ishani Bhushan",
      image: "14.png",
      role: "A visionary leader with a commitment to building impactful technology solutions.",
    },
    {
      name: "Rishav Raj",
      image: "13.png",
      role: "Alumnus of IITM, bringing extensive experience in tech and innovation.",
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
