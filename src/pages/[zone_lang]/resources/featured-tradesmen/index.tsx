import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { featuredTradesmensContent } from "@Graphql/queriesgraphcms/featuredTradesmen.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const FeaturedTradesmen = dynamic(
  () => import("@Components/Resources/FeaturedTradesmen"),
);

const FeaturedTradesmenPage = ({ featuredTradesmensData }) => (
  <FeaturedTradesmen featuredTradesmensData={featuredTradesmensData} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    featuredTradesmensContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data?.featuredTradesmens;

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
    props: { featuredTradesmensData: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default FeaturedTradesmenPage;
