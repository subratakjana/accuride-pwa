import { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const TwoColumnSection = dynamic(
  () => import("@Components/Resources/TwoColumnSection"),
);
const Accordion = dynamic(() => import("@Components/Resources/Accordion"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const SlideGuides = ({ SlideGuide }) => {
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
      name: "Slide Guides",
    },
  ];

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  if (typeof window !== "undefined") {
    const urlContent = window.location.hash.substr(1);
    useEffect(() => {
      console.log("useEffect Called");
      const hasTagUrl = () => {
        const urlId = document.getElementById(urlContent);
        if (urlId) {
          const urlIdOffset =
            urlId.offsetTop - (windowObj && windowSize.width > 991 ? 64 : 48);
          window.scroll({
            top: urlIdOffset,
            left: 0,
            behavior: "smooth",
          });
        }
      };
      setTimeout(() => {
        hasTagUrl();
      }, 1000);
    }, [urlContent]);
  }

  return (
    <>
      {SlideGuide
        ? SlideGuide.map((rows) => (
            <div key={`${rows.id}_slideGuide`}>
              <BreadCrumbs crumbs={crumbs} />
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction
                dataobj={rows.pages}
                winSize={windowSize}
                customId="how-to-select-slide"
              />
              <TwoColumnSection
                winSize={windowSize}
                dataImage={rows.section1Image}
                dataTitle={rows.section1Title}
                dataDesc={rows.section1Description}
                customStyle="acc-slideguide-twocoll-sec"
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section2Accordion} />
                </Container>
              </section>
              <Introduction
                dataTitle={rows.section3Title}
                dataDesc={rows.section3Description}
                winSize={windowSize}
                customId="touch-release"
              />
              <section className="section-padding" id="touch-release">
                <Container>
                  <Accordion data={rows.section4Accordion} />
                </Container>
              </section>
              <Introduction
                dataTitle={rows.section5Title}
                dataDesc={rows.section5Description}
                winSize={windowSize}
                customId="slide-testing"
              />
              <section className="pb-5">
                <Container>
                  <NextImage
                    src={rows.section6BannerSlider.bannerImage.url}
                    alt={rows.section6BannerSlider.id}
                    layout="intrinsic"
                    objectFit="contain"
                    objectPosition="center"
                    className="w-100"
                    width={1352}
                    height={463}
                  />
                </Container>
              </section>
              <section className="section-padding">
                <Container>
                  <h1 className="text-uppercase m-0 pb-5 text-center">
                    {rows.section7Title}
                  </h1>
                  <Row>
                    <Col lg={6} className="acc-cms-content">
                      <HTMLContent
                        className="m-0"
                        content={rows.section7LeftDescription.html}
                      />
                    </Col>
                    <Col lg={6} className="acc-cms-content">
                      <HTMLContent
                        className="m-0"
                        content={rows.section7RightDescription.html}
                      />
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

export default SlideGuides;
