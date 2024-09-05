import Events from "@PageContent/Company/Events";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { eventsesContent } from "@Graphql/queriesgraphcms/events.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const EventsPage = ({ eventss }) => <Events eventss={eventss} />;

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(eventsesContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.eventses;

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
    props: { eventss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default EventsPage;
