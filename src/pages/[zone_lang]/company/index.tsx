import CompanyLanding from "@PageContent/Company";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { companyall } from "@Graphql/queriesgraphcms/companyAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const CompanyLandingPage = ({ companyList }) => (
  <CompanyLanding companyList={companyList} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(companyall, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.companies;

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
    props: { companyList: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default CompanyLandingPage;
