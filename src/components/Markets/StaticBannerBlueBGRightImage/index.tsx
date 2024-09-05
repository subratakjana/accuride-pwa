import { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const StaticBannerBlueBGRightImage = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      {props.data ? (
        <section
          className={`section-padding acc-market-static-banner2 ${props.customStyle}`}
        >
          <Container fluid>
            <Row className="align-items-center">
              <Col
                lg={6}
                sm={12}
                className={`acc-custom-bg-image ${
                  windowObj && windowSize.width >= 991 ? "order-last" : ""
                }`}
              >
                <div className="acc-background-image">
                  <NextImage
                    src={props.data.bannerImage.url}
                    alt="Background Image"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </Col>
              <Col
                lg={6}
                sm={12}
                className={`acc-custom-bg-text ${
                  windowObj && windowSize.width >= 991 ? "order-first" : ""
                }`}
              >
                <article
                  className={`text-center text-lg-left px-3 py-3 px-lg-3 px-xxl-5 ${
                    windowObj && windowSize.width >= 1024 ? "float-right" : ""
                  } ${
                    windowObj && windowSize.width >= 1399
                      ? "float-right w-75"
                      : ""
                  }`}
                >
                  <h1
                    className={`m-0 pb-3 ${
                      windowObj && windowSize.width >= 991 ? "text-white" : ""
                    }`}
                  >
                    {props.data.bannerTitle}
                  </h1>
                  <HTMLContent
                    className={`m-0 pb-3 ${
                      windowObj && windowSize.width > 991 ? "text-white" : ""
                    }`}
                    content={props.data.bannerDescription.html}
                  />
                  {props.data.bannerButtonLabel ? (
                    <I18nLink
                      href={props.data.bannerButtonLink}
                      isMagentoRoute={1}
                    >
                      <Button
                        variant="primary"
                        className={`text-uppercase border border-medium ${
                          windowObj && windowSize.width < 575 ? "btn-block" : ""
                        }`}
                      >
                        {props.data.bannerButtonLabel}
                      </Button>
                    </I18nLink>
                  ) : (
                    ""
                  )}
                  {props.data.bannerButton2Label ? (
                    <div className="pt-3">
                      <I18nLink
                        href={props.data.bannerButton2Link}
                        isMagentoRoute={1}
                      >
                        <Button
                          variant="primary"
                          className={`text-uppercase border border-medium ${
                            windowObj && windowSize.width < 575
                              ? "btn-block"
                              : ""
                          }`}
                        >
                          {props.data.bannerButton2Label}
                        </Button>
                      </I18nLink>
                    </div>
                  ) : (
                    ""
                  )}
                </article>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default StaticBannerBlueBGRightImage;
