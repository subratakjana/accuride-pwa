import { useContext } from "react";
import { Accordion, Card, Col, Row } from "react-bootstrap";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const FaqAccordionModel = (props) => {
  const faqaccordion = props.data;
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
          id={children
            .toLowerCase()
            .replace(" ", "-")
            .replace(" policy ", "-policy")
            .replace("(ccpa)", "")}
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
      <Accordion
        defaultActiveKey="0"
        className="acc-quest-ans-custom-accordion"
      >
        {faqaccordion
          ? faqaccordion.map((rows, index) => (
              <Card key={`${rows.id}_accordian`} className="mb-4">
                <Card.Header className="p-0">
                  <ContextAwareToggle eventKey={index === 0 ? "0" : `${index}`}>
                    {rows.question}
                  </ContextAwareToggle>
                </Card.Header>
                <Accordion.Collapse
                  eventKey={index === 0 ? "0" : `${index}`}
                  className="bg-light acc-quest-card-content p-lg-5 p-3"
                >
                  <Row className="align-items-center">
                    <Col>
                      {rows.answer ? (
                        <HTMLContent
                          className="m-0"
                          content={rows.answer.html}
                        />
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                </Accordion.Collapse>
              </Card>
            ))
          : ""}
      </Accordion>
    </>
  );
};
export default FaqAccordionModel;
