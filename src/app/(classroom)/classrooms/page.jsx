import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Classroom() {
  const data = await fetchClassrooms();

  return (
    <main className="flex flex-row gap-5 justify-center items-center text-center py-28 min-h-screen">
      <div className="">
        <h1 className="text-5xl font-bold">Classrooms</h1>

        <section className="my-20 flex flex-wrap gap-20">
          {data?.[0] ? (
            data.map((classroom, index) => {
              return (
                <div
                  className="max-w-sm w-80 px-10 py-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                  key={index}
                >
                  <a href="#">
                    <h2 className="text-black text-4xl">{classroom.name}</h2>
                  </a>

                  <div className="text-start my-10">
                    <p className="text-slate-500 text-2xl">
                      Department: {classroom.department}
                    </p>
                    <p className="text-slate-500 text-2xl">
                      Insitution: {classroom.instituion}
                    </p>
                  </div>
                  <a
                    href={`/classrooms/${classroom.id}`}
                    className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Visit
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </div>
              );
            })
          ) : (
            <div className="text-2xl text-gray-400">Create a classroom</div>
          )}
        </section>
      </div>
    </main>
  );
}

async function fetchClassrooms() {
  const supabase = createClient();
  const { data, error } = await supabase.from("classrooms").select(`*`);

  if (error) throw new Error("Failed to fetch data");

  return data;
}
