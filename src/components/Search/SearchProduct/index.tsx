import { useContext, useEffect, useState } from "react";
import { Col, Button, Form } from "react-bootstrap";
import InputSpinner from "@Components/InputSpinner";
import Dropdown from "react-bootstrap/Dropdown";
import { addSimpleProduct } from "@Graphql/queries/addSimpleProduct.graphql";
import { addConfigurableProduct } from "@Graphql/queries/addConfigurableProduct.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation } from "graphql-hooks";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const GetSearchConfigurePrice = dynamic(
  () => import("./GetSearchConfigurePrice"),
);

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

const SearchProduct = (props) => {
  const { product, isListView } = props;
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [selectedLength, setSelectedLength] = useState(false);
  const [configureShow, setConfigureShow] = useState(false);
  const [variants, setVariants] = useState();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedHanOption, setSelectedHanOption] = useState(null);

  const { addCart, notify, cartId, loggedCustomerData } =
    useContext(AuthContext);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  useEffect(() => {
    setVariants(product.variant_info);
  }, [product]);

  const [imgError, setImgError] = useState(false);

  const nextPlaceHolder = (src, alt) => (
    <NextImage
      src={src}
      width={320}
      height={320}
      layout="intrinsic"
      alt={alt}
      className={`img ${isListView ? "acc-list-img" : ""}`}
    />
  );

  const picture = new Image();
  const productImage = (image, altText) => {
    picture.src = image;
    picture.onerror = () => setImgError(true);
    return imgError
      ? nextPlaceHolder("/assets/images/demo-placeholder-350-314.png", "")
      : nextPlaceHolder(image, altText);
  };
  const [show, setShow] = useState(false);
  const handleToggle = (nextIsOpen, event, metadata) => {
    if (nextIsOpen) {
      // Your code to handle opening the dropdown
      onMenuOpen();
    }
    setShow(!show);
  };

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
  const getConfigureValue = (items, returnProdID, returnPrice) => {
    const selectLength = selectedOption && selectedOption.value;
    if (items.handed_list.length > 1 && selectLength) {
      const selectHanded = selectedHanOption && selectedHanOption.value;
      const selectedVariants = variants.find(
        (item) =>
          Number(item.attributes[0].value_index) === Number(selectLength) &&
          item.attributes[1].value_index === selectHanded,
      );
      if (returnProdID === 1)
        return selectedVariants && selectedVariants.product.id;
      if (returnPrice === 1)
        return selectedVariants.product.price_range.minimum_price.final_price
          .value;
      return selectedVariants.product.sku;
    }
    const selectedVariants = variants.find(
      (item) => Number(item.attributes[0].value_index) === Number(selectLength),
    );
    if (returnProdID === 1)
      return selectedVariants ? selectedVariants.product.id : items.product_id;
    if (returnPrice === 1)
      return selectedVariants
        ? selectedVariants.product.price_range.minimum_price.final_price.value
        : items.min_price;
    return selectedVariants.product.sku;
  };

  const updateHanded = (productId, items) => {
    const configueLength = selectedOption;
    if (configueLength) {
      // //===========factors.track start=================
      let guestData = localStorage.getItem("finalTotal");
      guestData = guestData ? JSON.parse(guestData) : null;

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
        unitPrice: null,
        productName: items && items.title,
        productId:
          items && items.product_type === "configurable"
            ? getConfigureValue(items, 1)
            : items.product_id,
        currency: router.query.zone_lang === "en-ca" ? "CAD" : "USD",
        ordeId: null,
      };

      if (items.product_type === "configurable") {
        const selectedCount = document.querySelector(
          `[name='count-${items.sku}']`,
        );
        let selectedProductCountValue = 0;
        if (selectedCount)
          selectedProductCountValue = Number(
            selectedCount.getElementsByTagName("input")[0].value,
          );
        paramsObject.productQuantity = selectedProductCountValue;
        paramsObject.unitPrice = getConfigureValue(items, 0, 1);
        paramsObject.totalPrice =
          getConfigureValue(items, 0, 1) * selectedProductCountValue;
      } else {
        paramsObject.productQuantity = 1;
      }

      try {
        factors.track("Length Selected", paramsObject);
        console.log("Length Selected", paramsObject);
      } catch (err) {
        console.error(err);
      }
      // //===========factors.track end=================
      setSelectedLength(selectedOption && selectedOption.value);
    }
  };

  useEffect(() => {
    updateHanded(product.sku, product);
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
    setSelectedOption(null);
    setSelectedHanOption(null);
    const cartItem = [];
    const selectedCount = document.querySelector(
      `[name='count-${product.sku}']`,
    );
    const getQuantity =
      selectedCount &&
      Number(selectedCount.getElementsByTagName("input")[0].value);
    const paramsObject = {
      emailID: loggedCustomerData && loggedCustomerData.customer.email,
      phoneNo: null,
      name:
        loggedCustomerData && loggedCustomerData.customer
          ? `${loggedCustomerData.customer.firstname} ${loggedCustomerData.customer.lastname}`
          : null,
      productName: items.title,
      productId: items.product_id,
      productQuantity: getQuantity,
      currency: router.query.zone_lang === "en-ca" ? "CAD" : "USD",
      ordeId: null,
    };

    let selectedVariantsPrice = 0;
    if (selectedLength && selectedLength !== "") {
      const selectLength = selectedOption && selectedOption.value;
      const selectedVariants = variants.find(
        (item) =>
          Number(item.attributes[0].value_index) === Number(selectLength),
      );
      selectedVariantsPrice = Number(
        selectedVariants.product.price_range.minimum_price.final_price.value,
      );
    } else {
      selectedVariantsPrice = Number(items.price);
    }

    paramsObject.unitPrice = selectedVariantsPrice;
    paramsObject.totalPrice = selectedVariantsPrice;
    if (items.product_type === "configurable") {
      const getSelectedCount = document.querySelector(
        `[name='count-${items.sku}']`,
      );
      let selectedProductCountValue = 0;
      if (getSelectedCount)
        selectedProductCountValue = Number(
          getSelectedCount.getElementsByTagName("input")[0].value,
        );
      paramsObject.productId = getConfigureValue(items, 1);
      paramsObject.productQuantity = selectedProductCountValue;
      paramsObject.totalPrice =
        selectedProductCountValue * selectedVariantsPrice;

      try {
        console.log("Add To Cart Button Click", paramsObject);
        factors.track("Add To Cart Button Click", paramsObject);
      } catch (err) {
        console.error(err);
      }
      const lengthlist = product && product.length_list;
      const handedlist = product && product.handed_list;
      const doorHeightList = product && product.door_height_list;
      if (
        !selectedProductCountValue ||
        selectedProductCountValue === 0 ||
        (lengthlist && lengthlist.length > 0 && !selectedOption) ||
        (handedlist && handedlist.length > 0 && !selectedHanOption) ||
        (doorHeightList && doorHeightList.length > 0 && !selectedOption)
      ) {
        notify("You need to choose options for your item.", "warn");
        window.location.href = items.clickURL;
      } else {
        const lengthSkuValue = getConfigureValue(items);
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
    } else if (items.product_type === "simple") {
      try {
        console.log("Add To Cart Button Click", paramsObject);
        factors.track("Add To Cart Button Click", paramsObject);
      } catch (err) {
        console.error(err);
      }

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

  /** dynamic addto cart and view details button return */
  const buildActionButton = () => {
    if (
      product.product_for_sales === "Yes" &&
      product.available_exit_link !== "Yes"
    ) {
      if (windowObj && windowSize.width > 1024) {
        return (
          <div className={`d-flex w-100 ${isListView ? "flex-column" : ""}`}>
            {product.product_type === "grouped" ? (
              <Button
                href={product.clickURL}
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
            ) : (
              <Button
                onClick={() => {
                  addToCartHandler(product);
                }}
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
            )}
            <Button
              href={product.clickURL}
              variant="primary"
              block
              className={`text-uppercase d-flex align-items-center justify-content-center ${
                isListView ? "" : "mt-3 ml-1"
              }`}
              size="sm"
            >
              Details
            </Button>
          </div>
        );
      }
      if (windowObj && windowSize.width <= 1024) {
        return (
          <Button
            href={product.clickURL}
            variant="secondary"
            block
            className="text-uppercase mt-3"
          >
            Shop Now
          </Button>
        );
      }
    }
    return (
      <div className={`d-flex w-100 ${isListView ? "flex-column" : ""}`}>
        <Button
          href={product.clickURL}
          variant="primary"
          className={`text-uppercase ${isListView ? "" : "mt-3"}`}
          block
          size={windowObj && windowSize.width > 1024 ? "sm" : null}
        >
          Details
        </Button>
      </div>
    );
  };

  // For Yotpo Review
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });
  // End

  const onMenuOpen = () => {
    //= ==========factors.track start=================
    const getProdDetails = product;
    let guestData = localStorage.getItem("finalTotal");
    guestData = guestData ? JSON.parse(guestData) : null;
    const selectedCount = document.querySelector(
      `[name='count-${getProdDetails.sku}']`,
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
      productName: getProdDetails && getProdDetails.title,
      productId: getProdDetails && getProdDetails.product_id,
      productQuantity: getQuantity,
      unitPrice: getProdDetails && getProdDetails.min_price,
      totalPrice: getProdDetails && getProdDetails.min_price * getQuantity,
      currency: router.query.zone_lang === "en-ca" ? "CAD" : "USD",
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

  const lengthArr = [];
  if (product && product.product_type === "configurable") {
    product.length_list.map((configureLength, indx) => {
      lengthArr.push({
        label: configureLength,
        value: product.length_id_list[indx],
      });
    });
  }

  const doorHeightArr = [];
  if (product && product.product_type === "configurable") {
    product.door_height_list.map((configureLength, indx) => {
      doorHeightArr.push({
        label: configureLength,
        value: product.door_height_id_list[indx],
      });
      return true;
    });
  }

  const handedArr = [];
  if (product && product.product_type === "configurable") {
    product.handed_list.map((configureHanded, indx) => {
      handedArr.push({
        label: configureHanded,
        value: product.handed_id_list[indx],
      });
    });
  }

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
      <div className={`position-relative ${isListView ? "mr-4" : ""}`}>
        {configureShow &&
        product.product_for_sales === "Yes" &&
        product.available_exit_link !== "Yes" &&
        windowObj &&
        windowSize.width > 1024 &&
        product.product_type === "configurable" ? (
          <div className="acc-configuration">
            <Form.Row>
              {product.length_list.length > 0 && (
                <Form.Group as={Col}>
                  <Dropdown
                    className="acc-custom-select-dropdown"
                    show={show}
                    onToggle={handleToggle}
                  >
                    <Dropdown.Toggle variant="primary">
                      {selectedOption && selectedOption.label
                        ? selectedOption.label
                        : "Length"}
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
                </Form.Group>
              )}
              {product.door_height_list.length > 0 && (
                <Form.Group as={Col}>
                  <Dropdown
                    className="acc-custom-select-dropdown"
                    show={show}
                    onToggle={handleToggle}
                  >
                    <Dropdown.Toggle variant="primary">
                      {selectedOption ? selectedOption.label : "Door Height"}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {doorHeightArr.map((option) => (
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
                </Form.Group>
              )}
              {product.handed_list.length > 0 && (
                <Form.Group as={Col}>
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
                      {handedArr.map((option) => (
                        <Dropdown.Item
                          key={option.value}
                          onSelect={() => setSelectedHanOption(option)}
                          className={
                            selectedHanOption &&
                            selectedHanOption.label === option.label &&
                            "active"
                          }
                        >
                          {option.label}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Form.Group>
              )}
              <Form.Group as={Col} xs={12}>
                <Form.Label className="d-block">Quantity:</Form.Label>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div
                    className="acc-counter acc-modified-counter acc-counter-sm"
                    name={`count-${product.sku}`}
                  >
                    <InputSpinner
                      type="real"
                      min={1}
                      step={1}
                      value={1}
                      name={`count-${product.sku}`}
                      variant="primary"
                    />
                  </div>
                  <span className="acc-uom">{product.uom}</span>
                </div>
              </Form.Group>
            </Form.Row>
          </div>
        ) : null}
        {/* configuration end */}
        {/* img */}
        <a href={product.clickURL}>
          {productImage(product.image, product.image.label)}
        </a>
      </div>
      <div className="flex-1">
        {/* sku */}
        <span className="sku text-primary d-block mt-2">{product.sku}</span>
        {/* title */}
        <p className="mb-1 acc-product-title">
          <a href={product.clickURL}>{product.title}</a>
        </p>
        {/* price */}

        {product.product_for_sales === "Yes" &&
          product.available_exit_link !== "Yes" && (
            <p className="acc-price font-weight-500 mb-0">
              <GetSearchConfigurePrice
                selectedOption={selectedOption}
                variants={variants}
                currency={product.currency_code}
                items={product}
                selectedLength={selectedLength}
                price={product.min_price}
              />
            </p>
          )}
        {/* Yotpo Review */}
        <a href={`${product.clickURL}#review`}>
          <div
            className="yotpo bottomLine pt-3 pb-2"
            data-yotpo-product-id={product.product_id}
          />
        </a>
        {/* End */}
      </div>
      <div className={`${isListView ? "flex-none acc-product-btns" : "w-100"}`}>
        {buildActionButton()}
      </div>
    </Col>
  );
};

export default SearchProduct;
