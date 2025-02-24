"use client";

import { useAddIncomesForm } from "@/hooks/useAddIncomesForm";
import { CustomInput } from "../CustomInput";
import { CalendarIcon, DollarSignIcon, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  email: string;
}
export const AddIncomeForm = ({ email }: Props) => {
  const { errors, handleSubmit, isDirty, isPending, onSubmit, register } =
    useAddIncomesForm({ email });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col gap-5"
    >
      <h1 className="text-deepBlue text-xl font-bold">Agregar Ingreso</h1>

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
