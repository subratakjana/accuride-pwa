import ResidentialSolutions from "@PageContent/Markets/ArchitecturalDesign/ResidentialSolutions";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { residentSolutionsContent } from "@Graphql/queriesgraphcms/residentialSolutions.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const ResidentialSolutionsPage = ({ residentSolutionss }) => (
  <ResidentialSolutions residentSolutionss={residentSolutionss} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    residentSolutionsContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.residentSolutions;

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
    props: { residentSolutionss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default ResidentialSolutionsPage;
