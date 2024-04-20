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

import { FileUp } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import { handleSubmit } from "./submit-assignment";

export default function SubmitAssignment({ assignementid, disabled, classes }) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();

  const formSchema = z.object({
    file: z
      .any()
      .refine((files) => files?.length == 1, "File is required.")
      .refine(
        (files) => files?.[0]?.type == "application/pdf",
        "File must be a PDF."
      ),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");

  useEffect(() => {
    if (!open) {
      setFile(undefined);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button disabled={disabled} onClick={() => setOpen(true)}>Upload</Button>
      <DialogContent className=" bg-background sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle className="tracking-wide text-2xl">
            Upload your assignment
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              formData.append("assignmentid", assignementid);
              form.handleSubmit(async () => {
                const res = await handleSubmit(formData, classes).then((res) => {
                  setOpen(false);
                  setFile();
                  toast("File has been uploaded.", {
    
                  });
                });
              })(e);
            }}
            className="w-full p-10"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <div className="relative border-2 border-dashed h-56 bg-white hover:bg-slate-100 rounded flex flex-col items-center justify-center text-center cursor-pointer">
                      <Input
                        className="absolute top-0 left-0 h-full opacity-0"
                        type="file"
                        accept="application/pdf"
                        {...fileRef}
                        onChange={(e) => {
                          e.preventDefault();
                          setFile(e.target.files[0]);
                        }}
                      />
                      <p className="flex flex-row gap-2">
                        Drag and drop your file here <FileUp strokeWidth={1} />
                      </p>
                      <p>{file?.name ? file?.name : ""}</p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="mt-3" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
