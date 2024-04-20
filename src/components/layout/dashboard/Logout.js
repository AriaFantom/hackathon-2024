"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Logout() {
  const supabase = createClient();

  await supabase.auth.signOut();
  return redirect("/login");
}
