import { PriceTag } from "@Components/Utilities";
import { memo, useMemo } from "react";

const GetConfigurePrice = (props) => {
  const { selectedHanOption, selectedOption, selectedLength, price, variants } =
    props;
  const selectedVariantsPrice = useMemo(() => {
    if (!selectedLength || selectedLength === "") {
      return price;
    }
    const selectLength = selectedOption.value;
    if (selectedHanOption) {
      const selectHanOption = selectedHanOption.value;
      const selectedVariants = variants.find(
        (item) =>
          item.attributes[0].value_index === selectLength &&
          item.attributes[1].value_index === selectHanOption,
      );
      return selectedVariants.product.price_range.minimum_price.final_price
        .value;
    }
    const selectedVariants = variants.find(
      (item) => item.attributes[0].value_index === selectLength,
    );
    return selectedVariants.product.price_range.minimum_price.final_price.value;
  }, [selectedOption, selectedHanOption, selectedLength, price, variants]);

  return <PriceTag value={selectedVariantsPrice} />;
};

export default memo(GetConfigurePrice);
