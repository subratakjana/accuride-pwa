import { Container } from "react-bootstrap";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import BlogSingle from "@PageContent/BlogSingle";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import Error from "../../pages/_error";

const BlogCategoryMenu = dynamic(import("@Components/CategoryMenu"));
const BlogList = dynamic(import("@Components/Blogs/BlogList"));
const BlogTags = dynamic(import("@Components/Blogs/BlogTags"));
const RecentPost = dynamic(import("@Components/Blogs/RecentPost"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ArchiveBlogs = ({
  category,
  isTag,
  tagListResponse,
  categoryResponse,
  blogDetailsResponse,
}) => {
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  let crumbs = [];
  if (
    pathSegments[pathSegments.length - 1].includes("?") === false &&
    pathSegments[pathSegments.length - 1].includes("#") === false &&
    pathSegments.length === 4
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[pathSegments.length - 1].split("?")[0],
      },
    ];
  }
  if (
    pathSegments[pathSegments.length - 1].includes("?") &&
    pathSegments.length === 4
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[pathSegments.length - 1].split("#")[0],
      },
    ];
  }

  if (
    pathSegments[pathSegments.length - 1].includes("#") &&
    pathSegments.length === 4
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
    ];
  }
  // subcategory breadcrumbs
  if (
    pathSegments[pathSegments.length - 1].includes("?") &&
    pathSegments.length === 5
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
      {
        url: "",
        name: pathSegments[pathSegments.length - 1].split("?")[0],
      },
    ];
  }

  if (
    pathSegments[pathSegments.length - 1].includes("#") &&
    pathSegments.length === 5
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
      {
        url: "",
        name: pathSegments[pathSegments.length - 1].split("#")[0],
      },
    ];
  }
  if (
    pathSegments[pathSegments.length - 1].includes("?") === false &&
    pathSegments[pathSegments.length - 1].includes("#") === false &&
    pathSegments.length === 5
  ) {
    const getBlogDetailName =
      pathSegments[pathSegments.length - 1].split("?")[0];
    const trimedBlogDetailName = getBlogDetailName.substr(0, 15);
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
      {
        url: "",
        name: pathSegments[4],
      },
    ];
  }
  const clickScrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return isTag === "tag" ? (
    <BlogTags tagListResponse={tagListResponse} />
  ) : (
    [
      isTag === "category" ? (
        [
          categoryResponse && categoryResponse.length > 0 ? (
            <>
              <BreadCrumbs crumbs={crumbs} />

              <div key="postKey">
                {/* <SeoDetails pageSlug={categoryResponse[0].pages[0].pageSlug} seoDetailsInPage={seoDetailsArr} /> */}
                <div
                  className="blog-scroll-top-btn d-xl-block d-none position-fixed"
                  role="button"
                  tabIndex="0"
                  onClick={clickScrollTop}
                  onKeyDown={clickScrollTop}
                >
                  <FaRegArrowAltCircleUp />
                </div>
                {categoryResponse
                  ? categoryResponse[0].pages.map((EachPage) => (
                      <section
                        key={`banner_${EachPage.banner.id}`}
                        className="acc-blog-main-banner acc-small-banner position-relative"
                      >
                        <Container>
                          <article className="position-absolute acc-banner-caption z-index-1">
                            {EachPage.banner.bannerHeading ? (
                              <h2 className="text-white">
                                {EachPage.banner.bannerHeading}
                              </h2>
                            ) : (
                              ""
                            )}
                            {EachPage.banner.bannerDescription ? (
                              <p className="text-white">
                                {EachPage.banner.bannerDescription}
                              </p>
                            ) : (
                              ""
                            )}
                          </article>
                        </Container>
                        {EachPage.banner.bannerImage
                          ? EachPage.banner.bannerImage.map((bannerimage) => (
                              <span className="categoriesBannerWraper">
                                <NextImage
                                  src={bannerimage.url}
                                  alt={EachPage.banner.bannerHeading}
                                  layout="fill"
                                  objectFit="cover"
                                  objectPosition="center"
                                  className="w-100"
                                  key={bannerimage.id}
                                />
                              </span>
                            ))
                          : ""}
                      </section>
                    ))
                  : ""}
                <section>
                  <BlogCategoryMenu />
                </section>
                <section className="section-padding acc-blog-page">
                  {/* header start */}
                  <Container>
                    <BlogList data={categoryResponse} />
                  </Container>
                </section>
                <RecentPost />
              </div>
            </>
          ) : (
            <Error key="cateErrKey" statusCode={404} />
          ),
        ]
      ) : (
        <BlogSingle key="cateKey" blogDetailsResponse={blogDetailsResponse} />
      ),
    ]
  );
};
export default ArchiveBlogs;
