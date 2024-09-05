import {DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";
import { AiFillYoutube } from "react-icons/ai";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./MissionCritical.module.scss";
import styled from "styled-components";
import { Styles } from "styled-components/dist/types";

const StyledSection = styled.section<DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {customBgImage: Styles<{}>}>((props) => (
  {
    ...props.customBgImage
  }
))

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const Banner = dynamic(() => import("@Components/Markets/Banner"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const MissionCritical = ({ missionCriticalss }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const section3BgImage = {
    backgroundImage: `url(${missionCriticalss[0].section3ImageDesc.bannerImage.url})`,
  };
  const section9BgImage = {
    backgroundImage: `url(${missionCriticalss[0].section9ImageDesc.bannerImage.url})`,
  };
  const section11BgImage = {
    backgroundImage: `url(${missionCriticalss[0].section11BgImage.url})`,
  };
  const section15BgImage = {
    backgroundImage: `url(${missionCriticalss[0].section15ImageDesc.bannerImage.url})`,
  };
  // For the video popup
  const handleClose = () => setShowVideo(false);
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: pathSegments[2],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Mission Critical",
      isClickable: false,
    },
  ];
  const handleShow = (e) => {
    setShowVideo(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };
  return (
    <>
      {missionCriticalss
        ? missionCriticalss.map((rows) => (
            <div
              key={`miss_${rows.id}`}
              className={styles["acc-mission-critical-page"]}
            >
              <BreadCrumbs crumbs={crumbs} />
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-mission-critical-banner"
              />
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <h1 className="m-0 text-center text-uppercase pb-5">
                    {rows.section1ImageDesc.bannerTitle}
                  </h1>
                  <Row>
                    <Col xl={6}>
                      <HTMLContent
                        className="m-0"
                        content={rows.section1ImageDesc.bannerDescription.html}
                      />
                    </Col>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section1ImageDesc.bannerImage.url}
                        alt={rows.section1ImageDesc.bannerImage.fileName}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={464}
                        height={421}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <Row>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section2ImageDesc.bannerImage.url}
                        alt={rows.section2ImageDesc.bannerImage.fileName}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={568}
                        height={474}
                      />
                    </Col>
                    <Col xl={6}>
                      <article className="pt-3 pt-xl-0">
                        <h3 className="m-0 pb-3">
                          {rows.section2ImageDesc.bannerTitle}
                        </h3>
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section2ImageDesc.bannerDescription.html
                          }
                        />
                        <I18nLink
                          href={rows.section2ImageDesc.bannerButtonLink}
                        >
                          <Button className="text-uppercase mt-3">
                            {rows.section2ImageDesc.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              <StyledSection
                className={`section-padding text-center text-xl-left ${styles["acc-mission-engine-sec-bg"]}`}
                customBgImage={section3BgImage}
              >
                <Container fluid>
                  <Row>
                    <Col xl={6}>
                      <article className="text-white">
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section3ImageDesc.bannerDescription.html
                          }
                        />
                      </article>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <section className="section-padding text-center bg-light">
                <Container>
                  <h3>{rows.section4Title}</h3>
                  <I18nLink href={rows.section4ButtonLink}>
                    <Button className="text-uppercase mt-3">
                      {rows.section4ButtonLabel}
                    </Button>
                  </I18nLink>
                </Container>
              </section>
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <Row>
                    <Col xl={6}>
                      <article>
                        <h3 className="m-0 pb-3">
                          {rows.section5ImageDesc.bannerTitle}
                        </h3>
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section5ImageDesc.bannerDescription.html
                          }
                        />
                        <I18nLink
                          href={rows.section5ImageDesc.bannerButtonLink}
                        >
                          <Button className="text-uppercase mt-3 mb-3 mb-xl-0">
                            {rows.section5ImageDesc.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section5ImageDesc.bannerImage.url}
                        alt={rows.section5ImageDesc.bannerImage.fileName}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={659}
                        height={547}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <Row>
                    {rows.section6ImageDesc
                      ? rows.section6ImageDesc.map((sectionData) => (
                          <Col xl={6} key={`sec_${sectionData.id}`}>
                            <article>
                              <HTMLContent
                                className="m-0"
                                content={sectionData.bannerDescription.html}
                              />
                              <NextImage
                                src={sectionData.bannerImage.url}
                                alt={sectionData.bannerImage.fileName}
                                layout="intrinsic"
                                objectFit="contain"
                                objectPosition="center"
                                width={610}
                                height={286}
                              />
                            </article>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Container>
              </section>
              <section className="section-padding text-center text-xl-left">
                <Container className="section-padding">
                  <Row className="justify-content-between align-items-center no-gutters">
                    <Col xl={6}>
                      <article
                        className={`${styles["acc-mission-yellow-bg-right"]} p-4`}
                      >
                        <h2>{rows.section7ImageDesc.bannerTitle}</h2>
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section7ImageDesc.bannerDescription.html
                          }
                        />
                      </article>
                    </Col>
                    <Col xl={6}>
                      <article className="text-center">
                        <div
                          className={`${styles["acc-mission-video-image-holder"]} position-relative`}
                        >
                          <div
                            className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                            data-url={rows.section7ImageDesc.bannerVideoUrl}
                            onClick={handleShow}
                            onKeyDown={handleShow}
                            role="button"
                            tabIndex={0}
                          >
                            {" "}
                          </div>
                          <div className="embed-responsive embed-responsive-16by9">
                            <NextImage
                              src={rows.section7ImageDesc.bannerImage.url}
                              alt={rows.section7ImageDesc.bannerImage.fileName}
                              layout="fill"
                              objectFit="contain"
                              objectPosition="center"
                              className="mx-auto"
                            />
                          </div>
                          <AiFillYoutube
                            className={`text-white position-absolute ${styles["acc-video-play-icon"]}`}
                          />
                        </div>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <Row>
                    <Col xl={6}>
                      <article>
                        <h3 className="m-0 pb-3">
                          {rows.section8ImageDesc.bannerTitle}
                        </h3>
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section8ImageDesc.bannerDescription.html
                          }
                        />
                        <I18nLink
                          href={rows.section8ImageDesc.bannerButtonLink}
                        >
                          <Button className="text-uppercase mt-3 mb-3 mb-xl-0">
                            {rows.section8ImageDesc.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section8ImageDesc.bannerImage.url}
                        alt={rows.section8ImageDesc.bannerImage.fileName}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={565}
                        height={377}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              <StyledSection
                className={`section-padding text-center text-xl-left ${styles["acc-mission-custom-bg"]}`}
                customBgImage={section9BgImage}
              >
                <Container>
                  <Row>
                    <Col xl={6}>
                      <article className="py-5">
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section9ImageDesc.bannerDescription.html
                          }
                        />
                      </article>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <Row>
                    <Col xl={6}>
                      <HTMLContent
                        className="m-0"
                        content={rows.section10LeftDesc.html}
                      />
                    </Col>
                    <Col xl={6}>
                      <HTMLContent
                        className="m-0"
                        content={rows.section10RightDesc.html}
                      />
                    </Col>
                  </Row>
                </Container>
              </section>
              <StyledSection
                className="section-padding bg-position-center text-center text-xl-left"
                customBgImage={section11BgImage}
              >
                <Container>
                  <Row>
                    <Col xl={6}>
                      <article>
                        <h3 className="m-0 pb-3">
                          {rows.section11ImageDesc.bannerTitle}
                        </h3>
                        <I18nLink
                          href={rows.section11ImageDesc.bannerButtonLink}
                        >
                          <Button className="text-uppercase mt-3 mb-3 mb-xl-0">
                            {rows.section11ImageDesc.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                    <Col xl={6}>
                      <NextImage
                        src={rows.section11ImageDesc.bannerImage.url}
                        alt={rows.section11ImageDesc.bannerImage.fileName}
                        layout="intrinsic"
                        objectFit="contain"
                        objectPosition="center"
                        width={567}
                        height={377}
                      />
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <section className="section-padding text-center text-xl-left">
                <Container className="section-padding">
                  <Row className="justify-content-between align-items-center no-gutters">
                    <Col xl={6}>
                      <article className="text-center">
                        <div
                          className={`${styles["acc-mission-video-image-holder"]} position-relative`}
                        >
                          <div
                            className="position-absolute top left w-100 h-100 acc-video-onclick-wrap"
                            data-url={rows.section12ImageDesc.bannerVideoUrl}
                            onClick={handleShow}
                            onKeyDown={handleShow}
                            role="button"
                            tabIndex={0}
                          >
                            {" "}
                          </div>
                          <div className="embed-responsive embed-responsive-4by3">
                            <NextImage
                              src={rows.section12ImageDesc.bannerImage.url}
                              alt={rows.section12ImageDesc.bannerImage.fileName}
                              layout="fill"
                              objectFit="contain"
                              objectPosition="center"
                              className="mx-auto"
                            />
                          </div>
                          <AiFillYoutube
                            className={`text-white position-absolute ${styles["acc-video-play-icon"]}`}
                          />
                        </div>
                      </article>
                    </Col>
                    <Col xl={6}>
                      <article
                        className={`p-4 ${styles["acc-mission-yellow-bg"]}`}
                      >
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section12ImageDesc.bannerDescription.html
                          }
                        />
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section className="section-padding text-center">
                <Container>
                  <article>
                    <div className="w-75 mx-auto">
                      <h2 className="text-uppercase">{rows.section13Title}</h2>
                      <HTMLContent content={rows.section13Description.html} />
                    </div>
                    <NextImage
                      src={rows.section13Image.url}
                      alt={rows.section13Image.fileName}
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      width={1352}
                      height={555}
                    />
                  </article>
                </Container>
              </section>
              <section className="section-padding text-center text-xl-left">
                <Container>
                  <h3>{rows.section14Title}</h3>
                  <Row>
                    <Col xl={6}>
                      <HTMLContent content={rows.section14LeftDesc.html} />
                    </Col>
                    <Col xl={6}>
                      <HTMLContent content={rows.section14RightDesc.html} />
                    </Col>
                  </Row>
                </Container>
              </section>
              <StyledSection
                className={`section-padding bg-position-center text-center text-xl-left ${styles["acc-mission-ship-bg"]}`}
                customBgImage={section15BgImage}
              >
                <Container fluid>
                  <Row>
                    <Col xl={{ span: 6, offset: 6 }}>
                      <article className="py-4">
                        <HTMLContent
                          className="m-0"
                          content={
                            rows.section15ImageDesc.bannerDescription.html
                          }
                        />
                        <I18nLink
                          href={rows.section15ImageDesc.bannerButtonLink}
                        >
                          <Button className="text-uppercase mt-3">
                            {rows.section15ImageDesc.bannerButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </StyledSection>
              <section className="section-padding bg-primary text-center text-xl-left">
                <Container>
                  <Row>
                    <Col xl="9">
                      <article className="text-white font-size-lg">
                        <HTMLContent
                          className="m-0"
                          content={rows.section16Desc.html}
                        />
                      </article>
                    </Col>
                    <Col xl={3}>
                      <I18nLink href={rows.section16ButtonLink}>
                        <Button className="text-uppercase mt-3 border font-size-md">
                          {rows.section16ButtonLabel}
                        </Button>
                      </I18nLink>
                    </Col>
                  </Row>
                </Container>
              </section>
              {/* Modal use for all video in this page */}
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
              {/* End */}
            </div>
          ))
        : ""}
    </>
  );
};

export default MissionCritical;
