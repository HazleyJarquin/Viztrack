import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { RegisterFormInputs, registerSchema } from "@/schemas/registerSchema";
import { useRegisterUser } from "@/services/register.service";

export const useRegisterUserForm = () => {
  const { mutate: registerUser, isPending } = useRegisterUser();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    registerUser(
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

          toast.error(errorMessage, {
            position: "top-center",
          });
        },
        onSuccess: () => {
          toast.success(
            "¡Registro exitoso! Revisa tu correo para confirmar tu cuenta.",
            {
              position: "top-center",
            }
          );
          router.push("/auth/login");
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
