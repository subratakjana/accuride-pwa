import { useContext, useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Button, Row, Col } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./constructionRailwayMachinery.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const ImageGalleryWithPopup = dynamic(
  () => import("@Components/Markets/ImageGalleryWithPopup"),
);
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const TabSection = dynamic(() => import("@Components/Markets/TabSection"));
const ImageSlider = dynamic(() => import("@Components/Markets/ImageSlider"));
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const BgImageTabSection = dynamic(
  () => import("@Components/Markets/BgImageTabSection"),
);
const ProductSpecificationBanner = dynamic(
  () => import("@Components/Markets/ProductSpecificationBanner"),
);
const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ConstructionRailwayMachinery = ({ constructionRailwayMachinerys }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
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

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {constructionRailwayMachinerys
        ? constructionRailwayMachinerys.map((rows) => (
            <div key={`crm_${rows.id}`}>
              {/* Banner Component */}
              <div className={styles["acc-market-inner-pages-banner-wrapper"]}>
                <Banner
                  windowSize={windowSize}
                  windowObj={windowObj}
                  bannerList={rows.banner}
                />
              </div>
              {/* End */}
              {/* Page Introduction */}
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              {/* End */}
              {/* Section1 Component */}
              <ImageGalleryWithPopup data={rows.section1ImageGallery} />
              {/* Section1 Component End */}
              {/* Section2 Component */}
              <TabSection
                tabList={rows.section2TabArea}
                customStyle="acc-market-constrail-tab"
              />
              {/* Section2 Component End */}
              {/* Section3 Component */}
              <section className="section-padding bg-light">
                <Container>
                  <Row className="align-items-center">
                    <Col lg={6}>
                      <div className="embed-responsive embed-responsive-4by3">
                        <NextImage
                          src={rows.section3ImageDesc.bannerImage.url}
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          className="embed-responsive-item"
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <article className="text-center">
                        <h1 className="m-0 pb-3 pt-3 pt-lg-0">
                          {rows.section3ImageDesc.bannerTitle}
                        </h1>
                        <HTMLContent
                          class="m-0 pb-3"
                          content={
                            rows.section3ImageDesc.bannerDescription.html
                          }
                        />
                        <I18nLink
                          href={rows.section3ImageDesc.bannerButtonLink}
                          isMagentoRoute={1}
                        >
                          <Button
                            variant="primary"
                            className={`text-uppercase ${
                              windowObj && windowSize.width < 991
                                ? "btn-block"
                                : ""
                            }`}
                          >
                            {rows.section3ImageDesc.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* Section3 Component End */}
              {/* Section4 Component */}
              <ImageSlider ImageSliders={rows.section4Slider} />
              {/* Section4 Component End */}
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
              <BgImageTabSection
                tabList={rows.section5TabSection}
                customStyle="pb-4"
              />
              <section className="pb-5">
                <Container>
                  <div className="text-center">
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
                  </div>
                </Container>
              </section>
              {/* Section5 Component End */}
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
                    {rows.section6Images.map((EachImgDesc) => (
                      <NextImage
                        src={EachImgDesc.url}
                        alt="Placeholder"
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={320}
                        height={104}
                        className="mx-auto"
                        key={`crm_${EachImgDesc.id}`}
                      />
                    ))}
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
                customStyle={`left-text ${styles["acc-constr-rail-bannerbgimage"]}`}
              />
              {/* Section7 Component End */}
              {/* Section8 Component */}
              <section className="section-padding">
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section8ImageDesc}
                    winSize={windowSize}
                  />
                </Container>
              </section>
              {/* Section8 Component End */}
            </div>
          ))
        : ""}
    </>
  );
};
export default ConstructionRailwayMachinery;
