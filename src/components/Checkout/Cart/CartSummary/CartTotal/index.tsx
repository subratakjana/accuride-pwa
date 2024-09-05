import { PriceTag } from "@Components/Utilities";
import { useState, useEffect } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { Accordion, Card, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const CartTotalsSkeletonLoader = () => (
  <table className="default-table my-3 mt-xl-0" width="100%">
    <tbody>
      <tr>
        <td align="left" label>
          <Skeleton height={24} />
        </td>
        <td align="right" label>
          <Skeleton height={24} />
        </td>
      </tr>
      <tr>
        <td align="left" label>
          <Skeleton height={24} />
        </td>
        <td align="right" label>
          <Skeleton height={24} />
        </td>
      </tr>
      <tr>
        <td align="left" label>
          <Skeleton height={24} />
        </td>
        <td align="right" label>
          <Skeleton height={24} />
        </td>
      </tr>
      <tr>
        <td colSpan={2} label>
          <Skeleton height={36} />
        </td>
      </tr>
    </tbody>
  </table>
);

const CartTotal = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [accordion, setState] = useState({ activeKey: "0" });
  const { priceData, shippingTax, globalLoader, cartSummaryLoader } = props;
  const [avatax, setAvatax] = useState();
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  useEffect(() => {
    setAvatax();
  }, [shippingTax]);
  if (shippingTax && shippingTax.total_segments.length > 0) {
    const isTax = shippingTax.total_segments.filter(
      (item) => item.code === "tax",
    );
    if (
      isTax.length > 0 &&
      isTax[0].extension_attributes.tax_grandtotal_details.length > 0
    ) {
      const avataxArr = isTax[0].extension_attributes.tax_grandtotal_details;
      if (!avatax) setAvatax(avataxArr);
    }
  }

  const accordianClickedEvent = (index) => {
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
    <>
      {globalLoader || cartSummaryLoader ? (
        <CartTotalsSkeletonLoader />
      ) : (
        [
          priceData && shippingTax ? (
            <table className="default-table my-3 mt-xl-0" width="100%">
              <tbody>
                <tr>
                  <td align="left">Subtotal</td>
                  <td align="right">
                    <PriceTag
                      currency="$"
                      value={shippingTax.total_segments[0].value}
                    />
                  </td>
                </tr>
                {shippingTax.base_discount_amount !== 0 && (
                  <tr>
                    {priceData.discount ? (
                      <>
                        {priceData.discount.label[0] !== "" ? (
                          <td align="left">{`Discount [${priceData.discount.label[0]}]`}</td>
                        ) : (
                          <td align="left">Discount</td>
                        )}
                        <td align="right">
                          <PriceTag
                            currency="$"
                            value={shippingTax.items[0].base_discount_amount}
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td align="left">Discount</td>
                        <td align="right">
                          -
                          <PriceTag
                            className="d-inline"
                            currency="$"
                            value={shippingTax.items[0].base_discount_amount}
                          />
                        </td>
                      </>
                    )}
                  </tr>
                )}
                {shippingTax.total_segments[2].value !== 0 && (
                  <tr>
                    <td align="left">Shipping</td>
                    <td align="right">
                      <PriceTag
                        className="d-inline"
                        currency="$"
                        value={shippingTax.total_segments[2].value}
                      />
                    </td>
                  </tr>
                )}
                {avatax &&
                avatax.length > 0 &&
                shippingTax.total_segments[2].value !== 0 ? (
                  <tr>
                    <td
                      align="left"
                      colSpan="2"
                      className="border-top border-medium"
                    >
                      {/* accordion start */}
                      <Accordion
                        className="acc-custom-accordion acc-estimationform-accordion mb-0 border-0"
                        defaultActiveKey={accordion.activeKey}
                      >
                        <Card>
                          <Card.Header
                            className={`p-0 ${
                              windowObj && windowSize.width > 1024
                                ? "border-0"
                                : "border-bottom border-medium"
                            }`}
                          >
                            <Accordion.Toggle
                              onClick={() => accordianClickedEvent("0")}
                              className={`pl-0 pr-4 text-left d-flex justify-content-between acc-tax-btn h6 mb-0 ${
                                windowObj && windowSize.width > 1024
                                  ? "bg-transparent"
                                  : "bg-white"
                              } ${
                                accordion.activeKey === "0"
                                  ? "text-primary acc-arrow-transform"
                                  : "text-dark"
                              }`}
                              as={Button}
                              block
                              variant="link"
                              eventKey="0"
                            >
                              Tax
                              <PriceTag
                                currency="$"
                                value={shippingTax.total_segments[3].value}
                              />
                            </Accordion.Toggle>
                          </Card.Header>
                          <Accordion.Collapse eventKey="0">
                            <Card.Body className="bg-light px-xl-0 pt-xl-0 pb-0">
                              <table width="100%">
                                <tbody>
                                  {avatax
                                    ? avatax.map((tax) => (
                                        <tr
                                          key={`${tax.rates[0].title}-${tax.rates[0].percent}`}
                                        >
                                          <td align="left">{`${tax.rates[0].title} (${tax.rates[0].percent}%)`}</td>
                                          <td align="right">
                                            <PriceTag
                                              currency="$"
                                              value={tax.amount}
                                            />
                                          </td>
                                        </tr>
                                      ))
                                    : null}
                                </tbody>
                              </table>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                      {/* accordion end */}
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td align="left">Tax</td>
                      <td align="right">
                        <PriceTag
                          currency="$"
                          value={shippingTax.base_tax_amount}
                        />
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <td align="left" className="font-weight-500">
                    Order Total
                  </td>
                  <td align="right" className="font-weight-500">
                    <PriceTag
                      currency="$"
                      value={shippingTax.total_segments[4].value}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          ) : (
            ""
          ),
        ]
      )}
    </>
  );
};

export default CartTotal;
