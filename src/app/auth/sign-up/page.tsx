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
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";

interface SignUpFormData {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth: string;
  password: string;
  confirmPassword: string;
}

const SignUpPage = () => {
  const router = useRouter();
  const { signUp } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log("data", data);
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      setIsLoading(true);

      await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.userName.toLowerCase(),
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        password: data.password,
      });

      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
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
                Create Account
              </Text>
              <Text className="text-gray-600">Join our affiliate program</Text>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                label="First Name"
                type="text"
                error={errors.firstName?.message}
                {...register("firstName", {
                  required: "First name is required",
                  minLength: {
                    value: 2,
                    message: "First name must be at least 2 characters",
                  },
                })}
              />
              <FormField
                label="Last Name"
                type="text"
                error={errors.lastName?.message}
                {...register("lastName", {
                  required: "Last name is required",
                  minLength: {
                    value: 2,
                    message: "Last name must be at least 2 characters",
                  },
                })}
              />
            </div>

            <FormField
              label="Username"
              type="text"
              error={errors.userName?.message}
              {...register("userName", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_]+$/,
                  message:
                    "Username can only contain letters, numbers and underscore",
                },
              })}
            />

            <FormField
              label="Email Address"
              type="email"
              error={errors.email?.message}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />

            <FormField
              label="Date of Birth"
              type="date"
              error={errors.dateOfBirth?.message}
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />

            <FormField
              label="Password"
              type="password"
              error={errors.password?.message}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            <FormField
              label="Confirm Password"
              type="password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (val: string) => {
                  if (watch("password") !== val) {
                    return "Passwords do not match";
                  }
                },
              })}
            />

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
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
