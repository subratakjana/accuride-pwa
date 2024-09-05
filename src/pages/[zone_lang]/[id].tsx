import ErrorCustom from "@Components/ErrorCustom";
import CmsSingle from "@PageContent/CmsSingle";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { CaliforniaProp65Content } from "@Graphql/queriesgraphcms/californiaProp65.graphql";
import { warrantyContent } from "@Graphql/queriesgraphcms/warranty.graphql";
import { termsOfSalesContent } from "@Graphql/queriesgraphcms/termsOfSale.graphql";
import { privaciesContent } from "@Graphql/queriesgraphcms/privacy.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";
import { useRouter } from "next/router";

const CmsSinglePage = ({
  p65warningsData,
  warrantyData,
  termsData,
  privacyData,
}) => {
  const router = useRouter();
  if (router.query && router.query.id === "error-page") {
    return (
      <ErrorCustom statusCode={404} message="This page could not be found." />
    );
  }

  return (
    <CmsSingle
      p65warningsData={p65warningsData}
      warrantyData={warrantyData}
      termsData={termsData}
      privacyData={privacyData}
    />
  );
};

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  let getSeoResponse = null;
  let p65warningsData = null;
  let warrantyData = null;
  let termsData = null;
  let privacyData = null;
  let errorData = null;
  //= ===========warranty============
  if (params.id === "warranty") {
    const pageData = await gqlFetch(warrantyContent, { last: 0 }, "CMS");
    warrantyData = pageData.data.warranties;

    if (warrantyData && warrantyData.length > 0 && warrantyData[0].pages) {
      const getSlug = warrantyData[0].pages.pageSlug;
      const GetSeoData = await gqlFetch(
        seoDetailsContent,
        { slug: getSlug },
        "CMS",
      );
      getSeoResponse = GetSeoData && GetSeoData.data.pages;
    }
  }
  //= ===========p65warnings-california============
  if (params.id === "p65warnings-california") {
    const pageData = await gqlFetch(
      CaliforniaProp65Content,
      { last: 0 },
      "CMS",
    );
    p65warningsData = pageData.data.californiaProp65S;

    if (
      p65warningsData &&
      p65warningsData.length > 0 &&
      p65warningsData[0].pages
    ) {
      const getSlug = p65warningsData[0].pages.pageSlug;
      const GetSeoData = await gqlFetch(
        seoDetailsContent,
        { slug: getSlug },
        "CMS",
      );
      getSeoResponse = GetSeoData && GetSeoData.data.pages;
    }
  }
  //= ===========terms-of-sale============
  if (params.id === "terms-of-sale") {
    const pageData = await gqlFetch(termsOfSalesContent, { last: 0 }, "CMS");
    termsData = pageData.data.termsOfSales;

    if (termsData && termsData.length > 0 && termsData[0].pages) {
      const getSlug = termsData[0].pages.pageSlug;
      const GetSeoData = await gqlFetch(
        seoDetailsContent,
        { slug: getSlug },
        "CMS",
      );
      getSeoResponse = GetSeoData && GetSeoData.data.pages;
    }
  }
  //= ===========privacy============
  if (params.id === "privacy") {
    const pageData = await gqlFetch(privaciesContent, { last: 0 }, "CMS");
    privacyData = pageData.data.privacies;

    if (privacyData && privacyData.length > 0 && privacyData[0].pages) {
      const getSlug = privacyData[0].pages.pageSlug;
      const GetSeoData = await gqlFetch(
        seoDetailsContent,
        { slug: getSlug },
        "CMS",
      );
      getSeoResponse = GetSeoData && GetSeoData.data.pages;
    }
  }
  //= ===========error-page============
  if (params.id === "error-page") {
    errorData = "Error page";
  }
  if (
    !p65warningsData &&
    !warrantyData &&
    !termsData &&
    !privacyData &&
    !errorData
  )
    notFound = true;

  return {
    props: {
      p65warningsData,
      warrantyData,
      termsData,
      privacyData,
      seodata: getSeoResponse,
    },
    notFound,
    revalidate: 1800,
  };
};
export async function getStaticPaths() {
  const slugs = []; // Replace with your list of slugs
  return {
    paths: slugs.map((slug) => ({
      params: { id: slug },
    })),
    fallback: "blocking",
  };
}

export default CmsSinglePage;
