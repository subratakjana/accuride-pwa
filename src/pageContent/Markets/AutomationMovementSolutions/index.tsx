import { useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Button } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./AutomationMovementSolutions.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const CardCarousel = dynamic(() => import("@Components/Markets/CardCarousel"));
const StaticBannerLeftImage = dynamic(
  () => import("@Components/Markets/StaticBannerLeftImage"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const ImageSlider = dynamic(() => import("@Components/Markets/ImageSlider"));
const BgImageSlider = dynamic(
  () => import("@Components/Markets/BgImageSlider"),
);
const ProductSpecificationBanner = dynamic(
  () => import("@Components/Markets/ProductSpecificationBanner"),
);
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const BgImageTabSection = dynamic(
  () => import("@Components/Markets/BgImageTabSection"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const ContactBarSection = dynamic(() => import("@Components/ContactBar"));

const AutomationMovementSolutions = ({ automationMovementSolutions }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
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
  const sliderSettings1 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    rows: 1,
    centerMargin: "15px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
    ],
  };

  const sliderSettings2 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 1,
    centerMargin: "15px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
    ],
  };

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {automationMovementSolutions
        ? automationMovementSolutions.map((rows) => (
            <div key={`ams_${rows.id}`}>
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
              <Introduction
                dataobj={rows.pages}
                winSize={windowSize}
                customStyle="acc-custom-introduction"
              />
              {/* Page Introduction End */}

              {/* contact bar section start */}
              <ContactBarSection content={rows.contactBar} />
              {/* contact bar section end */}

              {/* Section1 Component */}
              <IndustriesCarousel
                data={rows.section1ImageGallery}
                customSettings={sliderSettings1}
                secCustomStyle="acc-custom-icon-col-sec"
              />
              {/* Section1 Component End */}
              {/* Section2 Component */}
              <section className="section-padding section-margin bg-light">
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section2ImageAndDesc}
                    winSize={windowSize}
                  />
                </Container>
                <Container fluid className="text-center pl-lg-5 pr-lg-5">
                  <CardCarousel
                    data={rows.section2AllBoxes}
                    rows="1"
                    slidesShow="5"
                    slidesScroll="5"
                    customStyle="acc-card-carousel-witth-bg"
                  />
                </Container>
              </section>
              {/* Section2 Component End */}
              {/* Tab Section Component */}
              <TabSection
                tabList={rows.section5TabSection}
                customStyle="acc-market-automation-tab"
              />
              {/* Tab Section Component End */}
              {/* Section4 Component */}
              <IndustriesCarousel
                data={rows.section4ImageGallery}
                customSettings={sliderSettings2}
              />
              <section className="text-center">
                <Container>
                  <HTMLContent
                    class="m-0 pb-4"
                    content={rows.section4Description}
                  />
                </Container>
              </section>
              {/* Section4 Component End */}
              {/* Section5 Component */}
              <section className="section-padding text-center">
                <Container>
                  <article
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3">{rows.section5Title}</h1>
                    <p className="m-0">{rows.section5Description}</p>
                  </article>
                </Container>
              </section>
              <BgImageTabSection
                tabList={rows.section5BGimageSlider}
                customStyle="pb-3"
              />
              <section className="text-center">
                <Container>
                  <I18nLink href={rows.section5ButtonLink}>
                    <Button
                      variant="primary"
                      className={`text-uppercase border border-medium ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section5ButtonLabel}
                    </Button>
                  </I18nLink>
                </Container>
              </section>
              {/* Section5 Component End */}
              {/* Section6 Component */}
              <section className="section-padding text-center">
                <Container>
                  <article
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3">{rows.section6Title}</h1>
                    <p className="m-0 pb-lg-5 pb-4">
                      {rows.section6Description}
                    </p>
                    <NextImage
                      src={rows.section6Image.url}
                      alt="Placeholder"
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={436}
                      height={113}
                      className="mx-auto"
                    />
                  </article>
                </Container>
              </section>
              {/* Section6 Component End */}
              {/* Section7 Component */}
              <BgImageSlider
                data={rows.section7ImageDescNewSlide}
                model="automationMotionControls"
                bgImage={rows.section7ImageDescNewSlide.bannerImage}
                sectionDesc
                winSize={windowSize}
                customStyle="acc-corrosion-section-seven-new-slide"
              />
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <StaticBannerBgImage
                data={rows.section8ImageDesc}
                model="automationMotionControls"
                bgImage={rows.section8ImageDesc.bannerImage}
                sectionDesc={rows.section8ImageDesc.bannerDescription.text}
                winSize={windowSize}
                customStyle="BlackColorText bg-light acc-autom-static-banner-bg-image"
              />
              {/* Section8 Component End */}
              {/* Section9 Component */}
              <StaticBannerLeftImage
                data={rows.section9ImageDesc}
                winSize={windowSize}
              />
              <BgImageSlider
                data={rows.section10BannerSlide}
                model="testimonialses"
                bgImage=""
                sectionDesc=""
                winSize={windowSize}
                customStyle="acc-sec-top-gap"
              />
              {/* Section9 Component End */}
              {/* Section11 Component */}
              <ImageSlider ImageSliders={rows.section11ImageDesc} />
              {/* Section11 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section12Title}
                description={rows.section12Description}
                dataArr={rows.featuredProducts}
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};
export default AutomationMovementSolutions;
