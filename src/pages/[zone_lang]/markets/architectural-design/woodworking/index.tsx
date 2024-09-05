import Woodworking from "@PageContent/Markets/ArchitecturalDesign/Woodworking";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { archiWoodworkingsContent } from "@Graphql/queriesgraphcms/woodworking.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const WoodworkingPage = ({ woodworkings }) => (
  <Woodworking woodworkings={woodworkings} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    archiWoodworkingsContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.archiWoodworkings;

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
    props: { woodworkings: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default WoodworkingPage;
