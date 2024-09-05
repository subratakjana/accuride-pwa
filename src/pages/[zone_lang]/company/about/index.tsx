import WhoWeAre from "@PageContent/Company/WhoWeAre";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { whoWeAresContent } from "@Graphql/queriesgraphcms/whoWeAre.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const WhoWeArePage = ({ whoWeAres }) => <WhoWeAre WhoWeAres={whoWeAres} />;

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(whoWeAresContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.whoWeAres;

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
    props: { whoWeAres: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default WhoWeArePage;
