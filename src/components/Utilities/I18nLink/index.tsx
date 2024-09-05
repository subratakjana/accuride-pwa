import { useContext } from "react";
import Link from "next/link";
import { ZoneContext } from "@Contexts/ZoneContext";
import { LocaleContext } from "@Contexts/LocaleContext";

/**
 * Important note:
 * ****************
 * This utilies requires further improvements,
 * when more routing stretegy has been added into the project to build dynamic link.
 */

const I18nLink = ({ href, isMagentoRoute = 0, ...props }) => {
  const { zone } = useContext(ZoneContext);
  const { locale } = useContext(LocaleContext);

  const zoneLangKey = "[zone_lang]";
  const magentoRouteKey = "[...magento_route]";
  const zoneLang = `${locale || "en"}-${zone || "us"}`;

  const buildLink = (url) => {
    const parsedRoute = url.split("/");
    if (parsedRoute.length > 0 && parsedRoute[1]) {
      if (isMagentoRoute === 1) {
        return `/${parsedRoute[1]}/${magentoRouteKey}`;
      }
      return url;
    }
    return "";
  };

  return (
    <Link
      prefetch={false}
      href={`/${zoneLangKey}${buildLink(href)}`}
      as={`/${zoneLang}${buildLink(href) === "" ? "" : href}`}
      legacyBehavior
    >
      {props.children}
    </Link>
  );
};

export default I18nLink;
