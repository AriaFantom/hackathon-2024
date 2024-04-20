"use server";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(formData) {
  const origin = headers().get("origin");
  const email = formData.email;
  const full_name = formData.fullname;
  const password = formData.password;
  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return "Cant login right now!";
  }

     

  return "Check your email to verify email";
}
