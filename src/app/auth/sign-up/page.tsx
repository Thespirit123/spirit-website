"use client";

import FeedbackHero from "@/assets/images/feedback-hero.png";
import SpiritLogo from "@/assets/images/logo.png";
import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { Text } from "@/components/custom-ui/text";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <section className="flex flex-col lg:flex-row h-[calc(100vh-20px)] p-4 sm:p-6 lg:p-10">
      <div className="w-[45%] h-full sticky top-0 hidden lg:flex items-center justify-center rounded-md">
        <Image
          src={FeedbackHero}
          alt="Feedback Hero"
          className="object-cover rounded-md"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>

      <div className="w-full lg:w-[55%] px-0 sm:px-4 lg:px-10 overflow-y-auto">
        <section className="max-w-2xl mx-auto">
          <div className="flex flex-col items-center mb-8">
            <Image
              src={SpiritLogo}
              alt="Spirit Logo"
              width={120}
              height={40}
              className="mb-6"
            />
            <div className="self-start text-left mt-16">
              <Text
                variant="h1"
                className="text-2xl md:text-3xl font-semibold mb-2"
              >
                Create Account
              </Text>
              <Text className="text-gray-600">Join our affiliate program</Text>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                type="text"
                required
                value={formData.firstName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <FormField
                label="Last Name"
                type="text"
                required
                value={formData.lastName}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, lastName: e.target.value }))
                }
              />
            </div>

            <FormField
              label="Username"
              type="text"
              required
              value={formData.userName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, userName: e.target.value }))
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
              label="Date of Birth"
              type="date"
              required
              value={formData.dateOfBirth}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  dateOfBirth: e.target.value,
                }))
              }
            />

            <FormField
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <FormField
              label="Confirm Password"
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />

            <Button type="submit" className="w-full">
              Create Account
            </Button>

            <div className="text-center mt-10">
              <span className="text-gray-600 text-sm">
                Have an Account?{" "}
                <Link
                  href="/auth/login"
                  className="text-black hover:text-brand-primary/80 font-semibold"
                >
                  Log In
                </Link>
              </span>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default SignUpPage;
