import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./VendingCashHandling.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const VendingCashHandling = ({ vendingCashHandlingss }) => {
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
      {vendingCashHandlingss
        ? vendingCashHandlingss.map((rows) => (
            <div key={`vch_${rows.id}`}>
              {/* Banner Component */}
              <div className={styles["acc-market-inner-pages-banner-wrapper"]}>
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                />
              </div>
              {/* End */}
              {/* Page Introduction */}
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              {/* End */}
              {/* Section1 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section1ImageDesc}
                winSize={windowSize}
                model="vendingCashHandlings"
                customStyle="p-0 acc-gray-bg-right-image"
              />
              {/* Section1 Component End */}
              {/* Section2 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section2ImageDesc}
                winSize={windowSize}
                model="vendingCashHandlings"
                customStyle="p-0 acc-gray-bg-left-image"
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section3ImageDesc}
                winSize={windowSize}
                model="vendingCashHandlings"
                customStyle="p-0 acc-gray-bg-right-image"
              />
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section4ImageDesc}
                winSize={windowSize}
                model="vendingCashHandlings"
                customStyle="p-0 acc-gray-bg-left-image"
              />
              {/* Section4 Component End */}
              {/* Section5 Component */}
              <StaticBannerBgImage
                data={rows.section5ImageDesc}
                model="vendingCashHandlings"
                bgImage={rows.section5ImageDesc.bannerImage}
                sectionDesc={rows.section5ImageDesc.bannerDescription.text}
                winSize={windowSize}
                customStyle="acc-vending-page-bannerbgimage"
              />
              {/* Section5 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section6Title}
                description={rows.section11Description}
                dataArr={rows.featuredProducts}
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default VendingCashHandling;
