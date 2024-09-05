import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Error from "../../pages/_error";
import styles from "./NewsSingle.module.scss";

const DateFormat = dynamic(() => import("@Components/Markets/DateFormat"));
const Follow = dynamic(() => import("@Components/Followus"));
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const NewsRoomSingle = ({ newssingles }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
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
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  let getCategory = "";
  if (pathSegments && pathSegments.length > 3) {
    getCategory = pathSegments[2];
  } else if (newssingles && newssingles.newsroomCategories) {
    getCategory = newssingles.newsroomCategories[0].newsroomCategorySlug;
  }

  return newssingles ? (
    <>
      <BreadCrumbs crumbs={crumbs} />

      <section
        className={`section-padding padding-left ${styles["acc-news-details-page"]}`}
        key={newssingles.id}
      >
        <Container>
          <Row>
            <Col lg={9}>
              <article>
                {/* Call the main image here */}
                <div className={styles["acc-news-details-image"]}>
                  <NextImage
                    src={
                      newssingles.newsImage
                        ? newssingles.newsImage.url
                        : "/assets/images/accuride-logo-desktop.svg"
                    }
                    alt={
                      newssingles.newsImage ? newssingles.newsTitle : "Accuride"
                    }
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                  />
                </div>
                <I18nLink href={`/news/${newssingles.newsSlug}`}>
                  <h2 className="pt-3 m-0">
                    <a className="d-block">{newssingles.newsTitle}</a>
                  </h2>
                </I18nLink>
                <div
                  className={`pt-3 pb-3 ${styles["acc-news-details-description"]}`}
                >
                  {newssingles.newsDescription ? (
                    <HTMLContent
                      className="m-0"
                      content={newssingles.newsDescription.html}
                    />
                  ) : (
                    ""
                  )}
                </div>
                <h6 className="m-0 pb-2 pt-2 mb-3 border-medium border-top border-bottom">
                  <div className="d-inline-flex">
                    {newssingles.newsroomCategories
                      ? newssingles.newsroomCategories.map(
                          (category, getIndex) => (
                            <I18nLink
                              key={`newss_${category.id}`}
                              href={`/news/category/${category.newsroomCategorySlug}`}
                              isMagentoRoute={0}
                            >
                              <a className="d-block px-1">
                                {getIndex <
                                newssingles.newsroomCategories.length - 1
                                  ? `${category.newsroomCategoryTitle}, `
                                  : category.newsroomCategoryTitle}
                              </a>
                            </I18nLink>
                          ),
                        )
                      : ""}
                  </div>
                </h6>
                <h3>Related Posts</h3>
                <Row>
                  {newssingles.relatedNews
                    ? newssingles.relatedNews.map((news) => (
                        <Col sm={6} md={4} key={news.id}>
                          {/* Call Related post image here */}
                          <NextImage
                            src={news.newsImage.url}
                            alt={news.newsTitle}
                            width={209}
                            height={131}
                          />
                          <I18nLink
                            href={`/news/${getCategory}/${news.newsSlug}`}
                          >
                            <a className="d-block">
                              <h4>{news.newsTitle}</h4>
                            </a>
                          </I18nLink>
                          <DateFormat
                            date={
                              news.newsDate ? news.newsDate : news.createdAt
                            }
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
                <Follow />
                {newssingles.pages.length > 0 ? (
                  <HTMLContent
                    content={newssingles.pages[0].singlePageContactDetails.html}
                  />
                ) : null}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  ) : (
    <Error statusCode={404} />
  );
};
export default NewsRoomSingle;
