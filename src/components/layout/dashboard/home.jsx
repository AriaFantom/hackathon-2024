import DashNavbar from "./navbar";
import Navigator from "./navigator";
import Sidebar from "./sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function Home({ children, values }) {
  const data = await fetchClassrooms();
  return (
    <div className=" bg-blue-100 min-h-screen">
      <Sidebar values={values} classes={data} />
      <Navigator values={values} />
      {children}
    </div>
  );
}

async function fetchClassrooms() {
  const supabase = createClient();
  const { data, error } = await supabase.from("classrooms").select(`*`);

  if (error) throw new Error("Failed to fetch data");

  return data;
}
