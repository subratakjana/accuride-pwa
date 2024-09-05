import { useContext, useEffect } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { useManualQuery, useMutation } from "graphql-hooks";
import { createTokenBaseCard } from "@Graphql/queries/createTokenBaseCard.graphql";
import { setPaymentMethodOnCartAndPlaceOrder } from "@Graphql/queries/setPaymentMethodOnCartAndPlaceOrder.graphql";
import { deleteTokenBaseCard } from "@Graphql/queries/deleteTokenBaseCard.graphql";
import { getCardinalCruisePayload } from "@Graphql/queries/getCardinalCruisePayload.graphql";
import flex from "@cybersource/flex-sdk-web";

const CyberSourceProcess = (props) => {
  const { cardDetails, allEmails, allAddresses, others, getSessionData } =
    props;
  const { token, notify, decode, cartId, simpleRedirect } =
    useContext(AuthContext);
  const [InactiveCardByHashFn] = useMutation(deleteTokenBaseCard.loc.source.body);

  const binProcessFn = (authPayLoad, orderPayLoad, data) => {
    window.Cardinal.continue(
      "cca",
      authPayLoad,
      orderPayLoad,
      data.cyberSourceCardinalCruiseAuthPayload.JWT,
    );
  };

  const [curdinalPayloadFn] = useManualQuery(
    getCardinalCruisePayload.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (res) => {
        const { data } = res;
        const ccBin =
          cardDetails.cardNumber && cardDetails.cardNumber.length > 4
            ? cardDetails.cardNumber.substring(0, 8)
            : null;
        if (others.paradoxUrl && others.paradoxUrl.cardinalJWT) {
          const authPayLoad = JSON.parse(
            data.cyberSourceCardinalCruiseAuthPayload.authPayload,
          );
          const orderPayLoad = JSON.parse(
            data.cyberSourceCardinalCruiseAuthPayload.orderPayload,
          );
          if (ccBin) {
            window.Cardinal.trigger("bin.process", cardDetails.cardNumber)
              .then((results) => {
                if (results.Status) {
                  binProcessFn(authPayLoad, orderPayLoad, data);
                } else {
                  props.setCallCardinalProcess(false);
                  props.setCallCreateToken(false);
                  props.setBussyPayment(false);
                  notify("Bin profiling failed", "error");
                }
              })
              .catch((error) => {
                props.setCallCardinalProcess(false);
                props.setCallCreateToken(false);
                props.setBussyPayment(false);
                notify("An error occurred during profiling", "error");
              });
          } else if (typeof Cardinal === "object") {
            cardDetails.savedCardList.map((item) => {
              if (
                Number(item.id) === Number(cardDetails.selectedSavedCard.id)
              ) {
                window.Cardinal.trigger(
                  "bin.process",
                  item.additional_object.cc_bin,
                )
                  .then((results) => {
                    if (results.Status) {
                      binProcessFn(authPayLoad, orderPayLoad, data);
                    } else {
                      props.setCallCardinalProcess(false);
                      props.setCallCreateToken(false);
                      props.setBussyPayment(false);
                      notify("Bin profiling failed", "error");
                    }
                  })
                  .catch((error) => {
                    props.setCallCardinalProcess(false);
                    props.setCallCreateToken(false);
                    props.setBussyPayment(false);
                    notify("An error occurred during profiling", "error");
                  });
              }
              return true;
            });
          }
          // payments.setupComplete start
          window.Cardinal.on("payments.setupComplete", (setupCompleteData) => {
            props.setCardinalSessionId(setupCompleteData.sessionId);
          });
        } else {
          props.setBussyPayment(false);
          props.setCallCardinalProcess(false);
          props.setCallCreateToken(false);
          notify("Something went wrong please try again", "error");
        }
      },
    },
  );

  const [CyberSourceCardHashDataFn] = useMutation(
    createTokenBaseCard.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        props.setNewCardhash(data.createTokenBaseCard.hash);
        cardinalProcessFn(data.createTokenBaseCard.hash);
        cardDetails.newCardhash = data.createTokenBaseCard.hash;
      },
      skipCache: true,
    },
  );

  const authenticateFn = () => {
    curdinalPayloadFn({ variables: { cartId } }).then(({ error }) => {
      props.setBussyPayment(false);
      props.setCallCardinalProcess(false);
      props.setCallCreateToken(false);
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  const [cyberSourcePlaceOrderFn] = useMutation(
    setPaymentMethodOnCartAndPlaceOrder.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        const checkoutActonData = allAddresses.billingAddress;
        checkoutActonData.emailSubs = allEmails.emailSubs;
        checkoutActonData.email = allEmails.subscriberEmail;
        localStorage.setItem(
          "checkoutActonData",
          JSON.stringify(checkoutActonData),
        );
        const allCartData = data.setPaymentMethodOnCart;

        if (allCartData) {
          try {
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
              ordeId: data.placeOrder.order.order_number,
            };
            if (allItems) {
              allItems.map((item, index) => {
                paramsObject[`productName${index + 1}`] = item.product.name;
                paramsObject[`productId${index + 1}`] = item.product.sku;
                paramsObject[`unitPrice${index + 1}`] =
                  item.product.price_range.minimum_price.final_price.value;
                paramsObject[`productQuantity${index + 1}`] = item.quantity;
                return true;
              });
            }
            factors.track("orderPlaced", paramsObject);
            console.log("orderPlaced", paramsObject);
          } catch (err) {
            console.error(err);
          }
        }

        props.provideGtmValue(data.placeOrder.order.order_number);
        notify("You order has been successfully placed.");

        if (
          others.checkedMode === false &&
          cardDetails.cardNumber &&
          cardDetails.cardNumber.length > 4 &&
          token
        ) {
          InactiveCardByHashFn({
            variables: { hash: cardDetails.newCardhash },
          });
        }
        simpleRedirect("/checkout/orderconfirmation");
        localStorage.setItem("orderid", data.placeOrder.order.order_number);
      },
    },
  );
  const cardinalProcessFn = (gethashData) => {
    const getinput = {
      cart_id: cartId,
      payment_method: {
        code: "paradoxlabs_cybersource",
        tokenbase_data: {
          card_id: gethashData,
          cc_cid: cardDetails.cvv,
          save: true,
          response_jwt: others.cardinalResJwt,
          payerauth_session_id: others.cardinalSessionId,
        },
      },
    };
    cyberSourcePlaceOrderFn({ variables: { getinput, cartId } }).then(
      ({ error }) => {
        if (error) {
          props.setBussyPayment(false);
          props.setCallCardinalProcess(false);
          props.setCallCreateToken(false);

          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            const errMsg = error.graphQLErrors[0].message;
            if (errMsg.includes("authenticate before continuing")) {
              authenticateFn();
            } else {
              if (
                cardDetails.cardNumber &&
                cardDetails.cardNumber.length > 4 &&
                token
              ) {
                InactiveCardByHashFn({
                  variables: { hash: cardDetails.newCardhash },
                });
              }
              notify(errMsg, "error");
            }
          } else {
            notify("Something went wrong please try again", "error");
            // notify('Please check your network connection!', 'error');
          }
        } else {
          props.setBussyPayment(false);
          props.setCallCardinalProcess(false);
          props.setCallCreateToken(false);
          //   notify("Something went wrong please try again", "error");
        }
      },
    );
  };
  // const cardinalProcessFn = (gethashData) => {
  //     window.Cardinal.configure({
  //         payment: {
  //             displayLoading: true,
  //         },
  //         logging: {
  //             level: 'verbose',
  //         },
  //     });
  //     window.Cardinal.on('payments.validated', (responsedata, jwt) => {
  //         switch (responsedata.ErrorDescription) {
  //             case 'Success':
  //                 if (responsedata.ActionCode === 'FAILURE') {
  //                     if (others.checkedMode === false && (cardDetails.cardNumber && cardDetails.cardNumber.length > 4) && token) {
  //                         InactiveCardByHashFn({ variables: { hash: gethashData } });
  //                     }
  //                     props.setBussyPayment(false);
  //                     notify('Payment cancelled by customer', 'error');
  //                     props.setCardinalResJwt(null);
  //                     props.setCardinalSessionId(null);
  //                     props.setNewCardhash(null);
  //                     props.generateCyberSourceKeyFn();
  //                     props.tokenBaseCheckoutConfigFn();
  //                     props.setCallCardinalProcess(false);
  //                     props.setCallCreateToken(false);
  //                 } else {
  //                     props.setCardinalResJwt(jwt);
  //                 }
  //                 // Handle successful transaction, send JWT to backend to verify
  //                 break;

  //             case 'Noaction':
  //                 if (others.checkedMode === false && (cardDetails.cardNumber && cardDetails.cardNumber.length > 4) && token) {
  //                     InactiveCardByHashFn({ variables: { hash: gethashData } });
  //                 }
  //                 props.setBussyPayment(false);
  //                 notify('Payment cancelled by customer', 'error');
  //                 props.setCardinalResJwt(null);
  //                 props.setCardinalSessionId(null);
  //                 props.setNewCardhash(null);
  //                 props.generateCyberSourceKeyFn();
  //                 props.tokenBaseCheckoutConfigFn();
  //                 props.setCallCardinalProcess(false);
  //                 props.setCallCreateToken(false);
  //                 break;

  //             case 'Failure':
  //                 if (others.checkedMode === false && (cardDetails.cardNumber && cardDetails.cardNumber.length > 4) && token) {
  //                     InactiveCardByHashFn({ variables: { hash: gethashData } });
  //                 }
  //                 props.setBussyPayment(false);
  //                 notify('Transaction failed', 'error');
  //                 props.setCardinalResJwt(null);
  //                 props.setCardinalSessionId(null);
  //                 props.setNewCardhash(null);
  //                 props.generateCyberSourceKeyFn();
  //                 props.tokenBaseCheckoutConfigFn();
  //                 props.setCallCardinalProcess(false);
  //                 props.setCallCreateToken(false);
  //                 break;

  //             case 'Error':
  //                 if (others.checkedMode === false && (cardDetails.cardNumber && cardDetails.cardNumber.length > 4) && token) {
  //                     InactiveCardByHashFn({ variables: { hash: gethashData } });
  //                 }
  //                 props.setBussyPayment(false);
  //                 notify('Transaction failed', 'error');
  //                 props.setCardinalResJwt(null);
  //                 props.setCardinalSessionId(null);
  //                 props.setNewCardhash(null);
  //                 props.generateCyberSourceKeyFn();
  //                 props.tokenBaseCheckoutConfigFn();
  //                 props.setCallCardinalProcess(false);
  //                 props.setCallCreateToken(false);
  //                 break;
  //             default:
  //                 if (others.checkedMode === false && (cardDetails.cardNumber && cardDetails.cardNumber.length > 4) && token) {
  //                     InactiveCardByHashFn({ variables: { hash: gethashData } });
  //                 }
  //                 props.setBussyPayment(false);
  //                 notify(responsedata.ErrorDescription, 'error');
  //                 props.setCardinalResJwt(null);
  //                 props.setCardinalSessionId(null);
  //                 props.setNewCardhash(null);
  //                 props.generateCyberSourceKeyFn();
  //                 props.tokenBaseCheckoutConfigFn();
  //                 props.setCallCardinalProcess(false);
  //                 props.setCallCreateToken(false);
  //         }
  //     });
  //     window.Cardinal.setup('init', { jwt: others.paradoxUrl.cardinalJWT });
  //     window.Cardinal.on('payments.setupComplete', (setupCompleteData) => {
  //         props.setCardinalSessionId(setupCompleteData.sessionId);
  //         props.setNewCardhash(gethashData);
  //         const getinput = {
  //             cart_id: cartId,
  //             payment_method: {
  //                 code: 'paradoxlabs_cybersource',
  //                 tokenbase_data: {
  //                     card_id: gethashData,
  //                     cc_cid: cardDetails.cvv,
  //                     save: true,
  //                     response_jwt: '',
  //                     payerauth_session_id: setupCompleteData.sessionId,
  //                 },
  //             },
  //         };
  //         cyberSourcePlaceOrderFn({ variables: { getinput, cartId } });
  //     });
  // };


  const CSCreateToken = () => {
    const tokens = others.CSEncodedKey.split(".");
    const decodeToekn = JSON.parse(decode(tokens[1]));
    const { jwk } = decodeToekn.flx;

    const options = {
      kid: jwk.kid,
      keystore: jwk,
      encryptionType: "RsaOaep", // ensure this matches the encryptionType you specified when creating your key
      cardInfo: {
        cardNumber: cardDetails.cardNumber,
        cardType: cardDetails.cardTypeNum[cardDetails.cardType],
        cardExpirationMonth: cardDetails.cardMonth,
        cardExpirationYear: cardDetails.cardYear,
      },
    };

    flex.createToken(options, (response) => {
      if (response.error) {
        props.setCallCardinalProcess(false);
        props.setCallCreateToken(false);
        props.setBussyPayment(false);
        // notify(response.error.responseStatus.message, 'error');
        const errMsg = response.error.responseStatus.message;
        if (errMsg.includes("Cannot find private RSA key with keyId")) {
          // notify('Your session has expired. Please refresh the page to continue.', 'error');
          getSessionData(true);
        } else {
          notify(errMsg, "error");
        }
      } else {
        const d = new Date();
        const dformat = `${[
          d.getFullYear(),
          d.getMonth() + 1,
          d.getDate(),
        ].join("-")} ${[d.getHours(), d.getMinutes(), d.getSeconds()].join(
          ":",
        )}`;
        const getinput = {
          expires: dformat,
          customer_ip: others.clientIp,
          customer_email: allEmails.userEmail,
          payment_id: response.token,
          method: "paradoxlabs_cybersource",
          active: true,
          address: {
            region: {
              region_code: allAddresses.shippingAddress.region.code,
              region: allAddresses.shippingAddress.region.label,
              region_id: allAddresses.shippingAddress.region_id,
            },
            country_id: allAddresses.shippingAddress.country.code,
            street: allAddresses.shippingAddress.country.street,
            company: allAddresses.shippingAddress.company,
            telephone: allAddresses.shippingAddress.telephone,
            postcode: allAddresses.shippingAddress.postcode,
            city: allAddresses.shippingAddress.city,
            firstname: allAddresses.shippingAddress.firstname,
            lastname: allAddresses.shippingAddress.lastname,
          },
          additional: {
            cc_type: cardDetails.cardType,
            cc_last4: cardDetails.cardNumber.substr(
              cardDetails.cardNumber.length - 4,
            ),
            cc_exp_year: cardDetails.cardYear,
            cc_exp_month: cardDetails.cardMonth,
            cc_bin:
              cardDetails.cardNumber && cardDetails.cardNumber.length > 4
                ? cardDetails.cardNumber.substring(0, 8)
                : "",
          },
        };
        CyberSourceCardHashDataFn({ variables: { getinput } }).then(
          ({ error }) => {
            if (error) {
              props.setCallCardinalProcess(false);
              props.setCallCreateToken(false);
              props.setBussyPayment(false);
              if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                notify(error.graphQLErrors[0].message, "error");
              } else {
                notify("Please check your network connection!", "error");
              }
            }
          },
        );
      }
    });
  };

  useEffect(() => {
    if (others.callCreateToken) CSCreateToken();
  }, [others.callCreateToken]);

  useEffect(() => {
    if (others.callCardinalProcess) {
      const gethashData = cardDetails.selectedSavedCard.hash;
      cardinalProcessFn(gethashData);
    }
  }, [others.callCardinalProcess]);

  useEffect(() => {
    if (others.cardinalResJwt && others.cardinalSessionId) {
      const getinput = {
        cart_id: cartId,
        payment_method: {
          code: "paradoxlabs_cybersource",
          tokenbase_data: {
            card_id:
              token && cardDetails.selectedSavedCard.hash
                ? cardDetails.selectedSavedCard.hash
                : cardDetails.newCardhash,
            cc_cid: cardDetails.cvv,
            save: true,
            response_jwt: others.cardinalResJwt,
            payerauth_session_id: others.cardinalSessionId,
          },
        },
      };
      cyberSourcePlaceOrderFn({ variables: { getinput, cartId } }).then(
        ({ error }) => {
          if (error) {
            props.setBussyPayment(false);
            props.setCallCardinalProcess(false);
            props.setCallCreateToken(false);

            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              const errMsg = error.graphQLErrors[0].message;
              if (errMsg.includes("authenticate before continuing")) {
                authenticateFn();
              } else {
                if (
                  cardDetails.cardNumber &&
                  cardDetails.cardNumber.length > 4 &&
                  token
                ) {
                  InactiveCardByHashFn({
                    variables: { hash: cardDetails.newCardhash },
                  });
                }
                notify(errMsg, "error");
              }
            } else {
              notify("Something went wrong please try again", "error");
              // notify('Please check your network connection!', 'error');
            }
          } else {
            props.setBussyPayment(false);
            props.setCallCardinalProcess(false);
            props.setCallCreateToken(false);
            notify("Something went wrong please try again", "error");
          }
        },
      );
    }
  }, [others.cardinalResJwt]);

  return null;
};

export default CyberSourceProcess;
