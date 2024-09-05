import Covid19Update from "@PageContent/Covid19Updates";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { covid19UpdatesContent } from "@Graphql/queriesgraphcms/covid19Update.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const Covid19UpdatePage = ({ covid19Updatess }) => (
  <Covid19Update covid19Updatess={covid19Updatess} />
);

export const getServerSideProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(covid19UpdatesContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.covid19Updates;

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
    props: { covid19Updatess: getResponse, seodata: getSeoResponse },
    notFound,
  };
};

export default Covid19UpdatePage;
