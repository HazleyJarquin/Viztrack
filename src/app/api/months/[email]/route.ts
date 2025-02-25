/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/supabase/supabaseClient";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ email: string }> }
) => {
  const email = (await params).email;

  try {
    const { data, error } = await supabase
      .from("months")
      .select("*")
      .eq("user_email", email);

    if (data) {
      data.sort((a, b) => {
        const dateA = new Date(a.month + "-01");
        const dateB = new Date(b.month + "-01");
        return dateA.getTime() - dateB.getTime();
      });

      // Agregar el campo monthName
      data.forEach((item) => {
        const [year, month] = item.month.split("-");
        const date = new Date(parseInt(year), parseInt(month) - 1);
        const monthName = date.toLocaleString("es-ES", { month: "long" });

        item.monthName = `${
          monthName.charAt(0).toUpperCase() + monthName.slice(1)
        } - ${year}`;
      });
    }

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
