import { AddIncomeForm } from "@/components/AddIncomeForm";
import { authOptions } from "@/lib/auth";
import { getAvailableMonths } from "@/utils/dashboard";
import { getServerSession } from "next-auth";

export default async function AddIncomePage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  const monthsAvailable = email
    ? await getAvailableMonths(session?.user?.email ?? "")
    : [];

  const catalogOptions = Array.isArray(monthsAvailable)
    ? []
    : monthsAvailable.availableMonths.map((month) => {
        return {
          value: month.month,
          label: month.monthName,
        };
      });
  return (
    <div className="w-full h-full">
      <AddIncomeForm
        email={session?.user?.email ?? ""}
        months={catalogOptions}
      />
    </div>
  );
}
