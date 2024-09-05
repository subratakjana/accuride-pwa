import AerospaceWatercraftSolutions from "@PageContent/Markets/AerospaceWatercraftSolutions";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { aerospaceWatercraftContent } from "@Graphql/queriesgraphcms/aerospaceWatercraftSolutions.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const AerospaceWatercraftSolutionsPage = ({ aerospacewatercraftsolutions }) => (
  <AerospaceWatercraftSolutions
    aerospacewatercraftsolutions={aerospacewatercraftsolutions}
  />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    aerospaceWatercraftContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.aerospaceWatercrafts;

  let getSeoResponse = null;
  const yotpoScript = YotpoScript(params.zone_lang, true);
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
  else getSeoResponse.yotpoScript = yotpoScript;
  return {
    props: {
      aerospacewatercraftsolutions: getResponse,
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

export default AerospaceWatercraftSolutionsPage;
