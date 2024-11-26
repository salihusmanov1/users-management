import React from "react";
import { Routes, Route } from "react-router";
import "./App.css";
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./components/auth/Login"));
const Registration = React.lazy(() => import("./components/auth/Registration"));
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Users = React.lazy(() => import("./components/main/Users"));
const ProtectedRoute = React.lazy(() =>
  import("./components/main/ProtectedRoute")
);
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./components/main/NotFound";

function App() {
  return (
    <>
      <main className="h-full">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Registration />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Users />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </main>
    </>
  );
}

export default App;
