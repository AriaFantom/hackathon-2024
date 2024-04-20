"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function handleCreate({ info, classes }) {
  const supabase = createClient();
  const { data, error } = await supabase.from("time_table").insert([
    {
      classroom: classes,
      day: days.indexOf(info.day) + 1,
      subject: info.subject,
      teacher: info.teacher,
      start_time: new Date(
        new Date().toLocaleDateString() +
          " " +
          info.start_time.hour +
          ":" +
          info.start_time.minute +
          ":00"
      ),
      end_time: new Date(
        new Date().toLocaleDateString() +
          " " +
          info.end_time.hour +
          ":" +
          info.end_time.minute +
          ":00"
      ),
    },
  ]);

  console.log(data, error);

  revalidatePath(`/classrooms/${classes}/timetable`);

  return { data, error };
}
