import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { I18nLink, LoadingIndicator } from "@Components/Utilities";
import { ReactSVG } from "react-svg";
import Rating from "react-rating";
import { useManualQuery } from "graphql-hooks";
import GET_CUSTOMER_REVIEWS from "@Graphql/queries/getCustomerReviews.graphql";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import Head from "next/head";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const Review = () => {
  const router = useRouter();
  let customerReviewsData = [];
  const { token, isAuthUser } = useContext(AuthContext);
  useEffect(() => {
    isAuthUser();
  }, []);

  // Function for sidebar sticky issue start
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Function for sidebar sticky issue end

  // API call to get the customer reviews
  const [getCustomerReview, { loading, data }] = useManualQuery(
    GET_CUSTOMER_REVIEWS.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );
  useEffect(() => {
    getCustomerReview();
  }, []);
  if (data) customerReviewsData = data.customerReviews;
  if (loading || !token) return <LoadingIndicator />;

  const viewReviewDetails = (reviewId) => {
    const asPath = `${router.asPath.split("?")[0]}/details`;
    const querySign = "?";
    const pageQuery = `id=${reviewId}`;
    router.push(
      { pathname: `${router.pathname}/details`, query: { id: reviewId } },
      `${asPath}${querySign}${pageQuery}`,
      { shallow: true },
    );
  };

  return (
    <>
      <Head>
        <title>My Product Reviews</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
      </Head>
      <Container className="section-padding pt-0 acc-review">
        <Row className="align-items-start">
          {/* sidebar start */}
          <Col
            xl
            className={`acc-account-sidebar pt-xl-5 ${
              isSticky ? "sticky" : ""
            }`}
          >
            <AccountSidebar />
          </Col>
          {/* sidebar end */}

          {/* content start */}
          <Col xl className="acc-account-content pt-xl-5">
            <header className="mb-3">
              <h1 className="text-uppercase mb-0">My Product Reviews</h1>
            </header>
            {customerReviewsData.length > 0 ? (
              <Row className="acc-review-list">
                {customerReviewsData.map((item) => (
                  <Col sm={12} md={6} className="acc-item" key={Math.random()}>
                    <article>
                      <div className="acc-review-box-body">
                        <div className="mb-2">
                          <strong>Created: </strong>
                          <span>{item.created}</span>
                        </div>
                        <div className="mb-3">
                          <strong>Product Name: </strong>
                          <I18nLink
                            href={`/products/${item.product_url}`}
                            isMagentoRoute={1}
                          >
                            <a
                              aria-label="link"
                              className="text-primary font-weight-500"
                            >
                              {item.product_name}
                            </a>
                          </I18nLink>
                        </div>
                        <div className="d-flex align-items-center">
                          <strong className="d-block mr-2">Rating: </strong>
                          <Rating
                            readonly
                            className="rating d-block"
                            initialRating={Math.round(item.rating / 20)}
                            emptySymbol={
                              <ReactSVG
                                src="/assets/images/icons/star.svg"
                                className="rating-icon rating-empty"
                              />
                            }
                            fullSymbol={
                              <ReactSVG
                                src="/assets/images/icons/star.svg"
                                className="rating-icon rating-full"
                              />
                            }
                          />
                        </div>
                        <div className="acc-review-text">
                          <strong>Review: </strong>
                          <span>{item.review}</span>
                        </div>
                      </div>
                      <div className="acc-review-box-bttn">
                        <Button
                          onClick={() => viewReviewDetails(item.review_id)}
                          variant="primary"
                          className="text-uppercase mt-3"
                          size="sm"
                        >
                          See Details
                        </Button>
                      </div>
                    </article>
                  </Col>
                ))}
              </Row>
            ) : (
              <Alert variant="warning">You have submitted no reviews.</Alert>
            )}
          </Col>
          {/* content end */}
        </Row>
      </Container>
      <EmailSubscription />
    </>
  );
};

export default Review;
