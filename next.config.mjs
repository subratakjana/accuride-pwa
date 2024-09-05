/** @type {import('next').NextConfig} */
import redirectExtra from "./next_redirects/extra.mjs";
import redirectProducts from "./next_redirects/products.mjs";
import redirectPages from "./next_redirects/pages.mjs";
import CompressionPlugin from "compression-webpack-plugin";
import zlib from "zlib";

// const dotenv = config({
//   path: `./environments/${process.env.NEXT_PUBLIC_NODE_ENV}.env`,
// });

const ContentSecurityPolicy = `
  default-src 'self' wss: blob: https://api.yotpo.com/ https://my.jst.ai https://accuride.resultsstage.com http://cdn.jst.ai https://na.klarnaevt.com https://ca.klarnaevt.com https://region1.analytics.google.com https://heapanalytics.com/ https://ipapi.co/  app.vwo.com https://img.onesignal.com https://www.paypalobjects.com https://www.paypal.com https://www.sandbox.paypal.com https://bm.paypal.com https://c.paypal.com https://c6.paypal.com https://b.stats.paypal.com https://t.paypal.com https://postcollector.paypal.com https://lhr.stats.paypal.com https://www.msmaster.qa.paypal.com https://www.youtube.com https://img.youtube.com https://stage.accuride.com https://www.accuride.com https://marketing.accuride.com https://extranet.accuride.com wss://widget-mediator.zopim.com  https://*.cybersource.com/ https://js.playground.klarna.com https://na.playground.klarnaevt.com https://ca.playground.klarnaevt.com http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com https://cdn.onesignal.com https://onesignal.com  https://x.klarnacdn.net/ https://accuride.zendesk.com/  https://*.visualwebsiteoptimizer.com https://bat.bing.com https://static.zdassets.com/  https://h.online-metrix.net  https://www.google-analytics.com/ https://i.ytimg.com  https://gifs.com/ https://api.ipstack.com https://accuride.resultspage.com http://accuride.resultspage.com/  https://www.gstatic.com http://fonts.gstatic.com https://maps.gstatic.com  https://api.factors.ai  https://app.factors.ai  https://cdn.jst.ai  https://bam.nr-data.net/  https://api-cdn.yotpo.com  http://p.yotpo.com https://www.google.co.in https://api-us-west-2.hygraph.com/ https://api-us-west-2.graphcms.com https://stats.g.doubleclick.net  http://fonts.googleapis.com https://jnn-pa.googleapis.com https://maps.googleapis.com https://analytics.google.com/ http://i/ https://i/ https://s7.addthis.com https://aly.jst.ai/ https://www.google.com  https://api.ipgeolocation.io https://media.graphassets.com/  https://ekr.zdassets.com/  https://*.online-metrix.net/ https://songbirdstag.cardinalcommerce.com/ https://songbird.cardinalcommerce.com/ https://okt.to https://googleads.g.doubleclick.net https://tools.justuno.com  https://td.doubleclick.net  https://js-agent.newrelic.com  https://unpkg.com/     https://play.google.com/ https://www.google.ca https://b.sli-spark.com/  https://accuride.resultsdemo.com/  https://www.googletagmanager.com/  ;


  img-src  'self'   https://heapanalytics.com/ http://cdn.jst.ai https://www.google.ie  https://ipapi.co/   https://stats.g.doubleclick.net https://td.doubleclick.net https://googleads.g.doubleclick.net https://bam.nr-data.net https://*.visualwebsiteoptimizer.com/ http://www.google-analytics.com wingify-assets.s3.amazonaws.com app.vwo.com    https://www.paypalobjects.com https://www.paypal.com https://www.sandbox.paypal.com https://bm.paypal.com https://c.paypal.com https://c6.paypal.com https://b.stats.paypal.com https://img.onesignal.com http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com https://t.paypal.com https://postcollector.paypal.com https://lhr.stats.paypal.com https://www.msmaster.qa.paypal.com https://www.youtube.com https://img.youtube.com data: https://stage.accuride.com https://www.accuride.com https://marketing.accuride.com https://extranet.accuride.com https://cdn.onesignal.com https://onesignal.com https://accuride.zendesk.com/ http://i/ https://i/ wss://widget-mediator.zopim.com   https://b.sli-spark.com/ https://static.zdassets.com/ https://ekr.zdassets.com/   https://i.ytimg.com https://*.online-metrix.net  https://h.online-metrix.net/  https://bat.bing.com  https://www.google.com https://www.google.ca https://www.google.co.in  https://www.gstatic.com http://fonts.gstatic.com https://maps.gstatic.com http://fonts.googleapis.com https://jnn-pa.googleapis.com https://maps.googleapis.com  https://www.googletagmanager.com  https://api-cdn.yotpo.com  http://p.yotpo.com  https://www.google-analytics.com/  https://media.graphassets.com/ https://media.graphcms.com/;
  
  
  script-src   'self' 'unsafe-eval' 'nonce-t+ZE/8zrvyit6T3ybc82KQ==' blob: https://challenges.cloudflare.com https://heapanalytics.com/ http://cdn.jst.ai https://ipapi.co/  app.vwo.com/ https://www.paypalobjects.com https://www.paypal.com https://www.sandbox.paypal.com https://bm.paypal.com https://c.paypal.com https://c6.paypal.com https://b.stats.paypal.com https://t.paypal.com https://postcollector.paypal.com https://lhr.stats.paypal.com https://www.msmaster.qa.paypal.com  https://stage.accuride.com https://www.accuride.com https://marketing.accuride.com https://extranet.accuride.com http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com https://*.cybersource.com/ https://js.playground.klarna.com https://na.playground.klarnaevt.com https://ca.playground.klarnaevt.com https://x.klarnacdn.net/ https://cdn.onesignal.com https://onesignal.com https://www.googleadservices.com wss://widget-mediator.zopim.com https://accuride.zendesk.com/ https://img.onesignal.com https://zendesk-eu.my.sentry.io  https://static.zdassets.com/ https://*.visualwebsiteoptimizer.com/ http://i/ https://i/ https://ekr.zdassets.com/ https://h.online-metrix.net/ https://songbirdstag.cardinalcommerce.com/ https://songbird.cardinalcommerce.com/ https://app.factors.ai https://api.factors.ai  https://okt.to https://googleads.g.doubleclick.net https://tools.justuno.com  https://bat.bing.com  https://accuride.resultspage.com/  http://accuride.resultspage.com/  https://stats.g.doubleclick.net https://bam.nr-data.net  https://www.gstatic.com http://fonts.gstatic.com https://maps.gstatic.com  https://js-agent.newrelic.com  https://api-cdn.yotpo.com  http://p.yotpo.com http://fonts.googleapis.com https://jnn-pa.googleapis.com https://maps.googleapis.com  https://unpkg.com/  https://s7.addthis.com  https://cdn.jst.ai/  https://analytics.google.com/ https://aly.jst.ai/ https://b.sli-spark.com/ https://accuride.resultsdemo.com/  https://www.googletagmanager.com/  https://*.online-metrix.net  https://www.google-analytics.com/ https://i.ytimg.com  https://gifs.com/ https://api.ipstack.com   https://www.google.co.in https://api-us-west-2.hygraph.com/  https://td.doubleclick.net https://www.google.com https://www.google.ca https://play.google.com/  https://api.ipgeolocation.io https://media.graphassets.com/;
  
  
  script-src-elem  'self' 'unsafe-inline' https://challenges.cloudflare.com https://code.jquery.com https://www.google.com https://www.google.ca https://heapanalytics.com/ http://cdn.jst.ai https://ipapi.co/    app.vwo.com   https://www.youtube.com https://img.youtube.com https://www.google.co.in https://www.googleadservices.com https://www.paypalobjects.com https://www.paypal.com https://www.sandbox.paypal.com https://bm.paypal.com https://c.paypal.com https://c6.paypal.com https://b.stats.paypal.com https://t.paypal.com https://postcollector.paypal.com https://lhr.stats.paypal.com https://www.msmaster.qa.paypal.com https://js.playground.klarna.com https://img.onesignal.com https://x.klarnacdn.net/  https://*.cybersource.com/  https://na.playground.klarnaevt.com https://ca.playground.klarnaevt.com http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com https://cdn.onesignal.com https://onesignal.com  https://stage.accuride.com http://i/ https://i/ https://marketing.accuride.com https://www.accuride.com https://extranet.accuride.com wss://widget-mediator.zopim.com https://accuride.zendesk.com    https://*.visualwebsiteoptimizer.com/ https://static.zdassets.com/ https://ekr.zdassets.com/  https://*.online-metrix.net  https://songbirdstag.cardinalcommerce.com/ https://songbird.cardinalcommerce.com/ http://www.google-analytics.com/ https://www.gstatic.com http://fonts.gstatic.com https://maps.gstatic.com https://app.factors.ai https://api.factors.ai https://okt.to https://stats.g.doubleclick.net https://tools.justuno.com   https://bat.bing.com   https://accuride.resultspage.com/ http://accuride.resultspage.com/  https://googleads.g.doubleclick.net https://td.doubleclick.net https://api-cdn.yotpo.com  http://p.yotpo.com https://bam.nr-data.net  https://js-agent.newrelic.com http://fonts.googleapis.com https://jnn-pa.googleapis.com https://maps.googleapis.com  https://unpkg.com/    https://s7.addthis.com   https://cdn.jst.ai/  https://www.google-analytics.com/  https://analytics.google.com/ https://my.jst.ai/ https://b.sli-spark.com/ https://aly.jst.ai/  https://accuride.resultsdemo.com/  https://www.googletagmanager.com/  ;
  
  
  style-src    'self' 'unsafe-inline' https://heapanalytics.com/  http://cdn.jst.ai https://ipapi.co/ http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com https://www.youtube.com https://img.youtube.com https://bam.nr-data.net https://img.onesignal.com  https://www.google.co.in https://www.paypalobjects.com https://www.paypal.com https://www.sandbox.paypal.com https://bm.paypal.com https://c.paypal.com https://c6.paypal.com https://b.stats.paypal.com https://t.paypal.com https://postcollector.paypal.com https://lhr.stats.paypal.com https://www.msmaster.qa.paypal.com https://api-cdn.yotpo.com  http://p.yotpo.com https://js.playground.klarna.com  https://na.playground.klarnaevt.com https://ca.playground.klarnaevt.com http://i/ https://i/ https://*.online-metrix.net  http://cdnjs.cloudflare.com https://*.cybersource.com/ https://cdn.onesignal.com https://onesignal.com https://static.zdassets.com/ https://ekr.zdassets.com/ https://accuride.zendesk.com/   https://*.visualwebsiteoptimizer.com/  https://cdn.jst.ai https://aly.jst.ai https://my.jst.ai/ http://fonts.googleapis.com https://jnn-pa.googleapis.com https://maps.googleapis.com;
  
  
  style-src-elem   'self' 'unsafe-inline' https://www.google-analytics.com/ http://cdn.jst.ai https://heapanalytics.com/  https://ipapi.co/ https://www.youtube.com https://img.youtube.com https://bam.nr-data.net https://*.visualwebsiteoptimizer.com/   https://www.google.co.in https://www.paypalobjects.com https://www.paypal.com https://www.sandbox.paypal.com https://bm.paypal.com https://c.paypal.com https://c6.paypal.com https://b.stats.paypal.com https://t.paypal.com https://postcollector.paypal.com https://lhr.stats.paypal.com https://www.msmaster.qa.paypal.com https://api-cdn.yotpo.com https://img.onesignal.com http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com http://p.yotpo.com http://i/ https://i/ https://js.playground.klarna.com https://na.playground.klarnaevt.com https://ca.playground.klarnaevt.com https://cdn.jst.ai https://aly.jst.ai  https://*.cybersource.com/ https://cdn.onesignal.com https://onesignal.com   https://stage.accuride.com https://www.accuride.com https://marketing.accuride.com https://*.online-metrix.net https://extranet.accuride.com  https://accuride.zendesk.com/ http://fonts.googleapis.com https://jnn-pa.googleapis.com https://maps.googleapis.com https://static.zdassets.com/ https://ekr.zdassets.com/  http://cdnjs.cloudflare.com;
  
  font-src 'self' data: https://www.gstatic.com http://fonts.gstatic.com https://maps.gstatic.com   https://heapanalytics.com/ http://cdn.jst.ai https://aly.jst.ai  https://ipapi.co/   https://www.youtube.com https://img.youtube.com https://bam.nr-data.net   https://www.google.co.in https://accuride.zendesk.com/ https://stage.accuride.com https://img.onesignal.com https://www.accuride.com http://i/ http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ https://i/ http://cdn-widgetsrepository.yotpo.com https://cdn-widgetsrepository.yotpo.com https://marketing.accuride.com https://extranet.accuride.com  https://api-cdn.yotpo.com  http://p.yotpo.com https://maxcdn.bootstrapcdn.com ;
  base-uri 'none';
  
  
  frame-src  https://challenges.cloudflare.com https://www.instagram.com/ http://gifs.com/ https://my.jst.ai/ https://js.klarna.com/ https://td.doubleclick.net https://stats.g.doubleclick.net  https://googleads.g.doubleclick.net https://www.googletagmanager.com https://*.visualwebsiteoptimizer.com/  actionlink.com https://platform.twitter.com https://syndication.twitter.com  https://*.online-metrix.net https://h.online-metrix.com https://js.playground.klarna.com http://i/ https://img.onesignal.com https://i/ http://staticw2.yotpo.com/ https://staticw2.yotpo.com/ http://cdn-widgetsrepository.yotpo.com/ https://cdn-widgetsrepository.yotpo.com/ https://stage.accuride.com https://www.accuride.com https://marketing.accuride.com https://extranet.accuride.com http://cdn.jst.ai https://cdn.jst.ai https://aly.jst.ai   https://www.youtube.com https://img.youtube.com https://www.google.com https://www.google.ca 
  `;

