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
