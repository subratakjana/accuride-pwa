import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const FAQ = dynamic(() => import("@Components/Resources/Faq"));
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const FaqLists = ({ faqListdata }) => {
  const windowSize = useWindowDimensions();
  const [windowObj] = useState(false);
  //breadcrumb
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
      name: "FAQs",
    },
  ];

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {faqListdata
        ? faqListdata.map((rows) => (
            <div key={`faq_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-small-banner"
              />
              <Introduction dataobj={rows.pages} winSize={windowSize} />
              <section className="section-padding">
                <Container>
                  <Row>
                    <Col lg={4}>
                      <div className="text-center bg-light p-4 acc-box shadow-2 mb-3 mb-lg-0">
                        <I18nLink
                          href={rows.section1Block1Link}
                          isMagentoRoute={0}
                        >
                          <a>
                            <HTMLContent
                              className="m-0"
                              content={rows.section1Block1.html}
                            />
                          </a>
                        </I18nLink>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="text-center bg-light p-4 acc-box shadow-2 mb-3 mb-lg-0">
                        <I18nLink
                          href={rows.section1Block2Link}
                          isMagentoRoute={0}
                        >
                          <a>
                            <HTMLContent
                              className="m-0"
                              content={rows.section1Block2.html}
                            />
                          </a>
                        </I18nLink>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div className="text-center bg-light p-4 acc-box shadow-2">
                        <I18nLink
                          href={rows.section1Block3Link}
                          isMagentoRoute={0}
                        >
                          <a>
                            <HTMLContent
                              className="m-0"
                              content={rows.section1Block3.html}
                            />
                          </a>
                        </I18nLink>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </section>
              <section key={`${rows.id}_QA`} className="section-padding">
                <Container>
                  <FAQ data={rows.questionAnswerAccordion} />
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default FaqLists;
