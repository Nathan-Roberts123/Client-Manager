import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";
import { env } from "@/lib/env";

export default {
  config(_input) {
    return {
      name: "Client-Manager",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        customDomain: {
          domainName: "nathancody.xyz",
          domainAlias: "www.nathancody.xyz",
        },
        environment: {
          DATABASE_URL: env.DATABASE_URL,
          NEXTAUTH_SECRET: env.NEXTAUTH_SECRET,
          NEXTAUTH_URL: process.env.NEXTAUTH_URL!,
          GOOGLE_CLIENT_ID: env.GOOGLE_CLIENT_ID,
          GOOGLE_CLIENT_SECRET: env.GOOGLE_CLIENT_SECRET,
          NEXT_PUBLIC_WEBAPPURL: env.NEXT_PUBLIC_WEBAPPURL,
          NEXT_PUBLIC_NODE_ENV: env.NEXT_PUBLIC_NODE_ENV,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
