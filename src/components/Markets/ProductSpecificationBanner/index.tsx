import { useEffect, useState } from "react";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ProductSpecificationBanner = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      {props.data ? (
        <Row className={`align-items-center ${props.customStyle}`}>
          <Col lg={6} sm={12} className="left-with-image">
            <div className="d-flex justify-content-center">
              <NextImage
                src={props.data.bannerImage.url}
                alr={props.data.bannerImage.url}
                objectFit="contain"
                objectPosition="center"
                className="pb-3 pb-lg-0 mx-auto"
                width={515}
                height={187}
              />
            </div>
          </Col>
          <Col lg={6} sm={12} className="right-with-text">
            <article className="pl-lg-4 text-center">
              <h1 className="m-0 pb-3">{props.data.bannerTitle}</h1>
              <HTMLContent
                className="m-0 pb-3"
                content={props.data.bannerDescription.html}
              />
              {props.data.bannerButtonLink ? (
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
                [
                  props.data.bannerVideoUrl ? (
                    <Button
                      key="psb_btn"
                      onClick={handleShow}
                      onKeyDown={handleShow}
                      variant="primary"
                      className={`text-uppercase border border-medium ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {props.data.bannerButtonLabel}
                    </Button>
                  ) : (
                    ""
                  ),
                ]
              )}
            </article>
            <Modal
              size="md"
              show={show}
              onHide={handleClose}
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
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  );
};

export default ProductSpecificationBanner;
