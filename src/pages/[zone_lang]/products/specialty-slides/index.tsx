import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { specialtySlidesContent } from "@Graphql/queriesgraphcms/specialtySlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const SpecialtySlides = dynamic(
  () => import("@Components/Products/SpecialtySlides"),
);

const SpecialtySlidesPage = ({ specialtySlideses }) => (
  <SpecialtySlides specialtySlideses={specialtySlideses} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const getData = await gqlFetch(specialtySlidesContent, { last: 0 }, "CMS");
  const getResponse = getData.data.specialtySlidess;

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
    props: { specialtySlideses: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default SpecialtySlidesPage;
