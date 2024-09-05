import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { cadsListAll } from "@Graphql/queriesgraphcms/cadsList.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const CadsListsData = dynamic(() => import("@Components/Resources/Cads"));

const CadsListsPage = ({ cadsspecs }) => (
  <CadsListsData Cadsspecs={cadsspecs} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(cadsListAll, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.cad;

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
    props: { cadsspecs: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default CadsListsPage;
