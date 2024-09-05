import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const CompanyLanding = ({ companyList }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumb
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    { url: ``, name: "Company" },
  ];

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {companyList
        ? companyList.map((rows) => (
            <div key={`${rows.id}_companyLanding`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <section>
                <Container>
                  <Row className="justify-content-between">
                    {rows.section1ImageGallery
                      ? rows.section1ImageGallery.map((colms) => (
                          <Col
                            key={`${colms.id}_col`}
                            lg={6}
                            md={6}
                            className="pb-5"
                          >
                            <article className="text-center">
                              {colms.galleryImages ? (
                                <NextImage
                                  src={colms.galleryImages.url}
                                  alt={colms.imageTitle}
                                  layout="intrinsic"
                                  objectFit="contain"
                                  objectPosition="center"
                                  width={659}
                                  height={430}
                                />
                              ) : (
                                ""
                              )}
                              <h2 className="text-center m-0 pb-3 pt-3 text-uppercase">
                                {colms.imageTitle}
                              </h2>
                              <p className="text-center m-0 pb-3">
                                {colms.imageDescription}
                              </p>
                              <I18nLink href={colms.imageButtonLink}>
                                <Button className="text-center">
                                  {colms.imageButtonLabel}
                                </Button>
                              </I18nLink>
                            </article>
                          </Col>
                        ))
                      : ""}
                  </Row>
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default CompanyLanding;
