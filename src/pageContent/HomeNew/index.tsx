import React, { useContext, useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import { AuthContext } from "@Contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Head from "next/head";
import { I18nLink } from "@Components/Utilities";

import { useQuery } from "graphql-hooks";
import { homePageInfoNew } from "@Graphql/queriesgraphcms/homePageNew.graphql";
import GET_MAGENTO_CMS_PAGE_INFORMATION from "@Graphql/queries/getMagentoCmsPageInformation.graphql";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const HomeTopBanner = dynamic(
  () => import("@Components/HomeNew/HomeTopBanner"),
);
const HomeOrderDirect = dynamic(
  () => import("@Components/HomeNew/HomeOrderDirect"),
);

const HomeSkeleton = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      {windowObj && windowSize.width > 767 ? (
        <>
          <div className="p-3">
            <Skeleton
              containerClassName="embed-responsive embed-responsive-21by9 acc-ban-skeleton"
              className="embed-responsive-item"
            />
          </div>
        </>
      ) : (
        <div className="acc-home-banner p-3">
          <Skeleton height="100%" />
        </div>
      )}
      <section className="mt-2 mt-xl-0">
        <Row noGutters>
          {[1, 2, 3].map(() => (
            <Col xl={4} key={Math.random()} className=" mb-2 mb-xl-0">
              <div className="mb-2 mb-xl-0 py-4 px-3 px-xl-5 d-flex align-items-start cursor-pointer">
                <Skeleton circle="true" width={24} height={24} />
                <div className="pl-3 flex-fill">
                  <div className="mb-2 p-0">
                    <Skeleton count={0.75} height={18} />
                  </div>
                  <Skeleton count={1.3} />
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </section>
      <Container className="section-padding">
        <Row className="align-items-center">
          {[1, 2, 3, 4].map((i) => (
            <Col
              key={Math.random()}
              xl={3}
              md={`${i === 1 ? "" : "4"}`}
              className={`mb-5 ${
                i === 1
                  ? "d-flex justify-content-between d-xl-block align-items-center mb-xl-0"
                  : "mb-md-0"
              }`}
            >
              {i === 1 ? (
                <>
                  <div className="pb-1 pb-xl-4 mb-0 mb-xl-5 flex-fill">
                    <Skeleton count={0.75} height={24} />
                  </div>
                  <Skeleton width={90} height={36} />
                </>
              ) : (
                <div>
                  <div className="text-left text-xl-right mb-2">
                    <Skeleton count={0.75} height={18} />
                  </div>
                  <Skeleton widt={335} height={198} />
                </div>
              )}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

const HomeNewPage = () => {
  let homeNew = [];
  let pageInfo = [];
  const { notify } = useContext(AuthContext);
  const lazyRoot = React.useRef(null);
  const {
    loading: homeInfoNewLoading,
    error,
    data,
  } = useQuery(homePageInfoNew.loc.source.body, {
    operationName: { clientName: "graphCms" },
    fetchPolicy: "no-cache",
    nextFetchPolicy: "cache-first",
  });

  const { loading: seoDataLoading, data: seoData } = useQuery(
    GET_MAGENTO_CMS_PAGE_INFORMATION.loc.source.body,
    {
      variables: {
        identifier: "home",
      },
    },
  );

  if (homeInfoNewLoading || seoDataLoading) return <HomeSkeleton />;
  if (data && seoData) {
    homeNew = data.homeNews;
    pageInfo = seoData.cmsPage;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }

  return (
    <>
      <Head>
        <title>{pageInfo.meta_title}</title>
        <meta name="keywords" content={pageInfo.meta_keywords} />
        <meta name="description" content={pageInfo.meta_description} />
      </Head>
      {homeNew
        ? homeNew.map((rows) => (
            <div key={`acc_${rows.id}`}>
              {/* banner start */}
              <HomeTopBanner
                data={rows.banner}
                mobileData={rows.homeMobileBanner}
              />
              {/* banner end */}

              {/* <Skeleton count={3} /> */}

              {/* category start */}
              <section className="mt-2 mt-xl-0">
                <Row noGutters>
                  {rows.section1ThreeBox
                    ? rows.section1ThreeBox.map((items) => (
                        <Col
                          xl={4}
                          key={`${items.id}_infobox`}
                          className="bg-primary border-right mb-2 mb-xl-0"
                        >
                          <I18nLink
                            href={items.imageButtonLink}
                            isMagentoRoute={1}
                          >
                            <div className="mb-2 mb-xl-0 py-4 px-3 px-xl-5 d-flex align-items-start cursor-pointer">
                              <img
                                width={27}
                                height={15}
                                src="/assets/images/new-home/new-home-page-arrow.svg"
                                alt="Arrow"
                                className="mt-2 flex-none"
                              />
                              <article className="pl-3 flex-fill">
                                <h3 className="m-0 text-white p-0 font-weight-light">
                                  {items.imageTitle}
                                </h3>
                                <p className="text-secondary m-0">
                                  {items.imageDescription}
                                </p>
                              </article>
                            </div>
                          </I18nLink>
                        </Col>
                      ))
                    : null}
                </Row>
              </section>
              {/* category end */}

              {/* order direct start */}
              <HomeOrderDirect data={rows.section2ImageGallery} />
              {/* order direct end */}

              {/* innovation start */}
              <section className="section-padding pb-0">
                <Container>
                  <article className="text-center">
                    <h2>
                      {rows.section3ImageDesc.bannerTitle || (
                        <Skeleton count={0.5} />
                      )}
                    </h2>
                    <p className="text-medium m-0 pb-4">
                      {rows.section3ImageDesc.bannerDescription.text || (
                        <Skeleton count={1} />
                      )}
                    </p>
                    <img
                      src="/assets/images/new-home/arrow2.svg"
                      width={44}
                      height={25}
                      alt="Arrow"
                      className="mx-auto"
                    />
                    <NextImage
                      src={rows.section3ImageDesc.bannerImage.url}
                      alt={rows.section3ImageDesc.bannerImage.url}
                      objectPosition="center"
                      className="mt-3"
                      width={1352}
                      height={204}
                      ref={lazyRoot}
                    />
                  </article>
                  <HTMLContent content={rows.section4Text.html} />
                </Container>
                <div className="bg-primary p-3 w-100" />
              </section>
              {/* innovation end */}

              {/* online store start */}
              <I18nLink
                href={rows.section5ImageDesc.bannerButtonLink}
                isMagentoRoute={1}
              >
                <section className="acc-home-online-store-section cursor-pointer">
                  <Container>
                    <Row noGutters className="align-items-center">
                      <Col md={3} sm={4} xs={5}>
                        <h1 className="mb-5">
                          {rows.section5ImageDesc.bannerTitle || (
                            <Skeleton count={1} />
                          )}
                        </h1>
                        <Button
                          variant="link"
                          className="border border-primary"
                        >
                          {rows.section5ImageDesc.bannerButtonLabel}
                        </Button>
                      </Col>
                      <Col md={9} sm={8} xs={7}>
                        <NextImage
                          src={rows.section5ImageDesc.bannerImage.url}
                          alt={rows.section5ImageDesc.bannerImage.url}
                          objectPosition="center"
                          className="acc-home-online-store-image"
                          width={1014}
                          height={71}
                        />
                      </Col>
                    </Row>
                  </Container>
                </section>
              </I18nLink>
              {/* online store end */}

              {/* solution start */}
              <I18nLink href={rows.section7ButtonLink} isMagentoRoute={1}>
                <section className="bg-primary p-2 p-xl-3 text-center cursor-pointer">
                  <h2 className="m-0 p-0 text-white">
                    {rows.section6Text || <Skeleton count={0.5} />}
                  </h2>
                </section>
              </I18nLink>
              {/* solution store */}

              {/* paypal start */}
              <I18nLink href={rows.section7ButtonLink} isMagentoRoute={1}>
                <section className="section-padding text-center text-xl-left cursor-pointer">
                  <Container>
                    <Row>
                      <Col xl={3}>
                        <Button variant="link" className="p-0 mb-3 mb-xl-0">
                          <NextImage
                            src={rows.section7ButtonImage.url}
                            alt={rows.section7ButtonImage.url}
                            layout="fill"
                            objectFit="contain"
                            objectPosition="center"
                          />
                        </Button>
                      </Col>
                      <Col xl={9}>
                        <h2 className="text-medium m-0 p-0">
                          {rows.section7Text}
                        </h2>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </I18nLink>
              {/* paypal start */}

              {/* help start */}
              <section className="text-center p-xl-4 p-2 bg-dark acc-home-new-section8-text">
                <HTMLContent content={rows.section8Text.html} />
              </section>
              {/* help end */}

              {/* warrenty start */}
              <I18nLink
                href={rows.section9ImageDesc.bannerButtonLink}
                isMagentoRoute={0}
              >
                <section className="section-padding acc-home-warrenty-iso-sec cursor-pointer">
                  <Container fluid>
                    <Row className="justify-content-around align-items-center">
                      <Col xl={5}>
                        <article className="d-flex align-items-center acc-home-warrenty-sec cursor-pointer">
                          <div className="acc-home-warrenty-img">
                            <NextImage
                              src={rows.section9ImageDesc.bannerImage.url}
                              alt="Warranty"
                              title="Warranty"
                              layout="fixed"
                              className="mx-auto"
                              width={150}
                              height={150}
                            />
                          </div>
                          <div className="pl-4 acc-home-warrenty-text">
                            <h3>{rows.section9ImageDesc.bannerTitle}</h3>
                            <p>
                              {rows.section9ImageDesc.bannerDescription.text}
                            </p>
                          </div>
                        </article>
                      </Col>
                      <Col xl={4} className="mt-4 mt-xl-0">
                        <article className="d-flex align-items-center justify-content-xl-end justify-content-center acc-home-iso-sec">
                          {rows.section9RightSideImages
                            ? rows.section9RightSideImages.map((items) => (
                                <div
                                  className="mr-2 mr-sm-4"
                                  key={`${items.id}_isoimages`}
                                >
                                  <NextImage
                                    src={items.url}
                                    alt="Warranty"
                                    title="Warranty"
                                    layout="fixed"
                                    width={80}
                                    height={100}
                                    objectFit="contain"
                                    objectPosition="center"
                                  />
                                </div>
                              ))
                            : ""}
                        </article>
                      </Col>
                    </Row>
                  </Container>
                </section>
              </I18nLink>
              {/* warrenty end */}
            </div>
          ))
        : ""}
    </>
  );
};

export default HomeNewPage;
