import { useEffect, useState } from "react";
import { Button, Carousel, Modal } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ImageSliderWithDescription = (props) => {
  const { data, winSize, customStyle } = props;
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
    if (winSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      {data ? (
        <section className={`acc-image-slider-with-desc ${customStyle}`}>
          {props.bgImage ? (
            <Carousel controls={false} indicators={false}>
              <Carousel.Item>
                {props.bgImage ? (
                  <span className="carousalSnap d-block mt-3 w-100">
                    <NextImage
                      src={props.bgImage.url}
                      alt=""
                      objectFit="cover"
                      objectPosition="center"
                      layout="fill"
                    />
                  </span>
                ) : (
                  ""
                )}
                <Carousel.Caption>
                  <h1
                    className={`${
                      windowObj && winSize.width > 991 ? "text-white" : ""
                    }`}
                  >
                    {data.title}
                  </h1>
                  {props.description ? (
                    <HTMLContent
                      className="m-0 pb-3"
                      content={data.description.html}
                    />
                  ) : (
                    ""
                  )}
                  {data.buttonLabel
                    ? [
                        data.linkType === "Video" ? (
                          <>
                            <Button
                              key="btn1"
                              data-url={data.buttonLink}
                              onClick={handleShow}
                              onKeyDown={handleShow}
                              variant="primary"
                              className={`text-uppercase border border-medium ${
                                windowObj && winSize.width < 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {data.buttonLabel}
                            </Button>
                            <Modal
                              size="md"
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
                          </>
                        ) : (
                          <I18nLink key="btn1" href={data.buttonLink}>
                            <Button
                              variant="primary"
                              className={`text-uppercase border border-medium ${
                                windowObj && winSize.width < 991
                                  ? "btn-block"
                                  : ""
                              }`}
                            >
                              {data.buttonLabel}
                            </Button>
                          </I18nLink>
                        ),
                      ]
                    : ""}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          ) : (
            <Carousel controls={false} indicators>
              {data.map((item) => (
                <Carousel.Item key={`imgdesc_${item.id}`}>
                  {item.image ? (
                    <span className="carousalSnap d-block mt-3 w-100">
                      <NextImage
                        src={item.image.url}
                        alt={item.image.url}
                        objectFit="cover"
                        objectPosition="center"
                        layout="fill"
                      />
                    </span>
                  ) : (
                    ""
                  )}
                  {item.name ? (
                    <div className="position-absolute acc-author-details">
                      <p className="m-0">{item.name}</p>
                      <p className="m-0">{item.designation}</p>
                    </div>
                  ) : (
                    ""
                  )}
                  <Carousel.Caption>
                    <h1
                      className={`${
                        windowObj && winSize.width > 991 ? "text-white" : ""
                      }`}
                    >
                      {item.title}
                    </h1>
                    {item.description ? (
                      <HTMLContent
                        className="m-0 pb-3"
                        content={item.description.html}
                      />
                    ) : (
                      ""
                    )}
                    {item.buttonLabel
                      ? [
                          item.linkType === "Video" ? (
                            <div key={`divKey_${item.id}`}>
                              <Button
                                data-url={item.buttonLink}
                                onClick={handleShow}
                                onKeyDown={handleShow}
                                variant="primary"
                                className={`text-uppercase border border-medium ${
                                  windowObj && winSize.width < 991
                                    ? "btn-block"
                                    : ""
                                }`}
                              >
                                {item.buttonLabel}
                              </Button>
                              <Modal
                                size="md"
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
                            </div>
                          ) : (
                            <I18nLink
                              key={`setKey_${item.id}`}
                              href={item.buttonLink}
                            >
                              <Button
                                variant="primary"
                                className={`text-uppercase border border-medium ${
                                  windowObj && winSize.width < 991
                                    ? "btn-block"
                                    : ""
                                }`}
                              >
                                {item.buttonLabel}
                              </Button>
                            </I18nLink>
                          ),
                        ]
                      : ""}
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default ImageSliderWithDescription;
