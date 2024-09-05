import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { faqList } from "@Graphql/queriesgraphcms/faqsLists.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import dynamic from "next/dynamic";

const FAQ = dynamic(() => import("@Components/Resources/Faqs"));

const FaqPage = ({ faqListdata }) => <FAQ faqListdata={faqListdata} />;

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(faqList, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.faqs;

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
    props: { faqListdata: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default FaqPage;
