"use client";
import { CalendarIcon, DollarSignIcon, Loader2 } from "lucide-react";
import { CustomInput } from "../CustomInput";
import { Button } from "../ui/button";
import { useAddExpensesForm } from "@/hooks/useAddExpensesForm";

interface Props {
  email: string;
}

export const AddExpenseForm = ({ email }: Props) => {
  const { errors, handleSubmit, isDirty, isPending, onSubmit, register } =
    useAddExpensesForm({ email });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col gap-5"
    >
      <h1 className="text-deepBlue text-xl font-bold">Agregar Gasto</h1>

      <CustomInput
        placeholder="Mes"
        icon={CalendarIcon}
        iconPosition="right"
        {...register("month")}
        type="text"
        error={!!errors.month}
        errorMessage={errors.month?.message}
      />
      <CustomInput
        placeholder="Ingreso"
        icon={DollarSignIcon}
        iconPosition="right"
        {...register("income")}
        type="text"
        error={!!errors.income}
        errorMessage={errors.income?.message}
      />
      <CustomInput
        placeholder="Gasto"
        icon={DollarSignIcon}
        iconPosition="right"
        {...register("expense")}
        type="text"
        error={!!errors.expense}
        errorMessage={errors.expense?.message}
      />

      <Button
        disabled={isPending || !isDirty}
        className="w-full bg-deepBlue text-white"
      >
        {isPending ? (
          <Loader2 className="text-white animate-spin" />
        ) : (
          "Agregar Gasto"
        )}
      </Button>
    </form>
  );
};
