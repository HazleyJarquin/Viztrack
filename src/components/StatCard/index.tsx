import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface Props {
  title: string;
  symbol: string;
  value: string;
  variation: string;
  icon: ReactNode;
}

export const StatCard = ({ title, symbol, value, variation, icon }: Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-4 w-4 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {symbol}
          {value}
        </div>
        <p className="text-xs text-muted-foreground">{variation}</p>
      </CardContent>
    </Card>
  );
};
