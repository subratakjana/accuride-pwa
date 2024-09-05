import React, { useContext, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AuthContext } from "@Contexts/AuthContext";
import { PriceTag } from "@Components/Utilities";
import NextImage from "next/legacy/image";

const ShippingOrderSummary = (props) => {
  const { orderList, stopHeader } = props;
  const { cartList } = useContext(AuthContext);
  const [accordion, setState] = useState({ activeKey: "0" });

  const summaryAccordian = (index) => {
    if (accordion.activeKey !== index) {
      setState({
        ...accordion,
        activeKey: index,
      });
    } else {
      setState({
        ...accordion,
        activeKey: false,
      });
    }
  };

  return (
    <Accordion
      className="ship-order-summary acc-custom-accordion"
      defaultActiveKey={accordion.activeKey}
    >
      {!stopHeader ? (
        <header>
          <h2 className="text-uppercase mb-0">Order Summary</h2>
        </header>
      ) : null}
      <Card className="bg-light">
        <Card.Header className="p-0 border-bottom border-medium bg-light">
          <Accordion.Toggle
            onClick={() => summaryAccordian("0")}
            className={`px-0 text-left text-dark font-weight-bold font-size-md bg-none ${
              accordion.activeKey === "0" ? "acc-arrow-transform" : ""
            }`}
            as={Button}
            block
            variant="link"
            eventKey="0"
          >
            {`${cartList} Items in Cart`}
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse className="summary-holder" eventKey="0">
          <>
            {orderList.map((item, indx) => (
              <div
                key={item.id}
                className={`pt-3 ${indx === 0 ? "" : "border-top border-dark"}`}
              >
                <Row className="acc-cart-item">
                  <Col xs={3} className="acc-img pr-0">
                    <NextImage
                      src={item.product.small_image.url}
                      alt={item.product.small_image.label}
                      width={86}
                      height={86}
                      objectFit="contain"
                    />
                  </Col>
                  <Col xs={9} className="acc-title font-size-sm">
                    <span className="font-weight-bold d-block">
                      {item.product.sku}
                    </span>
                    <span className="font-weight-bold d-block mb-1">
                      {item.product.small_image.label}
                    </span>
                    <div>
                      <span className="font-weight-300 mb-1"> Qty: </span>
                      <span>{item.quantity}</span>
                    </div>

                    <div>
                      <PriceTag
                        className="d-inline-block"
                        currency="$"
                        value={item.prices.row_total.value}
                      />
                    </div>

                    {/* For ConfigurableProduct: length start */}
                    {item.configurable_options
                      ? item.configurable_options.map((configure) => (
                          <Row
                            key={configure.option_label}
                            className="d-block mb-1"
                          >
                            <Col xs={12}>
                              <span className="font-weight-500">
                                {`${configure.option_label}:`}
                              </span>
                              {configure.value_label}
                            </Col>
                          </Row>
                        ))
                      : ""}
                    {/* For ConfigurableProduct: length end */}
                  </Col>
                </Row>
              </div>
            ))}
          </>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};

export default ShippingOrderSummary;
