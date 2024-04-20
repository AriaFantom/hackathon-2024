"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit({ info, classes }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase.from("assignments").insert({
    name: info.name,
    end_by: info.date,
    classroom: classes,
  });

  console.log(data, error);

  revalidatePath("/classrooms/" + classes + "/assignments");
}
