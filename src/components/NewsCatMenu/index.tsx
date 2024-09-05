import { useContext, useEffect, useState } from "react";
import { useQuery } from "graphql-hooks";
import { Container, Accordion } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { newscategories } from "@Graphql/queriesgraphcms/newsCategory.graphql";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const NewsCatMenu = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  let newsCategory = [];
  const { notify, customClient } = useContext(AuthContext);
  const {
    loading: newsCatLoading,
    error,
    data,
  } = useQuery(newscategories.loc.source.body, {
    variables: { last: 10 },
    operationName: { clientName: "graphCms" },
    client: customClient,
  });
  const router = useRouter();

  let catName = "";
  if (router.query.all) {
    const Name = router.query.all[1];
    catName = Name;
  }

  if (newsCatLoading) return <LoadingIndicator />;
  if (data) {
    newsCategory = data.newsroomCategories;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <>
        <Accordion.Toggle
          onClick={decoratedOnClick}
          className="btn-block py-3 text-left"
          variant="link"
          eventKey="0"
        >
          {children}
          {isCurrentEventKey ? (
            <BsChevronUp className="position-absolute top right acc-blog-cat-arrow" />
          ) : (
            <BsChevronDown className="position-absolute top right acc-blog-cat-arrow" />
          )}
        </Accordion.Toggle>
      </>
    );
  };
  const pageData = props.data;

  return (
    <section
      className={`acc-news-cat-menu ${
        windowObj && windowSize.width > 1024 ? "bg-light" : ""
      }`}
    >
      <Container className="position-relative">
        {pageData
          ? pageData.pages.map((EachPage) => (
              <HTMLContent
                key={`ncm_${EachPage.id}`}
                class={`m-0 acc-news-prcontact-text pt-2 pt-xl-0 pr-0 pr-xl-2 text-center text-xl-left ${
                  windowObj && windowSize.width > 1024
                    ? "position-absolute right"
                    : ""
                }`}
                content={EachPage.pageIntroduction.html}
              />
            ))
          : ""}
        <article>
          <ul className="nav d-none d-xl-flex">
            <li className="nav-item">
              {catName ? (
                <I18nLink href="/news">
                  <a className="d-block nav-link">All</a>
                </I18nLink>
              ) : (
                <I18nLink href="/news">
                  <a className="d-block nav-link active">All</a>
                </I18nLink>
              )}
            </li>
            {newsCategory.map((category) => (
              <li className="nav-item" key={category.id}>
                <I18nLink
                  href={`/news/category/${category.newsroomCategorySlug}`}
                >
                  {category.newsroomCategorySlug === catName ? (
                    <a className="d-block nav-link active">
                      {category.newsroomCategoryTitle}
                    </a>
                  ) : (
                    <a className="d-block nav-link">
                      {category.newsroomCategoryTitle}
                    </a>
                  )}
                </I18nLink>
              </li>
            ))}
          </ul>
          {windowObj && windowSize.width <= 1024 ? (
            <Accordion className="acc-news-res-cat">
              <ContextAwareToggle eventKey="2">
                News Category
              </ContextAwareToggle>
              <Accordion.Collapse eventKey="2">
                <ul className="nav">
                  <li className="nav-item">
                    {catName ? (
                      <I18nLink href="/news">
                        <a className="d-block nav-link">All</a>
                      </I18nLink>
                    ) : (
                      <I18nLink href="/news">
                        <a className="d-block nav-link active">All</a>
                      </I18nLink>
                    )}
                  </li>
                  {newsCategory.map((category) => (
                    <li className="nav-item" key={category.id}>
                      <I18nLink
                        href={`/news/category/${category.newsroomCategorySlug}`}
                      >
                        {category.newsroomCategorySlug === catName ? (
                          <a className="d-block nav-link active">
                            {category.newsroomCategoryTitle}
                          </a>
                        ) : (
                          <a className="d-block nav-link">
                            {category.newsroomCategoryTitle}
                          </a>
                        )}
                      </I18nLink>
                    </li>
                  ))}
                </ul>
              </Accordion.Collapse>
            </Accordion>
          ) : null}
          {newsCatLoading ? <LoadingIndicator /> : ""}
        </article>
      </Container>
    </section>
  );
};

export default NewsCatMenu;
