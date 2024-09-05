import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./AerospaceWatercraftSolutions.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const AerospaceWatercraftSolutions = ({ aerospacewatercraftsolutions }) => {
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
      { url: ``, name: pathSegments[1], isClickable: false },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
        isClickable: false,
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
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
        isClickable: false,
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
        name: pathSegments[2],
      },
    ];
  }

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {aerospacewatercraftsolutions
        ? aerospacewatercraftsolutions.map((rows) => (
            <div key={`aero_${rows.id}`}>
              {/* Banner Component */}
              <div className={styles["acc-market-inner-pages-banner-wrapper"]}>
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                />
              </div>
              {/* Banner Component End */}
              {/* Page Introduction */}
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              {/* Page Introduction End */}
              {/* Section1 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section1StaticBanner}
                winSize={windowSize}
                customStyle="pb-0"
              />
              {/* Section1 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section2Title}
                description={rows.section2Description}
                dataArr={rows.featuredProducts}
              />
              {/* Featured Product End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default AerospaceWatercraftSolutions;
