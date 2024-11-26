import { useAuthContext } from "@/hooks/useAuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { user } = useAuthContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
