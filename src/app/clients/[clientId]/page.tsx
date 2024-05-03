"use client";

import ClientForm from "../components/client-form";
import { toast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { env } from "@/lib/env";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ZClient, TClient } from "@/lib/types";
import { defaultClient } from "@/lib/utils";

const ClientDetails = () => {
  const { clientId } = useParams<{ clientId: string }>();

  const [client, setClient] = useState<TClient>({} as TClient);
  const router = useRouter();

  useEffect(() => {
    const getClient = async () => {
      const res = await fetch(
        `${env.NEXT_PUBLIC_WEBAPPURL}/api/client/${clientId}`
      );
      if (res.ok) {
        const data = await res.json();
        setClient(data);
        return;
      }

      throw new Error("Error while getting client");
    };

    getClient();
  }, [clientId]);

  const onSubmit = async (data: TClient) => {
    const res = await fetch(
      `${env.NEXT_PUBLIC_WEBAPPURL}/api/client/${clientId}`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.ok) {
      toast({
        title: "Client upadated:",
        description: <h1>Updated client successfully</h1>,
      });

      router.push("/clients");

      return;
    }

    toast({
      title: "Trying to update client:",
      variant: "destructive",
      description: <h1>Error while upating a client</h1>,
    });
  };

  const form = useForm<TClient>({
    resolver: zodResolver(ZClient.omit({ id: true })),
    defaultValues: {
      ...defaultClient,
    },
    values: {
      ...client,
    },
  });

  return <ClientForm onSubmit={onSubmit} formType="update" form={form} />;
};

export default ClientDetails;
