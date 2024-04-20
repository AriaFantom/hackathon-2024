"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit({ info, classroom }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("notice").insert({
    title: info.title,
    body: info.body,
    classroom,
    student: user.id,
  });

  revalidatePath("/classrooms/" + classroom + "/notice");
   return data, error;
}
