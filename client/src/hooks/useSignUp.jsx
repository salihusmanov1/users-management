import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import api from "@/http/axios";
import { useToast } from "@/hooks/use-toast";

export const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const { toast } = useToast();

  const signup = async (formData) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", formData);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: "LOGIN", payload: response.data.user });
      toast({
        description: "You are signed up successfully",
        type: "success",
      });

      setIsLoading(false);
    } catch (err) {
      toast({
        description:
          err.response?.data?.errors[0]?.message || "Something went wrong",
        type: "alert",
      });
      setIsLoading(false);
    }
  };

  return { signup, isLoading };
};