const nextConfig = {
  reactStrictMode: true,
  /** @type {import('next').NextConfig['images']} */
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stage.accuride.com", port: "" },
      { protocol: "https", hostname: "admin1lrgss.accuride.com", port: "" },
      {
        protocol: "https",
        hostname: "upgrade-stage-64lykoy-l24yhalb7njp4.us-3.magentosite.cloud",
        port: "",
      },
      { protocol: "https", hostname: "pwademo.accuride.com", port: "" },
      { protocol: "https", hostname: "media.graphcms.com", port: "" },
      { protocol: "https", hostname: "www.accuride.com", port: "" },
      { protocol: "https", hostname: "media.graphassets.com", port: "" },
      {
        protocol: "https",
        hostname: "d2qsw8rqvfv6oj.cloudfront.net",
        port: "",
      },
      { protocol: "https", hostname: "img.youtube.com", port: "" },
      { protocol: "https", hostname: "i.ytimg.com", port: "" },
    ],
    // deviceSizes: [320, 480, 575, 768, 1024, 1240, 1920],
    minimumCacheTTL: 31536000,
    // maxAge: 31536000,

    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // svg|jpg|png|webp|
        source: "/:all*(js)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Permissions-Policy",
            value:
              'fullscreen=(self "https://stage.accuride.com" "https://marketing.accuride.com" "https://extranet.accuride.com" "https://www.accuride.com" ), geolocation=( self "https://maps.gstatic.com" "https://maps.googleapis.com" "https://stage.accuride.com" "https://www.accuride.com" ), camera=()',
          },
          {
            //response header should contain the MIME type
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            //stop the pages from loading when they detect xss attacks
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            // to avoid click-jacking attacks, by ensuring that their content is not embedded into other sites.
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            // it tells information about wher the user comes from
            // no header send when less-secure destination HTTPS to HTTP
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            //it allow only https in our site - HSTS
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  // env: {
  //   ...dotenv.parsed,
  // },
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(graphql|gql)$/,
  //     exclude: /node_modules/,
  //     loader: "graphql-tag/loader",
  //   });
  //   config.plugins.push(
  //     new CompressionPlugin({
  //       algorithm: "gzip",
  //     }),
  //   );
  //   return config;
  // },
  webpack: (config, { dev, isServer }) => {

    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });

    if (!dev && !isServer) {
      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
        })
      );

      config.plugins.push(
        new CompressionPlugin({
          filename: '[path][base].br',
          algorithm: 'brotliCompress',
          test: /\.(js|css|html|svg)$/,
          compressionOptions: {
            params: {
              [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
            },
          },
          threshold: 10240,
          minRatio: 0.8,
        })
      );
    }

    return config;
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // TODO: total number of custom routes exceeds 1000, this can reduce performance.
  // https://nextjs.org/docs/messages/max-custom-routes-reached
  async redirects() {
    return [...redirectPages, ...redirectProducts, ...redirectExtra];
  },
  // workboxOpts: {
  //   skipWaiting: true,
  //   clientsClaim: true,
  //   runtimeCaching: [
  //     {
  //       urlPattern: /^https?.*/,
  //       handler: "NetworkFirst",
  //       options: {
  //         cacheName: "https-calls",
  //         networkTimeoutSeconds: 15,
  //         expiration: {
  //           maxEntries: 150,
  //           maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
  //         },
  //         cacheableResponse: {
  //           statuses: [0, 200],
  //         },
  //       },
  //     },
  //   ],
  // },
};

export default nextConfig;
