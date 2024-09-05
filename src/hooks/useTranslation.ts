import { useContext } from "react";
import { dictionaryList } from "@I18n/index";
import { LocaleContext } from "@Contexts/LocaleContext";

const useTranslation = () => {
  const { locale } = useContext(LocaleContext);
  const t = (key) =>
    dictionaryList[locale][key] || dictionaryList.en[key] || "";

  return {
    t,
  };
};

export default useTranslation;
