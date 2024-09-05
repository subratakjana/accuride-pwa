import { useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import Slider from "react-slick";
import { Container, Row, Col, Button } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ReactSVG } from "react-svg";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const ImageVideoSlider = dynamic(
  () => import("@Components/Markets/ImageVideoSlider"),
);
const VideoTopBanner = dynamic(() => import("@Components/VideoTopBanner"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const ContactBarSection = dynamic(() => import("@Components/ContactBar"));

const RollerBearingSlides = ({ rollerBearingsData }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  //breadcrumbs
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
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Roller Bearing Slides",
      isClickable: false,
    },
  ];
  const rollerbearingSliderSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: false,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: true,
          autoplay: true,
        },
      },
    ],
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {rollerBearingsData
        ? rollerBearingsData.map((rows) => (
            <div key={`ss_${rows.id}`}>
              <VideoTopBanner
                customStyle="acc-rolerbearing-main-banner"
                data={rows.banner}
                mobileData={rows.mobileBanner}
              />
              <section className="section-padding text-center acc-rollerbearing-intro-sec">
                <Container>
                  <h1>{rows.section1Title}</h1>
                  <p className="pb-5">{rows.section1SubTitle}</p>
                  <HTMLContent
                    className="m-0"
                    content={rows.section1Desc.html}
                  />
                </Container>
              </section>

              {/* contact bar section start */}
              <ContactBarSection content={rows.contactBar} />
              {/* contact bar section end */}

              <section className="section-padding acc-rollerbearing-section2">
                <Container>
                  <Slider {...rollerbearingSliderSettings}>
                    {rows.section2ImageDesc
                      ? rows.section2ImageDesc.map((eachDesc) => (
                          <div
                            key={`dess_${eachDesc.id}`}
                            className="text-center"
                          >
                            <NextImage
                              src={eachDesc.bannerImage.url}
                              alt={eachDesc.bannerImage.url}
                              objectPosition="center"
                              objectFit="contain"
                              className="mt-3"
                              width={300}
                              height={80}
                            />
                            <h2 className="pt-5">{eachDesc.bannerTitle}</h2>
                            <HTMLContent
                              className="m-0"
                              content={eachDesc.bannerDescription.html}
                            />
                            <I18nLink
                              href={eachDesc.bannerButtonLink}
                              isMagentoRoute={1}
                            >
                              <Button
                                variant="link"
                                className="border mt-2 border-primary font-size-lg px-5 py-3 text-uppercase"
                              >
                                {eachDesc.bannerButtonLabel}
                              </Button>
                            </I18nLink>
                          </div>
                        ))
                      : null}
                  </Slider>
                </Container>
              </section>
              <ImageVideoSlider ImageVideoSliders={rows.section3VideoSlider} />
              <section className="section-padding text-center">
                <Container>
                  <Row>
                    {rows.section4ImageGallery
                      ? rows.section4ImageGallery.map((imageGal) => (
                          <Col xl={3} xs={6} key={`imgss_${imageGal.id}`}>
                            <div className="acc-gif-hover-ani py-3 py-xl-0">
                              <div className="img acc-gif-image position-absolute top left">
                                <NextImage
                                  src={imageGal.galleryImages.url}
                                  alt={imageGal.galleryImages.fileName}
                                  width={314}
                                  height={177}
                                  objectFit="contain"
                                />
                              </div>
                              <div className="img">
                                <NextImage
                                  src={imageGal.galleryImages2.url}
                                  alt={imageGal.galleryImages2.fileName}
                                  width={314}
                                  height={177}
                                  objectFit="contain"
                                />
                              </div>
                              <p className="m-0 text-grey-medium pt-3">
                                {imageGal.imageTitle}
                              </p>
                            </div>
                          </Col>
                        ))
                      : null}
                  </Row>
                </Container>
              </section>
              <ImageVideoSlider ImageVideoSliders={rows.section5ImageSlider} />
              <ImageVideoSlider ImageVideoSliders={rows.section6VideoSlider} />
              <StaticBannerBlueBGRightImage
                customStyle="acc-bg-left-image acc-rollerbearing-bluebg"
                data={rows.section7ImageDesc[0]}
                winSize={windowSize}
              />
              <section className="section-padding text-center">
                <Container>
                  <h2>{rows.section8Title}</h2>
                  <HTMLContent
                    className="m-0"
                    content={rows.section8Desc.html}
                  />
                </Container>
              </section>
              <section className="section-padding mb-3 acc-exp-logo-sec text-center">
                <Container>
                  <Row>
                    {rows.section9ImageGallery
                      ? rows.section9ImageGallery.map((eachImage) => (
                          <Col md={3} xs={6} key={`imgd_${eachImage.id}`}>
                            <ReactSVG
                              src={eachImage.galleryImages.url}
                              className="img acc-exp-logo-img mx-auto mb-1"
                            />
                            <HTMLContent
                              className="m-0"
                              content={eachImage.imageDescription2.html}
                            />
                          </Col>
                        ))
                      : null}
                  </Row>
                </Container>
              </section>
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col xl={6}>
                      <Row>
                        <Col xl={3} xs={4}>
                          <div className="img acc-warranty-stamp">
                            <ReactSVG
                              src={rows.section10ImageDesc.bannerImage.url}
                            />
                          </div>
                        </Col>
                        <Col>
                          <h2>{rows.section10ImageDesc.bannerTitle}</h2>
                          <HTMLContent
                            className="m-0"
                            content={
                              rows.section10ImageDesc.bannerDescription.html
                            }
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col xl={6}>
                      {rows.section10RightsideImages
                        ? rows.section10RightsideImages.map((eachImage) => (
                            <div
                              className="pt-4 pt-xl-0 d-flex"
                              key={`ss_${eachImage.id}`}
                            >
                              <div
                                className={`img ${
                                  windowObj && windowSize.width > 1024
                                    ? "ml-auto"
                                    : "mx-auto"
                                }`}
                              >
                                <NextImage
                                  src={eachImage.url}
                                  alt={eachImage.fileName}
                                  width={216}
                                  height={97}
                                  objectFit="contain"
                                />
                              </div>
                            </div>
                          ))
                        : null}
                    </Col>
                  </Row>
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default RollerBearingSlides;
