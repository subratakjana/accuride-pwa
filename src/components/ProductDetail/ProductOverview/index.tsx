import { useState, useEffect, useContext } from "react";
import { PriceTag } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import dynamic from "next/dynamic";

const ProductQuoteModal = dynamic(() => import("../ProductQuoteModal"));
const SocialShare = dynamic(() => import("../SocialShare"));
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ProductOverview = (props) => {
  const { goToReview, overview } = props;
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  const [activeQuoteModal, setActiveQuoteModal] = useState(false);
  const [activeVarients, setActiveVarients] = useState(false);
  const { decode } = useContext(AuthContext);

  // Yotpo
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });

  const quoteModalClose = () => {
    setActiveQuoteModal(false);
  };

  /** GTM Value handling */
  const GetProductPrice = (getData) => {
    let productPrice = "";
    if (getData.overview.__typename === "GroupedProduct") {
      productPrice =
        getData.overview.product_price_range.minimum_price.final_price.value;
    } else {
      let selectedVariants = false;
      if (getData.overview.variants) {
        if (getData.selectedSku) {
          selectedVariants = getData.overview.variants.find(
            (item) => item.product.sku === getData.selectedSku,
          );
        } else if (getData.editCartDetails) {
          const valueId =
            getData.editCartDetails.configurable_options[0].value_id;
          selectedVariants = getData.editCartDetails.product.variants.find(
            (item) => item.attributes[0].value_index === valueId,
          );
        }
      }

      productPrice =
        getData.overview.product_price_range.minimum_price.final_price.value;
      if (selectedVariants) {
        productPrice =
          selectedVariants.product.price_range.minimum_price.final_price.value;
      }
    }
    return productPrice;
  };

  const provideGtmValue = (productType) => {
    const category =
      props.overview.categories && props.overview.categories.length > 0
        ? props.overview.categories
            .map((cat) => (Number(decode(cat.uid)) !== 7 ? cat.name : false))
            .filter(Boolean)
        : [];
    const productDetailGTMdata = {
      event: "view_item",
      ecommerce: {
        detail: {
          actionField: {
            list: router.query.magento_route.join("/"), // The list name where the impression was viewed.**
          },
          products: [],
        },
      },
    };
    const gtmProducts = [
      {
        id: props.overview.sku, // Product ID or SKU of the product.
        name: props.overview.name, // The name of the product.
        brand: "Accuride", // The brand name of the product.
        category: category.length > 0 ? category.join(",") : "Shop", // Product category*
        variant: productType, // What variant of the main product this is.
        price: GetProductPrice(props), // Item price
      },
    ];
    productDetailGTMdata.ecommerce.detail.products = [...gtmProducts];
    GTMEventFn(productDetailGTMdata);
    if (window && window.dataLayer) {
      function gtag() {
        window.dataLayer.push(arguments);
      }
      // Call gtag with the 'view_item' event and relevant arguments
      gtag("event", "view_item", {
        value: GetProductPrice(props),
        items: [
          {
            id: props.overview.sku,
            google_business_vertical: "retail",
          },
        ],
      });
    }
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    if (props.overview.product_for_sales !== 0)
      provideGtmValue(props.overview.__typename);
  }, []);

  let dispayPrice;
  let selectedVariants = false;
  if (props.overview.variants) {
    if (props.selectedSku) {
      selectedVariants = props.overview.variants.find(
        (item) => item.product.sku === props.selectedSku,
      );
    } else if (props.editCartDetails) {
      const valueId = props.editCartDetails.configurable_options[0].value_id;
      selectedVariants = props.editCartDetails.product.variants.find(
        (item) => item.attributes[0].value_index === valueId,
      );
    }
  }
  if (props.overview.product_for_sales !== 0) {
    if (props.overview.__typename !== "GroupedProduct") {
      let productPrice =
        props.overview.product_price_range.minimum_price.final_price.value;
      if (selectedVariants) {
        productPrice =
          selectedVariants.product.price_range.minimum_price.final_price.value;
      }
      dispayPrice = (
        <span className="d-block acc-price h5 text-dark mt-4 font-weight-500">
          <PriceTag
            currency={
              props.overview.product_price_range.minimum_price.final_price
                .currency === "USD"
                ? "$"
                : ""
            }
            value={productPrice}
            id={decode(props.overview.uid)}
          />
        </span>
      );
    }
  }
  /**
   * display discount and quote for simple and configurable products
   * pmondal70-30-01-2021
   */
  const displayDiscountAndQuote = () => {
    const discountPriceTire = selectedVariants
      ? selectedVariants.product.price_tiers
      : props.overview.price_tiers;
    const discountPriceRange = selectedVariants
      ? selectedVariants.product.price_range
      : props.overview.price_range;  
    const priceQuote = selectedVariants
      ? selectedVariants.product.price_tier_quote
      : props.overview.price_tier_quote;
    let discount = "";
    discount = (
      <>
        {discountPriceTire.length > 0 &&
          discountPriceTire.map((discunt) => (
            <div
              key={discunt.quantity}
              className="acc-product-discunt align-items-lg-center d-flex"
            >
              <span className="d-block mr-1">{`Buy ${discunt.quantity} for`}</span>
              <span className="d-block font-weight-bold mr-1 mb-0 h3">
                <PriceTag
                  currency={discunt.final_price.currency === "USD" ? "$" : ""}
                  value={discountPriceRange.minimum_price.final_price.value - discunt.discount.amount_off}
                />
              </span>
              <span className="d-block">
                {overview.quantity_in === "Pair" ||
                overview.quantity_in === "Pairs"
                  ? "per pair"
                  : "each"}
              </span>
            </div>
          ))}
        {priceQuote && priceQuote.length > 0 && (
          <p className="mb-md-0">
            {`${priceQuote}+ `}
            {"Contact us for "}
            {props.overview.__typename === "SimpleProduct" ? (
              <a
                type="button"
                role="button"
                tabIndex="0"
                onKeyPress={() => null}
                onClick={() => {
                  setActiveQuoteModal(true);
                  setActiveVarients({ product: props.overview });
                }}
                className="p-0 text-primary webkit-none"
              >
                quote
              </a>
            ) : (
              <a
                type="button"
                role="button"
                tabIndex="0"
                onKeyPress={() => null}
                onClick={() => {
                  setActiveQuoteModal(true);
                  setActiveVarients(selectedVariants);
                }}
                className="p-0 text-primary webkit-none"
              >
                quote
              </a>
            )}
            {" and lead time"}
          </p>
        )}
      </>
    );

    return discount;
  };

  useEffect(() => {
    setActiveVarients(selectedVariants);
  }, [props.selectedSku]);
  const [showLessStatus, setShowLessStatus] = useState(false);

  return (
    <div className="acc-product-overview">
      <h1 className="acc-heading mb-4">
        <span className="d-block acc-product-title pb-4">
          {props.overview.sku}
        </span>
        <span className="d-block text-dark acc-product-sub-title text-uppercase">
          {props.overview.name}
        </span>
      </h1>
      {props.overview.available_exit_link !== 1 ? (
        <div
          aria-label="yotpo-review"
          role="button"
          tabIndex={0}
          onClick={() => goToReview()}
          onKeyPress={() => goToReview()}
        >
          <div
            className="yotpo bottomLine acc-product-overview-yotpo pb-4"
            data-yotpo-product-id={decode(props.overview.uid)}
          />
        </div>
      ) : null}

      {windowObj && windowSize.width > 1024 ? <SocialShare /> : null}

      <div className="acc-cms-content">
        <div
          className={
            showLessStatus === false ? "acc-show-less" : "acc-show-more"
          }
        >
          <HTMLContent
            id={props.overview.uid}
            content={props.overview.description.html}
          />
        </div>
        {props.overview.description.html.length > 167 ? (
          <span
            className="acc-show-less-link"
            onClick={() => setShowLessStatus(!showLessStatus)}
            role="button"
            tabIndex={0}
            onKeyPress={() => false}
          >
            {showLessStatus === false ? "Show more" : "Show less"}
          </span>
        ) : (
          ""
        )}
      </div>
      {props.overview.available_exit_link !== 1 && (
        <p className="acc-details-product-price">{dispayPrice}</p>
      )}
      {displayDiscountAndQuote()}
      {activeQuoteModal && (
        <ProductQuoteModal
          selectedSku={props.selectedSku}
          willOpenModal={activeQuoteModal}
          data={props.overview}
          activeVarients={activeVarients}
          isCloseModal={quoteModalClose}
        />
      )}
    </div>
  );
};

export default ProductOverview;
