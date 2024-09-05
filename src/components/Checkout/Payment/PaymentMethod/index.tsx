import { useState, useContext, useEffect, createRef } from 'react';
import { LoadingIndicator, I18nLink } from '@Components/Utilities';
import { useManualQuery, useMutation } from 'graphql-hooks';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ReactSVG } from 'react-svg';
import axios from 'axios';
import { useRouter } from 'next/router';
import creditCardType from 'credit-card-type';
import { createPaypalExpressToken } from '@Graphql/queries/getPaypalCheckoutButton.graphql';
import { getCartAdress } from '@Graphql/queries/getCartAdress.graphql';
import { placeOrder } from '@Graphql/queries/placeOrder.graphql';
import { setBillingAddressOnCart } from '@Graphql/queries/setBillingAddressOnCart.graphql';
import { setPaymentMethodOnCart } from '@Graphql/queries/setPaymentMethodOnCart.graphql';
import SEND_NEWSLETTER_SUBSCRIPTION from '@Graphql/queries/postNewsletterSubscription.graphql';
import { generateCyberSourceKey } from '@Graphql/queries/generateCyberSourceKey.graphql';
import { tokenBaseCheckoutConfig } from '@Graphql/queries/tokenBaseCheckoutConfig.graphql';
import { getClientIpAPI } from '@Graphql/queries/getClientIP.graphql';
import { createKlarnaPaymentsSession } from '@Graphql/queries/klarnaQueries.graphql';
import {
  FaQuestion,
  FaCcMastercard,
  FaCcAmex,
  FaCcVisa,
  FaCcDiscover,
  FaCreditCard,
} from 'react-icons/fa';
import { AuthContext } from '@Contexts/AuthContext';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
import { GTMEventFn } from '@Components/Utilities/gtmUtils';
import NextImage from 'next/legacy/image';

const KlarnaProcess = dynamic(() => import('./KlarnaProcess'));
const CyberSourceProcess = dynamic(() => import('./CyberSourceProcess'));
const NewAddress = dynamic(() => import('../../NewAddress'));
const TermsAndConditions = dynamic(() => import('../TermsAndConditions'));

