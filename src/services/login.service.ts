import { ILoginResponse } from "@/interfaces/ILoginResponse";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (
  email: string,
  password: string
): Promise<ILoginResponse> => {
  console.log("api", api.getUri);
  const { data } = await api.post("/api/auth/login", { email, password });
  return data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginUser(data.email, data.password),
  });
};
