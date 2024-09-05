import dynamic from "next/dynamic";
import { useState } from "react";
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
const StaticBannerBgImage = dynamic(
  import("@Components/Markets/StaticBannerBgImage"),
);
const FeatureProduct = dynamic(import("@Components/Markets/FeatureProduct"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const FAQ3100DrawerSlides = ({ fAQ3100DrawerSlidess }) => {
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
      name: "3100 Drawer Slide Series",
      isClickable: false,
    },
  ];
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    rows: 1,
    focusOnSelect: true,
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
  const sliderSettingsSection5 = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
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
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {fAQ3100DrawerSlidess
        ? fAQ3100DrawerSlidess.map((rows) => (
            <div key={`dsnos_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-drawer-slides-product-banner-3100"
              />
              <section className="section-padding">
                <Container>
                  <Slider {...sliderSettings}>
                    {rows.section1ImageGallery.map((item) => (
                      <article
                        className="text-center acc-item"
                        key={`solutions_${item.id}`}
                      >
                        <I18nLink
                          href={`${item.imageButtonLink}`}
                          isMagentoRoute={1}
                        >
                          <a aria-label="link" className="d-block">
                            <div className="acc-next-img acc-pdct-img-dwr-sld">
                              <NextImage
                                src={item.galleryImages.url}
                                alt={item.imageTitle}
                                width={347}
                                height={100}
                                objectFit="contain"
                              />
                            </div>
                            <p className="text-uppercase font-size-lg mb-0 d-block">
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
                dataDesc={rows.section2Description}
                winSize={windowSize}
              />
              <TabSection
                PointerDisplay="false"
                field="section3TabSection"
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
                  <div className="acc-slides-image-wrap w-75 mx-auto acc-slides-undermount position-relative">
                    <ScrollAnimation animateIn="fadeIn" animateOnce>
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
                      <div
                        title="card-4"
                        tabIndex={0}
                        role="button"
                        onClick={() => tabContentShow("4")}
                        onKeyDown={() => tabContentShow("4")}
                        className={`dot dot-4 position-absolute rounded-circle ${
                          dotActive === "4" ? "active" : ""
                        }`}
                      >
                        <BsPlus onClick={tabContentShowMobile} />
                      </div>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeIn">
                      <div className="acc-next-img acc-pdct-anim-img-dwr-sld-3100">
                        <NextImage
                          src={rows.sliderImgSec5.url}
                          alt={rows.sliderImgSec5.fileName}
                          width={1014}
                          height={624}
                          objectFit="contain"
                        />
                      </div>
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
                  <Row className="no-gutters justify-content-center">
                    <Col
                      xl={2}
                      md={3}
                      xs={3}
                      className="acc-drawer-slides-table-heading"
                    >
                      <div className="blank-div py-3 border-bottom"> </div>
                      <div className="other-div p-1 border-bottom">
                        Up to 30 in.
                      </div>
                      <div className="other-div p-1 border-bottom">
                        31 to 40 in.
                      </div>
                      <div className="other-div p-1">41 to 60 in.</div>
                    </Col>
                    <Col xl={10} md={9} xs={9}>
                      <Slider {...sliderSettingsSection5}>
                        {rows.section6Table
                          ? rows.section6Table.map((items, index) => (
                              <div
                                lg={3}
                                key={`${items.id}_procomptbl3100`}
                                className={`text-center ${
                                  index % 2 === 0
                                    ? "bg-light border-left border-right"
                                    : ""
                                }`}
                              >
                                <div className="border-bottom py-3">
                                  <h4 className="m-0 small-h4-3100-drawer-slides">
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
                                <div className="border-bottom py-3">
                                  {items.upTo30In === "Yes" ? (
                                    <span className="dark-dot" />
                                  ) : (
                                    <span className="white-dot" />
                                  )}
                                </div>
                                <div className="border-bottom py-3">
                                  {items.v31To40In === "Yes" ? (
                                    <span className="dark-dot" />
                                  ) : (
                                    <span className="white-dot" />
                                  )}
                                </div>
                                <div className="py-3">
                                  {items.v41To60In === "Yes" ? (
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
                data={rows.section7StaticBanner}
                winSize={windowSize}
                customStyle="acc-bg-left-image"
              />
              <StaticBannerBgImage
                data={rows.section8StaticBanner}
                model="fAQ3100DrawerSlides"
                bgImage={rows.section8StaticBanner.bannerImage}
                sectionDesc={rows.section8StaticBanner.bannerDescription.text}
                winSize={windowSize}
                customStyle="left-text acc-purple-text"
              />
              <FeatureProduct
                title={rows.section9Title}
                description=""
                dataArr={rows.featuredProducts}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default FAQ3100DrawerSlides;
