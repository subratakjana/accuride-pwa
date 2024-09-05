import CommercialApplications from "@PageContent/Markets/ArchitecturalDesign/CommercialApplications";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { commApplicationssContent } from "@Graphql/queriesgraphcms/commercialApplications.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const CommercialApplicationsPage = ({ commApplications }) => (
  <CommercialApplications commApplications={commApplications} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    commApplicationssContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.commApplicationss;

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
    props: { commApplications: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default CommercialApplicationsPage;
