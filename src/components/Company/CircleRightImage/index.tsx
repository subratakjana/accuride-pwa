import { useState, useEffect } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";

const CircleRightImage = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      {props.data ? (
        <section
          className={`section-padding acc-about-content ${props.customStyle}`}
        >
          <Container>
            <Row className="align-items-center">
              <Col lg={6} sm={12} className="order-first pb-3 pb-lg-0">
                <div className="embed-responsive embed-responsive-16by9">
                  <NextImage
                    src={props.data.bannerImage.url}
                    alt={props.data.bannerImage.url}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    className="mx-auto"
                  />
                </div>
              </Col>
              <Col lg={6} sm={12} className="order-last">
                <article className="text-center text-lg-left">
                  <h1 className="m-0 pb-3">{props.data.bannerTitle}</h1>
                  <p className="m-0 pb-3">
                    {props.data.bannerDescription.text}
                  </p>
                  {props.data.bannerButtonLabel ? (
                    <I18nLink href={props.data.bannerButtonLink}>
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

export default CircleRightImage;
