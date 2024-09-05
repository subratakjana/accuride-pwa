import ProAdvantage from "@PageContent/ProAdvantage";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { proAdvantagesQuery } from "@Graphql/queriesgraphcms/proAdvantage.graphql";

const ProAdvantagePage = ({ proAdvantages }) => (
  <ProAdvantage proAdvantages={proAdvantages} />
);

export const getServerSideProps = async () => {
  let notFound = false;
  let seodata = null;
  const getQueryData = await gqlFetch(proAdvantagesQuery, {}, "CMS");
  const getResponse = getQueryData.data.proAdvantages;

  if (getResponse) {
    seodata = {
      seoTitle: "Pro Advantages",
    };
  }
  if (!getResponse) notFound = true;
  return {
    props: { proAdvantages: getResponse, seodata },
    notFound,
  };
};

export default ProAdvantagePage;
