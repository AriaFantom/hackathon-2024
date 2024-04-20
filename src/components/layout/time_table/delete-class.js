"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export default async function handleDelete({ id, classes }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("time_table")
    .delete()
    .eq("id", id);

  revalidatePath(`/classrooms/${classes}/timetable`);

  return { data, error };
}
