import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Button, Row, Col } from "react-bootstrap";
// TODO: use latest next image component from next/image
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";

const BlogList = (props) => {
  const blogLists = props.data;
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [listItems, setListItems] = useState(
    Array.from(Array(12).keys(), (n) => n + 1),
  );
  const [isFetching, setIsFetching] = useState(false);

  // TODO: use better infinite scrolling implementation
  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      setIsFetching(true);
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
    if (listItems.length > blogLists.length) {
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
                      : "/assets/images/accuride-logo-desktop.svg"
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
                {blogLists[IndexCnt].categories.length > 0 ? (
                  blogLists[IndexCnt].categories.map((category, IndexCount) => [
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
                  ])
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
                <p className="m-0 pb-3">{blogLists[IndexCnt].postExcerpt}</p>

                {blogLists[IndexCnt].categories.length > 0 ? (
                  blogLists[IndexCnt].categories.map((category, IndexCount) => [
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
                  ])
                ) : (
                  <I18nLink href={`/blog/${blogLists[IndexCnt].postSlug}`}>
                    <Button
                      variant="primary"
                      className={`text-uppercase d-xl-none ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
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
    </>
  );
};

export default BlogList;
