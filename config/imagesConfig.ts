import { NextConfig } from "next";

export const imageConfig: NextConfig["images"] = {
  domains: [
    "stage.accuride.com",
    "admin1lrgss.accuride.com",
    "upgrade-stage-64lykoy-l24yhalb7njp4.us-3.magentosite.cloud",
    "pwademo.accuride.com",
    "media.graphcms.com",
    "www.accuride.com",
    "media.graphassets.com",
    "d2qsw8rqvfv6oj.cloudfront.net",
    "img.youtube.com",
    "i.ytimg.com",
  ],
  // deviceSizes: [320, 480, 575, 768, 1024, 1240, 1920],
  minimumCacheTTL: 31536000,
  // maxAge: 31536000,
  formats: ["image/avif", "image/webp"],
};
