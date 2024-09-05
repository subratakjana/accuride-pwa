import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container } from "react-bootstrap";
import NextImage from "next/legacy/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./WoodworkingCabinetry.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const ImageCarousel = dynamic(
  () => import("@Components/Markets/ImageCarousel"),
);
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const WoodworkingCabinetry = ({ woodworkingCabinetriess }) => {
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
      {woodworkingCabinetriess
        ? woodworkingCabinetriess.map((rows) => (
            <div key={`wwk_${rows.id}`}>
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
              <IndustriesCarousel
                data={rows.section1ImageGallery}
                customSettings={sliderSettings}
              />
              {/* Section1 Component End */}
              {/* Section2 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section2ImageDesc}
                winSize={windowSize}
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <Introduction
                dataTitle={rows.section3Title}
                dataDesc={rows.section3Description}
                winSize={windowSize}
              />
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <ImageCarousel
                title=""
                description=""
                customStyle="acc-woodcabinet-imagecarosel"
                data={rows.section3ImageGallery}
                slidestoshow="3"
                slidestoscroll="3"
                winSize={windowSize}
              />
              {rows.section4Images
                ? rows.section4Images.map((EachImage) => (
                    <section key={`wwksec_${EachImage.id}`} className="pb-5">
                      <Container>
                        <NextImage
                          src={EachImage.url}
                          alt={EachImage.id}
                          layout="intrinsic"
                          objectFit="contain"
                          objectPosition="center"
                          width={1352}
                          height={462}
                        />
                      </Container>
                    </section>
                  ))
                : ""}
              <Introduction
                dataTitle={rows.section4Title}
                dataDesc={rows.section4Description}
                winSize={windowSize}
              />
              {/* Section4 Component End */}
              {/* Section6 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section6ImageDesc}
                winSize={windowSize}
                model="woodworkingCabinetries"
                customStyle="p-0 acc-gray-bg-right-image"
              />
              {/* Section6 Component End */}
              {/* Section7 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section7ImageDesc}
                winSize={windowSize}
                model="woodworkingCabinetries"
                customStyle="p-0 acc-gray-bg-left-image"
              />
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section5ImageDesc}
                winSize={windowSize}
                model="woodworkingCabinetries"
                customStyle="p-0 acc-gray-bg-right-image"
              />
              {/* Section8 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section6Title}
                description={rows.section6Description}
                dataArr={rows.featuredProducts}
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default WoodworkingCabinetry;
