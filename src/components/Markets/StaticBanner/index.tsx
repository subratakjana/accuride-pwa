import { useEffect, useState } from "react";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";

const StaticBanner = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const handleShow = (e) => {
    const pdfPath = e.target.getAttribute("data-url");
    if (pdfPath !== "" || pdfPath !== "#") {
      setShow(true);
      setPdfUrl(pdfPath);
    }
  };
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  let extension = "";
  const button1Link = props.data.bannerButtonLink;

  if (props.data.bannerButtonLink !== null) {
    extension = button1Link.split(".").pop();
  }

  return (
    <>
      {props.data ? (
        <section className={`section-padding ${props.customStyle}`}>
          <Container fluid>
            <Row className="align-items-center">
              <Col lg={7} className="acc-static-banner-text">
                <article
                  className={`p-0 p-md-5 pb-3 pb-md-0 text-center text-lg-left ${
                    windowObj && windowSize.width > 991 ? "w-75" : ""
                  }`}
                >
                  <h1 className="m-0 pb-3 text-white">
                    {props.data.bannerTitle}
                  </h1>
                  <p className="m-0 pb-3 text-white">
                    {props.data.bannerDescription.text}
                  </p>
                  {props.data.bannerButtonLabel
                    ? [
                        extension === "pdf" ? (
                          <Button
                            key="btn1"
                            data-url={props.data.bannerButtonLink}
                            onClick={handleShow}
                            onKeyDown={handleShow}
                            variant="primary"
                            className={`text-uppercase border border-medium ${
                              windowObj && windowSize.width <= 991
                                ? "btn-block"
                                : "mr-2"
                            }`}
                          >
                            {props.data.bannerButtonLabel}
                          </Button>
                        ) : (
                          <I18nLink
                            key="btn1"
                            href={props.data.bannerButtonLink}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase border border-medium ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : "mr-2"
                              }`}
                            >
                              {props.data.bannerButtonLabel}
                            </Button>
                          </I18nLink>
                        ),
                      ]
                    : ""}
                  {props.data.bannerButton2Label ? (
                    <I18nLink href={props.data.bannerButton2Link}>
                      <Button
                        variant="primary"
                        className={`text-uppercase ml-2 border border-medium ${
                          windowObj && windowSize.width <= 991
                            ? "btn-block"
                            : ""
                        }`}
                      >
                        {props.data.bannerButton2Label}
                      </Button>
                    </I18nLink>
                  ) : (
                    ""
                  )}
                </article>
              </Col>
              <Col lg={4} className="acc-static-banner-image">
                <NextImage
                  src={props.data.bannerImage.url}
                  alt=""
                  layout="intrinsic"
                  objectFit="contain"
                  objectPosition="center"
                  width={397}
                  height={353}
                />
              </Col>
            </Row>
            {extension === "pdf" ? (
              <Modal
                size="md"
                show={show}
                onHide={handleClose}
                className="acc-custom-modal"
              >
                <Modal.Body className="text-center">
                  <iframe
                    width="100%"
                    height="600"
                    src={pdfUrl}
                    title="video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Modal.Body>
              </Modal>
            ) : (
              ""
            )}
          </Container>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default StaticBanner;
