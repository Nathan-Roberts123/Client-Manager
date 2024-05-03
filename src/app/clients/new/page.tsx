"use client";

import { toast } from "@/components/ui/use-toast";
import ClientForm from "../components/client-form";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZClient, TClient } from "@/lib/types";
import { defaultClient } from "@/lib/utils";

export default function InputForm() {
  const router = useRouter();

  const form = useForm<TClient>({
    resolver: zodResolver(ZClient.omit({ id: true })),
    defaultValues: {
      ...defaultClient,
    },
  });

  async function onSubmit(data: TClient) {
    const res = await fetch(`${env.NEXT_PUBLIC_WEBAPPURL}/api/client`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      toast({
        title: "Success:",
        description: <h3>Successfully created a client</h3>,
      });
      router.push("/clients");
      return;
    }

    toast({
      variant: "destructive",
      title: "Failed:",
      description: <h3>Failed to create client</h3>,
    });
  }

  return <ClientForm onSubmit={onSubmit} formType="create" form={form} />;
}
