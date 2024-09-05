import { Row, Col, Button } from "react-bootstrap";
import { I18nLink, LoadingIndicator } from "@Components/Utilities";
import Rating from "react-rating";
import { ReactSVG } from "react-svg";
import { useEffect, useState } from "react";
import { useManualQuery } from "graphql-hooks";
import GET_CUSTOMER_REVIEWS from "@Graphql/queries/getCustomerReviews.graphql";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";

const RecentReview = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  let customerReviewsData = [];
  // API call to get the customer reviews
  const [getCustomerReview, { loading, data }] = useManualQuery(
    GET_CUSTOMER_REVIEWS.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );
  useEffect(() => {
    getCustomerReview();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  if (data) customerReviewsData = data.customerReviews;
  if (loading) return <LoadingIndicator />;
  const customerRecentReviewsData = customerReviewsData.slice(0, 3);

  const viewReviewDetails = (reviewId) => {
    const asPath = `${router.asPath.split("?")[0]}/review/details`;
    const querySign = "?";
    const pageQuery = `id=${reviewId}`;
    router.push(
      {
        pathname: `${router.pathname}/review/details`,
        query: { reviewDetailsObj: JSON.stringify(reviewId) },
      },
      `${asPath}${querySign}${pageQuery}`,
      { shallow: true },
    );
    return false;
  };

  return (
    <>
      {customerRecentReviewsData.length > 0 ? (
        <section className="acc-recent-review section-padding pb-0">
          <header
            className={`d-flex align-items-start justify-content-between align-items-center mb-3 pb-xl-2 border-medium ${
              windowObj && windowSize.width > 1024 ? "border-bottom" : ""
            }`}
          >
            <h2 className="text-uppercase mb-0">My Recent Reviews</h2>
            <I18nLink href="/customer/account/review">
              <Button variant="primary" className="text-uppercase flex-none">
                View All
              </Button>
            </I18nLink>
          </header>
          <Row className="acc-recentreview-list">
            {customerRecentReviewsData.map((item) => (
              <Col sm={6} className="acc-item" key={Math.random()}>
                <article>
                  <a
                    role="button"
                    onKeyPress={() => false}
                    tabIndex={0}
                    onClick={() => viewReviewDetails(item.review_id)}
                    className="text-primary font-weight-500 mb-1 d-block cursor-pointer"
                  >
                    {item.product_name}
                  </a>
                  <div className="d-flex align-items-center">
                    <span className="d-block mr-2">Rating: </span>
                    <Rating
                      readonly
                      className="rating d-block"
                      fractions={2}
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
                </article>
              </Col>
            ))}
          </Row>
        </section>
      ) : null}
    </>
  );
};

export default RecentReview;
