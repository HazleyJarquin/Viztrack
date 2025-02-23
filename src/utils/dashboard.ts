import { IExpenses } from "@/interfaces/IExpenses";
import { BASE_URL } from "@/lib/api";

type IExpensesResponseWithoutEmail = Omit<IExpenses, "user_email">;

export const getExpensesByEmail = async (
  email: string
): Promise<IExpensesResponseWithoutEmail[]> => {
  const response = await fetch(`${BASE_URL}/api/expenses/${email}`);
  return response.json();
};

export const calculateVariation = (
  current: number,
  previous: number
): number => {
  return previous > 0 ? ((current - previous) / previous) * 100 : 0;
};

export const formatNumber = (value: number): string => {
  return value >= 1000
    ? value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    : value.toLocaleString();
};

export const calculateSavingsRate = (
  income: number,
  expenses: number
): number => {
  return income > 0 ? ((income - expenses) / income) * 100 : 0;
};
