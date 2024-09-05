import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { aboutSlides } from "@Graphql/queriesgraphcms/aboutSlides.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const AboutSlide = dynamic(() => import("@Components/Resources/AboutSlides"));

const AboutSlidesPage = ({ aboutSlide }) => (
  <AboutSlide AboutSlide={aboutSlide} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(aboutSlides, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.aboutSlideses;

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
    props: { aboutSlide: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default AboutSlidesPage;
