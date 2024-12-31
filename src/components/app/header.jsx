import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const headerData = {
  logo: {
    type: "text",
    value: "Logo",
    href: "/",
  },
  navMenu: [
    {
      title: "Features",
      href: "/#features",
    },
    {
      title: "About Us",
      href: "/#about-us",
    },
    {
      title: "Contact Us",
      href: "/#contact-us",
    },
  ],
  callToActionButton: {
    title: "Login",
    href: "/login",
  },
};

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (href) => {
    // Close mobile menu on navigation
    setIsMobileMenuOpen(false);

    if (href.startsWith("/")) navigate(href);
    else window.location.href = href;
  };

  const handleSmoothScroll = (href) => {
    const targetId = href.split("#")[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      handleNavigation(href);
    }
  };

  return (
    <>
      <header className="px-6 py-4 shadow-md">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between">
          {headerData.logo.type === "text" && (
            <div
              className="cursor-pointer text-xl font-bold"
              onClick={() => handleNavigation(headerData.logo.href)}
            >
              {headerData.logo.value}
            </div>
          )}

          {/* Hamburger Menu Icon for Mobile */}
          <button
            className="block text-gray-700 md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            ☰
          </button>

          {/* Mobile & Desktop Navigation */}
          <nav className={`hidden items-center space-x-8 md:flex`}>
            {headerData.navMenu.map(({ title, href }, index) => (
              <div
                key={index}
                className="block cursor-pointer text-gray-700 hover:text-gray-500"
                onClick={(e) => {
                  e.preventDefault();
                  // handleSmoothScroll(href);
                  if (title === "Contact Us")
                    window.open("mailto:rishavraj@alumni.iitm.ac.in", "_blank");
                  else alert("coming soon...");
                }}
              >
                {title}
              </div>
            ))}
            <Button
              variant="outline"
              // onClick={() =>
              //   handleNavigation(headerData.callToActionButton.href)
              // }
              onClick={() => alert("coming soon ...")}
            >
              {headerData.callToActionButton.title}
            </Button>
          </nav>
        </div>
      </header>
      <div
        className={`${
          isMobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0"
        } l-0 t-100 absolute w-full bg-white shadow-md transition-all duration-300 ease-in-out`}
      >
        <div className="flex flex-col space-y-4 p-6">
          {headerData.navMenu.map((nm, i) => (
            <div key={i} className="group">
              <div
                className="cursor-pointer text-sm font-medium text-gray-600 group-hover:text-gray-500"
                onClick={(e) => {
                  e.preventDefault();
                  handleSmoothScroll(nm.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                {nm.title}
              </div>
              <Separator className="mt-2 group-hover:border-gray-300" />
            </div>
          ))}
          <Button
            variant="outline"
            // onClick={() => handleNavigation(headerData.callToActionButton.href)}
            onClick={() => alert("coming soon...")}
          >
            {headerData.callToActionButton.title}
          </Button>
        </div>
      </div>
    </>
  );
};

export default HeaderComponent;
