"use client";
import * as z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitButton } from "@/components/auth/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SignIn } from "./handleLogin";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export default function Login({ searchParams }) {

  const form = useForm({
    resolver: zodResolver(schema),
  });
  const { isSubmitting } = form.formState;
  const onSubmit = form.handleSubmit((data) => {
    SignIn(data);
  });

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="animate-in flex-1 flex flex-col w-full justify-center gap-1 text-foreground"
          >
            <FormField
              className=" "
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              className=""
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton
              className=" rounded-md px-4 py-2  my-4 border border-foreground/20"
              pendingText="Logging in..."
              pending={isSubmitting}
            >
              Login
            </SubmitButton>
            <div className="text-center">
              <p>
                {"Don't have an account? "}
                <Link className="text-blue-700" href="/signup">
                  Sign Up
                </Link>
              </p>
            </div>

            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                {searchParams.message}
              </p>
            )}
          </form>
        </Form>
        <Link
          href="/"
          className=" py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>
      </div>
    </main>
  );
}
