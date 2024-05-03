"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import PasswordInput from "@/components/ui/password-input";
import { ZSignIn, TSignIn } from "@/lib/types";
import FormWrapper from "../../components/FormWrapper";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { env } from "@/lib/env";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<TSignIn>({
    resolver: zodResolver(ZSignIn),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: TSignIn) {
    let res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: `${env.NEXT_PUBLIC_WEBAPPURL}`,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/");
    } else {
      toast({
        variant: "destructive",
        title: "Login failed:",
        description: <h3>Could not login a user, check your credentials</h3>,
      });
    }
  }

  return (
    <FormWrapper formType="signIn">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="samsmith@gmail.com"
                    {...field}
                    name="user_email"
                    id="user_email_id"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
