import { LoginFormInputs, loginSchema } from "@/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useLoginUser } from "@/services/login.service";

export const useLoginForm = () => {
  const { mutate: loginUser, isPending } = useLoginUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    loginUser(
      {
        email: data.email,
        password: data.password,
      },
      {
        onError: (error) => {
          const axiosError = error as {
            response?: { data: { error: string } };
          };

          const errorMessage =
            axiosError.response?.data.error || "Ocurrió un error inesperado";

          alert(errorMessage);
        },
        onSuccess: (data) => {
          setCookie("authToken", data.token, {
            maxAge: 60 * 60,
          });
          router.push("/dashboard");
        },
      }
    );
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDirty,
    reset,
    isPending,
  };
};
