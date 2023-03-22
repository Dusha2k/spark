import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FormLoginData } from "../lib/schemas";
import { authAPI } from "../../../shared/api";
import { errorToast } from "../../../shared/toast";

export const usePostLogin = () => {
  const navigate = useNavigate();
  return useMutation(
    (data: FormLoginData) => authAPI.authControllerLogin(data),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("token", data.token);
        navigate("/app");
      },
      onError: () => {
        errorToast({
          description: "Не правильный логин или пароль",
        });
      },
    }
  );
};
