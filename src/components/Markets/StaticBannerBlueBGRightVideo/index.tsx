import { useEffect, useState } from "react";
import { Button, Row, Col, Container, Modal } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import { AiFillYoutube } from "react-icons/ai";
import dynamic from "next/dynamic";
import styled from "styled-components";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const StyledCol = styled(Col)((props) => ({
  ...props.customStyles
}))

const StaticBannerBlueBGRightImage = (props) => {
  const windowSize = props.winSize;
  const [showvideo, setShowVideo] = useState(false);
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const colBgImage = {
    backgroundImage: `url(${props.data.bannerImage.url})`,
  };
  const handleCloseVideo = () => setShowVideo(false);
  const handleShowVideo = () => setShowVideo(true);
  return (
    <>
      {props.data ? (
        <section
          id={`${props.customId}`}
          className={`section-padding acc-market-static-banner2 ${props.customStyle}`}
        >
          <Container fluid>
            <Row className="align-items-center">
              <StyledCol
                name={`bgvideo_${props.customId}`}
                role="button"
                tabIndex={0}
                onClick={handleShowVideo}
                onKeyDown={handleShowVideo}
                lg={6}
                sm={12}
                customStyles={colBgImage}
                className={`acc-custom-bg-image ${
                  windowObj && windowSize.width >= 991 ? "order-last" : ""
                }`}
              >
                <AiFillYoutube className="position-absolute" />
              </StyledCol>
              <Col
                lg={6}
                sm={12}
                className={`${
                  windowObj && windowSize.width >= 991 ? "order-first" : ""
                }`}
              >
                <article
                  className={`text-center text-lg-left p-3 p-xl-5 ${
                    windowObj && windowSize.width >= 1024
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
                    class={`m-0 pb-3 ${
                      windowObj && windowSize.width > 991 ? "text-white" : ""
                    }`}
                    content={props.data.bannerDescription.html}
                  />
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
                  {props.data.bannerButton2Label ? (
                    <div>
                      <p> </p>
                      <I18nLink href={props.data.bannerButton2Link}>
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
          <Modal
            size="md"
            show={showvideo}
            onHide={handleCloseVideo}
            className="acc-custom-modal"
          >
            <Modal.Body className="text-center">
              <iframe
                width="100%"
                height="420"
                src={props.data.bannerVideoUrl}
                title={props.data.bannerTitle}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal.Body>
          </Modal>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default StaticBannerBlueBGRightImage;
