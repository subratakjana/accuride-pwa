import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { slideGuides } from "@Graphql/queriesgraphcms/slideGuides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const SlideGuide = dynamic(() => import("@Components/Resources/SlideGuides"));

const SlideGuidePage = ({ slideGuide }) => (
  <SlideGuide SlideGuide={slideGuide} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(slideGuides, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.slideGuideses;

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
    props: { slideGuide: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default SlideGuidePage;
