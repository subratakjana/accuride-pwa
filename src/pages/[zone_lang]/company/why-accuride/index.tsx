import WhyAccuride from "@PageContent/Company/WhyAccuride";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { whyAccuridesContent } from "@Graphql/queriesgraphcms/whyAccuride.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const WhyAccuridePage = ({ whyAccurides }) => (
  <WhyAccuride WhyAccurides={whyAccurides} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(whyAccuridesContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.whyAccurides;

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
    props: { whyAccurides: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default WhyAccuridePage;
