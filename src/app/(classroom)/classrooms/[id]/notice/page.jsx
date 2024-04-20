import NoticeCreate from "@/components/layout/notice/notice-create";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Notice({ params }) {
  const data = await getNotice(params.id);

  return (
    <main className="flex flex-col items-center justify-center  pl-64 text-center w-full">
      <h1 className="font-semibold my-5 text-2xl">Notice List</h1>
      <div className="flex flex-row items-end w-4/5">
        <NoticeCreate classroom={params.id} />
      </div>

      <div className="flex flex-col gap-5 w-4/5 mt-5">
        {data?.data
          ? data.data.map((notice, index) => {
              return (
                <section
                  className="flex flex-col items-start justify-center gap-5 text-left bg-white p-5 rounded-lg shadow-md w-full"
                  key={index}
                >
                  <h1 className="text-3xl text-blue-500">{notice.title}</h1>
                  <p>{notice.body}</p>
                </section>
              );
            })
          : "No notice right now."}
      </div>
    </main>
  );
}

async function getNotice(id) {
  const supabase = createClient();
  const data = await supabase.from("notice").select(`*`).eq("classroom", id);

  return data;
}
