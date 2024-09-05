import VendingCashHandling from "@PageContent/Markets/VendingCashHandling";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { vendingCashHandlingsContent } from "@Graphql/queriesgraphcms/vendingCashHandling.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const VendingCashHandlingPage = ({ vendingCashHandlingss }) => (
  <VendingCashHandling vendingCashHandlingss={vendingCashHandlingss} />
);

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const DataLlist = await gqlFetch(
    vendingCashHandlingsContent,
    { last: 0 },
    "CMS",
  );
  const getResponse = DataLlist.data.vendingCashHandlings;

  let getSeoResponse = null;
  const yotpoScript = YotpoScript(params.zone_lang, true);
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
  else getSeoResponse.yotpoScript = yotpoScript;
  return {
    props: { vendingCashHandlingss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default VendingCashHandlingPage;
