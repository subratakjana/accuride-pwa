import NewsCategoryArchive from "@PageContent/NewsCategoryArchive";
import { useRouter } from "next/router";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { archivenewsList } from "@Graphql/queriesgraphcms/newsArchive.graphql";
import { newsroomsingle } from "@Graphql/queriesgraphcms/newsSingle.graphql";

const NewsArchivePage = ({ archiveNewsLists, newsSingleResp }) => {
  const router = useRouter();
  if (router.query)
    return (
      <NewsCategoryArchive
        archiveNewsLists={archiveNewsLists}
        newsSingleResp={newsSingleResp}
      />
    );
};

export const getStaticProps = async ({ params, resolvedUrl }) => {
  let notFound = false;
  const pid = params.all;
  const ifCategory = pid[pid.length - 2];
  const category = pid[pid.length - 1];
  let getResponse = null;
  let newsSingleResp = null;
  let seodata = null;
  if (ifCategory === "category") {
    const newsList = await gqlFetch(archivenewsList, { slug: category }, "CMS");
    getResponse = newsList.data.newsrooms;
    if (getResponse && getResponse.length > 0) {
      seodata = {
        seoTitle: getResponse[0].newsroomCategories[0].metaTitle
          ? getResponse[0].newsroomCategories[0].metaTitle
          : getResponse[0].newsroomCategories[0].newsTitle,
        seoDescription: getResponse[0].newsroomCategories[0].metaDescription,
        secKeywords: getResponse[0].newsroomCategories[0].metaKeywords,
        seoImage: {
          url: getResponse[0].newsroomCategories[0].metaImage,
        },
      };
    }
  } else {
    const newsSingle = await gqlFetch(
      newsroomsingle,
      { slug: category },
      "CMS",
    );
    newsSingleResp = newsSingle.data.newsroom;
    if (newsSingleResp) {
      const markupTemplate = {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${process.env.NEXT_PUBLIC_BASE_PATH}${resolvedUrl}`,
        },
        headline: `${newsSingleResp && newsSingleResp.metaTitle}`,
        description: `${newsSingleResp && newsSingleResp.metaDescription}`,
        image: `${newsSingleResp && newsSingleResp.newsImage.url}`,
        author: {
          "@type": "Organization",
          name: "Accuride International",
        },
        publisher: {
          "@type": "ImageObject",
        },
        datePublished: `${
          newsSingleResp &&
          newsSingleResp.publishedAt &&
          newsSingleResp.publishedAt.split("T")[0]
        }`,
        dateModified: `${
          newsSingleResp &&
          newsSingleResp.updatedAt &&
          newsSingleResp.updatedAt.split("T")[0]
        }`,
      };
      seodata = {
        seoTitle: newsSingleResp.metaTitle
          ? newsSingleResp.metaTitle
          : newsSingleResp.newsTitle,
        seoDescription: newsSingleResp.metaDescription
          ? newsSingleResp.metaDescription
          : newsSingleResp.newsExcerpt,
        secKeywords: newsSingleResp.metaKeywords,
        seoImage: {
          url: newsSingleResp.metaImage,
        },
        markupTemplate: markupTemplate,
      };
    }
  }

  if (!getResponse && !newsSingleResp) notFound = true;
  return {
    props: { archiveNewsLists: getResponse, newsSingleResp, seodata },
    notFound,
    revalidate: 1800,
  };
};

export async function getStaticPaths() {
  const slugs = ["news"];
  return {
    paths: slugs.map((slug) => ({
      params: { all: [slug], zone_lang: "en-us" },
    })),
    fallback: "blocking",
  };
}

export default NewsArchivePage;
