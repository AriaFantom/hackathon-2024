import AssignmentsCreate from "@/components/layout/assignments/create";
import SubmitAssignment from "@/components/layout/assignments/submit";
import { createClient } from "@/utils/supabase/server";

export default async function Assignments({ params }) {
  var value = await fetchAssignments(params.id);

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex flex-col items-center gap-5 justify-center pl-64 text-center w-full">
      <h1 className="font-semibold my-5 text-4xl">Assignments</h1>
      <div className="flex flex-row items-end w-4/5">
        <AssignmentsCreate classes={params.id} />
      </div>

      {value.map(async (assignment, index) => {
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-between gap-5 text-left bg-white p-5 rounded-lg shadow-md w-4/5"
          >
            <div className="">
              <h2 className="text-2xl">{assignment.name}</h2>
              <p className="text-sm">
                {new Date() > new Date(assignment.end_by)
                  ? "Deadline: " + new Date(assignment.end_by).toDateString()
                  : Math.floor(
                      (new Date(assignment.end_by) - new Date(new Date())) /
                        (1000 * 60 * 60 * 24) +
                        1
                    ) + " Days left"}
              </p>
            </div>
            {await supabase.storage
              .from("assignments")
              .list(assignment.id)
              .then(({ data, error }) => {
                value.submitted = data.some((file) => {
                  return file.name.includes(user.id);
                });
              })}

            {value.submitted ? (
              <p>Submitted</p>
            ) : (
              <SubmitAssignment
                disabled={new Date() > new Date(assignment.end_by)}
                assignementid={assignment.id}
                classes={params.id}
              />
            )}
          </div>
        );
      })}
    </main>
  );
}

async function fetchAssignments(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("assignments")
    .select(`*`)
    .eq("classroom", id);

  if (error) throw new Error("Failed to fetch data");

  return data;
}
