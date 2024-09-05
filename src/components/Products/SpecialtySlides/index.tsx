import { useState } from "react";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Row, Col, Button, CardDeck, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const SpecialtySlides = ({ specialtySlideses }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  let crumbsCategory = [];
  const removeSpeCharact = router.asPath.split("/");
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

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      <BreadCrumbs crumbs={crumbsCategory} />
      {specialtySlideses
        ? specialtySlideses.map((rows) => (
            <div key={`ss_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <section className="section-padding pt-0">
                <Container>
                  <Row>
                    {rows.section1imagegallery
                      ? rows.section1imagegallery.map((EachImage) => (
                          <Col
                            key={`imgs_${EachImage.id}`}
                            lg={6}
                            className="pb-4 pb-lg-0"
                          >
                            <article className="text-center">
                              <NextImage
                                src={EachImage.galleryImages.url}
                                alt=""
                                objectFit="contain"
                                objectPosition="center"
                                layout="intrinsic"
                                width={635}
                                height={414}
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                  "/assets/images/icons/imageLoader.svg",
                                )}`}
                                className="img"
                              />
                              <h2 className="pt-3">{EachImage.imageTitle}</h2>
                              <p>{EachImage.imageDescription}</p>
                              <I18nLink
                                href={EachImage.imageButtonLink}
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
                                  {EachImage.imageButtonLabel}
                                </Button>
                              </I18nLink>
                            </article>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Container>
              </section>
              <section className="section-padding acc-spec-slide">
                <Container>
                  <Row>
                    {rows.section2imagegallery
                      ? rows.section2imagegallery.map((EachImage) => (
                          <Col
                            key={`imgs_${EachImage.id}`}
                            lg={6}
                            xl={3}
                            className="pb-4 pb-xl-0"
                          >
                            <article className="text-center">
                              <NextImage
                                src={EachImage.galleryImages.url}
                                alt=""
                                objectFit="contain"
                                objectPosition="center"
                                layout="intrinsic"
                                width={301}
                                height={226}
                                placeholder="blur"
                                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                  "/assets/images/icons/imageLoader.svg",
                                )}`}
                                className="img"
                              />
                              <h3 className="pt-3">{EachImage.imageTitle}</h3>
                              <p>{EachImage.imageDescription}</p>
                              <I18nLink
                                href={EachImage.imageButtonLink}
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
                                  {EachImage.imageButtonLabel}
                                </Button>
                              </I18nLink>
                            </article>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Container>
              </section>
              <section className="section-padding acc-spec-slides-cat-area">
                <Container>
                  <CardDeck>
                    {rows.section3imagegallery
                      ? rows.section3imagegallery.map((EachImage) => (
                          <Card
                            key={`imgs_${EachImage.id}`}
                            className="pb-4 pb-lg-0 border-0 text-center"
                          >
                            <NextImage
                              src={EachImage.galleryImages.url}
                              alt=""
                              objectFit="contain"
                              objectPosition="center"
                              layout="intrinsic"
                              width={429}
                              height={280}
                              placeholder="blur"
                              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                "/assets/images/icons/imageLoader.svg",
                              )}`}
                              className="img card-img-top rounded-0"
                            />
                            <Card.Body className="p-0">
                              <h2 className="pt-3 card-title">
                                {EachImage.imageTitle}
                              </h2>
                              <p className="card-text">
                                {EachImage.imageDescription}
                              </p>
                            </Card.Body>
                            <Card.Footer>
                              <I18nLink
                                href={EachImage.imageButtonLink}
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
                                  {EachImage.imageButtonLabel}
                                </Button>
                              </I18nLink>
                            </Card.Footer>
                          </Card>
                        ))
                      : ""}
                  </CardDeck>
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default SpecialtySlides;
