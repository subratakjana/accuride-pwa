import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { rollerBearingsContent } from "@Graphql/queriesgraphcms/rollerBearingSlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const RollerBearingSlides = dynamic(
  () => import("@Components/Products/SpecialtySlides/RollerBearingSlides"),
);

const RollerBearingSlidesPage = ({ rollerBearingsData }) => (
  <RollerBearingSlides rollerBearingsData={rollerBearingsData} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const getData = await gqlFetch(rollerBearingsContent, { last: 0 }, "CMS");
  const getResponse = getData.data.rollerBearings;

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
    props: { rollerBearingsData: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default RollerBearingSlidesPage;
