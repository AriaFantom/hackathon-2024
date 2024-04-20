"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

import { useState } from "react";
import CreateAttendance from "./create-attendance";
export default function TakeAttendance({ students, timetable }) {
  const [student, setStudent] = useState(0);
  const [timetableData, setTimetableData] = useState(null);

  const handleAtten = (status) => {
    setStudent(student + 1);
    CreateAttendance({ student: students[student], status, timetableData });
  };

  return (
    <Drawer
      onOpenChange={() => {
        setStudent(0);
        setTimetableData(null);
      }}
    >
      <DrawerTrigger className="bg-black text-white items-center flex flex-col px-4 py-2 rounded">
        Take Attendance
      </DrawerTrigger>
      <DrawerContent className="items-center flex flex-col">
        <DrawerHeader className="items-center flex flex-col">
          <DrawerTitle>Take Attendance</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>

        <Select onValueChange={(value) => setTimetableData(value)}>
          <SelectTrigger className=" my-4 w-[180px]">
            <SelectValue placeholder="Today" />
          </SelectTrigger>
          <SelectContent>
            {timetable.map((day, index) => {
              return (
                <SelectItem key={index} value={day}>
                  {day.subject} -{" "}
                  {new Date(day.start_time)
                    .toLocaleTimeString()
                    .replace(/:\d+ /, " ")}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <h2>
          {students.length == student
            ? "Attendance has been taken successfully!"
            : students[student].name + " - " + students[student].rollno}
        </h2>
        <DrawerFooter className="items-center flex">
          <div className="items-center flex">
            {students.length == student ? (
              <DrawerClose>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            ) : (
              <div className="flex flex-row gap-2">
                <Button
                  disabled={timetableData ? false : true}
                  onClick={() => handleAtten(true)}
                >
                  Present
                </Button>
                <Button
                  disabled={timetableData ? false : true}
                  onClick={() => handleAtten(false)}
                >
                  Absent
                </Button>
              </div>
            )}
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
