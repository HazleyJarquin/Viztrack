import { AddExpenseForm } from "@/components/AddExpenseForm";
import { authOptions } from "@/lib/auth";
import { getMonthCatalogByEmail } from "@/utils/dashboard";
import { getServerSession } from "next-auth";

export default async function AddExpensePage() {
  const session = await getServerSession(authOptions);
  const monthsCatalogData = await getMonthCatalogByEmail(
    session?.user?.email ?? ""
  );

  const catalogOptions = monthsCatalogData.map((month) => {
    return {
      value: month.id,
      label: month.monthName,
    };
  });

  return (
    <div className="w-full h-full">
      <AddExpenseForm
        email={session?.user?.email ?? ""}
        monthOptions={catalogOptions ?? []}
      />
    </div>
  );
}
