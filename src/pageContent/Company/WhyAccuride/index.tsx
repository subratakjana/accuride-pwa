import { useState, useEffect } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import styles from "./WhyAccuride.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const Accordion = dynamic(() => import("@Components/Resources/Accordion"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const WhyAccuride = ({ WhyAccurides }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      { url: ``, name: pathSegments[1] },
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
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
        name: pathSegments[2],
      },
    ];
  }
  useEffect(() => {
    const hasTagUrl = () => {
      const urlContent = window.location.hash.substr(1);
      const urlId = document.getElementById(urlContent);
      if (urlId) {
        const urlIdOffset = urlId.offsetTop;
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
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {WhyAccurides
        ? WhyAccurides.map((rows) => (
            <div key={`wa_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <StaticBannerBlueBGRightImage
                data={rows.section1FixedSlider}
                winSize={windowSize}
              />
              <Introduction
                dataTitle={rows.section2Title}
                dataDesc={rows.section2Description.html}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section3Accordion} />
                </Container>
              </section>
              <StaticBannerBlueBGRightImage
                data={rows.section4FixedSlider}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section5Accordion} />
                </Container>
              </section>
              <Introduction
                dataTitle={rows.section6Heading}
                winSize={windowSize}
              />
              <StaticBannerBlueBGRightImage
                data={rows.section6FixedSlider}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section7Accordion} />
                </Container>
              </section>
              <StaticBannerBlueBGRightImage
                data={rows.section8FixedSlider}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section9Accordion} />
                </Container>
              </section>
              <Introduction
                dataTitle={rows.section10Title}
                dataDesc={rows.section10Description}
                winSize={windowSize}
              />
              {rows.section10ImageGallery
                ? rows.section10ImageGallery.map((EachImg) => (
                    <div className={styles["partnerImageOuter"]}>
                      <NextImage
                        src={EachImg.url}
                        alt=""
                        objectFit="contain"
                        objectPosition="center"
                        layout="fill"
                        className="mx-auto"
                        key={`eimg_${EachImg.id}`}
                      />
                    </div>
                  ))
                : ""}

              <StaticBannerBlueBGRightImage
                data={rows.section11FixedSlider}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section12Accordion} />
                </Container>
              </section>
              <StaticBannerBlueBGRightImage
                data={rows.section13FixedSlider}
                winSize={windowSize}
              />
              <section className="section-padding" id="rohs-compliance">
                <Container>
                  <Accordion data={rows.section14Accordion} />
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default WhyAccuride;
