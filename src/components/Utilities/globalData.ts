import countriesData from "../../../public/static/countries.json";

let zoneLang = "en-us";
if (typeof window !== "undefined") {
  // zoneLang = window.location.pathname.match(/\/([a-z]{2}-[a-z]{2})\//);
  zoneLang = window.location.pathname.match(/\/([a-z]{2}-[a-z]{2})\//)[1];
}
const globalData = {
  countryList: zoneLang === "en-ca" ? countriesData.reverse() : countriesData,
};

export default globalData;
