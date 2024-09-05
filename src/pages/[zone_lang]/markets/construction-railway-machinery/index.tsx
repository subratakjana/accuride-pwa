import ConstructionRailwayMachinery from "@PageContent/Markets/ConstructionRailwayMachinery";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { constructionRailwayContent } from "@Graphql/queriesgraphcms/constructionRailwayMachinery.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const ConstructionRailwayMachineryPage = ({
  constructionRailwayMachinerys,
}) => (
  <ConstructionRailwayMachinery
    constructionRailwayMachinerys={constructionRailwayMachinerys}
  />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    constructionRailwayContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.constructionRailways;

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
    props: {
      constructionRailwayMachinerys: getResponse,
      seodata: getSeoResponse,
    },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default ConstructionRailwayMachineryPage;
