import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import NextImage from "next/legacy/image";
import styles from "./EmergencyRecreationalUtilityTransporation.module.scss";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const Banner = dynamic(() => import("@Components/Markets/Banner"));
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const FeatureProduct = dynamic(() =>
    import("@Components/Markets/FeatureProduct")
);
const ImageSliderWithDescriptions = dynamic(() =>
    import("@Components/Markets/ImageSliderWithDescription")
);
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const StaticBannerLeftImage = dynamic(() =>
    import("@Components/Markets/StaticBannerLeftImage")
);

const EmergencyRecreationalUtilityTransporation = ({
    EmergencyRecreationalUtilityTransporations,
}) => {
    const windowSize = useWindowDimensions();
    const [windowObj] = useState(false);
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

            {EmergencyRecreationalUtilityTransporations
                ? EmergencyRecreationalUtilityTransporations.map((rows) => (
                      <div
                          key={`ee_${rows.id}`}
                          className={
                              styles["acc-emergency-recreational-utility"]
                          }
                      >
                          {/* Banner Component */}
                          <div
                              className={
                                  styles[
                                      "acc-market-inner-pages-banner-wrapper"
                                  ]
                              }
                          >
                              <Banner
                                  windowSize={windowSize}
                                  windowObj={windowObj}
                                  bannerList={rows.banner}
                                  customStyle={"acc-market-emergency-banner"}
                              />
                          </div>
                          {/* End */}

                          {/* Tab Section */}
                          <section className="section-padding text-center acc-market-emergency-info pb-0">
                              <Container>
                                  <article
                                      className={`${
                                          windowObj && windowSize.width > 1024
                                              ? "w-75 mx-auto"
                                              : ""
                                      }`}
                                  >
                                      <h1 className="m-0 pb-3 text-uppercase">
                                          {rows.section1Title}
                                      </h1>
                                      <div>
                                          <p>{rows.section1SubTitle}</p>
                                      </div>
                                  </article>
                              </Container>
                          </section>
                          <TabSection
                              tabList={rows.section2tabs}
                              customStyle="acc-three-tab acc-button-style-tab acc-market-emergency-recreational-tab"
                          />
                          {/* End */}

                          {/* Line Separator */}
                          <div className="bg-secondary acc-line-separator"></div>
                          {/* End */}

                          {/* Featured Product */}
                          <FeatureProduct
                              title={rows.featuredProductTitle}
                              description={rows.featuredProductDescription}
                              dataArr={rows.featuredProducts}
                              customStyle={
                                  "acc-emeregency-recreational-vehicle-page-featured-product"
                              }
                          />
                          {/* End */}

                          {/* Bg Image Slider */}
                          <ImageSliderWithDescriptions
                              data={rows.section4slider}
                              model="testimonialses"
                              bgImage=""
                              sectionDesc=""
                              winSize={windowSize}
                              customStyle="acc-emergency-recreational-vehicle-page-img-slid-desc"
                          />
                          {/* End */}

                          {/* Partners Section */}
                          <section className="acc-partners-section text-center pb-lg-5">
                              <Introduction
                                  dataTitle={rows.section5Title}
                                  winSize={windowSize}
                                  customStyle={
                                      "acc-market-emergency-partners-section"
                                  }
                              />
                              <Container>
                                  <article>
                                      <NextImage
                                          src={rows.section6ImageGallery.url}
                                          alt={
                                              rows.section6ImageGallery.fileName
                                          }
                                          layout="intrinsic"
                                          objectFit="contain"
                                          objectPosition="center"
                                          width={1363}
                                          height={300}
                                      />
                                  </article>
                              </Container>
                          </section>
                          {/* End */}

                          {/* Warranty Section */}
                          <StaticBannerLeftImage
                              data={rows.section7imagedesc}
                              winSize={windowSize}
                          />
                          {/* End */}
                      </div>
                  ))
                : ""}
        </>
    );
};

export default EmergencyRecreationalUtilityTransporation;
