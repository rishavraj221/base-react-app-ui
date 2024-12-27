import React from "react";

import HeaderComponent from "@/components/app/header";
import FooterComponent from "@/components/app/footer";
import HomeHeroComponent from "@/components/pages/home/hero";
import HomeFeaturesComponent from "@/components/pages/home/features";
import HomeSocialProofComponent from "@/components/pages/home/socialProof";
import HomeAboutUs from "@/components/pages/home/aboutUs";
import HomePricingComponent from "@/components/pages/home/pricing";
import HomeContactUsComponent from "@/components/pages/home/contactUs";
import HomeFAQComponent from "@/components/pages/home/faq";

const pageData = {
  components: [
    {
      name: "Header",
      render: <HeaderComponent />,
    },
    {
      name: "Hero",
      render: <HomeHeroComponent />,
    },
    {
      name: "Features",
      render: <HomeFeaturesComponent />,
    },
    {
      name: "SocialProof",
      render: <HomeSocialProofComponent />,
    },
    {
      name: "AboutUs",
      render: <HomeAboutUs />,
    },
    {
      name: "Pricing",
      render: <HomePricingComponent />,
    },
    {
      name: "ContactUs",
      render: <HomeContactUsComponent />,
    },
    {
      name: "FAQ",
      render: <HomeFAQComponent />,
    },
    {
      name: "Footer",
      render: <FooterComponent />,
    },
  ],
};

const LandingPage = () => {
  return (
    <div>
      {pageData.components.map((pd, i) => {
        return pd.render;
      })}
    </div>
  );
};

export default LandingPage;
