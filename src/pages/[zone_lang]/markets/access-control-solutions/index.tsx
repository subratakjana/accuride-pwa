import AccessControlSystems from "@PageContent/Markets/AccessControlSystems";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { accessControlSystemsContent } from "@Graphql/queriesgraphcms/accessControlSystems.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const AccessControlSystemsPage = ({ accesscontolsystem }) => (
  <AccessControlSystems accesscontolsystem={accesscontolsystem} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    accessControlSystemsContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.accessControlSystemss;

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
    props: { accesscontolsystem: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default AccessControlSystemsPage;
