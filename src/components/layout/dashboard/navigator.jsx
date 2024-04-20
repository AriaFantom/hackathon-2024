"use client";
import {
  Home,
  LibraryBig,
  Table,
  UserRound,
  MessageSquareText,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navigator({ values }) {
  const router = useRouter();
  return (
    <nav className="pt-28 pb-20 pl-28 flex flex-col items-center">
      <ul className="flex flex-row gap-32 items-center">
        <li
          className="bg-purple-900 text-white w-32 text-center rounded-lg py-3 cursor-pointer"
          onClick={() => router.push("/classrooms/" + values.id)}
        >
          {" "}
          <span className="flex flex-row items-center justify-center gap-2">
            <Home /> Home
          </span>
        </li>
        <li
          className="bg-purple-900 text-white w-32  text-center rounded-lg py-3 cursor-pointer"
          onClick={() => router.push("/classrooms/" + values.id + "/timetable")}
        >
          <span className="flex flex-row items-center justify-center gap-2">
            <Table /> Time Table
          </span>
        </li>
        <li
          className="bg-purple-900 text-white w-32  text-center rounded-lg py-3 cursor-pointer"
          onClick={() =>
            router.push("/classrooms/" + values.id + "/assignments")
          }
        >
          {" "}
          <span className="flex flex-row items-center justify-center gap-2">
            <LibraryBig /> Assignment
          </span>
        </li>
        <li
          className="bg-purple-900 text-white w-32  text-center rounded-lg py-3 cursor-pointer"
          onClick={() =>
            router.push("/classrooms/" + values.id + "/attendance")
          }
        >
          <span className="flex flex-row items-center justify-center gap-2">
            <UserRound /> Attendance
          </span>
        </li>
        <li
          className="bg-purple-900 text-white w-32  text-center rounded-lg py-3 cursor-pointer"
          onClick={() => router.push("/classrooms/" + values.id + "/notice")}
        >
          <span className="flex flex-row items-center justify-center gap-2">
            <MessageSquareText /> Notice
          </span>
        </li>
      </ul>
    </nav>
  );
}
