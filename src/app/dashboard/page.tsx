import { ExpensesGraphic } from "@/components/ExpensesGraphic";
import { BASE_URL } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Head from "next/head";

const getExpensesByEmail = async (email: string) => {
  const response = await fetch(`${BASE_URL}/api/expenses/${email}`);
  const data = await response.json();
  return data;
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  const expenses = email ? await getExpensesByEmail(email) : [];
  return (
    <>
      <Head>
        <title>Dashboard de Gastos</title>
        <meta
          name="description"
          content="Visualiza tus gastos en tu dashboard personal."
        />
      </Head>
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <ExpensesGraphic chartData={expenses} />
      </div>
    </>
  );
}
