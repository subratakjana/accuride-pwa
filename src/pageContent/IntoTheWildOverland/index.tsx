import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";
import { AiFillYoutube } from "react-icons/ai";
import Slider from "react-slick";
import { ReactSVG } from "react-svg";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./IntoTheWildOverland.module.scss";
import styled from "styled-components";
import { Styles } from "styled-components/dist/types";

const StyledSection = styled.section<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {customBgImage: Styles<{}>}>((props) => (
  {
    ...props.customBgImage
  }
))

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const StaticBannerBlueBGRightImage = dynamic(
  () => import("@Components/Markets/StaticBannerBlueBGRightImage"),
);
const CardCarousel = dynamic(() => import("@Components/Markets/CardCarousel"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const IntoTheWildOverland = ({ intoTheWildOverlands }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  // For Video Popup
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/company/${pathSegments[1]}`,
      name: pathSegments[1],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Into The Wild  Overland ",
      isClickable: false,
    },
  ];
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };
  const bgImage = {
    backgroundImage: `url(${intoTheWildOverlands[0].section6Image.url})`,
  };
  const provenSolBgImage = {
    backgroundImage: `url(${intoTheWildOverlands[0].section11StaticBanner.bannerImage.url})`,
  };
  const sunlBgImage = {
    backgroundImage: `url(${intoTheWildOverlands[0].section3BgImage.url})`,
  };
  const sliderSettings1 = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    rows: 1,
  };
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {intoTheWildOverlands
        ? intoTheWildOverlands.map((rows) => (
            <div key={`${rows.id}_intothewild`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-wildOverlands-banner"
              />
              <section
                className={`section-padding ${styles["acc-wldoverland-video-sec"]}`}
              >
                <Container>
                  <Row>
                    <Col xl={6}>
                      <h2 className="text-uppercase">
                        {rows.section1StaticBanner.bannerTitle}
                      </h2>
                      <HTMLContent
                        content={
                          rows.section1StaticBanner.bannerDescription.html
                        }
                      />
                    </Col>
                    <Col xl={6} className={styles["acc-wldoverland-video"]}>
                      <div className="position-relative">
                        <div
                          className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                          data-url={rows.section1StaticBanner.bannerVideoUrl}
                          onClick={handleShow}
                          onKeyDown={handleShow}
                          role="button"
                          tabIndex={0}
                        >
                          {" "}
                        </div>
                        <AiFillYoutube className="position-absolute" />
                        <NextImage
                          src={rows.section1StaticBanner.bannerImage.url}
                          alt=""
                          layout="intrinsic"
                          objectFit="contain"
                          objectPosition="center"
                          width={660}
                          height={371}
                          className="w-100"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <StaticBannerBlueBGRightImage
                data={rows.section2StaticBanner}
                winSize={windowSize}
                model="wildOverlands"
                customStyle="p-0 acc-gray-bg-left-image"
              />
              <StyledSection
                className={`styledbg ${styles["wildoverland-sun-rise-sec"]} position-relative`}
                customBgImage={sunlBgImage}
              >
                <Container fluid>
                  <Row>
                    <Col xl={6}>
                      <div
                        className={`${styles["acc-custom-white-content"]} px-0 px-xl-5`}
                      >
                        <HTMLContent content={rows.section3LeftDesc.html} />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <div
                        className={`${styles["acc-custom-white-content"]} px-0 px-xl-5`}
                      >
                        <HTMLContent content={rows.section3RightDesc.html} />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <Introduction
                dataTitle={rows.section4Title}
                dataDesc={rows.section4Description}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Row className="align-items-center">
                    <Col xl={6}>
                      <HTMLContent
                        content={
                          rows.section5StaticBanner.bannerDescription.html
                        }
                      />
                    </Col>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section5StaticBanner.bannerImage.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={636}
                        height={401}
                        className="w-100"
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              <StyledSection
                className={styles["wildover-vers-fet-sec"]}
                customBgImage={bgImage}
              >
                <Container>
                  <Row>
                    <Col xl={6}>
                      <div className={styles["acc-custom-white-content"]}>
                        <HTMLContent
                          content={rows.section6BgImageDescription.html}
                        />
                      </div>
                    </Col>
                    <Col xl={6}>
                      <Slider {...sliderSettings1}>
                        {rows.section6SlideImages
                          ? rows.section6SlideImages.map((items) => (
                              <div key={`${items.id}_slideimage`}>
                                <NextImage
                                  src={items.url}
                                  alt=""
                                  layout="intrinsic"
                                  objectFit="contain"
                                  objectPosition="center"
                                  width={660}
                                  height={421}
                                  className="w-100"
                                />
                              </div>
                            ))
                          : ""}
                      </Slider>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <section className="section-padding bg-dark">
                <Container fluid>
                  <Row className="align-items-center">
                    <Col xl={6}>
                      <NextImage
                        src={rows.section7StaticBanner.bannerImage.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={720}
                        height={421}
                      />
                    </Col>
                    <Col xl={6}>
                      <div className={styles["acc-custom-white-content"]}>
                        <HTMLContent
                          content={
                            rows.section7StaticBanner.bannerDescription.html
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section
                className={`section-padding ${styles["acc-wldoverland-video-sec"]} text-center ${styles["wild-over-qua-shift"]}`}
              >
                <Container>
                  <h2 className="m-0 pb-3 text-uppercase">
                    {rows.section8Title}
                  </h2>
                  <HTMLContent content={rows.section8Description.html} />
                  <div className={styles["acc-wldoverland-video"]}>
                    <div className="position-relative">
                      <div
                        className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                        data-url={rows.section8VideoUrl}
                        onClick={handleShow}
                        onKeyDown={handleShow}
                        role="button"
                        tabIndex={0}
                      >
                        {" "}
                      </div>
                      <AiFillYoutube className="position-absolute" />
                      <NextImage
                        src={rows.section8VideoImage.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={882}
                        height={496}
                        className="w-100"
                      />
                    </div>
                  </div>
                </Container>
              </section>
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col xl={6}>
                      <HTMLContent
                        content={
                          rows.section9StaticBanner.bannerDescription.html
                        }
                      />
                    </Col>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section9StaticBanner.bannerImage.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={627}
                        height={429}
                      />
                      <p className="m-0 text-center pt-2">
                        {rows.section9StaticBanner.bannerImage.assetTitle}
                      </p>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col xl={6} className="text-center">
                      <NextImage
                        src={rows.section10StaticBanner.bannerImage.url}
                        alt=""
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={380}
                        height={186}
                        className="d-inline-block"
                      />
                    </Col>
                    <Col xl={6}>
                      <h3 className="m-0 d-flex align-items-center">
                        <span className="pr-2">
                          {rows.section10StaticBanner.bannerTitle}
                        </span>
                        <ReactSVG
                          className="w-25"
                          src="/assets/images/accuride-logo-desktop.svg"
                        />
                      </h3>
                      <I18nLink
                        href={rows.section10StaticBanner.bannerButtonLink}
                      >
                        <Button
                          variant="primary"
                          className={`text-uppercase border border-medium ${
                            windowObj && windowSize.width < 991
                              ? "btn-block"
                              : ""
                          }`}
                        >
                          {rows.section10StaticBanner.bannerButtonLabel}
                        </Button>
                      </I18nLink>
                    </Col>
                  </Row>
                </Container>
              </section>
              <StyledSection
                className={`section-padding ${styles["wildoverland-proven-solution-sec"]} position-relative`}
                customBgImage={provenSolBgImage}
              >
                <Container fluid>
                  <Row>
                    <Col xl={{ span: 6, offset: 6 }}>
                      <h2 className="text-uppercase m-0 pb-3 text-white">
                        {rows.section11StaticBanner.bannerTitle}
                      </h2>
                      <div
                        className={`${styles["acc-custom-white-content"]} pb-4`}
                      >
                        <HTMLContent
                          content={
                            rows.section11StaticBanner.bannerDescription.html
                          }
                        />
                      </div>
                      <I18nLink
                        href={rows.section11StaticBanner.bannerButtonLink}
                      >
                        <Button
                          variant="primary"
                          className={`text-uppercase border border-medium ${
                            windowObj && windowSize.width < 991
                              ? "btn-block"
                              : ""
                          }`}
                        >
                          {rows.section11StaticBanner.bannerButtonLabel}
                        </Button>
                      </I18nLink>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <section
                className={`section-padding ${styles["acc-wldoverland-video-sec"]} text-center`}
              >
                <Container>
                  <Row>
                    <Col xl={6}>
                      <HTMLContent
                        content={
                          rows.section12StaticBanner.bannerDescription.html
                        }
                      />
                    </Col>
                    <Col xl={6} className={styles["acc-wldoverland-video"]}>
                      <div className="position-relative">
                        <div
                          className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                          data-url={rows.section12StaticBanner.bannerVideoUrl}
                          onClick={handleShow}
                          onKeyDown={handleShow}
                          role="button"
                          tabIndex={0}
                        >
                          {" "}
                        </div>
                        <AiFillYoutube className="position-absolute" />
                        <NextImage
                          src={rows.section12StaticBanner.bannerImage.url}
                          alt=""
                          layout="intrinsic"
                          objectFit="contain"
                          objectPosition="center"
                          width={660}
                          height={371}
                          className="w-100"
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding text-center bg-primary">
                <Container>
                  <h2 className="m-0 text-white pb-3 text-uppercase">
                    {rows.section13StaticBanner.bannerTitle}
                  </h2>
                  <I18nLink href={rows.section13StaticBanner.bannerButtonLink}>
                    <Button
                      variant="primary"
                      className={`text-uppercase border border-medium ${
                        windowObj && windowSize.width < 991 ? "btn-block" : ""
                      }`}
                    >
                      {rows.section13StaticBanner.bannerButtonLabel}
                    </Button>
                  </I18nLink>
                </Container>
              </section>
              <section className="section-padding">
                <Container>
                  <h3 className="m-0 pb-3 text-center">
                    {rows.section14Title}
                  </h3>
                  <Row>
                    <Col xl={6}>
                      <HTMLContent
                        content={rows.section14LeftDescription.html}
                      />
                    </Col>
                    <Col xl={6}>
                      <HTMLContent
                        content={rows.section14RightDescription.html}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding">
                <Container>
                  <div className="text-center">
                    <h2>{rows.section15Title}</h2>
                    <HTMLContent content={rows.section15Description.html} />
                  </div>
                  <CardCarousel
                    data={rows.section16InfoCards}
                    rows="1"
                    slidesShow="5"
                    slidesScroll="5"
                    customStyle="acc-blue-bg-card"
                  />
                </Container>
              </section>
              <section
                className={`section-padding ${styles["wildoverland-last-sec"]}`}
              >
                <Container fluid>
                  <Row>
                    <Col xl={6}>
                      <h2 className="text-uppercase m-0 text-center text-white">
                        {rows.section17StaticBanner.bannerTitle}
                      </h2>
                    </Col>
                    <Col xl={6}>
                      <div className="text-center">
                        <I18nLink
                          href={rows.section17StaticBanner.bannerButtonLink}
                        >
                          <Button
                            variant="primary"
                            className={`text-uppercase border border-medium ${
                              windowObj && windowSize.width < 991
                                ? "btn-block"
                                : ""
                            }`}
                          >
                            {rows.section17StaticBanner.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </div>
                    </Col>
                  </Row>
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
                    height="420"
                    src={videoUrl}
                    title="video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </Modal.Body>
              </Modal>
            </div>
          ))
        : ""}
    </>
  );
};

export default IntoTheWildOverland;
