import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { Button } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import globalData from "@Components/Utilities/globalData";
import { getConfigureableSku } from "@Hooks/criptoEncodeDecodeCookie";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import dynamic from "next/dynamic";

const CartTotal = dynamic(() => import("./CartTotal"));
const ShippingZipForm = dynamic(() => import("./ShippingZipForm"));

const CartSummary = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [countryList] = useState(globalData.countryList);
  const {
    priceData,
    shippingAddress,
    productList,
    globalLoader,
    setGlobalLoader,
  } = props;
  const [refreshCount, refreshMode] = useState(null);
  const { simpleRedirect, loggedCustomerData, decode } =
    useContext(AuthContext);
  const [shippingAmount, setShippingAmount] = useState(null);
  const [cartSummaryLoader, setCartSummaryLoader] = useState(false);
  const [shippingConfigData] = useState(
    shippingAddress
      ? {
          region_id: shippingAddress.region_id,
          region: shippingAddress.region.label,
          region_code: shippingAddress.region.code,
          country_id: shippingAddress.country.code,
          postcode: shippingAddress.postcode,
        }
      : {
          region_id: 0,
          region: "",
          region_code: "",
          country_id: countryList.length > 0 ? countryList[0].country_code : "",
          postcode: "",
        },
  );

  /** GTM Value handling */
  const provideGtmValue = () => {
    const CheckoutGTMdata = {
      event: "begin_checkout",
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
        brand: "Accuride", // The brand name of the product.
        category: category.length > 0 ? category.join(",") : "Shop", // Product category*
        price: item.product.price_range.minimum_price.final_price.value, // Item price
        quantity: item.quantity,
      };
    });
    CheckoutGTMdata.ecommerce.checkout.products = [...gtmProducts];
    GTMEventFn(CheckoutGTMdata);
  };

  const proceedTo = () => {
    const allItems = props.productList;
    const paramsObject = {
      totalPrice: props.priceData.grand_total.value,
      emailID: loggedCustomerData && loggedCustomerData.customer.email,
      phoneNo: null,
      name:
        loggedCustomerData && loggedCustomerData.customer
          ? `${loggedCustomerData.customer.firstname} ${loggedCustomerData.customer.lastname}`
          : null,
      currency: props.priceData.grand_total.currency,
      ordeId: null,
    };
    if (allItems) {
      allItems.map((item, index) => {
        paramsObject[`productName${index + 1}`] = item.product.name;
        paramsObject[`productId${index + 1}`] = decode(item.product.id);
        paramsObject[`unitPrice${index + 1}`] = item.prices.price.value;
        paramsObject[`productQuantity${index + 1}`] = item.quantity;
        return true;
      });
    }

    try {
      factors.track("Procced To Checkout", paramsObject);
      console.log("Procced To Checkout", paramsObject);
    } catch (err) {
      console.error(err);
    }
    provideGtmValue();
    simpleRedirect("/checkout/shipping");
  };

  useEffect(() => {
    refreshMode(refreshCount + 1);
    if (windowSize.width !== 0) updateWindowObj(true);
  }, [priceData]);

  return (
    <>
      {/* header start */}
      <header>
        <h2
          className={`mb-0 ${
            windowObj && windowSize.width > 1024 ? "text-uppercase" : ""
          }`}
        >
          Summary
        </h2>
      </header>
      {/* header end */}
      {priceData !== null && refreshCount !== null ? (
        <>
          <ShippingZipForm
            setShippingAmount={setShippingAmount}
            shippingConfigData={shippingConfigData}
            refreshCount={refreshCount}
            setGlobalLoader={setGlobalLoader}
            globalLoader={globalLoader}
            setCartSummaryLoader={setCartSummaryLoader}
            cartSummaryLoader={cartSummaryLoader}
          />
          <CartTotal
            priceData={priceData}
            shippingTax={shippingAmount}
            globalLoader={globalLoader}
            cartSummaryLoader={cartSummaryLoader}
          />
          <div className="text-center">
            <Button
              variant="secondary"
              size="lg"
              className="text-uppercase"
              block={
                !(
                  windowObj &&
                  windowSize.width >= 768 &&
                  windowSize.width <= 1024
                )
              }
              onClick={proceedTo}
            >
              Proceed to Checkout
            </Button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CartSummary;
