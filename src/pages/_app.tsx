import React, { useCallback, useEffect, useRef, useState } from "react";
import "@Styles/index.scss";
import withZoneLang from "@HOCs/withZoneLang";
import Layout from "@Components/Layout";
import { ClientContext } from "graphql-hooks";
import withApollo from "@HOCs/withApollo";
import { AuthProvider } from "@Contexts/AuthContext";
import Script from "next/script";
import { getCookie } from "@Hooks/criptoEncodeDecodeCookie";
import { useRouter } from "next/router";
import cookiePopup from "@Hooks/cookiePopup";
import Head from "next/head";
import { LoadingIndicator } from "@Components/Utilities";
import { APIProvider } from "@vis.gl/react-google-maps";
import MarkupTemplate from "@Components/Utilities/MarkupTemplate";

const allZone = ["en-us", "en-ca"];

const CheckForCanonical = (curPath) => {
  const canonicalPagesArr = [
    "/markets",
    "/blog",
    "/news",
    "/resources",
    "/company",
    "/careers",
    "/warranty",
    "/privacy",
    "/terms-of-sale",
    "/contact",
    "/distributors",
    "/drawer-slides",
    "/specialty-slides",
    "/covid19-update",
    "/proadvantage",
    "/p65warnings-california",
    "/support",
    "/customer",
    "/checkout",
    "/search",
    "/corrosion-resistant-slides",
  ];
  const ifCanonicalAdd = canonicalPagesArr.filter((item) =>
    curPath.includes(item),
  );
  return (
    ifCanonicalAdd &&
    (ifCanonicalAdd.length > 0 ||
      curPath === "/en-us" ||
      curPath === "/en-ca" ||
      curPath === "/en-us/products" ||
      curPath === "/en-ca/products")
  );
};

const defaultMarkupTemplate = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Accuride",
  url: `${process.env.NEXT_PUBLIC_BASE_PATH}`,
  logo: `${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/accuride-logo-desktop.svg`,
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "888-491-7112",
      contactType: "customer service",
    },
  ],
  sameAs: [
    "https://www.facebook.com/AccurideInternational",
    "https://www.twitter.com/accurideus",
    "https://www.instagram.com/accurideus",
  ],
};

const handleRouteChange = (path) => {
  if (window.newrelic) {
    setTimeout(() => {
      try {
        const i = window.newrelic.interaction();
        i.setName(path).save();
        i.end();
      } catch (error) {
        console.log(error);
      }
    }, 2000);
  }
};

const hasCss = () =>
  Array.from(document.styleSheets).some((styleSheet) =>
    styleSheet.href?.includes("cookieconsent.min.css"),
  );

const WebApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const seoDetailss = pageProps.seodata;
  const [isLoading, setIsLoading] = useState(false);
  const [gtmFlag, reLoadGtm] = useState(false);
  const observerRef = useRef<MutationObserver>();
  const seoData = seoDetailss?.markupTemplate ? seoDetailss.markupTemplate : defaultMarkupTemplate;
  useEffect(() => {
    const observer = observerRef.current;
    return () => observer?.disconnect();
  }, []);

  useEffect(() => {
    const start = () => {
      if (true) {
        console.log("start");
        setIsLoading(true);
      }
    };
    const end = () => {
      console.log("findished");
      setIsLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router.events]);

  useEffect(() => {
    localStorage.setItem("IfGtmLoad", false);
    if (window.newrelic) window.newrelic.setErrorHandler(() => true);
    const winHref = window.location;
    if (
      winHref.href.indexOf("accuride.com") >= 0 &&
      winHref.href.indexOf("www.accuride.com") < 0 &&
      winHref.href.indexOf("stage.accuride.com") < 0
    ) {
      winHref.href = winHref.href.replace("accuride.com", "www.accuride.com");
    }

    if (winHref.href.indexOf("ddya2gdne7jil.cloudfront.net") >= 0) {
      winHref.href = winHref.href.replace(
        "ddya2gdne7jil.cloudfront.net",
        "www.accuride.com",
      );
    }

    window.addEventListener("reLoadGtm", () => {
      reLoadGtm(true);
    });
  }, []);

  const errorPageLink = `${process.env.NEXT_PUBLIC_BASE_PATH}/${router.query.zone_lang === "en-ca" ? "en-ca" : `en-us`
    }/404`;

  const currentPath = router.asPath.replace(`/${router.query.zone_lang}`, "").split('?')[0];

  function whenCookieConsentCssHasLoaded(callback) {
    const observer = new MutationObserver((mutations, observer) =>
      mutations.forEach((mutation) =>
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const ElementNode = node as HTMLElement;
          if (ElementNode.tagName === "link") return;
          const linkElement = ElementNode as HTMLLinkElement;
          if (!linkElement.href?.includes("cookieconsent.min.css")) return;
          linkElement.onload = callback;
          observer.disconnect();
        }),
      ),
    );

    observerRef.current = observer;
    // Start observing the target node for configured mutations
    observer.observe(document, {
      childList: true,
      subtree: true,
    });
  }

  const handleCookieConsentJsLoad = useCallback(() => {
    const getPath = router.asPath;
    if (getPath.includes("/blog")) return;
    const cookieconsentStatus = getCookie("cookieconsent_status");
    if (cookieconsentStatus === "allow") return;

    if (hasCss()) {
      cookiePopup();
      return;
    }

    whenCookieConsentCssHasLoaded(cookiePopup);
  }, [router.asPath]);

  return (
    <>
      {isLoading && <LoadingIndicator />}

      <Head>
        <link rel="preconnect" href="<https://dev.visualwebsiteoptimizer.com>" />
        {seoDetailss && seoDetailss.seoTitle ? (
          <title>{seoDetailss.seoTitle}</title>
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.seoTitle ? (
          <meta name="title" content={seoDetailss.seoTitle} />
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.seoDescription ? (
          <meta name="description" content={seoDetailss.seoDescription} />
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.secKeywords ? (
          <meta name="keywords" content={seoDetailss.secKeywords} />
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.seoImage ? (
          <meta
            name="image"
            content={seoDetailss.seoImage ? seoDetailss.seoImage.url : ""}
          />
        ) : (
          ""
        )}

        {seoDetailss && seoDetailss.seoTitle ? (
          <meta
            key="title"
            property="og:title"
            content={seoDetailss.seoTitle}
          />
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.seoDescription ? (
          <meta
            key="description"
            property="og:description"
            content={seoDetailss.seoDescription}
          />
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.secKeywords ? (
          <meta
            key="keywords"
            property="og:keywords"
            content={seoDetailss.secKeywords}
          />
        ) : (
          ""
        )}
        {seoDetailss && seoDetailss.seoImage ? (
          <meta
            key="image"
            property="og:image"
            content={seoDetailss.seoImage ? seoDetailss.seoImage.url : ""}
          />
        ) : (
          ""
        )}
        <meta
          key="content"
          property="og:url"
          content={
            Component && Component.name === "Error"
              ? errorPageLink
              : `${process.env.NEXT_PUBLIC_BASE_PATH}${router.asPath}`
          }
        />
        {Component && Component.name !== "Error" && (
          <meta
            name="robots"
            content={
              seoDetailss && seoDetailss.content
                ? `${seoDetailss.content}`
                : "index"
            }
          />
        )}
        {Component && Component.name === "Error" && (
          <meta name="robots" content="NOINDEX,NOFOLLOW" />
        )}

        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {allZone
          ? allZone.map((eachData) => (
            <>
              <link
                key={`h${eachData}`}
                rel="alternate"
                hrefLang={eachData}
                href={
                  Component && Component.name === "Error"
                    ? errorPageLink
                    : `${process.env.NEXT_PUBLIC_BASE_PATH}/${eachData}${currentPath}`
                }
              />
              {eachData === "en-us" && (
                <>
                  <link
                    rel="alternate"
                    hrefLang="en"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH}/${eachData}${currentPath}`}
                  />
                  <link
                    rel="alternate"
                    hrefLang="x-default"
                    href={`${process.env.NEXT_PUBLIC_BASE_PATH}/${eachData}${currentPath}`}
                  />
                </>
              )}
            </>
          ))
          : null}
        {seoDetailss && seoDetailss.canonical ? (
          <link rel="canonical" href={seoDetailss.canonical} />
        ) : (
          CheckForCanonical(router.asPath) && (
            <link
              rel="canonical"
              href={`${process.env.NEXT_PUBLIC_BASE_PATH}${router.asPath}`}
            />
          )
        )}
        <script src={`https://dev.visualwebsiteoptimizer.com/lib/${process.env.NEXT_PUBLIC_VWO_ACCOUNT_ID}.js`} />
      </Head>

      {seoDetailss && seoDetailss.prodMarkupTemplate ? (
        <MarkupTemplate seoData={seoDetailss.prodMarkupTemplate} />
        // <Script
        //   type="application/ld+json"
        //   className="y-rich-snippet-script"
        //   id="y-rich-snippet-script"
        //   dangerouslySetInnerHTML={{
        //     __html: `${seoDetailss.prodMarkupTemplate}`,
        //   }}
        // />
      ) : (
        <MarkupTemplate seoData={seoData} />
        // <Script
        //   type="application/ld+json"
        //   id="markupTemplate"
        //   dangerouslySetInnerHTML={{
        //     __html: `${seoDetailss && seoDetailss.markupTemplate
        //         ? seoDetailss.markupTemplate
        //         : JSON.stringify(defaultMarkupTemplate)
        //       }`,
        //   }}
        // />
      )}
      {seoDetailss && seoDetailss.loadScript ? (
        <Script type="text/javascript" src={seoDetailss.loadScript} />
      ) : (
        ""
      )}
      {seoDetailss && seoDetailss.yotpoScript && (
        <Script type="text/javascript" src={seoDetailss.yotpoScript} async />
      )}
      {seoDetailss && seoDetailss.yotpoScriptPrv && (
        <Script type="text/javascript" src={seoDetailss.yotpoScriptPrv} async />
      )}

      {gtmFlag && (
        <Script
          id="ze-snippet"
          strategy="lazyOnload"
          src="https://static.zdassets.com/ekr/snippet.js?key=553deee7-a6f0-48f5-8a49-2609a59703b9"
          onReady={() => {
            window.zE("webWidget", "helpCenter:setSuggestions", {
              search: "help",
            });
            window.zE("webWidget:on", "chat:connected", () => {
              window.zE("webWidget", "updateSettings", {
                webWidget: {
                  chat: {
                    departments: {
                      enabled: [""],
                      select: "General",
                    },
                  },
                },
              });
            });
            window.zE("webWidget:on", "chat:departmentStatus", (a) => {
              return a.name == "General" && a.status == "online"
                ? (window.zE("webWidget", "updateSettings", {
                  webWidget: {
                    contactOptions: {
                      enabled: !0,
                      contactButton: {
                        "*": "Contact Us",
                      },
                    },
                    chat: {
                      departments: {
                        enabled: [""],
                        select: "General",
                      },
                      suppress: !1,
                    },
                  },
                }),
                  console.log("General Department is online"))
                : a.name == "General" &&
                a.status == "offline" &&
                (window.zE("webWidget", "updateSettings", {
                  webWidget: {
                    contactOptions: {
                      enabled: !0,
                      contactButton: {
                        "*": "Contact Us",
                      },
                    },
                    chat: { suppress: !0 },
                  },
                }),
                  console.log("General Department is offline"));
            });
          }}
        />
      )}
      <Script
        id="cookieconsent"
        strategy="lazyOnload"
        src="/static/cookieconsent.min.js?ver=1.19"
        onReady={handleCookieConsentJsLoad}
      />

      <Script
        id="data-google-tag-manager"
        strategy="lazyOnload"
        src="/static/gtmScript.js"
        nonce="t+ZE/8zrvyit6T3ybc82KQ=="
        data-nonce="t+ZE/8zrvyit6T3ybc82KQ=="
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
        onReady={() => {
          try {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: "PDPsLoaded" });
            localStorage.setItem("IfGtmLoad", true);
          } catch (error) {
            console.log("error", error);
          }
        }}
      />
      <Script
        id="newRelic"
        strategy="lazyOnload"
        onReady={() => {
          console.log("NewRelic script is loaded");
          router.events.on("routeChangeComplete", handleRouteChange);
          handleRouteChange(router.asPath);
        }}
        src="/static/newrelic.js"
      />
      {/* <Script id="vwoCode" strategy="beforeInteractive" src="/static/vwo.js" /> */}

      <ClientContext.Provider value={withApollo()}>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_MAP_API_KEY}>
          <AuthProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthProvider>
        </APIProvider>
      </ClientContext.Provider>
    </>
  );
};
export default withZoneLang(WebApp);
