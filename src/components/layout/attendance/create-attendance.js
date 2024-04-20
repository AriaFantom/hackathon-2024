"use server"
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export default async function CreateAttendance({ student, status, timetableData  }) {

    const supabase = createClient();
    const { data, error } = await supabase
      .from("attendance")
      .insert({ 
        student: student.id,
        ispresent: status,
        classroom: timetableData.classroom,
        time_table: timetableData.id,
        
      });    

    revalidatePath("/classrooms/" + timetableData.classroom + "/attendance");
    return { data, error };
}