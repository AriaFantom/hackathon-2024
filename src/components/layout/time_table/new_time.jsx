"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DateTimePicker, TimePicker } from "@/components/ui/time-picker";
import handleCreate from "./add-class";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function NewTimeTable({ classes }) {
  const [open, setOpen] = useState(false);

  const schema = z.object({
    teacher: z.string().min(1, "Teacher for the subject is required"),
    subject: z.string().min(1, "Subject of the time table is required"),
    day: z.string(),
    start_time: z.object({ hour: z.number(), minute: z.number() }).nullable(),
    end_time: z.object({ hour: z.number(), minute: z.number() }).nullable(),
  });
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((info) => {
    setOpen(false);
    handleCreate({ info, classes });
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Create TimeTable</Button>
      <DialogContent className=" bg-background sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="tracking-wide">
            Creating the time Table{" "}
          </DialogTitle>
          <DialogDescription className="tracking-medium">
            Fill up the form to create your desired time table
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex w-full flex-wrap relative items-start gap-5 justify-start">
              <FormField
                className=" flex-1"
                name="teacher"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Teacher</FormLabel>
                    <FormControl>
                      <Input placeholder="Type the teacher" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=" flex-1"
                name="subject"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Type the subject" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=" flex-1"
                name="day"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Day</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="">
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-center gap-4 w-full">
                <FormField
                  className="flex flex-col "
                  name="start_time"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-1/2">
                      <FormLabel>Start Time</FormLabel>
                      <FormControl>
                        <TimePicker
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  className="flex flex-col"
                  name="end_time"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-1/2">
                      <FormLabel>End Time</FormLabel>
                      <FormControl>
                        <TimePicker
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button type="submit">Update</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
