import React, { memo } from "react";
import { useRouter } from "next/router";
import { validateZoneLocale } from "@I18n/index";

const PriceTag = (props) => {
  const router = useRouter();
  const validZoneConfig = validateZoneLocale(router.query.zone_lang);
  const amount =
    typeof props.value === "number" ? props.value.toFixed(2) : props.value;
  const dClass = props.className ? props.className : "d-block";
  const priceCurrency = validZoneConfig.currency === "USD" ? "$" : "CA$";
  return (
    <span
      key={`ptag${Math.random()}`}
      className={`${dClass} price-figure`}
      id={props.id ? `price-${props.id}` : ""}
    >{`${priceCurrency}${amount}`}</span>
  );
};

export default memo(PriceTag);
