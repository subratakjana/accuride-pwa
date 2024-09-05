import { useEffect, useState, useContext } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Error from "../../pages/_error";

const BlogCategoryMenu = dynamic(import("@Components/CategoryMenu"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const BlogTags = ({ tagListResponse }) => {
  const blogLists = tagListResponse;
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [listItems, setListItems] = useState(
    Array.from(Array(12).keys(), (n) => n + 1),
  );
  const [isFetching, setIsFetching] = useState(false);
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: pathSegments[2],
      isClickable: false,
    },
    { url: "", name: "Slideology Series" },
  ];

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      setIsFetching(true);
    }
  }

  function fetchMoreListItems() {
    const timer = setTimeout(() => {
      setListItems((prevState) => [
        ...prevState,
        ...Array.from(Array(12).keys(), (n) => n + prevState.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
    if (listItems.length > blogLists.length) {
      clearTimeout(timer);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  return (
    <>
      {blogLists && blogLists.length > 0 ? (
        <>
          <BreadCrumbs crumbs={crumbs} />
          <section>
            <BlogCategoryMenu />
          </section>
          {blogLists && blogLists.length > 0
            ? blogLists[0].pages.map((EachPage) => (
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
          <section className="section-padding acc-blog-page">
            <Container>
              <Row id="listitem">
                {listItems.map((listItem, IndexCnt) =>
                  blogLists[IndexCnt] ? (
                    <Col
                      key={`blog_${blogLists[IndexCnt].id}`}
                      sm={6}
                      lg={4}
                      className="pb-5"
                    >
                      <article>
                        <NextImage
                          src={
                            blogLists[IndexCnt].postImage
                              ? blogLists[IndexCnt].postImage.url
                              : "/assets/images/accuride-logo.svg"
                          }
                          alt={blogLists[IndexCnt].postTitle}
                          layout="intrinsic"
                          objectFit="contain"
                          objectPosition="center"
                          width={429}
                          height={283}
                        />
                        {blogLists[IndexCnt].categories.map((category) => (
                          <h5
                            className="text-medium m-0 pt-3"
                            key={`${category.id}_cat`}
                          >
                            {category.categoryTitle}
                          </h5>
                        ))}
                        {blogLists[IndexCnt].categories ? (
                          blogLists[IndexCnt].categories.map(
                            (category, IndexCount) => [
                              IndexCount === 0 ? (
                                <I18nLink
                                  key={`lnkid_${category.id}`}
                                  href={`/blog/${category.categorySlug}/${blogLists[IndexCnt].postSlug}`}
                                  isMagentoRoute={0}
                                >
                                  <a className="d-block">
                                    <h4 className="pt-3 pb-3 m-0">
                                      {blogLists[IndexCnt].postTitle}
                                    </h4>
                                  </a>
                                </I18nLink>
                              ) : (
                                <I18nLink
                                  key={`lnkid_${category.id}`}
                                  href={`/blog/${blogLists[IndexCnt].postSlug}`}
                                  isMagentoRoute={0}
                                >
                                  <a className="d-block">
                                    <h4 className="pt-3 pb-3 m-0">
                                      {blogLists[IndexCnt].postTitle}
                                    </h4>
                                  </a>
                                </I18nLink>
                              ),
                            ],
                          )
                        ) : (
                          <I18nLink
                            href={`/blog/${blogLists[IndexCnt].postSlug}`}
                            isMagentoRoute={0}
                          >
                            <a className="d-block">
                              <h4 className="pt-3 pb-3 m-0">
                                {blogLists[IndexCnt].postTitle}
                              </h4>
                            </a>
                          </I18nLink>
                        )}
                        <p className="m-0 pb-3">
                          {blogLists[IndexCnt].postExcerpt}
                        </p>

                        {blogLists[IndexCnt].categories ? (
                          blogLists[IndexCnt].categories.map(
                            (category, IndexCount) => [
                              IndexCount === 0 ? (
                                <I18nLink
                                  key={`lnkidd_${category.id}`}
                                  href={`/blog/${category.categorySlug}/${blogLists[IndexCnt].postSlug}`}
                                >
                                  <Button
                                    variant="primary"
                                    className={`text-uppercase d-xl-none ${
                                      windowObj && windowSize.width < 991
                                        ? "btn-block"
                                        : ""
                                    }`}
                                  >
                                    Read more
                                  </Button>
                                </I18nLink>
                              ) : (
                                <I18nLink
                                  key={`lnkidd_${category.id}`}
                                  href={`/blog/${blogLists[IndexCnt].postSlug}`}
                                >
                                  <Button
                                    variant="primary"
                                    className={`text-uppercase d-xl-none ${
                                      windowObj && windowSize.width < 991
                                        ? "btn-block"
                                        : ""
                                    }`}
                                  >
                                    Read more
                                  </Button>
                                </I18nLink>
                              ),
                            ],
                          )
                        ) : (
                          <I18nLink
                            href={`/blog/${blogLists[IndexCnt].postSlug}`}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase d-xl-none ${
                                windowObj && windowSize.width < 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              Read more
                            </Button>
                          </I18nLink>
                        )}
                      </article>
                    </Col>
                  ) : (
                    ""
                  ),
                )}
              </Row>
              {listItems.length <= blogLists.length
                ? isFetching && "Loading the next set of posts..."
                : ""}
            </Container>
          </section>
        </>
      ) : (
        <Error key="cateErrKey" statusCode={404} />
      )}
    </>
  );
};

export default BlogTags;
