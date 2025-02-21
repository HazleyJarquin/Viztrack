import { NextResponse } from "next/server";
import { supabase } from "@/supabase/supabaseClient";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  // Usamos Supabase Auth para hacer login
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  // Si el login es exitoso, retornamos el JWT de la sesión
  const { user, session } = data;

  return NextResponse.json(
    { token: session?.access_token, user },
    { status: 200 }
  );
}
