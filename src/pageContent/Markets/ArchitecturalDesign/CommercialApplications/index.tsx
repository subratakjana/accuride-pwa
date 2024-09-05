import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import styles from "./CommercialApplications.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const IndustriesCarousel = dynamic(
  () => import("@Components/Markets/IndustriesCarousel"),
);
const StaticBannerBlueBGRightVideo = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightVideo"),
);
const Accordion = dynamic(() => import("@Components/Resources/Accordion"));
const StaticBanner = dynamic(() => import("@Components/Markets/StaticBanner"));
const FAQ = dynamic(() => import("@Components/Resources/Faq"));
const FeatureProduct = dynamic(
  () => import("@Components/Markets/FeatureProduct"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const CommercialApplications = ({ commApplications }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
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
      name: "Commercial Applications",
      isClickable: false,
    },
  ];
  const handleShow = (e) => {
    const pdfPath = e.target.getAttribute("data-url");
    if (pdfPath !== "" || pdfPath !== "#") {
      setShow(true);
      setPdfUrl(pdfPath);
    }
  };
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const sliderSettings1 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
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

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {commApplications
        ? commApplications.map((rows) => (
            <div key={`comm_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-right-caption-bg"
              />
              <Introduction
                dataobj={rows.pages}
                winSize={windowSize}
                customId="inspired"
              />
              <IndustriesCarousel
                data={rows.section1ImageGallery}
                customSettings={sliderSettings1}
              />
              <StaticBannerBlueBGRightVideo
                data={rows.section2ImageDesc}
                winSize={windowSize}
                customId="limitless-section"
              />
              {/* Section3 Title and Desc Start */}
              <section className="section-padding text-center pt-0" id="proven">
                <Container>
                  <article>
                    <h2>{rows.section3Title}</h2>
                    <p>{rows.section3Description}</p>
                  </article>
                </Container>
              </section>
              {/* End */}
              <section className="section-padding">
                <Container>
                  <Accordion data={rows.section4Accordian} />
                </Container>
              </section>
              {/* Section5 Area Starts */}
              <section className="section-padding bg-light text-center">
                <Container>
                  <span className="mx-auto mb-4 d-block">
                    <NextImage
                      src={rows.sec5Img.url}
                      alt=""
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={300}
                      height={112}
                    />
                  </span>
                  <Button
                    data-url={rows.section5ButtonLink}
                    onClick={handleShow}
                    onKeyDown={handleShow}
                    className={`text-uppercase ${
                      windowObj && windowSize.width < 576 ? "btn-block" : ""
                    }`}
                  >
                    {rows.section5ButtonLabel}
                  </Button>
                </Container>
              </section>
              <Modal
                size="md"
                show={show}
                onHide={handleClose}
                className="acc-custom-modal"
              >
                <Modal.Body className="text-center">
                  <iframe
                    width="100%"
                    height="600"
                    src={pdfUrl}
                    title="video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Modal.Body>
              </Modal>
              {/* End */}
              {/* Section6 Title and Desc Start */}
              <section className="section-padding text-center" id="specified">
                <Container>
                  <article>
                    <h2>{rows.section6Title}</h2>
                    <p className="pb-5">{rows.section6Description}</p>
                    <NextImage
                      src={rows.sec6Img.url}
                      alt=""
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={1200}
                      height={390}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        "/assets/images/icons/imageLoader.svg",
                      )}`}
                      className="mx-auto"
                    />
                  </article>
                </Container>
              </section>
              {/* End */}
              {/* Section7 Title and Desc Start */}
              <section className="section-padding">
                <Container>
                  <article className="pb-5">
                    <h2 className="text-uppercase">{rows.section7Title}</h2>
                    <p className="m-0">{rows.section7Description}</p>
                  </article>
                  <Row className={`no-gutters ${styles["acc-step-section"]}`}>
                    <Col sm={4}>
                      <div
                        className={`d-flex py-md-3 justify-content-center align-items-center ${styles["acc-step"]} ${styles["acc-step-one"]}`}
                      >
                        <div>
                          <div>
                            <h1 className="m-0 pr-1">{rows.step1Number}</h1>
                            <h3 className="text-white">
                              {rows.step1Title}
                              <span className="d-block">
                                {rows.step1SubTitle}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div
                        className={`d-flex py-md-3 justify-content-center align-items-center ${styles["acc-step"]} ${styles["acc-step-two"]}`}
                      >
                        <div>
                          <div>
                            <h1 className="m-0 pr-1">{rows.step2Number}</h1>
                            <h3 className="text-white">
                              {rows.step2Title}
                              <span className="d-block">
                                {rows.step2SubTitle}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm={4}>
                      <div
                        className={`d-flex py-md-3 justify-content-center align-items-center ${styles["acc-step"]} ${styles["acc-step-three"]}`}
                      >
                        <div>
                          <div>
                            <h1 className="m-0 pr-1">{rows.step3Number}</h1>
                            <h3 className="text-white">
                              {rows.step3Title}
                              <span className="d-block">
                                {rows.step3SubTitle}
                              </span>
                            </h3>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* End */}
              <section className="section-padding">
                <Container>
                  <h2 className="pb-3">{rows.section8Title}</h2>
                  <FAQ data={rows.section8Accordian} />
                </Container>
              </section>
              <StaticBanner
                data={rows.section9ImageDesc}
                customStyle="bg-primary"
                winSize={windowSize}
              />
              {/* Section10 Title and Desc Start */}
              <section className="section-padding text-center" id="certified">
                <Container>
                  <article>
                    <h2>{rows.section10Title}</h2>
                    <p className="m-0">{rows.section10Description}</p>
                    <span className="mx-auto d-block">
                      <NextImage
                        src={rows.sec10Img.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={1156}
                        height={132}
                      />
                    </span>
                  </article>
                </Container>
              </section>
              {/* End */}
              <StaticBanner
                data={rows.section11ImageDesc}
                customStyle="bg-light acc-static-banner-dark-text acc-static-banner-left-image acc-cad-image"
                winSize={windowSize}
              />
              <FeatureProduct
                title={rows.section12Title}
                description={rows.section12Description}
                dataArr={rows.featuredProducts}
              />
            </div>
          ))
        : ""}
    </>
  );
};

export default CommercialApplications;
