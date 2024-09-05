import ResourcesLanding from "@PageContent/Resources";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { resources } from "@Graphql/queriesgraphcms/resourcesAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const ResourcesPage = ({ resourcesList }) => (
  <ResourcesLanding resourcesList={resourcesList} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(resources, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.resourceses;

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
    props: { resourcesList: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default ResourcesPage;
