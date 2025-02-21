import { ILoginResponse } from "@/interfaces/ILoginResponse";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  if (!api) {
    throw new Error("API is not available");
  }
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginUser(data.email, data.password),
  });
};
