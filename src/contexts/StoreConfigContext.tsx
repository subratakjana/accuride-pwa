import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreConfigContext = createContext({});

const moveArr = (arr, from, to) => {
  arr.splice(to, 0, arr.splice(from, 1)[0]);
  return arr;
};

export const StoreConfigProvider = (props) => {
  const [allData, setAllData] = useState(null);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const apiEndpoint = `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}?query=query+getStoreConfig{storeConfig{base_currency_code+base_link_url+base_media_url+base_static_url+base_url+code : store_code+copyright+default_description+default_display_currency_code+default_keywords+default_title+head_shortcut_icon+header_logo_src+id : store_code+no_route+secure_base_link_url+secure_base_media_url+secure_base_static_url+secure_base_url+timezone+checkoutActonUrl+countryList{country_code+country_name+is_default+__typename+}__typename}}&operationName=getStoreConfig&variables={}`;
      const { data } = await axios.get(apiEndpoint);
      if (
        data &&
        data.data &&
        data.data.storeConfig.countryList &&
        data.data.storeConfig.countryList.length > 0
      ) {
        const findIndx = data.data.storeConfig.countryList.findIndex(
          (item) => item.is_default === 1,
        );
        if (findIndx >= 0) {
          const newList = moveArr(
            data.data.storeConfig.countryList,
            findIndx,
            0,
          );
          data.data.storeConfig.countryList = newList;
        }
        setAllData(data.data.storeConfig);
      }
      if (data) setLoader(false);
    }
    fetchData();
  }, []);
  if (loader) return null;
  return (
    <StoreConfigContext.Provider value={allData}>
      {props.children}
    </StoreConfigContext.Provider>
  );
};
