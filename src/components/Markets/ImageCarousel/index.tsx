import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Card, Button, Modal } from "react-bootstrap";
import Slider from "react-slick";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ImageCarousel = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [pdfUrl, setPdfUrl] = useState("");
  const handleShow = (e) => {
    const pdfPath = e.target.getAttribute("data-url");
    if (pdfPath !== "" || pdfPath !== "#") {
      setShow(true);
      setPdfUrl(pdfPath);
    }
  };
  const handleClose = () => setShow(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: `${props.slidestoshow}`,
    slidesToScroll: `${props.slidestoscroll}`,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
    ],
  };

  return (
    <section className={`section-padding text-center ${props.customStyle}`}>
      <Container>
        <article>
          {props.title ? <h1 className="m-0 pb-3">{props.title}</h1> : ""}
          {props.description ? (
            <p className="m-0 pb-5">
              {props.description ? props.description.text : ""}
            </p>
          ) : (
            ""
          )}
          <Slider {...sliderSettings}>
            {props.data
              ? props.data.map((images) => (
                  <Card
                    key={`img_${images.galleryImages.id}`}
                    className="border-0 px-3"
                  >
                    <Card.Img
                      variant="top"
                      src={images.galleryImages.url}
                      className="rounded-0"
                    />
                    <Card.Body>
                      <Card.Title>{images.imageTitle}</Card.Title>
                      <Card.Text>{images.imageDescription}</Card.Text>
                      {images.imageDescription2 ? (
                        <HTMLContent
                          className="m-0"
                          content={images.imageDescription2.html}
                        />
                      ) : null}
                      {images.imageButtonLink ? (
                        <>
                          {images.linkType === "PDF" ||
                          images.linkType === "Video" ? (
                            <Button
                              variant="primary"
                              data-url={images.imageButtonLink}
                              onClick={handleShow}
                              onKeyDown={handleShow}
                              className={`text-uppercase ${
                                windowObj && windowSize.width < 576
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {images.imageButtonLabel}
                            </Button>
                          ) : (
                            <I18nLink
                              href={images.imageButtonLink}
                              isMagentoRoute={0}
                            >
                              <Button
                                variant="primary"
                                className={`text-uppercase ${
                                  windowObj && windowSize.width < 991
                                    ? "btn-block"
                                    : ""
                                }`}
                              >
                                {images.imageButtonLabel}
                              </Button>
                            </I18nLink>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                    </Card.Body>
                  </Card>
                ))
              : ""}
          </Slider>
          <Modal
            size="lg"
            show={show}
            onHide={handleClose}
            className="acc-custom-modal"
          >
            <Modal.Body className="text-center">
              <iframe
                width="100%"
                height="600"
                src={pdfUrl}
                title="video"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal.Body>
          </Modal>
        </article>
      </Container>
    </section>
  );
};

export default ImageCarousel;
