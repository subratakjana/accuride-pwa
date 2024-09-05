import React, { useState, useEffect } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Button, Row, Col } from "react-bootstrap";
import Image from "next/legacy/image";
import { I18nLink } from "@Components/Utilities";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import dynamic from "next/dynamic";
import { ReactSVG } from "react-svg";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const HomeBanner = ({ data }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    data &&
    data.length && (
      <section
        className={`acc-homepage-banner ${
          data.length > 1 ? "acc-homepage-banner-line" : ""
        }`}
      >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className={`acc-home-banner-slider`}
        >
          {data &&
            data.map((item) => (
              <SwiperSlide key={`banner_${item.id}`}>
                <div
                  className={`acc-image-${
                    item.buttonPosition
                      ? item.buttonPosition.replace("_", "-")
                      : "default"
                  }`}
                >
                  <div className="acc-home-banner-image-wrap">
                    {windowObj && windowSize.width > 767 ? (
                      item.bannerDesktopImage &&
                      item.bannerLink !== null &&
                      item.bannerLink !== "" ? (
                        <I18nLink href={item.bannerLink} isMagentoRoute={0}>
                          <a>
                            <Image
                              src={item.bannerDesktopImage.url}
                              alt={item.bannerDesktopImage.assetTitle}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                              priority
                              className="acc-home-banner-image"
                            />
                          </a>
                        </I18nLink>
                      ) : (
                        <Image
                          src={item.bannerDesktopImage.url}
                          alt={item.bannerDesktopImage.assetTitle}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          priority
                          className="acc-home-banner-image"
                        />
                      )
                    ) : (
                      item.bannerMobileImage &&
                      (item.bannerLink !== null ? (
                        <I18nLink href={item.bannerLink} isMagentoRoute={0}>
                          <a>
                            <Image
                              src={item.bannerMobileImage.url}
                              alt={item.bannerMobileImage.assetTitle}
                              layout="fill"
                              objectFit="cover"
                              objectPosition="center"
                              priority
                              className="acc-home-banner-image"
                            />
                          </a>
                        </I18nLink>
                      ) : (
                        <Image
                          src={item.bannerMobileImage.url}
                          alt={item.bannerMobileImage.assetTitle}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          priority
                          className="acc-home-banner-image"
                        />
                      ))
                    )}
                  </div>
                  {item.bannerStyle === "style_01" && (
                    <Container className="acc-homepage-banner-caption  acc-homepage-banner-caption-1">
                      <HTMLContent
                        className="m-0"
                        content={item.bannerCaption.html}
                      />
                    </Container>
                  )}
                  {item.bannerStyle === "style_02" && item.buttonText && (
                    <Container
                      fluid
                      className={`acc-homepage-banner-btn acc-homepage-banner-caption-2 acc-${
                        item.buttonPosition
                          ? item.buttonPosition.replace("_", "-")
                          : ""
                      }`}
                    >
                      <I18nLink href={item.buttonLink} isMagentoRoute={0}>
                        <Button
                          variant="clear"
                          size={
                            windowObj && windowSize.width > 1200
                              ? "lg"
                              : windowObj && windowSize.width > 991
                              ? ""
                              : "sm"
                          }
                          className={`btn-${
                            item.buttonStyle
                              ? item.buttonStyle.replace("_", "-").toLowerCase()
                              : ""
                          }`}
                        >
                          {item.buttonText}
                        </Button>
                      </I18nLink>
                    </Container>
                  )}
                  {item.bannerStyle === "style_03" && (
                    <Container className="acc-homepage-banner-caption acc-homepage-banner-caption-3">
                      <Row>
                        {item.logo && item.logo.fileName && (
                          <Col xs={12} lg={6} className="mb-2 mb-lg-0">
                            <div className="acc-banner-caption-logo">
                              {item.logo.fileName ? (
                                item.logo.fileName.split(".").pop() ===
                                "svg" ? (
                                  <ReactSVG
                                    src={item.logo.url}
                                    width={783}
                                    height={113}
                                  />
                                ) : (
                                  <Image
                                    src={item.logo.url}
                                    alt={item.logo.fileName}
                                    width={783}
                                    height={113}
                                  />
                                )
                              ) : (
                                <Image
                                  src={item.logo.url}
                                  alt={item.logo.fileName}
                                  width={783}
                                  height={113}
                                />
                              )}
                            </div>
                          </Col>
                        )}
                        <Col xs={12} lg={6}>
                          <HTMLContent content={item.bannerCaption.html} />
                          {item.buttonText && (
                            <I18nLink href={item.buttonLink} isMagentoRoute={0}>
                              <Button
                                variant="clear"
                                size={
                                  windowObj && windowSize.width > 1200
                                    ? "lg"
                                    : windowObj && windowSize.width > 991
                                    ? ""
                                    : "sm"
                                }
                                className={`btn-${
                                  item.buttonStyle
                                    ? item.buttonStyle
                                        .replace("_", "-")
                                        .toLowerCase()
                                    : ""
                                }`}
                              >
                                {item.buttonText}
                              </Button>
                            </I18nLink>
                          )}
                        </Col>
                      </Row>
                    </Container>
                  )}
                  {item.bannerStyle === "style_04" && (
                    <Container className="acc-homepage-banner-caption acc-homepage-banner-caption-4">
                      <Row>
                        {item.logo && item.logo.fileName && (
                          <Col xs={7} sm={6} md={5}>
                            <div className="acc-banner-caption-logo mb-2 mb-md-3 mb-lg-4">
                              {item.logo.fileName ? (
                                item.logo.fileName.split(".").pop() ===
                                "svg" ? (
                                  <ReactSVG
                                    src={item.logo.url}
                                    width={456}
                                    className="mw-100"
                                  />
                                ) : (
                                  <Image
                                    src={item.logo.url}
                                    alt={item.logo.fileName}
                                    width="456"
                                    height="48"
                                  />
                                )
                              ) : (
                                <Image
                                  src={item.logo.url}
                                  alt={item.logo.fileName}
                                  width="456"
                                  height="48"
                                />
                              )}
                            </div>
                            <HTMLContent content={item.bannerCaption.html} />
                            {item.buttonText && (
                              <I18nLink
                                href={item.buttonLink}
                                isMagentoRoute={0}
                              >
                                <Button
                                  variant="clear"
                                  size={
                                    windowObj && windowSize.width > 1200
                                      ? "lg"
                                      : windowObj && windowSize.width > 991
                                      ? ""
                                      : "sm"
                                  }
                                  className={`btn-${
                                    item.buttonStyle
                                      ? item.buttonStyle
                                          .replace("_", "-")
                                          .toLowerCase()
                                      : ""
                                  }`}
                                >
                                  {item.buttonText}
                                </Button>
                              </I18nLink>
                            )}
                          </Col>
                        )}
                      </Row>
                    </Container>
                  )}
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>
    )
  );
};

export default HomeBanner;
