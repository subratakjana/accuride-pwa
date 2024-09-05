import { useState, useContext, useEffect } from "react";
import { PriceTag } from "@Components/Utilities";
import { currentExchangeRate } from "@Graphql/queries/getCurrecyExchangeRate.graphql";
import { useManualQuery } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";

const GetSearchConfigurePrice = (props) => {
  const { notify } = useContext(AuthContext);
  const router = useRouter();
  const { selectedOption, selectedLength, items, price, variants } = props;
  const [getExchangeRate, setExchangeRate] = useState(null);

  const [currentExchangeRateFn] = useManualQuery(
    currentExchangeRate.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        const getData = data.currency;
        setExchangeRate(getData.exchange_rates[0].rate);
      },
    },
  );

  useEffect(() => {
    currentExchangeRateFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  }, []);

  /**
   * get selected product price as per product variants change.
   */
  const getConfigurePrice = () => {
    let selectedVariantsPrice = 0;
    if (selectedLength && selectedLength !== "") {
      const selectLength = selectedOption.value;
      const selectedVariants = variants.find(
        (item) =>
          Number(item.attributes[0].value_index) === Number(selectLength),
      );
      selectedVariantsPrice =
        selectedVariants &&
        selectedVariants.product.price_range.minimum_price.final_price.value;
    } else {
      selectedVariantsPrice = price;
    }
    if (router.query.zone_lang === "en-ca" && getExchangeRate) {
      selectedVariantsPrice = (selectedVariantsPrice * getExchangeRate).toFixed(
        2,
      );
    }

    return (
      <PriceTag
        currency={props.currency === "USD" ? "$" : "$"}
        value={selectedVariantsPrice}
      />
    );
  };

  return getConfigurePrice();
};

export default GetSearchConfigurePrice;
