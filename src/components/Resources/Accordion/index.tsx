import { useState, useContext } from "react";
import { Accordion, Card, Col, Row, Modal } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import NextImage from "next/legacy/image";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { AiOutlineYoutube } from "react-icons/ai";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);

const AccordionModel = (props) => {
  const accordionContnt = props.data;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow({
      show: true,
      videoLink: e.videoLink,
      title: e.title,
    });
  };
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <>
        <Accordion.Toggle
          onClick={decoratedOnClick}
          as={Card.Header}
          id={children.toLowerCase().replace(" ", "-")}
          variant="link"
          className="p-0 position-relative"
        >
          <h4 className="m-0 pr-5 text-uppercase">{children}</h4>
          {isCurrentEventKey ? (
            <BsChevronUp className="position-absolute top right acc-accordian-arrow" />
          ) : (
            <BsChevronDown className="position-absolute top right acc-accordian-arrow" />
          )}
        </Accordion.Toggle>
      </>
    );
  };
  return (
    <>
      <Accordion defaultActiveKey="0" className="acc-cms-custom-accordion">
        {accordionContnt
          ? accordionContnt.map((rows, index) => (
              <Card key={`${rows.id}_accordian`} className="mb-4">
                <Card.Header className="p-0">
                  <ContextAwareToggle eventKey={index === 0 ? "0" : `${index}`}>
                    {rows.title}
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse
                  eventKey={index === 0 ? "0" : `${index}`}
                  className="bg-light acc-card-content p-lg-5 p-3"
                >
                  {rows.image ? (
                    <Row className="align-items-center">
                      <Col lg={4} className="pb-3 pb-lg-0">
                        <div className="position-relative">
                          <div>
                            <NextImage
                              src={rows.image.url}
                              alt={rows.title}
                              width={398}
                              height={300}
                              objectFit="contain"
                              objectPosition="center"
                              className="mx-auto"
                            />
                          </div>
                          {rows.videoLink ? (
                            <div
                              className="acc-video-accordian-image"
                              role="button"
                              tabIndex={0}
                              onClick={() => handleShow(rows)}
                              onKeyDown={() => handleShow(rows)}
                            >
                              <AiOutlineYoutube className="text-white position-absolute acc-video-accordian-play-icon" />
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                      <Col lg={8}>
                        {rows.description ? (
                          <HTMLContent
                            className="m-0"
                            content={rows.description.html}
                          />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                  ) : (
                    <Col lg={12}>
                      {rows.description ? (
                        <HTMLContent
                          className="m-0"
                          content={rows.description.html}
                        />
                      ) : (
                        ""
                      )}
                    </Col>
                  )}
                </Accordion.Collapse>
              </Card>
            ))
          : ""}
      </Accordion>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        className="acc-custom-modal"
      >
        <Modal.Body className="text-center">
          <iframe
            width="100%"
            height="400"
            src={show.videoLink}
            title={show.title}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AccordionModel;
