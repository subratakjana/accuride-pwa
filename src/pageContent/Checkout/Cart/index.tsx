import React, { useContext, useState, useEffect } from "react";
import { useManualQuery, useMutation } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import { LoadingIndicator } from "@Components/Utilities";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { cartDetails } from "@Graphql/queries/cartDetails.graphql";
import { deleteCartItem } from "@Graphql/queries/deleteCartItem.graphql";
import { applyCouponToCart } from "@Graphql/queries/applyCouponToCart.graphql";
import { removeCouponFromCart } from "@Graphql/queries/removeCouponFromCart.graphql";
import { updateCartItems } from "@Graphql/queries/updateCartItems.graphql";
import dynamic from "next/dynamic";
import useWindowDimensions from "@Hooks/windowDimention";
import { getConfigureableSku } from "@Hooks/criptoEncodeDecodeCookie";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const CartTable = dynamic(() => import("@Components/Checkout/Cart/CartTable"));
const CartSummary = dynamic(
  () => import("@Components/Checkout/Cart/CartSummary"),
);
const ApplyDiscount = dynamic(
  () => import("@Components/Checkout/ApplyDiscount"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const Cart = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const [productList, setProductList] = useState([]);
  const [priceList, setPricetList] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [couponData, setCoupon] = useState(null);
  const [getDelProdData, setGetDelProdData] = useState(null);
  const [globalLoader, setGlobalLoader] = useState(false);
  const { notify, cartId, cartList, addCart, decode } = useContext(AuthContext);
  const [accordion, setState] = useState({ activeKey: false });
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: "Cart",
    },
  ];
  /**
   * provideSliGtmValue
   * pm70-19-01-21
   * @param {*} allItems,
   */
  const provideSliGtmValue = (allItems) => {
    allItems.map((item) => {
      try {
        window.sliSpark("sli:addProduct", {
          id: item.id,
          price: item.prices.price.value,
          quantity: item.quantity,
          currency: item.prices.price.currency,
        });
        return item;
      } catch (error) {}
    });
  };

  /** GTM Value handling */
  const provideGtmValue = (allItems) => {
    const viewCartGTMdata = {
      event: "view_cart",
      ecommerce: {
        checkout: {
          actionField: {
            step: 1,
          },
          products: [],
        },
      },
    };
    const gtmProducts = allItems.map((item) => {
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
    viewCartGTMdata.ecommerce.checkout.products = [...gtmProducts];

    provideSliGtmValue(allItems);
    GTMEventFn(viewCartGTMdata);
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

  // API calling to remove item from cart list
  const [removeCartItemFn, { loading: loadingRemoveCart }] = useMutation(
    deleteCartItem.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (getDelProdData) {
          const paramsObject = {
            totalPrice: null,
            emailID: data.removeItemFromCart.cart.email,
            phoneNo:
              data.removeItemFromCart.cart.shipping_addresses.length > 0
                ? data.removeItemFromCart.cart.shipping_addresses[0].telephone
                : null,
            name:
              data.removeItemFromCart.cart.shipping_addresses.length > 0
                ? `${data.removeItemFromCart.cart.shipping_addresses[0].firstname} ${data.removeItemFromCart.cart.shipping_addresses[0].lastname}`
                : null,
            currency: getDelProdData[0].prices.price.currency,
            unitPrice: getDelProdData[0].prices.price.value,
            productName: getDelProdData[0].product.name,
            productId: decode(getDelProdData[0].product.id),
            productQuantity: getDelProdData[0].quantity,
            ordeId: null,
          };
          try {
            factors.track("Product Removed From Cart", paramsObject);
            console.log("Product Removed From Cart", paramsObject);
          } catch (err) {
            console.error(err);
          }
        }
        setGlobalLoader(false);
        notify("Item successfully deleted from cart!");
        addCart(data.removeItemFromCart.cart.total_quantity);
        setProductList(data.removeItemFromCart.cart.items);
        setPricetList(data.removeItemFromCart.cart.prices);
        setCoupon(data.removeItemFromCart.cart.applied_coupons);
        setShippingAddress(data.removeItemFromCart.cart.shipping_addresses[0]);
      },
    },
  );

  // API calling to generate cart list
  const [cartDetailsFn, { loading: loadingCart, data: cartData }] =
    useManualQuery(cartDetails.loc.source.body, {
      fetchPolicy: "no-cache", // return always update data from server. Update cache comment out,
      onSuccess: (res) => {
        const { data } = res;
        if (data.cart.total_quantity === 0)
          notify("Your cart is empty!", "warning");
        addCart(data.cart.total_quantity);
        setProductList(data.cart.items);
        setTimeout(() => {
          provideGtmValue(data.cart.items);
        }, 1000);
        setPricetList(data.cart.prices);
        setCoupon(data.cart.applied_coupons);
        setShippingAddress(data.cart.shipping_addresses[0]);
      },
    });

  // API calling to apply discount coupon
  const [applyCouponCardFn, { loading: applyCouponLoad }] = useMutation(
    applyCouponToCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        notify("Coupon added successfully in the cart!");
        addCart(data.applyCouponToCart.cart.total_quantity);
        setProductList(data.applyCouponToCart.cart.items);
        setPricetList(data.applyCouponToCart.cart.prices);
        setCoupon(data.applyCouponToCart.cart.applied_coupons);
        setShippingAddress(data.applyCouponToCart.cart.shipping_addresses[0]);
      },
    },
  );

  // API calling to remove discount coupon
  const [rmCouponCardFn, { loading: removeCouponLoad }] = useMutation(
    removeCouponFromCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        notify("Coupon removed successfully from the cart!");
        addCart(data.removeCouponFromCart.cart.total_quantity);
        setProductList(data.removeCouponFromCart.cart.items);
        setPricetList(data.removeCouponFromCart.cart.prices);
        setCoupon(data.removeCouponFromCart.cart.applied_coupons);
        setShippingAddress(
          data.removeCouponFromCart.cart.shipping_addresses[0],
        );
      },
    },
  );

  // API calling to update cart list
  const [updateCartDetailsFn, { loading: loadingUpdategCart }] = useMutation(
    updateCartItems.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        notify("Your cart has been successfully updated");
        addCart(data.updateCartItems.cart.total_quantity);
        setProductList(data.updateCartItems.cart.items);
        setPricetList(data.updateCartItems.cart.prices);
        setCoupon(data.updateCartItems.cart.applied_coupons);
        setShippingAddress(data.updateCartItems.cart.shipping_addresses[0]);
      },
    },
  );

  // ------------ remove item --------

  const removeItem = (param, getProdData) => {
    if (getProdData && getProdData.length > 0) setGetDelProdData(getProdData);
    removeCartItemFn({
      variables: { cartId, cartItemId: param }
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

  const updateShoppingCart = (param) => {
    const updatedList = param.map((item) => {
      let updateCart = {};
      updateCart = {
        cart_item_id: parseInt(decode(item.id), 10),
        quantity: item.quantity,
      };
      return updateCart;
    });

    updateCartDetailsFn({
      variables: { cartId, newCartList: updatedList }
    }).then(({ error }) => {
      if (error) {
        window.location.reload(false);
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  // ------------- apply discount coupon --------
  const applyDiscount = (code) => {
    applyCouponCardFn({
      variables: { cartId, couponCode: code }
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
      variables: { cartId }
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

  // ------- checking cartList empty or not -------

  useEffect(() => {
    setProductList([]);
    setPricetList(null);
    if (cartId && cartId !== null && cartId !== "null") {
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
  }, []);

  useEffect(() => {
    if (cartId && cartId !== null && cartId !== "null") {
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
  }, [cartList]);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="section-padding pt-xl-5">
        <Container>
          <Row>
            <Col xl>
              {/* header start */}
              <header
                className={`mb-3 mt-xl-3 ${
                  windowObj && windowSize.width > 1024
                    ? "border-bottom border-medium"
                    : ""
                }`}
              >
                <h2 className="mb-0 mb-xl-2 text-uppercase">Shopping Cart</h2>
              </header>
              {/* header end */}
              {cartList !== 0 ? (
                <>
                  {/* card table start */}
                  <CartTable
                    productData={productList}
                    removeFn={removeItem}
                    updateCart={updateShoppingCart}
                    setGlobalLoader={setGlobalLoader}
                  />
                  {/* card table end */}
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
                          className={`px-0 text-left bg-white ${
                            accordion.activeKey === "0"
                              ? "text-primary acc-arrow-transform"
                              : "text-dark"
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
                        <Card.Body className="bg-light py-md-4">
                          <ApplyDiscount
                            couponStatus={
                              couponData == null ? "" : couponData[0].code
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
                </>
              ) : (
                <p>You have no items in your shopping cart.</p>
              )}
            </Col>
            {cartList !== 0 ? (
              <>
                {priceList !== null ? (
                  <Col xl className="mt-3 acc-right-sidebar mt-xl-0">
                    <div className="acc-right-sidebarwrap">
                      <CartSummary
                        productList={productList}
                        priceData={priceList}
                        shippingAddress={shippingAddress}
                        setGlobalLoader={setGlobalLoader}
                        globalLoader={globalLoader}
                      />
                    </div>
                  </Col>
                ) : (
                  ""
                )}
              </>
            ) : null}
          </Row>
        </Container>
      </section>
      <EmailSubscription />
      {loadingUpdategCart ||
      applyCouponLoad ||
      removeCouponLoad ||
      (loadingCart && !cartData) ||
      loadingRemoveCart ? (
        <LoadingIndicator />
      ) : (
        ""
      )}
    </>
  );
};

export default Cart;
