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
import { TSignUp, ZSignUp } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import PasswordInput from "@/components/ui/password-input";
import FormWrapper from "../../components/FormWrapper";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";

export function SignUpForm() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<TSignUp>({
    resolver: zodResolver(ZSignUp),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TSignUp) => {
    const res = await fetch(`${env.NEXT_PUBLIC_WEBAPPURL}/api/user`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      toast({
        title: "Registration was successfull:",
        description: <h3>Please Login with your credentials</h3>,
      });

      router.push("/auth/sign-in");
    } else {
      toast({
        variant: "destructive",
        title: "Registration failed:",
        description: <h3>Could not register a user</h3>,
      });
    }
  };

  return (
    <FormWrapper formType="signUp">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Paul" id="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="samsmith@gmail.com" {...field} />
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
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
