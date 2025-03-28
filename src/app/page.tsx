// src/app/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/Button";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseSearchBar } from "@/components/courses/CourseSearchBar";
import { Course } from "@/lib/data/mock-data";
import { courseApi } from "@/lib/api/mock-api";

export default function HomePage() {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await courseApi.getPopularCourses();
        setPopularCourses(courses.slice(0, 8)); // Get top 8 courses
      } catch (error) {
        console.error("Failed to fetch popular courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Learn Without Limits
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-blue-100">
              Start, switch, or advance your career with thousands of courses
              from expert instructors.
            </p>
            <div className="w-full max-w-xl">
              <CourseSearchBar />
            </div>
            <div className="mt-8 flex space-x-4">
              <Link href="/signup">
                <Button
                  size="lg"
                  className="bg-white text-blue-700 hover:bg-blue-50">
                  Join For Free
                </Button>
              </Link>
              <Link href="/courses">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-blue-600">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold text-gray-900">
              Popular Courses
            </h2>
            <Link href="/courses" className="text-blue-600 hover:text-blue-700">
              View All Courses →
            </Link>
          </div>

          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
            </div>
          ) : (
            <CourseGrid courses={popularCourses} />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            Why Learn With Us
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from industry experts who are passionate about teaching
                and sharing their knowledge.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Learn at Your Own Pace
              </h3>
              <p className="text-gray-600">
                Access course materials 24/7 and learn at your own pace, from
                any device, anywhere in the world.
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Progress Tracking
              </h3>
              <p className="text-gray-600">
                Track your progress, earn certificates, and achieve your
                learning goals with our comprehensive dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              Ready to Start Learning?
            </h2>
            <p className="mb-8 max-w-2xl text-lg text-gray-600">
              Join thousands of students and instructors on our platform today.
              Start your learning journey or share your knowledge with the
              world.
            </p>
            <div className="flex space-x-4">
              <Link href="/signup?role=student">
                <Button size="lg">Start Learning</Button>
              </Link>
              <Link href="/signup?role=teacher">
                <Button size="lg" variant="outline">
                  Become an Instructor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
            What Our Students Say
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=student1"
                  alt="Student"
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-500">
                    Web Development Student
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                `&quot`The courses on this platform have been exceptional. I
                went from a complete beginner to landing my first job as a
                front-end developer in just 6 months. `&quot`
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=student2"
                  alt="Student"
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">James Wilson</h4>
                  <p className="text-sm text-gray-500">Data Science Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                `&quot`The data science courses helped me pivot my career from
                marketing to data analysis. The instructors are industry
                professionals who teach real-world skills.`&quot`
              </p>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <div className="mb-4 flex items-center">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=student3"
                  alt="Student"
                  className="mr-4 h-12 w-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900">Emma Roberts</h4>
                  <p className="text-sm text-gray-500">UX Design Student</p>
                </div>
              </div>
              <p className="text-gray-600">
                `&quot`I loved how the courses combined theory with practical
                projects. The feedback from instructors was invaluable in
                improving my design skills and portfolio.`&quot`
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
