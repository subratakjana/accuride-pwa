import { useState, useEffect } from "react";
import { useManualQuery } from "graphql-hooks";
import { LoadingIndicator } from "@Components/Utilities";
import { useRouter } from "next/router";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import Head from "next/head";

const SeoDetails = (props) => {
  const router = useRouter();
  const [seoDetailss, setSeoDetailss] = useState(null);
  const [currentUrl, setCurrentUrl] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState(null);

  useEffect(() => {
    const curPath = window.location.href;
    setCurrentUrl(curPath);
    const curPathArr = curPath.split(/[/?]/);

    if (currentUrl.includes("/blog/")) {
      if (curPathArr.length > 6) setCanonicalUrl(curPath);
      else if (seoDetailss && seoDetailss.category)
        setCanonicalUrl(
          `${process.env.NEXT_PUBLIC_BASE_PATH}/${
            router.query.zone_lang
          }/blog/${seoDetailss && seoDetailss.category}/${
            seoDetailss.postSlug
          }`,
        );
    }
    if (currentUrl.includes("/news/")) {
      if (curPathArr.length > 6) setCanonicalUrl(curPath);
      else if (seoDetailss && seoDetailss.category)
        setCanonicalUrl(
          `${process.env.NEXT_PUBLIC_BASE_PATH}/${
            router.query.zone_lang
          }/news/${seoDetailss && seoDetailss.category}/${
            seoDetailss.newsSlug
          }`,
        );
    }
  }, [seoDetailss]);
  const { pageSlug, seoDetailsInPage } = props;
  // API calling to generate cart list
  const [seoDetailsFn, { loading: SEOLoading }] = useManualQuery(
    seoDetailsContent.loc.source.body,
    {
      variables: { slug: pageSlug },
      operationName: { clientName: "graphCms" },
      onSuccess: (res) => {
        if (res) {
          const { data } = res;
          setSeoDetailss(data.pages);
        }
      },
    },
  );

  useEffect(() => {
    if (seoDetailsInPage) {
      setSeoDetailss(seoDetailsInPage);
    } else if (pageSlug) {
      seoDetailsFn();
    } else {
      setSeoDetailss(null);
    }
  }, [pageSlug, seoDetailsInPage]);
  if (SEOLoading) return <LoadingIndicator />;

  const markupTemplate = `@context: https://schema.org,
    @type: BlogPosting,
    mainEntityOfPage: {
      @type: WebPage,
      @id: ${currentUrl && currentUrl}
    },
    headline: ${seoDetailss && seoDetailss.seoTitle},
    description: ${seoDetailss && seoDetailss.seoDescription},
    image: ${
      seoDetailss && seoDetailss.seoImage ? seoDetailss.seoImage.url : ""
    },  
    author: {
      @type: Organization,
      name: Accuride International
    },  
    publisher: {
        @type: Organization,
        @type: ImageObject,
      }
    },
    datePublished: ${
      seoDetailss &&
      seoDetailss.publishedAt &&
      seoDetailss.publishedAt.split("T")[0]
    },
    dateModified: ${
      seoDetailss &&
      seoDetailss.updatedAt &&
      seoDetailss.updatedAt.split("T")[0]
    }
  `;
  return seoDetailss ? (
    <Head>
      {seoDetailss.seoTitle ? <title>{seoDetailss.seoTitle}</title> : ""}
      {seoDetailss.seoTitle ? (
        <meta property="title" content={seoDetailss.seoTitle} />
      ) : (
        ""
      )}
      {seoDetailss.seoDescription ? (
        <meta property="description" content={seoDetailss.seoDescription} />
      ) : (
        ""
      )}
      {seoDetailss.secKeywords ? (
        <meta property="keywords" content={seoDetailss.secKeywords} />
      ) : (
        ""
      )}
      {seoDetailss.seoTitle ? (
        <meta key="title" property="og:title" content={seoDetailss.seoTitle} />
      ) : (
        ""
      )}
      {seoDetailss.seoDescription ? (
        <meta
          key="description"
          property="og:description"
          content={seoDetailss.seoDescription}
        />
      ) : (
        ""
      )}
      {seoDetailss.seoImage ? (
        <meta
          key="image"
          property="og:image"
          content={seoDetailss.seoImage ? seoDetailss.seoImage.url : ""}
        />
      ) : (
        ""
      )}
      {currentUrl ? (
        <meta key="content" property="og:url" content={currentUrl} />
      ) : (
        ""
      )}
      <meta property="og:type" content="article" />
      {pageSlug === "blog" && (
        <script type="text/javascript">{markupTemplate}</script>
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {currentUrl.includes("/markets/") && (
        <link rel="canonical" href={currentUrl} />
      )}
    </Head>
  ) : (
    ""
  );
};

export default SeoDetails;
