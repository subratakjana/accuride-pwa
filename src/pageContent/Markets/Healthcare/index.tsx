import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Healthcare.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const ImageCarousel = dynamic(
  () => import("@Components/Markets/ImageCarousel"),
);
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Healthcare = ({ Healthcares }) => {
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
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
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
      {Healthcares
        ? Healthcares.map((rows) => (
            <div
              key={`hc_${rows.id}`}
              className={styles["acc-healthcare-wrapper"]}
            >
              {/* Banner Component */}
              <div className={styles["acc-market-inner-pages-banner-wrapper"]}>
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                  customStyle="acc-automotive-banner"
                />
              </div>
              {/* End */}
              {/* Page Introduction */}
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              {/* End */}
              {/* Section1 Component */}
              <IndustriesCarousel
                data={rows.section1ImageGallery}
                customSettings={sliderSettings}
                customStyle="acc-two-icon-carousel"
              />
              {/* Section1 Component End */}
              {/* Section2 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section2ImageDesc}
                winSize={windowSize}
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <section className="section-padding text-center">
                <Container>
                  <article
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3 text-uppercase">
                      {rows.section3Title}
                    </h1>
                    <HTMLContent
                      className="m-0"
                      content={rows.sec3Description.html}
                    />
                  </article>
                </Container>
              </section>
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <ImageCarousel
                title=""
                description=""
                data={rows.imageGalleries}
                slidestoshow="3"
                slidestoscroll="3"
                winSize={windowSize}
                customStyle="acc-healthcare-imagecarousel"
              />
              <StaticBannerBgImage
                data={rows.section4ImageDesc}
                model="healthcares"
                bgImage={rows.section4ImageDesc.bannerImage}
                sectionDesc={rows.section4ImageDesc.bannerDescription.text}
                winSize={windowSize}
                customStyle="acc-static-banner-healthcare"
              />
              {/* Section4 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section5Title}
                description={rows.section5Description}
                dataArr={rows.featuredProducts}
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default Healthcare;
