import { NextjsSite } from "sst/constructs";
import { Duration } from "aws-cdk-lib";
import {
  CachePolicy,
  CacheQueryStringBehavior,
  CacheHeaderBehavior,
  CacheCookieBehavior,
} from "aws-cdk-lib/aws-cloudfront";



export default {
  config(_input) {
    return {
      name: "accuride-pwa",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const serverCachePolicy = new CachePolicy(stack, "ServerCache", {
        queryStringBehavior: CacheQueryStringBehavior.all(),
        headerBehavior: CacheHeaderBehavior.none(),
        cookieBehavior: CacheCookieBehavior.all(),
        defaultTtl: Duration.days(0),
        maxTtl: Duration.days(365),
        minTtl: Duration.days(0),
        enableAcceptEncodingBrotli: true,
        enableAcceptEncodingGzip: true,
      });
      const site = new NextjsSite(stack, "site", {
        warm: 2,
        runtime: "nodejs18.x",
        timeout: "30 seconds",
        cdk: {
          serverCachePolicy,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
};
