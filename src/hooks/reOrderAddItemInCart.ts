import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@Contexts/AuthContext';
import { useRouter } from 'next/router';
import { useMutation, useManualQuery } from 'graphql-hooks';
import { addSimpleProduct } from '@Graphql/queries/addSimpleProduct.graphql';
import { addConfigurableProduct } from '@Graphql/queries/addConfigurableProduct.graphql';
import GET_CUSTOMER_ORDER_DETAILS from '@Graphql/queries/getCustomerOrderDetails.graphql';

const reOrderAddItemInCart = (data, customerMode) => {
    const {
        notify, addCart, cartId,
    } = useContext(AuthContext);
    const router = useRouter();

    /**
     * for completeAddcart status handling
    */
    const [completeHooks, setCompleteHooks] = useState(false);
    const [configureItemStatus, setConfigureItemStatus] = useState({ count: 0, totalCount: 0 });
    const [simpleItemStatus, setSimpleItemStatus] = useState({ count: 0, totalCount: 0 });
    const [statusAddCart, setStatusAddCart] = useState({});
    const [reorderCartQuery, setReorderQuery] = useState({});

    /**
      * ready Variable from order history for add item to Cart.
      */
    const readyVariableForAddCart = (orderHistoryItems) => {
        if (orderHistoryItems.length > 0) {
            const reorderQueryItems = {
                simpleCart: [],
                configureCart: [],
            };
            orderHistoryItems.forEach((item) => {
                if (item.product_type === 'simple' || item.product_type === 'grouped') {
                    const storeObj = {
                        sku: item.sku,
                        quantity: item.qty,
                    };
                    reorderQueryItems.simpleCart.push({ data: { ...storeObj } });
                }
                if (item.product_type === 'configurable') {
                    const storeObj = {
                        parent_sku: item.parent_sku,
                        data: {
                            sku: item.sku,
                            quantity: item.qty,
                        },
                    };
                    reorderQueryItems.configureCart.push(storeObj);
                }
            });
            if (Object.keys(reorderCartQuery).length === 0) {
                setReorderQuery({
                    ...reorderQueryItems,
                });
            }
        }
    };

    const [getCustomerOrder] = useManualQuery(GET_CUSTOMER_ORDER_DETAILS.loc.source.body, {
        onSuccess: (res) => {
            const orderDetails = res.data;
            readyVariableForAddCart(orderDetails.orderDetails.items);
        },
    });

    useEffect(() => {
        if (data && !customerMode) {
            getCustomerOrder({
                variables: {
                    id: data,
                },
            }).then(({ error }) => {
                if (error) {
                    if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
                        notify(error.graphQLErrors[0].message, 'error');
                    } else {
                        notify('Please check your network connection!', 'error');
                    }
                }
            });
        }
        if (data && customerMode === 'guestOrder') {
            readyVariableForAddCart(data);
        }
    }, [data]);

    /**
     * after successfull login.
     * guest cart and user cart data marging.
     * redirect page to my cart page.
    */
    const redirectPage = () => {
        window.location.href = `/${router.query.zone_lang}/checkout/cart`;
        // const asPath = `/${router.query.zone_lang}/checkout/cart`;
        // const pathName = '/[zone_lang]/checkout/cart';
        // router.push({ pathname: `${pathName}` }, (`${asPath}`), { shallow: true });
    };

    /**
     * graphql Query declare for simple product
     * when add to cart simple product
    */
    const [addSimpleProductFn, { error: simpleError }] = useMutation(addSimpleProduct.loc.source.body, {
        onSuccess: (data1) => {
            const simpleCartData = data1.data;
            addCart(simpleCartData.addSimpleProductsToCart.cart.total_quantity);
            setSimpleItemStatus({ ...simpleItemStatus, count: simpleItemStatus.count + 1 });
        },
    });

    /**
     * graphql Query declare for Configurable Product
     * when add to cart configurable product
    */
    const [addConfigurableProductFn, {
        error: configureError,
    }] = useMutation(addConfigurableProduct.loc.source.body, {
        onSuccess: (data1) => {
            const configureData = data1.data;
            addCart(configureData.addConfigurableProductsToCart.cart.total_quantity);
            setConfigureItemStatus({ ...configureItemStatus, count: configureItemStatus.count + 1 });
        },
    });

    useEffect(() => {
        if (Object.keys(reorderCartQuery).length > 0) {
            const newCartId = cartId;
            const configureCartList = reorderCartQuery.configureCart;
            if (configureItemStatus.totalCount !== configureItemStatus.count) {
                addConfigurableProductFn({
                    variables: { cartId: newCartId, cartItem: [configureCartList[configureItemStatus.count]] },
                }).then(({ error }) => {
                    if (error) {
                        if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
                            notify(error.graphQLErrors[0].message, 'error');
                        } else {
                            notify('Please check your network connection!', 'error');
                        }
                        setConfigureItemStatus({ ...configureItemStatus, count: configureItemStatus.count + 1 });
                    }
                });
            } else if ((configureItemStatus.totalCount === configureItemStatus.count)
                && (configureCartList.length === configureItemStatus.totalCount)) {
                setStatusAddCart({
                    ...statusAddCart,
                    configureCartAdd: true,
                });
            }
        }
    }, [configureItemStatus]);

    useEffect(() => {
        if (Object.keys(reorderCartQuery).length > 0) {
            const newCartId = cartId;
            const simpleCartList = reorderCartQuery.simpleCart;
            if (simpleItemStatus.totalCount !== simpleItemStatus.count) {
                addSimpleProductFn({
                    variables: { cartId: newCartId, cartItem: [simpleCartList[simpleItemStatus.count]] },
                }).then(({ error }) => {
                    if (error) {
                        if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
                            notify(error.graphQLErrors[0].message, 'error');
                        } else {
                            notify('Please check your network connection!', 'error');
                        }
                        setSimpleItemStatus({ ...simpleItemStatus, count: simpleItemStatus.count + 1 });
                    }
                });
            } else if ((simpleItemStatus.totalCount === simpleItemStatus.count)
                && (simpleCartList.length === simpleItemStatus.totalCount)) {
                setStatusAddCart({
                    ...statusAddCart,
                    simpleCartAdd: true,
                });
            }
        }
    }, [simpleItemStatus]);

    /**
     * add **re order items** simple, group and configure item in cart.
    */
    if (Object.keys(reorderCartQuery).length > 0 && !completeHooks) {
        setCompleteHooks(true);
        const simpleCartList = reorderCartQuery.simpleCart;
        const configureCartList = reorderCartQuery.configureCart;
        if (simpleCartList.length > 0 && !statusAddCart.simpleCartAdd) {
            setSimpleItemStatus({ count: 0, totalCount: simpleCartList.length });
        } else if (Object.keys(setStatusAddCart).length === 0) {
            setStatusAddCart({
                ...statusAddCart,
                simpleCartAdd: true,
            });
        }

        if (configureCartList.length > 0 && !statusAddCart.configureCartAdd) {
            setTimeout(() => { setConfigureItemStatus({ count: 0, totalCount: configureCartList.length }); }, 1000);
        } else if (Object.keys(setStatusAddCart).length === 0) {
            setStatusAddCart({
                ...statusAddCart,
                configureCartAdd: true,
            });
        }
    }
    if (statusAddCart.configureCartAdd && statusAddCart.simpleCartAdd) {
        redirectPage();
        return { completeHooks, statusAddCart };
    }
    if (simpleError || configureError) {
        return {
            completeHooks: true,
            statusAddCart: { simpleCartAdd: true, configureCartAdd: true },
        };
    }
    return false;
};

export default reOrderAddItemInCart;
