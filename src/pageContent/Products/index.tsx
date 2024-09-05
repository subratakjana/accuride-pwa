import { useState } from "react";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Row, Col, Button } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Products = ({ productsPageses }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const router = useRouter();
  const crumbsProducts = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/products`,
      name: "Products",
      isClickable: false,
    },
  ];
  return (
    <>
      {<BreadCrumbs crumbs={crumbsProducts} />}
      {productsPageses
        ? productsPageses.map((rows) => (
            <div key={`dsk_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <StaticBannerBgImage
                data={rows.section1StaticBanner}
                model="productsPages"
                bgImage={rows.section1StaticBanner.bannerImage}
                sectionDesc={rows.section1StaticBanner.bannerDescription.text}
                winSize={windowSize}
                customStyle="acc-lg-banner acc-left-align-content"
              />
              <section className="section-padding">
                <Container>
                  <Row>
                    {rows.section2Gallery
                      ? rows.section2Gallery.map((EachImage) => (
                          <Col
                            key={`imgs_${EachImage.id}`}
                            lg={6}
                            xl={3}
                            className="pb-4 pb-xl-0"
                          >
                            <article className="text-center d-flex flex-column h-100">
                              <h2 className="pt-3">{EachImage.imageTitle}</h2>
                              <p>{EachImage.imageDescription}</p>
                              <I18nLink
                                href={EachImage.imageButtonLink}
                                isMagentoRoute={1}
                              >
                                <Button
                                  variant="primary"
                                  className={`text-uppercase mt-auto mx-auto ${
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
              <section className="section-padding">
                <Container>
                  <Row>
                    {rows.section3ImageGallery
                      ? rows.section3ImageGallery.map((EachImage) => (
                          <Col
                            key={`imgs_${EachImage.id}`}
                            lg={6}
                            className="pb-4 pb-lg-0"
                          >
                            <article className="text-center">
                              <div className="acc-next-img acc-pdct-img-spl">
                                <NextImage
                                  src={EachImage.galleryImages.url}
                                  alt={EachImage.galleryImages.fileName}
                                  width={EachImage.galleryImages.width}
                                  height={EachImage.galleryImages.height}
                                  objectFit="contain"
                                />
                              </div>
                              <h2 className="pt-3">{EachImage.imageTitle}</h2>
                              <p>{EachImage.imageDescription}</p>
                              <I18nLink
                                href={EachImage.imageButtonLink}
                                isMagentoRoute={0}
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
              <section className="section-padding">
                <Container>
                  <Row>
                    {rows.section4ImageGallery
                      ? rows.section4ImageGallery.map((EachImage) => (
                          <Col
                            key={`imgs_${EachImage.id}`}
                            lg={6}
                            className="pb-4 pb-lg-0"
                          >
                            <article className="text-center">
                              <div className="acc-next-img acc-pdct-img-spl">
                                <NextImage
                                  src={EachImage.galleryImages.url}
                                  alt={EachImage.galleryImages.fileName}
                                  width={EachImage.galleryImages.width}
                                  height={EachImage.galleryImages.height}
                                  objectFit="contain"
                                />
                              </div>
                              <h2 className="pt-3">{EachImage.imageTitle}</h2>
                              <p>{EachImage.imageDescription}</p>
                              <I18nLink href={EachImage.imageButtonLink}>
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
              <StaticBannerBgImage
                data={rows.section5StaticBanner}
                model="productsPages"
                bgImage={rows.section5StaticBanner.bannerImage}
                sectionDesc={rows.section5StaticBanner.bannerDescription.text}
                winSize={windowSize}
                customStyle="acc-lg-banner acc-left-align-content"
              />
            </div>
          ))
        : null}
    </>
  );
};

export default Products;
