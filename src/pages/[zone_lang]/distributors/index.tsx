import DistributerSearch from "@PageContent/Distributer";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { distributers } from "@Graphql/queriesgraphcms/distributersAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const StoreLocatorPage = ({ distributerList }) => (
  <DistributerSearch distributerList={distributerList} />
);

export const getServerSideProps = async () => {
  let notFound = false;
  const datalist = await gqlFetch(distributers, { last: 0 }, "CMS");
  const getResponse = datalist.data.distributorses;

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
    props: { distributerList: getResponse, seodata: getSeoResponse },
    notFound,
  };
};

export default StoreLocatorPage;
