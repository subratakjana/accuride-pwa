import { useContext, useState } from 'react';
import { useManualQuery, useMutation } from 'graphql-hooks';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Badge from 'react-bootstrap/Badge';
import { ReactSVG } from 'react-svg';
import { deleteCartItem } from '@Graphql/queries/deleteCartItem.graphql';
import { miniCartDetails } from '@Graphql/queries/miniCart.graphql';
import { AuthContext } from '@Contexts/AuthContext';
import { LoadingIndicator, I18nLink, PriceTag } from '@Components/Utilities';
import NextImage from 'next/legacy/image';
import { getConfigureableSku } from '@Hooks/criptoEncodeDecodeCookie';
import { GTMEventFn } from '@Components/Utilities/gtmUtils';
import styles from './MiniCart.module.scss';

const MiniCart = () => {
  const { notify, cartList, cartId, addCart, simpleRedirect, decode } =
    useContext(AuthContext);
  const [productList, setProductList] = useState([]);
  const [priceList, setPricetList] = useState(null);
  const [deleteModal, setdeleteModal] = useState({ modalState: false });
  const [getDelProdData, setGetDelProdData] = useState(null);
  const [allCartData, setAllCartData] = useState(null);

  /** GTM Value handling */
  const provideGtmValue = (allItems) => {
    const viewCartGTMdata = {
      event: 'view_cart',
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
        brand: 'Accuride', // The brand name of the product.
        category: category.length > 0 ? category.join(',') : 'Shop', // Product category*
        price: item.prices.price.value, // Item price
        quantity: item.quantity,
      };
    });
    viewCartGTMdata.ecommerce.checkout.products = [...gtmProducts];
    GTMEventFn(viewCartGTMdata);
  };
  /** GTM Value handling for remove product from cart */
  const RemoveFromCartGTM = (productId) => {
    const productArr = [];
    productList.map((eachItem) => {
      if (eachItem.id === productId) {
        const category =
          eachItem.product.categories && eachItem.product.categories.length > 0
            ? eachItem.product.categories
                .map((cat) => (cat.id !== 7 ? cat.name : false))
                .filter(Boolean)
            : [];
        const productSku = eachItem.product.variants
          ? getConfigureableSku(eachItem)
          : eachItem.product.sku;
        productArr.push({
          id: productSku, // Product ID or SKU of the product.
          name: eachItem.product.name, // The name of the product.
          brand: 'Accuride', // The brand name of the product.
          category: category.length > 0 ? category.join(',') : 'Shop', // Product category*
          price: eachItem.prices.price.value, // Item price
          quantity: eachItem.quantity,
        });
      }
      return eachItem;
    });
    if (productArr.length > 0) {
      const RemoveFromCartGTMdata = {
        event: 'remove_from_cart',
        ecommerce: {
          add: {
            actionField: {
              list: 'checkout/mini-cart', // Список товаров.**
            },
            products: [],
          },
        },
      };
      RemoveFromCartGTMdata.ecommerce.add.products = [...productArr];
      GTMEventFn(RemoveFromCartGTMdata);
    }
  };
  /** GTM Value handling for checkout */
  const checkOutBeginGTM = () => {
    const CheckoutGTMdata = {
      event: 'begin_checkout',
      ecommerce: {
        checkout: {
          actionField: {
            step: 2,
          },
          products: [],
        },
      },
    };
    const gtmProducts = productList.map((item) => {
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
        brand: 'Accuride', // The brand name of the product.
        category: category.length > 0 ? category.join(',') : 'Shop', // Product category*
        price: item.product.price_range.minimum_price.final_price.value, // Item price
        quantity: item.quantity,
      };
    });
    CheckoutGTMdata.ecommerce.checkout.products = [...gtmProducts];
    GTMEventFn(CheckoutGTMdata);
  };

  const handleClose = () => setdeleteModal({ modalState: false });
  const openDeleteModal = (data) => {
    const prodData = productList.filter((itemB) => itemB.id === data);
    setGetDelProdData(prodData);
    setdeleteModal({
      ...setdeleteModal,
      modalState: true,
      deleteObj: data,
    });
    document.body.click();
  };

  // ------ API calling to generate cart list ------
  const [cartDetailsFn, { loading: loadingCart, data: cartData }] =
    useManualQuery(miniCartDetails.loc.source.body, {
      fetchPolicy: 'no-cache', // return always update data from server. Update cache comment out,
      onSuccess: (res) => {
        const { data } = res;
        setAllCartData(data);
        addCart(data.cart.total_quantity);
        setProductList(data.cart.items);
        setPricetList(data.cart.prices.grand_total.value);
        setTimeout(() => {
          provideGtmValue(data.cart.items);
        }, 1000);
      },
    });

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
            factors.track('Product Removed From Cart', paramsObject);
            console.log('Product Removed From Cart', paramsObject);
          } catch (err) {
            console.error(err);
          }
        }
        cartDetailsFn({ variables: { cartId } }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, 'error');
            } else {
              notify('Please check your network connection!', 'error');
            }
          }
        });
        notify('Item successfully deleted from cart!');
        addCart(data.removeItemFromCart.cart.total_quantity);
        setProductList(data.removeItemFromCart.cart.items);
        setPricetList(data.removeItemFromCart.cart.prices.grand_total.value);
      },
    }
  );

  const deleteModalConfirm = () => {
    RemoveFromCartGTM(deleteModal.deleteObj);
    setdeleteModal({ ...setdeleteModal, modalState: false });
    removeCartItemFn({
      variables: { cartId, cartItemId: deleteModal.deleteObj },
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

  const proceedTo = (_page) => {
    if (_page === '/checkout/shipping') {
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
            // productsArr.push({ [`productName${index}`]: item.name, [`productId${index}`]: item.uid, [`unitPrice${index}`]: item.price_range.minimum_price.final_price.value})
            paramsObject[`productName${index + 1}`] = item.product.name;
            paramsObject[`productId${index + 1}`] = decode(item.product.id);
            paramsObject[`unitPrice${index + 1}`] =
              item.product.price_range.minimum_price.final_price.value;
            paramsObject[`productQuantity${index + 1}`] = item.quantity;
          });
        }
        try {
          factors.track('Proceed To Checkout', paramsObject);
          console.log('Proceed To Checkout', paramsObject);
        } catch (err) {
          console.error(err);
        }
      }
      checkOutBeginGTM();
    }
    simpleRedirect(_page);
    document.body.click();
  };

  const callCart = () => {
    cartDetailsFn({ variables: { cartId, randId: Math.random() } }).then(
      ({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, 'error');
          } else {
            notify('Please check your network connection!', 'error');
          }
        }
      }
    );
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement="bottom-end"
        onEnter={callCart}
        rootClose
        overlay={
          cartList > 0 ? (
            <Popover className={`${styles['acc-mini-cart-popover']} shadow-1`}>
              {!loadingCart && cartData && !loadingRemoveCart && priceList && (
                <>
                  <Popover.Title className="p-3 bg-white font-size-md text-dark">
                    My Cart
                    <span className="font-weight-500">{` ${cartList} items`}</span>
                  </Popover.Title>
                  <Popover.Content>
                    <>
                      {productList.map((item, indx) => (
                        <Row
                          key={item.id}
                          className={`${
                            styles['acc-cart-item']
                          } border-grey-medium ${
                            indx === 0 ? '' : 'border-top'
                          }`}
                        >
                          <Col xs={4} className={`${styles['acc-img']} pr-1`}>
                            <NextImage
                              src={item.product.small_image.url}
                              alt={item.product.small_image.label}
                              layout="intrinsic"
                              objectFit="contain"
                              objectPosition="center"
                              width={64}
                              height={64}
                            />
                          </Col>
                          <Col xs={8} className={`${styles['acc-title']} pr-0`}>
                            <I18nLink
                              href={`/products/${item.product.url_key}`}
                              isMagentoRoute={1}
                            >
                              <a
                                onClick={() => document.body.click()}
                                onKeyPress={() => document.body.click()}
                                role="link"
                                tabIndex={0}
                                aria-label="link"
                                className="font-weight-bold text-primary font-size-sm d-block mb-2"
                              >
                                {item.product.small_image.label}
                              </a>
                            </I18nLink>

                            {/* For ConfigurableProduct: length start */}
                            {item.configurable_options
                              ? item.configurable_options.map((configure) => (
                                  <Row
                                    key={configure.option_label}
                                    className="mb-1"
                                  >
                                    <Col xs={12} className="font-size-sm">
                                      <span className="font-weight-600">{`${configure.option_label}: `}</span>
                                      {configure.value_label}
                                    </Col>
                                  </Row>
                                ))
                              : ''}
                            {/* For ConfigurableProduct: length end */}

                            <Row>
                              <Col xs={5}>
                                <PriceTag
                                  className="d-inline-block font-weight-600 font-size-sm"
                                  currency="$"
                                  value={item.prices.price.value}
                                />
                              </Col>
                              <Col xs={4}>
                                <span className="d-inline-block font-weight-500 pl-0">
                                  Qty:&nbsp;
                                </span>
                                <span>{item.quantity}</span>
                              </Col>
                              <Col xs={3} className="pl-0">
                                <Button
                                  variant="transparent"
                                  className="d-block p-0"
                                  onClick={() => {
                                    openDeleteModal(item.id);
                                  }}
                                >
                                  <ReactSVG
                                    src="/assets/images/icons/trash.svg"
                                    className={`fill-medium mr-2 ${styles['acc-trash-icon']}`}
                                  />
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      ))}
                    </>
                  </Popover.Content>
                  <div className={styles['popover-footer']}>
                    <Row
                      className={`${styles.subTotal} bg-light text-dark p-3 font-size-sm`}
                    >
                      <Col xs={6}>Cart Subtotal</Col>
                      <Col xs={6} className="text-right">
                        <PriceTag
                          className="d-inline-block font-weight-600"
                          currency="$"
                          value={priceList}
                        />
                      </Col>
                    </Row>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="primary"
                        block
                        className="text-uppercase rounded-0 m-0"
                        onClick={() => proceedTo('/checkout/cart')}
                      >
                        view and edit cart
                      </Button>
                      <Button
                        variant="secondary"
                        block
                        className="text-uppercase rounded-0 m-0"
                        onClick={() => proceedTo('/checkout/shipping')}
                      >
                        checkout
                      </Button>
                    </div>
                  </div>
                </>
              )}
              {/* loading for api calling */}
              {loadingCart || loadingRemoveCart ? (
                <LoadingIndicator
                  message="Updating cart data ..."
                  className="acc-mini-cart-loading"
                />
              ) : (
                ''
              )}
            </Popover>
          ) : (
            <Popover className={`${styles['acc-mini-cart-popover']} shadow-1`}>
              <Popover.Content className="p-4 text-center h-auto overflow-auto">
                <span className="font-size-md">
                  You have no items in your shopping cart.
                </span>
              </Popover.Content>
            </Popover>
          )
        }
      >
        <Button
          variant="link"
          className={`px-0 ${styles['acc-mini-cart-button']} d-flex align-items-center`}
          aria-label="Cart"
        >
          <NextImage
            src="/assets/images/icons/cart.svg"
            alt=""
            layout="fixed"
            width={32}
            height={28}
          />
          {cartList > 0 ? (
            <Badge pill variant="secondary" className="font-size-sm">
              {cartList}
            </Badge>
          ) : (
            ''
          )}
        </Button>
      </OverlayTrigger>

      {/* delete item modal start */}
      <Modal show={deleteModal.modalState} onHide={handleClose} centered>
        <Modal.Body>
          <span>Are you sure you want to delete this product?</span>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="m-0 ml-2 text-uppercase"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={deleteModalConfirm}
            className="m-0 ml-2 text-uppercase"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete modal end */}
    </>
  );
};

export default MiniCart;
