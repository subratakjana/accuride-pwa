import AutomationMovementSolutions from "@PageContent/Markets/AutomationMovementSolutions";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { automationMovementSolutionsContent } from "@Graphql/queriesgraphcms/AutomationMovementSolutions.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const AutomationMovementSolutionsPage = ({ automationMovementSolutions }) => (
  <AutomationMovementSolutions
    automationMovementSolutions={automationMovementSolutions}
  />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    automationMovementSolutionsContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.automationMotionControls;

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
      automationMovementSolutions: getResponse,
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

export default AutomationMovementSolutionsPage;
