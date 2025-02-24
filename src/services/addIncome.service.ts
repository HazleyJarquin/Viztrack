import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IIncomes {
  month: string;
  income: number;
  expense: number;
  available: number;
  user_email: string;
}

const addIncome = async (expenses: IIncomes) => {
  const { data } = await api.post("/incomes", {
    ...expenses,
  });

  return data;
};

export const useAddIncome = () => {
  return useMutation({
    mutationFn: (expenses: IIncomes) => addIncome(expenses),
  });
};
