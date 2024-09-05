import IntoTheWildOverland from "@PageContent/IntoTheWildOverland";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { wildOverlandsContent } from "@Graphql/queriesgraphcms/intoTheWildOverland.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const IntoTheWildOverlandPage = ({ intoTheWildOverlands }) => (
  <IntoTheWildOverland intoTheWildOverlands={intoTheWildOverlands} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const datalist = await gqlFetch(wildOverlandsContent, { last: 0 }, "CMS");
  const getResponse = datalist.data.wildOverlands;

  let getSeoResponse = null;
  if (getResponse && getResponse.length > 0 && getResponse[0].pages) {
    const getSlug = getResponse[0].pages.pageSlug;
    const GetSeoData = await gqlFetch(
      seoDetailsContent,
      { slug: getSlug },
      "CMS",
    );
    getSeoResponse = GetSeoData && GetSeoData.data.pages;
  }

  if (!getResponse) notFound = true;

  return {
    props: { intoTheWildOverlands: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default IntoTheWildOverlandPage;
