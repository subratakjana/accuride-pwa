import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Markets.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const IconListingSection = dynamic(
  () => import("@Components/IconListingSection"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const MarketLanding = ({ marketList }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("#")[0],
      },
    ];
  }

  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
    ];
  }

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {marketList
        ? marketList.map((rows) => (
            <div
              className={styles["acc-markets-banner-wrapper"]}
              key={`${rows.id}_marketLanding`}
            >
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle={styles["acc-market-landing-banner"]}
              />
              <div className={styles["acc-market-iconList-wrapper"]}>
                {/* icon list section start */}
                <IconListingSection iconList={rows.iconLists} />
                {/* icon list section end */}
              </div>
            </div>
          ))
        : ""}
    </>
  );
};

export default MarketLanding;
