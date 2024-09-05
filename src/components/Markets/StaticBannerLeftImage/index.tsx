import { useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import NextImage from "next/legacy/image";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import { ReactSVG } from "react-svg";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const StaticBannerLeftImage = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      {props.data ? (
        <section
          className={`section-padding text-center text-lg-left ${props.customStyle}`}
        >
          <Container>
            <Row className="align-items-center">
              <Col lg={6}>
                <div className="acc-left-image-width-height">
                  {props.data.bannerImage.fileName ? (
                    props.data.bannerImage.fileName.split(".").pop() ===
                    "svg" ? (
                      <ReactSVG
                        src={props.data.bannerImage.url}
                        className="acc-svg-image"
                      />
                    ) : (
                      <NextImage
                        src={props.data.bannerImage.url}
                        alt={props.data.bannerImage.url}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                      />
                    )
                  ) : (
                    <ReactSVG
                      src={props.data.bannerImage.url}
                      className="acc-svg-image"
                    />
                  )}
                </div>
              </Col>
              <Col lg={6}>
                <article className="pt-lg-0 pt-3">
                  <h1 className="m-0 pb-3">{props.data.bannerTitle}</h1>
                  <HTMLContent
                    className="m-0 pb-3"
                    content={props.data.bannerDescription.html}
                  />
                  {props.data.bannerButtonLabel ? (
                    <I18nLink href={props.data.bannerButtonLink}>
                      <Button
                        variant="primary"
                        className={`text-uppercase ${
                          windowObj && windowSize.width <= 991
                            ? "btn-block"
                            : ""
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

export default StaticBannerLeftImage;
