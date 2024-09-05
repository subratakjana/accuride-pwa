import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));

const SupportLanding = ({ supportList }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Support",
      isClickable: false,
    },
  ];
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {supportList
        ? supportList.map((rows) => (
            <div key={`${rows.id}_supportLanding`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <section className="section-padding">
                <Container>
                  <Row className="justify-content-center">
                    {rows.imageGallery
                      ? rows.imageGallery.map((subpages) => (
                          <Col
                            xl={4}
                            lg={6}
                            className="pb-5 pb-xl-0"
                            key={`${subpages.id}_supportLanding`}
                          >
                            <article className="text-center">
                              {subpages.galleryImages ? (
                                <div className="embed-responsive embed-responsive-4by3">
                                  <NextImage
                                    src={subpages.galleryImages.url}
                                    alt={subpages.imageTitle}
                                    layout="fill"
                                    objectFit="contain"
                                    objectPosition="center"
                                  />
                                </div>
                              ) : (
                                ""
                              )}
                              <h2 className="text-center m-0 pb-3 pt-3">
                                {subpages.imageTitle}
                              </h2>
                              <p className="text-center m-0 pb-3">
                                {subpages.imageDescription}
                              </p>
                              <I18nLink href={subpages.imageButtonLink}>
                                <Button className="text-center">
                                  {subpages.imageButtonLabel}
                                </Button>
                              </I18nLink>
                            </article>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default SupportLanding;
