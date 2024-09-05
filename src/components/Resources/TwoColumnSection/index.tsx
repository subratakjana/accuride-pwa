import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const Twocolsection = (props) => {
  const { dataImage, dataTitle, dataDesc, dataPop, dataBtnLabel } = props;
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  const [showvideo, setShowVideo] = useState(false);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const handleCloseVideo = () => setShowVideo(false);
  const handleShowVideo = () => setShowVideo(true);

  return (
    <>
      <section
        id={`${props.customId}`}
        className={`acc-about-two-col-outer ${props.customStyle} ${
          windowObj && windowSize.width > 991
            ? "bg-primary section-margin acc-about-slide-two-col-sec"
            : "section-padding"
        }`}
      >
        <Container fluid className="p-lg-0">
          <Row className="align-items-center">
            <Col lg={6} className="image-sec">
              {dataImage ? (
                <spna className="imgWraper p-4">
                  <NextImage
                    src={dataImage.url}
                    alt={dataTitle}
                    layout="fill"
                    objectFit={`${
                      windowObj && windowSize.width <= 991 ? "contain" : ""
                    }`}
                    objectPosition="center"
                  />
                </spna>
              ) : (
                ""
              )}
            </Col>
            <Col lg={6}>
              <article className="text-center content-sec text-lg-left p-3 p-xl-5">
                <h1
                  className={`m-0 pb-3 pt-3 pt-lg-0 ${
                    windowObj && windowSize.width > 991 ? "text-white" : ""
                  }`}
                >
                  {dataTitle}
                </h1>
                <HTMLContent content={dataDesc} />
                {dataPop ? (
                  <Button
                    onClick={handleShowVideo}
                    className="btn btn-secondary"
                  >
                    {dataBtnLabel}
                  </Button>
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
              src={dataPop}
              title={dataBtnLabel}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Modal.Body>
        </Modal>
      </section>
    </>
  );
};

export default Twocolsection;
