import { AddExpenseForm } from "@/components/AddExpenseForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function AddExpensePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full h-full">
      <AddExpenseForm email={session?.user?.email ?? ""} />
    </div>
  );
}
