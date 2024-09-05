import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import dynamic from "next/dynamic";
import { I18nLink } from "@Components/Utilities";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Dropdown from "react-bootstrap/Dropdown";
import { ProductCompareContext } from "@Contexts/ProductCompareContext";
import NextImage from "next/legacy/image";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import useWindowDimensions from "@Hooks/windowDimention";
import InputSpinner from "@Components/InputSpinner";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation } from "graphql-hooks";
import { addSimpleProduct } from "@Graphql/queries/addSimpleProduct.graphql";
import { addConfigurableProduct } from "@Graphql/queries/addConfigurableProduct.graphql";
import { useRouter } from "next/router";

const GetConfigurePrice = dynamic(() => import("./configurePrice"));

/**
 * check is dissablde
 */
const isDisablde = (variants, valueIndx, productObj) => {
  let lengthDisabled = false;
  const handedArr =
    productObj.configurable_options.length === 1
      ? variants.filter(
          (item) =>
            item.attributes.length > 0 &&
            item.attributes[0].value_index === valueIndx,
        )
      : variants.filter((item) =>
          item.attributes.filter(
            (subItem) => subItem.value_index === valueIndx,
          ),
        );
  if (handedArr.length === 0) lengthDisabled = true;
  return lengthDisabled;
};

/**
 * check the length is out of stock on array repeat.
 */
const checkCurrentLengthStock = (valueIndx, variants) => {
  let isOutOfStock = false;
  const handedArr =
    variants &&
    variants.filter(
      (item) =>
        item.attributes.length > 0 &&
        item.attributes[0].value_index === valueIndx,
    );
  isOutOfStock =
    handedArr &&
    handedArr.filter((item) => item.product.stock_status !== "IN_STOCK")
      .length === handedArr.length;
  return isOutOfStock;
};

/**
 * check selected length handed item stock quntity and populate option
 */
