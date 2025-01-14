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
): { tax: number; total: number; ppn: number } => {
  const fees = {
    virtualAccount: 4000,
    alfamart: 5000,
    indomaret: 5000,
    dana: 0.015 * baseAmount,
    ovo: 0.015 * baseAmount,
    shopeepay: 0.02 * baseAmount,
    linkaja: 0.015 * baseAmount,
    qris: 0,
  };

  const fee = fees[paymentMethod as keyof typeof fees];

  let tax = 0;
  let total = baseAmount;

  if (typeof fee === "number") {
    if (paymentMethod === "qris") {
      tax = 700;
    } else if (fee < 1) {
      tax = baseAmount * fee;
    } else {
      tax = fee;
    }
  }
  const ppn = fees[paymentMethod as keyof typeof fees] * 0.11;
  total += tax + ppn;

  return { tax, total: Math.ceil(total), ppn };
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
        image: "/payment/spay.png",
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

export const formatTimeClockId = (value: Date) => {
  const day = String(value.getDate()).padStart(2, "0");
  const month = String(value.getMonth() + 1).padStart(2, "0"); // Bulan dimulai dari 0, jadi tambahkan 1
  const year = value.getFullYear();
  const hours = String(value.getHours()).padStart(2, "0");
  const minute = String(value.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minute}`;
};
