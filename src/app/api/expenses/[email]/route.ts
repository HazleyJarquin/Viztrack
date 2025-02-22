/* eslint-disable @typescript-eslint/no-unused-vars */
import { supabase } from "@/supabase/supabaseClient";

export const GET = async (
  req: Request,
  { params }: { params: { email: string } }
) => {
  const { email } = params;

  try {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_email", email);

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
