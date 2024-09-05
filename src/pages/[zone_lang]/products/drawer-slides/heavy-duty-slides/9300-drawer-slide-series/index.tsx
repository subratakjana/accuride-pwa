import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { fAQ9300DrawerSlidesContent } from "@Graphql/queriesgraphcms/fAQ9300DrawerSlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";
import YotpoScript from "@Components/Utilities/YotpoScript";

const FAQ9300DrawerSlides = dynamic(
  () => import("@Components/Products/DrawerSlides/9300DrawerSlides"),
);
const FAQ9300DrawerSlidesPage = ({ fAQ9300DrawerSlidess }) => (
  <FAQ9300DrawerSlides fAQ9300DrawerSlidess={fAQ9300DrawerSlidess} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const getData = await gqlFetch(
    fAQ9300DrawerSlidesContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = getData.data.fAQ9300DrawerSlides;

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
    props: { fAQ9300DrawerSlidess: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default FAQ9300DrawerSlidesPage;
