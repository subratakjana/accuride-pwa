import { useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import styles from "./ElectronicEnclosure.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const ImageSlider = dynamic(() => import("@Components/Markets/ImageSlider"));
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const ContactBarSection = dynamic(() => import("@Components/ContactBar"));
const IconListingSection = dynamic(
  () => import("@Components/IconListingSection"),
);

const ElectronicEnclosures = ({ electronicEnclosure }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
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

  const handleVideoClose = () => setShowVideo(false);
  const handleVideoShow = (e) => {
    setShowVideo(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleVideoShow();
    }
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const handleShow = (e) => {
    const pdfPath = e.target.getAttribute("data-url");
    if (pdfPath !== "" || pdfPath !== "#") {
      setShow(true);
      setPdfUrl(pdfPath);
    }
  };
  const handleClose = () => setShow(false);

  const sliderSettings1 = {
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
      {electronicEnclosure
        ? electronicEnclosure.map((rows) => (
            <div
              key={`ee_${rows.id}`}
              className={`${styles["acc-electronic-enclosure-page"]}`}
            >
              {/* banner section start */}
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-electronic-enclosure-banner"
              />
              {/* banner section end */}

              {/* intro section start */}
              <Introduction
                dataobj={rows.pages}
                winSize={windowSize}
                customStyle="acc-custom-introduction py-4"
              />
              {/* intro section end */}

              {/* icon list section start */}
              <IconListingSection
                iconList={rows.iconLists}
                customStyle="pt-3"
              />
              {/* icon list section end */}

              {/* contact bar section start */}
              <ContactBarSection
                content={rows.contactBar}
                customStyle="acc-electronic-enclosure-contact-bar"
              />
              {/* contact bar section end */}

              {/* innovative engineering section start */}
              <section className="acc-electronic-enclosure-innovative-engineering pt-5">
                <Container>
                  <h2 className="acc-ee-page-heading mb-3 text-center">
                    {rows.section2Title}
                  </h2>
                  <div className="acc-innovative-engineering-content position-relative mx-n3">
                    <div className="acc-background-image position-absolute">
                      <NextImage
                        src={rows.section2StaticBanner.bannerImage.url}
                        alt="Background Image"
                        layout="fill"
                        objectFit="cover"
                        objectPosition="left center"
                      />
                    </div>

                    <Row className="align-items-center">
                      <Col xs={12} md={8} lg={7} className="px-0 px-lg-3">
                        <h3 className="m-0">
                          {rows.section2StaticBanner.bannerTitle}
                        </h3>
                        <h4>{rows.section2StaticBanner.bannerTitle2}</h4>
                        <h5>
                          {rows.section2StaticBanner.bannerDescription.text}
                        </h5>
                        <I18nLink
                          href={rows.section2StaticBanner.bannerButtonLink}
                          isMagentoRoute={0}
                        >
                          <Button
                            variant="primary"
                            className={`text-uppercase`}
                          >
                            {rows.section2StaticBanner.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                        <p className="acc-disclaimer-text">
                          *Engineering recommendations may vary per application
                        </p>
                      </Col>
                      {rows.section2StaticBanner.bannerVideoUrl && (
                        <Col
                          xs={12}
                          md={4}
                          lg={5}
                          className="text-center position-relative acc-innovative-engineering-video-col"
                        >
                          {windowObj && windowSize.width <= 767 && (
                            <div className="acc-background-image position-absolute">
                              <NextImage
                                src={rows.section2StaticBanner.bannerImage.url}
                                alt="Background Image"
                                layout="fill"
                                objectFit="cover"
                                objectPosition="right center"
                              />
                            </div>
                          )}
                          <NextImage
                            src="/assets/images/icon-youtube-lg.png"
                            alt=""
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            width={163}
                            height={125}
                            data-url={
                              rows?.section2StaticBanner?.bannerVideoUrl
                            }
                            onClick={handleVideoShow}
                            onKeyDown={handleKeyPress}
                            role="button"
                            tabIndex={0}
                            className="acc-innovative-engineering-video-btn"
                          />
                        </Col>
                      )}
                    </Row>
                  </div>
                </Container>
              </section>
              {/* innovative engineering section end */}

              {/* revolutionary solutions section start */}
              <section className="section-padding text-center acc-revolutionary-solutions">
                <Container>
                  <h2>{rows.section3Title}</h2>
                  <p className="mb-0 mx-auto">
                    {rows.section3Description.text}
                  </p>
                </Container>
              </section>
              {/* revolutionary solutions section end */}

              {/* tab section Component */}
              <TabSection
                tabList={rows.section2TabArea}
                customStyle="acc-market-electronic-enclosure-tab py-0"
              />
              {/* tab section Component End */}

              {/* Section5 Component */}
              <ImageSlider
                slider={false}
                fullWidth={true}
                ImageSliders={rows.section5ImageDesc}
                customStyle="acc-custom-image-slider-right-image py-0"
              />
              {/* Section5 Component End */}

              {/* partners section start */}
              <section className="section-padding text-center acc-electronic-enclosure-partners">
                <Container>
                  <h2 className="acc-ee-page-heading mb-4 mb-md-5">
                    {rows.section7Title}
                  </h2>
                  <Row className="justify-content-center align-items-center row-cols-lg-5 row-cols-2 row-cols-md-3 acc-electronic-enclosure-partners-row">
                    {rows.section7Images.map((EachImg) => (
                      <Col key={`eecol_${EachImg.id}`}>
                        {EachImg.fileName ? (
                          EachImg.fileName.split(".").pop() === "svg" ? (
                            <ReactSVG
                              src={EachImg.url}
                              className="acc-partner-logo"
                            />
                          ) : (
                            <div className="embed-responsive embed-responsive-4by3">
                              <NextImage
                                src={EachImg.url}
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                                className="embed-responsive-item"
                              />
                            </div>
                          )
                        ) : (
                          <div className="embed-responsive embed-responsive-4by3">
                            <NextImage
                              src={EachImg.url}
                              layout="fill"
                              objectFit="contain"
                              objectPosition="center"
                              className="embed-responsive-item"
                            />
                          </div>
                        )}
                      </Col>
                    ))}
                  </Row>
                </Container>
              </section>
              {/* partners section end */}

              {/* Section8 Component */}
              <Container className="text-center mb-4 mb-md-5">
                <h2 className="acc-ee-page-heading">{rows.section8Title}</h2>
              </Container>
              <StaticBannerBgImage
                data={rows.section8ImageDesc}
                model="electronicEnclosureses"
                bgImage={rows.section8ImageDesc.bannerImage}
                sectionDesc={rows.section8ImageDesc.bannerDescription}
                winSize={windowSize}
                customStyle="acc-electronic-enclosure-cable-management"
              />
              {/* Section8 Component End */}

              <Container className="section-padding text-center acc-custom-cad-downloads">
                <I18nLink href={rows.cadButton.buttonLink} isMagentoRoute={0}>
                  <Button
                    variant="primary"
                    className={`text-uppercase ${
                      windowObj && windowSize.width <= 767 ? "btn-block" : ""
                    }`}
                  >
                    {rows.cadButton.buttonText}
                  </Button>
                </I18nLink>
              </Container>
            </div>
          ))
        : ""}
      <Modal
        size="md"
        show={showVideo}
        onHide={handleVideoClose}
        className="acc-custom-modal"
      >
        <Modal.Body className="text-center">
          <iframe
            width="100%"
            height="420"
            src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1`}
            title="video"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ElectronicEnclosures;
