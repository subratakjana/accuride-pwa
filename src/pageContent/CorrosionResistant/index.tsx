import { useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import styles from "./CorrosionResistant.module.scss";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BgImageTabSection = dynamic(
  () => import("@Components/Markets/BgImageTabSection"),
);
const BgImageSlider = dynamic(
  () => import("@Components/Markets/BgImageSlider"),
);
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const Banner = dynamic(() => import("@Components/Markets/Banner"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const CorrosionResistants = ({ corrosionResistantss }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [sliderNav1, setSliderNav1] = useState([]);
  const [sliderNav2, setSliderNav2] = useState([]);
  const [sideMountShow, setSideMountShow] = useState(true);
  const [bottomMountShow, setBottomMountShow] = useState();
  const [sideMountShowOverTravel, setSideMountShowOverTravel] = useState();
  const [bottomMountShowOverTravel, setBottomMountShowOverTravel] = useState();
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (error) {
      console.log("error", error);
    }
  });
  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Corrosion Resistant Slides",
      isClickable: false,
    },
  ];
  let slider1 = [];
  let slider2 = [];
  useEffect(() => {
    setSliderNav1(slider1);
    setSliderNav2(slider2);
  }, [slider1, slider2]);
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  const sliderSettings1 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    focusOnSelect: true,
    rows: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          rows: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          rows: 1,
        },
      },
    ],
  };
  const sliderSettingsSection2 = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
  };
  const tableSliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
          variableWidth: false,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          variableWidth: false,
        },
      },
    ],
  };
  // For animation section dot
  const tabContentShowMobile = (e, GetIndex) => {
    setSliderIndex(GetIndex);
    const parentElem = e.target.parentElement;
    const elemTitle = parentElem.getAttribute("title");
    const targetId = document.getElementById(elemTitle);
    if (targetId) {
      targetId.click();
    }
  };

  const sliderSettingsIndi = {
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
      {corrosionResistantss
        ? corrosionResistantss.map((rows) => (
            <div key={`dsno_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="corrosion-resistant-banner pb-3 pb-xxl-0"
              />
              <section className="section-padding bg-light">
                <Container>
                  <Slider {...sliderSettings}>
                    {rows.section1ImageSlider.map((item) => (
                      <article
                        className="text-center acc-item"
                        key={`solutions_${item.id}`}
                      >
                        <I18nLink
                          href={`${item.imageButtonLink}`}
                          isMagentoRoute={1}
                        >
                          <a aria-label="link" className="d-block">
                            <NextImage
                              src={item.galleryImages.url}
                              alt={item.imageTitle}
                              objectFit="contain"
                              objectPosition="center"
                              layout="intrinsic"
                              width={369}
                              height={105}
                              className="mx-auto"
                              placeholder="blur"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                "/assets/images/icons/imageLoader.svg",
                              )}`}
                            />
                            <p className="text-uppercase mb-0 d-block font-size-lg">
                              {item.imageTitle}
                            </p>
                            <p>{item.imageDescription}</p>
                          </a>
                        </I18nLink>
                        <I18nLink
                          href={`${item.imageButtonLink}#review`}
                          isMagentoRoute={1}
                        >
                          <div
                            className="yotpo bottomLine d-flex justify-content-center"
                            data-yotpo-product-id={item.galleryTitle}
                          />
                        </I18nLink>
                      </article>
                    ))}
                  </Slider>
                </Container>
              </section>
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <TabSection
                tabList={rows.section3TabSection}
                customStyle="acc-five-tab corrosion-resistant-tab pb-0"
              />
              <section className="bg-light mt-3 mt-xl-0">
                <Container>
                  <Slider
                    {...sliderSettingsSection2}
                    asNavFor={sliderNav2}
                    ref={(slider) => (slider1 = slider)}
                    className="pt-5"
                  >
                    {rows.section4SlideImage
                      ? rows.section4SlideImage.map((slideItems, index) => (
                          <div
                            id={`card-${index}`}
                            key={`${slideItems.id}_slideaniimg`}
                          >
                            <NextImage
                              src={slideItems.url}
                              alt={slideItems.fileName}
                              objectFit="contain"
                              objectPosition="center"
                              layout="intrinsic"
                              width={1352}
                              height={386}
                              className="w-100"
                            />
                            <p className="text-right m-0 pr-5 pb-4">
                              {slideItems.assetTitle}
                            </p>
                          </div>
                        ))
                      : ""}
                  </Slider>
                </Container>
              </section>
              <section
                className={`section-padding pt-0 ${styles["acc-corrosion-resistants-animation"]}`}
              >
                <Container>
                  <Slider
                    {...sliderSettings1}
                    asNavFor={sliderNav1}
                    ref={(slider) => (slider2 = slider)}
                    className="pt-5"
                  >
                    {rows.section4SliderDescription
                      ? rows.section4SliderDescription.map((items, index) => (
                          <Card
                            title="card"
                            key={`${items.id}_slideani`}
                            className={`border-0 text-center ${
                              windowSize.width < 473
                                ? "card-active"
                                : [index === sliderIndex ? "card-active" : ""]
                            }`}
                          >
                            <Card.Body
                              title={`card-${index}`}
                              onClick={(e) => tabContentShowMobile(e, index)}
                              onKeyDown={(e) => tabContentShowMobile(e, index)}
                            >
                              <h3 className="m-0 pb-2">{items.cardTitle}</h3>
                              {items.cardDescription ? (
                                <Card.Text>{items.cardDescription}</Card.Text>
                              ) : (
                                ""
                              )}
                            </Card.Body>
                          </Card>
                        ))
                      : ""}
                  </Slider>
                </Container>
              </section>
              <IndustriesCarousel
                title=""
                description=""
                data={rows.section5ImageGallery}
                customSettings={sliderSettingsIndi}
              />
              <section
                className={`section-padding ${styles["acc-corrosion-resistant-table"]}`}
              >
                <Container>
                  <Row className="no-gutters">
                    <Col xl={2} md={3} xs={3}>
                      <div
                        className={`p-1 border-bottom border-medium text-center ${styles["table-head"]}`}
                      >
                        <h5 className="text-uppercase font-weight-bold">
                          Type
                        </h5>
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        CB Finish
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        CH Finish
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        CE Finish*
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        CP Finish*
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        EW Finish
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        SS
                      </div>
                      <div
                        className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                      >
                        AL
                      </div>
                    </Col>
                    <Col xl={10} md={9} xs={9}>
                      <Slider {...tableSliderSettings}>
                        {rows.section6Table
                          ? rows.section6Table.map((tableItems, index) => (
                              <div
                                key={`${tableItems.id}_tablecontent`}
                                className={`text-center border-medium border-left border-right ${
                                  index % 2 === 0
                                    ? `bg-light ${styles["big-slide-width"]}`
                                    : styles["small-slide-width"]
                                }`}
                              >
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-head"]}`}
                                >
                                  <h5 className="text-uppercase font-weight-bold">
                                    {tableItems.columnTitle}
                                  </h5>
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.cbFinish}
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.chFinish}
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.ceFinish}
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.cpFinish}
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.ewFinish}
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.ss}
                                </div>
                                <div
                                  className={`p-1 border-bottom border-medium ${styles["table-col"]}`}
                                >
                                  {tableItems.al}
                                </div>
                              </div>
                            ))
                          : ""}
                      </Slider>
                    </Col>
                  </Row>
                  <p className="m-0 pt-3">{rows.section6TableDesc}</p>
                </Container>
              </section>
              <BgImageSlider
                data={rows.section7ImageDescNewSlide}
                bgImage={rows.section7ImageDescNewSlide.bannerImage}
                sectionDesc
                winSize={windowSize}
                customStyle="acc-corrosion-section-seven-new-slide acc-first-slide-caption-text-visibility"
              />
              {/* Roller Bearing Section */}
              <section
                className={`section-padding text-center ${styles["acc-roller-sec"]}`}
              >
                <h1 className="pb-5 m-0">
                  {rows.rollerBannerSection.bannerTitle}
                </h1>
                <div className={styles["RollerBannerOuter"]}>
                  <NextImage
                    src={rows.rollerBannerSection.bannerImage.url}
                    alt=""
                    objectFit="cover"
                    objectPosition="center"
                    layout="fill"
                    className="img"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(
                      "/assets/images/icons/imageLoader.svg",
                    )}`}
                  />
                </div>
                <h1 className="py-5 m-0">
                  {rows.rollerBannerSection.bannerDescription.text}
                </h1>
                <div
                  className={`position-relative ${styles["acc-roller-bearing-content"]}`}
                >
                  <div
                    className={`${styles["acc-roller-sec-bg-color"]} bg-primary position-absolute top left w-100`}
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
                            className={`pt-2 pb-2 m-0 cursor-pointer text-white border-top border-light ${
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
                              className={`text-uppercase ${
                                styles["acc-roller-order-now-bttn"]
                              } mx-auto border border-light rounded-0 px-lg-5 ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {rows.rollerBearingSideMount.bannerButtonLabel}
                            </Button>
                          </I18nLink>
                        </Col>
                        <Col className="col-6 col-md mb-5 mb-md-0">
                          <h3
                            className={`pt-2 pb-2 m-0 cursor-pointer text-white border-top border-light ${
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
                              className={`text-uppercase ${
                                styles["acc-roller-order-now-bttn"]
                              } mx-auto border border-light rounded-0 px-lg-5 ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : ""
                              }`}
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
                              className={`text-uppercase ${
                                styles["acc-roller-order-now-bttn"]
                              } mx-auto border border-light rounded-0 px-lg-5 ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : ""
                              }`}
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
                              className={`text-uppercase ${
                                styles["acc-roller-order-now-bttn"]
                              } mx-auto border border-light rounded-0 px-lg-5 ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : ""
                              }`}
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
                            objectFit="contain"
                            objectPosition="center"
                            layout="intrinsic"
                            width={1136}
                            height={336}
                            className="img"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
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
                            objectFit="contain"
                            objectPosition="center"
                            layout="intrinsic"
                            width={1136}
                            height={336}
                            className="img"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
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
                            objectFit="contain"
                            objectPosition="center"
                            layout="intrinsic"
                            width={1136}
                            height={336}
                            className="img"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
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
                            objectFit="contain"
                            objectPosition="center"
                            layout="intrinsic"
                            width={1136}
                            height={336}
                            className="img"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64(
                              "/assets/images/icons/imageLoader.svg",
                            )}`}
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
              <section className="section-padding text-center">
                <Container>
                  <h2 className="text-uppercase">{rows.section8Title}</h2>
                  <HTMLContent
                    class="m-0 pb-4 w-75 mx-auto"
                    content={rows.section8Description.html}
                  />
                  <I18nLink href={rows.section8ButtonLink}>
                    <Button
                      variant="primary"
                      className={`text-uppercase mx-auto ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section8ButtonLabel}
                    </Button>
                  </I18nLink>
                </Container>
              </section>
              <BgImageTabSection
                tabList={rows.section5TabArea}
                customStyle="pb-2"
              />
              <FeatureProduct
                title={rows.section10Title}
                description={rows.section10Description.text}
                dataArr={rows.featuredProducts}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default CorrosionResistants;
