import { useState } from "react";
import { Container, CardColumns, Card } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import styles from "./Woodworking.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const FAQ = dynamic(() => import("@Components/Resources/Faq"));
const Accordion = dynamic(() => import("@Components/Resources/Accordion"));
const StaticBanner = dynamic(() => import("@Components/Markets/StaticBanner"));
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const ImageHoverCarousel = dynamic(
  () => import("@Components/Markets/ImageHoverCarousel"),
);
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const ProductSpecificationBanner = dynamic(
  () => import("@Components/Markets/ProductSpecificationBanner"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Woodworking = ({ woodworkings }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
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
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Woodworking",
      isClickable: false,
    },
  ];
  const sliderSettings1 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 1,
    centerMargin: "15px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true,
          arrows: false,
          rows: 1,
        },
      },
    ],
  };

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {woodworkings
        ? woodworkings.map((rows) => (
            <div key={`wood_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-right-caption-bg"
              />
              <IndustriesCarousel
                title={rows.section1Title}
                data={rows.section1ImageGallery}
                customSettings={sliderSettings1}
              />
              {/* Section2 Starts */}
              <section className="section-padding bg-light">
                <Container>
                  <h2>{rows.section2Title}</h2>
                  <HTMLContent
                    className="m-0"
                    content={rows.section2Description.html}
                  />
                  <Accordion data={rows.section2Accordion} />
                </Container>
              </section>
              {/* End */}
              <StaticBannerBgImage
                data={rows.section3StaticBanner1}
                model="archiWoodworkings"
                bgImage={rows.section3StaticBanner1.bannerImage}
                sectionDesc={rows.section3StaticBanner1.bannerDescription.text}
                winSize={windowSize}
                customStyle="acc-custom-title py-0"
              />
              {/* Section3-2 Start */}
              <section className="section-padding">
                <Container>
                  <ProductSpecificationBanner
                    data={rows.section3StaticBanner2}
                    winSize={windowSize}
                    customStyle="product-right"
                  />
                  <div className="pt-5 text-center">
                    <HTMLContent content={rows.section3Description.html} />
                  </div>
                </Container>
              </section>
              {/* End */}
              {/* Section4 Start */}
              <section className="section-padding">
                <Container>
                  <h2>{rows.section4Title}</h2>
                  <HTMLContent content={rows.section4Description.html} />
                  <FAQ data={rows.section4Accordion} />
                </Container>
              </section>
              {/* End */}
              {/* Section5 Start */}
              <section className="section-padding">
                <Container>
                  <h2>{rows.section5Title}</h2>
                  <FAQ data={rows.section5Accordion} />
                </Container>
              </section>
              {/* End */}
              {/* Section6 Start */}
              <section className="section-padding">
                <Container>
                  <h2>{rows.section6Title}</h2>
                  <FAQ data={rows.section6Accordion} />
                </Container>
              </section>
              {/* End */}
              {/* Section7 Start */}
              <section className="section-padding text-center">
                <Container>
                  <h2>{rows.section7Title}</h2>
                  <p>{rows.section7Description}</p>
                  <NextImage
                    src={rows.section7Image.url}
                    alt=""
                    layout="intrinsic"
                    objectFit="contain"
                    objectPosition="center"
                    width={1156}
                    height={132}
                    className="mx-auto"
                  />
                </Container>
              </section>
              {/* End */}
              <StaticBanner
                data={rows.section8StaticBanner}
                customStyle="bg-light acc-static-banner-dark-text acc-static-banner-left-image acc-cad-image"
                winSize={windowSize}
              />
              <ImageHoverCarousel
                title={rows.section9Title}
                description={rows.section9Description}
                title_1={rows.section9ImageGallery.imageTitle}
                hoverTitle={rows.section9ImageGallery.galleryTitle}
                hoverDescription={rows.section9ImageGallery.imageDescription}
                hoverDescriptionTitle={0}
                data={rows.section9ImageGallery}
                slidestoshow="3"
                slidestoscroll="3"
                winSize={windowSize}
              />
              {/* Section10 Starts */}
              <section className="section-padding">
                <Container>
                  <h2 className="text-center">{rows.section10Title}</h2>
                  <p className="text-center pb-5">
                    {rows.section10Description}
                  </p>
                  <Accordion data={rows.section10Accordion} />
                </Container>
              </section>
              {/* End */}
              {/* Section11 Starts */}
              <section
                className={`text-center section-padding ${styles["acc-custom-card-coll"]}`}
              >
                <Container fluid className="px-0">
                  <h2 className="text-center">{rows.section11Title}</h2>
                  <CardColumns>
                    {rows.section11ImageGallery
                      ? rows.section11ImageGallery.map((EachImage, index) => (
                          <div key={`${EachImage.id}_woodGalImage`}>
                            {index === 3 ? (
                              <Card className="rounded-0 p-0 p-lg-4 m-0 border-0 text-md-left text-center">
                                <h2 className="pt-lg-0 pt-3">
                                  {rows.section11ImageGalleryTitle}
                                </h2>
                                <h6 className="pb-3 pb-lg-4 text-dark m-0">
                                  {rows.section11ImageGalleryDesc}
                                </h6>
                                <div className="card-img-top rounded-0 w-100">
                                  <NextImage
                                    src={EachImage.galleryImages.url}
                                    alt=""
                                    layout="intrinsic"
                                    objectFit="contain"
                                    objectPosition="center"
                                    width={712}
                                    height={421}
                                  />
                                </div>
                              </Card>
                            ) : (
                              <Card className="rounded-0 p-0 m-0 border-0">
                                <div className="card-img-top rounded-0 w-100">
                                  <NextImage
                                    src={EachImage.galleryImages.url}
                                    alt=""
                                    layout="intrinsic"
                                    objectFit="cover"
                                    objectPosition="center"
                                    width={760}
                                    height={500}
                                  />
                                </div>
                              </Card>
                            )}
                          </div>
                        ))
                      : ""}
                  </CardColumns>
                </Container>
              </section>
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default Woodworking;
