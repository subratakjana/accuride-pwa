import gqlFetch from "@Graphql/Utilities/gqlFetch";
import fullelectricsContent from "@Graphql/queriesgraphcms/fullelectrics.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const Fullelectric = dynamic(
  () => import("@Components/Products/SpecialtySlides/Fullelectric"),
);
const FullelectricPage = ({ fullelectrics }) => (
  <Fullelectric fullelectrics={fullelectrics} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const getData = await gqlFetch(fullelectricsContent, {}, "CMS");
  const getResponse = getData.data.fullelectrics[0];

  let getSeoResponse = null;
  if (getResponse && getResponse.pages) {
    const getSlug = getResponse.pages.pageSlug;
    const GetSeoData = await gqlFetch(
      seoDetailsContent,
      { slug: getSlug },
      "CMS",
    );
    getSeoResponse = GetSeoData && GetSeoData.data.pages;
  }

  return {
    props: { fullelectrics: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default FullelectricPage;
