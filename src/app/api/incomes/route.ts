import { supabase } from "@/supabase/supabaseClient";

export const POST = async (req: Request) => {
  try {
    const { month, income, expense, available, user_email } = await req.json();

    if (
      month === undefined ||
      income === undefined ||
      expense === undefined ||
      available === undefined ||
      user_email === undefined
    ) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400 }
      );
    }

    const { error } = await supabase.from("months").insert([
      {
        month,
        income,
        expense,
        available,
        user_email,
      },
    ]);

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
      });
    }

    return new Response(
      JSON.stringify({ message: "Income added successfully" }),
      { status: 201 }
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
};
