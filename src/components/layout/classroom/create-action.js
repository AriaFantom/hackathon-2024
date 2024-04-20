"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit(classrooms) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase
    .from("classrooms")
    .insert({
      name: classrooms.name,
      department: classrooms.department,
      instituion: classrooms.instituion,
      creator: user.id,
    })
    .select()
    .then(async (data) => {
   
      await supabase
        .from("students")
        .insert({
          name: user.user_metadata.full_name,
          rollno: 0,
          profile: data.data[0].creator,
          classroom: data.data[0].id,
        })
        .select()
        .then((data) => {
          revalidatePath("/classrooms");
          console.log(data)
          return data.data[0].classroom;
        });
        
    });
}
