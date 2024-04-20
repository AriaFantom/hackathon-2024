import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export default async function Classview({ params }) {
  const classes = await getClassroom(params.id);

  if (!classes.data[0]?.id) {
    redirect("/classrooms");
  }

  const deleteClassroom = async () => {
    "use server";
    const supabase = createClient();
    await supabase.from("classrooms").delete().eq("id", classes.data[0].id);
    redirect("/classrooms");
  };

  return (
    <main className="flex flex-col ml-64 items-center justify-center text-center ">
      <h1 className="text-4xl">
        {" "}
        Your are vewing{" "}
        <span className="text-slate-500">{classes.data[0].name}</span>
      </h1>

      <div className="item-center text-start w-4/5 my-10">
        <h2 className="text-xl">Students Table</h2>
        <Table className="items-center justify-center w-full text-center border-2 rounded-lg">
          <TableHeader>
            <TableRow className="bg-purple-900 rounded-lg">
              <TableHead className="items-center text-center text-white">
                Name
              </TableHead>
              <TableHead className="items-center text-center text-white">
                Roll_Number
              </TableHead>
              <TableHead className="items-center text-center text-white">
                Joined At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {classes.data[0].students.map((student, index) => {
              return (
                <TableRow key={index}
                className="bg-white"
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="font-medium">
                    {student.rollno}
                  </TableCell>
                  <TableCell className="font-medium">
                    {student.created_at}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <form action={deleteClassroom}>
        <Button type="submit" variant="destructive">
          Delete
        </Button>
      </form>
    </main>
  );
}

async function getClassroom(id) {
  const supabase = createClient();

  const data = await supabase
    .from("classrooms")
    .select(`*, students!inner ( * )`)
    .eq("id", id);

  return data;
}
