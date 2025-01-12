import React from "react";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const componentData = {
  headline: "Frequently Asked Questions",
  faqs: [
    {
      question: "What is SDLC Builder?",
      answer: "SDLC Builder is a tool that streamlines the Software Development Life Cycle processes, making it easier to build and modify codebases efficiently."
    },
    {
      question: "How does Source Bot work?",
      answer: "Source Bot leverages the capabilities of SDLC Builder to automate and optimize coding tasks, allowing for faster development cycles."
    },
    {
      question: "Can I customize templates in SDLC Builder?",
      answer: "Yes, SDLC Builder allows users to customize templates to fit their development needs, ensuring greater flexibility and control."
    },
    {
      question: "What programming languages are supported by Source Bot?",
      answer: "Source Bot supports multiple programming languages, including JavaScript, Python, Java, and more."
    },
    {
      question: "Is there a limit to the number of projects I can manage with SDLC Builder?",
      answer: "No, you can manage an unlimited number of projects with SDLC Builder, allowing you to scale as needed."
    },
    {
      question: "What are the key features of SDLC Builder?",
      answer: "Key features include project management, code generation, templating, integration with CI/CD tools, and more."
    },
    {
      question: "How does Source Bot improve productivity?",
      answer: "Source Bot automates repetitive coding tasks, reduces errors, and streamlines workflows, significantly improving developer productivity."
    },
    {
      question: "Is SDLC Builder suitable for small teams?",
      answer: "Absolutely! SDLC Builder is designed to cater to teams of all sizes, making it a perfect fit for small to large organizations."
    },
    {
      question: "What is the onboarding process for SDLC Builder?",
      answer: "Our onboarding process is simple and user-friendly, including tutorials, documentation, and dedicated support to help you get started."
    },
    {
      question: "Can I integrate SDLC Builder with other tools?",
      answer: "Yes, SDLC Builder supports integration with various tools such as GitHub, Jenkins, Jira, and more for enhanced functionality."
    },
    {
      question: "What support options are available for users?",
      answer: "We offer various support options, including email support, live chat, and an extensive knowledge base available to all users."
    },
    {
      question: "Is there a mobile version of SDLC Builder?",
      answer: "Currently, SDLC Builder is web-based; however, it is optimized for mobile browsers to ensure accessibility on the go."
    },
    {
      question: "How frequently are updates released for SDLC Builder?",
      answer: "We regularly release updates that include new features, improvements, and security patches to enhance user experience."
    },
    {
      question: "Can I get a trial version of SDLC Builder?",
      answer: "Yes, we provide a trial version for users to explore the features and functionalities of SDLC Builder before making a purchase."
    },
    {
      question: "What payment methods are accepted for purchasing SDLC Builder?",
      answer: "We accept various payment methods, including credit cards, PayPal, and bank transfers for user convenience."
    },
  ],
};

const HomeFAQComponent = () => {
  return (
    <section id="faq-section" className="bg-gray-50 px-8 py-16">
      <div className="container mx-auto max-w-[1000px]">
        <h2 className="mb-16 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
          {componentData.headline}
        </h2>

        {/* FAQ Accordion */}
        <div className="flex-1">
          <Accordion className="space-y-6">
            {componentData.faqs.map((fq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i + 1}`}
                className="overflow-hidden rounded-lg border border-gray-200 shadow-sm"
              >
                <AccordionTrigger className="flex items-center justify-between bg-white px-4 py-3 transition-colors hover:bg-gray-100">
                  {fq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-white p-4 text-gray-700">
                  {fq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default HomeFAQComponent;