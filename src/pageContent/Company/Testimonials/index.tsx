import { useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";
import { AiFillYoutube } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./Testimonials.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const BgImageSlider = dynamic(
  () => import("@Components/Markets/BgImageSlider"),
);
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Testimonials = ({ Testimonialss }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
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
  // For the video popup
  const handleClose = () => setShowVideo(false);
  const handleShow = (e) => {
    setShowVideo(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {Testimonialss
        ? Testimonialss.map((rows) => (
            <div key={`tm_${rows.id}`}>
              {/* <SeoDetails pageSlug={rows.pages.pageSlug} /> */}
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-testi-banner"
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <section className="section-padding">
                <Container>
                  <Row className="justify-content-between">
                    {rows.scetion1MultiVideo
                      ? rows.scetion1MultiVideo.map((testimonialsvideos) => (
                          <Col
                            key={`tms_${testimonialsvideos.id}`}
                            lg={6}
                            md={6}
                            className="pb-4 pb-md-0"
                          >
                            <article className="text-center">
                              <div
                                className={`${styles["acc-testi-video-image-holder"]} position-relative`}
                              >
                                <div
                                  className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                                  data-url={testimonialsvideos.videoLink}
                                  onClick={handleShow}
                                  onKeyDown={handleShow}
                                  role="button"
                                  tabIndex={0}
                                >
                                  {" "}
                                </div>
                                <NextImage
                                  src={testimonialsvideos.image.url}
                                  alt={testimonialsvideos.image.fileName}
                                  layout="intrinsic"
                                  objectFit="unset"
                                  objectPosition="center"
                                  width={660}
                                  height={400}
                                />
                                <AiFillYoutube
                                  className={`text-white position-absolute ${styles["acc-video-play-icon"]}`}
                                />
                              </div>
                              <h2 className="m-0 pt-3">
                                {testimonialsvideos.title}
                              </h2>
                              <HTMLContent
                                className="m-0"
                                content={testimonialsvideos.description.html}
                              />
                            </article>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Container>
              </section>
              <BgImageSlider
                data={rows.section2BannerSlider}
                model="testimonialses"
                bgImage=""
                sectionDesc=""
                winSize={windowSize}
                customStyle="acc-testi-page-bgimage-slider"
              />
              <section className="section-padding">
                {rows.section3MultiVideo
                  ? rows.section3MultiVideo.map((videocolumn, index) => (
                      <Container
                        key={`vdo_${videocolumn.id}`}
                        className="section-padding"
                      >
                        <Row
                          className="justify-content-between"
                          data_id={(index + 1) % 2}
                        >
                          <Col
                            lg={5}
                            md={6}
                            className={
                              (index + 1) % 2 === 1
                                ? "pb-4 pb-md-0 order-first align-self-center"
                                : "pb-4 pb-md-0 order-last align-self-center"
                            }
                          >
                            <article className="text-center">
                              <h2>{videocolumn.title}</h2>
                              <HTMLContent
                                className="m-0"
                                content={videocolumn.description.html}
                              />
                              {videocolumn.buttonLink !== null &&
                              videocolumn.buttonLabel !== null ? (
                                <I18nLink href={videocolumn.buttonLink}>
                                  <Button className="text-uppercase">
                                    {videocolumn.buttonLabel}
                                  </Button>
                                </I18nLink>
                              ) : (
                                ""
                              )}
                            </article>
                          </Col>
                          <Col
                            lg={7}
                            md={6}
                            className={
                              (index + 1) % 2 === 1
                                ? "pb-4 pb-md-0 order-last"
                                : "pb-4 pb-md-0 order-first"
                            }
                          >
                            <article className="text-center">
                              <div
                                className={`${styles["acc-testi-video-image-holder"]} position-relative`}
                              >
                                <div
                                  className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                                  data-url={videocolumn.videoLink}
                                  onClick={handleShow}
                                  onKeyDown={handleShow}
                                  role="button"
                                  tabIndex={0}
                                >
                                  {" "}
                                </div>
                                <NextImage
                                  src={videocolumn.image.url}
                                  alt={videocolumn.image.fileName}
                                  layout="intrinsic"
                                  objectFit="unset"
                                  objectPosition="center"
                                  width={775}
                                  height={400}
                                />
                                <AiFillYoutube
                                  className={`text-white position-absolute ${styles["acc-video-play-icon"]}`}
                                />
                              </div>
                            </article>
                          </Col>
                        </Row>
                      </Container>
                    ))
                  : ""}
                <Modal
                  size="md"
                  show={showVideo}
                  onHide={handleClose}
                  className="acc-custom-modal"
                >
                  <Modal.Body className="text-center">
                    <iframe
                      width="100%"
                      height="420"
                      src={videoUrl}
                      title="Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Modal.Body>
                </Modal>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default Testimonials;
