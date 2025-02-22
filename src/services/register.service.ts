import { ILoginResponse } from "@/interfaces/ILoginResponse";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const registerUser = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  const { data } = await api.post("/auth/register", { email, password });
  return data;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      registerUser(data.email, data.password),
  });
};
