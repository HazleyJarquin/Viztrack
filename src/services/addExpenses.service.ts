import { IExpenses } from "@/interfaces/IExpenses";
import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type IExpensesWithoutId = Omit<IExpenses, "id">;

const addExpenses = async (expenses: IExpensesWithoutId) => {
  const { data } = await api.post("/expenses", {
    ...expenses,
  });

  return data;
};

export const useAddExpenses = () => {
  return useMutation({
    mutationFn: (expenses: IExpensesWithoutId) => addExpenses(expenses),
  });
};
