import {
  ArrowLeftRight,
  LayoutDashboard,
  LayoutList,
  LibraryBig,
  Users,
} from "lucide-react";

export const sidebarItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Category",
    path: "/admin/category",
    icon: LayoutList,
  },
  {
    name: "Course",
    path: "/admin/course",
    icon: LibraryBig,
  },
  {
    name: "User",
    path: "/admin/user",
    icon: Users,
  },
  {
    name: "Purchase",
    path: "/admin/purchase",
    icon: ArrowLeftRight,
  },
];

export const levelArray = [
  { id: "Beginner", value: "Beginner" },
  { id: "Intermediate", value: "Intermediate" },
  { id: "Advanced", value: "Advanced" },
];

export const navItem = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Course",
    path: "/course",
  },
];

export const walletqrisItem = [
  {
    name: "DANA",
    image: "/payment/dana.png",
    type: "dana",
  },
  // {
  //   name: "OVO",
  //   image: "/payment/ovo.png",
  //   type: "ovo",
  // },
  {
    name: "ShopeePay",
    image: "/payment/spay.png",
    type: "shopeepay",
  },
  {
    name: "LinkAja",
    image: "/payment/linkaja.png",
    type: "linkaja",
  },
  {
    name: "QRIS",
    image: "/payment/qris.png",
    type: "qris",
  },
];

export const virtualAccountItem = [
  {
    name: "BCA",
    image: "/payment/bca.png",
    type: "virtualAccount",
  },
  {
    name: "Mandiri",
    image: "/payment/mandiri.png",
    type: "virtualAccount",
  },
  {
    name: "BNI",
    image: "/payment/bni.png",
    type: "virtualAccount",
  },
  {
    name: "BRI",
    image: "/payment/bri.png",
    type: "virtualAccount",
  },
  {
    name: "BSI",
    image: "/payment/bsi.png",
    type: "virtualAccount",
  },
  {
    name: "Permata",
    image: "/payment/permata.png",
    type: "virtualAccount",
  },
];

export const overthecounter = [
  {
    name: "Alfamart",
    image: "/payment/alfamart.png",
    type: "alfamart",
  },
  {
    name: "Indomaret",
    image: "/payment/indomaret.png",
    type: "indomaret",
  },
];

export const creditcard = [
  {
    name: "Credit Card",
    image: "/payment/creditcard.png",
    type: "creditcard",
  },
];

export const accordionData = [
  {
    value: "item-1",
    title: "Personalized Learning Experience",
    content:
      "Our course is designed to adapt to your individual learning pace and style. Whether you're a beginner or an advanced learner, we provide content that suits your level.",
    image: "/accordion/acor1.png",
  },
  {
    value: "item-2",
    title: "Flexible Learning Schedule",
    content:
      "Access lessons anytime, anywhere. Learn at your convenience with our mobile-friendly platform and downloadable resources.",
    image: "/accordion/acor2.png",
  },
  {
    value: "item-3",
    title: "Certificate of Completion",
    content:
      "Showcase your achievement with a recognized certificate that you can add to your resume.",
    image: "/accordion/acor3.png",
  },
  {
    value: "item-4",
    title: "Expert Instructors",
    content:
      "Learn directly from industry professionals with years of hands-on experience. Our instructors bring real-world insights into every lesson.",
    image: "/accordion/acor4.png",
  },
];
