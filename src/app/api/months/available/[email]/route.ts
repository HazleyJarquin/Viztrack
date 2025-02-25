/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/supabase/supabaseClient";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  try {
    const email = (await params).email;

    const { data, error } = await supabase
      .from("months")
      .select("month")
      .eq("user_email", email);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }

    const existingMonths = data.map((item) => item.month);

    const currentYear = new Date().getFullYear();

    const allMonths = [];
    for (let month = 1; month <= 12; month++) {
      const monthFormatted = `${currentYear}-${month
        .toString()
        .padStart(2, "0")}`;
      const [year, monthNumber] = monthFormatted.split("-");

      const date = new Date(parseInt(year), parseInt(monthNumber) - 1);

      const monthName = date.toLocaleString("es-ES", { month: "long" });
      const yearAdjusted = date.getFullYear();

      allMonths.push({
        month: monthFormatted,
        monthName: `${
          monthName.charAt(0).toUpperCase() + monthName.slice(1)
        } - ${yearAdjusted}`,
      });
    }

    const availableMonths = allMonths.filter(
      (month) => !existingMonths.includes(month.month)
    );

    return new Response(JSON.stringify({ availableMonths }), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Hubo un problema al obtener los meses disponibles",
      }),
      { status: 500 }
    );
  }
}
