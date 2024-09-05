import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { drawerSlidesContent } from "@Graphql/queriesgraphcms/drawerSlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const DrawerSlides = dynamic(() => import("@Components/Products/DrawerSlides"));

const DrawerSlidesPage = ({ drawerSlideses }) => (
  <DrawerSlides drawerSlideses={drawerSlideses} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const getData = await gqlFetch(drawerSlidesContent, { last: 0 }, "CMS");
  const getResponse = getData.data.drawerSlidess;

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
    props: { drawerSlideses: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default DrawerSlidesPage;
