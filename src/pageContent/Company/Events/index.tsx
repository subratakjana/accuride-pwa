import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Events = ({ eventss }) => {
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
  const CompareDate = (getDate) => {
    if (getDate) {
      const todayDate = new Date();
      const givendate = new Date(getDate);
      if (Date.parse(givendate) > Date.parse(todayDate)) {
        return 1;
      }
      return 0;
    }
    return 0;
  };
  const CheckFutureEvents = (rows) => {
    const allRows = rows.eventsImageBlock;
    if (allRows) {
      for (let i = 0; i < allRows.length; ) {
        const checkDate = CompareDate(allRows[i].endDate);
        if (checkDate === 1) {
          return 1;
        }
        i += 1;
      }
    }
    return 0;
  };

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {eventss
        ? eventss.map((rows) => (
            <div key={`eve_${rows.id}`}>
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-small-banner"
              />
              {CheckFutureEvents(rows) === 1 ? (
                <section className="section-padding">
                  {rows.eventsImageBlock
                    ? rows.eventsImageBlock.map((events) => (
                        <Container key={`cnt_${events.id}`}>
                          {events.endDate
                            ? [
                                CompareDate(events.endDate) === 1 ? (
                                  <Row
                                    key={`cnt_${events.id}`}
                                    className="section-padding justify-content-between"
                                  >
                                    <Col
                                      lg={4}
                                      className="pb-3 pb-lg-0 text-center text-lg-left"
                                    >
                                      <div className="embed-responsive embed-responsive-16by9">
                                        <NextImage
                                          src={events.image.url}
                                          alt={events.imageTitle}
                                          objectFit="contain"
                                          objectPosition="center"
                                          layout="fill"
                                          className="mx-auto"
                                          placeholder="blur"
                                          blurDataURL={`data:image/svg+xml;base64,${toBase64(
                                            "/assets/images/icons/imageLoader.svg",
                                          )}`}
                                        />
                                      </div>
                                    </Col>
                                    <Col
                                      lg={8}
                                      className="text-center text-lg-left"
                                    >
                                      <h2>{events.imageTitle}</h2>
                                      {events.location ? (
                                        <HTMLContent
                                          className="m-0"
                                          content={events.location.html}
                                        />
                                      ) : (
                                        ""
                                      )}
                                    </Col>
                                  </Row>
                                ) : (
                                  ""
                                ),
                              ]
                            : ""}
                        </Container>
                      ))
                    : ""}
                </section>
              ) : (
                ""
              )}
              <section className="section-padding">
                <h1 className="text-center">PRIOR EVENTS</h1>
                {rows.eventsImageBlock
                  ? rows.eventsImageBlock.map((events) => (
                      <Container
                        key={`evt_${events.id}`}
                        className="bg-light mb-3 mb-lg-5"
                      >
                        {events.endDate ? (
                          [
                            CompareDate(events.endDate) === 0 ? (
                              <Row
                                key={`evt_${events.id}`}
                                className="section-padding justify-content-between"
                              >
                                <Col
                                  lg={5}
                                  className="pb-3 pb-lg-0 text-center text-lg-left"
                                >
                                  <div className="embed-responsive embed-responsive-16by9">
                                    <NextImage
                                      src={events.image.url}
                                      alt={events.imageTitle}
                                      layout="fill"
                                      objectFit="contain"
                                      objectPosition="center"
                                      className="mx-auto"
                                    />
                                  </div>
                                </Col>
                                <Col
                                  lg={7}
                                  className="text-center text-lg-left"
                                >
                                  <h2>{events.imageTitle}</h2>
                                  {events.location ? (
                                    <HTMLContent
                                      className="m-0"
                                      content={events.location.html}
                                    />
                                  ) : (
                                    ""
                                  )}
                                </Col>
                              </Row>
                            ) : (
                              ""
                            ),
                          ]
                        ) : (
                          <Row className="section-padding justify-content-between">
                            <Col
                              lg={5}
                              className="pb-3 pb-lg-0 text-center text-lg-left"
                            >
                              <div className="embed-responsive embed-responsive-21by9">
                                <NextImage
                                  src={events.image.url}
                                  alt={events.imageTitle}
                                  layout="fill"
                                  objectFit="scale-down"
                                  objectPosition="left"
                                />
                              </div>
                            </Col>
                            <Col lg={7} className="text-center text-lg-left">
                              <h2>{events.imageTitle}</h2>
                              {events.location ? (
                                <HTMLContent
                                  className="m-0"
                                  content={events.location.html}
                                />
                              ) : (
                                ""
                              )}
                            </Col>
                          </Row>
                        )}
                      </Container>
                    ))
                  : ""}
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default Events;
