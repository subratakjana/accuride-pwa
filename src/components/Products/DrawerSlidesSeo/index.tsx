import { useContext, useState } from "react";
import { useQuery } from "graphql-hooks";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { drawerSlidesContent } from "@Graphql/queriesgraphcms/drawerSlides.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Button } from "react-bootstrap";
import SeoDetails from "@Components/Markets/SeoDetails";
import dynamic from "next/dynamic";

const Banner = dynamic(import("@Components/Markets/Banner"));
const Introduction = dynamic(import("@Components/Markets/Introduction"));
const StaticBannerBlueBGRightImage = dynamic(
  import("@Components/Seo/StaticBannerBlueBGRightImage"),
);
const QuestionWithAnswer = dynamic(
  import("@Components/Resources/QuestionWithAnswer"),
);
const Accordion = dynamic(import("@Components/Resources/Accordion"));
const StaticBannerBgImage = dynamic(
  import("@Components/Seo/StaticBannerBgImage"),
);
const ImageHoverCarousel = dynamic(
  import("@Components/Seo/ImageHoverCarousel"),
);

const DrawerSlidesSeo = () => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  let drawerSlideses = [];
  const { notify } = useContext(AuthContext);

  const {
    loading: DSLoading,
    error,
    data,
  } = useQuery(drawerSlidesContent.loc.source.body, {
    variables: { last: 0 },
    operationName: { clientName: "graphCms" },
  });

  if (DSLoading) return <LoadingIndicator />;
  if (data) {
    drawerSlideses = data.drawerSlidess;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }
  return (
    <>
      {drawerSlideses
        ? drawerSlideses.map((rows) => (
            <div key={`ds_${rows.id}`}>
              <SeoDetails pageSlug={rows.pages.pageSlug} />
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                field="banner"
                model="drawerSlidess"
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
              <section className="text-center section-padding">
                <Container>
                  <h3>{rows.section4title}</h3>
                  <p>{rows.section4description.text}</p>
                </Container>
              </section>
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
                  <h3 className="text-uppercase text-center m-0 pb-4">
                    {rows.section7title}
                  </h3>
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

export default DrawerSlidesSeo;
