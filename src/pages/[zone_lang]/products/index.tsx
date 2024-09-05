import Products from "@PageContent/Products";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { productsPagesContent } from "@Graphql/queriesgraphcms/products.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const ProductPage = ({ productsPageses }) => (
  <Products productsPageses={productsPageses} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const getData = await gqlFetch(productsPagesContent, { last: 0 }, "CMS");
  const getResponse = getData.data.productsPages;

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
    props: { productsPageses: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default ProductPage;
