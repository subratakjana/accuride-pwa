import { Row, Col } from "react-bootstrap";
import { PriceTag } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { useEffect, useState } from "react";

const OrderInformation = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <section className="section-padding pb-0">
      <header
        className={`mb-3 pb-xl-2 border-medium ${
          windowObj && windowSize.width > 1024 ? "border-bottom" : ""
        }`}
      >
        <h2 className="mb-0 text-uppercase">Order Information</h2>
      </header>
      <Row className="acc-order-info-list">
        {/* shipping address start */}
        <Col sm={6} md={3} className="acc-item pb-sm-3 pb-md-0">
          <article>
            <header className="mb-2">
              <h5 className="font-weight-700 text-dark mb-2">
                Shipping Address
              </h5>
            </header>
            <address className="mb-0">
              <span className="d-block">
                {props.shippingDetail && props.shippingDetail[0].name}
              </span>
              <span className="d-block">
                {props.shippingDetail && props.shippingDetail[0].street}
              </span>
              <span className="d-block">
                {props.shippingDetail && props.shippingDetail[0].city}
              </span>
              <span className="d-block">
                {props.shippingDetail && props.shippingDetail[0].postcode}
              </span>
              <span className="d-block">
                {props.shippingDetail && props.shippingDetail[0].country}
              </span>
              <span className="d-block mt-2">
                T:
                <strong className="text-primary font-weight-500">
                  {props.shippingDetail && props.shippingDetail[0].telephone}
                </strong>
              </span>
            </address>
          </article>
        </Col>
        {/* shipping address end */}

        {/* shipping method start */}
        <Col sm={6} md={3} className="acc-item pb-sm-3 pb-md-0">
          <article>
            <header className="mb-2">
              <h5 className="font-weight-700 text-dark mb-2">
                Shipping Method
              </h5>
            </header>
            <span className="d-block">{props.shippingMethod}</span>
          </article>
        </Col>
        {/* shipping method end */}

        {/* billing address start */}
        <Col sm={6} md={3} className="acc-item">
          <article>
            <header className="mb-2">
              <h5 className="font-weight-700 text-dark mb-2">
                Billing Address
              </h5>
            </header>
            <address className="mb-0">
              <span className="d-block">
                {props.billingDetail && props.billingDetail[0].name}
              </span>
              <span className="d-block">
                {props.billingDetail && props.billingDetail[0].street}
              </span>
              <span className="d-block">
                {props.billingDetail && props.billingDetail[0].city}
              </span>
              <span className="d-block">
                {props.billingDetail && props.billingDetail[0].postcode}
              </span>
              <span className="d-block">
                {props.billingDetail && props.billingDetail[0].country}
              </span>
              <span className="d-block mt-2">
                T:
                <strong className="text-primary font-weight-500">
                  {props.billingDetail && props.billingDetail[0].telephone}
                </strong>
              </span>
            </address>
          </article>
        </Col>
        {/* billing address end */}

        {/* payment method start */}
        <Col sm={6} md={3} className="acc-item">
          <article>
            <header className="mb-2">
              <h5 className="font-weight-700 text-dark mb-2">Payment Method</h5>
            </header>
            <span className="d-block">{props.paymentMethod}</span>
            {props.paymentMethod === "Credit/Debit Card" ||
            props.paymentMethod ===
              "Credit/Debit Card (ParadoxLabs CyberSource)" ? (
              <>
                <span className="d-block">
                  Credit Card Type:
                  <strong className="pl-1">
                    {props.cardDetail[0].cc_type}
                  </strong>
                </span>
                <span className="d-block">
                  Credit Card Number:
                  <strong className="pl-1">
                    {props.cardDetail[0].cc_card_number}
                  </strong>
                </span>
                <span className="d-block">
                  Processed Amount:
                  <strong className="pl-1">
                    <PriceTag
                      className="d-inline-block"
                      currency={props.currency}
                      value={Number(props.cardDetail[0].processed_amount)}
                    />
                  </strong>
                </span>
              </>
            ) : (
              ""
            )}
          </article>
        </Col>
        {/* payment method end */}
      </Row>
    </section>
  );
};

export default OrderInformation;
