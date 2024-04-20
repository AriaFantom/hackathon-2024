import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function LoginButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center flex-col gap-4">
      Hey, {user.user_metadata.full_name}!
      <Link href="/classrooms"> Classes</Link>
      <form action={signOut}>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <Button>
      <Link
        href="/login"
        className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
    </Button>
  );
}
