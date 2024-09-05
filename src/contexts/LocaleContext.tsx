import React, { useState, createContext } from "react";
import { useRouter } from "next/router";
import { validateZoneLocale, defaultConfig } from "@I18n/index";

// create the language context with default selected language
export const LocaleContext = createContext({
  locale: defaultConfig.locale,
  setLocale: () => null,
});

// it provides the language context to app
export const LocaleProvider = (props) => {
  const [locale, setLocale] = useState(props.locale);
  const { query } = useRouter();

  // store the preference
  // sync locale value on client-side route changes
  React.useEffect(() => {
    if (locale !== window.localStorage.getItem("locale")) {
      window.localStorage.setItem("locale", locale);
    }
    const validate = validateZoneLocale(query.zone_lang);
    if (validate) {
      setLocale(validate.defaultLocale);
    }
  }, [query.zone_lang, locale]);

  const provider = {
    locale,
    setLocale: (selectedLocale) => {
      setLocale(selectedLocale);
    },
  };

  return (
    <LocaleContext.Provider value={provider}>
      {props.children}
    </LocaleContext.Provider>
  );
};
