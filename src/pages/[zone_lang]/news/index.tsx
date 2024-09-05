import News from "@PageContent/News";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { newsList } from "@Graphql/queriesgraphcms/newsAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const NewsroomPage = ({ newsLists }) => <News newsLists={newsLists} />;

export const getStaticProps = async () => {
  const notFound = false;
  const getQueryData = await gqlFetch(newsList, { last: 6 }, "CMS");
  const getResponse = getQueryData.data.newsrooms;
  let getSeoResponse = null;

  const seoFetchPromises = getResponse.map(async (item) => {
    const getPages = item.pages;
    if (Object.keys(getPages).length > 0) {
      const getSlug = item.pages[0].pageSlug;
      const GetSeoData = await gqlFetch(
        seoDetailsContent,
        { slug: getSlug },
        "CMS",
      );
      return GetSeoData && GetSeoData.data.pages;
    }
    return null;
  });

  const seoResponses = await Promise.all(seoFetchPromises);
  getSeoResponse = seoResponses.find((seoData) => seoData !== null);

  return {
    props: { newsLists: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default NewsroomPage;
