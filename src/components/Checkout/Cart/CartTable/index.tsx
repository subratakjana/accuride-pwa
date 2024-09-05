import { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { I18nLink, PriceTag } from '@Components/Utilities';
import { ReactSVG } from 'react-svg';
import InputSpinner from '@Components/InputSpinner';
import useWindowDimensions from '@Hooks/windowDimention';
import { getConfigureableSku } from '@Hooks/criptoEncodeDecodeCookie';
import { AuthContext } from '@Contexts/AuthContext';
import { GTMEventFn } from '@Components/Utilities/gtmUtils';
import NextImage from 'next/legacy/image';

const CartTable = (props) => {
  const { decode } = useContext(AuthContext);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { productData, updateCart, removeFn, setGlobalLoader } = props;
  const [deleteModal, setdeleteModal] = useState({ modalState: false });
  const [cartItems, setCartItems] = useState([]);
  const [quantityErrors, setQuantityErrors] = useState([]);

  /** GTM Value handling for remove product from cart */
  const RemoveFromCartGTM = (productId) => {
    const productArr = [];
    productData.map((eachItem) => {
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
              list: 'checkout/cart', // Список товаров.**
            },
            products: [],
          },
        },
      };
      RemoveFromCartGTMdata.ecommerce.add.products = [...productArr];
      GTMEventFn(RemoveFromCartGTMdata);
    }
  };
  const handleClose = () => setdeleteModal({ modalState: false });
  const openDeleteModal = (data) => {
    setdeleteModal({
      ...setdeleteModal,
      modalState: true,
      deleteObj: data,
    });
  };

  const deleteModalConfirm = () => {
    try {
      RemoveFromCartGTM(deleteModal.deleteObj);
    } catch (error) {
      console.error(error);
    }
    setdeleteModal({ ...setdeleteModal, modalState: false });
    setGlobalLoader(true);
    setQuantityErrors([]);
    removeFn(deleteModal.deleteObj);
  };

  const resetCarttList = (qnty, indx) => {
    cartItems[indx].quantity = parseInt(qnty, 10);
  };

  const updateCartHandler = async () => {
    let hasIssue = false;
    await Promise.all(
      cartItems.map((item, indx) => {
        const qnty = item.quantity;
        setQuantityErrors((prevErrors) => {
          const newErrors = [...prevErrors];
          if (qnty === '' || !qnty) {
            hasIssue = true;
            newErrors[indx] = 'Quantity should be greater than 0';
          } else if (qnty <= 0) {
            hasIssue = true;
            newErrors[indx] = 'Quantity should be greater than 0';
          } else {
            newErrors[indx] = '';
          }
          return newErrors;
        });
        return false;
      })
    );
    if (hasIssue === false) {
      setGlobalLoader(true);
      await updateCart(cartItems);
    }
  };

  /**
   * edit button help to edit cart page quantity.
   * and configurable product length also.
   * just enable the length and quantity.
   */
  const editCartItem = (indx, editMode) => {
    const items = cartItems[indx];
    items.editMode = !items.editMode;
    setCartItems([...cartItems]);
    if (editMode) {
      updateCartHandler();
    }
  };

  useEffect(() => {
    setCartItems([...productData]);
  }, [productData]);

  return (
    <div className="acc-cart-table px-xl-3">
      {/* tablet and desktop header start */}
      {windowObj && windowSize.width >= 768 ? (
        <Row className="border-bottom border-medium pb-3 acc-header z-index-5">
          <Col className="acc-header-item pl-xl-0">
            <span className="d-block font-weight-500">Item</span>
          </Col>
          <Col className="acc-header-price text-right">
            <span className="d-block font-weight-500">Price</span>
          </Col>
          <Col className="acc-header-qty text-right">
            <span className="d-block font-weight-500">Qty</span>
          </Col>
          <Col className="acc-header-subtotal text-right pr-xl-0">
            <span className="d-block font-weight-500">Subtotal</span>
          </Col>
        </Row>
      ) : null}
      {/* tablet and desktop header end */}

      {cartItems.map((item, indx) => (
        <Row
          key={item.id}
          className="acc-cart-item border-bottom border-medium"
        >
          <Col className="acc-img mb-3 pl-xl-0">
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
          <Col xs={12} md className="acc-title mb-3">
            <span className="d-block">{item.product.sku}</span>
            <I18nLink
              href={`/products/${item.product.url_key}`}
              isMagentoRoute={1}
            >
              <a
                aria-label="link"
                className="font-weight-bold text-primary d-block mb-1"
              >
                {item.product.small_image.label}
              </a>
            </I18nLink>

            {/* For ConfigurableProduct: length start */}
            {item.configurable_options
              ? item.configurable_options.map((configure) => (
                  <Row
                    key={configure.option_label}
                    className="d-block font-weight-500 mb-1"
                  >
                    <Col
                      xs={12}
                    >{`${configure.option_label} : ${configure.value_label}`}</Col>
                  </Row>
                ))
              : ''}
            <div
              className="yotpo bottomLine acc-cart-yotpo"
              data-yotpo-product-id={decode(item.product.id)}
            />
            {/* For ConfigurableProduct: length end */}
          </Col>
          <Col xs={3} md className="acc-body-price">
            {windowObj && windowSize.width < 768 ? (
              <span className="d-block font-weight-500 mb-1">Price:</span>
            ) : null}
            <PriceTag currency="$" value={item.prices.price.value} />
          </Col>
          <Col xs={6} md className="acc-body-qty">
            {windowObj && windowSize.width < 768 ? (
              <span className="d-block font-weight-500 mb-1">Qty:</span>
            ) : null}
            {item.editMode ? (
              <div className="acc-modified-counter acc-counter-xs acc-counter-not-rounded">
                <InputSpinner
                  type="real"
                  min={1}
                  step={1}
                  value={item.quantity}
                  onChange={(value) => {
                    resetCarttList(value, indx);
                  }}
                  variant="primary"
                  className={
                    quantityErrors && quantityErrors[indx] && 'border-danger'
                  }
                />
              </div>
            ) : (
              <span>{item.quantity}</span>
            )}
            {quantityErrors && quantityErrors[indx] && (
              <div className="text-danger small mt-1">
                {quantityErrors[indx]}
              </div>
            )}
          </Col>
          <Col xs={3} md className="acc-body-subtotal pr-xl-0">
            {windowObj && windowSize.width < 768 ? (
              <span className="d-block font-weight-500 mb-1">Subtotal:</span>
            ) : null}
            <PriceTag currency="$" value={item.prices.row_total.value} />
          </Col>
          <Col
            xs={12}
            className="pt-3 pt-md-0 pr-xl-0 d-flex align-items-center justify-content-md-end"
          >
            <Button
              onClick={() => editCartItem(indx, item.editMode)}
              variant="primary"
              block={!(windowObj && windowSize.width >= 768)}
              className="d-flex text-uppercase mr-2 mr-md-0 align-items-center justify-content-center px-md-2"
            >
              <ReactSVG
                src="/assets/images/icons/edit.svg"
                className="fill-white acc-cart-edit-icon"
              />
              <span className="pl-2">{item.editMode ? 'Save' : 'Edit'}</span>
            </Button>
            <Button
              variant="primary"
              block={!(windowObj && windowSize.width >= 768)}
              className="d-flex text-uppercase mt-0 ml-2 align-items-center justify-content-center px-md-2"
              onClick={() => {
                openDeleteModal(item.id);
              }}
            >
              <ReactSVG
                src="/assets/images/icons/trash.svg"
                className="fill-white acc-cart-trash-icon"
              />
              <span className="pl-2">Delete</span>
            </Button>
          </Col>
        </Row>
      ))}

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
    </div>
  );
};

export default CartTable;
