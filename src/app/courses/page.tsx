"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MainLayout } from "@/components/layout/MainLayout";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { CourseSearchBar } from "@/components/courses/CourseSearchBar";
import { CourseFilters } from "@/components/courses/CourseFilters";
import { Course } from "@/lib/data/mock-data";
import { courseApi } from "@/lib/api/mock-api";

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryParam = searchParams.get("category");

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);

        let courses;
        if (searchQuery) {
          courses = await courseApi.searchCourses(searchQuery);
        } else {
          courses = await courseApi.getAllCourses();
        }

        setAllCourses(courses);
        setFilteredCourses(courses);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, [searchQuery]);

  useEffect(() => {
    let filtered = [...allCourses];

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (course) => course.price >= priceRange[0] && course.price <= priceRange[1]
    );

    setFilteredCourses(filtered);
  }, [allCourses, selectedCategory, priceRange]);

  return (
    <MainLayout>
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Explore Our Courses
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Find the perfect course to enhance your skills and advance your
              career.
            </p>
            <div className="mt-8 flex justify-center">
              <CourseSearchBar />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            {/* Sidebar with filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                  Filters
                </h2>

                <CourseFilters
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  priceRange={priceRange}
                  onPriceRangeChange={setPriceRange}
                />
              </div>
            </div>

            {/* Course listings */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
                </div>
              ) : filteredCourses.length > 0 ? (
                <>
                  <p className="mb-6 text-sm text-gray-600">
                    Showing {filteredCourses.length} of {allCourses.length}{" "}
                    courses
                    {searchQuery && <span> for &quot;{searchQuery}&quot;</span>}
                  </p>
                  <CourseGrid courses={filteredCourses} />
                </>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="mb-4 h-12 w-12 text-gray-400">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900">
                    No courses found
                  </h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery
                      ? `No courses match "${searchQuery}". Try a different search term.`
                      : "No courses match your current filters. Try adjusting your criteria."}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
