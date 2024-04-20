"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import ClassroomCreate from "../classroom/create";
import ClassroomJoin from "../classroom/join";
import Logout from "./Logout";
import Link from "next/link";

export default function DashNavbar() {
  return (
    <nav className="bg-white flex flex-row justify-end py-4 px-4 items-end fixed w-full z-50 shadow-lg">
      <div className="flex gap-3 flex-row w-full h-full relative justify-end ">
        <ClassroomCreate />
        <ClassroomJoin />
        <DropdownMenu>
          <DropdownMenuTrigger>
            {" "}
            <Avatar className="cursor-pointer my-10 md:my-0">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mx-2 my-4">
            <DropdownMenuLabel>
              {" "}
              <Link href="/profile">Profile</Link>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Classes</DropdownMenuItem>
            <DropdownMenuItem onClick={() => Logout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
