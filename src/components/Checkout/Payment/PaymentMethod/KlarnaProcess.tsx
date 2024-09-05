import {
    useContext, useEffect,
} from 'react';
import { AuthContext } from '@Contexts/AuthContext';
import { useMutation } from 'graphql-hooks';
import { setPaymentMethodOnCartAndPlaceOrder } from '@Graphql/queries/setPaymentMethodOnCartAndPlaceOrder.graphql';

const KlarnaProcess = (props) => {
    const { allEmails, allAddresses, others } = props;
    const {
        notify, cartId, simpleRedirect, decode,
    } = useContext(AuthContext);

    const [klarnaPlaceOrderFn] = useMutation(setPaymentMethodOnCartAndPlaceOrder.loc.source.body, {
        onSuccess: (res) => {
            const { data } = res;
            const checkoutActonData = allAddresses.billingAddress;
            checkoutActonData.emailSubs = allEmails.emailSubs;
            checkoutActonData.email = allEmails.subscriberEmail;
            localStorage.setItem('checkoutActonData', JSON.stringify(checkoutActonData));

            const allCartData = data.setPaymentMethodOnCart;
            if (allCartData) {
                try {
                    const allItems = allCartData.cart.items;
                    const paramsObject = {
                        totalPrice: allCartData.cart.prices.grand_total.value,
                        emailID: allCartData.cart.email,
                        phoneNo: (allCartData.cart.shipping_addresses).length > 0 ? allCartData.cart.shipping_addresses[0].telephone : null,
                        name: (allCartData.cart.shipping_addresses).length > 0 ? `${allCartData.cart.shipping_addresses[0].firstname} ${allCartData.cart.shipping_addresses[0].lastname}` : null,
                        currency: allCartData.cart.prices.grand_total.currency,
                        ordeId: data.placeOrder.order.order_number,
                    };
                    if (allItems) {
                        allItems.map((item, index) => {
                            // productsArr.push({ [`productName${index}`]: item.name, [`productId${index}`]: item.uid, [`unitPrice${index}`]: item.price_range.minimum_price.final_price.value})
                            paramsObject[`productName${index + 1}`] = item.product.name;
                            paramsObject[`productId${index + 1}`] = item.product.sku;
                            paramsObject[`unitPrice${index + 1}`] = item.product.price_range.minimum_price.final_price.value;
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

            props.provideGtmValue(data.placeOrder.order.order_number);
            notify('You order has been successfully placed.');
            simpleRedirect('/checkout/orderconfirmation');
            localStorage.setItem('orderid', data.placeOrder.order.order_number);
        },
    });

    useEffect(() => {
        if (Number(others.myPaymentMethod) === 3 || Number(others.myPaymentMethod) === 4) {
            const paymentMethod = (Number(others.myPaymentMethod) === 4 ? 'pay_over_time' : 'pay_later');
            const getContainer = (Number(others.myPaymentMethod) === 4 ? '#klarna2-payments-container' : '#klarna-payments-container');
            const billAddress = {
                given_name: allAddresses.billingAddress.firstname,
                family_name: allAddresses.billingAddress.lastname,
                email: allEmails.userEmail,
                street_address: allAddresses.billingAddress.street[0],
                street_address2: allAddresses.billingAddress && allAddresses.billingAddress.street[1] ? allAddresses.billingAddress.street[1] : '',
                postal_code: allAddresses.billingAddress.postcode,
                city: allAddresses.billingAddress.city,
                region: allAddresses.billingAddress.region.code,
                phone: allAddresses.billingAddress.telephone,
                country: allAddresses.billingAddress.country.code,
            };
            window.Klarna.Payments.init({
                client_token: others.klarnaClientToken,
            });
            window.Klarna.Payments.load({
                container: getContainer,
                payment_method_category: paymentMethod,
            }, (res) => {
                if (others.callKlarnaInitFn) {
                    props.createKlarnaPaymentsSessionFn({ variables: { cartId } }).then(({ error }) => {
                        if (error) {
                            props.setKlarnaClientToken(null);
                        }
                    });
                    // =====authorize=======
                    window.Klarna.Payments.authorize({
                        payment_method_category: paymentMethod,
                    }, { // Data to be updated
                        billing_address: billAddress,
                    }, (authRes) => { // load~callback
                        if (authRes && authRes.approved) {
                            if (authRes.finalize_required) {
                                // =========finalize==========
                                window.Klarna.Payments.finalize({
                                    payment_method_category: paymentMethod,
                                }, { // Data to be updated
                                    billing_address: billAddress,
                                }, (getRes) => { // load~callback
                                    const getinput = {
                                        cart_id: cartId,
                                        payment_method: {
                                            code: `klarna_${paymentMethod}`,
                                            klarna: {
                                                authorization_token: `${authRes.authorization_token}`,
                                            },
                                        },
                                    };
                                    klarnaPlaceOrderFn({ variables: { getinput, cartId } }).then(({ error }) => {
                                        if (error) {
                                            props.setBussyPayment(false);
                                            props.setCallKlarnaInitFn(false);
                                            if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
                                                notify(error.graphQLErrors[0].message, 'error');
                                            } else {
                                                notify('Please check your network connection!', 'error');
                                            }
                                        }
                                    });
                                });
                            } else {
                                const getinput = {
                                    cart_id: cartId,
                                    payment_method: {
                                        code: `klarna_${paymentMethod}`,
                                        klarna: {
                                            authorization_token: `${authRes.authorization_token}`,
                                        },
                                    },
                                };
                                klarnaPlaceOrderFn({ variables: { getinput, cartId } }).then(({ error }) => {
                                    if (error) {
                                        props.setBussyPayment(false);
                                        props.setCallKlarnaInitFn(false);
                                        if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
                                            notify(error.graphQLErrors[0].message, 'error');
                                        } else {
                                            notify('Please check your network connection!', 'error');
                                        }
                                    }
                                });
                            }
                        } else {
                            props.setBussyPayment(false);
                            props.setCallKlarnaInitFn(false);
                            notify('Payment cancelled by customer', 'error');
                        }
                    });
                }
            });
        }
    }, [others.myPaymentMethod, others.bussyPayment, others.callKlarnaInitFn]);

    return null;
};

export default KlarnaProcess;
