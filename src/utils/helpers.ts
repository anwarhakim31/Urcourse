import { Course, Module } from "@/types/model";

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
    course.level,
    (course.curriculum &&
      (course.curriculum.exercise?.length || 0) +
        (course.curriculum.module?.length || 0) >
        0 &&
      course?.curriculum?.exercise.some((exercise) => exercise.isPublished)) ||
      course?.curriculum?.module.some((module) => module.isPublished),
  ];

  const totalField = requiredField.length;
  const complatedField = requiredField.filter(Boolean).length;
  const complated = complatedField === totalField;

  return {
    totalField,
    complatedField,
    complated,
  };
};

export const requiredFieldModule = (module: Module) => {
  const requiredField = [module.title, module.description, module.video];

  const totalField = requiredField.length;
  const complatedField = requiredField.filter(Boolean).length;
  const complated = complatedField === totalField;

  return {
    totalField,
    complatedField,
    complated,
  };
};

export const formatCurrency = (value: number) => {
  return Intl.NumberFormat("id-Id", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};
