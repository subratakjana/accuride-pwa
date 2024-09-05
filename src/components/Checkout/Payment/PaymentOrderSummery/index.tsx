import { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import { PriceTag, I18nLink } from "@Components/Utilities";
import { MdEdit } from "react-icons/md";
import { useManualQuery } from "graphql-hooks";
import { currentExchangeRate } from "@Graphql/queries/getCurrecyExchangeRate.graphql";
import dynamic from "next/dynamic";

const ShippingOrderSummary = dynamic(
  () => import("../../Shipping/ShippingOrderSummary"),
);

const PaymentOrderSummary = (props) => {
  const { notify } = useContext(AuthContext);
  const router = useRouter();
  const { cartInfo } = props;
  const [getExchangeRate, setExchangeRate] = useState(null);

  const [currentExchangeRateFn] = useManualQuery(
    currentExchangeRate.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (res) => {
        const { data } = res;
        const getData = data.currency;
        setExchangeRate(getData.exchange_rates[0].rate);
      },
    },
  );

  useEffect(() => {
    currentExchangeRateFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  }, []);

  const TotalTaxValueFn = (getArr) => {
    let totalAmount = 0;
    if (getArr) {
      getArr.map((item) => {
        totalAmount = Number(totalAmount) + Number(item.amount.value);
        return true;
      });
    }
    return totalAmount;
  };
  return (
    <>
      <header>
        <h2 className="text-uppercase mb-0">Order Summary</h2>
      </header>
      <section className="mt-2 mb-3">
        <div className="d-flex justify-content-between">
          <div>Cart SubTotal</div>
          <div>
            <PriceTag
              className="d-inline-block"
              currency="$"
              value={cartInfo.cart.prices.subtotal_excluding_tax.value}
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div>
            Shipping
            <div>
              {
                cartInfo.cart.shipping_addresses[0].selected_shipping_method
                  .carrier_title
              }
              {" - "}
              {
                cartInfo.cart.shipping_addresses[0].selected_shipping_method
                  .method_title
              }
            </div>
          </div>
          <div>
            <PriceTag
              className="d-inline-block"
              currency="$"
              value={
                cartInfo.cart.shipping_addresses[0].selected_shipping_method
                  .amount.value
              }
            />
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div>Tax</div>
          <div>
            <PriceTag
              className="d-inline-block"
              currency="$"
              value={
                cartInfo.cart.prices.applied_taxes.length > 0
                  ? TotalTaxValueFn(cartInfo.cart.prices.applied_taxes)
                  : 0
              }
            />
          </div>
        </div>
        {cartInfo.cart.prices.discounts ? (
          <div className="d-flex justify-content-between">
            <div>Discount</div>
            <div>
              <PriceTag
                className="d-inline-block"
                currency="$"
                value={`-${cartInfo.cart.prices.discounts[0].amount.value}`}
              />
            </div>
          </div>
        ) : null}
        <hr />
        <div className="d-flex justify-content-between">
          <div className="font-weight-500">Order Total</div>
          <div>
            <PriceTag
              className="d-inline-block"
              currency="$"
              value={cartInfo.cart.prices.grand_total.value}
            />
          </div>
        </div>
        {router.query.zone_lang === "en-ca" && getExchangeRate ? (
          <div className="d-flex justify-content-between">
            <div className="font-weight-500">Order will transact in USD</div>
            <div>
              <span className="d-inline-blockprice-figure">{`$${(
                cartInfo.cart.prices.grand_total.value / getExchangeRate
              ).toFixed(2)}`}</span>
            </div>
          </div>
        ) : null}
      </section>
      <ShippingOrderSummary stopHeader orderList={cartInfo.cart.items} />

      <section className="pt-4">
        <header className="mb-3 border-bottom border-medium d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-primary text-uppercase">Ship To:</h5>
          <I18nLink href="/checkout/shipping">
            <Button variant="link" className="p-0 acc-action rounded-0">
              <MdEdit size="1.25rem" />
            </Button>
          </I18nLink>
        </header>

        <div>
          {cartInfo.cart.shipping_addresses[0].firstname}{" "}
          {cartInfo.cart.shipping_addresses[0].lastname}
        </div>
        <div>
          {cartInfo.cart.shipping_addresses[0].street.map((street, index) => (
            <span key={Math.random()}>
              {`${street} ${
                cartInfo.cart.shipping_addresses[0].street.length !== index + 1
                  ? ", "
                  : ""
              }`}
            </span>
          ))}
        </div>
        <div>
          {`${cartInfo.cart.shipping_addresses[0].city}, ${cartInfo.cart.shipping_addresses[0].region.label}, ${cartInfo.cart.shipping_addresses[0].country.label} ${cartInfo.cart.shipping_addresses[0].postcode}`}
        </div>

        <div>{cartInfo.cart.shipping_addresses[0].telephone}</div>
      </section>
      <section className="pt-4">
        <header className="mb-3 border-bottom border-medium d-flex justify-content-between align-items-center">
          <h5 className="mb-0 text-primary text-uppercase">Shipping Method:</h5>
          <I18nLink href="/checkout/shipping">
            <Button variant="link" className="p-0 acc-action rounded-0">
              <MdEdit size="1.25rem" />
            </Button>
          </I18nLink>
        </header>
        <div>
          {
            cartInfo.cart.shipping_addresses[0].selected_shipping_method
              .carrier_title
          }
          {" - "}
          {
            cartInfo.cart.shipping_addresses[0].selected_shipping_method
              .method_title
          }
        </div>
      </section>
    </>
  );
};
export default PaymentOrderSummary;
