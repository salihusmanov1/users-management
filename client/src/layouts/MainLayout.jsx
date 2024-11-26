import { Outlet } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Icon } from "@iconify/react";
import { useLogout } from "@/hooks/useLogout";
import { useAuthContext } from "@/hooks/useAuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MainLayout = () => {
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };
  const { user } = useAuthContext();

  return (
    <div className="container mx-auto mt-6 p-4">
      <div className="flex justify-between items-center">
        <Breadcrumb className="mb-1">
          <BreadcrumbList className="text-lg">
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Users</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center">
          <Icon className="mr-2" icon="lucide:user"></Icon>
          <p className="mb-1 font-semibold underline underline-offset-4">
            {user ? user.email : "Loading..."}
          </p>
          <Icon
            className="cursor-pointer ml-4"
            icon="lucide:log-out"
            onClick={handleLogout}
          ></Icon>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
