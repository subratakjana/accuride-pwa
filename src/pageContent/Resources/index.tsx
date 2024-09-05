import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ResourcesLanding = ({ resourcesList }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumb
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: "Resources" },
  ];
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {resourcesList
        ? resourcesList.map((rows) => (
            <div key={`${rows.id}_resourcesLanding`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <section className="section-padding">
                <Container>
                  <Row className="justify-content-between">
                    <Col lg={6} md={6} className="pb-4 pb-md-0">
                      <article className="text-center">
                        {rows.slideGuidesImage ? (
                          <NextImage
                            src={rows.slideGuidesImage.url}
                            alt={rows.slideGuidesTitle}
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            className="pt-0 mt-0"
                            width={649}
                            height={430}
                          />
                        ) : (
                          ""
                        )}
                        <h2 className="text-center m-0 pb-3 pt-3 text-uppercase">
                          {rows.slideGuidesTitle}
                        </h2>
                        <p className="text-center m-0 pb-3">
                          {rows.slideGuidesDescription}
                        </p>
                        <I18nLink href={rows.slideGuidesButtonLink}>
                          <Button className="text-center">
                            {rows.slideGuidesButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                    <Col lg={6} md={6}>
                      <article className="text-center">
                        {rows.videosImage ? (
                          <NextImage
                            src={rows.videosImage.url}
                            alt={rows.videosTitle}
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            className="pt-0 mt-0"
                            width={649}
                            height={430}
                          />
                        ) : (
                          ""
                        )}
                        <h2 className="text-center m-0 pb-3 pt-3 text-uppercase">
                          {rows.videosTitle}
                        </h2>
                        <p className="text-center m-0 pb-3">
                          {rows.videosDescription}
                        </p>
                        <I18nLink href={rows.videosButtonLink}>
                          <Button className="text-center">
                            {rows.videosButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
              <StaticBannerBgImage
                data={rows.section2BannerSlider}
                model="resourceses"
                bgImage={rows.section2BannerSlider.bannerImage}
                sectionDesc={rows.section2BannerSlider.bannerDescription}
                winSize={windowSize}
              />
              <section className="section-padding">
                <Container>
                  <Row className="justify-content-between">
                    <Col lg={6} md={6} className="pb-4 pb-md-0">
                      <article className="text-center">
                        {rows.faqImage ? (
                          <NextImage
                            src={rows.faqImage.url}
                            alt={rows.faqTitle}
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            className="pt-0 mt-0"
                            width={649}
                            height={430}
                          />
                        ) : (
                          ""
                        )}
                        <h2 className="text-center m-0 pb-3 pt-3 text-uppercase">
                          {rows.faqTitle}
                        </h2>
                        <p className="text-center m-0 pb-3">
                          {rows.faqDescription}
                        </p>
                        <I18nLink href={rows.faqButtonLink}>
                          <Button className="text-text-uppercase">
                            {rows.faqButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                    <Col lg={6} md={6}>
                      <article className="text-center">
                        {rows.catalogRequestImage ? (
                          <NextImage
                            src={rows.catalogRequestImage.url}
                            alt={rows.catalogRequestTitle}
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            className="pt-0 mt-0"
                            width={649}
                            height={430}
                          />
                        ) : (
                          ""
                        )}
                        <h2 className="text-center m-0 pb-3 pt-3 text-uppercase">
                          {rows.catalogRequestTitle}
                        </h2>
                        <p className="text-center m-0 pb-3">
                          {rows.catalogRequestDescription}
                        </p>
                        <I18nLink href={rows.catalogRequestButtonLink}>
                          <Button className="text-uppercase">
                            {rows.catalogRequestButtonLabel}
                          </Button>
                        </I18nLink>
                      </article>
                    </Col>
                  </Row>
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default ResourcesLanding;
