const YotpoScript = (zoneLang, _old = false) => {
  const currentZoneLang = zoneLang || "en-us";
  const scriptSrc =
    currentZoneLang === "en-ca"
      ? `https://cdn-widgetsrepository.yotpo.com/v1/loader/${process.env.NEXT_PUBLIC_YOTPO_CA_APP_KEY}`
      : `https://cdn-widgetsrepository.yotpo.com/v1/loader/${process.env.NEXT_PUBLIC_YOTPO_NA_APP_KEY}`;
  const scriptOld =
    currentZoneLang === "en-ca"
      ? `https://staticw2.yotpo.com/${process.env.NEXT_PUBLIC_YOTPO_CA_APP_KEY}/widget.js`
      : `https://staticw2.yotpo.com/${process.env.NEXT_PUBLIC_YOTPO_NA_APP_KEY}/widget.js`;
  return _old === false ? scriptSrc : scriptOld;
};
export default YotpoScript;
