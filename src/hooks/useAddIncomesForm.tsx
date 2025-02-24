import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { useAddIncome } from "@/services/addIncome.service";
import { IncomeFormInputs, incomeSchema } from "@/schemas/incomesSchema";

interface Props {
  email: string;
}

export const useAddIncomesForm = ({ email }: Props) => {
  const { mutate: addIncome, isPending } = useAddIncome();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<IncomeFormInputs>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      income: "",
      month: "",
      user_email: email || "",
    },
  });

  const onSubmit: SubmitHandler<IncomeFormInputs> = async (data) => {
    addIncome(
      {
        expense: 0,
        income: Number(data.income),
        month: data.month,
        user_email: data.user_email,
        available: Number(data.income),
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
        onSuccess: (data) => {
          toast.success(data.message, {
            position: "top-center",
          });
          reset();
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
