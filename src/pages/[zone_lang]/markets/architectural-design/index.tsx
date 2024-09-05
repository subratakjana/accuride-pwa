import ArchitecturalDesigns from "@PageContent/Markets/ArchitecturalDesign";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { architecturalDesignsContent } from "@Graphql/queriesgraphcms/architecturalDesigns.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const ArchitecturalDesignsPage = ({ architecturalDesign }) => (
  <ArchitecturalDesigns architecturalDesign={architecturalDesign} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    architecturalDesignsContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.architecturalDesigns;

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
    props: { architecturalDesign: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default ArchitecturalDesignsPage;
