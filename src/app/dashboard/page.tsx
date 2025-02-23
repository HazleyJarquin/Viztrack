import { ExpensesGraphic } from "@/components/ExpensesGraphic";
import { StatCard } from "@/components/StatCard";
import { authOptions } from "@/lib/auth";
import { ActivityIcon, CreditCardIcon, DollarSignIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Head from "next/head";
import {
  getExpensesByEmail,
  calculateVariation,
  formatNumber,
  calculateSavingsRate,
} from "@/utils/dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  const expenses = email ? await getExpensesByEmail(email) : [];

  const totalIncome = expenses.reduce((acc, curr) => acc + curr.income, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.expense, 0);

  const currentMonth = new Date().toLocaleString("default", { month: "long" });
  const lastMonthIndex =
    expenses.findIndex((e) => e.month === currentMonth) - 1;
  const lastMonthIncome =
    lastMonthIndex >= 0 ? expenses[lastMonthIndex].income : 0;
  const lastMonthExpenses =
    lastMonthIndex >= 0 ? expenses[lastMonthIndex].expense : 0;

  const incomeVariation = calculateVariation(totalIncome, lastMonthIncome);
  const expenseVariation = calculateVariation(totalExpenses, lastMonthExpenses);

  const netSavings = totalIncome - totalExpenses;
  const savingsRate = calculateSavingsRate(totalIncome, totalExpenses);

  return (
    <>
      <Head>
        <title>Dashboard de Gastos</title>
        <meta
          name="description"
          content="Visualiza tus gastos en tu dashboard personal."
        />
      </Head>
      <div className="w-full h-full flex flex-col gap-2">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<DollarSignIcon />}
            title="Ingresos totales"
            symbol="$"
            value={formatNumber(totalIncome)}
            variation={`${incomeVariation.toFixed(1)}% del mes pasado`}
          />
          <StatCard
            icon={<DollarSignIcon />}
            title="Gastos totales"
            symbol="$"
            value={formatNumber(totalExpenses)}
            variation={`${expenseVariation.toFixed(1)}% del mes pasado`}
          />
          <StatCard
            icon={<CreditCardIcon />}
            title="Ahorros netos"
            symbol="$"
            value={formatNumber(netSavings)}
            variation={netSavings > 0 ? "Ahorro positivo" : "Ahorro negativo"}
          />
          <StatCard
            icon={<ActivityIcon />}
            title="Tasa de Ahorro"
            symbol="%"
            value={savingsRate.toFixed(1)}
            variation={
              savingsRate > 0
                ? `Ahorro del ${savingsRate.toFixed(1)}%`
                : "Sin ahorro"
            }
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <ExpensesGraphic chartData={expenses} />
        </div>
      </div>
    </>
  );
}
