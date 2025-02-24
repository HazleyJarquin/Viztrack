import { supabase } from "@/supabase/supabaseClient";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  const email = params.email;
  const url = new URL(req.url);
  const month = url.searchParams.get("month");

  if (!email || !month) {
    return new Response(
      JSON.stringify({ message: "user_email and month are required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const { data: monthData, error } = await supabase
      .from("months")
      .select("income, expense")
      .eq("user_email", email)
      .eq("month", month);

    if (error) {
      return new Response(JSON.stringify({ message: "Error fetching data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!monthData || monthData.length === 0) {
      return new Response(
        JSON.stringify({ message: "No data found for the given month" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const totalIncome = monthData.reduce((sum, entry) => sum + entry.income, 0);
    const totalExpense = monthData.reduce(
      (sum, entry) => sum + entry.expense,
      0
    );
    const netSavings = totalIncome - totalExpense;
    const savingsRate = totalIncome ? (netSavings / totalIncome) * 100 : 0;

    return new Response(
      JSON.stringify({ totalIncome, totalExpense, netSavings, savingsRate }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
