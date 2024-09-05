import { useState } from "react";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Button } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Banner = dynamic(import("@Components/Markets/Banner"));
const Introduction = dynamic(import("@Components/Markets/Introduction"));
const StaticBannerBlueBGRightImage = dynamic(
  import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const Accordion = dynamic(import("@Components/Resources/Accordion"));
const QuestionWithAnswer = dynamic(
  import("@Components/Resources/QuestionWithAnswer"),
);
const StaticBannerBgImage = dynamic(
  import("@Components/Markets/StaticBannerBgImage"),
);
const ImageHoverCarousel = dynamic(
  import("@Components/Markets/ImageHoverCarousel"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const DrawerSlides = ({ drawerSlideses }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  let crumbsCategory = [];
  let removeSpeCharact = router.asPath.split("/");
  if (removeSpeCharact[removeSpeCharact.length - 1].includes("?")) {
    crumbsCategory = [
      { url: `/${router.query.zone_lang}/`, name: "Home" },
      { url: `/${router.query.zone_lang}/products`, name: pathSegments[1] },
      {
        url: `/${router.query.zone_lang}/products/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("?")[0],
      },
    ];
  }
  if (removeSpeCharact[removeSpeCharact.length - 1].includes("#")) {
    crumbsCategory = [
      { url: `/${router.query.zone_lang}/`, name: "Home" },
      { url: `/${router.query.zone_lang}/products`, name: pathSegments[1] },
      {
        url: `/${router.query.zone_lang}/products/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("#")[0],
      },
    ];
  }
  if (
    removeSpeCharact[removeSpeCharact.length - 1].includes("?") === false &&
    removeSpeCharact[removeSpeCharact.length - 1].includes("#") === false
  ) {
    crumbsCategory = [
      { url: `/${router.query.zone_lang}/`, name: "Home" },
      { url: `/${router.query.zone_lang}/products`, name: pathSegments[1] },
      {
        url: `/${router.query.zone_lang}/products/${pathSegments[2]}`,
        name: pathSegments[2],
      },
    ];
  }
  return (
    <>
      <BreadCrumbs crumbs={crumbsCategory} />
      {drawerSlideses
        ? drawerSlideses.map((rows) => (
            <div key={`ds_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <ImageHoverCarousel
                title={rows.section1imagegallery.galleryTitle}
                title_1={rows.section1imagegallery.imageTitle}
                hoverTitle={rows.section1imagegallery.galleryTitle}
                hoverDescription={rows.section1imagegallery.imageDescription}
                hoverDescriptionTitle={1}
                data={rows.section1imagegallery}
                slidestoshow="4"
                slidestoscroll="4"
                winSize={windowSize}
              />
              <StaticBannerBlueBGRightImage
                data={rows.section2staticbanner}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section3accordion} />
                </Container>
              </section>
              <Introduction
                dataTitle={rows.section4title}
                dataDesc={rows.section4description.text}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section5accordion} />
                </Container>
              </section>
              <StaticBannerBgImage
                data={rows.section6staticbanner}
                model="drawerSlidess"
                bgImage={rows.section6staticbanner.bannerImage}
                sectionDesc=""
                winSize={windowSize}
                customStyle="acc-drawer-slide-section-banner-bgimage"
              />
              <section className="section-padding">
                <Container>
                  <h2 className="text-uppercase text-center m-0 pb-4">
                    {rows.section7title}
                  </h2>
                  <QuestionWithAnswer data={rows.section7accordion} />
                  <I18nLink href={rows.section7buttonlink}>
                    <Button
                      variant="primary"
                      className={`text-uppercase mt-3 ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section7buttontext}
                    </Button>
                  </I18nLink>
                </Container>
              </section>
              <StaticBannerBgImage
                data={rows.section8staticbanner}
                model="drawerSlidess"
                bgImage={rows.section8staticbanner.bannerImage}
                sectionDesc={rows.section8staticbanner.bannerDescription.text}
                winSize={windowSize}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default DrawerSlides;
