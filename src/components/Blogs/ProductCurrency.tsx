import { useEffect } from "react";
import { useManualQuery } from "graphql-hooks";
import { PriceTag } from "@Components/Utilities";
import { getProductCurrency } from "@Graphql/queries/getProductCurrency.graphql";

const ProductCurrency = (props) => {
  const getSku = props.sku;
  let ProductCurrencys = [];
  let currency = "";
  let price = "";
  // API calling
  const [getProductCurrencies, { data }] = useManualQuery(
    getProductCurrency.loc.source.body,
    {
      fetchPolicy: "cache-and-network",
      variables: { sku: getSku },
    },
  );
  useEffect(() => {
    getProductCurrencies();
  }, []);
  // assigned API fetched data
  if (data) {
    ProductCurrencys = data.products;
    const { items } = ProductCurrencys;
    currency =
      items.length > 0
        ? ProductCurrencys.items[0].product_price_range.minimum_price
            .final_price.currency
        : "";
    price =
      items.length > 0
        ? ProductCurrencys.items[0].product_price_range.minimum_price
            .final_price.value
        : "";
  }
  if (currency === "USD") {
    currency = "$";
  }
  return ProductCurrencys && price ? (
    <h6 className="m-0 text-dark">
      <PriceTag
        className="d-inline-block font-weight-600 font-size-sm"
        currency="$"
        value={price}
      />
    </h6>
  ) : (
    ""
  );
};

export default ProductCurrency;
