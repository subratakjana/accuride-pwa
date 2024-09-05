import { Container, Card, Button } from "react-bootstrap";
import Slider from "react-slick";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import { RiArrowRightSLine, RiArrowLeftSLine } from "react-icons/ri";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

// slick next arrow
const SlickNextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <>
      <Button className={`p-0 ${className}`} onClick={onClick} variant="link">
        <RiArrowRightSLine size="3rem" />
      </Button>
    </>
  );
};
// slick prev arrow
const SlickPrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <>
      <Button className={`p-0 ${className}`} onClick={onClick} variant="link">
        <RiArrowLeftSLine size="3rem" />
      </Button>
    </>
  );
};

const ImageHoverCarousel = (props) => {
  const sliderSettings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: `${props.slidestoshow}`,
    slidesToScroll: `${props.slidestoscroll}`,
    nextArrow: <SlickNextArrow />,
    prevArrow: <SlickPrevArrow />,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          arrows: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
    <section className="section-padding text-center acc-image-hover-carosel">
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
                    className="border-0 px-3 position-relative acc-image-hover-card"
                  >
                    {images.imageButtonLink ? (
                      <I18nLink
                        href={images.imageButtonLink}
                        isMagentoRoute={ images?.galleryTitle === 'Specialty Slides' ? 0 : 1}
                      >
                        <Button className="position-absolute acc-custom-click border-0 top left w-100 h-100" />
                      </I18nLink>
                    ) : (
                      ""
                    )}
                    <NextImage
                      src={images.galleryImages.url}
                      alt={images.galleryImages.url}
                      objectFit="cover"
                      objectPosition="center"
                      className="mx-auto"
                      width={419}
                      height={320}
                    />
                    <div className="hover-image-content position-absolute">
                      <h2 className="text-white">{images.galleryTitle}</h2>
                      <h4 className="text-white">{images.imageTitle}</h4>
                    </div>
                    <Card.Body className="position-absolute text-left">
                      {props.hoverDescriptionTitle === 1 ? (
                        <h3 className="text-white">{images.galleryTitle}</h3>
                      ) : (
                        ""
                      )}
                      {images.imageDescription ? (
                        <Card.Text
                          key={`imgss_${images.galleryImages.id}`}
                          className="text-white"
                        >
                          {images.imageDescription}
                        </Card.Text>
                      ) : (
                        [
                          images.imageDescription2 ? (
                            <HTMLContent
                              key={`imgs_${images.galleryImages.id}`}
                              content={images.imageDescription2.html}
                            />
                          ) : (
                            ""
                          ),
                        ]
                      )}
                    </Card.Body>
                  </Card>
                ))
              : ""}
          </Slider>
        </article>
      </Container>
    </section>
  );
};

export default ImageHoverCarousel;
