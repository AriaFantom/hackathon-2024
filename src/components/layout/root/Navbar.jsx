"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import Link from "next/link";

const pages = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const supabase = createClient();

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  console.log(session);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-black flex flex-row justify-between py-4 px-4 items-center fixed w-full z-50">
      <Image src="/logo.png" alt="logo" width={50} height={50} />
      <div
        className={
          open
            ? "flex flex-col md:flex-row  bg-black fixed top-0 right-0 md:w-[55%]  w-full h-full md:relative justify-center md:justify-between items-center"
            : "hidden md:flex flex-col md:flex-row  bg-black fixed top-0 right-0 md:w-[55%]  w-full h-full md:relative justify-center md:justify-between items-center"
        }
      >
        <ul className="flex flex-col md:flex-row gap-10 items-center ">
          {pages.map((page) => (
            <li className="text-white  cursor-pointer text-2xl" key={page.name}>
              {page.name}
            </li>
          ))}
        </ul>
        {session ? (
          <Avatar className="cursor-pointer my-10 md:my-0">
            <AvatarImage
              onClick={() => router.push("/classrooms")}
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex flex-row gap-3 my-10 md:my-0">
            <Link href="/login">
              <Button variant="outline" className="text-lg">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" className="text-lg">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {open ? (
        <X
          size="35"
          color="#fff"
          className="absolute right-1 cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
        />
      ) : (
        <Menu
          size="35"
          color="#fff"
          className="absolute right-1 cursor-pointer md:hidden"
          onClick={() => setOpen(!open)}
        />
      )}
    </nav>
  );
}
