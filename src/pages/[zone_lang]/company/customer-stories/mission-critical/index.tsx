import MissionCritical from "@PageContent/Company/Testimonials/MissionCritical";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { missionCriticalsContent } from "@Graphql/queriesgraphcms/missionCritical.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const MissionCriticalPage = ({ missionCriticalss }) => (
  <MissionCritical missionCriticalss={missionCriticalss} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(missionCriticalsContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.missionCriticals;

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
    props: { missionCriticalss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default MissionCriticalPage;
