import { useState } from "react";
import dynamic from "next/dynamic";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Row, Col, Card } from "react-bootstrap";
import Slider from "react-slick";
import ScrollAnimation from "react-animate-on-scroll";
import { BsPlus } from "react-icons/bs";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";

const Banner = dynamic(import("@Components/Markets/Banner"));
const Introduction = dynamic(import("@Components/Markets/Introduction"));
const StaticBannerBlueBGRightImage = dynamic(
  import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const TabSection = dynamic(import("@Components/Markets/TabSection"));
const IndustriesCarousel = dynamic(
  import("@Components/Markets/IndustriesCarousel"),
);
const FeatureProduct = dynamic(import("@Components/Markets/FeatureProduct"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const FAQ9300DrawerSlides = ({ fAQ9300DrawerSlidess }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [dotActive, setDotActive] = useState("0");
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: pathSegments[2],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
      name: pathSegments[3],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "9300 Drawer Slide Series",
      isClickable: false,
    },
  ];
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
  const sliderSettingsSection5 = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
    slidesToShow: 4,
    slidesToScroll: 4,
    focusOnSelect: true,
    rows: 1,
    centerMargin: "15px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
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
          infinite: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
          rows: 1,
        },
      },
    ],
  };
  // For animation section dot
  const tabContentShow = (GetIndex) => {
    setDotActive(GetIndex);
  };

  const tabContentShowMobile = (e) => {
    const elemTitle = e.target.parentElement.getAttribute("title");
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

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {fAQ9300DrawerSlidess
        ? fAQ9300DrawerSlidess.map((rows) => (
            <div key={`dsno_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-drawer-slides-product-banner-9300"
              />
              <section className="section-padding">
                <Container>
                  <Slider {...sliderSettings}>
                    {rows.section1Slider.map((item) => (
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
                              width={351}
                              height={100}
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
              <Introduction
                dataTitle={rows.section2Title}
                dataDesc={rows.section2Description.text}
                winSize={windowSize}
              />
              <TabSection
                PointerDisplay="false"
                field="secion3TabSection"
                customStyle="acc-market-constrail-tab"
                tabList={rows.section3TabSection}
              />
              <IndustriesCarousel
                title=""
                description=""
                data={rows.section4ImageGallery}
                customSettings={sliderSettingsIndi}
              />
              <section className="section-padding acc-drawer-slide-animation">
                <Container>
                  <div className="acc-slides-image-wrap acc-slides-heavy-duty position-relative">
                    <ScrollAnimation
                      animateIn="fadeIn"
                      delay={8000}
                      animateOnce
                    >
                      <div
                        title="card-0"
                        tabIndex={0}
                        role="button"
                        onClick={() => tabContentShow("0")}
                        onKeyDown={() => tabContentShow("0")}
                        className={`dot dot-0 position-absolute rounded-circle ${
                          dotActive === "0" ? "active" : ""
                        }`}
                      >
                        <BsPlus onClick={tabContentShowMobile} />
                      </div>
                      <div
                        title="card-1"
                        tabIndex={0}
                        role="button"
                        onClick={() => tabContentShow("1")}
                        onKeyDown={() => tabContentShow("1")}
                        className={`dot dot-1 position-absolute rounded-circle ${
                          dotActive === "1" ? "active" : ""
                        }`}
                      >
                        <BsPlus onClick={tabContentShowMobile} />
                      </div>
                      <div
                        title="card-2"
                        tabIndex={0}
                        role="button"
                        onClick={() => tabContentShow("2")}
                        onKeyDown={() => tabContentShow("2")}
                        className={`dot dot-2 position-absolute rounded-circle ${
                          dotActive === "2" ? "active" : ""
                        }`}
                      >
                        <BsPlus onClick={tabContentShowMobile} />
                      </div>
                      <div
                        title="card-3"
                        tabIndex={0}
                        role="button"
                        onClick={() => tabContentShow("3")}
                        onKeyDown={() => tabContentShow("3")}
                        className={`dot dot-3 position-absolute rounded-circle ${
                          dotActive === "3" ? "active" : ""
                        }`}
                      >
                        <BsPlus onClick={tabContentShowMobile} />
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                      <NextImage
                        src={rows.sliderImgSec5.url}
                        alt={rows.sliderImgSec5.fileName}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={1352}
                        height={176}
                      />
                    </ScrollAnimation>
                  </div>
                  <ScrollAnimation animateIn="fadeIn" animateOnce>
                    <Slider {...sliderSettings1} className="pt-5">
                      {rows.sliderDescSec5
                        ? rows.sliderDescSec5.map((items, index) => (
                            <Card
                              id={`card-${index}`}
                              key={`${items.id}_slideani`}
                              className={`border-0 text-center ${
                                dotActive === `${index}`
                                  ? "acc-drawerslides-ani-bg"
                                  : ""
                              }`}
                            >
                              <Card.Body>
                                <h3>{items.cardTitle}</h3>
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
                  </ScrollAnimation>
                </Container>
              </section>
              <section className="section-padding acc-drawer-slides-table">
                <Container>
                  <Row className="no-gutters">
                    <Col
                      xl={2}
                      md={3}
                      xs={6}
                      className="acc-drawer-slides-table-heading"
                    >
                      <div className="blank-div py-3 border-bottom"> </div>
                      <div className="other-div p-1 border-bottom">
                        Standard
                      </div>
                      <div className="other-div p-1 border-bottom">Lock-In</div>
                      <div className="other-div p-1 border-bottom">
                        Lock-Out
                      </div>
                      <div className="other-div p-1 ">
                        Pocket &amp; Bayonet Design
                      </div>
                    </Col>
                    <Col xl={10} md={9} xs={6}>
                      <Slider {...sliderSettingsSection5}>
                        {rows.section5Table
                          ? rows.section5Table.map((items, index) => (
                              <div
                                key={`${items.id}_procomptbl9300`}
                                className={`text-center ${
                                  index % 2 === 0
                                    ? "bg-light border-left border-right"
                                    : ""
                                }`}
                              >
                                <div className="border-bottom py-3">
                                  <h4 className="m-0">
                                    {items.columnLink ? (
                                      <I18nLink
                                        href={items.columnLink}
                                        isMagentoRoute={1}
                                      >
                                        {items.columnTitle}
                                      </I18nLink>
                                    ) : (
                                      items.columnTitle
                                    )}
                                  </h4>
                                </div>
                                <div className="py-3 border-bottom">
                                  {items.standard === "Yes" ? (
                                    <span className="dark-dot" />
                                  ) : (
                                    <span className="white-dot" />
                                  )}
                                </div>
                                <div className="py-3 border-bottom">
                                  {items.lockIn === "Yes" ? (
                                    <span className="dark-dot" />
                                  ) : (
                                    <span className="white-dot" />
                                  )}
                                </div>
                                <div className="py-3 border-bottom">
                                  {items.lockOut === "Yes" ? (
                                    <span className="dark-dot" />
                                  ) : (
                                    <span className="white-dot" />
                                  )}
                                </div>
                                <div className="py-3">
                                  {items.pocketBayonetDesign === "Yes" ? (
                                    <span className="dark-dot" />
                                  ) : (
                                    <span className="white-dot" />
                                  )}
                                </div>
                              </div>
                            ))
                          : ""}
                      </Slider>
                    </Col>
                  </Row>
                </Container>
              </section>
              <StaticBannerBlueBGRightImage
                data={rows.section6StaticBanner}
                winSize={windowSize}
                customStyle="acc-drawer-slides-left-image acc-drawer-slides-accinaction-sec"
              />
              <FeatureProduct
                title={rows.featuredProductTitle}
                description={rows.featuredProductDescription}
                dataArr={rows.featuredProducts}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default FAQ9300DrawerSlides;
