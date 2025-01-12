import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const HomeContactUsComponent = () => {
  return (
    <section id="contact-us" className="bg-white px-8 py-16">
      <div className="container mx-auto max-w-[1000px]">
        <h2 className="mb-16 text-center text-3xl font-extrabold text-gray-900 md:text-4xl">
          Get in Touch
        </h2>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Contact Form */}
          <div className="flex-1">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="product"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Product
                </label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Product" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SDLC">SDLC</SelectItem>
                    <SelectItem value="Source Bot">Source Bot</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us how we can help"
                  rows={5}
                  required
                  className="mt-1"
                />
              </div>

              <div className="text-center">
                <Button
                  type="submit"
                  className="w-full text-white hover:bg-gray-700"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Image */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <img
              src="/support.svg"
              alt="Contact Us"
              className="h-[300px] w-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactUsComponent;
