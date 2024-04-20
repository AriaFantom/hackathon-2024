import Link from "next/link";
export default function Sidebar({ classes, values }) {

  return (
    <aside className=" bg-purple-950 w-64 h-full fixed top-0 left-0 z-40 py-24 text-center flex flex-col items-center">
      {classes.map((classroom, index) => {
        return (
          <div className={"flex flex-col my-2  w-full text-center items-center py-2 rounded-s-3xl " + 
            (values.id === classroom.id ? "bg-blue-100 text-black" : "bg-purple-950 text-white")
          } key={index}>
            <Link href={`/classrooms/${classroom.id}`}>
              <p className="text-2xl">{classroom.name}</p>
            </Link>
          </div>
        );
      })}
    </aside>
  );
}
