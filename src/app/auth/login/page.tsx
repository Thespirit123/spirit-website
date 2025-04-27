"use client";

import FeedbackHero from "@/assets/images/feedback-hero.png";
import SpiritLogo from "@/assets/images/logo.png";
import Button from "@/components/custom-ui/button";
import { FormField } from "@/components/custom-ui/form-field";
import { Text } from "@/components/custom-ui/text";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";

const LoginPage = () => {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn(formData.email, formData.password);

      if (formData.remember) {
        localStorage.setItem("rememberEmail", formData.email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      router.replace("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
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
          <div className="flex flex-col mb-8 w-full">
            <div className="flex items-center w-full">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-primary transition-colors"
                type="button"
              >
                <FiArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium">Back</span>
              </button>
              <div className="flex-1 flex justify-center">
                <Image
                  src={SpiritLogo}
                  alt="Spirit Logo"
                  width={120}
                  height={40}
                />
              </div>
            </div>
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
              label="Email Address"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
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

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center mt-10">
              <span className="text-gray-600 text-sm">
                Don&apos;t have an Account?{" "}
                <Link
                  href="/auth/sign-up"
                  className="text-black hover:text-brand-primary/80 font-semibold"
                >
                  Sign Up
                </Link>
              </span>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default LoginPage;
