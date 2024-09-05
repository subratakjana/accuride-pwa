import { useContext, useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import {
  Container,
  Row,
  Col,
  Button,
  Tab,
  Tabs,
  Image,
  Accordion,
} from "react-bootstrap";
import NextImage from "next/legacy/image";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";
import styles from "./HomeOwners.module.scss";

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
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const HomeOwners = ({ homeownersess }) => {
  const windowSize = useWindowDimensions();
  const [tabsAll, setTabsAll] = useState();
  const [isTabAll, setIsTabsAll] = useState(false);
  const [windowObj, updateWindowObj] = useState(false);
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
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  if (!isTabAll) {
    const tabData = homeownersess[0].allTabses;
    setTabsAll(tabData);
    setIsTabsAll(true);
  }

  const changeState = (currenttab, tabindexcont) => {
    const techSpecData = tabsAll[currenttab].technicalSpecifications.map(
      (eachIteams) => {
        const techtabItem = eachIteams;
        techtabItem.isActive = false;
        return techtabItem;
      },
    );
    techSpecData[tabindexcont].isActive = true;
    tabsAll[currenttab].technicalSpecifications = techSpecData;
    setTabsAll([...tabsAll]);

    const elmntId = `content-${techSpecData[tabindexcont].id}`;
    const elmnt = document.getElementById(elmntId);
    elmnt.scrollIntoView({
      behavior: "smooth",
      block: `${windowObj && windowSize.width > 1024 ? "nearest" : "center"}`,
    });
  };

  // For Accordian
  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <>
        <Accordion.Toggle
          onClick={decoratedOnClick}
          className="btn-block py-3 text-left"
          variant="link"
        >
          {children}
          {isCurrentEventKey ? (
            <BsChevronUp
              className={`position-absolute top right ${styles["acc-res-tab-arrow"]}`}
            />
          ) : (
            <BsChevronDown
              className={`position-absolute top right ${styles["acc-res-tab-arrow"]}`}
            />
          )}
        </Accordion.Toggle>
      </>
    );
  };
  // End

  const sliderSettings = {
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
      {homeownersess
        ? homeownersess.map((rows) => (
            <div key={`hom_${rows.id}`}>
              {/* Banner Component */}
              <div className={styles["acc-market-inner-pages-banner-wrapper"]}>
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                  customStyle="acc-homeowner-main-banner"
                />
              </div>
              {/* End */}
              {/* Page Introduction */}
              <Introduction
                dataobj={rows.pages}
                winSize={windowSize}
                customStyle="acc-sec-bottom-gap-reduce"
              />
              {/* End */}
              {/* Tab Section */}
              {windowObj && windowSize.width > 1024 ? (
                // Tab Section For Desktop
                <section
                  className={`section-padding d-none d-xl-block ${styles["acc-homeowner-custom-tab"]}`}
                >
                  <Container>
                    {tabsAll ? (
                      <Tabs
                        id="uncontrolled-tab-example"
                        className="border-bottom-0 w-75 mx-auto border-top border-medium"
                      >
                        {tabsAll.map((items, indextab) => (
                          <Tab
                            eventKey={items.tabTitle}
                            title={items.tabName}
                            key={`hom_own_tab${items.id}`}
                          >
                            <Row>
                              <Col>
                                <div
                                  className={`position-relative ${styles["acc-homeowner-image-wrap"]}`}
                                >
                                  <Image
                                    src={items.tabImage.url}
                                    alt={items.tabImage.assetTitle}
                                  />
                                  <div
                                    className={`position-absolute h-100 w-100 top left ${styles["acc-homeowner-dots-wrap"]}`}
                                  >
                                    {items.technicalSpecifications
                                      ? items.technicalSpecifications.map(
                                          (tabitems, checkindex) => (
                                            <div
                                              onClick={() =>
                                                changeState(
                                                  indextab,
                                                  checkindex,
                                                )
                                              }
                                              onKeyDown={changeState}
                                              tabIndex={0}
                                              role="button"
                                              key={`tabdots_${tabitems.id}`}
                                              data-id={checkindex}
                                              className={`position-absolute ${
                                                styles.dot
                                              } ${
                                                styles[`dot-${checkindex + 1}`]
                                              } ${tabitems.isActive} ${
                                                (!("isActive" in tabitems) &&
                                                  checkindex === 0) ||
                                                tabitems.isActive
                                                  ? styles.active
                                                  : ""
                                              }`}
                                            >
                                              <a>
                                                <span className="d-block rounded-circle" />
                                              </a>
                                            </div>
                                          ),
                                        )
                                      : ""}
                                  </div>
                                  {items.technicalSpecifications
                                    ? items.technicalSpecifications.map(
                                        (tabitems, index) => (
                                          <div
                                            key={`tabhighlight_${tabitems.id}`}
                                            className={`${
                                              styles[
                                                "acc-homeowner-image-caption"
                                              ]
                                            } ${
                                              styles[`caption-${index + 1}`]
                                            } position-absolute right p-4 ${
                                              (!("isActive" in tabitems) &&
                                                index === 0) ||
                                              tabitems.isActive
                                                ? styles["caption-active"]
                                                : ""
                                            }`}
                                          >
                                            <h3 className="m-0">
                                              {tabitems.heading}
                                            </h3>
                                            <h4 className="m-0">
                                              {tabitems.subTitle}
                                            </h4>
                                          </div>
                                        ),
                                      )
                                    : ""}
                                </div>
                              </Col>
                              <Col>
                                <div
                                  className={`scroll-y-auto ${styles["acc-homeowner-content-wrap"]}`}
                                >
                                  {items.technicalSpecifications
                                    ? items.technicalSpecifications.map(
                                        (tabitems, index) => (
                                          <div
                                            id={`content-${tabitems.id}`}
                                            key={`tabcontent_${tabitems.id}`}
                                            className={`border-bottom border-medium pb-4 mb-4 ${
                                              styles[`item-content-${index}`]
                                            } ${
                                              (!("isActive" in tabitems) &&
                                                index === 0) ||
                                              tabitems.isActive
                                                ? styles["content-active"]
                                                : ""
                                            }`}
                                          >
                                            <h3 className="m-0">
                                              {tabitems.pageTitle}
                                            </h3>
                                            <HTMLContent
                                              className="m-0"
                                              content={
                                                tabitems.fullDescription.html
                                              }
                                            />
                                            <I18nLink
                                              href={tabitems.buttonLink}
                                              isMagentoRoute={1}
                                            >
                                              <Button
                                                variant="primary"
                                                className={`text-uppercase mx-auto ${
                                                  windowObj &&
                                                  windowSize.width < 991
                                                    ? "btn-block"
                                                    : ""
                                                }`}
                                              >
                                                {tabitems.buttonLabel}
                                              </Button>
                                            </I18nLink>
                                          </div>
                                        ),
                                      )
                                    : ""}
                                </div>
                              </Col>
                            </Row>
                          </Tab>
                        ))}
                      </Tabs>
                    ) : (
                      ""
                    )}
                  </Container>
                </section>
              ) : (
                // End
                // Accordia Section For Mobile
                <section
                  className={`section-padding d-xl-none d-block ${styles["acc-homeowner-custom-tab"]}`}
                >
                  <Container>
                    {tabsAll ? (
                      <>
                        {tabsAll.map((items, indextab) => (
                          <Accordion
                            id="uncontrolled-tab-example"
                            className={styles["acc-custom-res-tab"]}
                            key={`hom_own_tab${items.id}`}
                          >
                            <ContextAwareToggle eventKey={items.tabTitle}>
                              {items.tabName}
                            </ContextAwareToggle>
                            <Accordion.Collapse
                              eventKey={items.tabTitle}
                              className="tab-content"
                            >
                              <Row>
                                <Col xl={6}>
                                  <div
                                    className={`${styles["acc-homeowner-image-wrap"]} mb-5 position-relative`}
                                  >
                                    <Image
                                      className="w-100"
                                      src={items.tabImage.url}
                                    />
                                    <div
                                      className={`${styles["acc-homeowner-dots-wrap"]} position-absolute h-100 w-100 top left`}
                                    >
                                      {items.technicalSpecifications
                                        ? items.technicalSpecifications.map(
                                            (tabitems, checkindex) => (
                                              <div
                                                onClick={() =>
                                                  changeState(
                                                    indextab,
                                                    checkindex,
                                                  )
                                                }
                                                onKeyDown={changeState}
                                                tabIndex={0}
                                                role="button"
                                                key={`tabdots_${tabitems.id}`}
                                                data-id={checkindex}
                                                className={`position-absolute ${
                                                  styles.dot
                                                } ${
                                                  styles[
                                                    `dot-${checkindex + 1}`
                                                  ]
                                                } ${tabitems.isActive} ${
                                                  (!("isActive" in tabitems) &&
                                                    checkindex === 0) ||
                                                  tabitems.isActive
                                                    ? styles.active
                                                    : ""
                                                }`}
                                              >
                                                <a>
                                                  <span className="d-block rounded-circle" />
                                                </a>
                                              </div>
                                            ),
                                          )
                                        : ""}
                                    </div>
                                    {items.technicalSpecifications
                                      ? items.technicalSpecifications.map(
                                          (tabitems, index) => (
                                            <div
                                              key={`tabhighlight_${tabitems.id}`}
                                              className={`${
                                                styles[
                                                  "acc-homeowner-image-caption"
                                                ]
                                              } ${
                                                styles[`caption-${index + 1}`]
                                              }
                                                                                             position-absolute right p-4 ${
                                                                                               (!(
                                                                                                 "isActive" in
                                                                                                 tabitems
                                                                                               ) &&
                                                                                                 index ===
                                                                                                   0) ||
                                                                                               tabitems.isActive
                                                                                                 ? styles[
                                                                                                     "caption-active"
                                                                                                   ]
                                                                                                 : ""
                                                                                             }`}
                                            >
                                              <h3 className="m-0">
                                                {tabitems.heading}
                                              </h3>
                                              <h4 className="m-0">
                                                {tabitems.subTitle}
                                              </h4>
                                            </div>
                                          ),
                                        )
                                      : ""}
                                  </div>
                                </Col>
                                <Col xl={6}>
                                  <div
                                    className={`scroll-y-auto ${styles["acc-homeowner-content-wrap"]}`}
                                  >
                                    {items.technicalSpecifications
                                      ? items.technicalSpecifications.map(
                                          (tabitems, index) => (
                                            <div
                                              id={`content-${tabitems.id}`}
                                              key={`tabcontent_${tabitems.id}`}
                                              className={`border-bottom border-medium pb-4 mb-4 ${
                                                styles[`item-content-${index}`]
                                              } ${
                                                (!("isActive" in tabitems) &&
                                                  index === 0) ||
                                                tabitems.isActive
                                                  ? styles["content-active"]
                                                  : ""
                                              }`}
                                            >
                                              <h3 className="m-0">
                                                {tabitems.pageTitle}
                                              </h3>
                                              <HTMLContent
                                                className="m-0"
                                                content={
                                                  tabitems.fullDescription.html
                                                }
                                              />
                                              <I18nLink
                                                href={tabitems.buttonLink}
                                                isMagentoRoute={1}
                                              >
                                                <Button
                                                  variant="primary"
                                                  className={`text-uppercase mx-auto ${
                                                    windowObj &&
                                                    windowSize.width < 991
                                                      ? "btn-block"
                                                      : ""
                                                  }`}
                                                >
                                                  {tabitems.buttonLabel}
                                                </Button>
                                              </I18nLink>
                                            </div>
                                          ),
                                        )
                                      : ""}
                                  </div>
                                </Col>
                              </Row>
                            </Accordion.Collapse>
                          </Accordion>
                        ))}
                      </>
                    ) : (
                      ""
                    )}
                  </Container>
                </section>
                // End
              )}
              {/* Tab Section End */}
              {/* Section2 Area  */}
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col lg={8}>
                      <article className="text-center text-lg-left pb-3 pb-lg-0">
                        <h2 className="text-center text-uppercase">
                          {rows.section2Title}
                        </h2>
                        <HTMLContent
                          className="pb-lg-5 m-0 pb-3"
                          content={rows.section2Desc.html}
                        />
                        <I18nLink href={rows.section2ButtonLink}>
                          <Button
                            variant="primary"
                            className={`text-uppercase border-medium border mx-auto ${
                              windowObj && windowSize.width <= 991
                                ? "btn-block"
                                : ""
                            }`}
                          >
                            {rows.section2ButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                    <Col lg={4}>
                      {rows.section2Images
                        ? rows.section2Images.map((EachImage) => (
                            <div
                              key={`img_${EachImage.id}`}
                              className={styles["acc-homeowner-logo-image"]}
                            >
                              {EachImage.fileName ? (
                                EachImage.fileName.split(".").pop() ===
                                "svg" ? (
                                  <ReactSVG
                                    src={EachImage.url}
                                    className={styles["acc-svg-image"]}
                                  />
                                ) : (
                                  <div className="embed-responsive embed-responsive-21by9">
                                    <NextImage
                                      src={EachImage.url}
                                      alt="placeholder"
                                      layout="fill"
                                      objectFit="contain"
                                      objectPosition="center"
                                      className="mx-auto"
                                    />
                                  </div>
                                )
                              ) : (
                                <ReactSVG
                                  src={EachImage.url}
                                  className={styles["acc-svg-image"]}
                                />
                              )}
                            </div>
                          ))
                        : ""}
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* Section2 Area End */}
              {/* Section3 Area  */}
              <section
                className={`section-padding position-relative ${styles["acc-homeowner-story-section"]}`}
              >
                {rows.section3ImageDesc
                  ? rows.section3ImageDesc.map((EachImage) => (
                      <div key={`desc_${EachImage.id}`}>
                        <span className={styles["storyImgOuter"]}>
                          <NextImage
                            src={EachImage.image.url}
                            alt={EachImage.image.assetTitle}
                            objectFit="cover"
                            objectPosition="center"
                            layout="fill"
                          />
                        </span>
                        <article
                          className={`${
                            styles["acc-homeowner-story-content"]
                          } p-3 p-xl-0 text-center ${
                            windowObj && windowSize.width >= 1025
                              ? "position-absolute"
                              : ""
                          }`}
                        >
                          <h2
                            className={`${
                              windowObj && windowSize.width >= 1025
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {EachImage.title}
                          </h2>
                          <HTMLContent
                            className="m-0"
                            content={EachImage.description.html}
                          />
                          <I18nLink href={EachImage.buttonLink}>
                            <Button
                              variant="primary"
                              className={`text-uppercase border-medium border mx-auto ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {EachImage.buttonLabel}
                            </Button>
                          </I18nLink>
                        </article>
                        <div
                          className={`${styles["acc-homeowner-story-writer-desc"]} text-center position-absolute`}
                        >
                          <h5 className="pt-4 m-0 text-white">
                            {EachImage.name}
                          </h5>
                          <p className="m-0">{EachImage.designation}</p>
                        </div>
                      </div>
                    ))
                  : ""}
              </section>
              {/* Section3 Area End  */}
              {/* Section4 Area  */}
              <section className="section-padding">
                <Container>
                  <article
                    className={`text-center ${
                      windowObj && windowSize.width >= 1024
                        ? "w-75 mx-auto"
                        : ""
                    }`}
                  >
                    <h2 className="text-uppercase">{rows.section4Title}</h2>
                    <p>{rows.section4Description}</p>
                  </article>
                </Container>
              </section>
              {/* Section4 Area End  */}
              {/* Section5 Component */}
              <ImageSlider
                ImageSliders={rows.section5ImageDesc}
                customStyle="acc-custom-image-slider-right-image pb-0"
              />
              {/* Section5 Component End */}
              {/* Section6 Component */}
              <ImageSlider
                ImageSliders={rows.section6ImageDesc}
                customStyle="py-5"
              />
              {/* Section6 Component End */}
              {/* Section7 Component */}
              <ImageSlider
                ImageSliders={rows.section7ImageDesc}
                customStyle="acc-custom-image-slider-right-image pt-0 pb-5"
              />
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <ImageSlider
                ImageSliders={rows.section8ImageDesc}
                customStyle="pt-0"
              />
              {/* Section8 Component End */}
              {/* Section9 Area  */}
              <section
                className={`section-padding position-relative ${styles["acc-homeowner-story-section"]}`}
              >
                {rows.section9ImageDesc
                  ? rows.section9ImageDesc.map((EachImage) => (
                      <div key={`descr_${EachImage.id}`}>
                        <span className={styles["storyImgOuter"]}>
                          <NextImage
                            src={EachImage.image.url}
                            alt={EachImage.image.assetTitle}
                            objectFit="cover"
                            objectPosition="center"
                            layout="fill"
                          />
                        </span>
                        <article
                          className={`${
                            styles["acc-homeowner-story-content"]
                          } text-center p-3 p-xl-0 ${
                            windowObj && windowSize.width >= 1025
                              ? "position-absolute"
                              : ""
                          }`}
                        >
                          <h2
                            className={`${
                              windowObj && windowSize.width >= 1025
                                ? "text-white"
                                : ""
                            }`}
                          >
                            {EachImage.title}
                          </h2>
                          <HTMLContent
                            className="m-0"
                            content={EachImage.description.html}
                          />
                          <I18nLink href={EachImage.buttonLink}>
                            <Button
                              variant="primary"
                              className={`text-uppercase border-medium border mx-auto ${
                                windowObj && windowSize.width <= 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {EachImage.buttonLabel}
                            </Button>
                          </I18nLink>
                        </article>
                        <div
                          className={`${styles["acc-homeowner-story-second-writer-desc"]} text-center position-absolute`}
                        >
                          <h5 className="pt-4 m-0 text-white">
                            {EachImage.name}
                          </h5>
                          <p className="m-0">{EachImage.designation}</p>
                        </div>
                      </div>
                    ))
                  : ""}
              </section>
              {/* Section9 Area End  */}
              {/* Section10 Area  */}
              <section
                className={`section-padding ${styles["acc-homeowner-review-sec"]}`}
              >
                <Container>
                  <article className="text-center">
                    <h1>{rows.section10Description}</h1>
                    <h4>{rows.section10WriterName}</h4>
                  </article>
                </Container>
              </section>
              {/* Section10 Area End  */}
              {/* Section11 Component */}
              <StaticBannerBgImage
                data={rows.section11ImageDesc}
                model="homeownerses"
                bgImage={rows.section11ImageDesc.bannerImage}
                sectionDesc={rows.section11ImageDesc.bannerDescription.text}
                winSize={windowSize}
              />
              {/* Section11 Component End */}
              {/* Section12 Component */}
              <IndustriesCarousel
                title={rows.section12Title}
                data={rows.section12ImageGallery}
                customStyle="acc-homeowner-getstarted-sec"
                customSettings={sliderSettings}
              />
              {/* Section12 Component End */}
              {/* Section13 Component */}
              <section
                className={`section-padding position-relative ${styles["acc-homeowner-writer-section"]}`}
              >
                {rows.section13BgImage
                  ? rows.section13BgImage.map((EachImage) => (
                      <span
                        className={`${styles.writerImageHolder} d-block w-100`}
                      >
                        <NextImage
                          src={EachImage.url}
                          alt={EachImage.assetTitle}
                          objectFit="cover"
                          objectPosition="center"
                          layout="fill"
                          key={`descimg_${EachImage.id}`}
                        />
                      </span>
                    ))
                  : ""}
                <Container>
                  <article
                    className={`text-center text-lg-left p-3 p-lg-0 ${
                      windowObj && windowSize.width >= 1024
                        ? "w-50 mx-auto position-absolute"
                        : ""
                    }`}
                  >
                    <h2
                      className={`${
                        windowObj && windowSize.width >= 1024
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {rows.section13Description}
                    </h2>
                    <h4
                      className={`font-italic m-0 ${
                        windowObj && windowSize.width >= 1024
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {rows.section13WriterName}
                    </h4>
                    <p
                      className={`font-italic m-0 ${
                        windowObj && windowSize.width >= 1024
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {rows.section13WriterDetails}
                    </p>
                  </article>
                </Container>
              </section>
              {/* Section13 Component End */}
              {/* Featured Product */}
              <FeatureProduct
                title={rows.section14Title}
                description={rows.section14Description}
                dataArr={rows.featuredProducts}
              />
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default HomeOwners;
