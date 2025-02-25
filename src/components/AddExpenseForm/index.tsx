"use client";
import {
  CalendarIcon,
  DollarSignIcon,
  Loader2,
  SquarePenIcon,
} from "lucide-react";
import { CustomInput } from "../CustomInput";
import { Button } from "../ui/button";
import { useAddExpensesForm } from "@/hooks/useAddExpensesForm";
import { CustomSelect } from "../CustomSelect";

interface Props {
  email: string;
  monthOptions: { label: string; value: number | string }[];
}

export const AddExpenseForm = ({ email, monthOptions }: Props) => {
  const {
    errors,
    handleSubmit,
    isDirty,
    isPending,
    onSubmit,
    register,
    watch,
    setValue,
  } = useAddExpensesForm({ email });

  const selectedMonth = watch("month");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full flex flex-col gap-5"
    >
      <h1 className="text-deepBlue text-xl font-bold">Agregar Gasto</h1>

      <CustomSelect
        options={monthOptions}
        value={selectedMonth}
        onChange={(value) => setValue("month", value)}
        placeholder="Selecciona un mes"
        icon={CalendarIcon}
        iconPosition="right"
        error={!!errors.month}
        errorMessage={errors.month?.message}
      />
      <CustomInput
        placeholder="Descripción"
        icon={SquarePenIcon}
        iconPosition="right"
        {...register("description")}
        type="text"
        error={!!errors.description}
        errorMessage={errors.description?.message}
      />
      <CustomInput
        placeholder="Ingreso"
        icon={DollarSignIcon}
        iconPosition="right"
        {...register("amount")}
        type="text"
        error={!!errors.amount}
        errorMessage={errors.amount?.message}
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
