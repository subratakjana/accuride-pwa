import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { Videos } from "@Graphql/queriesgraphcms/videoGallery.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const Video = dynamic(() => import("@Components/Resources/Video"));

const VideoPage = ({ videoGallery }) => <Video videoGallery={videoGallery} />;

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(Videos, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.videoses;

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
    props: { videoGallery: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default VideoPage;
