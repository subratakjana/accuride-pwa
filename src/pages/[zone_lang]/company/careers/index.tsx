import Careers from "@PageContent/Company/Careers";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { careersesContent } from "@Graphql/queriesgraphcms/careers.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const CareersPage = ({ careerss }) => <Careers careerss={careerss} />;

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(careersesContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.careerses;

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
    props: { careerss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default CareersPage;
