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
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
    currency: "IDR",
  }).format(value);
};

export const calculateFeeAndPPN = (
  baseAmount: number,
  paymentMethod: string
): { tax: number; total: number } => {
  const fees = {
    virtualAccount: 5000, // Biaya tetap
    alfamart: 5000, // Biaya tetap
    indomaret: 7000, // Biaya tetap
    dana: 0.015, // Persentase 1.5%
    ovo: 0.0273, // Persentase 2.73%
    shopeepay: 0.04, // Persentase 4%
    linkaja: 0.027, // Persentase 2.7%
    qris: 0.007, // Persentase 0.7%
  };

  const fee = fees[paymentMethod as keyof typeof fees];

  let tax = 0;
  let total = baseAmount;

  if (typeof fee === "number") {
    if (fee < 1) {
      // Jika fee adalah persentase
      tax = baseAmount * fee;
    } else {
      // Jika fee adalah biaya tetap
      tax = fee;
    }
  }

  total += tax;

  return { tax, total };
};

export const formatPaymentMethod = (value: string) => {
  switch (value) {
    case "virtualAccount":
      return "VIRTUAL_ACCOUNT";
    case "alfamart":
      return "OVER_THE_COUNTER";
    case "indomaret":
      return "OVER_THE_COUNTER";
    case "dana":
      return "EWALLET";
    case "ovo":
      return "EWALLET";
    case "shopeepay":
      return "EWALLET";
    case "linkaja":
      return "EWALLET";
    case "qris":
      return "EWALLET";
    default:
      return "EWALLET";
  }
};

export const formatPaymentWith = (value: string) => {
  switch (value) {
    case "BCA":
      return {
        name: "VA BCA",
        image: "/payment/bca.png",
      };
    case "MANDIRI":
      return {
        name: "VA Mandiri",
        image: "/payment/mandiri.png",
      };
    case "BNI":
      return {
        name: "VA BNI",
        image: "/payment/bni.png",
      };
    case "BRI":
      return {
        name: "VA BRI",
        image: "/payment/bri.png",
      };
    case "BSI":
      return {
        name: "VA BSI",
        image: "/payment/bsi.png",
      };
    case "PERMATA":
      return {
        name: "VA Permata",
        image: "/payment/permata.png",
      };
    case "ALFAMART":
      return {
        name: "Alfamart",
        image: "/payment/alfamart.png",
      };
    case "INDOMARET":
      return {
        name: "Indomaret",
        image: "/payment/indomaret.png",
      };
    case "DANA":
      return {
        name: "Dana",
        image: "/payment/dana.png",
      };
    case "OVO":
      return {
        name: "OVO",
        image: "/payment/ovo.png",
      };
    case "SHOPEEPAY":
      return {
        name: "ShopeePay",
        image: "/payment/shopeepay.png",
      };
    case "LINKAJA":
      return {
        name: "LinkAja",
        image: "/payment/linkaja.png",
      };
    case "QRIS":
      return {
        name: "QRIS",
        image: "/payment/qris.png",
      };
    default:
      return {
        name: "VA Mandiri",
        image: "/payment/mandiri.png",
      };
  }
};
