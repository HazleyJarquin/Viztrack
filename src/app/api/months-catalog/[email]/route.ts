/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/supabase/supabaseClient";

export const GET = async (
  _req: Request,
  { params }: { params: Promise<{ email: string }> }
) => {
  const email = (await params).email;
  try {
    if (!email) {
      return new Response("Email is required", { status: 400 });
    }

    const { data, error } = await supabase
      .from("months")
      .select("id, month")
      .eq("user_email", email);

    if (error) {
      return new Response(error.message, { status: 500 });
    }

    const monthsData = data.map((item) => {
      const [year, month] = item.month.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      const monthName = date.toLocaleString("es-ES", { month: "long" });

      return {
        ...item,
        monthName: `${
          monthName.charAt(0).toUpperCase() + monthName.slice(1)
        } - ${year}`,
      };
    });

    return new Response(JSON.stringify(monthsData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
