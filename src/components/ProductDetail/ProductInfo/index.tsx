import { AuthContext } from '@Contexts/AuthContext';
import GET_PRODUCT_ATTACHMENTS_PRODUCT_ID from '@Graphql/queries/getProductAttachmentsByProductId.graphql';
import useWindowDimensions from '@Hooks/windowDimention';
import { useQuery } from 'graphql-hooks';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { Accordion, Button, Card, Container, Nav, Tab } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import styles from './ProductInfo.module.scss';
import { LoadingIndicator } from '@Components/Utilities';

const ProductSpecification = dynamic(
  () => import('@Components/ProductDetail/ProductInfo/ProductSpecification')
);
const ProductFeature = dynamic(
  () => import('@Components/ProductDetail/ProductInfo/ProductFeature')
);
const ProductApplication = dynamic(
  () => import('@Components/ProductDetail/ProductInfo/ProductApplication')
);
const ProductDownload = dynamic(
  () => import('@Components/ProductDetail/ProductInfo/ProductDownload')
);
const ProductInfo = (props) => {
  const router = useRouter();
  const { decode } = useContext(AuthContext);
  const { setLoadReview, otherInformation } = props;
  const [accordion, setState] = useState({ activeKey: 4 });

  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [isYotpoLoaded, setIsYotpoLoaded] = useState(true);

  useEffect(() => {
    try {
      if (window && window.yotpo) {
        setIsYotpoLoaded(true);
        setLoadReview(true);
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    const checkYotpo = () => {
      if (window && window.yotpo) {
        setIsYotpoLoaded(true);
        try {
          window.yotpo.initWidgets();
        } catch (error) {
          window.yotpo.refreshWidgets();
          console.error('Yotpo widget error:', error);
        }
      } else {
        setIsYotpoLoaded(false);
      }
    };

    if (!window.yotpo) {
      setTimeout(checkYotpo, 300);
    } else {
      checkYotpo();
    }
  }, []);

  const yotpoReviewClickedEvent = () => {
    if (window && window.yotpo) {
      window.yotpo.initWidgets();
    }
  };
  /** accordian expanded state handling */
  const accordianClickedEvent = (index) => {
    if (accordion.activeKey !== index) {
      setState({
        ...accordion,
        activeKey: index,
      });
    } else {
      setState({
        ...accordion,
        activeKey: false,
      });
    }
  };

  const { loading, data } = useQuery(
    GET_PRODUCT_ATTACHMENTS_PRODUCT_ID.loc.source.body,
    {
      variables: {
        productId: decode(otherInformation.uid),
      },
    }
  );
  // if (loading) return null;

  return (
    <section className="section-padding pt-0">
      {/* accordion for mobile and table start */}
      {windowObj && windowSize.width <= 1024 ? (
        <Accordion
          className="acc-custom-accordion"
          defaultActiveKey={accordion.activeKey}
        >
          {/* specifications start */}
          {otherInformation.specifications !== null ||
          otherInformation.available_exit_link === 1 ? (
            <Card>
              <Card.Header className="p-0 border-bottom border-medium">
                <Accordion.Toggle
                  onClick={() => accordianClickedEvent('0')}
                  className={`pe-0 text-left bg-white ${
                    accordion.activeKey === '0'
                      ? 'text-primary acc-arrow-transform'
                      : 'text-dark'
                  }`}
                  as={Button}
                  block
                  variant="link"
                  eventKey="0"
                >
                  Specifications
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body className="bg-light acc-cms-content">
                  {otherInformation.available_exit_link !== 1 ? (
                    <ProductSpecification
                      specification={otherInformation.specifications}
                    />
                  ) : (
                    <ProductSpecification
                      specification={otherInformation.tech_specification}
                    />
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : (
            ''
          )}
          {/* specifications end */}

          {/* product features start */}
          {otherInformation.product_features !== null &&
          otherInformation.available_exit_link !== 1 ? (
            <Card>
              <Card.Header className="p-0 border-bottom border-medium">
                <Accordion.Toggle
                  onClick={() => accordianClickedEvent(1)}
                  className={`pe-0 text-left bg-white ${
                    accordion.activeKey === 1
                      ? 'text-primary acc-arrow-transform'
                      : 'text-dark'
                  }`}
                  as={Button}
                  block
                  variant="link"
                  eventKey={1}
                >
                  Product Features
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={1}>
                <Card.Body className="bg-light acc-cms-content">
                  <ProductFeature feature={otherInformation.product_features} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : (
            ''
          )}
          {/* product features end */}

          {/* application start */}
          {otherInformation.applications !== null &&
          otherInformation.available_exit_link !== 1 ? (
            <Card>
              <Card.Header className="p-0 border-bottom border-medium">
                <Accordion.Toggle
                  onClick={() => accordianClickedEvent(2)}
                  className={`pe-0 text-left bg-white ${
                    accordion.activeKey === 2
                      ? 'text-primary acc-arrow-transform'
                      : 'text-dark'
                  }`}
                  as={Button}
                  block
                  variant="link"
                  eventKey={2}
                >
                  Applications
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={2}>
                <Card.Body className="bg-light">
                  <ProductApplication
                    application={otherInformation.applications}
                  />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : (
            ''
          )}
          {/* application end */}

          {/* downloads start */}
          {data &&
          data.productAttachment.length > 0 &&
          otherInformation.available_exit_link !== 1 ? (
            <Card>
              <Card.Header className="p-0 border-bottom border-medium">
                <Accordion.Toggle
                  name="downloadBtn"
                  onClick={() => accordianClickedEvent(3)}
                  className={`pe-0 text-left bg-white ${
                    accordion.activeKey === 3
                      ? 'text-primary acc-arrow-transform'
                      : 'text-dark'
                  }`}
                  as={Button}
                  block
                  variant="link"
                  eventKey={3}
                >
                  Downloads
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse name="downloadPanel" eventKey={3}>
                <Card.Body className="bg-light">
                  <ProductDownload downloads={data.productAttachment} />
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : (
            ''
          )}
          {/* downloads end */}

          {/* reviews start */}
          {otherInformation.available_exit_link !== 1 ? (
            <Card>
              <Card.Header
                className="p-0 border-bottom border-medium"
                onClick={() => yotpoReviewClickedEvent()}
              >
                <Accordion.Toggle
                  name="reviewBtnRes"
                  onClick={() => accordianClickedEvent(4)}
                  className={`pe-0 text-left bg-white ${
                    accordion.activeKey === 4
                      ? 'text-primary acc-arrow-transform'
                      : 'text-dark'
                  }`}
                  as={Button}
                  block
                  variant="link"
                  eventKey={4}
                >
                  Reviews
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse name="reviewPanelRes" eventKey={4}>
                <Card.Body className="bg-light">
                  {isYotpoLoaded ? (
                    <>
                      <p className="d-block m-0">You&#39;re reviewing:</p>
                      <p className="font-weight-bold mb-md-4">
                        {otherInformation.name}
                      </p>
                      <div
                        className="yotpo yotpo-main-widget"
                        data-product-id={decode(otherInformation.uid)}
                        data-price={
                          otherInformation.product_price_range.minimum_price
                            .final_price.value
                        }
                        data-currency={
                          otherInformation.product_price_range.minimum_price
                            .final_price.currency
                        }
                        data-name={otherInformation.name}
                        data-url={`${process.env.NEXT_PUBLIC_BASE_PATH}${router.asPath}`}
                        data-image-url={otherInformation.image.gallery_url}
                      />
                    </>
                  ) : (
                    <div className="d-flex acc_not_found_review">
                      <ReactSVG
                        src="/assets/images/icons/not_found.svg"
                        className="text-primary mr-3 flex-shrink-0 acc-reviews-not-found-icon-mobile"
                      />
                      <p className="text-muted h5 mb-0">
                        We're having trouble loading reviews right now. Please
                        check back shortly.
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ) : null}
          {/* reviews end */}
        </Accordion>
      ) : (
        <>
          {/* accordion for mobile and table end */}
          <Tab.Container
            defaultActiveKey={
              otherInformation.specifications !== null
                ? 'specification'
                : otherInformation.product_features !== null
                ? 'feature'
                : otherInformation.applications !== null
                ? 'application'
                : data && data.productAttachment.length > 0
                ? 'download'
                : 'review'
            }
          >
            {/* tab navigation start */}
            <Container>
              <Nav className="acc-customtab-menu d-flex justify-content-between border-top border-medium pt-4">
                {otherInformation.specifications !== null ||
                otherInformation.available_exit_link === 1 ? (
                  <Nav.Item>
                    <Nav.Link eventKey="specification">Specifications</Nav.Link>
                  </Nav.Item>
                ) : null}
                {otherInformation.product_features !== null &&
                otherInformation.available_exit_link !== 1 ? (
                  <Nav.Item>
                    <Nav.Link eventKey="feature">Product Features</Nav.Link>
                  </Nav.Item>
                ) : null}
                {otherInformation.applications !== null &&
                otherInformation.available_exit_link !== 1 ? (
                  <Nav.Item>
                    <Nav.Link eventKey="application">Applications</Nav.Link>
                  </Nav.Item>
                ) : null}
                {data &&
                data.productAttachment.length > 0 &&
                otherInformation.available_exit_link !== 1 ? (
                  <Nav.Item>
                    <Nav.Link name="downloadBtn" eventKey="download">
                      Downloads
                    </Nav.Link>
                  </Nav.Item>
                ) : null}
                {/* {otherInformation.available_exit_link !== 1 ? (
                  <Nav.Item onClick={() => yotpoReviewClickedEvent()}>
                    <Nav.Link name="reviewBtn" eventKey="review">
                      Reviews
                    </Nav.Link>
                  </Nav.Item>
                ) : null} */}
                <Nav.Item onClick={() => yotpoReviewClickedEvent()}>
                  <Nav.Link name="reviewBtn" eventKey="review">
                    Reviews
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Container>
            {/* tab navigation end */}

            {/* tab content start */}
            <Tab.Content>
              {/* specifications start */}
              {otherInformation.specifications !== null ||
              otherInformation.available_exit_link === 1 ? (
                <Tab.Pane
                  eventKey="specification"
                  className="bg-light acc-cms-content section-padding"
                >
                  <Container>
                    <section className="px-3">
                      {otherInformation.available_exit_link !== 1 ? (
                        <ProductSpecification
                          specification={otherInformation.specifications}
                        />
                      ) : (
                        <ProductSpecification
                          specification={otherInformation.tech_specification}
                        />
                      )}
                    </section>
                  </Container>
                </Tab.Pane>
              ) : (
                ''
              )}
              {/* specifications end */}

              {/* product features start */}
              {otherInformation.product_features !== null ? (
                <Tab.Pane
                  eventKey="feature"
                  className="bg-light acc-cms-content section-padding"
                >
                  <Container>
                    <section className="px-3">
                      <ProductFeature
                        feature={otherInformation.product_features}
                      />
                    </section>
                  </Container>
                </Tab.Pane>
              ) : (
                ''
              )}
              {/* product features end */}

              {/* application start */}
              {otherInformation.applications !== null ? (
                <Tab.Pane
                  eventKey="application"
                  className="bg-light section-padding"
                >
                  <Container>
                    <section className="px-3">
                      <ProductApplication
                        application={otherInformation.applications}
                      />
                    </section>
                  </Container>
                </Tab.Pane>
              ) : (
                ''
              )}
              {/* application end */}

              {/* downloads start */}
              {data && data.productAttachment.length > 0 ? (
                <Tab.Pane
                  name="downloadPanel"
                  eventKey="download"
                  className="bg-light section-padding"
                >
                  <Container>
                    <section className="px-3">
                      <ProductDownload downloads={data.productAttachment} />
                    </section>
                  </Container>
                </Tab.Pane>
              ) : (
                ''
              )}
              {/* downloads end */}

              {/* reviews start */}
              <Tab.Pane
                name="reviewPanel"
                eventKey="review"
                className={`bg-light section-padding ${styles.reviewTab}`}
              >
                <Container>
                  <section className="px-3">
                    {/* <ProductReview
                                                productId={decode(otherInformation.uid)}
                                                productName={otherInformation.name}
                                            /> */}
                    {isYotpoLoaded ? (
                      <>
                        <p className="d-block m-0">You&#39;re reviewing:</p>
                        <p className="font-weight-bold">
                          {otherInformation.name}
                        </p>
                        <div
                          className="yotpo yotpo-main-widget"
                          data-product-id={decode(otherInformation.uid)}
                          data-price={
                            otherInformation.product_price_range.minimum_price
                              .final_price.value
                          }
                          data-currency={
                            otherInformation.product_price_range.minimum_price
                              .final_price.currency
                          }
                          data-name={otherInformation.name}
                          data-url={`${process.env.NEXT_PUBLIC_BASE_PATH}${router.asPath}`}
                          data-image-url={otherInformation.image.gallery_url}
                        />
                      </>
                    ) : (
                      <div className="d-flex flex-column acc_not_found_review text-center">
                        <ReactSVG
                          src="/assets/images/icons/not_found.svg"
                          className="text-primary mx-auto mb-3 mb-md-4 acc-reviews-not-found-icon"
                        />
                        <p className="text-muted h5 mb-0">
                          We're having trouble loading reviews right now. Please
                          check back shortly.
                        </p>
                      </div>
                    )}
                  </section>
                </Container>
              </Tab.Pane>
              {/* reviews end */}
            </Tab.Content>
            {/* tab content end */}
          </Tab.Container>
          {/* tab for desktop end */}
        </>
      )}
      {loading && <LoadingIndicator />}
    </section>
  );
};

export default ProductInfo;
