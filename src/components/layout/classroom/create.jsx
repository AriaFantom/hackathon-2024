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
import { handleSubmit } from "./create-action";

export default function ClassroomCreate() {
  const [open, setOpen] = useState(false);

  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    instituion: z.string().min(1, "instituion is required"),
    department: z.string().min(1, "Department is required"),
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
      <Button onClick={() => setOpen(true)}>Create Class</Button>
      <DialogContent className=" bg-background sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="tracking-wide">Create Classroom</DialogTitle>
          <DialogDescription className="tracking-medium">
            Fill up the inital details of the class room
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
                      <Input placeholder="Type the name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="instituion"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>instituion</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type the name of your instituion"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="department"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type the department subject"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
