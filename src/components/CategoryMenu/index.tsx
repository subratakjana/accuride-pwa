import { useContext, useEffect, useState } from "react";
import { useQuery } from "graphql-hooks";
import { Container, Accordion } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useRouter } from "next/router";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { blogcategories } from "@Graphql/queriesgraphcms/categoryMenu.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const BlogCategoryMenu = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  let blogCategory = [];
  const { notify } = useContext(AuthContext);
  const router = useRouter();
  let catName = "";
  let subCatName = "";

  if (router.query.all) {
    const Name = router.query.all[1];
    const SubName = router.query.all[2];
    catName = Name;
    subCatName = SubName;

    if (catName === "industrial-blogs") {
      catName = "industrial";
    }
  }

  const {
    loading: blogCatLoading,
    error,
    data,
  } = useQuery(blogcategories.loc.source.body, {
    variables: { last: 10 },
    operationName: { clientName: "graphCms" },
  });

  if (data) {
    blogCategory = data.categories;
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
  return (
    <>
      {windowObj && windowSize.width > 1024 ? (
        <section className="acc-blog-cat-menu bg-light">
          <Container>
            {windowObj && windowSize.width <= 1024 ? (
              <article>
                <Accordion className="acc-blog-res-cat">
                  <ContextAwareToggle eventKey="0">
                    Blog Category
                  </ContextAwareToggle>
                  <Accordion.Collapse eventKey="0">
                    <ul className="nav">
                      <li className="nav-item">
                        {catName ? (
                          <I18nLink href="/blog" isMagentoRoute={0}>
                            <a className="d-block nav-link">All</a>
                          </I18nLink>
                        ) : (
                          <I18nLink href="/blog" isMagentoRoute={0}>
                            <a className="d-block nav-link active">All</a>
                          </I18nLink>
                        )}
                      </li>
                      {blogCategory.map((category) =>
                        category.categories.length === 0 ? (
                          <li className="nav-item" key={`catM_${category.id}`}>
                            <I18nLink
                              href={`/blog/category/${category.categorySlug}`}
                              isMagentoRoute={0}
                            >
                              {category.categorySlug === catName ? (
                                <a className="d-block nav-link active">
                                  {category.categoryTitle}
                                </a>
                              ) : (
                                <a className="d-block nav-link">
                                  {category.categoryTitle}
                                </a>
                              )}
                            </I18nLink>
                          </li>
                        ) : (
                          ""
                        ),
                      )}
                    </ul>
                  </Accordion.Collapse>
                </Accordion>
                {blogCatLoading ? <LoadingIndicator /> : ""}
              </article>
            ) : (
              <article className="d-none d-xl-block">
                <ul className="nav">
                  <li className="nav-item">
                    {catName ? (
                      <I18nLink href="/blog" isMagentoRoute={0}>
                        <a className="d-block nav-link">All</a>
                      </I18nLink>
                    ) : (
                      <I18nLink href="/blog" isMagentoRoute={0}>
                        <a className="d-block nav-link active">All</a>
                      </I18nLink>
                    )}
                  </li>
                  {blogCategory.map((category) =>
                    category.categories.length === 0 ? (
                      <li className="nav-item" key={`catM_${category.id}`}>
                        <I18nLink
                          href={`/blog/category/${category.categorySlug}`}
                          isMagentoRoute={0}
                        >
                          {category.categorySlug === catName ? (
                            <a className="d-block nav-link active">
                              {category.categoryTitle}
                            </a>
                          ) : (
                            <a className="d-block nav-link">
                              {category.categoryTitle}
                            </a>
                          )}
                        </I18nLink>
                      </li>
                    ) : (
                      ""
                    ),
                  )}
                </ul>
                {blogCatLoading ? <LoadingIndicator /> : null}
              </article>
            )}
          </Container>
        </section>
      ) : (
        <section className="acc-blog-cat-menu">
          <Container>
            {windowObj && windowSize.width <= 1024 ? (
              <article>
                <Accordion className="acc-blog-res-cat">
                  <ContextAwareToggle eventKey="0">
                    Blog Category
                  </ContextAwareToggle>
                  <Accordion.Collapse eventKey="0">
                    <ul className="nav">
                      <li className="nav-item">
                        {catName ? (
                          <I18nLink href="/blog" isMagentoRoute={0}>
                            <a className="d-block nav-link">All</a>
                          </I18nLink>
                        ) : (
                          <I18nLink href="/blog" isMagentoRoute={0}>
                            <a className="d-block nav-link active">All</a>
                          </I18nLink>
                        )}
                      </li>
                      {blogCategory.map((category) =>
                        category.categories.length === 0 ? (
                          <li className="nav-item" key={`catM_${category.id}`}>
                            <I18nLink
                              href={`/blog/category/${category.categorySlug}`}
                              isMagentoRoute={0}
                            >
                              {category.categorySlug === catName ? (
                                <a className="d-block nav-link active">
                                  {category.categoryTitle}
                                </a>
                              ) : (
                                <a className="d-block nav-link">
                                  {category.categoryTitle}
                                </a>
                              )}
                            </I18nLink>
                          </li>
                        ) : null,
                      )}
                    </ul>
                  </Accordion.Collapse>
                </Accordion>
                {blogCatLoading ? <LoadingIndicator /> : null}
              </article>
            ) : (
              <article className="d-none d-xl-block">
                <ul className="nav">
                  <li className="nav-item">
                    {catName ? (
                      <I18nLink href="/blog" isMagentoRoute={0}>
                        <a className="d-block nav-link">All</a>
                      </I18nLink>
                    ) : (
                      <I18nLink href="/blog" isMagentoRoute={0}>
                        <a className="d-block nav-link active">All</a>
                      </I18nLink>
                    )}
                  </li>
                  {blogCategory.map((category) =>
                    category.categories.length === 0 ? (
                      <li className="nav-item" key={`catM_${category.id}`}>
                        <I18nLink
                          href={`/blog/category/${category.categorySlug}`}
                          isMagentoRoute={0}
                        >
                          {category.categorySlug === catName ? (
                            <a className="d-block nav-link active">
                              {category.categoryTitle}
                            </a>
                          ) : (
                            <a className="d-block nav-link">
                              {category.categoryTitle}
                            </a>
                          )}
                        </I18nLink>
                      </li>
                    ) : null,
                  )}
                </ul>
                {blogCatLoading ? <LoadingIndicator /> : null}
              </article>
            )}
          </Container>
        </section>
      )}

      <section className="acc-blog-res-cat">
        <Container>
          {windowObj && windowSize.width <= 1024 ? (
            blogCategory.map((category) =>
              category.parentCategory.length > 0 &&
              category.categorySlug === catName ? (
                <Accordion
                  key={`catp_${category.id}`}
                  className="acc-blog-res-cat"
                >
                  <ContextAwareToggle eventKey="0">
                    Filter by subcategory
                  </ContextAwareToggle>
                  <Accordion.Collapse eventKey="0">
                    <ul>
                      {category.parentCategory.map(
                        (subcategory, subCatIndex) => (
                          <li
                            key={`cat_${subcategory.id}`}
                            className="d-block border-bottom border-medium"
                          >
                            <I18nLink
                              href={`/blog/category/${catName}/${subcategory.categorySlug}`}
                              isMagentoRoute={0}
                            >
                              <a className="d-block p-1">
                                {subcategory.categoryTitle}
                              </a>
                            </I18nLink>
                          </li>
                        ),
                      )}
                    </ul>
                  </Accordion.Collapse>
                </Accordion>
              ) : (
                ""
              ),
            )
          ) : (
            <ul className="pt-3 pb-3 text-center acc-blog-sub-cat d-none d-xl-block">
              {blogCategory.map((category) =>
                category.categorySlug === catName
                  ? category.parentCategory?.map((subcategory, subCatIndex) => (
                      <li key={`cat_${subcategory.id}`} className="d-inline">
                        <span className="d-lg-inline mb-1 mb-lg-0 d-block">
                          {subCatIndex === 0 ? "Filter by subcategory:" : ""}
                        </span>
                        <I18nLink
                          href={`/blog/category/${catName}/${subcategory.categorySlug}`}
                          isMagentoRoute={0}
                        >
                          {subcategory.categorySlug === subCatName ? (
                            <a className="d-lg-inline mb-1 mb-lg-0 d-block nav-link active p-1 mx-2 rounded">
                              {subcategory.categoryTitle}
                            </a>
                          ) : (
                            <a className="d-lg-inline mb-1 mb-lg-0 d-block nav-link p-1 mx-2 rounded">
                              {subcategory.categoryTitle}
                            </a>
                          )}
                        </I18nLink>
                      </li>
                    ))
                  : "",
              )}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
};

export default BlogCategoryMenu;
