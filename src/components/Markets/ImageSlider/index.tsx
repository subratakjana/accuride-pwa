import { useState, useEffect } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Row, Col, Button } from "react-bootstrap";
import Slider from "react-slick";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ImageSlider = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const {
    ImageSliders,
    slider = true,
    fullWidth = false,
    title = "",
    description = "",
  } = props;
  const sliderSettings2 = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
  };
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      {ImageSliders ? (
        <section
          className={`section-padding acc-custom-image-slider ${props.customStyle}`}
        >
          <Container fluid={fullWidth}>
            {(title || description) && (
              <div className="text-center mb-4 mb-md-5 acc-sec-heading">
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            )}
            {slider ? (
              <Slider {...sliderSettings2}>
                {ImageSliders.length > 0 ? (
                  ImageSliders.map((eachSlider) => (
                    <div key={`imgss_${eachSlider.id}`}>
                      <Row className="align-items-center no-gutters">
                        <Col lg={5} className="bg-light p-5 text-col">
                          <article className="text-center">
                            <h1 className="m-0 pb-3">
                              {eachSlider.bannerTitle}
                            </h1>
                            <HTMLContent
                              className="m-0 pb-3"
                              content={eachSlider.bannerDescription.html}
                            />
                          </article>
                        </Col>
                        <Col lg={7} className="image-col">
                          <div className="acc-image-slider-image-holder">
                            <NextImage
                              src={eachSlider.bannerImage.url}
                              alt={eachSlider.bannerImage.url}
                              objectPosition="center"
                              className="mt-3"
                              width={788}
                              height={450}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <div key="imgss_sliders">
                    <Row className="align-items-center no-gutters">
                      <Col lg={5} className="bg-light p-5 text-col">
                        <article className="text-center">
                          <h1 className="m-0 pb-3">
                            {ImageSliders.bannerTitle}
                          </h1>
                          <HTMLContent
                            className="m-0 pb-3"
                            content={ImageSliders.bannerDescription.html}
                          />
                          {ImageSliders.bannerButtonLabel ? (
                            <I18nLink
                              href={encodeURI(ImageSliders.bannerButtonLink)}
                            >
                              <Button
                                variant="primary"
                                className={`text-uppercase mx-auto ${
                                  windowObj && windowSize.width < 991
                                    ? "btn-block"
                                    : ""
                                }`}
                              >
                                {ImageSliders.bannerButtonLabel}
                              </Button>
                            </I18nLink>
                          ) : (
                            ""
                          )}
                        </article>
                      </Col>
                      <Col lg={7} className="image-col">
                        <NextImage
                          src={ImageSliders.bannerImage.url}
                          alt={ImageSliders.bannerImage.url}
                          objectFit="cover"
                          objectPosition="center"
                          className="mt-3"
                          width={800}
                          height={450}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </Slider>
            ) : (
              <>
                {ImageSliders.length > 0 ? (
                  ImageSliders.map((eachSlider) => (
                    <div key={`imgss_${eachSlider.id}`}>
                      <Row className="align-items-center no-gutters">
                        <Col lg={7} className="bg-light p-5 text-col">
                          <article className="text-left">
                            <h2 className="m-0 pb-3">
                              {eachSlider.bannerTitle}
                            </h2>
                            <HTMLContent
                              className="m-0 pb-3"
                              content={eachSlider.bannerDescription.html}
                            />
                          </article>
                        </Col>
                        <Col lg={5} className="image-col">
                          <div className="acc-image-slider-image-holder">
                            <NextImage
                              src={eachSlider.bannerImage.url}
                              alt={eachSlider.bannerImage.url}
                              objectPosition="center"
                              className="mt-0"
                              width={788}
                              height={450}
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))
                ) : (
                  <div key="imgss_sliders">
                    <Row className="align-items-center no-gutters">
                      <Col lg={7} className="bg-light p-5 text-col">
                        <article className="text-left">
                          <h2 className="m-0 pb-3">
                            {ImageSliders.bannerTitle}
                          </h2>
                          <HTMLContent
                            className="m-0 pb-3"
                            content={ImageSliders.bannerDescription.html}
                          />
                          {ImageSliders.bannerButtonLabel ? (
                            <I18nLink
                              href={encodeURI(ImageSliders.bannerButtonLink)}
                            >
                              <Button
                                variant="primary"
                                className={`text-uppercase mx-auto ${
                                  windowObj && windowSize.width < 991
                                    ? "btn-block"
                                    : ""
                                }`}
                              >
                                {ImageSliders.bannerButtonLabel}
                              </Button>
                            </I18nLink>
                          ) : (
                            ""
                          )}
                        </article>
                      </Col>
                      <Col lg={5} className="image-col">
                        <NextImage
                          src={ImageSliders.bannerImage.url}
                          alt={ImageSliders.bannerImage.url}
                          objectFit="cover"
                          objectPosition="center"
                          className="mt-0"
                          width={800}
                          height={450}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
              </>
            )}
          </Container>
        </section>
      ) : (
        ""
      )}
    </>
  );
};
export default ImageSlider;
