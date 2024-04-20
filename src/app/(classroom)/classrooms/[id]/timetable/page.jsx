import NewTimeTable from "@/components/layout/time_table/new_time";
import TimeTable from "@/components/layout/time_table/time_table";
import { createClient } from "@/utils/supabase/server";

export default async function Timetable({ params }) {
  const { data, error } = await getTimetable(params.id);

  return (
    <main className="flex flex-col items-center justify-center w-full">
      <div className="w-full">
        {data?.[0] ? (
          <TimeTable data={data} />
        ) : (
          <main className="items-center pl-64 flex flex-col gap-4 justify-center w-full">
            <p className="text-4xl text-slate-600">No time table has been created</p>
            <NewTimeTable classes={params.id} />
          </main>
        )}
      </div>
    </main>
  );
}

async function getTimetable(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("time_table")
    .select(`subject, teacher, start_time, end_time, day, id, classroom`)
    .eq("classroom", id);

  return { data, error };
}
