import { useState, useCallback, useContext, useEffect } from "react";

import Slider from "react-slick";
import { Modal, Button } from "react-bootstrap";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";

const ProductApplication = ({ application }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: false,
    speed: 500,
    margin: 15,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const applicationData = application;
  let applicationParseData;

  const [show, setShow] = useState(false);
  const [data, setModalData] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const openModal = useCallback((modalData) => {
    handleShow();
    setModalData(modalData);
  });
  if (applicationData) {
    applicationParseData = JSON.parse(applicationData);
  }

  return (
    <div className="acc-product-application">
      {applicationParseData !== undefined ? (
        <div>
          <Slider {...sliderSettings} className="text-center">
            {Object.keys(applicationParseData).map((item) => (
              <article key={item.length} className="px-3">
                <span
                  className="d-block acc-img mb-3 cursor-pointer"
                  onClick={() => openModal(applicationParseData[item])}
                  onKeyPress={() => false}
                  role="button"
                  tabIndex={0}
                >
                  <NextImage
                    src={`${process.env.NEXT_PUBLIC_BASE_MEDIA_URL}${applicationParseData[item].image}`}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                  />
                </span>
                <Button
                  variant="link"
                  block
                  onClick={() => openModal(applicationParseData[item])}
                  className="text-primary font-weight-500 p-0 mb-2"
                >
                  {applicationParseData[item].title}
                </Button>
                <Button
                  variant="link"
                  onClick={() => openModal(applicationParseData[item])}
                  className="text-primary font-weight-500 p-0"
                >
                  Learn More &gt;
                </Button>
              </article>
            ))}
          </Slider>

          {/* modal start */}
          <Modal show={show} onHide={handleClose} centered size="md">
            <Modal.Body className="p-3">
              <iframe
                title="accuride"
                width="100%"
                height={windowObj && windowSize.width <= 1024 ? "100%" : "400"}
                src={data ? data["data-video"] : ""}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Modal.Body>
          </Modal>
          {/* modal end */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProductApplication;
