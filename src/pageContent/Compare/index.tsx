import React, { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import { useManualQuery } from "graphql-hooks";
import GET_COMPARE_PRODUCT_BY_FILTER from "@Graphql/queries/getCompareProductDetails.graphql";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { I18nLink, PriceTag } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { IoIosClose } from "react-icons/io";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";

const Compare = (props) => {
  const { decode } = useContext(AuthContext);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [compareItems, setCProducts] = useState([]);
  const [loadCompareData, { loading: compareLoading }] = useManualQuery(
    GET_COMPARE_PRODUCT_BY_FILTER.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setCProducts(data.products.items);
      },
    },
  );

  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });
  // --- remove compareItem ---
  const clearCompareItem = (indx) => {
    const newData = [...compareItems];
    newData.splice(indx, 1);
    setCProducts(newData);
    window.localStorage.setItem("compareProducts", JSON.stringify(newData));
    props.refreshList("");
  };

  // display price
  const displayPrice = (productType, priceRange) => {
    switch (productType) {
      case "GroupedProduct":
        return `${priceRange.minimum_price.final_price.value.toFixed(
          2,
        )} - $${priceRange.maximum_price.final_price.value.toFixed(2)}`;
      case "ConfigurableProduct":
        return priceRange.minimum_price.final_price.value;
      default:
        return priceRange.minimum_price.final_price.value;
    }
  };

  useEffect(() => {
    const cProducts = JSON.parse(
      window.localStorage.getItem("compareProducts"),
    );
    const sku = cProducts.map((item) => item.product_sku);
    loadCompareData({ variables: { sku }, refetch: { sku } });
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <section className="acc-compare-product pt-4">
      {/* header start */}
      <header className="px-3 mb-4">
        <h1 className="mb-0">Compare Products</h1>
      </header>
      {/* header end */}

      <div className="acc-compare-table">
        <table>
          {/* thead start */}
          <thead>
            <tr>
              {compareItems.map((compareItem, indx) => (
                <th key={compareItem.sku} valign="top" className="text-right">
                  <span
                    role="button"
                    tabIndex={0}
                    onKeyPress={() => false}
                    onClick={() => clearCompareItem(indx)}
                  >
                    <a
                      aria-label="link"
                      className="h1 d-inline-block cursor-pointer"
                    >
                      <IoIosClose />
                    </a>
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          {/* thead end */}

          {/* tbody start */}
          <tbody>
            <tr>
              {compareItems.map((compareItem) => (
                <td key={compareItem.sku} valign="top">
                  <I18nLink
                    href={`/products/${compareItem.url_key}`}
                    isMagentoRoute={1}
                  >
                    <NextImage
                      src={compareItem.image.gallery_url}
                      alt=""
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={250}
                      height={225}
                      className="acc-img"
                    />
                  </I18nLink>
                  <I18nLink
                    href={`/products/${compareItem.url_key}`}
                    isMagentoRoute={1}
                  >
                    <h2 className="acc-heading mb-3">
                      <span className="d-block mb-1">
                        {compareItem.compare_attribute_list[0].attribute_value}
                      </span>
                      <span
                        className={`d-block font-size-md cursor-pointer ${
                          windowObj && windowSize.width > 1024
                            ? "font-weight-500 text-primary"
                            : "text-dark"
                        }`}
                      >
                        {compareItem.name}
                      </span>
                    </h2>
                  </I18nLink>

                  {compareItem.product_for_sales === 1 ? (
                    <span className="d-block font-weight-500 acc-price">
                      <PriceTag
                        currency={
                          compareItem.product_price_range.minimum_price
                            .final_price.currency === "USD"
                            ? "$"
                            : ""
                        }
                        value={displayPrice(
                          compareItem.__typename,
                          compareItem.product_price_range,
                        )}
                      />
                    </span>
                  ) : null}
                  <I18nLink
                    href={`/products/${compareItem.url_key}#review`}
                    isMagentoRoute={1}
                  >
                    <div
                      className="yotpo bottomLine pt-3"
                      data-yotpo-product-id={decode(compareItem.id)}
                    />
                  </I18nLink>
                  <footer>
                    <I18nLink
                      href={`/products/${compareItem.url_key}`}
                      isMagentoRoute={1}
                    >
                      {compareItem.product_for_sales === 1 ? (
                        <Button
                          variant="secondary"
                          block={!(windowObj && windowSize.width > 1024)}
                          className="font-weight-500 text-primary text-uppercase mt-3"
                        >
                          Shop Now
                        </Button>
                      ) : (
                        <Button
                          variant="primary"
                          block={!(windowObj && windowSize.width > 1024)}
                          className="font-weight-500 text-uppercase mt-3"
                        >
                          View Product
                        </Button>
                      )}
                    </I18nLink>
                  </footer>
                </td>
              ))}
            </tr>
            {compareItems.length > 0 ? (
              <>
                {compareItems[0].compare_attribute_list.map(
                  (attribute, indx) => (
                    <React.Fragment key={attribute.attribute_name}>
                      {compareItems.filter(
                        (compItem) =>
                          compItem.compare_attribute_list[indx] &&
                          compItem.compare_attribute_list[indx].attribute_value,
                      ).length > 0 &&
                      attribute.attribute_name !== "applications" ? (
                        <>
                          {compareItems[0].compare_attribute_list[indx]
                            .frontend_label !== "Custom Canonical" &&
                          compareItems[0].compare_attribute_list[indx]
                            .frontend_label !== "Available Online" ? (
                            <tr>
                              {compareItems.map((compareItem) => (
                                <td key={compareItem.sku} valign="top">
                                  <h3 className="text-uppercase mb-3">
                                    {
                                      compareItem.compare_attribute_list[indx]
                                        .frontend_label
                                    }
                                  </h3>
                                  {attribute.attribute_name ===
                                    "specifications" ||
                                  attribute.attribute_name === "description" ||
                                  attribute.attribute_name ===
                                    "special_features" ||
                                  attribute.attribute_name ===
                                    "product_features" ||
                                  attribute.attribute_name ===
                                    "short_description" ? (
                                    <span
                                      className="customHtml"
                                      dangerouslySetInnerHTML={{
                                        __html:
                                          compareItem.compare_attribute_list[
                                            indx
                                          ].attribute_value,
                                      }}
                                    />
                                  ) : (
                                    <span>
                                      {
                                        compareItem.compare_attribute_list[indx]
                                          .attribute_value
                                      }
                                    </span>
                                  )}
                                </td>
                              ))}
                            </tr>
                          ) : null}
                        </>
                      ) : null}
                    </React.Fragment>
                  ),
                )}
              </>
            ) : null}
          </tbody>
          {/* tbody end */}
        </table>
      </div>
      {compareLoading ? (
        <div className="px-3">
          <Row>
            {[1, 2, 3].map((i) => (
              <Col xs={6} xl={4} key={i}>
                <Skeleton
                  height={windowObj && windowSize.width > 1024 ? 225 : 140}
                />
                <h2 className="acc-heading mb-3 mt-2">
                  <span className="d-block mb-1">
                    <Skeleton count={0.75} />
                  </span>
                  <span className="d-block font-size-md">
                    <Skeleton count={1} />
                  </span>
                </h2>

                <span className="d-block acc-price mb-3">
                  <Skeleton count={0.25} />
                </span>
                <Skeleton count={0.4} height={36} />
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
    </section>
  );
};

export default Compare;
