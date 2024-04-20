'use client';
import * as z from 'zod';
import Link from 'next/link';
import { signUp } from './handleSignup';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitButton } from '@/components/auth/submit-button';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useState } from 'react';

const schema = z.object({
  email: z.string().email(),
  fullname: z.string().min(2),
  password: z.string().min(8),
});

export default function Login({ searchParams }) {
  const form = useForm({
    resolver: zodResolver(schema),
  });

  const [submitting, isSubmitting] = useState(false);

  const onSubmit = form.handleSubmit((data) => {
    isSubmitting(true);
    signUp(data)
      .then((info) => toast(info))
      .then(() => isSubmitting(false));
  });

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center w-full px-8 sm:max-w-md justify-center gap-2">
        <Form {...form}>
          <form className="animate-in flex-1 flex flex-col w-full justify-center gap-1 text-foreground">
            <FormField
              className=" "
              name="fullname"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              className=" "
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
              formAction={form.handleSubmit(onSubmit)}
              variant="secondary"
              className=" rounded-md px-4 py-2 text-foreground my-4 border border-foreground/20"
              pendingText="Creating Account..."
              pending={submitting}
            >
              Create Account
            </SubmitButton>

            <div className="text-center">
              <p>
                Already have an account?{'  '}
                <Link className="text-blue-700" href="/login">
                  Sign In
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
