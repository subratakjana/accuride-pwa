import { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "graphql-hooks";
import GET_PRODUCT_REVIEWS_PRODUCT_ID from "@Graphql/queries/getProductReviewsByProductId.graphql";
import ADD_PRODUCT_REVIEW from "@Graphql/queries/postProductReview.graphql";
import Skeleton from "react-loading-skeleton";

import { Row, Form, Col, Button, Alert } from "react-bootstrap";
import Rating from "react-rating";
import { ReactSVG } from "react-svg";
import useWindowDimensions from "@Hooks/windowDimention";
import { AuthContext } from "@Contexts/AuthContext";

const ProductReviewLoading = () => {
  return (
    <div className="acc-review">
      <Skeleton count={0.2} height={16} containerClassName="flex-fill" />
      <Skeleton count={0.4} height={16} containerClassName="flex-fill" />
      <Skeleton count={0.2} height={16} containerClassName="flex-fill" />
      <Row className="mt-5">
        <Col>
          <Skeleton count={0.3} height={16} containerClassName="flex-fill" />
          <div className="d-flex align-items-center">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                width={24}
                height={24}
                circle="true"
                className="mr-2"
              />
            ))}
          </div>
        </Col>
        <Col>
          <Skeleton count={0.3} height={16} containerClassName="flex-fill" />
          <div className="d-flex align-items-center">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                width={24}
                height={24}
                circle="true"
                className="mr-2"
              />
            ))}
          </div>
        </Col>
        <Col>
          <Skeleton count={0.3} height={16} containerClassName="flex-fill" />
          <div className="d-flex align-items-center">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                width={24}
                height={24}
                circle="true"
                className="mr-2"
              />
            ))}
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <Skeleton count={0.3} height={16} containerClassName="flex-fill" />
          <Skeleton count={1} height={40} containerClassName="flex-fill" />
        </Col>
        <Col>
          <Skeleton count={0.3} height={16} containerClassName="flex-fill" />
          <Skeleton count={1} height={40} containerClassName="flex-fill" />
        </Col>
        <Col xs={12} className="mt-4">
          <Skeleton count={0.3} height={16} containerClassName="flex-fill" />
          <Skeleton count={1} height={70} containerClassName="flex-fill" />
        </Col>
      </Row>
    </div>
  );
};

