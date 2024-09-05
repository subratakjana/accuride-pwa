/* eslint-disable no-console */
import { useState, useEffect, useContext } from "react";
import { useManualQuery, useMutation } from "graphql-hooks";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import { availablePaymentMethod } from "@Graphql/queries/availablePaymentMethod.graphql";
import { getCustomerAddresses } from "@Graphql/queries/getCustomerAddresses.graphql";
import { cartDetails } from "@Graphql/queries/cartDetails.graphql";
import { applyCouponToCart } from "@Graphql/queries/applyCouponToCart.graphql";
import { removeCouponFromCart } from "@Graphql/queries/removeCouponFromCart.graphql";
import { LoadingIndicator } from "@Components/Utilities";
import EmailSubscription from "@Components/EmailSubscription";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import { getConfigureableSku } from "@Hooks/criptoEncodeDecodeCookie";
import dynamic from "next/dynamic";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";

const OrderSummary = dynamic(() => import("@Components/Checkout/OrderSummary"));
const ApplyDiscount = dynamic(
  () => import("@Components/Checkout/ApplyDiscount"),
);
const PaymentMethod = dynamic(
  () => import("@Components/Checkout/Payment/PaymentMethod"),
);
const PaymentOrderSummary = dynamic(
  () => import("@Components/Checkout/Payment/PaymentOrderSummery"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Payment = () => {
  const router = useRouter();
  const cartDetailsData =
    router.query && router.query.getQuery
      ? JSON.parse(router.query.getQuery)
      : null;
  const [cartInfo, setCartInfo] = useState(null);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const { token, notify, cartId, addCart, simpleRedirect } =
    useContext(AuthContext);
  const [priceData, setPriceData] = useState(null);
  const [couponData, setCoupon] = useState(null);
  const [accordion, setState] = useState({ activeKey: false });
  const [addressList, setAddressList] = useState([]);
  const [emailSubs, setEmailSubs] = useState();
  const [gtmProductsList, setGtmProductsList] = useState();
  const [paymentMethodList, setPaymentMethodList] = useState([]);
  //breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: "Payment",
    },
  ];

  /** Shipping page provide GTM Value handling */
  const provideGtmValue = (products) => {
    const paymentGTMdata = {
      event: "add_payment_info",
      ecommerce: {
        checkout: {
          actionField: {
            step: 4,
          },
          products: [],
        },
      },
    };
    const gtmProducts = products.map((item) => {
      const category =
        item.product.categories && item.product.categories.length > 0
          ? item.product.categories
              .map((cat) => (cat.id !== 7 ? cat.name : false))
              .filter(Boolean)
          : [];
      const productSku = item.product.variants
        ? getConfigureableSku(item)
        : item.product.sku;
      return {
        id: productSku, // Product ID or SKU of the product.
        name: item.product.name, // The name of the product.
        brand: "Accuride", // The brand name of the product.
        category: category.length > 0 ? category.join(",") : "Shop", // Product category*
        price: item.prices.price.value, // Item price
        quantity: item.quantity,
      };
    });
    setGtmProductsList(gtmProducts);
    paymentGTMdata.ecommerce.checkout.products = [...gtmProducts];
    GTMEventFn(paymentGTMdata);
  };

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

  // API calling for shipping list
  const [getAddressListFn, { loading: loadingAddressList }] = useManualQuery(
    getCustomerAddresses.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (res) => {
        const { data } = res;
        setAddressList(data.customer.addresses);
      },
    },
  );

  //  API calling for payment method list
  const [getPaymenthMethodFn, { loading: paymentMethodLoadig }] =
    useManualQuery(availablePaymentMethod.loc.source.body, {
      fetchPolicy: "no-cache",
      onSuccess: (res) => {
        const { data } = res;
        setPaymentMethodList(data.cart.available_payment_methods);
      },
    });

  // API calling to generate cart list
  const [cartDetailsFn, { loading: loadingCart }] = useManualQuery(
    cartDetails.loc.source.body,
    {
      fetchPolicy: "no-cache", // return always update data from server. Update cache comment out,
      onSuccess: (res) => {
        const { data } = res;
        setCartInfo(data);
        if (data.cart.total_quantity === 0) {
          simpleRedirect("/checkout/cart");
        } else {
          const coupo = data.cart.applied_coupons;
          if (coupo) setCoupon(coupo[0].code);
          else setCoupon(null);
          setEmailSubs(data.cart.email);
          addCart(data.cart.total_quantity);
          setTimeout(() => {
            provideGtmValue(data.cart.items);
          }, 2000);
          setPriceData({
            value: data.cart.prices.grand_total.value,
          });
          getPaymenthMethodFn({ variables: { cartId } }).then(({ error }) => {
            if (error) {
              if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                notify(error.graphQLErrors[0].message, "error");
              } else {
                notify("Please check your network connection!", "error");
              }
            }
          });
          if (token) {
            getAddressListFn("true").then(({ error }) => {
              if (error) {
                if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                  notify(error.graphQLErrors[0].message, "error");
                } else {
                  notify("Please check your network connection!", "error");
                }
              }
            });
          } else {
            // --- saving previous saved shipping sddress to local storage ----
            try {
              const getCustomeerDetails = data.cart.shipping_addresses[0];
              getCustomeerDetails.email = data.cart.email;
              localStorage.setItem(
                "guest_shipping_address_cart",
                JSON.stringify(getCustomeerDetails),
              );
            } catch (error) {
              console.log("err", error);
            }
          }
        }
      },
    },
  );

  // API calling to apply discount coupon
  const [applyCouponCardFn, { loading: applyCouponLoad }] = useMutation(
    applyCouponToCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setPriceData({
          value: data.applyCouponToCart.cart.prices.grand_total.value,
        });
        setCoupon(data.applyCouponToCart.cart.applied_coupons[0].code);
        cartDetailsFn({ variables: { cartId } }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        });
        notify("Coupon added successfully!");
      },
    },
  );

  // API calling to remove discount coupon
  const [rmCouponCardFn, { loading: removeCouponLoad }] = useMutation(
    removeCouponFromCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setPriceData({
          value: data.removeCouponFromCart.cart.prices.grand_total.value,
        });
        setCoupon(data.removeCouponFromCart.cart.applied_coupons);
        cartDetailsFn({ variables: { cartId } }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        });
        notify("Coupon removed successfully!");
      },
    },
  );

  // ------------- apply discount coupon --------
  const applyDiscount = (code) => {
    applyCouponCardFn({
      variables: { cartId, couponCode: code },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  // ------------- remove discount coupon --------
  const rmDiscount = () => {
    rmCouponCardFn({
      variables: { cartId },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  useEffect(() => {
    if (cartId && cartId !== null && cartId !== "null" && !cartDetailsData) {
      cartDetailsFn({ variables: { cartId } }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
        }
      });
    }
  }, [cartId, cartDetailsData]);

  useEffect(() => {
    if (cartDetailsData) {
      if (cartDetailsData.cart.total_quantity === 0) {
        simpleRedirect("/checkout/cart");
      } else {
        setCartInfo(cartDetailsData);
        const coupo = cartDetailsData.cart.applied_coupons;
        if (coupo) setCoupon(coupo[0].code);
        else setCoupon(null);
        setEmailSubs(cartDetailsData.cart.email);
        addCart(cartDetailsData.cart.total_quantity);
        setTimeout(() => {
          provideGtmValue(cartDetailsData.cart.items);
        }, 2000);
        setPriceData({
          value: cartDetailsData.cart.prices.grand_total.value,
        });
        getPaymenthMethodFn({ variables: { cartId } }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        });
        if (token) {
          getAddressListFn("true").then(({ error }) => {
            if (error) {
              if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                notify(error.graphQLErrors[0].message, "error");
              } else {
                notify("Please check your network connection!", "error");
              }
            }
          });
        } else {
          // --- saving previous saved shipping sddress to local storage ----
          try {
            const getCustomeerDetails =
              cartDetailsData.cart.shipping_addresses[0];
            getCustomeerDetails.email = cartDetailsData.cart.email;
            localStorage.setItem(
              "guest_shipping_address_cart",
              JSON.stringify(getCustomeerDetails),
            );
          } catch (error) {
            console.log("err", error);
          }
        }
      }
    }
  }, []);
  if (cartInfo && cartInfo.cart && cartInfo.cart.total_quantity === 0) {
    simpleRedirect("/checkout/cart");
  }
  if (cartInfo && cartInfo.cart.shipping_addresses.length === 0) {
    simpleRedirect("/checkout/cart");
  }

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="section-padding pt-0 pt-xl-5">
        {/* order summary for mobile start */}
        {priceData &&
        windowObj &&
        windowSize.width <= 1024 &&
        !router.asPath.includes(`/${router.query.zone_lang}/checkout`) ? (
          <OrderSummary priceData={priceData} />
        ) : (
          ""
        )}
        {/* order summary for mobile end */}
        <Container className="mt-3 mt-xl-0">
          <Row>
            <Col xl>
              {/* payment method start */}
              {paymentMethodList.length > 0 ? (
                <PaymentMethod
                  cartInfo={cartInfo}
                  gtmProducts={gtmProductsList}
                  userEmail={emailSubs}
                  paymentMethods={paymentMethodList}
                  setAddressList={setAddressList}
                  addressList={addressList}
                />
              ) : (
                ""
              )}
              {/* payment method end */}

              {/* accordion start */}
              <Accordion
                className="acc-custom-accordion mt-3"
                defaultActiveKey={accordion.activeKey}
              >
                {/* apply discount code start */}
                <Card>
                  <Card.Header className="p-0 border-bottom border-medium">
                    <Accordion.Toggle
                      onClick={() => accordianClickedEvent("0")}
                      className={`font-size-lg px-0 py-3 text-left bg-white ${
                        accordion.activeKey === "0"
                          ? "text-primary acc-arrow-transform"
                          : "text-medium"
                      }`}
                      as={Button}
                      block
                      variant="link"
                      eventKey="0"
                    >
                      Apply Discount Code
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="bg-light acc-cms-content">
                      <ApplyDiscount
                        couponStatus={
                          couponData === "null" || !couponData ? "" : couponData
                        }
                        applyDiscountFn={applyDiscount}
                        rmDiscountFn={rmDiscount}
                      />
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
                {/* apply discount code end */}
              </Accordion>
              {/* accordion end */}
            </Col>
            {/* right sidebar start */}
            {cartInfo &&
            cartInfo.cart.shipping_addresses.length > 0 &&
            cartInfo.cart.shipping_addresses[0].selected_shipping_method &&
            windowObj &&
            windowSize.width > 1024 ? (
              <Col xl className="acc-right-sidebar">
                <div className="acc-right-sidebarwrap">
                  {cartInfo ? (
                    <PaymentOrderSummary cartInfo={cartInfo} />
                  ) : null}
                </div>
              </Col>
            ) : null}
            {/* right sidebar end */}
          </Row>
        </Container>
      </section>
      <EmailSubscription />
      {loadingCart ||
      paymentMethodLoadig ||
      loadingAddressList ||
      applyCouponLoad ||
      removeCouponLoad ? (
        <LoadingIndicator />
      ) : (
        ""
      )}
    </>
  );
};

export default Payment;
