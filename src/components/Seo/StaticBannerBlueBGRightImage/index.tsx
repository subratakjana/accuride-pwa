import { useEffect, useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import styled from "styled-components";

const StyledCol = styled(Col)(props => (
  {
    ...props.customColBgImage
  }
))

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const StaticBannerBlueBGRightImage = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const colBgImage = {
    backgroundImage: `url(${props.data.bannerImage.url})`,
  };

  return (
    <>
      {props.data ? (
        <section
          className={`section-padding acc-market-static-banner2 ${props.customStyle}`}
        >
          <Container fluid>
            <Row className="align-items-center">
              <StyledCol
                lg={6}
                sm={12}
                customColBgImage={colBgImage}
                className={`acc-custom-bg-image ${
                  windowObj && windowSize.width >= 991 ? "order-last" : ""
                }`}
              />
              <Col
                lg={6}
                sm={12}
                className={`${
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
                  <h3
                    className={`m-0 pb-3 ${
                      windowObj && windowSize.width >= 991 ? "text-white" : ""
                    }`}
                  >
                    {props.data.bannerTitle}
                  </h3>
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
                          windowObj && windowSize.width < 991 ? "btn-block" : ""
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
                            windowObj && windowSize.width < 991
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
