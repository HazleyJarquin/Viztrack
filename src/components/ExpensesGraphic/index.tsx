"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { IMonths } from "@/interfaces/IMonths";

const chartConfig = {
  income: {
    label: "Ingreso",
    color: "hsl(var(--chart-1))",
  },
  expense: {
    label: "Gasto",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface Props {
  chartData: IMonths[];
}

export const ExpensesGraphic = ({ chartData }: Props) => {
  if (!chartData || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gastos e Ingresos - Gráfico de Barras</CardTitle>
          <CardDescription>No hay datos disponibles.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No hay datos suficientes para mostrar el gráfico.
          </p>
        </CardContent>
      </Card>
    );
  }
  const firstMonthData = chartData[0];
  const lastMonthData = chartData[chartData.length - 1];

  const calculatePercentageChange = (firstValue: number, lastValue: number) => {
    if (firstValue === 0) return 0;
    return ((lastValue - firstValue) / firstValue) * 100;
  };

  const incomeChange = calculatePercentageChange(
    firstMonthData?.income,
    lastMonthData?.income
  );

  const incomeTrend =
    incomeChange >= 0 ? (
      <div className="flex gap-2 font-medium leading-none">
        Aumento del {incomeChange.toFixed(1)}% este mes{" "}
        <TrendingUp className="h-4 w-4" />
      </div>
    ) : (
      <div className="flex gap-2 font-medium leading-none text-red-500">
        Disminución del {Math.abs(incomeChange).toFixed(1)}% este mes{" "}
        <TrendingDown className="h-4 w-4" />
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gastos e Ingresos - Gráfico de Barras</CardTitle>
        <CardDescription>
          {firstMonthData.monthName} - {lastMonthData.monthName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="monthName"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="expense" fill="var(--color-expense)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {incomeTrend}
        <div className="leading-none text-muted-foreground">
          Mostrando ingresos y gastos para los últimos {chartData.length} meses
        </div>
      </CardFooter>
    </Card>
  );
};
