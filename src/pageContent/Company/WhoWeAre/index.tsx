import { useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Row, Col } from "react-bootstrap";
import NextImage from "next/legacy/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import styles from "./WhoWeAre.module.scss";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const CircleRightImage = dynamic(
  () => import("@Components/Company/CircleRightImage"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const WhoWeAre = ({ WhoWeAres }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
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
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {WhoWeAres
        ? WhoWeAres.map((rows) => (
            <div key={`wwa_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <StaticBannerBgImage
                data={rows.section1FixedSlider}
                model="healthcares"
                bgImage={rows.section1FixedSlider.bannerImage}
                sectionDesc={rows.section1FixedSlider.bannerDescription.text}
                winSize={windowSize}
                customStyle="left-text dark-bg bg-image-top"
              />
              <CircleRightImage
                data={rows.section2FixedSlider}
                winSize={windowSize}
                customStyle="left-image"
              />
              <StaticBannerBgImage
                data={rows.section3FixedSlider}
                model="healthcares"
                bgImage={rows.section3FixedSlider.bannerImage}
                sectionDesc={rows.section3FixedSlider.bannerDescription.text}
                winSize={windowSize}
                customStyle={`left-text dark-bg bg-image-top ${styles["acc-about-flag-image"]}`}
              />
              <CircleRightImage
                data={rows.section4FixedSlider}
                winSize={windowSize}
                customStyle="left-image"
              />
              <CircleRightImage
                data={rows.section5FixedSlider}
                winSize={windowSize}
                customStyle="right-image"
              />
              <StaticBannerBgImage
                data={rows.section6FixedSlider}
                model="healthcares"
                bgImage={rows.section6FixedSlider.bannerImage}
                sectionDesc={rows.section6FixedSlider.bannerDescription.text}
                winSize={windowSize}
                customStyle="left-text dark-bg"
              />
              <CircleRightImage
                data={rows.section7FixedSlider}
                winSize={windowSize}
                customStyle="left-image"
              />
              <CircleRightImage
                data={rows.section8FixedSlider}
                winSize={windowSize}
                customStyle="right-image"
              />
              <StaticBannerBgImage
                data={rows.section9FixedSlider}
                model="healthcares"
                bgImage={rows.section9FixedSlider.bannerImage}
                sectionDesc={rows.section9FixedSlider.bannerDescription.text}
                winSize={windowSize}
                customStyle="left-text dark-bg"
              />
              <CircleRightImage
                data={rows.section10FixedSlider}
                winSize={windowSize}
                customStyle="left-image"
              />
              <StaticBannerBgImage
                data={rows.section11FixedSlider}
                model="healthcares"
                bgImage={rows.section11FixedSlider.bannerImage}
                sectionDesc={rows.section11FixedSlider.bannerDescription.text}
                winSize={windowSize}
                customStyle="left-text dark-bg"
              />
              <CircleRightImage
                data={rows.section12FixedSlider}
                winSize={windowSize}
                customStyle="left-image"
              />
              <CircleRightImage
                data={rows.section13FixedSlider}
                winSize={windowSize}
                customStyle="right-image"
              />
              <StaticBannerBgImage
                data={rows.section14FixedSlider}
                model="healthcares"
                bgImage={rows.section14FixedSlider.bannerImage}
                sectionDesc={rows.section14FixedSlider.bannerDescription.text}
                winSize={windowSize}
                customStyle="left-text dark-bg"
              />
              <CircleRightImage
                data={rows.section15FixedSlider}
                winSize={windowSize}
                customStyle="left-image"
              />
              <CircleRightImage
                data={rows.section16FixedSlider}
                winSize={windowSize}
                customStyle="right-image"
              />
              <Introduction
                dataTitle={rows.section17Title}
                dataDesc={rows.section17Description.text}
                winSize={windowSize}
              />
              <section className="section-padding">
                <h1 className="text-center m-0 pb-5">{rows.section18Title}</h1>
                <div className="bg-light py-lg-4 py-0">
                  <Container>
                    <NextImage
                      src={rows.section18Image.url}
                      alt={rows.section18Title}
                      layout="intrinsic"
                      objectFit="contain"
                      objectPosition="center"
                      className="w-100"
                      width={1352}
                      height={555}
                    />
                  </Container>
                </div>
              </section>
              {rows.distributorsList
                ? rows.distributorsList.map((EachData) => (
                    <section
                      key={`dit_${EachData.id}_${EachData.name}`}
                      className="section-padding"
                    >
                      <Container>
                        <h2 className="m-0 pb-3">{EachData.name}</h2>
                        <Row>
                          {EachData.parentaddress
                            ? EachData.parentaddress.map((EachAddress) => (
                                <Col key={`ea_${EachAddress.id}`} lg={6}>
                                  <h4 className="m-0">{EachAddress.address}</h4>
                                  <p>{EachAddress.distributorName}</p>
                                  {EachAddress.address2.split("\n").map((i) => (
                                    <p key={`ead_${i}`} className="m-0">
                                      {i}
                                    </p>
                                  ))}
                                  <br />
                                  <p className="m-0">
                                    Phone:&nbsp;
                                    {EachAddress.phoneNumber}
                                    <br />
                                    Fax:&nbsp;
                                    {EachAddress.fax}
                                  </p>
                                  <br />
                                  <p className="m-0">
                                    Web:&nbsp;
                                    <a
                                      href={EachAddress.address && EachAddress.address.trim() == 'China' ? void(0) : EachAddress.web}
                                      target="BLANK"
                                      rel="noopener noreferrer"
                                    >
                                      {EachAddress.web}
                                    </a>
                                    <br />
                                    E-mail:&nbsp;
                                    <a href={`mailto:${EachAddress.email}`}>
                                      {EachAddress.email}
                                    </a>
                                  </p>
                                </Col>
                              ))
                            : ""}
                        </Row>
                      </Container>
                    </section>
                  ))
                : ""}
            </div>
          ))
        : ""}
    </>
  );
};

export default WhoWeAre;
