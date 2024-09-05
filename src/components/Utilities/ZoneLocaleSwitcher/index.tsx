import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import { zoneConfig, locales } from "@I18n/index";
import { ZoneContext } from "@Contexts/ZoneContext";
import { LocaleContext } from "@Contexts/LocaleContext";

const ZoneLocaleSwitcher = () => {
  const zones = Object.keys(zoneConfig);
  const router = useRouter();
  const { zone } = useContext(ZoneContext);
  const { locale } = useContext(LocaleContext);

  const buildRegex = () => {
    const zoneLocale = [];
    zones.map((z) =>
      zoneConfig[z].locales.map((l) => zoneLocale.push(`${z}-${l}`)),
    );
    const regex = new RegExp(`^/(${zoneLocale.join("|")})`);
    return regex;
  };

  const handleChange = useCallback(
    (e) => {
      if (router.pathname === "/") {
        router.push("/[zone_lang]", `/${e.target.value}`);
      } else {
        const regex = buildRegex();
        router.push(
          router.pathname,
          router.asPath.replace(regex, `/${e.target.value}`),
        );
      }
    },
    [router],
  );

  return (
    <select onChange={handleChange} value={`${locale}-${zone}`}>
      {zones.map((z) => (
        <optgroup label={zoneConfig[z].name} key={zoneConfig[z].code}>
          {zoneConfig[z].locales.map((l) => (
            <option
              key={`${z}-${locales[l].code}`}
              value={`${z}-${locales[l].code}`}
            >
              {`${locales[l].name} (${zoneConfig[z].name})`}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
};

export default ZoneLocaleSwitcher;