const checkCurrentHandedStock = (
  indx,
  currentValueIndex,
  selectedLength,
  variants,
) => {
  let isOutOfStock = false;
  if (selectedLength) {
    const handedArr = variants.filter(
      (item) => item.attributes[0].value_index === selectedLength,
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

const Product = (props) => {
  const windowSize = useWindowDimensions();
  const { productObj, isListView, index } = props;
  const [windowObj, updateWindowObj] = useState(false);
  const [selectedLength, setSelectedLength] = useState(false);
  const [configureShow, setConfigureShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("length");
  const [selectedHanOption, setSelectedHanOption] = useState(null);
  const { addCart, notify, cartId, decode, loggedCustomerData } =
    useContext(AuthContext);
  const [variants, setVariants] = useState();
  const [show, setShow] = useState(false);
  const router = useRouter();
  const parentCat =
    router.query.magento_route.length > 1
      ? `${router.query.magento_route[0]}/`
      : "";

  const handleToggle = (nextIsOpen, event, metadata) => {
    if (nextIsOpen) {
      // Your code to handle opening the dropdown
      onMenuOpen();
    }
    setShow(!show);
  };
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });

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
    width: "56px",
    bosShadow: "none",
    borderRadius: "4px",
  };

  /** Select product provide GTM Value handling */
  const provideGtmValue = () => {
    const category =
      productObj.categories && productObj.categories.length > 0
        ? productObj.categories
            .map((cat) => (cat.id !== 7 ? cat.name : false))
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
              id: productObj.sku, // Product ID or SKU of the product.
              name: productObj.name, // The name of the product.
              brand: "Accuride", // The brand name of the product.
              category: category.length > 0 ? category.join(",") : "Shop", // Product category*
              list: "Mini Catalog", // The list name of item**
              price: props.price, // Item price
              position: index + 1,
            },
          ],
        },
      },
    };
    GTMEventFn(clickProductGTMdata);
  };
  /**
   * add to cart provide GTM value handling
   */
  const addtoCartGtmValue = (productType, productCount, selectedSku) => {
    const category =
      productObj.categories && productObj.categories.length > 0
        ? productObj.categories
            .map((cat) => (cat.id !== 7 ? cat.name : false))
            .filter(Boolean)
        : [];
    const addtoCartGTMdata = {
      event: "add_to_cart",
      ecommerce: {
        add: {
          actionField: {
            list: router.query.magento_route.join("/"),
          },
          products: [
            {
              id: selectedSku || productObj.sku, // Product ID or SKU of the product.
              name: productObj.name, // The name of the product.
              brand: "Accuride", // The brand name of the product.
              category: category.length > 0 ? category.join(",") : "Shop", // Product category*
              price:
                productObj.product_price_range.minimum_price.final_price.value, // Item price
              variant: productType,
              quantity: productCount,
            },
          ],
        },
      },
    };
    GTMEventFn(addtoCartGTMdata);
    if (window && window.dataLayer) {
      function gtag() {
        window.dataLayer.push(arguments);
      }
      // Call gtag with the 'add_to_cart' event and relevant arguments
      gtag("event", "add_to_cart", {
        value: productObj.product_price_range.minimum_price.final_price.value,
        items: [
          {
            id: selectedSku || productObj.sku,
            google_business_vertical: "retail",
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    setVariants(props.productObj.variants);
  }, []);

  const { cProducts, setCProducts } = useContext(ProductCompareContext);

  /**
   * graphql Query declare for simple product
   * when add to cart simple product
   */
  const [addSimpleProductFn, { loading: loadingCartSimple }] = useMutation(
    addSimpleProduct.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        notify("Your product has been successfully added to the cart.");
        addCart(data.addSimpleProductsToCart.cart.total_quantity);
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

  /**
   * get selected product sku as per product variants change.
   */
  const getConfigureValue = (items, returnProdID) => {
    const configreOptions = items.configurable_options;
    const selectLength = selectedOption && selectedOption.value;
    if (configreOptions.length > 1) {
      const selectHanded = selectedHanOption && selectedHanOption.value;
      const selectedVariants = variants.find(
        (item) =>
          item.attributes[0].value_index === selectLength &&
          item.attributes[1].value_index === selectHanded,
      );
      if (returnProdID === 1)
        return decode(
          selectedVariants ? selectedVariants.product.id : items.id,
        );
      return selectedVariants && selectedVariants.product.sku;
    }
    const selectedVariants = variants.find(
      (item) => item.attributes[0].value_index === selectLength,
    );
    if (returnProdID === 1)
      return decode(selectedVariants ? selectedVariants.product.id : items.id);
    return selectedVariants?.product.sku;
  };

  const updateHanded = () => {
    const items = productObj;
    const configueLength = selectedOption;
    if (configueLength !== "length" && configueLength !== "door_height") {
      //= ==========factors.track start=================
      let guestData = localStorage.getItem("finalTotal");
      guestData = guestData ? JSON.parse(guestData) : null;

      const selectedCount = document.querySelector(
        `[name='count-${items.id}']`,
      );
      const getQuantity = Number(
        selectedCount.getElementsByTagName("input")[0].value,
      );
      const paramsObject = {
        totalPrice: null,
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
        productName: items?.name,
        productId: getConfigureValue(items, 1),
        productQuantity: getQuantity,
        currency: items?.product_price_range.minimum_price.final_price.currency,
        ordeId: null,
      };
      if (items) {
        let selectedVariantsPrice = 0;
        if (selectedOption?.value) {
          const selectLength = selectedOption.value;
          const selectedVariants = variants.find(
            (item) => item.attributes[0].value_index === selectLength,
          );
          selectedVariantsPrice =
            selectedVariants?.product.price_range.minimum_price.final_price
              .value;
        } else {
          selectedVariantsPrice = props.price;
        }

        paramsObject.unitPrice = selectedVariantsPrice;
        paramsObject.totalPrice = selectedVariantsPrice * getQuantity;
      }

      try {
        factors.track("Length Selected", paramsObject);
        console.log("Length Selected", paramsObject);
      } catch (err) {
        console.error(err);
      }
      // ===========factors.track end=================
      setSelectedLength(selectedOption && selectedOption.value);
    }
  };

  useEffect(() => {
    if (productObj && productObj.__typename === "ConfigurableProduct")
      updateHanded();
  }, [selectedOption, selectedHanOption]);

  /**
   * add to cart functionality.
   * code handling and query pass with calculation simple product and configurable product.,
   * group product awill be redirect from listing page.
   * after query update with mutation local cache update with writequery.
   * @param {*} items
   */
  const addToCartHandler = (items) => {
    setSelectedLength(false);
    setConfigureShow(false);
    setSelectedOption("length");
    setSelectedHanOption(null);
    const cartItem = [];
    const paramsObject = {
      totalPrice: items.product_price_range.minimum_price.final_price.value,
      emailID: loggedCustomerData && loggedCustomerData.customer.email,
      phoneNo: null,
      name:
        loggedCustomerData && loggedCustomerData.customer
          ? `${loggedCustomerData.customer.firstname} ${loggedCustomerData.customer.lastname}`
          : null,
      productName: items.name,
      productId: decode(items.id),
      productQuantity: 1,
      unitPrice: items.product_price_range.minimum_price.final_price.value,
      currency: items.product_price_range.minimum_price.final_price.currency,
      ordeId: null,
    };

    if (items.__typename === "ConfigurableProduct") {
      let selectedVariantsPrice = 0;
      if (selectedOption && selectedOption.value) {
        const selectLength = selectedOption.value;
        const selectedVariants = variants.find(
          (item) => item.attributes[0].value_index === selectLength,
        );
        selectedVariantsPrice =
          selectedVariants &&
          selectedVariants.product.price_range.minimum_price.final_price.value;
      } else {
        selectedVariantsPrice = props.price;
      }

      paramsObject.unitPrice = selectedVariantsPrice;
      const selectedCount = document.querySelector(
        `[name='count-${items.id}']`,
      );
      let selectedProductCountValue = 0;
      if (selectedCount)
        selectedProductCountValue = Number(
          selectedCount.getElementsByTagName("input")[0].value,
        );
      paramsObject.productId = getConfigureValue(items, 1);
      paramsObject.productQuantity = selectedProductCountValue;
      paramsObject.totalPrice =
        selectedProductCountValue * selectedVariantsPrice;

      try {
        factors.track("Add To Cart Button Click", paramsObject);
        console.log("Add To Cart Button Click", paramsObject);
      } catch (err) {
        console.error(err);
      }
      const confOpt = productObj?.configurable_options;

      if (
        !selectedProductCountValue ||
        selectedProductCountValue === 0 ||
        (confOpt && confOpt.length > 0 && selectedOption === "length") ||
        (confOpt && confOpt.length > 1 && !selectedHanOption)
      ) {
        notify("You need to choose options for your item.", "warn");
        const asPath = `/${router.query.zone_lang}/products/${parentCat}${items.url_key}`;
        const pathName = "/[zone_lang]/products/[...magento_route]";
        provideGtmValue();
        router.push(
          {
            pathname: `${pathName}`,
            query: { magento_route: [`${items.url_key}`] },
          },
          `${asPath}`,
        );
      } else {
        const lengthSkuValue = getConfigureValue(items);
        addtoCartGtmValue(
          "ConfigurableProduct",
          selectedProductCountValue,
          lengthSkuValue,
        );
        cartItem.push({
          parent_sku: items.sku,
          data: {
            sku: lengthSkuValue,
            quantity: selectedProductCountValue,
          },
        });
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
      }
    } else if (items.__typename === "SimpleProduct") {
      try {
        factors.track("Add To Cart Button Click", paramsObject);
        console.log("Add To Cart Button Click", paramsObject);
      } catch (err) {
        console.error(err);
      }
      addtoCartGtmValue("SimpleProduct", 1);
      cartItem.push({ data: { sku: items.sku, quantity: 1 } });
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
        });
      }
    }
  };

  const buildActionButton = () => {
    if (props.type === 1) {
      if (productObj.available_exit_link === 1) {
        return (
          <I18nLink
            href={`/products/${parentCat}${productObj.url_key}`}
            isMagentoRoute={1}
          >
            <Button
              variant="primary"
              onClick={() => provideGtmValue()}
              className={`text-uppercase ${isListView ? "" : "mt-3"}`}
              size="sm"
            >
              View Product
            </Button>
          </I18nLink>
        );
      }
      if (windowObj && windowSize.width > 1024) {
        return (
          <div className={`d-flex w-100 ${isListView ? "flex-column" : ""}`}>
            {productObj.__typename === "GroupedProduct" ? (
              <I18nLink
                href={`/products/${parentCat}${productObj.url_key}`}
                isMagentoRoute={1}
              >
                <Button
                  onClick={() => provideGtmValue()}
                  variant="secondary"
                  block
                  className={`text-uppercase ${isListView ? "" : "mt-3 mr-1"}`}
                  size="sm"
                  disabled={!!(loadingCartConfig || loadingCartSimple)}
                >
                  {loadingCartConfig || loadingCartSimple
                    ? "Adding..."
                    : "Add to Cart"}
                </Button>
              </I18nLink>
            ) : (
              <>
                {productObj.__typename === "SimpleProduct" &&
                productObj.stock_status !== "IN_STOCK" ? (
                  <Button
                    onClick={() => {
                      addToCartHandler(productObj);
                    }}
                    variant="medium"
                    block
                    className={`text-uppercase ${
                      isListView ? "" : "mt-3 mr-1"
                    }`}
                    size="sm"
                    disabled
                  >
                    Out of Stock
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      addToCartHandler(productObj);
                    }}
                    variant="secondary"
                    block
                    className={`text-uppercase ${
                      isListView ? "" : "mt-3 mr-1"
                    }`}
                    size="sm"
                    disabled={!!(loadingCartConfig || loadingCartSimple)}
                  >
                    {loadingCartConfig || loadingCartSimple
                      ? "Adding..."
                      : "Add to Cart"}
                  </Button>
                )}
              </>
            )}
            <I18nLink
              href={`/products/${parentCat}${productObj.url_key}`}
              isMagentoRoute={1}
            >
              <Button
                variant="primary"
                onClick={() => provideGtmValue()}
                block
                className={`text-uppercase ${isListView ? "" : "mt-3 ml-1"}`}
                size="sm"
              >
                Details
              </Button>
            </I18nLink>
          </div>
        );
      }
      if (windowObj && windowSize.width <= 1024) {
        return (
          <I18nLink
            href={`/products/${parentCat}${productObj.url_key}`}
            isMagentoRoute={1}
          >
            <Button
              variant="secondary"
              onClick={() => provideGtmValue()}
              block
              className="text-uppercase mt-3"
            >
              Shop Now
            </Button>
          </I18nLink>
        );
      }
    }
    return (
      <div className={`d-flex w-100 ${isListView ? "flex-column" : ""}`}>
        <I18nLink
          href={`/products/${parentCat}${productObj.url_key}`}
          isMagentoRoute={1}
        >
          <Button
            variant="primary"
            className={`text-uppercase ${isListView ? "" : "mt-3"}`}
            block={!(windowObj && windowSize.width > 1024)}
            size={windowObj && windowSize.width > 1024 ? "sm" : null}
          >
            View Product
          </Button>
        </I18nLink>
      </div>
    );
  };

  const addProuctCompareHandler = (id, sku, title) => {
    setCProducts({
      product_id: decode(id),
      product_sku: sku,
      product_name: title,
    });
  };

  const generateCompareElement = useCallback(
    (_sku) => {
      let r = "text-primary text-uppercase font-weight-600";
      if (cProducts.length > 0) {
        cProducts.filter((item) => {
          if (item.product_sku === _sku)
            r = "text-medium text-uppercase font-weight-600";
          return r;
        });
      }
      return r;
    },
    [cProducts],
  );

  const onMenuOpen = () => {
    // ===========factors.track start=================
    const getProdDetails = productObj;
    const guestDataStr = localStorage.getItem("finalTotal");
    const guestData = guestDataStr ? JSON.parse(guestDataStr) : null;
    const selectedCount = document.querySelector(
      `[name='count-${getProdDetails.id}']`,
    );
    const getQuantity =
      selectedCount &&
      Number(selectedCount.getElementsByTagName("input")[0].value);

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
      productId: getProdDetails && decode(getProdDetails.id),
      productQuantity: getQuantity,
      unitPrice:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.value,
      totalPrice:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.value *
          getQuantity,
      currency:
        getProdDetails &&
        getProdDetails.product_price_range.minimum_price.final_price.currency,
      ordeId: null,
    };

    try {
      factors.track("Length Button Click", paramsObject);
      console.log("Length Button Click", paramsObject);
    } catch (err) {
      console.error(err);
    }
    //= ==========factors.track end=================
  };

  const { lengthArr, otherArr } = useMemo(() => {
    const lengths = [];
    const others = [];
    if (productObj && productObj.__typename === "ConfigurableProduct") {
      productObj.configurable_options.map((configure, indx) => {
        configure.values.map((configurLabel, indx2) => {
          if (
            (indx === 0 &&
              checkCurrentLengthStock(configurLabel.value_index, variants)) ||
            (indx === 1 &&
              checkCurrentHandedStock(
                indx2,
                configurLabel.value_index,
                selectedLength,
                variants,
              ))
          ) {
            if (!isDisablde(variants, configurLabel.value_index, productObj)) {
              if (indx === 0)
                lengths.push({
                  label: `${configurLabel.label} - Out of Stock`,
                  value: configurLabel.value_index,
                  isDisabled: true,
                });
              if (indx === 1)
                others.push({
                  label: `${configurLabel.label} - Out of Stock`,
                  value: configurLabel.value_index,
                  isDisabled: true,
                });
            }
          } else {
            if (
              configure.attribute_code === "length" ||
              configure.attribute_code === "door_height"
            )
              lengths.push({
                label: `${configurLabel.label}`,
                value: configurLabel.value_index,
              });
            if (
              configure.attribute_code !== "length" &&
              configure.attribute_code !== "door_height"
            )
              others.push({
                label: `${configurLabel.label}`,
                value: configurLabel.value_index,
              });
          }
          return true;
        });
        return true;
      });
    }
    return { lengthArr: lengths, otherArr: others };
  }, [productObj, variants]);

  return (
    <Col
      xs={6}
      sm={4}
      xl={isListView ? "12" : ""}
      className={`acc-product-block mb-3 d-flex align-items-start px-2 ${
        isListView ? "col-xxl-12 flex-row" : "col-xxl-3 flex-column"
      }`}
      onMouseEnter={() => setConfigureShow(true)}
    >
      <div className={`position-relative ${isListView ? "mr-4" : "w-100"}`}>
        {/* configuration start */}
        {configureShow &&
        props.type === 1 &&
        productObj.available_exit_link !== 1 &&
        windowObj &&
        windowSize.width > 1024 &&
        productObj.__typename === "ConfigurableProduct" ? (
          <div className="acc-configuration">
            <Form.Row>
              {productObj.configurable_options.map((configure) => (
                <Form.Group
                  key={configure.label}
                  className={`${isListView ? "col-12" : "col"}`}
                >
                  {(configure.attribute_code === "length" ||
                    configure.attribute_code === "door_height") && (
                    <Dropdown
                      className="acc-custom-select-dropdown"
                      show={show}
                      onToggle={handleToggle}
                    >
                      <Dropdown.Toggle
                        variant="light"
                        id={`dropdown-${configure.label}`}
                      >
                        {selectedOption?.label
                          ? selectedOption.label
                          : configure.label}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {lengthArr.map((option) => (
                          <Dropdown.Item
                            key={option.value}
                            onClick={() => setSelectedOption(option)}
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
                  )}
                  {configure.attribute_code !== "length" &&
                    configure.attribute_code !== "door_height" && (
                      <Dropdown
                        className={`acc-custom-select-dropdown ${
                          selectedOption === "length"
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
                    )}
                </Form.Group>
              ))}
              <Form.Group as={Col} xs={12}>
                <Form.Label className="d-block">Quantity:</Form.Label>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="acc-counter acc-modified-counter acc-counter-sm"
                    name={`count-${productObj.id}`}
                  >
                    <InputSpinner
                      type="real"
                      min={1}
                      step={1}
                      value={1}
                      name={`count-${productObj.id}`}
                      variant="primary"
                    />
                  </div>
                  <span className="acc-uom">{productObj.quantity_in}</span>
                </div>
              </Form.Group>
            </Form.Row>
          </div>
        ) : null}
        {/* configuration end */}

        {/* img */}
        <I18nLink
          href={`/products/${parentCat}${productObj.url_key}`}
          isMagentoRoute={1}
        >
          <a
            className="d-block acc-plp-list-next-image"
            aria-label="link"
            role="button"
            tabIndex={0}
            onKeyPress={() => provideGtmValue()}
            onClick={() => provideGtmValue()}
          >
            <div className="embed-responsive embed-responsive-10by9">
              <NextImage
                src={props.imgSrc}
                alt={productObj.image.label}
                title={productObj.image.label}
                layout="fill"
                objectFit="contain"
                objectPosition="center"
                priority={index <= 3}
                className={`img embed-responsive-item ${
                  isListView ? "acc-list-img" : ""
                }`}
                quality={65}
              />
            </div>
          </a>
        </I18nLink>
      </div>
      <div className="flex-1">
        {/* sku */}
        <I18nLink
          href={`/products/${parentCat}${productObj.url_key}`}
          isMagentoRoute={1}
        >
          <span
            aria-label="link"
            role="button"
            tabIndex={0}
            onKeyPress={() => provideGtmValue()}
            onClick={() => provideGtmValue()}
            className={`sku text-primary d-block ${isListView ? "" : "mt-2"}`}
          >
            {productObj.sku}
          </span>
        </I18nLink>
        {/* title */}
        <p className="mb-1 acc-product-title">
          <I18nLink
            href={`/products/${parentCat}${productObj.url_key}`}
            isMagentoRoute={1}
          >
            <a
              aria-label="link"
              role="button"
              tabIndex={0}
              onKeyPress={() => provideGtmValue()}
              onClick={() => provideGtmValue()}
            >
              {productObj.name}
            </a>
          </I18nLink>
        </p>
        {/* price */}
        {props.type === 1 && productObj.available_exit_link !== 1 ? (
          <p className="acc-price font-weight-500 mb-0">
            <GetConfigurePrice
              selectedHanOption={selectedHanOption}
              selectedOption={selectedOption}
              variants={variants}
              currency={props.currency}
              items={productObj}
              selectedLength={selectedLength}
              price={props.price}
            />
          </p>
        ) : (
          ""
        )}

        {/* rating */}
        <I18nLink
          href={`/products/${parentCat}${productObj.url_key}#review`}
          isMagentoRoute={1}
        >
          <div
            className="yotpo bottomLine pt-3"
            data-yotpo-product-id={decode(productObj.id)}
          />
        </I18nLink>
      </div>
      <div className={`${isListView ? "flex-none acc-product-btns" : "w-100"}`}>
        {buildActionButton()}
        {props.compareDisplay !== "hide" ? (
          <h6 className={`${isListView ? "mt-2 mb-0" : "mt-3"}`}>
            {windowObj ? (
              <span
                tabIndex={0}
                role="button"
                onKeyPress={() => false}
                className={generateCompareElement(productObj.sku)}
                onClick={() =>
                  addProuctCompareHandler(
                    productObj.id,
                    productObj.sku,
                    productObj.name,
                  )
                }
              >
                Compare
              </span>
            ) : (
              ""
            )}
          </h6>
        ) : (
          ""
        )}
      </div>
    </Col>
  );
};

export default React.memo(Product);
