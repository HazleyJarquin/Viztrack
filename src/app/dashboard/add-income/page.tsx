import { AddIncomeForm } from "@/components/AddIncomeForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function AddIncomePage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="w-full h-full">
      <AddIncomeForm email={session?.user?.email ?? ""} />
    </div>
  );
}
