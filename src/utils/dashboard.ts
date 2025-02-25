import { IExpenses } from "@/interfaces/IExpenses";
import { IFinancialData } from "@/interfaces/IFinancialData";
import {
  IAvailableMonths,
  IMonths,
  IMonthsCatalog,
} from "@/interfaces/IMonths";
import { BASE_URL } from "@/lib/api";

type IExpensesResponseWithoutEmail = Omit<IExpenses, "user_email">;

export const getExpensesByEmail = async (
  email: string
): Promise<IExpensesResponseWithoutEmail[]> => {
  const response = await fetch(`${BASE_URL}/api/expenses/${email}`);
  return response.json();
};

export const getMonthsToChart = async (email: string): Promise<IMonths[]> => {
  const response = await fetch(`${BASE_URL}/api/months/${email}`);
  return response.json();
};

export const getFinancialDataByEmail = async (
  email: string,
  month: string
): Promise<IFinancialData> => {
  const url = new URL(`${BASE_URL}/api/financialdata/${email}`);

  if (month) {
    url.searchParams.append("month", month);
  }

  const response = await fetch(url.toString());
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

export const getMonthCatalogByEmail = async (
  email: string
): Promise<IMonthsCatalog[]> => {
  const response = await fetch(`${BASE_URL}/api/months-catalog/${email}`);
  return response.json();
};

export const getAvailableMonths = async (
  email: string
): Promise<IAvailableMonths> => {
  const response = await fetch(`${BASE_URL}/api/months/available/${email}`);
  return response.json();
};

export const calculateSavingsRate = (
  income: number,
  expenses: number
): number => {
  return income > 0 ? ((income - expenses) / income) * 100 : 0;
};
