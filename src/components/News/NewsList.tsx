import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Button, Row, Col } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const DateFormat = dynamic(() => import("@Components/Markets/DateFormat"));

const NewsList = (props) => {
  const newsLists = props.data;
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [listItems, setListItems] = useState(
    Array.from(Array(12).keys(), (n) => n + 1),
  );
  const [isFetching, setIsFetching] = useState(false);
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      setIsFetching(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function fetchMoreListItems() {
    const timer = setTimeout(() => {
      setListItems((prevState) => [
        ...prevState,
        ...Array.from(Array(12).keys(), (n) => n + prevState.length + 1),
      ]);
      setIsFetching(false);
    }, 2000);
    if (listItems.length > newsLists.length) {
      clearTimeout(timer);
    }
  }

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);
  return (
    <>
      <Row id="listitem">
        {listItems.map((listItem, IndexCnt) =>
          newsLists[IndexCnt] ? (
            <Col
              sm={6}
              lg={4}
              key={`${newsLists[IndexCnt].id}_newslist`}
              className="pb-5"
            >
              <article>
                <div
                  className={`d-flex ${
                    newsLists[IndexCnt].newsroomCategories.length > 0
                      ? ""
                      : "mb-5 pt-2"
                  }`}
                >
                  {newsLists[IndexCnt].newsroomCategories.map((category) => (
                    <I18nLink
                      key={`${category.id}_newscat`}
                      href={`/news/category/${category.newsroomCategorySlug}`}
                    >
                      <h5
                        className={`text-medium m-0 mb-3 pt-3 cursor-pointer ${
                          newsLists[IndexCnt].newsroomCategories.length > 1
                            ? "pr-3"
                            : ""
                        }`}
                      >
                        {category.newsroomCategoryTitle}
                      </h5>
                    </I18nLink>
                  ))}
                </div>
                <I18nLink
                  href={
                    newsLists[IndexCnt].newsroomCategories.length > 0
                      ? `/news/${newsLists[IndexCnt].newsroomCategories[0].newsroomCategorySlug}/${newsLists[IndexCnt].newsSlug}`
                      : `/news/${newsLists[IndexCnt].newsSlug}`
                  }
                >
                  <a
                    className={`d-block ${
                      newsLists[IndexCnt].newsroomCategories.length > 0
                        ? ""
                        : "pt-1"
                    }`}
                  >
                    <NextImage
                      src={
                        newsLists[IndexCnt].newsImage
                          ? newsLists[IndexCnt].newsImage.url
                          : "/assets/images/accuride-logo-desktop.svg"
                      }
                      alt={newsLists[IndexCnt].newsTitle}
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={429}
                      height={283}
                      className="mx-auto mb-3"
                    />
                  </a>
                </I18nLink>
                <DateFormat
                  class="m-0 text-small"
                  date={
                    newsLists[IndexCnt].newsDate
                      ? newsLists[IndexCnt].newsDate
                      : newsLists[IndexCnt].createdAt
                  }
                  pageName="NewsList"
                />
                {newsLists[IndexCnt].newsTitle ? (
                  <I18nLink
                    href={
                      newsLists[IndexCnt].newsroomCategories.length > 0
                        ? `/news/${newsLists[IndexCnt].newsroomCategories[0].newsroomCategorySlug}/${newsLists[IndexCnt].newsSlug}`
                        : `/news/${newsLists[IndexCnt].newsSlug}`
                    }
                  >
                    <a className="d-block">
                      <h4 className="pt-1 pb-3 m-0">
                        {newsLists[IndexCnt].newsTitle}
                      </h4>
                    </a>
                  </I18nLink>
                ) : null}
                <p className="m-0 pb-3">{newsLists[IndexCnt].newsExcerpt}</p>
                {newsLists[IndexCnt].newsroomCategories.length > 0 ? (
                  <I18nLink
                    href={`/news/${newsLists[IndexCnt].newsroomCategories[0].newsroomCategorySlug}/${newsLists[IndexCnt].newsSlug}`}
                  >
                    <Button
                      variant="primary"
                      className={`text-uppercase d-xl-none ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      Read more
                    </Button>
                  </I18nLink>
                ) : null}
              </article>
            </Col>
          ) : (
            ""
          ),
        )}
      </Row>
      {listItems.length <= newsLists.length
        ? isFetching && "Loading the next set of posts..."
        : ""}
    </>
  );
};

export default NewsList;
