import React from "react";
import { Course } from "@/lib/data/mock-data";
import { CourseCard } from "./CourseCard";

interface CourseGridProps {
  courses: Course[];
  href?: (course: Course) => string;
}

export const CourseGrid: React.FC<CourseGridProps> = ({ courses, href }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          href={href ? href(course) : undefined}
        />
      ))}
    </div>
  );
};
