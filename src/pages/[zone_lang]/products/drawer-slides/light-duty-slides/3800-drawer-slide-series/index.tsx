import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { fAQ3800DrawerSlidesContent } from "@Graphql/queriesgraphcms/fAQ3800DrawerSlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";
import YotpoScript from "@Components/Utilities/YotpoScript";

const FAQ3800DrawerSlides = dynamic(
  () => import("@Components/Products/DrawerSlides/3800DrawerSlides"),
);

const FAQ3800DrawerSlidesPage = ({ fAQ3800DrawerSlidess }) => (
  <FAQ3800DrawerSlides fAQ3800DrawerSlidess={fAQ3800DrawerSlidess} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const getData = await gqlFetch(
    fAQ3800DrawerSlidesContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = getData.data.fAQ3800DrawerSlides;

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
    props: { fAQ3800DrawerSlidess: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default FAQ3800DrawerSlidesPage;
