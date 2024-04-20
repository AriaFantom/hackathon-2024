"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit(classrooms) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // create a student table and get the classroom id from the classrooms variable from the form
  const { data, error } = await supabase.from("students").insert({
    name: classrooms.name,
    rollno: classrooms.rollno,
    profile: user.id,
    classroom: classrooms.code,
  });

  revalidatePath("/classrooms");
}
