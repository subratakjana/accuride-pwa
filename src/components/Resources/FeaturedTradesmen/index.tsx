import { useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const Banner = dynamic(() => import("@Components/Markets/Banner"));
const Introduction = dynamic(() => import("@Components/Markets/Introduction"));
const FeaturedProductCardsSection = dynamic(
  () => import("@Components/FeaturedProductCards"),
);
const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const FeaturedTradesmen = ({ featuredTradesmensData }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  // For video modal
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  // breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  const crumbsCategory = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: "Featured Tradesmen",
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={crumbsCategory} />
      {featuredTradesmensData
        ? featuredTradesmensData.map((rows) => (
            <div key={`ft_${rows.id}`}>
              {/* Banner Section Start */}
              <Banner
                windowSize={windowSize}
                windowObj={windowObj}
                bannerList={rows.banner}
                customStyle="acc-tradesman-banner position-relative"
              />
              {/* Banner Section end */}

              {/* Introduction Section Start */}
              <Introduction
                dataobj={rows.pages}
                winSize={windowSize}
                customStyle="acc-featured-tradesman-introduction"
              />
              {/* Introduction Section end */}

              <Container>
                <h2 className="border-bottom border-secondary pb-2 pb-md-4 mb-3 mb-md-4 mb-md-5 acc-ft-sec2-heading">
                  {rows.section2Heading}
                </h2>

                <I18nLink href={rows.section3ButtonLink} isMagentoRoute={1}>
                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="acc-sec3-btn"
                  >
                    {rows.section3ButtonText}
                  </Button>
                </I18nLink>
                <h2 className="mb-3 mb-md-4 mb-lg-5 h1 text-center acc-ft-sec3-heading">
                  {rows.section3Heading}
                </h2>
              </Container>

              <section className="section-padding pt-0 acc-video-product-listing-section">
                <Container>
                  {windowObj && windowSize.width > 768 ? (
                    <Row className="acc-video-product-listing-section-row">
                      {rows.productListingWithVideos
                        ? rows.productListingWithVideos.map((item) => (
                            <Col xs={12} md={6} key={`vid_${item.id}`}>
                              <article>
                                <div className="position-relative acc-video-wrap mb-3 mb-md-4">
                                  <NextImage
                                    src={item.videoPlaceholderImage.url}
                                    alt={`${item.productName} ${item.productNameDetails} video placeholder`}
                                    objectFit="cover"
                                    objectPosition="center"
                                    layout="fill"
                                    className="acc-video-placeholder-image"
                                  />
                                  <div className="acc-video-stamp">
                                    <NextImage
                                      src={item.videoPlaceholderImageStamp.url}
                                      alt={`${item.productName} ${item.productNameDetails} video stamp`}
                                      width={287}
                                      height={173}
                                      objectFit="contain"
                                    />
                                  </div>
                                  <div
                                    className="position-absolute top left w-100 h-100 cursor-pointer acc-video-btn-overlay d-flex align-items-center justify-content-center"
                                    data-url={item.youTubeVideoLink}
                                    onClick={handleShow}
                                    onKeyDown={handleShow}
                                    role="button"
                                    tabIndex={0}
                                  >
                                    <div className="acc-video-btn">
                                      <NextImage
                                        src="/assets/images/youtube_play_btn.png"
                                        alt={`${item.productName} ${item.productNameDetails} video icon`}
                                        width={93}
                                        height={65}
                                        objectFit="contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Row className="align-items-center flex-md-row-reverse">
                                  <Col
                                    xs={12}
                                    lg={6}
                                    className="text-center text-md-right"
                                  >
                                    <NextImage
                                      src={item.productImage.url}
                                      alt={item.productImage.assetTitle}
                                      objectPosition="center"
                                      objectFit="contain"
                                      width={291}
                                      height={204}
                                      className="acc-video-product-img"
                                    />
                                  </Col>
                                  <Col xs={12} lg={6}>
                                    <h3 className="h4 mb-0 mb-md-1 mb-lg-2 acc-video-product-title">
                                      {item.productName}
                                    </h3>
                                    <h3 className="h4 mb-2 mb-md-3 acc-video-product-title-desc">
                                      {item.productNameDetails}
                                    </h3>
                                    <h4 className="text-dark mb-3 mb-md-4 acc-video-product-price">
                                      {item.productPrice}
                                    </h4>
                                    <I18nLink
                                      href={item.buttonLink}
                                      isMagentoRoute={1}
                                    >
                                      <Button variant="secondary" size="lg">
                                        {item.buttonText}
                                      </Button>
                                    </I18nLink>
                                  </Col>
                                </Row>
                              </article>
                            </Col>
                          ))
                        : null}
                    </Row>
                  ) : (
                    <Swiper
                      spaceBetween={8}
                      slidesPerView={1}
                      slidesPerGroup={1}
                      pagination={{
                        clickable: true,
                      }}
                      modules={[Pagination]}
                      className={`acc-video-product-listing-section-row`}
                    >
                      {rows.productListingWithVideos
                        ? rows.productListingWithVideos.map((item) => (
                            <SwiperSlide key={item.id}>
                              <article>
                                <div className="position-relative acc-video-wrap mb-3 mb-md-4">
                                  <NextImage
                                    src={item.videoPlaceholderImage.url}
                                    alt={`${item.productName} ${item.productNameDetails} video placeholder`}
                                    objectFit="cover"
                                    objectPosition="center"
                                    layout="fill"
                                    className="acc-video-placeholder-image"
                                  />
                                  <div className="acc-video-stamp">
                                    <NextImage
                                      src={item.videoPlaceholderImageStamp.url}
                                      alt={`${item.productName} ${item.productNameDetails} video stamp`}
                                      width={287}
                                      height={173}
                                      objectFit="contain"
                                    />
                                  </div>
                                  <div
                                    className="position-absolute top left w-100 h-100 cursor-pointer acc-video-btn-overlay d-flex align-items-center justify-content-center"
                                    data-url={item.youTubeVideoLink}
                                    onClick={handleShow}
                                    onKeyDown={handleShow}
                                    role="button"
                                    tabIndex={0}
                                  >
                                    <div className="acc-video-btn">
                                      <NextImage
                                        src="/assets/images/youtube_play_btn.png"
                                        alt={`${item.productName} ${item.productNameDetails} video icon`}
                                        width={93}
                                        height={65}
                                        objectFit="contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <Row className="align-items-center flex-md-row-reverse">
                                  <Col
                                    xs={12}
                                    lg={6}
                                    className="text-center text-md-right"
                                  >
                                    <NextImage
                                      src={item.productImage.url}
                                      alt={item.productImage.assetTitle}
                                      objectPosition="center"
                                      objectFit="contain"
                                      width={291}
                                      height={204}
                                      className="acc-video-product-img"
                                    />
                                  </Col>
                                  <Col xs={12} lg={6}>
                                    <h3 className="h4 mb-0 mb-md-1 mb-lg-2 acc-video-product-title">
                                      {item.productName}
                                    </h3>
                                    <h3 className="h4 mb-2 mb-md-3 acc-video-product-title-desc">
                                      {item.productNameDetails}
                                    </h3>
                                    <h4 className="text-dark mb-3 mb-md-4 acc-video-product-price">
                                      {item.productPrice}
                                    </h4>
                                    <I18nLink
                                      href={item.buttonLink}
                                      isMagentoRoute={1}
                                    >
                                      <Button variant="secondary" size="lg">
                                        {item.buttonText}
                                      </Button>
                                    </I18nLink>
                                  </Col>
                                </Row>
                              </article>
                            </SwiperSlide>
                          ))
                        : null}
                    </Swiper>
                  )}
                </Container>
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
                      src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1`}
                      title="video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </Modal.Body>
                </Modal>
              </section>

              {/* Featured Product Cards section start */}
              <FeaturedProductCardsSection
                sectionHeading={rows.featuredProductHeading}
                featuredProducts={rows.featuredProductCards}
              />
              {/* Featured Product Cards section end */}
            </div>
          ))
        : ""}
    </>
  );
};

export default FeaturedTradesmen;
