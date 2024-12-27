import React from "react";

const heroData = {
  headline: "Revolutionize Your Workflow",
  subheadine:
    "Simplify your tasks and maximize productivity with our innovative solutions, designed for modern teams.",
  heroMedia: {
    type: "image",
    src: "/hero.svg",
    alt: "Hero Visual",
  },
  ctaButton: {
    title: "Get Started",
    onClick: () => {},
  },
  trustedLogos: [
    {
      src: "/logo1.svg",
      alt: "Logo1",
    },
    {
      src: "/logo2.svg",
      alt: "Logo2",
    },
    {
      src: "/logo3.svg",
      alt: "Logo3",
    },
  ],
  trustedText: "Trusted by 10,000+ customers",
};

const HomeHeroComponent = () => {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto flex max-w-[1000px] flex-col-reverse items-center py-16 md:flex-row">
        <div className="w-full text-center md:w-1/2 md:text-left">
          <h1 className="mb-6 text-3xl font-extrabold leading-snug text-gray-800 sm:text-4xl md:text-5xl md:leading-tight">
            {heroData.headline}
          </h1>
          <p className="mb-6 text-base text-gray-600 sm:text-lg">
            {heroData.subheadine}
          </p>
          <button
            className="rounded-full bg-gray-900 px-6 py-3 text-white shadow-lg transition-transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
            onClick={heroData.ctaButton.onClick}
          >
            {heroData.ctaButton.title}
          </button>
          <div className="mt-8 flex items-center justify-center space-x-4 md:justify-start">
            {heroData.trustedLogos.map((tl, i) => (
              <img key={i} src={tl.src} alt={tl.alt} className="h-8" />
            ))}
            <span className="text-sm text-gray-500">
              {heroData.trustedText}
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          {heroData.heroMedia.type === "image" && (
            <img
              src={heroData.heroMedia.src}
              alt={heroData.heroMedia.alt}
              className="mx-auto h-[200px] w-[200px] md:w-full"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeHeroComponent;
