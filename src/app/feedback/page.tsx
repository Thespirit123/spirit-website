"use client";

import FeedbackHero from "@/assets/images/feedback-hero.png";
import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import Image from "next/image";
import { useState } from "react";

const services = [
  { value: "movie", label: "Movie Portal" },
  { value: "utility", label: "Utility Payment" },
  { value: "whatsapp", label: "WhatsApp Tool" },
];

const recommendations = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "maybe", label: "Maybe" },
];

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    rating: "",
    service: "",
    experience: "",
    improvement: "",
    recommend: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="flex flex-col lg:flex-row min-h-screen px-4 sm:px-6 lg:px-10 mt-10">
      {/* Mobile Text Content */}
      <div className="lg:hidden text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2">
          Share Your Experience
        </h1>
        <p className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto">
          Your feedback helps us improve and serve you better
        </p>
      </div>

      {/* Desktop Image Section */}
      <div className="w-[40%] h-screen sticky top-0 hidden lg:flex items-center justify-center">
        <div className="w-full h-full overflow-hidden rounded-3xl">
          <Image
            src={FeedbackHero}
            alt="Feedback Hero"
            className="object-cover"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-black/40 rounded-3xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl xl:text-4xl font-semibold text-white mb-4">
              Share Your Experience
            </h1>
            <p className="text-lg xl:text-xl text-white/90 max-w-lg">
              Your feedback helps us improve and serve you better
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-[60%] px-0 sm:px-4 lg:px-10">
        <section className="max-w-2xl mx-auto py-8 lg:py-16">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Full Name"
              type="text"
              required
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
            />

            <FormField
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <FormField
              label="Rate Your Overall Experience"
              type="star-rating"
              required
              value={formData.rating}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, rating: value }))
              }
            />

            <FormField
              label="Which Service Did You Use?"
              type="select"
              required
              options={services}
              value={formData.service}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, service: value }))
              }
            />

            <FormField
              label="Tell Us About Your Experience"
              type="textarea"
              required
              value={formData.experience}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, experience: e.target.value }))
              }
            />

            <FormField
              label="How Can We Improve?"
              type="textarea"
              value={formData.improvement}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  improvement: e.target.value,
                }))
              }
            />

            <FormField
              label="Would You Recommend Us?"
              type="radio"
              required
              options={recommendations}
              value={formData.recommend}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, recommend: value }))
              }
            />

            <Button type="submit" className="w-full">
              Submit Feedback
            </Button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default FeedbackPage;
