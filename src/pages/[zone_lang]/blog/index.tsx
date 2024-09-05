import Blogs from "@PageContent/Blogs";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { blogList } from "@Graphql/queriesgraphcms/blogsAll.graphql";
import { seoDetailsContent } from "@Graphql/queriesgraphcms/seoDetails.graphql";

const BlogsPage = ({ blogLists }) => <Blogs blogLists={blogLists} />;

export const getStaticProps = async ({ params }) => {
  let notFound = false;
  const getQueryData = await gqlFetch(blogList, {}, "CMS");
  const getResponse = getQueryData.data.blogs;

  let getSeoResponse = null;
  if (
    getResponse &&
    getResponse.length > 0 &&
    getResponse[0].pages.length > 0
  ) {
    const getSlug = getResponse[0].pages[0].pageSlug;
    const GetSeoData = await gqlFetch(
      seoDetailsContent,
      { slug: getSlug },
      "CMS",
    );
    getSeoResponse = GetSeoData && GetSeoData.data.pages;
  }
  if (!getResponse) notFound = true;
  return {
    props: { blogLists: getResponse, seodata: getSeoResponse },
    notFound,
    revalidate: 1800,
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default BlogsPage;
