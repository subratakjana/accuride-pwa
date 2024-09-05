import { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import { AiOutlineYoutube } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Automotive.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const CardCarousel = dynamic(() => import("@Components/Markets/CardCarousel"));
const StaticBannerWhiteBGRightMultiImage = dynamic(
  () => import("@Components/Markets/StaticBannerWhiteBGRightMultiImage"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const BgImageSlider = dynamic(
  () => import("@Components/Markets/BgImageSlider"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const ContactBarSection = dynamic(() => import("@Components/ContactBar"));

const Automotive = ({ automotivess }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const [showvideo, setShowVideo] = useState(false);
  const handleCloseVideo = () => setShowVideo(false);
  const handleShowVideo = () => setShowVideo(true);
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
    slidesToShow: 2,
    slidesToScroll: 2,
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
      {automotivess
        ? automotivess.map((rows) => (
            <div key={`auto_${rows.id}`}>
              {/* Banner Component */}
              <div className={styles["acc-market-inner-pages-banner-wrapper"]}>
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                  customStyle="acc-automotive-banner font-family-secondary"
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
                customStyle="acc-two-icon-carousel"
              />
              {/* Section1 Component End */}
              {/* Section2 Component */}
              <section
                className={`section-padding px-sm-3 ${styles["acc-automotive-youtube-video-sec"]}`}
              >
                <Container>
                  <div
                    className={styles["video-image"]}
                    onClick={handleShowVideo}
                    onKeyDown={handleShowVideo}
                    tabIndex={0}
                    role="button"
                  >
                    <div className="embed-responsive embed-responsive-16by9">
                      <NextImage
                        src={rows.section2VideoImage.url}
                        layout="fill"
                        objectFit="contain"
                        objectPosition="center"
                        className="embed-responsive-item"
                      />
                    </div>
                    <AiOutlineYoutube
                      className={`text-white position-absolute ${styles["acc-video-play-icon"]}`}
                    />
                  </div>
                  <Modal
                    size="md"
                    show={showvideo}
                    onHide={handleCloseVideo}
                    className="acc-custom-modal"
                  >
                    <Modal.Body className="text-center">
                      <iframe
                        title="YouTube Video Player"
                        width="100%"
                        height="400"
                        src={rows.section2VideoLink}
                        frameBorder="0"
                        allow="autoplay;encrypted-media"
                        allowFullScreen
                      />
                    </Modal.Body>
                  </Modal>
                </Container>
              </section>
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <section className="section-padding text-center">
                <Container>
                  <article
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3">{rows.section3Title}</h1>
                    <p className="m-0">{rows.section3Description}</p>
                  </article>
                </Container>
              </section>
              <IndustriesCarousel
                data={rows.section3ImageGallery}
                customSettings={sliderSettings2}
                customStyle="acc-two-icon-carousel"
              />
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section4ImageDesc}
                winSize={windowSize}
              />
              {/* Section4 Component End */}
              {/* Section5 Component */}
              <section className="section-padding">
                <Container>
                  <article
                    className={`text-center pb-lg-4 ${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3">{rows.section5Title}</h1>
                    <p className="m-0">{rows.section5Description}</p>
                  </article>
                  <CardCarousel
                    data={rows.section5BoxSection}
                    rows="1"
                    slidesShow="6"
                    slidesScroll="6"
                    customStyle="acc-blue-bg-card"
                  />
                </Container>
              </section>
              {/* Section5 Component End */}
              {/* Section6 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section6ImageDesc}
                winSize={windowSize}
              />
              {/* Section6 Component End */}
              {/* Section7 Component */}
              <section className="section-padding text-center">
                <Container>
                  <article
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-5">{rows.section7Title}</h1>
                    {rows.section7Images
                      ? rows.section7Images.map((EachImage) => (
                          <NextImage
                            src={EachImage.url}
                            alt="Placeholder"
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            width={1014}
                            height={366}
                            className="mx-auto"
                            key={`auto_${EachImage.id}`}
                          />
                        ))
                      : ""}
                    <p className="m-0 pt-5 font-size-sm">
                      {rows.section7Description}
                    </p>
                  </article>
                </Container>
              </section>
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <StaticBannerBgImage
                data={rows.section8ImageDesc}
                model="automotives"
                bgImage={rows.section8ImageDesc.bannerImage}
                sectionDesc={rows.section8ImageDesc.bannerDescription.text}
                winSize={windowSize}
              />
              {/* Section8 Component End */}
              {/* Section9 Component */}
              <section className="section-padding text-center text-lg-left">
                <Container fluid>
                  <StaticBannerWhiteBGRightMultiImage
                    data={rows.section9ImageDesc}
                    model="automotives"
                    bgImage={rows.section9ImageDesc.bannerImage}
                    sectionDesc={rows.section9ImageDesc.bannerDescription.text}
                    winSize={windowSize}
                    customStyle="pl-lg-4"
                  />
                </Container>
              </section>
              {/* Section9 Component End */}
              {/* Section10 Component */}
              <BgImageSlider
                data={rows.section10ImageDesc}
                model="automotives"
                bgImage=""
                sectionDesc=""
                winSize={windowSize}
              />
              {/* Section10 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title=""
                description=""
                dataArr={rows.featuredProducts}
                customStyle="acc-sec-top-gap-reduce"
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};
export default Automotive;
