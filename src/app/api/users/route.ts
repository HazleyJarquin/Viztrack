import { supabase } from "@/supabase/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  // Si deseas obtener un usuario específico por email, por ejemplo
  const email = searchParams.get("email");

  // Si hay un email en los parámetros de búsqueda, buscamos ese usuario específico
  if (email) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email) // Filtrar por email
      .single(); // Aseguramos que solo devuelva un resultado

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } else {
    // Si no hay un email en los parámetros, se devuelven todos los usuarios
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 200 });
  }
}
