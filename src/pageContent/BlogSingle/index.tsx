import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Container, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";
import Error from "../../pages/_error";
import styles from "./BlogSingle.module.scss";

const HTMLContent = dynamic(import("@Components/Utilities/HTMLContent"));
const Follow = dynamic(import("@Components/Followus"));
const DateFormat = dynamic(import("@Components/Markets/DateFormat"));
const RelatedProducts = dynamic(import("@Components/Blogs/RelatedProducts"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const BlogSingle = ({ blogDetailsResponse }) => {
  let blogsingles = blogDetailsResponse;
  const [backToTopVisibility, setBackToTopVisibility] = useState(false);
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") &&
    pathSegments.length === 5
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (
    removeSpeChar[removeSpeChar.length - 1].includes("#") &&
    pathSegments.length === 5
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false &&
    pathSegments.length === 5
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: pathSegments[3],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false &&
    pathSegments.length === 4
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") &&
    pathSegments.length === 4
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (
    removeSpeChar[removeSpeChar.length - 1].includes("#") &&
    pathSegments.length === 4
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/category/${pathSegments[2]}/${pathSegments[3]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("#")[0],
      },
    ];
  }
  const toggleVisibility = () => {
    if (window.scrollY > 600) {
      setBackToTopVisibility(true);
    } else {
      setBackToTopVisibility(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (typeof document !== "undefined") {
    for (let i = 0; i < blogsingles.postDescription.references.length; i++) {
      const targetElement = document.getElementById(
        blogsingles.postDescription.references[i].id,
      );
      const newElement = document.querySelector(
        `[data-gcms-embed-id='${blogsingles.postDescription.references[i].id}']`,
      );
      if (targetElement && newElement) {
        newElement.appendChild(targetElement);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return blogsingles ? (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section
        className={`section-padding padding-left ${styles["acc-blog-details-page"]}`}
        key={blogsingles.id}
      >
        <Container>
          <Row>
            <Col lg={9}>
              <article>
                {/* Call the main image here */}
                <div className={styles["acc-blog-details-image"]}>
                  {blogsingles.postImage ? (
                    <NextImage
                      src={
                        blogsingles.postImage ? blogsingles.postImage.url : ""
                      }
                      alt={blogsingles.postTitle}
                      layout="fill"
                      objectFit="contain"
                      objectPosition="center"
                    />
                  ) : (
                    <NextImage
                      src="/assets/images/accuride-logo-desktop.svg"
                      alt="Accuride"
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      className="mx-auto mb-3"
                      width={692}
                      height={413}
                    />
                  )}
                </div>
                <h1 className="pt-3 m-0">
                  <a className="d-block">{blogsingles.postTitle}</a>
                </h1>
                <div
                  className={`pt-3 pb-3 ${styles["acc-blog-details-description"]}`}
                >
                  {blogsingles.postDescription ? (
                    <>
                      <HTMLContent
                        class="text-break"
                        content={blogsingles.postDescription.html}
                      />
                      {blogsingles.postDescription.references.map(
                        (item, index) => {
                          return (
                            <div key={index}>
                              {item.__typename === "BlogFaq" && (
                                <>
                                  <div
                                    className={styles["acc-external-box"]}
                                    id={item.id}
                                  >
                                    <div
                                      className={
                                        styles["acc-external-box-header"]
                                      }
                                    >
                                      <h3>FAQs</h3>
                                    </div>
                                    <div
                                      className={
                                        styles["acc-external-box-body"]
                                      }
                                    >
                                      <ol
                                        className={
                                          styles["acc-external-box-body-list"]
                                        }
                                      >
                                        {item.faqLists.map((faqItem) => (
                                          <li>
                                            <span>
                                              <h5>{faqItem.question}</h5>
                                              <p>{faqItem.answer}</p>
                                            </span>
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                    <ReactSVG
                                      src="/assets/images/icons/external-box-corner.svg"
                                      className={
                                        styles["acc-external-box-corner"]
                                      }
                                    />
                                  </div>
                                </>
                              )}
                              {item.__typename === "BlogFeaturedProduct" && (
                                <>
                                  <div
                                    className={styles["acc-external-box"]}
                                    id={item.id}
                                  >
                                    <div
                                      className={
                                        styles["acc-external-box-header"]
                                      }
                                    >
                                      <h3>
                                        Featured Product
                                        {item.products.length > 1 && "(s)"}:
                                      </h3>
                                    </div>
                                    {item.products.map((productItem) => (
                                      <a
                                        href={productItem.productLink}
                                        target="_blank"
                                      >
                                        <div
                                          className={
                                            styles["acc-external-box-body"]
                                          }
                                        >
                                          <div
                                            className={
                                              styles[
                                                "acc-external-box-body-title"
                                              ]
                                            }
                                          >
                                            {productItem.productName}
                                          </div>
                                          <NextImage
                                            src={productItem.productImage.url}
                                            alt={
                                              productItem.productImage.fileName
                                            }
                                            width={350}
                                            height={180}
                                            className={
                                              styles["acc-external-box-image"]
                                            }
                                          />
                                          <p>
                                            {productItem.productDescription}
                                          </p>
                                        </div>
                                      </a>
                                    ))}
                                    <ReactSVG
                                      src="/assets/images/icons/external-box-corner.svg"
                                      className={
                                        styles["acc-external-box-corner"]
                                      }
                                    />
                                  </div>
                                </>
                              )}
                            </div>
                          );
                        },
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {blogsingles.postAuthor && (
                    <h4 className="text-medium">
                      <strong>Author:</strong> <em>{blogsingles.postAuthor}</em>
                    </h4>
                  )}
                </div>

                <h6 className="m-0 pb-2 pt-2 mb-3 border-medium border-top border-bottom">
                  <div className="d-inline-flex">
                    {blogsingles.categories
                      ? blogsingles.categories.map((category, getIndex) => (
                          <I18nLink
                            key={`cat_${category.categorySlug}`}
                            href={`/blog/category/${category.categorySlug}`}
                            isMagentoRoute={0}
                          >
                            <a className="d-block px-1">
                              {getIndex < blogsingles.categories.length - 1
                                ? `${category.categoryTitle}, `
                                : category.categoryTitle}
                            </a>
                          </I18nLink>
                        ))
                      : ""}
                  </div>
                </h6>
                <h3>Related Posts</h3>
                <Row>
                  {blogsingles.relatedBlog
                    ? blogsingles.relatedBlog.map((blog) => (
                        <Col sm={6} md={4} key={blog.id}>
                          {/* Call Related post image here */}
                          <NextImage
                            src={blog.postImage.url}
                            alt={blog.postTitle}
                            width={209}
                            height={131}
                          />
                          {blog.categories ? (
                            blog.categories.map((category, IndexCount) => [
                              IndexCount === 0 ? (
                                <I18nLink
                                  key={`cats_${category.categorySlug}`}
                                  href={`/blog/${category.categorySlug}/${blog.postSlug}`}
                                  isMagentoRoute={0}
                                >
                                  <a className="d-block">
                                    <h4 className="pt-3 m-0">
                                      {blog.postTitle}
                                    </h4>
                                  </a>
                                </I18nLink>
                              ) : (
                                ""
                              ),
                            ])
                          ) : (
                            <I18nLink
                              href={`/blog/${blog.postSlug}`}
                              isMagentoRoute={0}
                            >
                              <a className="d-block">
                                <h4 className="pt-3 m-0">{blog.postTitle}</h4>
                              </a>
                            </I18nLink>
                          )}
                          <DateFormat
                            date={blog.createdAt}
                            pageName="BlogSingle"
                          />
                        </Col>
                      ))
                    : ""}
                </Row>
              </article>
            </Col>
            <Col lg={3}>
              <div className={styles["acc-blog-details-sidebar"]}>
                <div className={styles["blog-detail-follow-wrapper"]}>
                  <Follow />
                </div>
                <RelatedProducts data={blogsingles.relatedProduct} />
              </div>
            </Col>
          </Row>
        </Container>
        {/* {blogSingleLoading ? (<LoadingIndicator />) : ''} */}
        {/* return to top start */}
        {backToTopVisibility && (
          <div
            className={`font-size-sm font-weight-300 ${styles["acc-return-to-top"]}`}
            onClick={scrollToTop}
          >
            <ReactSVG src="/assets/images/icons/return-to-top.svg" />
            <span className="text-uppercase">Return to top</span>
          </div>
        )}
        {/* return to top end */}
      </section>
    </>
  ) : (
    <Error statusCode={404} />
  );
};

export default BlogSingle;
