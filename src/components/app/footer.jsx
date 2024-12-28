import React from "react";
import { useNavigate } from "react-router-dom";

const footerData = {
  quickLinks: [
    { title: "Terms of Service", href: "/terms-of-service" },
    { title: "Privacy Policy", href: "/privacy-policy" },
  ],
  pageLinks: [
    { title: "Features", href: "#features" },
    { title: "About Us", href: "#about-us" },
    { title: "Contact Us", href: "#contact-us" },
  ],
  socialMedia: [
    { platform: "Instagram", href: "https://instagram.com" },
    { platform: "LinkedIn", href: "https://linkedin.com" },
    { platform: "Twitter", href: "https://twitter.com" },
  ],
  newsletter: {
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
  copyright: "&copy; 2024 Your Company. All rights reserved.",
};

const FooterComponent = () => {
  const navigate = useNavigate();

  const handleSmoothScroll = (href) => {
    const targetId = href.split("#")[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="flex flex-col items-center justify-center bg-gray-800 px-6 py-12 text-white">
      <div className="flex flex-col gap-8 md:w-full md:flex-row md:justify-around lg:w-[1000px]">
        {/* Quick Links */}
        <div>
          {/* <h3 className="mb-2 font-semibold">Quick Links</h3> */}
          <ul className="space-y-2">
            {footerData.quickLinks.map((link, index) => (
              <li key={index}>
                <div
                  onClick={() => navigate(link.href)}
                  className="cursor-pointer text-center text-gray-400 hover:text-gray-200 md:text-left"
                >
                  {link.title}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Page Links */}
        <div>
          {/* <h3 className="mb-2 font-semibold">Page Links</h3> */}
          <ul className="space-y-2">
            {footerData.pageLinks.map((link, index) => (
              <li key={index}>
                <div
                  className="cursor-pointer text-center text-gray-400 hover:text-gray-200 md:text-left"
                  onClick={(e) => {
                    e.preventDefault();
                    handleSmoothScroll(link.href);
                  }}
                >
                  {link.title}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media Links */}
        <div className="flex flex-col items-center justify-center md:block">
          <h3 className="font-semibold">Follow Us</h3>
          <div className="mt-2 flex space-x-4">
            {footerData.socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-gray-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 text-center">
        <h3 className="font-semibold">Subscribe to our Newsletter</h3>
        <form className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder={footerData.newsletter.placeholder}
            className="w-full max-w-md rounded-l-md border border-gray-600 bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="rounded-r-md bg-gray-900 px-4 py-2 font-semibold text-white hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {footerData.newsletter.buttonText}
          </button>
        </form>
      </div>

      {/* Copyright Information */}
      <div
        className="mt-8 text-center text-gray-400"
        dangerouslySetInnerHTML={{ __html: footerData.copyright }}
      />
    </footer>
  );
};

export default FooterComponent;
