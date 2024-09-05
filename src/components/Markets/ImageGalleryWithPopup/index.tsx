import { useState } from 'react';
import { Container, Row, Col, Card, Modal, CloseButton } from 'react-bootstrap';
import Slider from 'react-slick';
import dynamic from 'next/dynamic';
import { ReactSVG } from 'react-svg';
import styles from './ImageGalleryWithPopup.module.scss';

const HTMLContent = dynamic(() => import('@Components/Utilities/HTMLContent'));

const ImageGalleryWithPopup = (props) => {
  const { data, customStyle } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (e) => {
    setShow({
      show: true,
      Title: e.imageTitle,
      Desc: e.imageDescription,
      Desc2: e.imageDescription2?.html,
      Img: e.galleryImages.url,
    });
  };

  const sliderSettings1 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
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
    <section className={`section-padding text-center ${customStyle || ''}`}>
      <Container>
        <article>
          <Slider {...sliderSettings1}>
            {data &&
              data.map((images) => (
                <Card
                  key={`pop_${images.galleryImages.id}`}
                  className="border-0"
                  onClick={() => handleShow(images)}
                >
                  <Card.Img
                    variant="top"
                    height={100}
                    src={images.galleryImages.url}
                  />
                  <Card.Body>
                    <Card.Title>{images.imageTitle}</Card.Title>
                  </Card.Body>
                </Card>
              ))}
          </Slider>
        </article>
      </Container>
      <Modal
        size="sm"
        show={show.show}
        onHide={handleClose}
        className="acc-custom-modal"
      >
        <CloseButton
          className="position-absolute top right py-2 px-3 cursor-pointer z-index-5"
          onClick={handleClose}
        />
        <Modal.Body className="p-4 pt-lg-5 text-center">
          <Row className="align-items-center">
            <Col sm={4} className="mb-3 mb-sm-0">
              <ReactSVG
                src={show.Img}
                className={`mx-auto svgWraper ${styles['acc-img-gallery-icon']}`}
              />
              <h4 className="m-0 pt-3">{show.Title}</h4>
            </Col>
            <Col sm={8} className="acc-modal-description-col">
              {show.Desc ? (
                <p>{show.Desc}</p>
              ) : (
                <>
                  {show.Desc2 && (
                    <HTMLContent className="m-0" content={show.Desc2} />
                  )}
                </>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </section>
  );
};
export default ImageGalleryWithPopup;
