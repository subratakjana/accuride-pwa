import dynamic from "next/dynamic";
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { FaCheck, FaTimes } from "react-icons/fa";

import { Container, Button, Row, Col, Modal } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import styles from "./AccessControlSystems.module.scss";
import styled from "styled-components";
import { Styles } from "styled-components/dist/types";

const StyledSection = styled.section<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {customBGImage: Styles<{}>}>((props) => (
  {
    ...props.customBGImage
  }
))

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Banner = dynamic(() => import("@Components/Markets/Banner"), {
  loading: () => <p>...</p>,
});

const Introduction = dynamic(() => import("@Components/Markets/Introduction"), {
  loading: () => <p>...</p>,
});

const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
  { loading: () => <p>...</p> },
);

const ImageCarousel = dynamic(
  () => import("@Components/Markets/ImageCarousel"),
  { loading: () => <p>...</p> },
);

const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
  { loading: () => <p>...</p> },
);

const ImageGalleryWithTitle = dynamic(
  () => import("@Components/Markets/ImageGalleryWithTitle"),
  { loading: () => <p>...</p> },
);

const toBase64 = (str) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

const AccessControlSystem = ({ accesscontolsystem }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const Tellus = dynamic(
    () => import("@Components/Markets/AccessControlSystems/Contact"),
    { loading: () => <p>...</p> },
  );
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  const removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      { url: "", name: pathSegments[1], isClickable: false },
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
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const acessControlsettings1 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    rows: 2,
    centerMargin: "15px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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

  const acessControlsettings2 = {
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
          slidesToShow: 3,
          slidesToScroll: 3,
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
      {accesscontolsystem
        ? accesscontolsystem.map((rows) => (
            <div key={`acc_${rows.id}`}>
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
              {/* Section1 Starts */}
              <section
                className={`section-padding acc-acess-control-static-banner`}
              >
                <Container fluid>
                  <Row className="align-items-center">
                    <Col lg={7} className={styles["acc-static-banner-text"]}>
                      <article
                        className={`p-0 p-md-5 pb-3 pb-md-0 text-center text-lg-left ${
                          windowObj && windowSize.width > 991 ? "w-75" : ""
                        }`}
                      >
                        <h1 className="m-0 pb-3 text-white">
                          {rows.section1FixedSlider.bannerTitle}
                        </h1>
                        <p className="m-0 pb-3 text-white">
                          {rows.section1FixedSlider.bannerDescription.text}
                        </p>
                        <a
                          href={rows.section1FixedSlider.bannerButtonLink}
                          className={`btn btn-primary text-uppercase border border-medium ${
                            windowObj && windowSize.width <= 991
                              ? "btn-block"
                              : ""
                          }`}
                        >
                          {rows.section1FixedSlider.bannerButtonLabel}
                        </a>
                      </article>
                    </Col>
                    <Col lg={4} className={styles["acc-static-banner-image"]}>
                      <NextImage
                        src={rows.section1FixedSlider.bannerImage.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={469}
                        height={414}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${toBase64(
                          "/assets/images/icons/imageLoader.svg",
                        )}`}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* Section1 End */}
              {/* Section2 Component */}
              <IndustriesCarousel
                title={rows.section2Title}
                customSettings={acessControlsettings1}
                description={rows.section2Description}
                data={rows.section2ImageGallery}
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <ImageCarousel
                title={rows.section3Title}
                description={rows.section3Description}
                data={rows.section3ImageGallery}
                slidestoshow="5"
                slidestoscroll="5"
                winSize={windowSize}
              />
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section4FixedSlider}
                winSize={windowSize}
                customStyle="acc-sec-bottom-gap-reduce"
              />
              {/* Section4 Component End */}
              {/* Section5 Component */}
              <IndustriesCarousel
                title={rows.section5Title}
                description={rows.section5Description}
                data={rows.section5ImageGallery}
                customSettings={acessControlsettings2}
              />
              {/* Section5 Component End */}
              {/* Section6 Component */}
              <section className="section-padding">
                <Container>
                  <article
                    className={`text-center ${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3">{rows.section6Title}</h1>
                    <p className="m-0 pb-5">{rows.section6Description.text}</p>
                  </article>
                  <Row>
                    <Col lg={7} className="text-center">
                      <NextImage
                        src={rows.sec6BigImage.url}
                        alt="Placeholder"
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={562}
                        height={608}
                      />
                    </Col>
                    <Col lg={5}>
                      <article
                        className={`pt-lg-0 pt-5 ${
                          windowObj && windowSize.width <= 991
                            ? "w-75 mx-auto"
                            : ""
                        } ${
                          windowObj && windowSize.width <= 575
                            ? "w-100 mx-auto"
                            : ""
                        }`}
                      >
                        <ImageGalleryWithTitle
                          bannerList={rows.section6ImageGallery}
                          clsName="d-flex pb-4 align-items-center"
                        />
                        <I18nLink href={rows.section6ButtonLink}>
                          <Button
                            variant="primary"
                            className={`text-uppercase d-none d-xl-inline-block ml-lg-5 ${
                              windowObj && windowSize.width < 991
                                ? "btn-block"
                                : ""
                            }`}
                          >
                            {rows.section6ButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* Section6 Component End */}
              {/* Section7 Component */}
              <StaticBannerBlueBGRightImage
                data={rows.section7FixedSlider}
                winSize={windowSize}
              />
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <section
                className={`section-padding ${styles["acc-security-redefined-section"]}`}
              >
                <Container>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <NextImage
                        src={rows.section8FixedSlider.bannerImage.url}
                        alt="Placeholder"
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={659}
                        height={580}
                      />
                    </Col>
                    <Col lg={6}>
                      <article className="text-center">
                        <h1 className="m-0 pb-3 pt-3 pt-lg-0">
                          {rows.section8FixedSlider.bannerTitle}
                        </h1>
                        <p className="m-0 pb-3">
                          {rows.section8FixedSlider.bannerDescription.text}
                        </p>
                        <a
                          href={rows.section8FixedSlider.bannerButtonLink}
                          rel="noopener noreferrer"
                          className={`text-uppercase btn btn-primary ${
                            windowObj && windowSize.width < 991
                              ? "btn-block"
                              : ""
                          }`}
                        >
                          {rows.section8FixedSlider.bannerButtonLabel}
                        </a>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* Section8 Component End */}
              {/* Section9 Component */}
              <StyledSection
                className={`section-padding ${styles["acc-static-banner-bg-image"]}`}
                customBGImage={{
                  backgroundImage: `url(${rows.sec9BgImage.url})`,
                }}
              >
                <Container fluid>
                  <Row>
                    <Col lg={12}>
                      <article
                        className={`pb-5 m-0 text-center text-lg-left ${
                          windowObj && windowSize.width > 991 ? "w-75 px-5" : ""
                        }`}
                      >
                        <h1 className="m-0 pb-3 text-white">
                          {rows.section9FixedSlider.bannerTitle}
                        </h1>
                        <h5 className="m-0 pb-3 text-white">
                          <HTMLContent
                            className="m-0"
                            content={
                              rows.section9FixedSlider.bannerDescription.html
                            }
                          />
                        </h5>
                        <p className="m-0 pb-3 text-white">
                          {rows.section9FixedSlider.bannerDescription.text}
                        </p>
                        {rows.section9FixedSlider.bannerButtonLabel ? (
                          <I18nLink
                            href={rows.section9FixedSlider.bannerButtonLink}
                            isMagentoRoute={0}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase border border-medium ${
                                windowObj && windowSize.width < 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {rows.section9FixedSlider.bannerButtonLabel}
                            </Button>
                          </I18nLink>
                        ) : (
                          ""
                        )}
                      </article>
                    </Col>
                    <Col lg={12}>
                      <NextImage
                        src={rows.section9FixedSlider.bannerImage.url}
                        alt="Placeholder"
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="right"
                        width={1300}
                        height={257}
                      />
                      <p className="text-center text-white m-0 pt-5">
                        {rows.section9BgDescription.text}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              {/* Section9 Component End */}
              {/* Form Component */}
              <section
                className={`acc-contact-information ${styles["acc-general-contact"]}`}
                id="aias-contact-form"
              >
                <Tellus formId="19" pageName="AccessControlSyatems"/>
              </section>
              {/* Form Component End */}
              {/* E-Lock Specification */}
              <section
                className={`section-padding d-none d-xl-block ${styles["acc-product-table"]}`}
                id="aias-specs"
              >
                <Container>
                  <Row>
                    <Col lg={3} className="d-none d-lg-flex">
                      <div className={styles["blank-div"]}></div>
                      <div className={styles["blank-div"]}></div>
                      <div>Dimensions (L x W x H)</div>
                      <div>Break-Force</div>
                      <div>Locations</div>
                      <div>Intelligent Subversion Protection</div>
                      <div>Touch Release</div>
                      <div>Auto-Open</div>
                      <div>Easy-Close</div>
                      <div>Voltage Supply</div>
                      <div> </div>
                    </Col>
                    {rows.productTable
                      ? rows.productTable.map((items) => (
                          <Col
                            lg={3}
                            key={`${items.id}_procomptbl`}
                            className={`text-center border-dark pb-5 pb-lg-0 ${
                              windowObj && windowSize.width > 991
                                ? "border-left"
                                : ""
                            }`}
                          >
                            <div className="embed-responsive embed-responsive-16by9">
                              <NextImage
                                src={items.columnImage.url}
                                alt="placeholder"
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                                className="mx-auto"
                              />
                            </div>
                            <div>
                              <h4>{items.columnTitle}</h4>
                            </div>
                            <div className="py-2">
                              <p className="d-lg-none m-0 font-weight-bold">
                                Dimensions (L x W x H)
                              </p>
                              {items.dimensions}
                            </div>
                            <div className="py-2">
                              <p className="d-lg-none m-0 font-weight-bold">
                                Break-Force
                              </p>
                              {items.breakForce}
                            </div>
                            <div className="py-2">
                              <p className="d-lg-none m-0 font-weight-bold">
                                Locations
                              </p>
                              {items.locations}
                            </div>
                            <div>
                              <p className="d-lg-none m-0 font-weight-bold">
                                Intelligent Subversion Protection
                              </p>
                              {items.intelligentSubversionProtection ===
                              "Yes" ? (
                                <FaCheck className="mx-auto text-success font-size-lg" />
                              ) : (
                                <FaTimes className="mx-auto text-danger font-size-lg" />
                              )}
                            </div>
                            <div>
                              <p className="d-lg-none m-0 font-weight-bold">
                                Touch Release
                              </p>
                              {items.touchRelease === "Yes" ? (
                                <FaCheck className="mx-auto text-success font-size-lg" />
                              ) : (
                                <FaTimes className="mx-auto text-danger font-size-lg" />
                              )}
                            </div>
                            <div>
                              <p className="d-lg-none m-0 font-weight-bold">
                                Auto-Open
                              </p>
                              {items.autoOpen === "Yes" ? (
                                <FaCheck className="mx-auto text-success font-size-lg" />
                              ) : (
                                <FaTimes className="mx-auto text-danger font-size-lg" />
                              )}
                            </div>
                            <div>
                              <p className="d-lg-none m-0 font-weight-bold">
                                Easy-Close
                              </p>
                              {items.easyClose === "Yes" ? (
                                <FaCheck className="mx-auto text-success font-size-lg" />
                              ) : (
                                <FaTimes className="mx-auto text-danger font-size-lg" />
                              )}
                            </div>
                            <div className="py-2 mb-3">
                              <p className="d-lg-none m-0 font-weight-bold">
                                Voltage Supply
                              </p>
                              {items.voltageSupply}
                            </div>
                            <div>
                              <Button
                                data-url={items.buttonLink}
                                onClick={handleShow}
                                onKeyDown={handleShow}
                                className={`text-uppercase ${
                                  windowObj && windowSize.width < 576
                                    ? "btn-block"
                                    : ""
                                }`}
                              >
                                {items.buttonLabel}
                              </Button>
                            </div>
                          </Col>
                        ))
                      : ""}
                  </Row>
                  <Modal
                    size="md"
                    show={show}
                    onHide={handleClose}
                    className={styles["acc-custom-modal"]}
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
                </Container>
              </section>
              {/* E-Lock Specification End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default AccessControlSystem;
