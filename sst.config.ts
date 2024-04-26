import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

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
        environment: {
          USERNAME: process.env.USERNAME ? process.env.USERNAME : '',
          MONGODB_URI: process.env.MONGODB_URI ? process.env.MONGODB_URI : '',
          WEBURL: process.env.WEBURL ? process.env.WEBURL : ''
        }
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
