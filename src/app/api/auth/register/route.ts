/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ user: data.user }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error en el servidor" },
      { status: 500 }
    );
  }
}
