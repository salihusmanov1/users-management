import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "@/http/axios";
import { useToast } from "@/hooks/use-toast";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();

  const { toast } = useToast();
  const login = async (formData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", formData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: "LOGIN", payload: response.data.user });
      setIsLoading(false);
    } catch (err) {
      toast({
        description: err.response?.data?.message || "Something went wrong",
        type: "alert",
      });
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
