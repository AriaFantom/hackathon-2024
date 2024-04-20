"use client";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { X, Trash2  } from "lucide-react";
import { useState } from "react";
import handleDelete from "./delete-class";
import NewTimeTable from "./new_time";
export default function TimeTable({ data }) {
  const [day, setDay] = useState(
    new Date().toLocaleDateString("en-US", { weekday: "long" })
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <section className="flex flex-col ml-64 px-20 items-start justify-center text-center ">
      <Select onValueChange={(value) => setDay(value)}>
        <SelectTrigger className=" my-4 w-[180px]">
          <SelectValue placeholder="Today" />
        </SelectTrigger>
        <SelectContent>
          {days.map((day, index) => {
            return (
              <SelectItem key={index} value={day}>
                {day}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      <div className="item-center text-start w-full my-5">
        <h2 className="text-xl">Students Table</h2>
        <Table className="items-center justify-center w-full text-center border-2 rounded-lg">
          <TableHeader>
            <TableRow className="bg-purple-900 rounded-lg">
              <TableHead className="items-center text-center text-white">
                Subject
              </TableHead>
              <TableHead className="items-center text-center text-white">
                Teacher
              </TableHead>
              <TableHead className="items-center text-center text-white">
                Start Time
              </TableHead>
              <TableHead className="items-center text-center text-white">
                End Time
              </TableHead>
              <TableHead className="items-center text-center text-white">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => {
              if (item.day === days.indexOf(day) + 1) {
                return (
                  <TableRow key={index} className="bg-white">
                    <TableCell className="font-medium">
                      {item.subject}
                    </TableCell>
                    <TableCell className="font-medium">
                      {item.teacher}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(item.start_time)
                        .toLocaleTimeString()
                        .replace(/:\d+ /, " ")}
                    </TableCell>
                    <TableCell className="font-medium">
                      {new Date(item.end_time)
                        .toLocaleTimeString()
                        .replace(/:\d+ /, " ")}
                    </TableCell>
                    <TableCell className="font-medium">
                      <button
                        onClick={() =>
                          handleDelete({ id: item.id, classes: item.classroom })
                        }
                      >
                        <Trash2 color="red" size={16} />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </div>

      <NewTimeTable classes={data[0].classroom} />
    </section>
  );
}
