import TakeAttendance from "@/components/layout/attendance/take-attendance";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Attendance({ params }) {
  const data = await getStudents(params.id);
  const timetable = await getTimetable(params.id);
  const attendance = await getAttendance(params.id);

  return (
    <main className="flex flex-col items-center justify-center pl-64 text-center w-full">
      <h1 className="text-4xl mb-10"> Attendance Sheet</h1>
      <div className="flex flex-col gap-4 items-start w-4/5 ">
        <TakeAttendance students={data.data} timetable={timetable.data} />
        <div className="flex flex-row gap-4 items-center w-full">
          {attendance.data.map((student, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between gap-5 text-left bg-white p-5 rounded-lg shadow-md "
              >
                <div className="flex flex-col gap-2 w-full">
                  <h1 className="text-4xl">Attendance of</h1>
                  <h2 className="text-2xl bg-slate-300 px-2 py-1 rounded-lg text-center">
                    {student.teacher_name}
                  </h2>
                  <p className="text-2xl bg-slate-300 px-2 py-1 rounded-lg text-center">
                    {student.subject}
                  </p>
                  <p className="text-2xl bg-slate-300 px-2 py-1 rounded-lg text-center">
                    {new Date(student.created_date).toLocaleDateString()}{" "}
                  </p>

                  <Link
                    href={`/classrooms/${params.id}/attendance/${student.created_date}/${student.time_table}
                  /`}
                    className="text-white w-full"
                  >
                    <Button className="w-full">View Details</Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

async function getAttendance(id) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("get_attendance_summary", {
    classrooms: id,
  });

  return { data, error };
}

async function getStudents(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("students")
    .select(`*`)
    .eq("classroom", id);

  return { data, error };
}

async function getTimetable(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("time_table")
    .select(`subject, teacher, id, start_time, classroom`)
    .eq("classroom", id)
    .eq("day", new Date().getDay());

  return { data, error };
}
