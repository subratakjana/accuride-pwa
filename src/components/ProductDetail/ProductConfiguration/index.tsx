import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { I18nLink, PriceTag } from "@Components/Utilities";
import InputSpinner from "@Components/InputSpinner";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation } from "graphql-hooks";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import { addSimpleProduct } from "@Graphql/queries/addSimpleProduct.graphql";
import { addConfigurableProduct } from "@Graphql/queries/addConfigurableProduct.graphql";
import { deleteCartItem } from "@Graphql/queries/deleteCartItem.graphql";
import { LoadingIndicator } from '@Components/Utilities';
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import { ZoneContext } from "@Contexts/ZoneContext";
import dynamic from "next/dynamic";

const ProductStockNotify = dynamic(() => import("./ProductStockNotify"));
const ProductQuoteModal = dynamic(() => import("../ProductQuoteModal"));

const btnStyle = {
  color: "#333333",
  border: "1px solid #333333",
  height: "36px",
  width: "36px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "4px",
};
const inputStyle = {
  border: "1px solid #333333",
  height: "36px",
  margin: "0 8px",
  width: "100px",
  borderRadius: "4px",
};
const ProductConfiguration = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [pageLoader, setPageLoader] = useState(false);
  // for configurable products
  const { notify, addCart, cartId, decode, loggedCustomerData } =
    useContext(AuthContext);
  const [productCount, setCount] = useState(1);
  const { editCartDetails } = props;
  const router = useRouter();
  const groupedProduct = props.configuration.items;
  const [groupedProductSelected, setGroupedProductSelected] = useState([]);
  const [selectedlength, setSelectedlength] = useState(false);
  const [simpleItemStatus, setSimpleItemStatus] = useState({
    cartItem: [],
    count: 0,
    totalCount: 0,
  });
  const [isDeleted, setIsdeleted] = useState(false);
  const [activeQuoteModal, setActiveQuoteModal] = useState(false);
  const [activeVarients, setActiveVarients] = useState(false);
  const [selectedVariantsObj, setSelectedVariantsObj] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedHanOption, setSelectedHanOption] = useState(null);
  const { config } = useContext(ZoneContext);
  const [show, setShow] = useState(false);

  const handleToggle = (nextIsOpen, event, metadata) => {
    if (nextIsOpen) {
      // Your code to handle opening the dropdown
      onMenuOpen();
    }
    setShow(!show);
  };

  const quoteModalClose = () => {
    setActiveQuoteModal(false);
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    setCount(editCartDetails.quantity ? editCartDetails.quantity : 1);
  }, []);

  /** GTM Value handling */
  const provideGtmValue = () => {
    let itemArr = [];
    let totalVal = 0;
    const productListingGTMdata = {
      event: "view_item_list",
      ecommerce: {
        impressions: [],
      },
    };
    const gtmProducts = groupedProduct.map((item, index) => {
      totalVal =
        totalVal +
        item.product.product_price_range.minimum_price.final_price.value;
      itemArr.push({
        id: item.product.sku,
        google_business_vertical: "retail",
      });
      const category =
        item.product.categories && item.product.categories.length > 0
          ? item.product.categories
              .map((cat) => (decode(cat.uid) !== 7 ? cat.name : false))
              .filter(Boolean)
          : [];
      return {
        id: item.product.sku, // Product ID or SKU of the product.
        name: item.product.name, // The name of the product.
        brand: "Accuride", // The brand name of the product.
        category: category.length > 0 ? category.join(",") : "Shop", // Product category*
        list: "Mini Catalog", // The list name of item**
        price: item.product.product_price_range.minimum_price.final_price.value, // Item price
        position: index + 1,
      };
    });
    productListingGTMdata.ecommerce.impressions = [...gtmProducts];
    GTMEventFn(productListingGTMdata);
    if (window && window.dataLayer) {
      function gtag() {
        window.dataLayer.push(arguments);
      }
      // Call gtag with the 'view_item_list' event and relevant arguments
      gtag("event", "view_item_list", {
        value: Number(totalVal.toFixed(2)),
        items: itemArr,
      });
    }
  };

  /** Select product GTM Value handling */
  const selectProductGtmValue = (productObj, position) => {
    const category =
      productObj.product.categories && productObj.product.categories.length > 0
        ? productObj.product.categories
            .map((cat) => (Number(decode(cat.uid)) !== 7 ? cat.name : false))
            .filter(Boolean)
        : [];
    const clickProductGTMdata = {
      event: "select_item",
      ecommerce: {
        click: {
          actionField: {
            list: router.query.magento_route.join("/"),
          },
          products: [
            {
              id: productObj.product.sku, // Product ID or SKU of the product.
              name: productObj.product.name, // The name of the product.
              brand: "Accuride", // The brand name of the product.
              category: category.length > 0 ? category.join(",") : "Shop", // Product category*
              list: "Mini Catalog", // The list name of item**
              price:
                productObj.product.product_price_range.minimum_price.final_price
                  .value, // Item price
              position: position + 1,
            },
          ],
        },
      },
    };
    GTMEventFn(clickProductGTMdata);
  };

  /**
   * graphql Query declare for simple product
   * when add to cart simple product
   */
  const [addSimpleProductFn, { loading: loadingCart }] = useMutation(
    addSimpleProduct.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        notify("Your product has been successfully added to the cart.");
        addCart(data.addSimpleProductsToCart.cart.total_quantity);
        if (props.configuration.__typename === "GroupedProduct") {
          setSimpleItemStatus({
            ...simpleItemStatus,
            count: simpleItemStatus.count + 1,
          });
        }
      },
    },
  );

  /**
   * graphql Query declare for Configurable Product
   * when add to cart configurable product
   */
  const [addConfigurableProductFn, { loading: loadingCartConfig }] =
    useMutation(addConfigurableProduct.loc.source.body, {
      onSuccess: (res) => {
        const { data } = res;
        notify("Your product has been successfully added to the cart.");
        addCart(data.addConfigurableProductsToCart.cart.total_quantity);
      },
    });

  useEffect(() => {
    if (props.configuration.__typename === "GroupedProduct") {
      provideGtmValue();
      const selectedGroupProduct = [];
      props.configuration.items.map((item) =>
        selectedGroupProduct.push({ sku: item.product.sku, quantity: 0 }),
      );
      setGroupedProductSelected(selectedGroupProduct);
    }
  }, [groupedProduct]);

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    targetObj.value = targetObj.value.replace(/[^0-9]/g, "");
  };

  const ongroupedItemQntyChange = (indx, qnt) => {
    groupedProductSelected[indx].quantity = parseInt(qnt, 10);
    const isQnty = groupedProductSelected.filter(
      (item) => Number(item.quantity) > 0,
    );
    setCount(isQnty.length);
  };

  // ------------ remove item --------
  // API calling to remove item from cart list query
  const [removeCartItemFn, { loading: loadingRemoveCart }] = useMutation(
    deleteCartItem.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setIsdeleted(true);
        addCart(data.removeItemFromCart.cart.total_quantity);
      },
    },
  );

  /** configurable product add to cart permition */
  const checkIsSelectedSku = () => {
    let isConfigure = false;
    if (props.configuration.__typename === "ConfigurableProduct") {
      if (props.configuration.configurable_options.length === 1) {
        if (!selectedOption) {
          notify("You need to choose options for your item.", "warn");
        }
        if (selectedOption && selectedOption.value) {
          isConfigure = true;
        }
      }

      if (props.configuration.configurable_options.length === 2) {
        //both dropdown not selected and 1 dropdown selected and snother dropdown not selected logic
        if (
          (!selectedOption &&
            (!selectedHanOption || !selectedHanOption.value)) ||
          (selectedOption.value && !selectedHanOption)
        ) {
          notify("You need to choose options for your item.", "warn");
        }
        if (
          selectedOption &&
          selectedOption.value &&
          selectedHanOption &&
          selectedHanOption.value
        ) {
          isConfigure = true;
        }
      }
      return isConfigure;
    }
  };

  /** GTM Value handling for add t cart */
  const addToCartGtmValue = (productObj) => {
    let productArr = [];
    let itemArr = [];
    let totalVal = 0;
    if (productObj.__typename === "GroupedProduct") {
      groupedProductSelected.map((item) => {
        if (item.quantity !== 0 && item.quantity > 0) {
          groupedProduct.map((eachItem) => {
            if (eachItem.product.sku === item.sku) {
              const category =
                eachItem.product.categories &&
                eachItem.product.categories.length > 0
                  ? eachItem.product.categories
                      .map((cat) =>
                        Number(decode(cat.uid)) !== 7 ? cat.name : false,
                      )
                      .filter(Boolean)
                  : [];
              totalVal +=
                eachItem.product.product_price_range.minimum_price.final_price
                  .value * item.quantity;
              productArr.push({
                id: eachItem.product.sku, // Product ID or SKU of the product.
                name: eachItem.product.name, // The name of the product.
                brand: "Accuride", // The brand name of the product.
                category: category.length > 0 ? category.join(",") : "Shop", // Product category*
                price:
                  eachItem.product.product_price_range.minimum_price.final_price
                    .value, // Item price
                variant: eachItem.__typename,
                quantity: item.quantity,
              });
              itemArr.push({
                id: eachItem.product.sku,
                google_business_vertical: "retail",
              });
            }
            return eachItem;
          });
        }
        return item;
      });
      if (window && window.dataLayer) {
        function gtag() {
          window.dataLayer.push(arguments);
        }
        // Call gtag with the 'add_to_cart' event and relevant arguments
        gtag("event", "add_to_cart", {
          value: Number(totalVal.toFixed(2)),
          items: itemArr,
        });
      }
    } else {
      const category =
        productObj.categories && productObj.categories.length > 0
          ? productObj.categories
              .map((cat) => (Number(decode(cat.uid)) !== 7 ? cat.name : false))
              .filter(Boolean)
          : [];
      let getPrice = document.getElementById(
        `price-${decode(productObj.uid)}`,
      ).innerHTML;
      getPrice = getPrice ? getPrice.replace("$", "").replace("CA", "") : "";
      const selectedSku =
        productObj.__typename === "ConfigurableProduct"
          ? checkIsSelectedSku()
          : false;
      if (productObj.__typename === "ConfigurableProduct" && !selectedSku)
        return false;
      productArr = [
        {
          id: selectedSku ? props.selectedSku : productObj.sku, // Product ID or SKU of the product.
          name: productObj.name, // The name of the product.
          brand: "Accuride", // The brand name of the product.
          category: category.length > 0 ? category.join(",") : "Shop", // Product category*
          price: getPrice, // Item price
          variant: productObj.__typename,
          quantity: productCount,
        },
      ];

      if (window && window.dataLayer) {
        function gtag() {
          window.dataLayer.push(arguments);
        }
        // Call gtag with the 'add_to_cart' event and relevant arguments
        gtag("event", "add_to_cart", {
          value: getPrice,
          items: [
            {
              id: selectedSku ? props.selectedSku : productObj.sku,
              google_business_vertical: "retail",
            },
          ],
        });
      }
    }
    if (productArr.length > 0) {
      const productDetailGTMdata = {
        event: "add_to_cart",
        ecommerce: {
          add: {
            actionField: {
              list: router.query.magento_route.join("/"),
            },
            products: [],
          },
        },
      };
      productDetailGTMdata.ecommerce.add.products = [...productArr];
      GTMEventFn(productDetailGTMdata);
    }
  };

  /**
   * check selected length handed item stock quntity and populate option
   */
  const checkCurrentHandedStock = (indx, currentValueIndex) => {
    let isOutOfStock = false;
    if (selectedlength) {
      const handedArr = props.configuration.variants.filter(
        (item) => item.attributes[0].value_index === selectedlength,
      );
      const currentHandedOptions = handedArr.filter(
        (item) => item.attributes[1].value_index === currentValueIndex,
      );
      if (
        currentHandedOptions.length > 0 &&
        currentHandedOptions[0].product.stock_status !== "IN_STOCK"
      ) {
        isOutOfStock = true;
      }
    }
    return isOutOfStock;
  };

  /**
   * check the length is out of stock on array repeat.
   */
  const checkCurrentLengthStock = (valueIndx) => {
    let isOutOfStock = false;
    const handedArr = props.configuration.variants.filter(
      (item) => item.attributes[0].value_index === valueIndx,
    );
    isOutOfStock =
      handedArr.filter((item) => item.product.stock_status !== "IN_STOCK")
        .length === handedArr.length;
    return isOutOfStock;
  };

  /**
   * check is dissablde
   */
  const isDisablde = (valueIndx) => {
    let lengthDisabled = false;
    const handedArr =
      props.configuration.configurable_options.length === 1
        ? props.configuration.variants.filter(
            (item) => item.attributes[0].value_index === valueIndx,
          )
        : props.configuration.variants.filter((item) =>
            item.attributes.filter(
              (subItem) => subItem.value_index === valueIndx,
            ),
          );
    if (handedArr.length === 0) lengthDisabled = true;
    return lengthDisabled;
  };

  /** add to cart group product one by one */
  useEffect(() => {
    if (
      simpleItemStatus.cartItem.length > 0 &&
      simpleItemStatus.totalCount !== simpleItemStatus.count
    ) {
      const isToastCloseBtn = document.getElementsByClassName(
        "Toastify__close-button",
      );
      if (isToastCloseBtn.length > 0) isToastCloseBtn[0].click();
      addSimpleProductFn({
        variables: {
          cartId,
          cartItem: [simpleItemStatus.cartItem[simpleItemStatus.count]],
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
    }
  }, [simpleItemStatus]);

  /**
   * add to cart functionality.
   * code handling and query pass with calculation simple product,
   * group product and configurable product.
   * after query update with mutation local cache update with writequery.
   * @param {*} items
   */
  const addToCartHandler = (items) => {
    const cartItem = [];
    let dispayPrice = items.product_price_range.minimum_price.final_price.value;
    if (items.__typename !== "GroupedProduct") {
      let productPrice =
        items.product_price_range.minimum_price.final_price.value;
      if (selectedVariantsObj) {
        productPrice =
          selectedVariantsObj.product.price_range.minimum_price.final_price
            .value;
      }
      dispayPrice = productPrice;
    }

    const paramsObject = {
      totalPrice: dispayPrice * productCount,
      emailID: loggedCustomerData && loggedCustomerData.customer.email,
      phoneNo: null,
      name:
        loggedCustomerData && loggedCustomerData.customer
          ? `${loggedCustomerData.customer.firstname} ${loggedCustomerData.customer.lastname}`
          : null,
      productName: items.name,
      productId: decode(items.uid),
      productQuantity: productCount,
      unitPrice: dispayPrice,
      currency: items.product_price_range.minimum_price.final_price.currency,
      ordeId: null,
    };

    try {
      factors.track("Add To Cart Button Click", paramsObject);
      console.log("Add To Cart Button Click", paramsObject);
    } catch (err) {
      console.error(err);
    }

    if (items.__typename === "GroupedProduct") {
      groupedProductSelected.map((item) => {
        if (item.quantity !== 0 && item.quantity > 0) {
          cartItem.push({ data: item });
        }
        return item;
      });
      if (cartItem.length > 0) {
        setSimpleItemStatus({
          cartItem,
          count: 0,
          totalCount: cartItem.length,
        });
      }
    } else if (items.__typename === "ConfigurableProduct") {
      const isSelectedSku = checkIsSelectedSku();
      if (isSelectedSku) {
        const lengthSkuValue = props.selectedSku;
        const newProductCount =
          productCount === 0 ? editCartDetails.quantity : productCount;
        cartItem.push({
          parent_sku: items.sku,
          data: {
            sku: lengthSkuValue,
            quantity: newProductCount,
          },
        });
      }

      if (cartItem.length > 0) {
        addConfigurableProductFn({
          variables: { cartId, cartItem },
        }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        });
      }
    } else {
      cartItem.push({ data: { sku: items.sku, quantity: productCount } });
      if (cartItem.length > 0) {
        addSimpleProductFn({
          variables: { cartId, cartItem },
        }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
          if (props.configuration.__typename === "GroupedProduct") {
            setSimpleItemStatus({
              ...simpleItemStatus,
              count: simpleItemStatus.count + 1,
            });
          }
        });
      }
    }
  };

  const removeItemThenAdd = (param) => {
    if (!isDeleted) {
      removeCartItemFn({
        variables: { cartId, cartItemId: editCartDetails.id },
      }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
        }
      });
    } else {
      addToCartHandler(param);
    }
  };

  let counter;
  if (props.configuration.product_for_sales !== 0) {
    if (props.configuration.__typename !== "GroupedProduct") {
      counter = (
        <Form.Row>
          <Form.Group as={Col} md={8} className="col-xxl-6 mb-0">
            <div
              className={`d-flex align-items-center mb-3 ${
                windowObj && windowSize.width >= 991
                  ? "justify-content-between"
                  : ""
              }`}
            >
              <div
                className={`acc-counter acc-coustom-counter acc-modified-counter d-flex ${
                  props.configuration.__typename === "SimpleProduct" &&
                  props.configuration.stock_status !== "IN_STOCK"
                    ? "disable"
                    : null
                }`}
              >
                <InputSpinner
                  type="real"
                  min={1}
                  step={1}
                  value={editCartDetails ? editCartDetails.quantity : 1}
                  onChange={(count) => {
                    setCount(count);
                  }}
                  variant="white"
                />
              </div>
              <span
                className={`acc-uom pl-3 pl-xl-0 ${
                  windowObj && windowSize.width < 991 ? "font-size-lg" : ""
                }`}
              >
                {props.configuration.quantity_in}
              </span>
            </div>
          </Form.Group>
        </Form.Row>
      );
    }
  }

  /**
   * length change product price change.
   */
  const setConfigureValue = () => {
    const getProdDetails = props.configuration;
    const configreOptions = props.configuration.configurable_options;
    const selectLength = selectedOption;
    const selectHanded =
      configreOptions.length > 1
        ? document.querySelector(
            `[name='configure-${configreOptions[1].attribute_code}']`,
          )
        : false;
    let selectedVariants = false;
    let selectedVariantsPrice = 0;
    let prodId = null;

    if (
      selectLength &&
      selectedOption &&
      selectedOption.value &&
      checkCurrentLengthStock(selectedOption.value)
    ) {
      selectedVariants = props.configuration.variants.find(
        (item) => item.attributes[0].value_index === selectedOption.value,
      );
    }

    if (selectLength && selectedOption && selectedOption.value) {
      setSelectedlength(selectedOption.value);
      document
        .querySelector(`[name='info-${configreOptions[0].attribute_code}']`)
        .classList.add("d-none");
    } else {
      setSelectedlength(false);
    }
    if (selectHanded && selectedHanOption && selectedHanOption.value) {
      document
        .querySelector(`[name='info-${configreOptions[1].attribute_code}']`)
        .classList.add("d-none");
    }
    if (selectHanded && selectedHanOption && !selectedHanOption.value) {
      selectHanded.value = "";
    }
    if (selectLength && selectedOption && selectedOption.value) {
      selectedVariants = props.configuration.variants.find(
        (item) => item.attributes[0].value_index === selectedOption.value,
      );
      if (selectedVariants) props.selectedLength(selectedVariants.product.sku);
    }
    if (
      props.configuration.configurable_options.length > 1 &&
      selectLength &&
      selectedOption &&
      selectedOption.value &&
      selectedHanOption &&
      selectedHanOption.value
    ) {
      selectedVariants = props.configuration.variants.find(
        (item) =>
          item.attributes[0].value_index === selectedOption.value &&
          item.attributes[1].value_index === selectedHanOption.value,
      );
      if (selectedVariants) props.selectedLength(selectedVariants.product.sku);
    }
    if (selectLength && selectedOption && !selectedOption.value) {
      props.selectedLength("");
    }
    if (selectedVariants) {
      prodId = decode(selectedVariants.product.uid);
      selectedVariantsPrice =
        selectedVariants.product.price_range.minimum_price.final_price.value;
    }
    setSelectedVariantsObj(selectedVariants);
    //= ==========factors.track start=================
    let guestData = localStorage.getItem("finalTotal");
    guestData = guestData ? JSON.parse(guestData) : null;
    const paramsObject = {
      emailID: loggedCustomerData
        ? loggedCustomerData.customer.email
        : guestData
        ? guestData.email
        : null,
      phoneNo:
        guestData &&
        guestData.shipping_addresses &&
        guestData.shipping_addresses.length > 0
          ? guestData.shipping_addresses[0].telephone
          : null,
      name:
        loggedCustomerData && loggedCustomerData.customer
          ? `${loggedCustomerData.customer.firstname} ${loggedCustomerData.customer.lastname}`
          : guestData &&
            guestData.shipping_addresses &&
            guestData.shipping_addresses.length > 0
          ? `${guestData.shipping_addresses[0].firstname} ${guestData.shipping_addresses[0].lastname}`
          : null,
      productName: getProdDetails && getProdDetails.name,
      productId: prodId,
      productQuantity: productCount,
      unitPrice: selectedVariantsPrice,
      totalPrice: selectedVariantsPrice && selectedVariantsPrice * productCount,
      currency:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.currency,
      ordeId: null,
    };

    try {
      factors.track("Length Selected", paramsObject);
      console.log("Length Selected", paramsObject);
    } catch (err) {
      console.error(err);
    }
    //= ==========factors.track end=================
  };

  useEffect(() => {
    if (selectedOption || selectedHanOption) setConfigureValue();
  }, [selectedOption, selectedHanOption]);

  useEffect(() => {
    const addToCartBtn = document.querySelector(".forceDisabled");
    if (addToCartBtn) {
      addToCartBtn.removeAttribute("disabled");
      addToCartBtn.classList.remove("forceDisabled", "btn-medium");
    }
  }, [selectedVariantsObj]);

  useEffect(() => {
    if (
      props.configuration.__typename === "ConfigurableProduct" &&
      props.configuration.product_for_sales === 1
    ) {
      setConfigureValue();
    }
  }, []);

  // For Yotpo
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });
  const goToPDPpage = (getUrl) => {
    if(getUrl) {
      setPageLoader(true);
      window.location.replace(getUrl);
    }
  }
  const onMenuOpen = () => {
    //= ==========factors.track start=================
    const getProdDetails = props.configuration;
    let guestData = localStorage.getItem("finalTotal");
    guestData = guestData ? JSON.parse(guestData) : null;
    const paramsObject = {
      emailID: loggedCustomerData
        ? loggedCustomerData.customer.email
        : guestData
        ? guestData.email
        : null,
      phoneNo:
        guestData &&
        guestData.shipping_addresses &&
        guestData.shipping_addresses.length > 0
          ? guestData.shipping_addresses[0].telephone
          : null,
      name:
        loggedCustomerData && loggedCustomerData.customer
          ? `${loggedCustomerData.customer.firstname} ${loggedCustomerData.customer.lastname}`
          : guestData &&
            guestData.shipping_addresses &&
            guestData.shipping_addresses.length > 0
          ? `${guestData.shipping_addresses[0].firstname} ${guestData.shipping_addresses[0].lastname}`
          : null,
      productName: getProdDetails && getProdDetails.name,
      productId: getProdDetails && decode(getProdDetails.uid),
      productQuantity: productCount,
      unitPrice:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.value,
      totalPrice:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.value *
          productCount,
      currency:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.currency,
      ordeId: null,
    };
    if (getProdDetails && getProdDetails.__typename === "ConfigurableProduct") {
      if (selectedOption && selectedOption.label)
        paramsObject.productLength = selectedOption.label.replace(/"/g, "");
    }
    try {
      factors.track("Length Button Click", paramsObject);
      console.log("Length Button Click", paramsObject);
    } catch (err) {
      console.error(err);
    }
    //= ==========factors.track end=================
  };
  const lengthArr = [];
  const otherArr = [];

  if (
    props.configuration &&
    props.configuration.__typename === "ConfigurableProduct" &&
    props.configuration.product_for_sales === 1
  ) {
    props.configuration.configurable_options.map((configure, indx) => {
      configure.values.map((configurLabel, index) => {
        if (
          (indx === 0 && checkCurrentLengthStock(configurLabel.value_index)) ||
          (indx === 1 &&
            checkCurrentHandedStock(index, configurLabel.value_index))
        ) {
          if (!isDisablde(configurLabel.value_index)) {
            if (indx === 0)
              lengthArr.push({
                label: `${configurLabel.label} Sold Out/Notify Me`,
                value: configurLabel.value_index,
              });
            if (indx === 1)
              otherArr.push({
                label: `${configurLabel.label} Sold Out/Notify Me`,
                value: configurLabel.value_index,
              });
          }
        } else {
          if (
            configure.attribute_code === "length" ||
            configure.attribute_code === "door_height"
          )
            lengthArr.push({
              label: `${configurLabel.label}`,
              value: configurLabel.value_index,
            });
          if (
            configure.attribute_code !== "length" &&
            configure.attribute_code !== "door_height"
          )
            otherArr.push({
              label: `${configurLabel.label}`,
              value: configurLabel.value_index,
            });
        }
        return true;
      });
      return true;
    });
  }
  return (
    <div className="acc-product-configuration pt-4">
      {/* For ConfigurableProduct: dynamic configure start */}
      {props.configuration.__typename === "ConfigurableProduct" &&
      props.configuration.product_for_sales === 1 ? (
        <>
          {/* product stock notification for configurable product */}
          {selectedVariantsObj &&
            selectedVariantsObj.product.stock_status !== "IN_STOCK" && (
              <ProductStockNotify
                checkStockId={selectedVariantsObj.product.uid}
                parentProductId={props.configuration.uid}
                item={selectedVariantsObj.product}
                parentProduct={props}
              />
            )}
          <Form.Row>
            {props.configuration.configurable_options.map((configure, indx) => (
              <Form.Group
                key={configure.label}
                as={Col}
                md={8}
                className="col-xxl-6"
              >
                {(configure.attribute_code === "length" ||
                  configure.attribute_code === "door_height") && (
                  <>
                    <Dropdown
                      className="acc-custom-select-dropdown"
                      show={show}
                      onToggle={handleToggle}
                    >
                      <Dropdown.Toggle variant="primary">
                        {selectedOption && selectedOption.label
                          ? selectedOption.label
                          : configure.label}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {lengthArr.map((option) => (
                          <Dropdown.Item
                            key={option.value}
                            onClick={() => {
                              setSelectedOption(option);
                            }}
                            className={
                              selectedOption &&
                              selectedOption.label === option.label &&
                              "active"
                            }
                          >
                            {option.label}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
                {configure.attribute_code !== "length" &&
                  configure.attribute_code !== "door_height" && (
                    <>
                      <Dropdown
                        className={`acc-custom-select-dropdown ${
                          selectedOption === "length" || selectedOption === null
                            ? "disabled-div"
                            : "enabled-div"
                        }`}
                      >
                        <Dropdown.Toggle
                          variant="light"
                          id={`dropdown-${configure.label}`}
                        >
                          {!selectedHanOption
                            ? configure.label
                            : selectedHanOption.label}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          {otherArr.map((otherOption) => (
                            <Dropdown.Item
                              key={otherOption.value}
                              onSelect={() => setSelectedHanOption(otherOption)}
                              className={
                                selectedHanOption &&
                                selectedHanOption.label === otherOption.label &&
                                "active"
                              }
                            >
                              {otherOption.label}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  )}
                {/* {configure.attribute_code === 'flange'
                                    && (
                                        <>
                                            <Dropdown className={`acc-custom-select-dropdown ${
                                               ( selectedOption ===
                                                "length" || !selectedOption )
                                                    ? "disabled-div"
                                                    : "enabled-div"
                                            }`}>
                                            <Dropdown.Toggle variant="light" id={`dropdown-${configure.label}`}>
                                                {!selectedHanOption ? configure.label : selectedHanOption.label}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {flangArr.map((option) => (
                                                    <Dropdown.Item
                                                        key={option.value}
                                                        onSelect={() => setSelectedHanOption(option)}
                                                        className={
                                                            selectedHanOption &&
                                                            selectedHanOption.label ===
                                                            option.label &&
                                                            "active"
                                                        }
                                                    >
                                                        {option.label}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </>
                                    )}
                                {configure.attribute_code === 'handed'
                                    && (
                                        <>
                                            <Dropdown className={`acc-custom-select-dropdown ${
                                                ( selectedOption ===
                                                    "length" || !selectedOption )
                                                    ? "disabled-div"
                                                    : "enabled-div"
                                            }`}>
                                            <Dropdown.Toggle variant="light" id={`dropdown-${configure.label}`}>
                                                {!selectedHanOption ? configure.label : selectedHanOption.label}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {handedArr.map((option) => (
                                                    <Dropdown.Item
                                                        key={option.value}
                                                        onSelect={() => setSelectedHanOption(option)}
                                                        className={
                                                            selectedHanOption &&
                                                            selectedHanOption.label ===
                                                            option.label &&
                                                            "active"
                                                        }
                                                    >
                                                        {option.label}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </>
                                    )}
                                {configure.attribute_code === 'lock'
                                    && (
                                        <>
                                            <Dropdown className={`acc-custom-select-dropdown ${
                                               ( selectedOption ===
                                                "length" || !selectedOption )
                                                    ? "disabled-div"
                                                    : "enabled-div"
                                            }`}>
                                            <Dropdown.Toggle variant="light" id={`dropdown-${configure.label}`}>
                                                {!selectedHanOption ? configure.label : selectedHanOption.label}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {lockArr.map((option) => (
                                                    <Dropdown.Item
                                                        key={option.value}
                                                        onSelect={() => setSelectedHanOption(option)}
                                                        className={
                                                            selectedHanOption &&
                                                            selectedHanOption.label ===
                                                            option.label &&
                                                            "active"
                                                        }
                                                    >
                                                        {option.label}
                                                    </Dropdown.Item>
                                                ))}
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        </>
                                    )} */}
                <div
                  className="text-danger d-none mt-1"
                  name={`info-${configure.attribute_code}`}
                >
                  This is a required field.
                </div>
              </Form.Group>
            ))}
          </Form.Row>
        </>
      ) : (
        ""
      )}
      {/* For ConfigurableProduct: configure end */}

      {/* for group product length start */}
      {props.configuration.__typename === "GroupedProduct" && groupedProduct ? (
        <>
          <div className="acc-group-product">
            {props.configuration.stock_status !== "IN_STOCK" && (
              <article className="acc-item">
                <ProductStockNotify
                  checkStockId={props.configuration.uid}
                  parentProductId={props.configuration.uid}
                  item={props.configuration}
                  parentProduct={props}
                />
              </article>
            )}
            {groupedProduct.map((item, indx) => (
              <article className="acc-item" key={item.product.uid}>
                <Row>
                  <Col md={3} lg={2}>
                    <I18nLink
                      isMagentoRoute={1}
                      href={`/products/${item.product.url_key}`}
                    >
                      <a
                        aria-label="link"
                        role="button"
                        tabIndex={0}
                        onKeyPress={() => selectProductGtmValue(item, indx)}
                        onClick={() => selectProductGtmValue(item, indx)}
                      >
                        <NextImage
                          src={item.product.image.gallery_url}
                          alt={item.product.name}
                          layout="intrinsic"
                          objectFit="contain"
                          objectPosition="center"
                          width={280}
                          height={280}
                          className="acc-img"
                        />
                      </a>
                    </I18nLink>
                  </Col>
                  <Col md={5} lg={6} className="pl-md-0">
                    <h5 className="acc-title mb-3 mb-md-0">
                      <I18nLink
                        isMagentoRoute={0}
                        href={`/products/${item.product.url_key}`}
                      >
                        <a
                          aria-label="link"
                          role="button"
                          tabIndex={0}
                          onKeyPress={() => selectProductGtmValue(item, indx)}
                          onClick={() => selectProductGtmValue(item, indx)}
                        >
                          {item.product.name}
                        </a>
                      </I18nLink>
                    </h5>
                    {item.product.stock_status !== "IN_STOCK" ? (
                      <>
                        <span className="d-block text-danger mt-1">
                          Out of Stock
                        </span>
                      </>
                    ) : null}
                  </Col>
                  <Col md={2} className="pl-md-0">
                    <span className="acc-price font-weight-500 mb-3 d-block">
                      <PriceTag
                        currency={
                          item.product.product_price_range.minimum_price
                            .final_price.currency === "USD"
                            ? "$"
                            : ""
                        }
                        value={
                          item.product.product_price_range.minimum_price
                            .final_price.value
                        }
                        id={decode(item.product.uid)}
                      />
                    </span>
                  </Col>
                  <Col md={2} className="text-md-right">
                    {item.product.stock_status !== "IN_STOCK" ? (
                      <Form.Control
                        type="text"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        onChange={(e) =>
                          ongroupedItemQntyChange(indx, e.target.value)
                        }
                        placeholder="0"
                        className="acc-qty d-inline-block"
                        disabled
                      />
                    ) : (
                      <Form.Control
                        type="text"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        onChange={(e) =>
                          ongroupedItemQntyChange(indx, e.target.value)
                        }
                        placeholder="0"
                        className="acc-qty d-inline-block"
                      />
                    )}
                  </Col>
                  <Col md={12} className="mt-md-3">
                    {/* <I18nLink
                      href={`/products/${item.product.url_key}#review`}
                      isMagentoRoute={1}
                    >
                      <div
                        className="yotpo bottomLine acc-product-overview-yotpo pb-3"
                        data-yotpo-product-id={decode(item.product.uid)}
                      />
                    </I18nLink> */}
                    <a
                      href="#"
                      onClick={() => goToPDPpage(`/en-us/products/${item.product.url_key}#review`)}
                    >
                      <div
                        className="yotpo bottomLine acc-product-overview-yotpo pb-3"
                        data-yotpo-product-id={decode(item.product.uid)}
                      />
                    </a>
                  </Col>
                  <Col md={12} className="mt-md-3">
                    <span className="price-tier mt-3 mt-md-0 d-block">
                      {item.product.price_tiers.length > 0
                        ? item.product.price_tiers.map((offer) => (
                            <p key={Math.random()} className="mb-md-0">
                              <span className="d-inline-flex">
                                {`Buy ${offer.quantity} for`}{" "}
                                <span>&nbsp;</span>{" "}
                                <PriceTag value={offer.final_price.value} />{" "}
                                <span>&nbsp;</span> each
                              </span>
                              {/* `and save ${offer.discount.percent_off}%` */}
                            </p>
                          ))
                        : ""}
                      {item.product.price_tier_quote &&
                        item.product.price_tier_quote.length > 0 && (
                          <p className="mb-md-0">
                            {`${item.product.price_tier_quote}+ `}
                            {"Contact us for "}
                            <a
                              aria-label="link"
                              type="button"
                              role="button"
                              tabIndex="0"
                              onKeyPress={() => null}
                              onClick={() => {
                                setActiveQuoteModal(true);
                                setActiveVarients(item);
                              }}
                              className="p-0 text-primary webkit-none"
                            >
                              quote
                            </a>
                            {" and lead time"}
                          </p>
                        )}
                    </span>
                  </Col>
                  {item.product.stock_status !== "IN_STOCK" &&
                    config.storeId && (
                      <>
                        {/* product stock notification for group each product */}
                        <Col md={12} className="mt-md-3">
                          <ProductStockNotify
                            checkStockId={item.product.uid}
                            parentProductId={props.configuration.uid}
                            item={item}
                            parentProduct={props}
                          />
                        </Col>
                      </>
                    )}
                </Row>
              </article>
            ))}
          </div>
        </>
      ) : (
        ""
      )}
      {/* for group product length end */}

      {/* counter start */}
      {((selectedVariantsObj &&
        selectedVariantsObj.product.product_for_sales) ||
        !selectedVariantsObj) &&
        counter}
      {/* counter end */}

      {props.configuration.stock_status !== "IN_STOCK" &&
        props.configuration.product_for_sales === 1 &&
        props.configuration.__typename === "SimpleProduct" && (
          <>
            <span className="d-block text-danger mb-3">Out of Stock</span>
            {/* product stock notification for simple product */}
            <ProductStockNotify
              checkStockId={props.configuration.uid}
              parentProductId={props.configuration.uid}
              item={props.configuration}
              parentProduct={props}
            />
          </>
        )}

      {/* buttons start */}
      {props.configuration.product_for_sales === 1 &&
      !editCartDetails &&
      ((selectedVariantsObj && selectedVariantsObj.product.product_for_sales) ||
        !selectedVariantsObj) ? (
        <>
          {props.configuration.stock_status !== "IN_STOCK" ? (
            <>
              <Button
                variant="medium"
                onClick={() => {
                  addToCartHandler(props.configuration);
                }}
                block={!(windowObj && windowSize.width >= 768)}
                className="text-uppercase mr-md-2 addToCartBtn"
                disabled
              >
                Add To Cart
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              onClick={() => {
                addToCartHandler(props.configuration);
                addToCartGtmValue(props.configuration);
              }}
              block={!(windowObj && windowSize.width >= 768)}
              className={`text-uppercase mr-md-2 addToCartBtn ${
                loadingCart || loadingCartConfig || loadingRemoveCart
                  ? "px-4"
                  : null
              }`}
              disabled={
                !!(loadingCart || loadingCartConfig || loadingRemoveCart)
              }
            >
              {loadingCart || loadingCartConfig || loadingRemoveCart
                ? "Adding..."
                : "Add To Cart"}
            </Button>
          )}
        </>
      ) : (
        ""
      )}
      {editCartDetails &&
      props.configuration.product_for_sales !== 0 &&
      ((selectedVariantsObj && selectedVariantsObj.product.product_for_sales) ||
        !selectedVariantsObj) ? (
        <Button
          variant="secondary"
          onClick={() => {
            removeItemThenAdd(props.configuration);
          }}
          block={!(windowObj && windowSize.width >= 768)}
          className="text-uppercase mr-md-2 addToCartBtn"
        >
          Update item to cart
        </Button>
      ) : (
        ""
      )}
      {
          (props.configuration.product_for_sales === 0)
              || (selectedVariantsObj && !selectedVariantsObj.product.product_for_sales)
              ? (
                  <I18nLink href={(props.configuration && props.configuration.custom_category && Number(props.configuration.custom_category) === Number(process.env.NEXT_PUBLIC_OEM_CUSTOM_CATEGORY)) ? '/company/oem-direct#aias-contact-form' : '/contact'}>
                      <Button aria-label="link" variant="primary" block={!(windowObj && windowSize.width >= 768)} className="text-uppercase mr-md-2">Contact Us</Button>
                  </I18nLink>
              ) : ''
      }
      {
          (props.configuration && props.configuration.custom_category && Number(props.configuration.custom_category) !== Number(process.env.NEXT_PUBLIC_OEM_CUSTOM_CATEGORY))
              ? (
                  <I18nLink href="/distributors">
                      <Button aria-label="link" variant="link" block={!(windowObj && windowSize.width >= 768)} className="text-uppercase acc-pdp-find-distri-bttn">Find a Distributor</Button>
                  </I18nLink>
              )
              : null
      }
      {/* buttons end */}
      {activeQuoteModal && (
        <ProductQuoteModal
          selectedSku={props.selectedSku}
          willOpenModal={activeQuoteModal}
          data={props.configuration}
          activeVarients={activeVarients}
          isCloseModal={quoteModalClose}
        />
      )}
      {pageLoader && <LoadingIndicator />}
    </div>
  );
};

export default ProductConfiguration;
