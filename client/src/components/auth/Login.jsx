import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLogin } from "@/hooks/useLogin";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("This field is required."),
  password: Yup.string().required("This field is required."),
});

const Login = () => {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const [isView, setIsView] = useState(false);

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <div className="h-full">
      <div className="h-full content-center justify-items-center mx-4">
        <Card className="w-1/2 min-w-64">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="mb-2">Login</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-rows-2">
              <div className="grid w-full max-w-sm items-center relative my-1">
                <Label className="mb-1" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Email"
                  {...register("email")}
                />
                <Icon
                  icon="lucide:mail"
                  className="absolute right-0 top-7.5 mx-2.5 h-4 w-4 text-muted-foreground"
                />
                <div className="mt-1">
                  {errors.email ? (
                    <p className="text-red-500 text-sm error-message ml-1">
                      {errors.email.message}
                    </p>
                  ) : (
                    <div className="h-5"></div>
                  )}
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center relative my-1">
                <Label className="mb-1" htmlFor="password">
                  Password
                </Label>
                <Input
                  type={isView ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {!isView ? (
                  <Icon
                    icon="lucide:eye"
                    className="absolute right-0 top-7.5 mx-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                    onClick={() => {
                      setIsView(!isView);
                    }}
                  />
                ) : (
                  <Icon
                    icon="lucide:eye-off"
                    className="absolute right-0 top-7.5 mx-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                    onClick={() => {
                      setIsView(!isView);
                    }}
                  />
                )}
                <div className="mt-1">
                  {errors.password ? (
                    <p className="text-red-500 text-sm error-message ml-1">
                      {errors.password.message}
                    </p>
                  ) : (
                    <div className="h-5"></div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={isLoading}
                className="w-full bg-indigo-400 hover:bg-red-400"
              >
                {!isLoading ? (
                  <span>Sign In</span>
                ) : (
                  <svg
                    className="mr-3 h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
        <div className="grid mt-10 items-center">
          <p>
            <small className="text-sm text-muted-foreground">
              Don&apos;t have an account?
            </small>
            <NavLink
              to="/register"
              className="ml-2 text-sm font-medium leading-none underline underline-offset-2"
            >
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
