/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useContext, useState, useEffect } from "react";
import { useManualQuery, useMutation } from "graphql-hooks";
import { LoadingIndicator } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { cartDetails } from "@Graphql/queries/cartDetails.graphql";
import { createEmptyCart } from "@Graphql/queries/createEmptyCart.graphql";
import { getCustomerAddresses } from "@Graphql/queries/getCustomerAddresses.graphql";
import { updateCustomerAddress } from "@Graphql/queries/updateCustomerAddress.graphql";
import { setShippingAddressesOnCart } from "@Graphql/queries/setShippingAddressesOnCart.graphql";
import { setShippingMethods } from "@Graphql/queries/setShippingMethods.graphql";
import { getCartAdress } from "@Graphql/queries/getCartAdress.graphql";
import EmailSubscription from "@Components/EmailSubscription";
import guestCartMarge from "@Hooks/guestCartMarge";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import { getConfigureableSku } from "@Hooks/criptoEncodeDecodeCookie";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";

const GuestShippingAddress = dynamic(
  () => import("@Components/Checkout/Shipping/GuestShippingAddress"),
);
const OrderSummary = dynamic(() => import("@Components/Checkout/OrderSummary"));
const ShippingAddress = dynamic(
  () => import("@Components/Checkout/Shipping/ShippingAddress"),
);
const ShippingMethod = dynamic(
  () => import("@Components/Checkout/Shipping/ShippingMethod"),
);
const ShippingOrderSummary = dynamic(
  () => import("@Components/Checkout/Shipping/ShippingOrderSummary"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ShippingMethodSkeletonLoader = () => (
  <>
    <section className="acc-shipping-method section-padding pb-0">
      <header className="mb-3 border-bottom border-medium">
        <h2 className="mb-0 text-primary text-uppercase pb-2">
          Getting Shipping Method...
        </h2>
      </header>
      <Skeleton height={84} className="mb-3" />
      <Skeleton height={84} className="mb-3" />
      <Skeleton height={84} className="mb-3" />
      <Skeleton height={84} className="mb-3" />
      <Skeleton height={44} width={77} className="mb-3" />
    </section>
  </>
);
const ShippingSkeletonLoaderLoginUser = () => (
  <>
    <header className="mb-3 border-bottom border-medium">
      <h2 className="mb-0 text-primary text-uppercase pb-2">
        <Skeleton width={300} height={25} className="mb-4" />
      </h2>
    </header>
    <div className="acc-address-list row">
      <div className="acc-item col-md-4 col-sm-6">
        <article className="h-100 d-flex flex-column">
          <h4 className="mb-3 text-uppercase text-dark text-ellipsis mr-4">
            <Skeleton height={30} className="mb-3" />
          </h4>
          <Skeleton count={2.5} className="mb-3" />
        </article>
      </div>
      <div className="acc-item col-md-4 col-sm-6">
        <article className="h-100 d-flex flex-column">
          <h4 className="mb-3 text-uppercase text-dark text-ellipsis mr-4">
            <Skeleton height={30} className="mb-3" />
          </h4>
          <Skeleton count={2.5} className="mb-3" />
        </article>
      </div>
      <div className="acc-item col-md-4 col-sm-6">
        <article className="h-100 d-flex flex-column">
          <h4 className="mb-3 text-uppercase text-dark text-ellipsis mr-4">
            <Skeleton height={30} className="mb-3" />
          </h4>
          <Skeleton count={2.5} className="mb-3" />
        </article>
      </div>
    </div>
    <div className="text-md-left border-top border-medium pt-3">
      <Skeleton height={36} width={131} className="mb-3" />
    </div>
  </>
);

const Shipping = () => {
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const { notify, cartId, addCart, token, simpleRedirect, setCartId, decode } =
    useContext(AuthContext);
  const boolTrue = true;
  const [priceData, setPriceData] = useState(null);
  const [shippingList, setShippingList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [FedxList, setFedxList] = useState(null);
  const [FedxItem, setFedExItem] = useState(null);
  const [shippingListUpdate, setShippingListUpdate] = useState(true);
  const [allCartData, setAllCartData] = useState(null);
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
      name: "Shipping",
    },
  ];

  useEffect(() => {
    if (allCartData) {
      const allItems = allCartData.cart.items;
      const paramsObject = {
        totalPrice: allCartData.cart.prices.grand_total.value,
        emailID: allCartData.cart.email,
        phoneNo:
          allCartData.cart.shipping_addresses.length > 0
            ? allCartData.cart.shipping_addresses[0].telephone
            : null,
        name:
          allCartData.cart.shipping_addresses.length > 0
            ? `${allCartData.cart.shipping_addresses[0].firstname} ${allCartData.cart.shipping_addresses[0].lastname}`
            : null,
        currency: allCartData.cart.prices.grand_total.currency,
        ordeId: null,
      };
      if (allItems) {
        allItems.map((item, index) => {
          paramsObject[`productName${index + 1}`] = item.product.name;
          paramsObject[`productId${index + 1}`] = decode(item.product.id);
          paramsObject[`unitPrice${index + 1}`] =
            item.product.price_range.minimum_price.final_price.value;
          paramsObject[`productQuantity${index + 1}`] = item.quantity;
          return true;
        });
      }

      try {
        factors.track("Shipping Method Selected", paramsObject);
        console.log("Shipping Method Selected", paramsObject);
      } catch (err) {
        console.error(err);
      }
    }
  }, [FedxItem]);

  /** Shipping page provide GTM Value handling */
  const provideGtmValue = (products) => {
    const shippingGTMdata = {
      event: "add_shipping_info",
      ecommerce: {
        checkout: {
          actionField: {
            step: 3,
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
    shippingGTMdata.ecommerce.checkout.products = [...gtmProducts];
    GTMEventFn(shippingGTMdata);
  };

  /**
   * function to update local storage shipping config
   */
  const adjustLocalShippingConfig = (newConfig) => {
    const newShippingconfig = {
      region: newConfig.region.label,
      region_code: newConfig.region.code,
      region_id: newConfig.region_id,
      country_id: newConfig.country.code,
      postcode: newConfig.postcode,
    };
    localStorage.setItem("shippingData", JSON.stringify(newShippingconfig));
  };

  // API calling for shipping list
  const [getAddressListFn, { loading: loadingAddressList }] = useManualQuery(
    getCustomerAddresses.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        const address = data.customer.addresses;
        setShippingList(data.customer.addresses);
        if (address.length === 0) setShippingListUpdate(false);
      },
      skipCache: true,
    },
  );

  // const [getQuery, setGetQuery] = useState();

  // API calling to generate cart list
  const [cartDetailsFn] = useManualQuery(cartDetails.loc.source.body, {
    onSuccess: (res) => {
      const { data } = res;
      if (data.cart.total_quantity === 0) {
        simpleRedirect("/checkout/cart");
      } else {
        setAllCartData(data);
        addCart(data.cart.total_quantity);
        setOrderList(data.cart.items);
        provideGtmValue(data.cart.items);
        setPriceData({
          value: data.cart.prices.grand_total.value,
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
          const guestAddress = data.cart.shipping_addresses[0];
          if (guestAddress) {
            guestAddress.email = data.cart.email;
            adjustLocalShippingConfig(guestAddress);
            localStorage.setItem(
              "guest_shipping_address_cart",
              JSON.stringify(guestAddress),
            );
          } 
        }
      }
    },
  });

  // API calling for cart id creation
  const [createEmptyCartFn, { loading: loadingCreateCart, data: cartData }] =
    useMutation(createEmptyCart.loc.source.body, {
      fetchPolicy: "no-cache",
      onSuccess: (res) => {
        const { data } = res;
        setCartId(data.createEmptyCart);
      },
    });

  // API calling for update shipping method
  const [setShippingMethodsFn, { loading: setShippingMethodsLoading }] =
    useMutation(setShippingMethods.loc.source.body, {
      onSuccess: (res) => {
        const { data } = res;
        const allItems = data.setShippingMethodsOnCart.cart.items;
        const paramsObject = {
          totalPrice:
            data.setShippingMethodsOnCart.cart.prices.grand_total.value,
          emailID: data.setShippingMethodsOnCart.cart.email,
          phoneNo:
            data.setShippingMethodsOnCart.cart.shipping_addresses.length > 0
              ? data.setShippingMethodsOnCart.cart.shipping_addresses[0]
                  .telephone
              : null,
          name:
            data.setShippingMethodsOnCart.cart.shipping_addresses.length > 0
              ? `${data.setShippingMethodsOnCart.cart.shipping_addresses[0].firstname} ${data.setShippingMethodsOnCart.cart.shipping_addresses[0].lastname}`
              : null,
          currency:
            data.setShippingMethodsOnCart.cart.prices.grand_total.currency,
          ordeId: null,
        };
        if (allItems) {
          allItems.map((item, index) => {
            paramsObject[`productName${index + 1}`] = item.product.name;
            paramsObject[`productId${index + 1}`] = decode(item.product.id);
            paramsObject[`unitPrice${index + 1}`] =
              item.product.price_range.minimum_price.final_price.value;
            paramsObject[`productQuantity${index + 1}`] = item.quantity;
            return true;
          });
        }

        try {
          factors.track("Shipping Method Button Click", paramsObject);
          console.log("Shipping Method Button Click", paramsObject);
        } catch (err) {
          console.error(err);
        }

        localStorage.setItem(
          "finalTotal",
          JSON.stringify(data.setShippingMethodsOnCart.cart),
        );
        const coupo = data.setShippingMethodsOnCart.cart.applied_coupons;
        if (coupo) localStorage.setItem("couponData", coupo[0].code);
        else localStorage.setItem("couponData", "null");
        localStorage.setItem(
          "priceData",
          JSON.stringify({
            value: data.setShippingMethodsOnCart.cart.prices.grand_total.value,
          }),
        );
        setPriceData({
          value: data.setShippingMethodsOnCart.cart.prices.grand_total.value,
        });
        notify("Shipping method has been updated");
        notify("Proceeding to Payment Method.");
        simpleRedirect(
          "/checkout/payment",
          JSON.stringify(data.setShippingMethodsOnCart),
        );
        // cartDetailsFn({ variables: { cartId } });
      },
    });

  // API calling for update default shipping address
  const [updateAddressAddFn, { loading: updatingShippingList }] = useMutation(
    updateCustomerAddress.loc.source.body,
    {
      onSuccess: () => {
        getAddressListFn().then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        });
      },
      skipCache: true,
    },
  );

  // ---------- update shipping address -------
  const updateShippingAdd = (addId, itemIndx, newregion) => {
    updateAddressAddFn({
      variables: {
        id: addId,
        customerUpdateAddress: { default_shipping: true, region: newregion },
      },
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

  const [getCartAdressFn] = useManualQuery(getCartAdress.loc.source.body);

  /**
   * Add new address API mutation assign for crate new address.
   * On submit add address form call the function with passing required variables.
   */
  const [setShippingAddressesOnCartFn, { loading: setShippingAddLoading }] =
    useMutation(setShippingAddressesOnCart.loc.source.body, {
      onSuccess: (res) => {
        getCartAdressFn({ variables: { cartId } });
        const { data } = res;
        const allItems = data.setShippingAddressesOnCart.cart.items;
        const paramsObject = {
          totalPrice:
            data.setShippingAddressesOnCart.cart.prices.grand_total.value,
          emailID: data.setShippingAddressesOnCart.cart.email,
          phoneNo:
            data.setShippingAddressesOnCart.cart.shipping_addresses.length > 0
              ? data.setShippingAddressesOnCart.cart.shipping_addresses[0]
                  .telephone
              : null,
          name:
            data.setShippingAddressesOnCart.cart.shipping_addresses.length > 0
              ? `${data.setShippingAddressesOnCart.cart.shipping_addresses[0].firstname} ${data.setShippingAddressesOnCart.cart.shipping_addresses[0].lastname}`
              : null,
          currency:
            data.setShippingAddressesOnCart.cart.prices.grand_total.currency,
          ordeId: null,
        };
        if (allItems) {
          allItems.map((item, index) => {
            paramsObject[`productName${index + 1}`] = item.product.name;
            paramsObject[`productId${index + 1}`] = decode(item.product.uid);
            paramsObject[`unitPrice${index + 1}`] =
              item.product.price_range.minimum_price.final_price.value;
            paramsObject[`productQuantity${index + 1}`] = item.quantity;
            return true;
          });
        }

        try {
          factors.track("Saved Shipping Address", paramsObject);
          console.log("Saved Shipping Address", paramsObject);
        } catch (err) {
          console.error(err);
        }
        notify("Shipping address has been successfully updated.");
        setFedExItem(null);
        setPriceData({
          value: data.setShippingAddressesOnCart.cart.prices.grand_total.value,
        });
        const errorMsg =
          data.setShippingAddressesOnCart.cart.shipping_addresses.length ===
            1 &&
          data.setShippingAddressesOnCart.cart.shipping_addresses[0]
            .available_shipping_methods.length > 0 &&
          data.setShippingAddressesOnCart.cart.shipping_addresses[0]
            .available_shipping_methods[0].error_message
            ? data.setShippingAddressesOnCart.cart.shipping_addresses[0]
                .available_shipping_methods[0].error_message
            : null;
        if (errorMsg) {
          if (errorMsg.includes("Zipcode")) setFedxList([]);
          else setFedExItem(null);
        } else {
          setFedxList(
            data.setShippingAddressesOnCart.cart.shipping_addresses[0]
              .available_shipping_methods,
          );
        }
        const guestAddress =
          data.setShippingAddressesOnCart.cart.shipping_addresses[0];
        if (guestAddress) {
          guestAddress.email = data.setShippingAddressesOnCart.cart.email;
          adjustLocalShippingConfig(guestAddress);
          localStorage.setItem(
            "guest_shipping_address_cart",
            JSON.stringify(guestAddress),
          );
        }
        const coupo = data.setShippingAddressesOnCart.cart.applied_coupons;
        if (coupo) localStorage.setItem("couponData", coupo[0].code);
        else localStorage.setItem("couponData", "null");
      },
    });

  const setShippingAddress = (shippingAdd) => {
    setFedxList(null);
    setShippingAddressesOnCartFn({
      variables: {
        cart_id: cartId,
        shipping_addresses: [{ address: shippingAdd }],
      },
    }).then(({ error }) => {
      if (error) {
        setFedExItem(null);
        setFedxList([]);
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  /**
   * set Shipping address of logged in user
   * Check address list and select the default shipping addrress
   * @param {*} shippingAddress
   */

  const setShippingAddressFromList = (shippingAddress) => {
    const shippingAdd = { ...shippingAddress };
    delete shippingAdd.id;
    delete shippingAdd.region_id;
    delete shippingAdd.__typename;
    delete shippingAdd.default_billing;
    delete shippingAdd.default_shipping;
    shippingAdd.save_in_address_book = false;
    shippingAdd.region = shippingAdd.region.region_code;
    setShippingAddress(shippingAdd);
  };

  const gotoPaymentPage = () => {
    if (FedxItem) {
      setShippingMethodsFn({
        variables: {
          cart_id: cartId,
          shipping_methods: [
            {
              carrier_code: FedxItem.carrier_code,
              method_code: FedxItem.method_code,
            },
          ],
        },
      }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
        }
      });
    } else notify("Please select a shipping method first!", "error");
  };

  /**
   * call back function from GuestShippingAddress component
   * to save shipping method Mutation query
   * based on the selected item.
   */
  const setShippingMethod = () => {
    if (FedxItem) {
    } else notify("Please select a shipping method first!", "error");
  };

  /**
   * generating fedx list based on default shipping address
   */

  useEffect(() => {
    setShippingListUpdate(false);
    shippingList.filter((add) => {
      if (add.default_shipping === true) {
        setShippingAddressFromList(add);
      }
      return false;
    });
  }, [shippingList]);

  // - tracking fedx item choose ------
  useEffect(() => {
    if (FedxItem !== null) {
      setShippingMethod();
    }
  }, [FedxItem]);

  // ---- tracking shipConfig data ------
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
  }, []);

  /**
   * @param {cartdata} guestCartMarge custom hooks.
   * guest cart marging with user cart.
   * page redirection after successfull login.
   * and return status after successfull add to cart.
   * if no guest cart page redirect also with this custo hooks.
   */

  const redirectPath = "/checkout/cart";
  const statusAddCart = guestCartMarge({ cartData, redirectPath });

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
              {/* shipping address start */}
              {token ? (
                <>
                  {updatingShippingList ||
                  loadingAddressList ||
                  shippingListUpdate ? (
                    <ShippingSkeletonLoaderLoginUser />
                  ) : (
                    <ShippingAddress
                      shippinglist={shippingList}
                      updateShippingAdd={updateShippingAdd}
                      refreshList={(newdata) => {
                        setShippingList(newdata);
                      }}
                    />
                  )}
                </>
              ) : (
                <GuestShippingAddress
                  createEmptyCartFn={createEmptyCartFn}
                  setShippingAddress={setShippingAddress}
                  FedxList={FedxList}
                />
              )}
              {/* shipping address end */}

              {/* shipping method start */}
              {loadingCreateCart ||
              setShippingAddLoading ||
              statusAddCart.completeHooks ||
              (statusAddCart.completeHooks &&
                statusAddCart.statusAddCart.simpleCartAdd &&
                statusAddCart.statusAddCart.configureCartAdd) ? (
                <ShippingMethodSkeletonLoader />
              ) : (
                ""
              )}
              {FedxList &&
              FedxList.length > 0 &&
              FedxList.filter((item) => item.error_message === "").length >
                0 ? (
                <>
                  <ShippingMethod
                    FedxList={FedxList}
                    shippingMode={boolTrue}
                    selectFedex={setFedExItem}
                  />
                  <div className="text-md-left">
                    <Button
                      variant="primary"
                      size="lg"
                      block={!(windowObj && windowSize.width >= 768)}
                      className="text-uppercase"
                      onClick={gotoPaymentPage}
                    >
                      Next
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {FedxList !== null ? (
                    <span
                      className={`p-3 bg-light mt-3 ${
                        loadingCreateCart ||
                        setShippingAddLoading ||
                        updatingShippingList ||
                        loadingAddressList ||
                        statusAddCart.completeHooks ||
                        (statusAddCart.completeHooks &&
                          statusAddCart.statusAddCart.simpleCartAdd &&
                          statusAddCart.statusAddCart.configureCartAdd)
                          ? "d-none"
                          : "d-block"
                      }`}
                    >
                      This is not a valid
                      <strong> Ship To </strong>
                      address.
                    </span>
                  ) : null}
                  {/* {shippingAddData && shippingAddData.setShippingAddressesOnCart.cart.email ? (
                                            <span className="d-block p-3 bg-light mt-3">Sorry, no quotes are available for this order at this time.</span>
                                        ) : null} */}
                </>
              )}
              {/* shipping method end */}
            </Col>
            {/* right sidebar start */}
            {windowObj && windowSize.width > 1024 ? (
              <Col xl className="acc-right-sidebar">
                <div className="acc-right-sidebarwrap">
                  <ShippingOrderSummary orderList={orderList} />
                </div>
              </Col>
            ) : null}
            {/* right sidebar end */}
          </Row>
        </Container>
      </section>
      <EmailSubscription />
      {setShippingMethodsLoading ? <LoadingIndicator /> : ""}
    </>
  );
};

export default Shipping;
