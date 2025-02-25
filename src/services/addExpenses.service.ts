import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

interface IExpenses {
  amount: number;
  month_id: number;
  description: string;
  user_email: string;
}

const addExpenses = async (expenses: IExpenses) => {
  const { data } = await api.post("/expenses", {
    ...expenses,
  });

  return data;
};

export const useAddExpenses = () => {
  return useMutation({
    mutationFn: (expenses: IExpenses) => addExpenses(expenses),
  });
};
