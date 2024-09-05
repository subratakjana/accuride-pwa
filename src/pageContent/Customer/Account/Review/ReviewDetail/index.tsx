import { Container, Row, Col, Button } from "react-bootstrap";
import { I18nLink, LoadingIndicator } from "@Components/Utilities";
import { ReactSVG } from "react-svg";
import Rating from "react-rating";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import { useManualQuery } from "graphql-hooks";
import { useEffect, useContext, useState } from "react";
import GET_CUSTOMER_REVIEW_DETAILS from "@Graphql/queries/getCustomerReviewDetails.graphql";
import Head from "next/head";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ReviewDetail = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  let reviewDetail = "";
  const { token, isAuthUser } = useContext(AuthContext);
  useEffect(() => {
    isAuthUser();
    if (windowSize.width !== 0) updateWindowObj(true);
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

  const router = useRouter();
  const reviewId = Number(router.query.id);
  // API call to get the customer review details
  const [getCustomerReviewDetails, { loading, data }] = useManualQuery(
    GET_CUSTOMER_REVIEW_DETAILS.loc.source.body,
    {
      fetchPolicy: "no-cache",
      variables: {
        id: reviewId,
      },
    },
  );
  useEffect(() => {
    getCustomerReviewDetails();
  }, [reviewId]);
  if (data) reviewDetail = data.reviewDetails;
  if (loading || !token || reviewDetail === "") return <LoadingIndicator />;

  return (
    <>
      <Head>
        <title>Review Details</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
      </Head>
      <Container className="section-padding pt-0 acc-review-detail">
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
              <h1 className="text-uppercase mb-0">Review Details</h1>
            </header>

            {/* review overview start */}
            <section className="acc-review-overview mb-5">
              <Row>
                <Col md={4}>
                  <I18nLink
                    href={`/products/${reviewDetail.product_url_key}`}
                    isMagentoRoute={1}
                  >
                    <LazyLoadImage
                      src={reviewDetail.product_image}
                      alt=""
                      className="acc-img"
                    />
                  </I18nLink>
                </Col>
                <Col md={8}>
                  <h5>
                    <I18nLink
                      href={`/products/${reviewDetail.product_url_key}`}
                      isMagentoRoute={1}
                    >
                      {reviewDetail.product_name}
                    </I18nLink>
                  </h5>
                  <div className="d-sm-flex align-items-center justify-content-between mb-3">
                    {/* review start */}
                    <Rating
                      readonly
                      className="rating d-block"
                      initialRating={reviewDetail.avg_rating}
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
                    {/* review end */}

                    {/* review button start */}
                    <div className="d-flex justify-content-between align-items-center mt-2 mt-sm-0">
                      <Button
                        variant="secondary"
                        className="text-uppercase"
                        size="sm"
                      >{`${reviewDetail.approved_review_count} Reviews`}</Button>
                      <I18nLink
                        href={`/products/${reviewDetail.product_url_key}`}
                        isMagentoRoute={1}
                      >
                        <Button
                          variant="primary"
                          className="text-uppercase ml-2"
                          size="sm"
                        >
                          Add your Review
                        </Button>
                      </I18nLink>
                    </div>
                    {/* review button end */}
                  </div>

                  <div className="acc-cms-content">
                    <HTMLContent
                      id="productDesc"
                      content={reviewDetail.product_description}
                    />
                  </div>
                </Col>
              </Row>
            </section>
            {/* review overview end */}

            <section>
              <header
                className={`mb-3 pb-2 border-medium ${
                  windowObj && windowSize.width > 1024 ? "border-bottom" : ""
                }`}
              >
                <h2 className="mb-0 text-uppercase">Your Review</h2>
              </header>
              <Row>
                <Col>
                  <article className="bg-light p-3">
                    {/* review */}
                    <Row>
                      <Col xs={2}>
                        <span>Price</span>
                      </Col>
                      <Col xs={10}>
                        <Rating
                          readonly
                          className="rating d-block"
                          initialRating={Math.round(reviewDetail.rating.price)}
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
                      </Col>
                      <Col xs={2}>
                        <span>Quality</span>
                      </Col>
                      <Col xs={10}>
                        <Rating
                          readonly
                          className="rating d-block"
                          initialRating={Math.round(
                            reviewDetail.rating.quality,
                          )}
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
                      </Col>
                      <Col xs={2}>
                        <span>Value</span>
                      </Col>
                      <Col xs={10}>
                        <Rating
                          readonly
                          className="rating d-block"
                          initialRating={Math.round(reviewDetail.rating.value)}
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
                      </Col>
                    </Row>
                    <div className="mt-3">
                      <h4>{reviewDetail.review_title}</h4>
                      <span className="d-block mb-3">
                        {reviewDetail.review_detail}
                      </span>
                      <span className="d-block text-medium">{`Submitted on ${reviewDetail.submitted}`}</span>
                    </div>
                  </article>
                </Col>
              </Row>
            </section>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      <EmailSubscription />
    </>
  );
};

export default ReviewDetail;
