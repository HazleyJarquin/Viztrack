import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { ExpensesFormInputs, expensesSchema } from "@/schemas/expensesSchema";
import { useAddExpenses } from "@/services/addExpenses.service";

interface Props {
  email: string;
}

export const useAddExpensesForm = ({ email }: Props) => {
  const { mutate: addExpense, isPending } = useAddExpenses();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<ExpensesFormInputs>({
    resolver: zodResolver(expensesSchema),
    defaultValues: {
      amount: "",
      description: "",
      month: "",
      userEmail: email || "",
    },
  });

  const onSubmit: SubmitHandler<ExpensesFormInputs> = async (data) => {
    addExpense(
      {
        amount: Number(data.amount),
        description: data.description,
        month_id: Number(data.month),
        user_email: data.userEmail,
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
    setValue,
    watch,
  };
};
