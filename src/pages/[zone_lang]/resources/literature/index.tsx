import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { literaturelists } from "@Graphql/queriesgraphcms/literatureAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const Literature = dynamic(() => import("@Components/Resources/Literature"));

const LiteraturePage = ({ literarures }) => (
  <Literature literarures={literarures} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(literaturelists, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.literatures;

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
    props: { literarures: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default LiteraturePage;
