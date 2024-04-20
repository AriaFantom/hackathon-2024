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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { DateTimePicker } from "@/components/ui/time-picker";
import { handleSubmit } from "./create-assignment";

export default function AssignmentsCreate({ classes }) {
  const [open, setOpen] = useState(false);

  const schema = z.object({
    name: z.string().min(1, "Name of the assignment is required"),
    date: z.date().min(new Date(), "Date must be in the future"),
  });
  const form = useForm({
    resolver: zodResolver(schema),
  });
  const onSubmit = form.handleSubmit((info) => {
    setOpen(false);
    handleSubmit({ info, classes });
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Create Assignment</Button>
      <DialogContent className=" bg-background sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="tracking-wide">
            Posting a notice to{" "}
          </DialogTitle>
          <DialogDescription className="tracking-medium">
            Fill up the form to post a notice
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
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=" flex-1"
                name="date"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Submission Date</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="minute"
                        hourCycle={12}
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Post</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
