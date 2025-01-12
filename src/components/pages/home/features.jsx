import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faRocket,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const componentData = {
  title: "Key Benefits of SDLC Builder",
  cards: [
    {
      icon: faLightbulb,
      title: "Accelerate Development Process",
      features: [
        "Streamlines the development process, enabling faster delivery of applications.",
        "Reduces the time spent on manual tasks, allowing teams to focus on feature development.",
        "Promotes better time management, improving overall productivity.",
      ],
    },
    {
      icon: faRocket,
      title: "Efficient Testing Capabilities",
      features: [
        "Provides automated testing tools that enhance quality assurance.",
        "Facilitates continuous integration, ensuring quicker feedback and iterations.",
        "Enables teams to identify and resolve issues early in the development cycle.",
      ],
    },
    {
      icon: faUsers,
      title: "Collaboration and Communication",
      features: [
        "Encourages team collaboration, promoting better communication among members.",
        "Allows multiple team members to work simultaneously without conflicts.",
        "Integrates with project management tools for better coordination and visibility.",
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
            <CustomHoverCard key={i} data={fd} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CustomHoverCard = ({ data }) => {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const cardRect = e.currentTarget.getBoundingClientRect();
    setPosition({
      top: e.clientY - cardRect.top + 10, // Position slightly below the cursor
      left: e.clientX - cardRect.left + 10, // Position slightly to the right of the cursor
    });
  };

  return (
    <div
      className="relative flex max-w-[400px] flex-col items-center justify-center rounded-lg border border-gray-200 px-4 py-4 transition-shadow duration-300 ease-in-out hover:shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Icon and Title */}
      <div className="mb-4 p-4 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white">
          <FontAwesomeIcon icon={data.icon} size="lg" />
        </div>
        <h3 className="text-lg font-semibold text-gray-800 sm:text-xl">
          {data.title}
        </h3>
      </div>

      {/* Hover Content */}
      {isHovered && (
        <div
          className="absolute z-10 rounded-lg bg-white p-4 shadow-lg"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            // transform: "translate(-50%, -50%)",
            width: "300px",
          }}
        >
          <ul className="space-y-2">
            {data.features.map((feature, index) => (
              <li
                key={index}
                className="text-sm text-gray-700 before:mr-2 before:content-['➥']"
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HomeFeaturesComponent;
