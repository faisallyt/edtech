"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/auth-store";
import { Toaster, toast } from "sonner";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  role: "teacher" | "student";
}

export default function SignupPage() {
  const router = useRouter();
  const { signup, error, clearError } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      role: "student",
    },
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signup(data);
      const user = useAuthStore.getState().user;

      toast.success("Account created successfully!");

      if (user?.role === "teacher") {
        router.push("/dashboard/teacher/dashboard");
      } else {
        router.push("/dashboard/student/dashboard");
      }
    } catch (err) {
      console.error("error while signing up", err);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Clear any previous errors
  React.useEffect(() => {
    clearError();
  }, [clearError]);

  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create an account
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Join CodeCrafted to start your learning journey
            </p>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">{error}</h3>
                </div>
              </div>
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <Input
                id="name"
                label="Full name"
                type="text"
                autoComplete="name"
                {...register("name", {
                  required: "Name is required",
                })}
                error={errors.name?.message}
              />

              <Input
                id="email"
                label="Email address"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                error={errors.email?.message}
              />

              <Input
                id="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                error={errors.password?.message}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  I want to
                </label>
                <div className="flex space-x-4">
                  <div className="flex items-center">
                    <input
                      id="role-student"
                      type="radio"
                      value="student"
                      {...register("role")}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="role-student"
                      className="ml-2 block text-sm text-gray-900">
                      Learn
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="role-teacher"
                      type="radio"
                      value="teacher"
                      {...register("role")}
                      className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="role-teacher"
                      className="ml-2 block text-sm text-gray-900">
                      Teach
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}>
                Create account
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </MainLayout>
  );
}
