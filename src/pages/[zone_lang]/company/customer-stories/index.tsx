import Testimonials from "@PageContent/Company/Testimonials";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { testimonialsesContent } from "@Graphql/queriesgraphcms/testimonials.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const TestimonialsPage = ({ testimonialss }) => (
  <Testimonials Testimonialss={testimonialss} />
);

export const getStaticProps = async () => {
  let notFound = false;
  const DataLlist = await gqlFetch(testimonialsesContent, { last: 0 }, "CMS");
  const getResponse = DataLlist.data.testimonialses;

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
    props: { testimonialss: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: "blocking",
});

export default TestimonialsPage;
