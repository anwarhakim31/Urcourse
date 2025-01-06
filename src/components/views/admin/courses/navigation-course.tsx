"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Course } from "@/types/model";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationCourse = ({ course }: { course: Course }) => {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-x-2">
      <Link href={`/admin/course/${course.id}/basic`}>
        <Button
          variant={
            pathname === `/admin/course/${course.id}/basic`
              ? "default"
              : "outline"
          }
          type="button"
        >
          Basic Information
        </Button>
      </Link>
      <Link href={`/admin/course/${course.id}/curriculum`}>
        <Button
          variant={
            pathname === `/admin/course/${course.id}/curriculum`
              ? "default"
              : "outline"
          }
          type="button"
        >
          Curriculum
        </Button>
      </Link>
    </div>
  );
};

export default NavigationCourse;
