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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { handleSubmit } from "./post-action";

export default function NoticeCreate({ classroom }) {
  const [open, setOpen] = useState(false);

  const schema = z.object({
    title: z.string().min(1, "Title of the notice is required"),
    body: z.string().min(1, "Body of the notice is required"),
  });

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((info) => {
    setOpen(false);
    handleSubmit({ info, classroom });
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(true)}>Post a notice</Button>
      <DialogContent className=" bg-background sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="tracking-wide">Posting a notice to </DialogTitle>
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
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Type the title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                className=" flex-1"
                name="body"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write the notice here"
                        className=""
                        {...field}
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
