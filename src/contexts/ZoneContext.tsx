import React, { useState, createContext } from "react";
import { useRouter } from "next/router";
import { defaultConfig, validateZoneLocale } from "@I18n/index";

// create the language context with default selected language
export const ZoneContext = createContext({
  zone: defaultConfig.zone,
  config: defaultConfig,
  setZone: () => null,
});

// it provides the language context to app
export const ZoneProvider = (props) => {
  const [zone, setZone] = useState(props.zone);
  const [config, setConfig] = useState(props);
  const { query } = useRouter();

  // store the preference
  // sync zone value on client-side route changes
  React.useEffect(() => {
    if (zone !== window.localStorage.getItem("zone")) {
      window.localStorage.setItem("zone", zone);
    }
    const validateZoneLang = validateZoneLocale(query.zone_lang);
    if (validateZoneLang) {
      setZone(validateZoneLang.code);
      setConfig(validateZoneLang);
    }
  }, [query.zone_lang, zone]);

  const provider = {
    zone,
    config,
    setZone: (selectedZone) => {
      setZone(selectedZone);
    },
  };

  return (
    <ZoneContext.Provider value={provider}>
      {props.children}
    </ZoneContext.Provider>
  );
};
