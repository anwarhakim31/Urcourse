import { LayoutDashboard, LayoutList, LibraryBig } from "lucide-react";

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
