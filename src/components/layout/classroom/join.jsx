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
import { handleSubmit } from "./join-action";

export default function ClassroomJoin() {
  const [open, setOpen] = useState(false);

  const schema = z.object({
    code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    rollno: z.string().min(1, "Roll is required"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((data) => {
    setOpen(false);
    handleSubmit(data);
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Join Class</Button>
      <DialogContent className=" bg-background sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="tracking-wide">Join Classroom</DialogTitle>
          <DialogDescription className="tracking-medium">
           Fill the details of your for the classroom
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
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Type the classroom code to join" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=" flex-1"
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your name to join the classroom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                className=" flex-1"
                name="rollno"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Roll Number / Student ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your Roll Number / Student ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Join Class</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
