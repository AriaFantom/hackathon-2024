"use client";
import TakeAttendance from "@/components/layout/attendance/take-attendance";
import { useState } from "react";

export default function PrintAssignment({ students, timetable, attendance }) {
    const [attendances, setAttendances] = useState(attendance[0]);
  return (
    <div className="flex flex-col gap-4 items-start w-4/5 ">
      <TakeAttendance students={students} timetable={timetable} />
      <div className="flex flex-row gap-4 items-center w-full">
        {attendance.map((student, index) => {
          return (
            <div
              key={index}
              className="flex flex-row items-center justify-between gap-5 text-left bg-white p-5 rounded-lg shadow-md "
            >
              <div className="">
                <h1 className="text-4xl">Attendance of</h1>
                <h2 className="text-2xl">{student.time_table}</h2>
                <p className="text-sm">{student.created_date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
