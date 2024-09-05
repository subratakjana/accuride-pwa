import Healthcare from "@PageContent/Markets/Healthcare";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { healthcareContent } from "@Graphql/queriesgraphcms/healthcare.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const HealthcarePage = ({ Healthcares }) => (
  <Healthcare Healthcares={Healthcares} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(healthcareContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.healthcares;

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
    props: { Healthcares: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default HealthcarePage;
