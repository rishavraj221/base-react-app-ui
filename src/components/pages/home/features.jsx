import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faCog,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const componentData = {
  title: "Discover Our Key Benefits",
  cards: [
    {
      icon: faCheckCircle,
      title: "Feature Title 1",
      features: [
        "Empowers users with intuitive design",
        "Enables customization to fit specific needs",
        "Maintains high security and privacy standards",
      ],
    },
    {
      icon: faCog,
      title: "Seamless Integration",
      features: [
        "Integrates easily with existing tools and platforms",
        "Provides API access for advanced customization",
        "Supports multiple third-party services for extended functionality",
      ],
    },
    {
      icon: faShieldAlt,
      title: "Collaborative Tools",
      features: [
        "Facilitates real-time collaboration across teams",
        "Supports role-based access and permissions",
        "Offers shared workspaces for better team coordination",
      ],
    },
  ],
};

const HomeFeaturesComponent = () => {
  return (
    <section id="features" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="m-auto flex max-w-[1000px] flex-col items-center">
        {/* Section Title */}
        <h2 className="mb-12 text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {componentData.title}
        </h2>

        {/* Features Cards */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {componentData.cards.map((fd, i) => (
            <Card
              key={i}
              className="flex max-w-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 px-6 py-8 transition-shadow duration-300 ease-in-out hover:shadow-2xl"
            >
              <CardHeader className="mb-4 text-center">
                {/* Icon */}
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
                  <FontAwesomeIcon icon={fd.icon} size="lg" />
                </div>

                {/* Title */}
                <CardTitle className="text-lg font-semibold text-gray-800 sm:text-xl">
                  {fd.title}
                </CardTitle>
              </CardHeader>

              {/* Content */}
              <CardContent className="text-gray-600">
                <ul className="list-disc space-y-2 px-4 text-sm sm:text-base">
                  {fd.features.map((fdf, j) => (
                    <li key={j}>{fdf}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeFeaturesComponent;