const PaymentMethod = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [callFunction, setCallFunction] = useState(0);
  const [ifKlarnaLoad, setIfKlarnaLoad] = useState(true);
  const [ifCyberSourceLoad, setIfCyberSourceLoad] = useState(true);
  const [ifPaypalLoad, setIfPaypalLoad] = useState(true);
  const router = useRouter();
  const tokenId = router.query.token;
  const PayerId = router.query.PayerID;

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const [show, setShow] = useState(false);
  const { addressList, setAddressList, userEmail, gtmProducts, cartInfo } =
    props;
  const [allPaymentMethods, setAllPaymentMethods] = useState(
    props.paymentMethods
  );
  const [shippingAddress, setshippingAddress] = useState();
  const [billingAddress, setbillingAddress] = useState();
  const { token, notify, cartId, simpleRedirect, decode, userDetails } =
    useContext(AuthContext);
  const [activeKey] = useState(0);
  const [setPaymentCode] = useState(null); // default_billing
  const checkdefaultId = addressList.filter(
    (add) => add.default_shipping === true
  );
  const [billingAddId, setbillingAddId] = useState(
    checkdefaultId.length > 0 ? checkdefaultId[0].id : null
  );
  const [newAddressMode, setnewAddressMode] = useState(false);
  const [emailSubs, setEmailSubs] = useState(false);
  const [subscriberEmail] = useState(userEmail);
  const [termsCondi, setTermsCondi] = useState(false);
  const [showList, setShowList] = useState(false);
  const [showGuestForm, setGuestForm] = useState(false);
  const [defaultBill, setDefaultBill] = useState(true);
  const [validated, setValidated] = useState(false);
  const [savedCardMode, setSavedCardMode] = useState(false);
  const [checkedMode, setCheckedMode] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState('new');
  const [selectedSavedCard, setSelectedSavedCard] = useState('');
  const [savedCardList, setSavedCardList] = useState([]);
  const [cardList, setcardList] = useState([]);
  const [cardType, setcardType] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardMonth, setCardMonth] = useState('');
  const [cardYear, setCardYear] = useState('');
  const [cvv, setCvv] = useState('');
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(20);
  const [PayPalUrl, setPayPalUrl] = useState([]);
  const [errorMsg2, seterrorMsg2] = useState('');
  const [clientIp, setClientIp] = useState('');
  const [newCardhash, setNewCardhash] = useState('');
  const [bussyPayment, setBussyPayment] = useState(false);
  const cardFormObj = createRef();
  const monthList = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const [CSEncodedKey, setCSEncodedKey] = useState('');
  const [creditDebit, setCreditDebit] = useState(false);
  const [payPal, setPayPal] = useState(false);
  const [klarna, setKlarna] = useState(false);
  const [klarna2, setKlarna2] = useState(false);
  const [paradoxUrl, setParadoxUrl] = useState(null);
  const [cardinalResJwt, setCardinalResJwt] = useState(null);
  const [cardinalSessionId, setCardinalSessionId] = useState(null);
  const [klarnaClientToken, setKlarnaClientToken] = useState(null);
  const [myPaymentMethod, setMyPaymentMethod] = useState(null);
  const [callCardinalProcess, setCallCardinalProcess] = useState(false);
  const [callCreateToken, setCallCreateToken] = useState(false);
  const [callKlarnaInitFn, setCallKlarnaInitFn] = useState(false);
  const [allCartData, setAllCartData] = useState(null);

  const cardTypeNum = {
    VI: '001',
    MC: '002',
    AE: '003',
    DI: '004',
  };

  // For the Secssion Modal Open and Close
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const handleSessionDataCyberSource = (data) => {
    setSessionModalOpen(data);
  };
  // End

  const yearListCal = () => {
    const yer = [];
    const date = new Date();
    let i = 0;
    do {
      yer.push(JSON.stringify(date.getFullYear() + i));
      i += 1;
    } while (i < 11);
    return yer;
  };
  const yearList = yearListCal();
  const handleClose = () => {
    setShow(false);
    setGuestForm(false);
  };
  const closeNewAddress = () => {
    setnewAddressMode(false);
    setbillingAddId(checkdefaultId.length > 0 ? checkdefaultId[0].id : null);
  };
  const handleShow = () => setShow(true);

  /* PayPal Button Generation */
  const [getPaypalButton, { loading: loadingPaypal }] = useMutation(
    createPaypalExpressToken.loc.source.body,
    {
      onSuccess: (data) => {
        const res = data.data;
        const paymentUrl = res.createPaypalExpressToken.paypal_urls.start;
        if (paymentUrl) setIfPaypalLoad(true);
        setPayPalUrl(paymentUrl);
      },
      onError: ({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          if (graphQLErrors.length > 0)
            notify(graphQLErrors[0].message, 'error');
          setIfPaypalLoad(false);
        } else if (networkError) {
          notify('Please check your network connection!', 'error');
        }
      },
    }
  );

  const validateTerms = (e) => {
    const termsCondition = document.getElementById('termsPayPal');
    if (termsCondition.checked !== true) {
      seterrorMsg2('This is a required field');
      e.preventDefault();
    } else {
      seterrorMsg2('');
    }
  };
  /* End PayPal Button Generation */

  /**
   * provideSliGtmValue
   * pm70-19-01-21
   * @param {*} allItems,
   */
  const provideSliGtmValue = (orderId) => {
    const cartPrice = cartInfo.cart.prices;
    const cartShipping = cartInfo.cart.shipping_addresses[0];
    try {
      window.sliSpark('sli:setAction', 'purchase', {
        id: orderId,
        revenue: cartPrice.subtotal_excluding_tax.value,
        tax:
          cartPrice.applied_taxes.length > 0
            ? cartPrice.applied_taxes[0].amount.value
            : 0,
        shipping: cartShipping.selected_shipping_method.amount.value,
        currency: cartPrice.grand_total.currency,
      });
    } catch (error) {}
  };
  /** Pyment success provide GTM Value handling */
  const provideGtmValue = (orderId) => {
    const paymentSuccessGTMdata = {
      event: 'purchase',
      ecommerce: {
        currencyCode: cartInfo.cart.prices.grand_total.currency,
        purchase: {
          actionField: {
            id: orderId, // The unique order ID of the transaction. Should match the actual ID of the order.
            affiliation: 'Accuride PWA', // Extra details about where the purchase happened.
            revenue: cartInfo.cart.prices.subtotal_excluding_tax.value, // Total transaction value.
            shipping:
              cartInfo.cart.shipping_addresses[0].selected_shipping_method
                .amount.value, // Cost of shipping.
          },
          products: gtmProducts,
        },
      },
    };

    provideSliGtmValue(orderId);
    GTMEventFn(paymentSuccessGTMdata);

    if (window && window.dataLayer) {
      let itemArr = [];
      if (cartInfo && cartInfo.cart && cartInfo.cart.items) {
        cartInfo.cart.items.map((eachItem) => {
          itemArr.push({
            id: eachItem.product.sku,
            google_business_vertical: 'retail',
          });
        });
      }
      function gtag() {
        window.dataLayer.push(arguments);
      }
      // Call gtag with the 'purchase' event and relevant arguments
      gtag('event', 'purchase', {
        value: cartInfo.cart.prices.subtotal_excluding_tax.value,
        items: itemArr,
      });
    }
  };

  // generate billing address dropdown list
  const generateBillingList = (address) => `
                ${address.firstname} ${address.lastname}
                ${address.street.join('')} 
                ${address.region.region} 
            `;

  //  API calling for get customerIp
  const [getClientIpAPIFn, { loading: getClientIpLoader }] = useManualQuery(
    getClientIpAPI.loc.source.body,
    {
      fetchPolicy: 'no-cache',
      onSuccess: (data) => {
        const dataClientIp = data.data;
        setClientIp(dataClientIp.getClientIp.ip);
      },
    }
  );
  //  API calling for get cybersource key
  const [generateCyberSourceKeyFn, { loading: generateKeyLoader }] =
    useManualQuery(generateCyberSourceKey.loc.source.body, {
      fetchPolicy: 'no-cache',
      onSuccess: (data) => {
        const datakey = data.data;
        const getdata = datakey.generateCyberSourceKey;
        setCSEncodedKey(getdata.keyId);
      },
    });

  const cybersourceCardListFn = () => {
    const userParseDetails = JSON.parse(userDetails);
    const customerId = decode(userParseDetails.customer_id);
    if (customerId) {
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY}`,
        },
      };

      const apiEndPoint = `${process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT}/rest/V1/tokenbase/search?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=${customerId}&searchCriteria[filter_groups][0][filters][0][condition_type]=finset`;

      axios
        .get(apiEndPoint, config)
        .then((response) => {
          if (response.status === 200) {
            const allCards = response.data.items;
            setSavedCardList(allCards);
          }
        })
        .catch((error) => {
          notify(error, 'error');
        });
    }
  };

  //  API calling for get billing and shipping data on cart
  const [getCartAdressFn, { loading: cartLoading }] = useManualQuery(
    getCartAdress.loc.source.body,
    {
      fetchPolicy: 'no-cache',
      onSuccess: (res) => {
        const { data } = res;
        setshippingAddress(data.cart.shipping_addresses[0]);
        setbillingAddress(data.cart.billing_address);
      },
    }
  );

  //  API calling for place order
  const [placeOrderFn, { loading: placeorderLoading }] = useMutation(
    placeOrder.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
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
                // productsArr.push({ [`productName${index}`]: item.name, [`productId${index}`]: item.uid, [`unitPrice${index}`]: item.price_range.minimum_price.final_price.value})
                paramsObject[`productName${index + 1}`] = item.product.name;
                paramsObject[`productId${index + 1}`] = item.product.sku;
                paramsObject[`unitPrice${index + 1}`] =
                  item.product.price_range.minimum_price.final_price.value;
                paramsObject[`productQuantity${index + 1}`] = item.quantity;
                return true;
              });
            }
            factors.track('orderPlaced', paramsObject);
            console.log('orderPlaced', paramsObject);
          } catch (err) {
            console.error(err);
          }
        }
        provideGtmValue(data.placeOrder.order.order_number);
        notify('You order has been successfully placed.');
        simpleRedirect('/checkout/orderconfirmation');
        localStorage.setItem('orderid', data.placeOrder.order.order_number);
      },
    }
  );

  //  API calling for set billing address on cart
  const [setBillingAddressFn, { loading: setBillingLoader }] = useMutation(
    setBillingAddressOnCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setbillingAddress(data.setBillingAddressOnCart.cart.billing_address);
        setShowList(false);
        if (tokenId && PayerId) {
          // null
        } else {
          notify('Your billing address has been successfully updated');
        }
      },
    }
  );

  // API calling for newsletter subscription method
  const [newsletterSubscription] = useMutation(
    SEND_NEWSLETTER_SUBSCRIPTION.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        // API response check
        if (data) {
          if (data.newsletterSubscription.message.success !== null) {
            notify(data.newsletterSubscription.message.success, 'success');
          }
          if (data.newsletterSubscription.message.notice !== null) {
            notify(data.newsletterSubscription.message.notice, 'error');
          }
          if (data.newsletterSubscription.message.error !== null) {
            notify(data.newsletterSubscription.message.error, 'error');
          }
        }
      },
    }
  );

  const [setPaymentMethodOnCartFn, { loading: setPayment }] = useMutation(
    setPaymentMethodOnCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        // API response check
        if (data) {
          setAllCartData(data.setPaymentMethodOnCart);
          if (emailSubs) {
            newsletterSubscription({
              variables: { email: subscriberEmail },
            }).then(({ error }) => {
              if (error) {
                if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                  notify(error.graphQLErrors[0].message, 'error');
                } else {
                  notify('Please check your network connection!', 'error');
                }
              }
            });
          }
          const getCartId = data.setPaymentMethodOnCart.cart.id;
          const checkoutActonData = billingAddress;
          checkoutActonData.emailSubs = emailSubs;
          checkoutActonData.email = subscriberEmail;
          localStorage.setItem(
            'checkoutActonData',
            JSON.stringify(checkoutActonData)
          );
          placeOrderFn({ variables: { cartId: getCartId } }).then(
            ({ error }) => {
              if (error) {
                if (callFunction < 3) {
                  setCallFunction(callFunction + 1);
                } else if (
                  error.graphQLErrors &&
                  error.graphQLErrors.length > 0
                ) {
                  notify(error.graphQLErrors[0].message, 'error');
                } else {
                  notify('Please check your network connection!', 'error');
                }
              }
            }
          );
        }
      },
    }
  );

  useEffect(() => {
    if (allPaymentMethods.length > 0 && activeKey)
      setPaymentCode(allPaymentMethods[activeKey].code);
  }, [activeKey]);

  useEffect(() => {
    if (cartId && payPal) {
      getPaypalButton({ variables: { cart: cartId } }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            setPayPal(false);
            document.querySelector('#customRadio-1').checked = true;
            document.querySelector('#customRadio-1').click();
            notify(error.graphQLErrors[0].message, 'error');
          } else {
            notify('Please check your network connection!', 'error');
          }
        }
      });
    }
  }, [payPal]);

  //  API calling for Fetch checkout config
  const [tokenBaseCheckoutConfigFn, { loading: tokenBaseLoader }] =
    useManualQuery(tokenBaseCheckoutConfig.loc.source.body, {
      fetchPolicy: 'no-cache',
      onSuccess: (res) => {
        const { data } = res;
        const getData = data.tokenBaseCheckoutConfig;
        setParadoxUrl(getData);
      },
    });

  const [createKlarnaPaymentsSessionFn, { loading: klarnaSessionLoading }] =
    useMutation(createKlarnaPaymentsSession.loc.source.body, {
      credentials: 'include',
      fetchPolicy: 'no-cache',
      onSuccess: (data) => {
        const res = data.data;
        const allMethods = allPaymentMethods;
        const paymentMethodCategories =
          res.createKlarnaPaymentsSession.payment_method_categories;
        paymentMethodCategories.map((item) => {
          allMethods.push({
            code: item.identifier,
            title: item.name,
            __typename: item.__typename,
          });
          return true;
        });
        setAllPaymentMethods(allMethods);
        setKlarnaClientToken(res.createKlarnaPaymentsSession.client_token);
      },
    });

  useEffect(() => {
    createKlarnaPaymentsSessionFn({ variables: { cartId } }).then(
      ({ error }) => {
        if (error) {
          setKlarnaClientToken(null);
        }
      }
    );
    tokenBaseCheckoutConfigFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
    generateCyberSourceKeyFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
    getClientIpAPIFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  }, []);

  useEffect(() => {
    if (callFunction > 0 && callFunction < 3) {
      if (tokenId && PayerId) {
        setPaymentMethodOnCartFn({
          variables: {
            cartId,
            paymentMethod: {
              code: 'paypal_express',
              paypal_express: {
                payer_id: PayerId,
                token: tokenId,
              },
            },
          },
        }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, 'error');
            } else {
              notify('Please check your network connection!', 'error');
            }
          }
        });
      }
    }
  }, [callFunction]);
  useEffect(() => {
    if (tokenId && PayerId && billingAddress) {
      setPaymentMethodOnCartFn({
        variables: {
          cartId,
          paymentMethod: {
            code: 'paypal_express',
            paypal_express: {
              payer_id: PayerId,
              token: tokenId,
            },
          },
        },
      }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, 'error');
          } else {
            notify('Please check your network connection!', 'error');
          }
        }
      });
    }
  }, [tokenId, PayerId, billingAddress]);

  useEffect(() => {
    if (
      paradoxUrl &&
      paradoxUrl.fingerprintUrl.length > 0 &&
      paradoxUrl.cardinalScript.length > 0
    ) {
      const cardinalScript = document.createElement('script');
      cardinalScript.type = 'text/javascript';
      cardinalScript.src = paradoxUrl.cardinalScript;
      cardinalScript.nonce = 't+ZE/8zrvyit6T3ybc82KQ==';
      document.head.appendChild(cardinalScript);

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = paradoxUrl.fingerprintUrl;
      document.head.appendChild(script);
    }
  }, [paradoxUrl]);

  useEffect(() => {
    if (klarnaClientToken) {
      const klarnaScript = document.createElement('script');
      klarnaScript.type = 'text/javascript';
      klarnaScript.src = 'https://x.klarnacdn.net/kp/lib/v1/api.js';
      document.head.appendChild(klarnaScript);
    }
  }, [klarnaClientToken]);

  // -- update billing address id on cart ---
  const updateBillingAddress = () => {
    setBillingAddressFn({
      variables: {
        cartId,
        billingAddress: { customer_address_id: billingAddId },
      },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  };

  /** on blur and on key each form field check validation */
  const savedCardHandler = (evnt) => {
    if (evnt.target.value !== '') {
      setSelectedSavedCard(JSON.parse(evnt.target.value));
      setSavedCardMode(true);
    } else {
      setSelectedSavedCard('');
      setSavedCardMode(false);
    }
  };

  /** on blur and on key each form field check validation */
  const typeHandler = (evnt) => {
    setcardType(evnt.target.value);
    setCardNumber('');
    setCardMonth('');
    setCardYear('');
    setCheckedMode(false);
    setCvv('');
    setSubscriptionId('new');
  };

  /**
   * cvv Validation from form subittion and field change
   * @param {*} e
   */
  const cvvValidation = (targetObj, isInputGroup) => {
    let returnVal = true;
    if (targetObj.name === 'cc_cid') {
      if (
        (targetObj.value.length !== 3 && cardType !== 'AE') ||
        (targetObj.value.length !== 4 && cardType === 'AE')
      ) {
        targetObj.classList.add('is-invalid');
        if (isInputGroup) {
          targetObj.parentElement.classList.add('is-invalid');
        }
        returnVal = false;
      } else {
        targetObj.classList.remove('is-invalid');
        if (isInputGroup) {
          targetObj.parentElement.classList.remove('is-invalid');
        }
      }
    }
    return returnVal;
  };

  const validationFormField = (e) => {
    const targetObj = e.target;
    if (
      targetObj.required &&
      targetObj.value.trim() === '' &&
      (targetObj.type === 'text' || targetObj.type === 'textarea')
    ) {
      targetObj.value = '';
    }
    const isInputGroup =
      targetObj.parentElement.classList.contains('input-group');

    if (targetObj.value === '') {
      targetObj.classList.add('is-invalid');
      if (isInputGroup) {
        targetObj.parentElement.classList.add('is-invalid');
      }
    } else {
      targetObj.classList.remove('is-invalid');
      if (isInputGroup) {
        targetObj.parentElement.classList.remove('is-invalid');
      }
    }
    if (targetObj.name === 'cc_number') {
      let curCardType = '';
      let numDigit = 0;
      let cardt;
      if (targetObj.value.length > 0) {
        cardt = creditCardType(targetObj.value);
        if (cardt.length > 0) {
          curCardType = cardt[0].niceType.toLowerCase();
          numDigit = cardt[0].lengths;
        } else {
          notify('Invalid card number!', 'warn');
        }
      }
      if (
        curCardType === 'american express' ||
        curCardType === 'visa' ||
        curCardType === 'mastercard' ||
        curCardType === 'discover'
      ) {
        targetObj.classList.remove('is-invalid');
        setMinLength(numDigit[0]);
        if (numDigit.length > 1) setMaxLength(numDigit[numDigit.length - 1]);
        else setMaxLength(numDigit[0]);

        if (curCardType === 'american express') setcardType('AE');
        else if (curCardType === 'visa') setcardType('VI');
        else if (curCardType === 'mastercard') setcardType('MC');
        else if (curCardType === 'discover') setcardType('DI');
      } else {
        targetObj.classList.add('is-invalid');
        setcardType('');
        setMinLength(0);
        setMaxLength(20);
        if (curCardType !== '' && cardt.length > 0) {
          notify(`${cardt[0].niceType} type card is not acceptable!`, 'warn');
        }
      }
      if (
        targetObj.value.length < minLength ||
        targetObj.value.length > maxLength
      ) {
        targetObj.classList.add('is-invalid');
        if (isInputGroup) {
          targetObj.parentElement.classList.add('is-invalid');
        }
      }
    }
    if (targetObj.name === 'cc_cid') cvvValidation(targetObj, isInputGroup);
  };

  const replaceTextValue = (e) => {
    const targetObj = e.target;
    if (targetObj.name === 'cc_number' || targetObj.name === 'cc_cid') {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, '');
    }
    if (targetObj.name === 'cc_number') {
      setCardNumber(targetObj.value);
    }
  };
  const placeOrderHandler = (event) => {
    event.preventDefault();
    let cvvValidRes = true;
    const formName = [
      'cc_number',
      'cc_type',
      'expiration',
      'expiration_yr',
      'cc_cid',
      'save_card',
      'subscription_id',
    ];
    const cardObj = cardFormObj.current;
    const cardDetails = {
      code: 'magedelight_cybersource',
      magedelight_cybersource: {},
    };
    if (myPaymentMethod) {
      switch (myPaymentMethod) {
        case '1': {
          const tarms = document.getElementById('terms');
          if (tarms && !tarms.checked) {
            tarms.parentElement.classList.add('is-invalid');
          }
          break;
        }
        case '3': {
          const klarna1Trms = document.getElementById('klarna1Terms');
          if (klarna1Trms && !klarna1Trms.checked) {
            klarna1Trms.parentElement.classList.add('is-invalid');
          }
          break;
        }
        case '4': {
          const klarna2Terms = document.getElementById('klarna2Terms');
          if (klarna2Terms && !klarna2Terms.checked) {
            klarna2Terms.parentElement.classList.add('is-invalid');
          }
          break;
        }
        default:
      }
    }

    ifCyberSourceLoad &&
      formName.map((fieldName) => {
        const formField = cardObj[fieldName];
        const isInputGroup =
          formField.parentElement.classList.contains('input-group');
        if (formField.type === 'checkbox') {
          cardDetails.magedelight_cybersource = {
            ...cardDetails.magedelight_cybersource,
            [fieldName]: JSON.stringify(formField.checked),
          };
        } else {
          cardDetails.magedelight_cybersource = {
            ...cardDetails.magedelight_cybersource,
            [fieldName]: formField.value,
          };
        }
        if (formField.value === '' && formField.required) {
          formField.classList.add('is-invalid');
          if (isInputGroup) {
            formField.parentElement.classList.add('is-invalid');
          }
        }
        if (formField.name === 'cc_cid') {
          cvvValidRes = cvvValidation(formField, isInputGroup);
        }
        return cardDetails;
      });

    switch (myPaymentMethod) {
      case '1': {
        if (
          cvvValidRes &&
          termsCondi &&
          (cardObj.checkValidity() || selectedSavedCard.hash)
        ) {
          setBussyPayment(true);
          setValidated(false);
          if (cardNumber && cardNumber.length > 4) {
            // New Card Entry
            setCallCreateToken(true);
          } else {
            // Select from save card list
            setCallCardinalProcess(true);
          }
        } else {
          setValidated(false);
          setBussyPayment(false);
        }
        break;
      }
      case '3': {
        if (termsCondi) {
          setValidated(false);
          if (billingAddress && klarnaClientToken) {
            setCallKlarnaInitFn(true);
          }
        } else {
          setValidated(false);
          setBussyPayment(false);
        }
        break;
      }
      case '4': {
        if (termsCondi) {
          setValidated(false);
          if (billingAddress && klarnaClientToken) {
            setCallKlarnaInitFn(true);
          }
        } else {
          setValidated(false);
          setBussyPayment(false);
        }
        break;
      }
      default: {
        setValidated(false);
        setBussyPayment(false);
      }
    }
  };

  const getCardTypes = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/all/V1/cardtypes/availablecardtypes`
      )
      .then((response) => {
        if (response.status === 200) {
          setcardList(response.data);
        }
      })
      .catch((error) => {
        notify(error, 'error');
      });
  };

  useEffect(() => {
    if (defaultBill && shippingAddress) {
      const bill = { ...shippingAddress };
      delete bill.available_shipping_methods;
      delete bill.selected_shipping_method;
      delete bill.__typename;
      delete bill.region_id;
      bill.save_in_address_book = false;
      bill.country_code = bill.country.code;
      delete bill.country;
      bill.region = bill.region.code;
      bill.street = bill.street.join(' ');
      setBillingAddressFn({
        variables: { cartId, billingAddress: { address: bill } },
      }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, 'error');
          } else {
            notify('Please check your network connection!', 'error');
          }
        }
      });
    }
  }, [defaultBill, shippingAddress]);

  /**
   * to check whether the logged in user
   * is asking to add new address or not
   */
  useEffect(() => {
    if (billingAddId === 'new-address') setnewAddressMode(true);
    else setnewAddressMode(false);
  }, [billingAddId]);

  /**
   * to fill up the card form
   */
  useEffect(() => {
    if (selectedSavedCard !== '') {
      setcardType(selectedSavedCard.additional_object.cc_type);
      setCardNumber(selectedSavedCard.additional_object.cc_last4);
      setCardMonth(selectedSavedCard.additional_object.cc_exp_month);
      setCardYear(selectedSavedCard.additional_object.cc_exp_year);
      setCheckedMode(false);
      setCvv('');

      setSubscriptionId(selectedSavedCard.subscription_id);
    } else {
      // reset card form
      setcardType('');
      setCardNumber('');
      setCardMonth('');
      setCardYear('');
      setCheckedMode(false);
      setCvv('');
      setSubscriptionId('new');
    }
  }, [selectedSavedCard]);

  /**
   * To call the saed cart address list
   */
  useEffect(() => {
    if (token) cybersourceCardListFn();
    getCartAdressFn({ variables: { cartId } }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
    getCardTypes();
  }, []);

  const triggerPaymentMethod = (getVal) => {
    if (
      getVal &&
      document.getElementById(`customRadio-${getVal}`) &&
      getVal > 0
    ) {
      document.getElementById(`customRadio-${getVal}`).click();
    }
  };

  const selectPaymentMethod = (e) => {
    if (document.getElementById('klarna-payments-container'))
      document.getElementById('klarna-payments-container').innerHTML = '';
    if (document.getElementById('klarna2-payments-container'))
      document.getElementById('klarna2-payments-container').innerHTML = '';
    const radioButStatus = document.querySelector(
      'input[type=radio][name=SelectPaymentMethod]:checked'
    );
    let methodFormCheckVal = e.target.getAttribute('value');
    if (methodFormCheckVal === myPaymentMethod) {
      radioButStatus.checked = false;
      methodFormCheckVal = '0';
      setMyPaymentMethod(null);
    } else {
      setMyPaymentMethod(methodFormCheckVal);
    }
    if (methodFormCheckVal === '1') {
      if (window && window.Cardinal) setIfCyberSourceLoad(true);
      else setIfCyberSourceLoad(false);
      setPayPal(false);
      setKlarna(false);
      setKlarna2(false);
      setCreditDebit(true);
    } else if (methodFormCheckVal === '2') {
      setCreditDebit(false);
      setKlarna(false);
      setKlarna2(false);
      setPayPal(true);
    } else if (methodFormCheckVal === '3') {
      if (window && window.Klarna) setIfKlarnaLoad(true);
      else setIfKlarnaLoad(false);
      setCreditDebit(false);
      setPayPal(false);
      setKlarna2(false);
      setKlarna(true);
    } else if (methodFormCheckVal === '4') {
      if (window && window.Klarna) setIfKlarnaLoad(true);
      else setIfKlarnaLoad(false);
      setCreditDebit(false);
      setPayPal(false);
      setKlarna(false);
      setKlarna2(true);
    } else {
      setCreditDebit(false);
      setPayPal(false);
      setKlarna(false);
      setKlarna2(false);
    }
  };
  return (
    <section className="acc-payment-method">
      {/* header start */}
      <header
        className={`mb-3 mt-xl-3 ${
          windowObj && windowSize.width > 1024
            ? 'border-bottom border-medium'
            : ''
        }`}
      >
        <h2
          className={`mb-0 ${
            windowObj && windowSize.width > 1024
              ? 'text-uppercase text-primary pb-2'
              : 'text-dark'
          }`}
        >
          Shipping Address
        </h2>
      </header>
      {/* header end */}
      {shippingAddress ? (
        <article className="acc-address mb-3">
          <h4 className="mb-3 text-uppercase text-dark">{`${shippingAddress.firstname} ${shippingAddress.lastname}`}</h4>
          <span className="d-block text-dark">
            {shippingAddress.street.join(' ')}
          </span>
          <span className="d-block text-dark">{shippingAddress.city}</span>
          <span className="d-block text-dark">{`${shippingAddress.region.code} ${shippingAddress.country.label} ${shippingAddress.postcode}`}</span>
          <a
            aria-label="link"
            className="d-block text-primary mt-3"
            href={`tel:${shippingAddress.telephone}`}
            data-rel="external"
          >
            {shippingAddress.telephone}
          </a>
          <I18nLink href="/checkout/shipping">
            <Button variant="secondary" className="p-1 acc-action rounded-0">
              <ReactSVG
                src="/assets/images/icons/edit.svg"
                className="acc-payment-edit-icon"
              />
            </Button>
          </I18nLink>
        </article>
      ) : (
        ''
      )}

      <Form.Check custom type="checkbox" id="billing">
        <Form.Check.Input
          type="checkbox"
          checked={defaultBill}
          onChange={(e) => setDefaultBill(e.target.checked)}
        />
        <Form.Check.Label>
          My Billing &amp; Shipping Address are same
        </Form.Check.Label>
      </Form.Check>

      {defaultBill ? (
        <>
          {/* don't need to show the same address if
                        the billing and shipping address are same */}
        </>
      ) : (
        <div className="mt-3 mt-xl-5">
          {/* header start */}
          <header
            className={`mb-3 ${
              windowObj && windowSize.width > 1024
                ? 'border-bottom border-medium'
                : ''
            }`}
          >
            <h2
              className={`mb-0 ${
                windowObj && windowSize.width > 1024
                  ? 'text-uppercase text-primary pb-2'
                  : 'text-dark'
              }`}
            >
              Billing Address
            </h2>
          </header>
          {/* header end */}
          {token ? (
            <>
              {billingAddress && !showList ? (
                <article className="acc-address mt-3">
                  <h4 className="mb-3 text-uppercase text-dark">{`${billingAddress.firstname} ${billingAddress.lastname}`}</h4>
                  <span className="d-block text-dark">
                    {billingAddress.street.join(' ')}
                  </span>
                  <span className="d-block text-dark">
                    {billingAddress.city}
                  </span>
                  <span className="d-block text-dark">{`${billingAddress.region.code} ${billingAddress.country.label} ${billingAddress.postcode}`}</span>
                  <a
                    className="d-block text-primary mt-3"
                    href={`tel:${billingAddress.telephone}`}
                    data-rel="external"
                  >
                    {billingAddress.telephone}
                  </a>

                  <Button
                    variant="secondary"
                    onClick={() => {
                      setShowList(true);
                    }}
                    className="p-1 acc-action rounded-0"
                  >
                    <ReactSVG
                      src="/assets/images/icons/edit.svg"
                      className="acc-payment-edit-icon"
                    />
                  </Button>
                </article>
              ) : (
                <>
                  {!newAddressMode ? (
                    <article className="acc-address mt-3">
                      <Form.Control
                        as="select"
                        defaultValue={billingAddId}
                        onChange={(e) => {
                          setbillingAddId(e.target.value);
                        }}
                      >
                        {addressList.map((billAdd) => (
                          <option key={billAdd.id} value={billAdd.id}>
                            {generateBillingList(billAdd)}
                          </option>
                        ))}
                        <option key="null" value="new-address">
                          Add New Address
                        </option>
                      </Form.Control>
                      <Button
                        variant="primary"
                        className="text-uppercase mt-3 mr-2"
                        size="sm"
                        onClick={() => {
                          updateBillingAddress();
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        variant="secondary"
                        className="text-uppercase mt-3"
                        size="sm"
                        onClick={() => {
                          setShowList(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </article>
                  ) : (
                    /* new address form start for guest user */
                    <div className="shippingAddBlock mt-3">
                      <NewAddress
                        refreshList={(data) => {
                          setAddressList(data);
                        }}
                        closeModal={closeNewAddress}
                        editMode={null}
                        guestMode={false}
                        newMode={false}
                      />
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {billingAddress && !showGuestForm ? (
                <article className="acc-address mt-3">
                  <h4 className="mb-3 text-uppercase text-dark">{`${billingAddress.firstname} ${billingAddress.lastname}`}</h4>
                  <span className="d-block">
                    {billingAddress.street.join(' ')}
                  </span>
                  <span className="d-block">{billingAddress.city}</span>
                  <span className="d-block text-primary">{`${billingAddress.region.code} ${billingAddress.country.label} ${billingAddress.postcode}`}</span>
                  <span className="d-block text-primary">
                    {billingAddress.telephone}
                  </span>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setGuestForm(true);
                    }}
                    className="p-1 acc-action rounded-0"
                  >
                    <ReactSVG
                      src="/assets/images/icons/edit.svg"
                      className="acc-payment-edit-icon"
                    />
                  </Button>
                </article>
              ) : (
                /* new address form start for guest user */
                <div className="shippingAddBlock mt-3">
                  <NewAddress
                    setbillingAddress={setbillingAddress}
                    billingAddress={billingAddress}
                    closeModal={handleClose}
                    editMode={null}
                    guestMode
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
      <div className="mt-3 mt-xl-5 acc-payment-method-choose-sec">
        <header
          className={`mb-3 mt-xl-3 ${
            windowObj && windowSize.width > 1024
              ? 'border-bottom border-medium'
              : ''
          }`}
        >
          <h2
            className={`mb-0 ${
              windowObj && windowSize.width > 1024
                ? 'text-uppercase text-primary pb-2'
                : 'text-dark'
            }`}
          >
            Payment Methods
          </h2>
        </header>

        <article>
          <Form
            ref={cardFormObj}
            name="cardFormObj"
            noValidate
            validated={validated}
            onSubmit={placeOrderHandler}
            className="mt-3"
          >
            <div role="button" className="d-flex align-items-center">
              <Form.Check
                type="radio"
                name="SelectPaymentMethod"
                custom
                id="customRadio-1"
                value="1"
                defaultChecked={creditDebit}
                onClick={selectPaymentMethod}
              />
              <NextImage
                src="/assets/images/icons/card-default-color.svg"
                alt="Credit/Debit Card"
                onClick={() => triggerPaymentMethod(1)}
                width={58}
                height={37}
                objectFit="contain"
              />
              <Form.Label
                className="m-0 pl-3 font-weight-bold"
                onClick={() => triggerPaymentMethod(1)}
              >
                Credit/Debit Card
              </Form.Label>
            </div>
            <div
              className={`${
                creditDebit === true
                  ? 'credit-debit-sec-show'
                  : 'credit-debit-sec-hide'
              }`}
            >
              {/* card information start */}
              {ifCyberSourceLoad ? (
                <>
                  <Form.Row className="acc-card-width">
                    {/* saved card list */}
                    {token ? (
                      <Form.Group as={Col} sm={6}>
                        <Form.Label>Select From Saved Card</Form.Label>
                        <Form.Control
                          as="select"
                          value={
                            selectedSavedCard !== ''
                              ? JSON.stringify(selectedSavedCard)
                              : ''
                          }
                          onChange={savedCardHandler}
                        >
                          {savedCardList.map((item) => [
                            Number(item.active) === 1 &&
                            item.additional_object.cc_last4 ? (
                              <option
                                key={item.id}
                                value={JSON.stringify(item)}
                              >
                                {`XXXX-${item.additional_object.cc_last4} ${item.address_object.firstname} ${item.address_object.lastname}`}
                              </option>
                            ) : null,
                          ])}
                          <option key="none" value="">
                            Use other card
                          </option>
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                          This is a required field.
                        </Form.Control.Feedback>
                      </Form.Group>
                    ) : (
                      ''
                    )}

                    {/* card type */}
                    <Form.Group as={Col} sm={6} hidden={savedCardMode}>
                      <Form.Label>Credit Card Type</Form.Label>
                      <Form.Control
                        name="cc_type"
                        as="select"
                        value={cardType}
                        onChange={typeHandler}
                      >
                        <option key="none" value="">
                          --- Select a card type ---
                        </option>
                        {cardList.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        This is a required field.
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* card number */}
                    <Form.Group as={Col} sm={12} hidden={savedCardMode}>
                      <Form.Label>
                        Card Number
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="cardNumber"
                          name="cc_number"
                          required
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                          }}
                          pattern={`.{${minLength},${maxLength}}`}
                          onBlur={validationFormField}
                          onKeyUp={(e) => {
                            validationFormField(e);
                            replaceTextValue(e);
                          }}
                        />
                        <InputGroup.Append className="cardPosition">
                          {cardType === 'VI' ? <FaCcVisa /> : ''}
                          {cardType === 'AE' ? <FaCcAmex /> : ''}
                          {cardType === 'MC' ? <FaCcMastercard /> : ''}
                          {cardType === 'DI' ? <FaCcDiscover /> : ''}
                          {cardType === '' ? <FaCreditCard /> : ''}
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid number in this field.
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* expiry date */}
                    <Form.Group as={Col} xs={6} hidden={savedCardMode}>
                      <Form.Label>
                        Expiration Date
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        name="expiration"
                        as="select"
                        value={cardMonth}
                        required
                        onChange={(e) => {
                          setCardMonth(e.target.value);
                        }}
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      >
                        <option key="null" value="">
                          -- select month --
                        </option>
                        {monthList.map((item) => (
                          <option key={item + item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        This is a required field.
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col} xs={6} hidden={savedCardMode}>
                      <Form.Label>&nbsp;</Form.Label>
                      <Form.Control
                        name="expiration_yr"
                        as="select"
                        value={cardYear}
                        required
                        onChange={(e) => {
                          setCardYear(e.target.value);
                        }}
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      >
                        <option key="null" value="">
                          -- select year --
                        </option>
                        {yearList.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback type="invalid">
                        This is a required field.
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* CVV number */}
                    <Form.Group as={Col} xs={6}>
                      <Form.Label>
                        CVV Number
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <InputGroup>
                        {cardType === 'AE' ? (
                          <Form.Control
                            name="cc_cid"
                            type="password"
                            pattern="([0-9]{4})"
                            required
                            value={cvv}
                            onChange={(e) => {
                              setCvv(e.target.value);
                            }}
                            onBlur={validationFormField}
                            onKeyUp={(e) => {
                              validationFormField(e);
                              replaceTextValue(e);
                            }}
                            autoComplete="false"
                          />
                        ) : (
                          <Form.Control
                            name="cc_cid"
                            type="password"
                            pattern="([0-9]{3})"
                            required
                            value={cvv}
                            onChange={(e) => {
                              setCvv(e.target.value);
                            }}
                            onBlur={validationFormField}
                            onKeyUp={(e) => {
                              validationFormField(e);
                              replaceTextValue(e);
                            }}
                          />
                        )}

                        <InputGroup.Append>
                          <OverlayTrigger
                            placement="top"
                            trigger="focus"
                            overlay={
                              <Tooltip>
                                Card Verification Number Visual Reference
                              </Tooltip>
                            }
                          >
                            <Button variant="outline-dark">
                              <FaQuestion />
                            </Button>
                          </OverlayTrigger>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid number in this field.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Control
                      name="subscription_id"
                      type="text"
                      hidden
                      value={subscriptionId}
                      onChange={() => {}}
                    />

                    {/* save card */}
                    <Form.Group
                      as={Col}
                      xs={12}
                      className="mt-3"
                      hidden={!token || savedCardMode}
                    >
                      <Form.Check custom type="checkbox" id="savecard">
                        <Form.Check.Input
                          type="checkbox"
                          name="save_card"
                          checked={checkedMode}
                          onChange={(e) => {
                            setCheckedMode(e.target.checked);
                          }}
                        />
                        <Form.Check.Label>
                          <span className="font-weight-bold">Note: </span>
                          Save this credit card for future use.
                        </Form.Check.Label>
                      </Form.Check>
                    </Form.Group>

                    {/* subscribe for newsletter */}
                    <Form.Group as={Col} xs={12} className="mt-3">
                      <Form.Check custom type="checkbox" id="subs">
                        <Form.Check.Input
                          type="checkbox"
                          checked={emailSubs}
                          onChange={(e) => setEmailSubs(e.target.checked)}
                        />
                        <Form.Check.Label>
                          Subscribe for Newsletter
                        </Form.Check.Label>
                        <Form.Text>
                          <em>
                            Yes, I want Accuride to send me occasional emails
                          </em>
                        </Form.Text>
                      </Form.Check>
                    </Form.Group>

                    {/* terms and condition */}
                    <Form.Group as={Col} xs={12} className="mb-0">
                      <Form.Check custom type="checkbox" id="terms">
                        <InputGroup className="d-flex">
                          <Form.Check.Input
                            onBlur={validationFormField}
                            onKeyUp={validationFormField}
                            type="checkbox"
                            required
                            checked={termsCondi}
                            onChange={(e) => setTermsCondi(e.target.checked)}
                          />
                          <Form.Check.Label className="whitespace-nowrap mb-1">
                            I ACCEPT THE{' '}
                            <a
                              href="#"
                              aria-label="terms"
                              onClick={handleShow}
                              className="whitespace-nowrap font-weight-bold text-primary mb-1 cursor-pointer"
                            >
                              TERMS AND CONDITIONS
                            </a>
                            <span className="text-danger"> *</span>
                          </Form.Check.Label>
                        </InputGroup>
                        <Form.Control.Feedback type="invalid">
                          This is a required field.
                        </Form.Control.Feedback>
                      </Form.Check>
                    </Form.Group>
                  </Form.Row>
                  <Button
                    disabled={bussyPayment}
                    type="submit"
                    variant="secondary"
                    block={!(windowObj && windowSize.width >= 768)}
                    className="text-uppercase mt-3"
                    size="lg"
                  >
                    Place Order
                  </Button>
                </>
              ) : (
                <div className="d-flex align-items-center acc_not_found_review p-3 p-md-4 border rounded bg-light">
                  <ReactSVG
                    src="/assets/images/icons/maintenance.svg"
                    className="text-primary mr-3 mr-md-4 flex-shrink-0 acc-payment-maintenance-icon"
                  />
                  <p className="text-muted h5 mb-0">
                    Our credit card processor is doing routine maintenance.
                    Please use an alternate payment method or try again in a few
                    minutes.
                  </p>
                </div>
              )}
            </div>
            {/* Pay With PayPal Express Checkout */}
            <hr />
            <div className="d-flex align-items-center">
              <Form.Check
                type="radio"
                name="SelectPaymentMethod"
                custom
                id="customRadio-2"
                value="2"
                defaultChecked={payPal}
                onClick={selectPaymentMethod}
              />
              <NextImage
                src="/assets/images/icons/paypal-color.svg"
                alt="PayPal"
                onClick={() => triggerPaymentMethod(2)}
                width={58}
                height={37}
                objectFit="contain"
                className="border rounded cursor-pointer"
              />
              <Form.Label
                className="m-0 pl-3 font-weight-bold"
                onClick={() => triggerPaymentMethod(2)}
              >
                Pay with PayPal
              </Form.Label>
            </div>
            <div
              className={`${
                payPal === true ? 'paypal-sec-show' : 'paypal-sec-hide'
              }`}
            >
              {ifPaypalLoad ? (
                <>
                  {/* subscribe for newsletter */}
                  <Form.Group as={Col} xs={12}>
                    <Form.Check custom type="checkbox" id="subsPayPal">
                      <Form.Check.Input
                        type="checkbox"
                        checked={emailSubs}
                        onChange={(e) => setEmailSubs(e.target.checked)}
                      />
                      <Form.Check.Label>
                        Subscribe for Newsletter
                      </Form.Check.Label>
                      <Form.Text>
                        <em>
                          Yes, I want Accuride to send me occasional emails
                        </em>
                      </Form.Text>
                    </Form.Check>
                  </Form.Group>

                  {/* terms and condition */}
                  <Form.Group as={Col} xs={12} className="mb-0">
                    <Form.Check custom type="checkbox" id="termsPayPal">
                      <Form.Check.Input
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        type="checkbox"
                        required
                        checked={termsCondi}
                        onChange={(e) => setTermsCondi(e.target.checked)}
                      />
                      <Form.Check.Label className="whitespace-nowrap mb-1">
                        I ACCEPT THE{' '}
                        <a
                          href="#"
                          aria-label="terms"
                          onClick={handleShow}
                          className="whitespace-nowrap font-weight-bold text-primary mb-1 cursor-pointer"
                        >
                          TERMS AND CONDITIONS
                        </a>
                        <span className="text-danger"> *</span>
                      </Form.Check.Label>
                      <Form.Control.Feedback type="invalid">
                        This is a required field.
                      </Form.Control.Feedback>
                    </Form.Check>
                  </Form.Group>
                  <div className="text-danger font-size-sm pl-3">
                    {errorMsg2}
                  </div>
                  <div className="mt-4">
                    <a
                      href={PayPalUrl}
                      className="btn py-3 btn-lg btn-secondary btn-block"
                      onClick={validateTerms}
                    >
                      <NextImage
                        src="/assets/images/paypal-logo-for-button.png"
                        alt="PayPal"
                        width={100}
                        height={21}
                        objectFit="contain"
                        className="mx-auto"
                      />
                    </a>
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center acc_not_found_review p-3 p-md-4 border rounded bg-light">
                  <ReactSVG
                    src="/assets/images/icons/maintenance.svg"
                    className="text-primary mr-3 mr-md-4 flex-shrink-0 acc-payment-maintenance-icon"
                  />
                  <p className="text-muted h5 mb-0">
                    Paypal is undergoing maintenance. Please use an alternate
                    payment method or try again in a few minutes.
                  </p>
                </div>
              )}
            </div>
            {/* End Pay With PayPal Express Checkout */}
            <hr />
            {/* Klarna Starts */}
            {shippingAddress &&
            shippingAddress.country.code.toLowerCase() !== 'ca' &&
            allPaymentMethods &&
            allPaymentMethods.filter((item) => item.code === 'pay_later')
              .length > 0 ? (
              <>
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="radio"
                    name="SelectPaymentMethod"
                    custom
                    id="customRadio-3"
                    value="3"
                    defaultChecked={klarna}
                    onClick={selectPaymentMethod}
                  />
                  <NextImage
                    src="/assets/images/icons/klarna-logo.svg"
                    alt="Klarna"
                    width={58}
                    height={32}
                    objectFit="contain"
                    className="rounded"
                    onClick={() => triggerPaymentMethod(3)}
                    onKeyDown={() => triggerPaymentMethod(3)}
                    tabIndex={0}
                    role="button"
                  />
                  <Form.Label
                    className="m-0 pl-3 font-weight-bold"
                    tabIndex={0}
                    onClick={() => triggerPaymentMethod(3)}
                    onKeyDown={() => triggerPaymentMethod(3)}
                  >
                    Pay in 4 Installments (0% Interest)
                  </Form.Label>
                </div>
                <div
                  className={`${
                    klarna === true ? 'klarna1-sec-show' : 'klarna1-sec-hide'
                  }`}
                >
                  <div
                    id="klarna-payments-container"
                    className="w-auto text-left border-bottom"
                  />
                  {ifKlarnaLoad ? (
                    <>
                      {/* subscribe for newsletter  */}
                      <Form.Group as={Col} xs={12} className="mt-3">
                        <Form.Check custom type="checkbox" id="klarna1Subs">
                          <Form.Check.Input
                            type="checkbox"
                            checked={emailSubs}
                            onChange={(e) => setEmailSubs(e.target.checked)}
                          />
                          <Form.Check.Label>
                            Subscribe for Newsletter
                          </Form.Check.Label>
                          <Form.Text>
                            <em>
                              Yes, I want Accuride to send me occasional emails
                            </em>
                          </Form.Text>
                        </Form.Check>
                      </Form.Group>

                      {/* terms and condition  */}
                      <Form.Group as={Col} xs={12} className="mb-0">
                        <Form.Check custom type="checkbox" id="klarna1Terms">
                          <InputGroup className="d-flex">
                            <Form.Check.Input
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              type="checkbox"
                              required
                              checked={termsCondi}
                              onChange={(e) => setTermsCondi(e.target.checked)}
                            />
                            <Form.Check.Label className="whitespace-nowrap mb-1">
                              I ACCEPT THE{' '}
                              <a
                                href="#"
                                aria-label="terms"
                                onClick={handleShow}
                                className="whitespace-nowrap font-weight-bold text-primary mb-1 cursor-pointer"
                              >
                                TERMS AND CONDITIONS
                              </a>
                              <span className="text-danger"> *</span>
                            </Form.Check.Label>
                          </InputGroup>
                          <Form.Control.Feedback type="invalid">
                            This is a required field.
                          </Form.Control.Feedback>
                        </Form.Check>
                      </Form.Group>
                      <Button
                        disabled={bussyPayment}
                        type="submit"
                        variant="secondary"
                        block={!(windowObj && windowSize.width >= 768)}
                        className="text-uppercase mt-3"
                        size="lg"
                      >
                        Place Order
                      </Button>
                    </>
                  ) : (
                    <div className="d-flex align-items-center acc_not_found_review p-3 p-md-4 border rounded bg-light">
                      <ReactSVG
                        src="/assets/images/icons/maintenance.svg"
                        className="text-primary mr-3 mr-md-4 flex-shrink-0 acc-payment-maintenance-icon"
                      />
                      <p className="text-muted h5 mb-0">
                        Klarna is undergoing maintenance. Please use an
                        alternate payment method or try again in a few minutes.
                      </p>
                    </div>
                  )}
                </div>
                <hr />
              </>
            ) : null}
            {/* Kalarna Ends */}
            {/* Klarna 2 Starts */}
            {shippingAddress &&
            shippingAddress.country.code.toLowerCase() !== 'ca' &&
            allPaymentMethods &&
            allPaymentMethods.filter((item) => item.code === 'pay_over_time')
              .length > 0 ? (
              <>
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="radio"
                    name="SelectPaymentMethod"
                    custom
                    id="customRadio-4"
                    value="4"
                    defaultChecked={klarna2}
                    onClick={selectPaymentMethod}
                  />
                  <NextImage
                    src="/assets/images/icons/klarna-logo.svg"
                    alt="Klarna"
                    width={58}
                    height={32}
                    objectFit="contain"
                    className="rounded"
                    onClick={() => triggerPaymentMethod(4)}
                    onKeyDown={() => triggerPaymentMethod(4)}
                    tabIndex={0}
                    role="button"
                  />
                  <Form.Label
                    className="m-0 pl-3 font-weight-bold"
                    tabIndex={0}
                    onClick={() => triggerPaymentMethod(4)}
                    onKeyDown={() => triggerPaymentMethod(4)}
                  >
                    Buy Now. Pay Later.
                  </Form.Label>
                </div>
                <div
                  className={`${
                    klarna2 === true ? 'klarna2-sec-show' : 'klarna2-sec-hide'
                  }`}
                >
                  <div
                    id="klarna2-payments-container"
                    className="w-auto text-left border-bottom"
                  />
                  {ifKlarnaLoad ? (
                    <>
                      {/* subscribe for newsletter */}
                      <Form.Group as={Col} xs={12} className="mt-3">
                        <Form.Check custom type="checkbox" id="klarna2Subs">
                          <Form.Check.Input
                            type="checkbox"
                            checked={emailSubs}
                            onChange={(e) => setEmailSubs(e.target.checked)}
                          />
                          <Form.Check.Label>
                            Subscribe for Newsletter
                          </Form.Check.Label>
                          <Form.Text>
                            <em>
                              Yes, I want Accuride to send me occasional emails
                            </em>
                          </Form.Text>
                        </Form.Check>
                      </Form.Group>

                      {/* terms and condition */}
                      <Form.Group as={Col} xs={12} className="mb-0">
                        <Form.Check custom type="checkbox" id="klarna2Terms">
                          <InputGroup className="d-flex">
                            <Form.Check.Input
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              type="checkbox"
                              required
                              checked={termsCondi}
                              onChange={(e) => setTermsCondi(e.target.checked)}
                            />
                            <Form.Check.Label className="whitespace-nowrap mb-1">
                              I ACCEPT THE{' '}
                              <a
                                href="#"
                                aria-label="terms"
                                onClick={handleShow}
                                className="whitespace-nowrap font-weight-bold text-primary mb-1 cursor-pointer"
                              >
                                TERMS AND CONDITIONS
                              </a>
                              <span className="text-danger"> *</span>
                            </Form.Check.Label>
                          </InputGroup>
                          <Form.Control.Feedback type="invalid">
                            This is a required field.
                          </Form.Control.Feedback>
                        </Form.Check>
                      </Form.Group>
                      <Button
                        disabled={bussyPayment}
                        type="submit"
                        variant="secondary"
                        block={!(windowObj && windowSize.width >= 768)}
                        className="text-uppercase mt-3"
                        size="lg"
                      >
                        Place Order
                      </Button>
                    </>
                  ) : (
                    <div className="d-flex align-items-center acc_not_found_review p-3 p-md-4 border rounded bg-light">
                      <ReactSVG
                        src="/assets/images/icons/maintenance.svg"
                        className="text-primary mr-3 mr-md-4 flex-shrink-0 acc-payment-maintenance-icon"
                      />
                      <p className="text-muted h5 mb-0">
                        Klarna is undergoing maintenance. Please use an
                        alternate payment method or try again in a few minutes.
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : null}
            {/* Kalarna 2 Ends */}
          </Form>
        </article>
      </div>
      {window && window.Cardinal ? (
        <CyberSourceProcess
          setCardinalSessionId={setCardinalSessionId}
          setBussyPayment={setBussyPayment}
          provideGtmValue={provideGtmValue}
          setCardinalResJwt={setCardinalResJwt}
          setNewCardhash={setNewCardhash}
          setCallCardinalProcess={setCallCardinalProcess}
          setCallCreateToken={setCallCreateToken}
          generateCyberSourceKeyFn={generateCyberSourceKeyFn}
          tokenBaseCheckoutConfigFn={tokenBaseCheckoutConfigFn}
          getSessionData={handleSessionDataCyberSource}
          cardDetails={{
            cardNumber,
            cardTypeNum,
            cardType,
            cvv,
            cardMonth,
            cardYear,
            newCardhash,
            selectedSavedCard,
            savedCardList,
          }}
          allEmails={{ userEmail, emailSubs, subscriberEmail }}
          allAddresses={{ shippingAddress, billingAddress }}
          others={{
            checkedMode,
            CSEncodedKey,
            paradoxUrl,
            clientIp,
            callCreateToken,
            cardinalResJwt,
            cardinalSessionId,
            callCardinalProcess,
          }}
        />
      ) : null}

      {window && window.Klarna ? (
        <KlarnaProcess
          createKlarnaPaymentsSessionFn={createKlarnaPaymentsSessionFn}
          setBussyPayment={setBussyPayment}
          setCallKlarnaInitFn={setCallKlarnaInitFn}
          provideGtmValue={provideGtmValue}
          allAddresses={{ billingAddress }}
          setKlarnaClientToken={setKlarnaClientToken}
          allEmails={{ userEmail, emailSubs, subscriberEmail }}
          others={{
            klarnaClientToken,
            myPaymentMethod,
            callKlarnaInitFn,
            bussyPayment,
          }}
        />
      ) : null}

      {/* loading for api calling */}
      {klarnaSessionLoading ||
      loadingPaypal ||
      setBillingLoader ||
      placeorderLoading ||
      cartLoading ||
      setPayment ||
      bussyPayment ||
      generateKeyLoader ||
      tokenBaseLoader ||
      getClientIpLoader ? (
        <LoadingIndicator />
      ) : (
        ''
      )}
      {/* tandc Modal start */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="acc-custom-modal"
        size="xl"
      >
        {/* modal header start */}
        <Modal.Header className="bg-primary">
          <Button
            variant="link"
            className="acc-btn-close"
            onClick={handleClose}
          >
            <ReactSVG
              className="acc-filter-close acc-payment-close-icon"
              src="/assets/images/icons/close.svg"
            />
          </Button>
          <I18nLink href="/">
            <a aria-label="link" className="logo-icon">
              <ReactSVG
                className="fill-white acc-payment-logo-icon"
                src="/assets/images/accuride-logo-icon.svg"
              />
            </a>
          </I18nLink>
        </Modal.Header>
        {/* modal header end */}

        {/* modal body start */}
        <Modal.Body>
          <TermsAndConditions />
        </Modal.Body>
      </Modal>
      {/* END */}
      {/* Session modal start */}
      <Modal
        show={sessionModalOpen}
        // onHide={() => { setSessionModalOpen(false); }}
        dialogClassName="acc-custom-modal"
        bsclass="my-modal"
        size="md"
        backdrop="static"
        centered
      >
        {/* modal body start */}
        <Modal.Body className="p-2 text-center border border-primary">
          <h5 className="text-center pt-5 text-dark font-weight-bold pb-3">
            {' '}
            Your session will expire shortly. Once it does you will be logged
            out for security.{' '}
          </h5>
          <Button
            variant="primary"
            className="btn-lg mb-5"
            onClick={() => {
              router.reload();
            }}
          >
            I’m Still Here
          </Button>
        </Modal.Body>
        {/* modal body end */}
      </Modal>
      {/* Session modal end */}
    </section>
  );
};
export default PaymentMethod;
