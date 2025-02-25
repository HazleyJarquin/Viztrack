import { ExpensesGraphic } from "@/components/ExpensesGraphic";
import { StatCard } from "@/components/StatCard";
import { authOptions } from "@/lib/auth";
import { ActivityIcon, CreditCardIcon, DollarSignIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import Head from "next/head";
import {
  formatNumber,
  getMonthsToChart,
  getFinancialDataByEmail,
} from "@/utils/dashboard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;

  if (!email) {
    return <p>No tienes acceso al dashboard</p>;
  }

  const [months, financialData, financialPreviousData] = await Promise.all([
    getMonthsToChart(email),
    getFinancialDataByEmail(email, getFormattedDate(0)),
    getFinancialDataByEmail(email, getFormattedDate(-1)),
  ]);

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
            value={formatNumber(financialData?.totalIncome ?? 0)}
            variation={`${calculateVariation(
              financialData?.totalIncome ?? 0,
              financialPreviousData?.totalIncome ?? 0
            ).toFixed(2)}% del mes pasado`}
          />
          <StatCard
            icon={<DollarSignIcon />}
            title="Gastos totales"
            symbol="$"
            value={formatNumber(financialData?.totalExpense ?? 0)}
            variation={`${calculateVariation(
              financialData?.totalExpense ?? 0,
              financialPreviousData?.totalExpense ?? 0
            ).toFixed(2)}% del mes pasado`}
          />
          <StatCard
            icon={<CreditCardIcon />}
            title="Ahorros netos"
            symbol="$"
            value={formatNumber(financialData?.netSavings ?? 0)}
            variation={`${calculateVariation(
              financialData?.netSavings ?? 0,
              financialPreviousData?.netSavings ?? 0
            ).toFixed(2)}% del mes pasado`}
          />
          <StatCard
            icon={<ActivityIcon />}
            title="Tasa de Ahorro"
            symbol="%"
            value={(financialData?.savingsRate ?? 0).toFixed(1)}
            variation={`${calculateVariation(
              financialData?.savingsRate ?? 0,
              financialPreviousData?.savingsRate ?? 0
            ).toFixed(2)}% del mes pasado`}
          />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4">
          <ExpensesGraphic chartData={months} />
        </div>
      </div>
    </>
  );
}

function getFormattedDate(offset: number) {
  return new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
  }).format(new Date(new Date().setMonth(new Date().getMonth() + offset)));
}

function calculateVariation(current: number, previous: number) {
  return previous > 0 ? ((current - previous) / previous) * 100 : 0;
}
