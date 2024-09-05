import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { Styles } from "styled-components/dist/types";

const StyledSection = styled.section<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {customBgImage: Styles<{}>}>((props) => (
  {
    ...props.customBgImage
  }
))

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const StaticBannerBgImage = (props) => {
  const mainBgImage = {
    backgroundImage: `url(${props.bgImage.url})`,
  };
  const { data, winSize, customStyle } = props;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (winSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      {data ? (
        <StyledSection
          className={`section-padding acc-static-banner-bg-image ${customStyle}`}
          customBgImage={mainBgImage}
        >
          <Container>
            <Row className="justify-content-end align align-items-center">
              <Col lg={4}>
                <article className="m-0 text-center">
                  <h3 className="m-0 pb-3 text-white">{data.bannerTitle}</h3>
                  {data.bannerDescription ? (
                    <HTMLContent
                      className="m-0 pb-3 text-white"
                      content={data.bannerDescription.html}
                    />
                  ) : (
                    ""
                  )}
                  {data.bannerButtonLabel
                    ? [
                        data.externalLink === "Yes" ? (
                          <a
                            href={data.bannerButtonLink}
                            className={`text-uppercase border border-medium btn btn-primary text-white ${
                              windowObj && winSize.width < 991
                                ? "btn-block"
                                : ""
                            }`}
                            target="BLANK"
                            rel="noopener noreferrer"
                          >
                            {data.bannerButtonLabel}
                          </a>
                        ) : (
                          <I18nLink
                            href={data.bannerButtonLink}
                            isMagentoRoute={0}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase border border-medium ${
                                windowObj && winSize.width < 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {data.bannerButtonLabel}
                            </Button>
                          </I18nLink>
                        ),
                      ]
                    : ""}
                </article>
              </Col>
            </Row>
          </Container>
        </StyledSection>
      ) : (
        ""
      )}
    </>
  );
};

export default StaticBannerBgImage;
