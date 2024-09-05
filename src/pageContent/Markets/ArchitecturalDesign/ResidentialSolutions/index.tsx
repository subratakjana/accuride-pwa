import { useEffect, useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import NextImage from "next/legacy/image";
import styles from "./ResidentialSolutions.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const Tellus = dynamic(
  () => import("@Components/Markets/AccessControlSystems/Contact"),
);
const StaticBannerBlueBGRightVideo = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightVideo"),
);
const Accordion = dynamic(() => import("@Components/Resources/Accordion"));
const StaticBanner = dynamic(() => import("@Components/Markets/StaticBanner"));
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const ImageHoverCarousel = dynamic(
  () => import("@Components/Markets/ImageHoverCarousel"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ResidentialSolutions = ({ residentSolutionss }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  // breadcrumbs
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
      name: "Residential Solutions",
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

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />

      {residentSolutionss
        ? residentSolutionss.map((rows) => (
            <div key={`resi_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <StaticBannerBlueBGRightVideo
                data={rows.section1ImageVideo}
                winSize={windowSize}
              />
              <StaticBanner
                data={rows.section2ImageDesc}
                customStyle="bg-light acc-static-banner-dark-text acc-static-banner-left-image acc-cad-image"
                winSize={windowSize}
              />
              {/* Section3 Title and Desc Start */}
              <section className="section-padding pb-0 text-center">
                <Container>
                  <article>
                    <h2>{rows.section3Title}</h2>
                    <p className="m-0">{rows.section3Description}</p>
                  </article>
                </Container>
              </section>
              <ImageHoverCarousel
                description={rows.section3Description}
                title_1={rows.section3ImageGallery.imageTitle}
                hoverTitle={rows.section3ImageGallery.galleryTitle}
                hoverDescription={rows.section3ImageGallery.imageDescription}
                hoverDescriptionTitle={0}
                data={rows.section3ImageGallery}
                slidestoshow="3"
                slidestoscroll="3"
                winSize={windowSize}
              />
              {/* End */}
              {/* Section4 Title and Desc Start */}
              <section className="section-padding bg-light">
                <Container>
                  <h2 className="text-uppercase text-center">
                    {rows.section4Title}
                  </h2>
                  <p className="text-center m-0 pb-5">
                    {rows.section4Description}
                  </p>
                  <Accordion data={rows.section4Accordion} />
                </Container>
              </section>
              {/* End */}
              {/* Section5 Start */}
              <section className="section-padding text-center">
                <Container>
                  <h2>{rows.section5Title}</h2>
                  <p>{rows.section5Description}</p>
                  <NextImage
                    src={rows.section5Image.url}
                    alt=""
                    layout="intrinsic"
                    objectFit="contain"
                    objectPosition="center"
                    width={1112}
                    height={138}
                    className="mx-auto"
                  />
                </Container>
              </section>
              {/* End */}
              {/* Section6 Area Starts */}
              <section className="section-padding bg-light text-center">
                <Container>
                  <div className="mx-auto mb-4">
                    <NextImage
                      src={rows.section6Image.url}
                      alt=""
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={300}
                      height={112}
                    />
                  </div>
                  <Button
                    variant="primary"
                    data-url={rows.section6ButtonLink}
                    onClick={handleShow}
                    onKeyDown={handleShow}
                    className={`text-uppercase ml-lg-5 ${
                      windowObj && windowSize.width < 991 ? "btn-block" : ""
                    }`}
                  >
                    {rows.section6ButtonLabel}
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
              <StaticBannerBgImage
                data={rows.section7ImageDesc}
                model="residentSolutions"
                bgImage={rows.section7ImageDesc.bannerImage}
                sectionDesc={rows.section7ImageDesc.bannerDescription.text}
                winSize={windowSize}
              />
              <section
                className="acc-contact-information acc-general-contact"
                id="aias-contact-form"
              >
                <Tellus
                  formId="20"
                  description="<h2 class=' markets-heading markets-heading--large'>TALK TO US</h2><br />Have a question about a product? How about our process? Reach out to an Accuride residential specialist to get the answer you need."
                  pageName="ResidentialSolutions"  
                />
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default ResidentialSolutions;
