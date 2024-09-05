import { useState, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Slider from "react-slick";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ImageVideoSlider = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { ImageVideoSliders } = props;
  // For video modal
  const [show, setShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true);
    const getVideoUrl = e.target.getAttribute("data-url");
    setVideoUrl(getVideoUrl);
  };
  // End
  const sliderSettings2 = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 8000,
  };
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      {ImageVideoSliders ? (
        <section
          className={`zczxczx section-padding acc-imagevideo-slider ${props.customStyle}`}
        >
          <Container>
            <Slider {...sliderSettings2}>
              {ImageVideoSliders.length > 0 ? (
                ImageVideoSliders.map((eachSlider) => (
                  <div key={`imgss_${eachSlider.id}`}>
                    <Row>
                      <Col lg={6}>
                        {eachSlider.bannerVideoUrl ? (
                          <div className="acc-videoimage-slider-video-holder border mb-4 mb-xl-0 position-relative">
                            <div
                              className="position-absolute top left w-100 h-100 cursor-pointer acc-video-onclick-wrap"
                              data-url={eachSlider.bannerVideoUrl}
                              onClick={handleShow}
                              onKeyDown={handleShow}
                              role="button"
                              tabIndex={0}
                            >
                              {" "}
                            </div>
                            <iframe
                              width="100%"
                              src={eachSlider.bannerVideoUrl}
                              title="video"
                              frameBorder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : null}
                        {eachSlider.bannerImage ? (
                          <div className="acc-videoimage-slider-image-holder pb-4 pb-xl-0">
                            <div className="img">
                              <NextImage
                                src={eachSlider.bannerImage.url}
                                alt={eachSlider.bannerImage.fileName}
                                width={eachSlider.bannerImage.width}
                                height={eachSlider.bannerImage.height}
                                objectFit="contain"
                              />
                            </div>
                          </div>
                        ) : null}
                      </Col>
                      <Col lg={6}>
                        <article className="pl-xl-3 acc-imagevdeo-text-sec">
                          <h2 className="m-0 pb-2 mb-3">
                            {eachSlider.bannerTitle}
                          </h2>
                          <HTMLContent
                            className="m-0 text-grey-medium"
                            content={eachSlider.bannerDescription.html}
                          />
                        </article>
                      </Col>
                    </Row>
                  </div>
                ))
              ) : (
                <>
                  <Row>
                    <Col lg={6}>
                      {ImageVideoSliders.bannerVideoUrl ? (
                        <div className="acc-videoimage-slider-video-holder border">
                          <iframe
                            width="100%"
                            height="450"
                            src={ImageVideoSliders.bannerVideoUrl}
                            title="video"
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      ) : null}
                      {ImageVideoSliders.bannerImage ? (
                        <div className="acc-videoimage-slider-image-holder">
                          <div className="img">
                            <NextImage
                              src={ImageVideoSliders.bannerImage.url}
                              alt={ImageVideoSliders.bannerImage.fileName}
                              width={ImageVideoSliders.bannerImage.width}
                              height={ImageVideoSliders.bannerImage.height}
                              objectFit="contain"
                            />
                          </div>
                        </div>
                      ) : null}
                    </Col>
                    <Col lg={6}>
                      <article className="pl-3 acc-imagevdeo-text-sec">
                        <h2 className="m-0 pb-2 mb-3">
                          {ImageVideoSliders.bannerTitle}
                        </h2>
                        <HTMLContent
                          className="m-0 text-grey-medium"
                          content={ImageVideoSliders.bannerDescription.html}
                        />
                      </article>
                    </Col>
                  </Row>
                </>
              )}
            </Slider>
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
                src={videoUrl}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal.Body>
          </Modal>
        </section>
      ) : (
        ""
      )}
    </>
  );
};
export default ImageVideoSlider;
