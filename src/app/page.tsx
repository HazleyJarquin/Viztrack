import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "@/lib/auth";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const token = (await cookies()).get("authToken");

  if (session || token) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }

  return null;
}
