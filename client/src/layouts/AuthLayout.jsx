import { useAuthContext } from "@/hooks/useAuthContext";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthLayout = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      <Outlet />
      <div
        className="bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/pexels-codioful-7135057.jpg')" }}
      ></div>
    </div>
  );
};

export default AuthLayout;
