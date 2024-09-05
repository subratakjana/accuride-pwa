import React, { useState, useEffect } from "react";
import NextImage from "next/legacy/image";
import { Button, Container, Row, Col } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import styles from "./ProAdvantage.module.scss";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ProAdvantage = ({ proAdvantages }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const [bannerText1, setBannerText1] = useState("");
  const [bannerText2, setBannerText2] = useState("");
  const [bannerText3, setBannerText3] = useState("");
  const [bannerText4, setBannerText4] = useState("");
  const router = useRouter();
  //breadcrumb
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
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
      },
    ];
  }

  useEffect(() => {
    if (!proAdvantages && !proAdvantages[0].banner) return;
    setBannerText1(
      proAdvantages[0].banner.bannerText1.text.split(" ", 3).join(" "),
    );
    setBannerText2(
      proAdvantages[0].banner.bannerText1.text.split(" ").splice(-2).join(" "),
    );
    setBannerText3(
      proAdvantages[0].banner.bannerText2.text.split(" ", 3).join(" "),
    );
    setBannerText4(
      proAdvantages[0].banner.bannerText2.text.split(" ").splice(3).join(" "),
    );
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {proAdvantages
        ? proAdvantages.map((rows) => (
            <div key={`pro_${rows.id}`}>
              <h2 className="text-center py-3 py-md-3 py-xl-4 py-xxl-5 font-weight-light m-0">
                {rows.title}
              </h2>
              {/* Banner Top Section Start */}
              <div
                className={`${styles["acc-proadvantage-banner"]} position-relative`}
              >
                <div className={styles["acc-proadvantage-banner-img-wrap"]}>
                  <figure className={`${styles["unset-img"]} m-0`}>
                    {windowObj && windowSize.width > 1025 ? (
                      <NextImage
                        src={rows.banner.bannerImage[0].url}
                        key={`ban_${rows.banner.bannerImage[0].url}`}
                        alt={rows.banner.bannerText1.text}
                        layout="fill"
                        className={styles["custom-img"]}
                      />
                    ) : (
                      <NextImage
                        src={rows.banner.bannerImageForMobile.url}
                        key={`ban_${rows.banner.bannerImage[0].url}`}
                        alt={rows.banner.bannerText1.text}
                        layout="fill"
                        className={styles["custom-img"]}
                      />
                    )}
                  </figure>
                </div>

                <div
                  className={`${
                    styles["acc-proadvantage-banner-content"]
                  } d-flex justify-content-center ${
                    windowObj && windowSize.width > 1025
                      ? "w-50 position-absolute align-items-center"
                      : "w-100 pt-3 pb-2"
                  }`}
                >
                  <Col xs={12} xl={10} className="text-center">
                    <NextImage
                      priority
                      objectFit="cover"
                      src={rows.banner.subImage1.url}
                      alt={rows.banner.bannerText1.text}
                      width={465}
                      height={120}
                    />
                    <h1
                      className={`text-center mt-4 mb-3 font-weight-900 pt-1 ${styles["acc-proadvantage-banner-heading"]}`}
                    >
                      <span className="d-block">
                        {bannerText1 && bannerText1}
                      </span>
                      <span className="d-block text-secondary">
                        {bannerText2 && bannerText2}
                      </span>
                    </h1>

                    {(bannerText3 || bannerText4) && (
                      <h2 className="text-center font-weight-light px-2 px-md-4 mb-0">
                        <span className="d-block">
                          {bannerText3 && bannerText3}
                        </span>
                        <span className="d-block">
                          {bannerText4 && bannerText4}
                        </span>
                      </h2>
                    )}
                  </Col>
                </div>
              </div>
              {/* Banner Top Section End */}
              {/* Button section Starts */}
              <section
                className={`text-center py-5 ${styles["acc-proadvantage-main-bttn-sec"]}`}
              >
                <Container>
                  <Row>
                    <Col
                      xs={12}
                      className={`d-flex flex-column flex-md-row justify-content-center align-items-center`}
                    >
                      <I18nLink href={rows.section1LeftButton.buttonLink}>
                        <Button variant="primary" className="text-uppercase">
                          {rows.section1LeftButton.buttonText}
                        </Button>
                      </I18nLink>
                      <I18nLink href={rows.section1RightButton.buttonLink}>
                        <Button variant="secondary" className="text-uppercase">
                          {rows.section1RightButton.buttonText}
                        </Button>
                      </I18nLink>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* End */}
              {/* Image grid Section Strat */}
              <section
                className={`${styles["acc-proadvantage-image-grid"]} pb-5`}
              >
                <Container>
                  <h2
                    className={`text-center font-weight-bold mb-3 mb-md-4 font-family-secondary ${styles["acc-proadvantage-title"]}`}
                  >
                    {rows.section2Title}
                  </h2>
                  <Row>
                    {rows.section2ImageGrid
                      ? rows.section2ImageGrid.map((item) => (
                          <Col
                            key={`accgrid_${item.id}`}
                            lg={4}
                            className="pb-4"
                          >
                            <article className="text-center">
                              <div
                                className={
                                  styles["acc-proadvantage-image-grid-img"]
                                }
                              >
                                <figure
                                  className={`${styles["unset-img"]} m-0`}
                                >
                                  <NextImage
                                    src={item.image.url}
                                    alt={item.image.id}
                                    layout="fill"
                                    className={styles["custom-img"]}
                                  />
                                </figure>
                              </div>
                              <h3 className="mb-0 mt-3 font-weight-700">
                                {item.title}
                              </h3>
                              <p>{item.title2}</p>
                            </article>
                          </Col>
                        ))
                      : null}
                  </Row>
                </Container>
              </section>
              {/* End */}

              {/* Exclusive Benifits Section Start */}
              <section
                className={`${
                  styles["acc-exclusive-benifits"]
                } position-relative ${
                  windowObj && windowSize.width > 1025
                    ? "d-flex align-items-center"
                    : "w-100"
                }`}
              >
                {windowObj &&
                  windowSize.width > 1025 &&
                  rows.section3Banner.bannerImage && (
                    <div className="acc-background-image">
                      <NextImage
                        src={rows.section3Banner.bannerImage[0].url}
                        alt="Background Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  )}
                <Container>
                  <Row>
                    <Col
                      xs={12}
                      className={`d-flex ${
                        windowObj && windowSize.width > 1025
                          ? "justify-content-between align-items-center"
                          : "w-100 flex-column align-items-center pb-5"
                      }`}
                    >
                      <div
                        className={`${
                          windowObj && windowSize.width <= 1025 ? "pb-3" : ""
                        }`}
                      >
                        <NextImage
                          priority
                          objectFit="cover"
                          src={rows.section3Banner.subImage1.url}
                          alt={rows.section3Banner.bannerText1.text}
                          width={500}
                          height={136}
                        />
                      </div>

                      <div
                        className={`${
                          styles["acc-exclusive-benifits-con"]
                        } text-center ${
                          windowObj && windowSize.width <= 1025 ? "py-3" : ""
                        }`}
                      >
                        <h3 className="text-secondary font-weight-900">
                          {rows.section3Banner.bannerText1.text}
                        </h3>
                        <I18nLink
                          href={rows.section3Banner.bannerButton[0].buttonLink}
                        >
                          <Button variant="primary" className="text-uppercase">
                            {rows.section3Banner.bannerButton[0].buttonText}
                          </Button>
                        </I18nLink>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default ProAdvantage;
