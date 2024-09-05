import { useRouter } from "next/router";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import { blogsingle } from "@Graphql/queriesgraphcms/blogsSingle.graphql";
import { blogTagsContent } from "@Graphql/queriesgraphcms/blogTags.graphql";
import { archiveblogList } from "@Graphql/queriesgraphcms/blogsArchive.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";
import dynamic from "next/dynamic";

const BlogCategoryArchive = dynamic(import("@PageContent/CategoryArchive"));

const BlogsArchivePage = ({
  category,
  isTag,
  tagListResponse,
  categoryResponse,
  blogDetailsResponse,
}) => {
  const router = useRouter();
  if (router.query) {
    return (
      <BlogCategoryArchive
        category={category}
        isTag={isTag}
        tagListResponse={tagListResponse}
        categoryResponse={categoryResponse}
        blogDetailsResponse={blogDetailsResponse}
      />
    );
  }
};

export const getStaticProps = async ({ params, resolvedUrl }) => {
  let notFound = false;
  const pid = params.all;
  let category = pid[pid.length - 1];
  let isTag = "";

  if (pid.length === 3) {
    isTag = pid[pid.length - 3];
  } else if (pid.length === 2) {
    isTag = pid[pid.length - 2];
  } else {
    isTag = "";
  }

  if (category === "industrial-blogs") {
    category = "industrial";
  }

  let tagListResponse = null;
  let categoryResponse = null;
  let blogDetailsResponse = null;
  let seodata = null;

  if (isTag === "tag") {
    const tagList = await gqlFetch(blogTagsContent, { slug: category }, "CMS");
    if (tagList.data.blogTagss.length > 0) {
      const getAllData = tagList.data.blogTagss;
      tagListResponse = tagList.data.blogTagss[0].blogs;

      if (getAllData && getAllData.length > 0) {
        seodata = {
          seoTitle: getAllData[0].tags.metaTitle,
          seoDescription: getAllData[0].tags.metaDescription,
          secKeywords: getAllData[0].tags.metaKeywords,
          seoImage: {
            url: getAllData[0].tags.metaImage,
          },
        };
      }
    }
  } else if (isTag === "category") {
    const categoryList = await gqlFetch(
      archiveblogList,
      { slug: category },
      "CMS",
    );
    if (categoryList.data.blogs.length > 0) {
      categoryResponse = categoryList.data.blogs;

      seodata = {
        seoTitle: categoryResponse[0].categories[0].metaTitle,
        seoDescription: categoryResponse[0].categories[0].metaDescription,
        secKeywords: categoryResponse[0].categories[0].metaKeywords,
        seoImage: {
          url: categoryResponse[0].categories[0].metaImage,
        },
      };
    }
  } else {
    const blogDetails = await gqlFetch(
      blogsingle,
      { last: 1, slug: category },
      "CMS",
    );
    if (blogDetails.data.blog) {
      blogDetailsResponse = blogDetails.data.blog;
      const markupTemplate = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${process.env.NEXT_PUBLIC_BASE_PATH}${resolvedUrl}`,
        },
        headline: `${blogDetailsResponse && blogDetailsResponse.metaTitle}`,
        description: `${
          blogDetailsResponse && blogDetailsResponse.metaDescription
        }`,
        image: `${
          blogDetailsResponse &&
          blogDetailsResponse.postImage &&
          blogDetailsResponse.postImage.url
        }`,
        author: {
          "@type": "Organization",
          name: "Accuride International",
        },
        publisher: {
          "@type": "Organization",
        },
        datePublished: `${
          blogDetailsResponse &&
          blogDetailsResponse.publishedAt &&
          blogDetailsResponse.publishedAt.split("T")[0]
        }`,
        dateModified: `${
          blogDetailsResponse &&
          blogDetailsResponse.updatedAt &&
          blogDetailsResponse.updatedAt.split("T")[0]
        }`,
      };

      seodata = {
        seoTitle: blogDetailsResponse.metaTitle,
        seoDescription: blogDetailsResponse.metaDescription,
        secKeywords: blogDetailsResponse.metaKeywords,
        seoImage: {
          url: blogDetailsResponse.metaImage,
        },
        markupTemplate: markupTemplate,
        yotpoScript: YotpoScript(params.zone_lang, true),
      };
    }
  }

  if (!tagListResponse && !categoryResponse && !blogDetailsResponse)
    notFound = true;
  return {
    props: {
      category,
      isTag,
      tagListResponse,
      categoryResponse,
      blogDetailsResponse,
      seodata,
    },
    notFound,
    revalidate: 1800,
  };
};

export async function getStaticPaths() {
  const slugs = ["blog"];
  return {
    paths: slugs.map((slug) => ({
      params: { all: [slug], zone_lang: "en-us" },
    })),
    fallback: "blocking",
  };
}

export default BlogsArchivePage;
