"use server";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function SignIn(formData) {
  const email = formData.email;
  const password = formData.password;
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  

  if (error) {
    return redirect("/login?message=Wrong Password or Email");
  }

  return redirect(`/${process.env.DASHBOARD_URL || ""}`);
}
