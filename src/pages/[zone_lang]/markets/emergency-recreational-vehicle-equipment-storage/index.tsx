import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { EmergencyRecreationalUtilityContent } from "@Graphql/queriesgraphcms/emergencyUtilityTransportation.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";
import YotpoScript from "@Components/Utilities/YotpoScript";

const EmergencyRecreationalUtilityTransporation = dynamic(
  () =>
    import("@PageContent/Markets/EmergencyRecreationalUtilityTransporation"),
);

const EmergencyRecreationalUtilityTransporationPage = ({
  EmergencyRecreationalUtilityTransporations,
}) => (
  <EmergencyRecreationalUtilityTransporation
    EmergencyRecreationalUtilityTransporations={
      EmergencyRecreationalUtilityTransporations
    }
  />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const getQueryData = await gqlFetch(
    EmergencyRecreationalUtilityContent,
    { last: 0 },
    "CMS",
  );
  const getResponse =
    getQueryData.data.emergencyRecreationalUtilityTransportations;

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
      EmergencyRecreationalUtilityTransporations: getResponse,
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

export default EmergencyRecreationalUtilityTransporationPage;
