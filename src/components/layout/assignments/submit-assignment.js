"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData, classes) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const file = formData.get("file");
  const assignmentid = formData.get("assignmentid");

  const { data, error } = await supabase.storage
    .from("assignments")
    .upload(assignmentid + "/" + user.id + "/" + file.name, file);

  if (error) {
    return error;
  }
  revalidatePath("/classrooms/" + classes + "/assignments");
  return data;
}
