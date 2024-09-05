import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Button, Modal, Row, Col } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Appliance.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const ImageGalleryWithPopup = dynamic(
  () => import("@Components/Markets/ImageGalleryWithPopup"),
);
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const BgImageTabSection = dynamic(
  () => import("@Components/Markets/BgImageTabSection"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const ContactBarSection = dynamic(() => import("@Components/ContactBar"));

const Appliances = ({ appliances }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [sideMountShow, setSideMountShow] = useState(true);
  const [bottomMountShow, setBottomMountShow] = useState();
  const [sideMountShowOverTravel, setSideMountShowOverTravel] = useState();
  const [bottomMountShowOverTravel, setBottomMountShowOverTravel] = useState();
  const [pdfUrl, setPdfUrl] = useState("");
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
  const sideMountClick = (e) => {
    const sideMountID = e.target.getAttribute("id");
    if (sideMountID === "rollerSideMount") {
      setSideMountShow(true);
      setBottomMountShow(false);
      setSideMountShowOverTravel(false);
      setBottomMountShowOverTravel(false);
    } else if (sideMountID === "rollerBottomMount") {
      setSideMountShow(false);
      setBottomMountShow(true);
      setSideMountShowOverTravel(false);
      setBottomMountShowOverTravel(false);
    } else if (sideMountID === "rollerSideMountOverTravel") {
      setSideMountShowOverTravel(true);
      setSideMountShow(false);
      setBottomMountShow(false);
      setBottomMountShowOverTravel(false);
    } else if (sideMountID === "rollerBottomMountOverTravel") {
      setBottomMountShowOverTravel(true);
      setSideMountShowOverTravel(false);
      setSideMountShow(false);
      setBottomMountShow(false);
    }
  };

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {appliances
        ? appliances.map((rows) => (
            <div key={rows.id}>
              {/* Banner Component */}
              <div className="acc-market-inner-pages-banner-wrapper">
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                  customStyle="acc-appliances-banner"
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
              {/* Section1 Component */}
              <section className="section-padding text-center pt-0 acc-appliances-more-intro">
                <Container>
                  <article>
                    <HTMLContent
                      class="m-0 pb-4"
                      content={rows.section1Description}
                    />
                    <Button
                      variant="primary"
                      data-url={rows.section1ButtonLink}
                      onClick={handleShow}
                      onKeyDown={handleShow}
                      className={`text-uppercase mx-auto ${
                        windowObj && windowSize.width <= 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section1ButtonLabel}
                    </Button>
                  </article>
                </Container>
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
              </section>
              {/* Section1 Component End */}

              {/* contact bar section start */}
              <ContactBarSection content={rows.contactBar} />
              {/* contact bar section end */}

              {/* Section1 Image Gallery Component */}
              <ImageGalleryWithPopup
                data={rows.section1ImageGallery}
                customStyle="acc-custom-icon-col-sec"
              />
              {/* End */}

              {/* Section2 Component */}
              <TabSection
                tabList={rows.section2TabsSection}
                customStyle="acc-market-appliance-tab pb-0"
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <section className="section-padding text-center pt-xl-0">
                <Container>
                  <article>
                    <h1 className="m-0">{rows.section3Title}</h1>
                    <NextImage
                      src={rows.section3Image.url}
                      alt={rows.section3Title}
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={999}
                      height={262}
                    />
                  </article>
                </Container>
              </section>
              {/* Section3 Component End */}
              {/* Roller Bearing Section */}
              <section
                className={`section-padding text-center ${styles["acc-roller-sec"]}`}
              >
                <h1
                  className={`pb-5 m-0 ${styles["acc-appli-roller-bearing-heading"]}`}
                >
                  {rows.rollerBannerSection.bannerTitle}
                </h1>
                <span className={`d-block ${styles["roller-sec-banner"]}`}>
                  <NextImage
                    src={rows.rollerBannerSection.bannerImage.url}
                    alt={rows.rollerBannerSection.bannerTitle}
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                  />
                </span>
                <h1 className="py-5 m-0">
                  {rows.rollerBannerSection.bannerDescription.text}
                </h1>
                <div
                  className={`position-relative ${styles["acc-roller-bearing-content"]}`}
                >
                  <div
                    className={`bg-primary position-absolute top left w-100 ${styles["acc-roller-sec-bg-color"]}`}
                  />
                  <Container>
                    <p className="py-5 m-0 text-white px-xl-5">
                      {rows.rollerBearingSectionDesc}
                    </p>
                  </Container>
                  <Container fluid>
                    <div className="px-xl-5 pb-5">
                      <Row className="no-gutters">
                        <Col className="col-6 col-md mb-5 mb-md-0">
                          <h3
                            className={`pt-2 m-0 cursor-pointer text-white border-top border-light ${
                              sideMountShow === true
                                ? styles["acc-roller-heading-active"]
                                : ""
                            }`}
                          >
                            <span
                              id="rollerSideMount"
                              onClick={sideMountClick}
                              onKeyPress={sideMountClick}
                              role="button"
                              tabIndex={0}
                            >
                              {rows.rollerBearingSideMount.bannerTitle}
                            </span>
                          </h3>
                          <p className="text-white pb-4 m-0">
                            {rows.rollerBearingSideMount.bannerTitle2}
                          </p>
                          <I18nLink
                            href={rows.rollerBearingSideMount.bannerButtonLink}
                            isMagentoRoute={1}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase mx-auto border border-light rounded-0 px-lg-5 px-2 ${styles["acc-roller-order-now-bttn"]}`}
                            >
                              {rows.rollerBearingSideMount.bannerButtonLabel}
                            </Button>
                          </I18nLink>
                        </Col>
                        <Col className="col-6 col-md mb-5 mb-md-0">
                          <h3
                            className={`pt-2 m-0 cursor-pointer text-white border-top border-light ${
                              bottomMountShow === true
                                ? styles["acc-roller-heading-active"]
                                : ""
                            }`}
                          >
                            <span
                              id="rollerBottomMount"
                              onClick={sideMountClick}
                              onKeyPress={sideMountClick}
                              role="button"
                              tabIndex={0}
                            >
                              {rows.rollerBearingBottomMount.bannerTitle}
                            </span>
                          </h3>
                          <p className="text-white pb-4 m-0">
                            {rows.rollerBearingBottomMount.bannerTitle2}
                          </p>
                          <I18nLink
                            href={
                              rows.rollerBearingBottomMount.bannerButtonLink
                            }
                            isMagentoRoute={1}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase mx-auto border border-light rounded-0 px-lg-5 px-2 ${styles["acc-roller-order-now-bttn"]}`}
                            >
                              {rows.rollerBearingBottomMount.bannerButtonLabel}
                            </Button>
                          </I18nLink>
                        </Col>
                        <Col className="col-6 col-md">
                          <h3
                            className={`pt-2 pb-2 m-0 cursor-pointer text-white border-top border-light ${
                              sideMountShowOverTravel === true
                                ? styles["acc-roller-heading-active"]
                                : ""
                            }`}
                          >
                            <span
                              id="rollerSideMountOverTravel"
                              onClick={sideMountClick}
                              onKeyPress={sideMountClick}
                              role="button"
                              tabIndex={0}
                            >
                              {
                                rows.rollerBearingSideMountOverTravel
                                  .bannerTitle
                              }
                            </span>
                          </h3>
                          <p className="text-white pb-4 m-0">
                            {rows.rollerBearingSideMountOverTravel.bannerTitle2}
                          </p>
                          <I18nLink
                            href={
                              rows.rollerBearingSideMountOverTravel
                                .bannerButtonLink
                            }
                            isMagentoRoute={1}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase mx-auto border border-light rounded-0 px-lg-5 px-2 ${styles["acc-roller-order-now-bttn"]}`}
                            >
                              {
                                rows.rollerBearingSideMountOverTravel
                                  .bannerButtonLabel
                              }
                            </Button>
                          </I18nLink>
                        </Col>
                        <Col className="col-6 col-md">
                          <h3
                            className={`pt-2 pb-2 m-0 cursor-pointer text-white border-top border-light ${
                              bottomMountShowOverTravel === true
                                ? styles["acc-roller-heading-active"]
                                : ""
                            }`}
                          >
                            <span
                              id="rollerBottomMountOverTravel"
                              onClick={sideMountClick}
                              onKeyPress={sideMountClick}
                              role="button"
                              tabIndex={0}
                            >
                              {
                                rows.rollerBearingBottomMountOverTravel
                                  .bannerTitle
                              }
                            </span>
                          </h3>
                          <p className="text-white pb-4 m-0">
                            {
                              rows.rollerBearingBottomMountOverTravel
                                .bannerTitle2
                            }
                          </p>
                          <I18nLink
                            href={
                              rows.rollerBearingBottomMountOverTravel
                                .bannerButtonLink
                            }
                            isMagentoRoute={1}
                          >
                            <Button
                              variant="primary"
                              className={`text-uppercase mx-auto border border-light rounded-0 px-lg-5 px-2 ${styles["acc-roller-order-now-bttn"]}`}
                            >
                              {
                                rows.rollerBearingBottomMountOverTravel
                                  .bannerButtonLabel
                              }
                            </Button>
                          </I18nLink>
                        </Col>
                      </Row>
                      <div className="pt-5 position-relative">
                        <div
                          className={`${
                            sideMountShow === true ? "d-block" : "d-none"
                          }`}
                        >
                          <NextImage
                            src={rows.rollerBearingSideMount.bannerImage.url}
                            alt=""
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            width={1136}
                            height={336}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
                            className="img"
                          />
                          <p className={styles["acc-roller-image-desc"]}>
                            {rows.rollerBearingSideMount.bannerDescription.text}
                          </p>
                        </div>
                        <div
                          className={`${
                            bottomMountShow === true ? "d-block" : "d-none"
                          }`}
                        >
                          <NextImage
                            src={rows.rollerBearingBottomMount.bannerImage.url}
                            alt=""
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            width={1136}
                            height={336}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
                            className="img"
                          />
                          <p className={styles["acc-roller-image-desc"]}>
                            {
                              rows.rollerBearingBottomMount.bannerDescription
                                .text
                            }
                          </p>
                        </div>
                        <div
                          className={`${
                            sideMountShowOverTravel === true
                              ? "d-block"
                              : "d-none"
                          }`}
                        >
                          <NextImage
                            src={
                              rows.rollerBearingSideMountOverTravel.bannerImage
                                .url
                            }
                            alt=""
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            width={1136}
                            height={336}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
                            className="img"
                          />
                          <p className={styles["acc-roller-image-desc"]}>
                            {
                              rows.rollerBearingSideMountOverTravel
                                .bannerDescription.text
                            }
                          </p>
                        </div>
                        <div
                          className={`${
                            bottomMountShowOverTravel === true
                              ? "d-block"
                              : "d-none"
                          }`}
                        >
                          <NextImage
                            src={
                              rows.rollerBearingBottomMountOverTravel
                                .bannerImage.url
                            }
                            alt=""
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            width={1136}
                            height={336}
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
                            className="img"
                          />
                          <p className={styles["acc-roller-image-desc"]}>
                            {
                              rows.rollerBearingBottomMountOverTravel
                                .bannerDescription.text
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </Container>
                </div>
              </section>
              {/* End */}
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
              {/* Section5 Component End */}
              {/* Section5 Tab Component With OEM Button */}
              <BgImageTabSection
                tabList={rows.section5TabArea}
                customStyle="pb-2"
              />
              <section className="pb-5 text-center pt-4">
                <Container>
                  <I18nLink href={rows.section5ButtonLink}>
                    <Button
                      variant="primary"
                      className={`text-uppercase mx-auto ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section5ButtonLabel}
                    </Button>
                  </I18nLink>
                </Container>
              </section>
              {/* End */}
              {/* Section6 Component */}
              <section className="section-padding text-center">
                <Container>
                  <article
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-75 mx-auto" : ""
                    }`}
                  >
                    <h1 className="m-0 pb-3">{rows.section6Title}</h1>
                    <p className="m-0">{rows.section6Description}</p>
                    <div>
                      <NextImage
                        src={rows.section6Image.url}
                        alt="Placeholder"
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={333}
                        height={91}
                        className="img"
                      />
                    </div>
                  </article>
                </Container>
              </section>
              {/* Section6 Component End */}
              {/* Section7 Component */}
              <StaticBannerBgImage
                data={rows.section7ImageDesc}
                model="automationMotionControls"
                bgImage={rows.section7ImageDesc.bannerImage}
                sectionDesc={rows.section7ImageDesc.bannerDescription.text}
                winSize={windowSize}
                customStyle={`left-text acc-appliance-section7-bgimage`}
              />
              {/* Section7 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section8Title}
                description={rows.section8Description}
                dataArr={rows.featuredProducts}
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};
export default Appliances;
