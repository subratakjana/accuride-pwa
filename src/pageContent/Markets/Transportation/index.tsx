import { useState } from "react";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Button, Modal } from "react-bootstrap";
import NextImage from "next/legacy/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Transportation.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const ImageSlider = dynamic(() => import("@Components/Markets/ImageSlider"));
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const ProductSpecificationBanner = dynamic(
  () => import("@Components/Markets/ProductSpecificationBanner"),
);
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const ImageSliderWithDescriptions = dynamic(
  () => import("@Components/Markets/ImageSliderWithDescription"),
);
const StaticBannerLeftImage = dynamic(
  () => import("@Components/Markets/StaticBannerLeftImage"),
);
const BgImageTabSection = dynamic(
  () => import("@Components/Markets/BgImageTabSection"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Transportation = ({ transportationss }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
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
  const handleShow = (e) => {
    const pdfPath = e.target.getAttribute("data-url");
    if (pdfPath !== "" || pdfPath !== "#") {
      setShow(true);
      setPdfUrl(pdfPath);
    }
  };
  const handleClose = () => setShow(false);

  const sliderSettings = {
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

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {transportationss
        ? transportationss.map((rows) => (
            <div key={`tps_${rows.id}`}>
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
              {/* Section1 Area */}
              <section className="text-center">
                <Container>
                  <article>
                    <Button
                      variant="primary"
                      data-url={rows.section1ButtonLink}
                      onClick={handleShow}
                      onKeyDown={handleShow}
                      className={`text-uppercase mx-auto ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section1ButtonLabel}
                    </Button>
                  </article>
                </Container>
              </section>
              <Modal
                size="md"
                show={show}
                onHide={handleClose}
                className="acc-custom-modal"
              >
                <Modal.Body className="text-center">
                  <iframe
                    width="100%"
                    height="600"
                    src={pdfUrl}
                    title="video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Modal.Body>
              </Modal>
              {/* Section1 Area End */}
              {/* Section2 Component */}
              <IndustriesCarousel
                data={rows.section2ImageGallery}
                customSettings={sliderSettings}
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <TabSection
                tabList={rows.section3Tabs}
                customStyle="acc-three-tab acc-market-transport-tab"
              />
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <ImageSliderWithDescriptions
                data={rows.section4Slider}
                model="testimonialses"
                bgImage=""
                sectionDesc=""
                winSize={windowSize}
                customStyle="acc-transportation-page-img-slid-desc"
              />
              {/* Section4 Component End */}
              {/* Section4-1 Component */}
              <section
                className={`mb-5 ${styles["acc-transportation-ps-banner"]}`}
              >
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section41Banner}
                    winSize={windowSize}
                    customStyle="product-bg-desc product-right"
                  />
                </Container>
              </section>
              {/* Section4-1 Component End */}
              {/* Section5 Component */}
              <Introduction
                dataTitle={rows.section5Title}
                dataDesc={rows.section5Description}
                winSize={windowSize}
              />
              {/* Section5 Component End */}
              {/* Section6 Component */}
              <section className="mb-5">
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section61ImageDesc}
                    winSize={windowSize}
                    customStyle="product-bg-desc"
                  />
                </Container>
              </section>
              {/* Section6 Component End */}
              {/* Section6-2 Component */}
              <section className="mb-5">
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section62ImageDesc}
                    winSize={windowSize}
                    customStyle="product-bg-desc product-right"
                  />
                </Container>
              </section>
              {/* Section6-2 Component End */}
              {/* Section6-3 Component */}
              <section>
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section63ImageDesc}
                    winSize={windowSize}
                    customStyle="product-bg-desc"
                  />
                </Container>
              </section>
              {/* Section6-3 Component End */}
              {/* Section6-4 Component */}
              <ImageSlider ImageSliders={rows.section64ImageDesc} />
              {/* Section6-4 Component End */}
              {/* Section6-5 Component */}
              <StaticBannerLeftImage
                data={rows.section65ImageDesc}
                winSize={windowSize}
                customStyle="acc-left-image-width-auto"
              />
              {/* Section6-5 Component End */}
              {/* Section6-6 Component */}
              <StaticBannerBgImage
                data={rows.section66ImageDesc}
                model="transportations"
                bgImage={rows.section66ImageDesc.bannerImage}
                sectionDesc={rows.section66ImageDesc.bannerDescription.text}
                winSize={windowSize}
                customStyle="BlackColorText bg-light acc-transport-static-banner-bg-image"
              />
              {/* Section6-6 Component End */}
              {/* Section7 Component */}
              <ImageSliderWithDescriptions
                data={rows.section7Slider}
                model="testimonialses"
                bgImage=""
                sectionDesc=""
                winSize={windowSize}
                customStyle="acc-second-slide-left-text acc-sameheight-image-slider"
              />
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <Introduction
                dataTitle={rows.section8Title}
                winSize={windowSize}
              />
              <section className="text-center pb-lg-5">
                <Container>
                  <article>
                    {rows.section8ImageGallery.map((EachImgDesc) => (
                      <NextImage
                        src={EachImgDesc.url}
                        alt="Placeholder"
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={1352}
                        height={284}
                        key={`nxtimg_${rows.id}`}
                      />
                    ))}
                  </article>
                </Container>
              </section>
              {/* Section8 Component End */}
              {/* Section9 Component */}
              <Introduction
                dataTitle={rows.section9Title}
                dataDesc={rows.section9Description}
                winSize={windowSize}
              />
              {/* Section9 Component End */}
              {/* Section10 Component */}
              <BgImageTabSection tabList={rows.allTabs} customStyle="pb-3" />
              <section className="pb-lg-5 text-center d-none d-lg-block">
                <Container>
                  <article>
                    <I18nLink href={rows.section10ButtonLink}>
                      <Button
                        variant="primary"
                        className={`text-uppercase mx-auto ${
                          windowObj && windowSize.width <= 991
                            ? "btn-block"
                            : ""
                        }`}
                      >
                        {rows.section10ButtonText}
                      </Button>
                    </I18nLink>
                  </article>
                </Container>
              </section>
              {/* Section10 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section11Title}
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

export default Transportation;
