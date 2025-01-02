import { Course } from "@/types/model";

export const splitFullName = (fullname: string) => {
  const split = fullname.split(" ");

  return split.length > 1
    ? split[0].charAt(0).toUpperCase() + split[1].charAt(0).toUpperCase()
    : split[0].charAt(0).toUpperCase();
};

export const requiredFieldCourse = (course: Course) => {
  const requiredField = [
    course.title,
    course.description,
    course.price,
    course.image,
    course.categoryId,
  ];

  const totalField = requiredField.length;
  const complatedField = requiredField.filter(Boolean).length;

  return {
    totalField,
    complatedField,
  };
};
