import { createClient } from "@/utils/supabase/server";
export default async function AttendanceResult({ params }) {
  const data = await getAttendanceResult(params);

  return (
    <main className="flex flex-col items-center justify-center pl-64 text-center w-full">
      <h1 className="text-4xl mb-10"> Attendance Sheet</h1>
      <div className="flex flex-col gap-4 items-start w-4/5 ">
        <div className="flex flex-row gap-10">
          {data.data.map((student, index) => {
            return (
              <div
                key={index}
                className="flex flex-row items-center justify-between gap-5 text-left bg-white p-5 rounded-lg shadow-md w-64"
              >
                <div className="flex flex-col gap-5 w-full">
                  <h2 className="text-2xl bg-slate-300 px-2 py-1 rounded-lg text-center">
                    {student.students.name}
                  </h2>
                  <p className="text-2xl bg-slate-300 px-2 py-1 rounded-lg text-center">
                    Roll No: {student.students.rollno}
                  </p>
                  <p className="text-2xl flex flex-row gap-5 w-full items-center justify-center rounded-lg text-center">
                    <span
                      className={
                        "bg-green-400 px-5 py-2  rounded-full " +
                        (student.ispresent ? "bg-green-400" : "bg-slate-400")
                      }
                    >
                      P
                    </span>{" "}
                    <span
                      className={
                        " px-5 py-2 rounded-full " +
                        (student.ispresent ? "bg-slate-400" : " bg-red-400 ")
                      }
                    >
                      A
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

async function getAttendanceResult(values) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("attendance")
    .select(`*`)
    .eq("classroom", values.id)
    .eq("created_at", decodeURI(values.date).split("T")[0])
    .eq("time_table", values.routine)
    // also join students table to get student name
    .select(`*,students(*)`);

  return { data, error };
}
