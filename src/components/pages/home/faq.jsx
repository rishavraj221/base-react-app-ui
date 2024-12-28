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
      question: "What is your return policy?",
      answer:
        "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately, we can’t offer you a refund or exchange.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order has been shipped, we will send you a confirmation email with tracking information.",
    },
    {
      question: "Can I change my shipping address?",
      answer:
        "Yes, you can change your shipping address before your order is shipped by contacting our customer service team.",
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
