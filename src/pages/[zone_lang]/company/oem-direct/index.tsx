import OEMDirect from "@PageContent/Company/OEMDirect";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { oemDirectsContent } from "@Graphql/queriesgraphcms/oEMDirect.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const OEMDirectPage = ({ oEMDirectss }) => (
  <OEMDirect OEMDirectss={oEMDirectss} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(oemDirectsContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.oemDirects;

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
    props: { oEMDirectss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default OEMDirectPage;
