import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import OneSignal from "react-onesignal";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const RecentPost = dynamic(import("@Components/Blogs/RecentPost"));
const BlogList = dynamic(import("@Components/Blogs/BlogList"));
const BlogCategoryMenu = dynamic(import("@Components/CategoryMenu"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Blogs = ({ blogLists }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [isInitOneSignal, setIsInitOneSignal] = useState(false);
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  const callOneSignalPush = () => {
    OneSignal.init({
      appId: process.env.NEXT_PUBLIC_ONE_SIGNAL_APPID, // STEP 9
      notifyButton: {
        enable: true,
      },
      promptOptions: {
        slidedown: {
          enabled: true,
          actionMessage:
            "Allow Notifications for updates on product promotions and more from Accuride",
          acceptButtonText: "Allow",
          cancelButtonText: "Cancel",
        },
      },
      welcomeNotification: {
        title: "One Signal",
        message: "Thanks for subscribing!",
      },
    }).then(() => {
      setIsInitOneSignal(true);
    });
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    if (!isInitOneSignal)
      setTimeout(() => {
        callOneSignalPush();
      }, 2000);
  }, [windowObj]);

  const clickScrollTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  let getBlogLists = [];
  for (let i = 0; i < blogLists.length; i++) {
    if (blogLists[i].pages.length > 0) {
      getBlogLists = blogLists[i];
      break;
    }
  }
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <div
        className="blog-scroll-top-btn d-xl-block d-none position-fixed"
        role="button"
        tabIndex="0"
        onClick={clickScrollTop}
        onKeyDown={clickScrollTop}
      >
        <FaRegArrowAltCircleUp />
      </div>
      {getBlogLists ? (
        <section
          key={`banner_${getBlogLists.pages[0].banner.id}`}
          className="acc-blog-main-banner acc-small-banner position-relative"
        >
          <Container>
            <article className="position-absolute acc-banner-caption z-index-1">
              {getBlogLists.pages[0].banner.bannerHeading ? (
                <h2 className="text-white">
                  {getBlogLists.pages[0].banner.bannerHeading}
                </h2>
              ) : (
                ""
              )}
              {getBlogLists.pages[0].banner.bannerDescription ? (
                <p className="text-white">
                  {getBlogLists.pages[0].banner.bannerDescription}
                </p>
              ) : (
                ""
              )}
            </article>
          </Container>
          {getBlogLists.pages[0].banner.bannerImage
            ? getBlogLists.pages[0].banner.bannerImage.map((bannerimage) => (
                <span className="w-100 blogBannerSnapInner d-block">
                  <NextImage
                    src={bannerimage.url}
                    alt={bannerimage.bannerHeading}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                    key={bannerimage.id}
                  />
                </span>
              ))
            : null}
        </section>
      ) : null}
      <BlogCategoryMenu />
      <section className="section-padding acc-blog-page">
        {/* header start */}
        <Container>
          {/* Featured Blog Sections */}
          {blogLists
            ? blogLists.map((blogs) =>
                blogs.setAsFeaturePost === true ? (
                  <Row
                    key={`${blogs.id}_featblog`}
                    className="align-items-center pb-5"
                  >
                    <Col md={6}>
                      <NextImage
                        src={
                          blogs.postImage
                            ? blogs.postImage.url
                            : "/assets/images/accuride-logo-desktop.svg"
                        }
                        alt={blogs.postTitle}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        className="mx-auto mb-3"
                        width={692}
                        height={413}
                      />
                    </Col>
                    <Col md={6}>
                      {blogs.categories.length > 0 ? (
                        blogs.categories.map((category, IndexCount) => [
                          IndexCount === 0 ? (
                            <article key={category.id}>
                              <h5 className="text-medium m-0 pt-3">
                                {category.categoryTitle}
                              </h5>
                              {blogs.postTitle ? (
                                <I18nLink
                                  href={`/blog/${category.categorySlug}/${blogs.postSlug}`}
                                  isMagentoRoute="0"
                                >
                                  <a target="_self">
                                    <h2 className="pt-3 pb-3 m-0">
                                      {blogs.postTitle}
                                    </h2>
                                  </a>
                                </I18nLink>
                              ) : null}
                              {blogs.postExcerpt ? (
                                <p className="m-0 pb-3">{blogs.postExcerpt}</p>
                              ) : null}
                              <I18nLink
                                href={`/blog/${category.categorySlug}/${blogs.postSlug}`}
                                isMagentoRoute="0"
                              >
                                <Button
                                  variant="primary"
                                  className={`text-uppercase ${
                                    windowObj && windowSize.width < 991
                                      ? "btn-block"
                                      : ""
                                  }`}
                                >
                                  Read Article
                                </Button>
                              </I18nLink>
                            </article>
                          ) : (
                            ""
                          ),
                        ])
                      ) : (
                        <article>
                          {blogs.postTitle ? (
                            <I18nLink
                              href={`/blog/${blogs.postSlug}`}
                              isMagentoRoute="0"
                            >
                              <a target="_self">
                                <h2 className="pt-3 pb-3 m-0">
                                  {blogs.postTitle}
                                </h2>
                              </a>
                            </I18nLink>
                          ) : null}
                          {blogs.postExcerpt ? (
                            <p className="m-0 pb-3">{blogs.postExcerpt}</p>
                          ) : null}
                          <I18nLink
                            href={`/blog/${blogs.postSlug}`}
                            isMagentoRoute="0"
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase ${
                                windowObj && windowSize.width < 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              Read Article
                            </Button>
                          </I18nLink>
                        </article>
                      )}
                    </Col>
                  </Row>
                ) : (
                  ""
                ),
              )
            : ""}

          {/* End */}
          {blogLists && <BlogList data={blogLists} />}
        </Container>
      </section>
      <RecentPost />
    </>
  );
};

export default Blogs;
