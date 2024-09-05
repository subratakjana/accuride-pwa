import Machinery from "@PageContent/Markets/Machinery";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { machineryContent } from "@Graphql/queriesgraphcms/machinery.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const MachineryPage = ({ machineriess }) => (
  <Machinery machineriess={machineriess} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(machineryContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.machineries;

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
    props: { machineriess: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default MachineryPage;
