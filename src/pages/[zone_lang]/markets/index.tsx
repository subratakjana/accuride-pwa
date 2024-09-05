import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { marketall } from "@Graphql/queriesgraphcms/marketAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const MarketLanding = dynamic(() => import("@PageContent/Markets"));

const MarketLandingPage = ({ marketList }) => (
  <MarketLanding marketList={marketList} />
);

export const getStaticProps = async () => {
  const notFound = false;
  const DataList = await gqlFetch(marketall, { last: 0 }, "CMS");
  const getResponse = DataList.data.markets;

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

  return {
    props: { marketList: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default MarketLandingPage;
