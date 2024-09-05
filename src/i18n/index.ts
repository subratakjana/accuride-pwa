import axios from "axios";

export const locales = {
  en: { code: "en", name: "English" },
  de: { code: "de", name: "German" },
  es: { code: "es", name: "Spanish" },
};

export const zoneConfig = [
  {
    code: "us",
    currency: "USD",
    name: "United States",
    store: "default",
    storeId: 1,
    defaultLocale: "en",
  },
  {
    code: "ca",
    currency: "CAD",
    name: "Canada",
    store: "canada",
    storeId: 8,
    defaultLocale: "en",
  },
];

export const defaultConfig = { ...zoneConfig[0] };

/** get client location and IP by fetch pm70-1-5-22
 * cache the update lang config
 * stop multiple time call fetch query
 */
let updateLang = false;
export const getDetectedLocation = async () => {
  let zoneLang = defaultConfig;
  if (updateLang) return updateLang;
  // const requestURl = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query={getClientIp{ip+name+code+defaultLocale+__typename}}`;
  // const response = await axios.get(requestURl).catch(() => { });
  const requestURl =
    "https://api.ipgeolocation.io/ipgeo?apiKey=393c23a11ec548a7bd4e78af2ad5cb12";
  const response = await axios.get(requestURl).catch(() => {});

  if (response && !response.data.error) {
    // const { getClientIp } = response.data.data;
    const getClientIp = response.data;
    const filteredZoneLang = zoneConfig.filter(
      (item) => item.code === getClientIp.country_code2.toLowerCase(),
    );
    if (filteredZoneLang.length > 0) zoneLang = { ...filteredZoneLang[0] };
    localStorage.setItem(
      "clientIpDtls",
      Buffer.from(JSON.stringify(getClientIp), "utf8").toString("base64"),
    );
  }
  updateLang = zoneLang;
  return zoneLang;
};

/** validate the URL zone lang and return pm70-1-5-22 */
export const validateZoneLocale = (zoneLang) => {
  if (typeof zoneLang === "string" && zoneLang !== "") {
    const zoneLangArr = zoneLang.split("-");
    const config = zoneConfig.filter(
      (item) =>
        item.code === zoneLangArr[1] && item.defaultLocale === zoneLangArr[0],
    );
    if (config.length > 0) return { ...config[0], valid: true };
    return { ...zoneConfig[0], valid: false };
  }
  return { ...zoneConfig[0], valid: false };
};
