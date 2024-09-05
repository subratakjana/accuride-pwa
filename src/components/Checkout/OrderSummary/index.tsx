import { useContext } from 'react';
import { Row, Col, Badge, Button } from 'react-bootstrap';
import { PriceTag, I18nLink } from '@Components/Utilities';
import { ReactSVG } from 'react-svg';
import { AuthContext } from '@Contexts/AuthContext';

const OrderSummary = (props) => {
  const { priceData } = props;
  const { cartList } = useContext(AuthContext);
  return (
    <>
      <div className="bg-light p-3 acc-order-summary">
        <Row>
          <Col className="d-flex flex-column justify-content-center">
            <span className="d-block mb-2">Estimated Total</span>
            <span className="d-block font-weight-500">
              <PriceTag currency="$" value={priceData.value} />
            </span>
          </Col>
          <Col className="text-right">
            <I18nLink href="/checkout/cart">
              <Button variant="link" className="position-relative p-2">
                <ReactSVG
                  src="/assets/images/icons/cart.svg"
                  className="fill-primary acc-order-summary-cart-icon"
                />
                <Badge
                  variant="secondary"
                  className="position-absolute right"
                  pill
                >
                  {cartList}
                </Badge>
              </Button>
            </I18nLink>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderSummary;
