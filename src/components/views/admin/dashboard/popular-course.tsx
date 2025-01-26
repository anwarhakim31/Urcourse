import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Course } from "@/types/model";
import { Skeleton } from "@/components/ui/skeleton";
const PopularCourse = ({
  data,
  loading,
}: {
  data: Course[];
  loading: boolean;
}) => {
  return (
    <Card className="rounded-md shadow-sm mt-4 w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <h3 className="font-medium text-sm text-gray-600">Popular Course</h3>
        </CardTitle>
        <CardDescription className="">
          <Separator className="mt-2" />
        </CardDescription>
      </CardHeader>
      <CardContent className="m-0 min-h-[175px]">
        {loading ? (
          <div>
            <div className="flex gap-2">
              <div className="max-h-[30px] max-w-[60px] relative w-full aspect-video rounded-md overflow-hidden border">
                <Skeleton className="w-full h-full"></Skeleton>
              </div>

              <Skeleton className="h-4 w-24"></Skeleton>
            </div>
            <Separator className="my-2.5" />
          </div>
        ) : data.length > 0 ? (
          data.map((course) => (
            <>
              <div className="flex gap-2">
                <div className="aspect-video  rounded-md relative">
                  <Image
                    src={course.image || ""}
                    alt={course.title}
                    width={60}
                    height={30}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm">{course.title}</p>
              </div>
              <Separator className="my-2.5" />
            </>
          ))
        ) : (
          <div className="h-[175px] flex-center">
            <p className="text-sm">No Course Found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PopularCourse;