const ProductReview = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { notify } = useContext(AuthContext);
  const [ratingValidated, setRatingValidated] = useState(true);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  // add product review
  const reviewData = {
    productId: props.productId,
    quality: 0,
    price: 0,
    value: 0,
    nickname: "",
    summary: "",
    review: "",
  };
  const [rattings, setRattings] = useState({ quality: 0, price: 0, value: 0 });

  const handleChange = (field, value) => {
    if (field === "quality") {
      reviewData.quality = value;
    }
    if (field === "price") {
      reviewData.price = value;
    }
    if (field === "value") {
      reviewData.value = value;
    }
    setRattings({ ...rattings, [field]: value });
  };

  useEffect(() => {
    if (
      rattings.price !== 0 &&
      rattings.value !== 0 &&
      rattings.quality !== 0
    ) {
      setRatingValidated(true);
    }
  }, [rattings]);

  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [addProductReview] = useMutation(ADD_PRODUCT_REVIEW.loc.source.body);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    if (
      rattings.price === 0 ||
      rattings.value === 0 ||
      rattings.quality === 0
    ) {
      setRatingValidated(false);
    } else {
      setRatingValidated(true);
    }
    event.preventDefault();
    event.stopPropagation();
    setSubmitted(false);
    if (
      form.checkValidity() === true &&
      rattings.price !== 0 &&
      rattings.value !== 0 &&
      rattings.quality !== 0
    ) {
      setSubmitted(true);
      event.preventDefault();
      reviewData.nickname = event.target.nickname.value;
      reviewData.summary = event.target.summary.value;
      reviewData.review = event.target.review.value;
      addProductReview({
        variables: {
          product_id: reviewData.productId,
          rating_price: rattings.price,
          rating_value: rattings.value,
          rating_quality: rattings.quality,
          nickname: reviewData.nickname,
          title: reviewData.summary,
          detail: reviewData.review,
        },
      })
        .then(() => {
          setValidated(false);
          form.reset();
          form.classList.remove("was-validated");
          setSubmitted(true);
          setRattings({ quality: 0, price: 0, value: 0 });
          setTimeout(() => {
            setSubmitted(false);
          }, 3000);
        })
        .catch((error) => {
          const { graphQLErrors, networkError } = error;
          if (graphQLErrors && graphQLErrors.length > 0) {
            const gqlError = graphQLErrors.map((item) => item.message);
            notify(gqlError[0], "error");
          } else if (networkError) {
            notify("Please check your network connection!", "error");
          }
        });
    }
  };

  // get product review(s) if any
  const { loading, data } = useQuery(
    GET_PRODUCT_REVIEWS_PRODUCT_ID.loc.source.body,
    {
      variables: {
        productId: props.productId,
      },
    },
  );

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    if (
      targetObj.required &&
      targetObj.value.trim() === "" &&
      (targetObj.type === "text" || targetObj.type === "textarea")
    ) {
      targetObj.value = "";
    }
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
  };
  if (loading) return <ProductReviewLoading />;
  const reviews = data.productReview;

  return (
    <div className="acc-review">
      {/* available product review(s) start */}
      {reviews !== null ? (
        <>
          {reviews.map((item) => (
            <Row key={`review-${Math.random()}`} className="acc-rating-item">
              <Col xs={12} className="mb-3">
                {item.rating.map((rating) => (
                  <div className="d-flex mb-2" key={rating.rating_code}>
                    <span className="acc-rating-label">
                      {rating.rating_code}
                    </span>
                    <Rating
                      readonly
                      initialRating={Math.round(rating.rating_percent / 20)}
                      className="rating"
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
                ))}
              </Col>
              <Col xs={12} className="acc-review-content">
                <h3>{item.title}</h3>
                <p className="acc-review-meta">
                  {`Posted by ${item.nickname} on ${item.created_at}`}
                </p>
                <p className="acc-description">{item.detail}</p>
              </Col>
            </Row>
          ))}
        </>
      ) : (
        ""
      )}
      {/* available product review(s) end */}

      {/* add new prodcut review(s) start */}
      <Form validated={validated} onSubmit={handleSubmit} noValidate>
        <Form.Row>
          <Form.Group as={Col} xs="12">
            <span className="d-block">You&#39;re reviewing:</span>
            <strong>{props.productName}</strong>
          </Form.Group>
          {/* rating start */}
          <Form.Group as={Col} xs="12" className="mb-0">
            <Form.Label>
              Your Rating
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Row>
              <Form.Group as={Col} md="4">
                <Form.Label className="d-block">Quality</Form.Label>
                <Rating
                  name="quality"
                  className="rating"
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
                  onChange={(rate) => handleChange("quality", rate)}
                  initialRating={rattings.quality ? rattings.quality : 0}
                />
                {ratingValidated === false &&
                windowObj &&
                windowSize.width >= 768 ? (
                  <div className="invalid-feedback d-block">
                    Please select one of each of the ratings above.
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label className="d-block">Price</Form.Label>
                <Rating
                  name="price"
                  className="rating"
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
                  onChange={(rate) => handleChange("price", rate)}
                  initialRating={rattings.price ? rattings.price : 0}
                />
              </Form.Group>
              <Form.Group as={Col} md="4">
                <Form.Label className="d-block">Value</Form.Label>
                <Rating
                  name="value"
                  className="rating"
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
                  onChange={(rate) => handleChange("value", rate)}
                  initialRating={rattings.value ? rattings.value : 0}
                />
                {ratingValidated === false &&
                windowObj &&
                windowSize.width < 768 ? (
                  <div className="invalid-feedback d-block">
                    Please select one of each of the ratings above.
                  </div>
                ) : (
                  ""
                )}
              </Form.Group>
            </Form.Row>
          </Form.Group>
          {/* rating end */}
          {/* other fields start */}
          <Form.Group as={Col} md="6">
            <Form.Label>
              Nickname
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="nickname"
              onBlur={validationFormField}
              onKeyUp={validationFormField}
            />
            <Form.Control.Feedback type="invalid">
              This is a required field.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="6">
            <Form.Label>
              Summary
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              required
              type="text"
              name="summary"
              onBlur={validationFormField}
              onKeyUp={validationFormField}
            />
            <Form.Control.Feedback type="invalid">
              This is a required field.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} xs="12">
            <Form.Label>
              Review
              <span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              required
              as="textarea"
              rows="5"
              name="review"
              onBlur={validationFormField}
              onKeyUp={validationFormField}
            />
            <Form.Control.Feedback type="invalid">
              This is a required field.
            </Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        {/* other fields end */}
        {/* submit button start */}
        <Button
          type="submit"
          variant="primary"
          block={!(windowObj && windowSize.width >= 768)}
          className="text-uppercase"
        >
          Submit Review
        </Button>
        {/* submit button end */}
      </Form>
      {submitted === true ? (
        <Alert variant="success" className="mt-3 mb-0 text-center">
          Thank You for sharing your review.
        </Alert>
      ) : (
        ""
      )}
      {/* add new prodcut review(s) end */}
    </div>
  );
};

export default ProductReview;
