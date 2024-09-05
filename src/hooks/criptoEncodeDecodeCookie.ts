// Todo: try to use import instead
// const CryptoJS = require("crypto-js");

import { AES, enc } from "crypto-js";

const criptoEncode = (stringData) => {
  const encriptData = AES.encrypt(
    stringData,
    process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
  ).toString();
  return encriptData;
};

export const criptoDecode = (encriptData) => {
  const decryptedData = AES.decrypt(
    encriptData,
    process.env.NEXT_PUBLIC_RECAPTCHA_KEY,
  );
  const retrunData = decryptedData.toString(enc.Utf8);
  return retrunData;
};

export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
};
export const getCookie = (cname) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; ) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
    i += 1;
  }
  return "";
};

export const getConfigureableSku = (items) => {
  const { variants } = items.product;
  const configreOptions = items.configurable_options;
  const selectLength = configreOptions[0].value_id;
  if (configreOptions.length > 1) {
    const selectHanded = configreOptions[1].value_id;
    const selectedVariants = variants.find(
      (item) =>
        item.attributes[0].value_index === selectLength &&
        item.attributes[1].value_index === selectHanded,
    );
    return selectedVariants.product.sku;
  }
  const selectedVariants = variants.find(
    (item) => item.attributes[0].value_index === selectLength,
  );
  return selectedVariants?.product.sku;
};

export default criptoEncode;
