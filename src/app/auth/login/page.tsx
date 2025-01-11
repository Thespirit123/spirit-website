"use client";

import FeedbackHero from "@/assets/images/feedback-hero.png";
import SpiritLogo from "@/assets/images/logo.png";
import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { Text } from "@/components/custom-ui/text";
import Image from "next/image";
import { useState } from "react";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    remember: false,
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

      <div className="w-full lg:w-[55%] px-0 sm:px-4 lg:px-10">
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
                Welcome!
              </Text>
              <Text className="text-gray-600">
                Log in to your affiliate dashboard
              </Text>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              label="Password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary"
                  checked={formData.remember}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      remember: e.target.checked,
                    }))
                  }
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/auth/forgot-password"
                className="text-sm hover:text-brand-primary/80 font-medium"
              >
                Forgot Password?
              </a>
            </div>

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </section>
      </div>
    </section>
  );
};

export default LoginPage;
