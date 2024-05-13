import { BarChart, Compass, Layout, List } from "lucide-react";
import { useLocation } from "react-router-dom";
import SidebarItem from "./SidebarItem";

const studentRoutes = [
  {
    icon: Compass,
    label: "Browse",
    href: "/student/browse",
  },
  {
    icon: Layout,
    label: "Dashboard",
    href: "/student/dashboard",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/analytics",
  },
];

const SidebarRoutes = () => {
  const { pathname } = useLocation();

  const isInstructorPage = pathname?.includes("/instructor");

  const routes = isInstructorPage ? instructorRoutes : studentRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
