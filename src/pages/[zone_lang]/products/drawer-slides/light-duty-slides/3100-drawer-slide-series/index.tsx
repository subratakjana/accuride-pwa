import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { fAQ3100DrawerSlidesContent } from "@Graphql/queriesgraphcms/fAQ3100DrawerSlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";
import YotpoScript from "@Components/Utilities/YotpoScript";

const FAQ3100DrawerSlides = dynamic(
  () => import("@Components/Products/DrawerSlides/3100DrawerSlides"),
);

const FAQ3100DrawerSlidesPage = ({ fAQ3100DrawerSlidess }) => (
  <FAQ3100DrawerSlides fAQ3100DrawerSlidess={fAQ3100DrawerSlidess} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const getData = await gqlFetch(
    fAQ3100DrawerSlidesContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = getData.data.fAQ3100DrawerSlides;

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
    props: { fAQ3100DrawerSlidess: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default FAQ3100DrawerSlidesPage;
