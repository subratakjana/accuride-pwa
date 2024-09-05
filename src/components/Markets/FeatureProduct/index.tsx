import { useEffect, useState } from "react";
import { I18nLink } from "@Components/Utilities";
import { Container, Button, Card } from "react-bootstrap";
import Slider from "react-slick";
import NextImage from "next/legacy/image";

const featureProducts = (props) => {
  const { dataArr, title, description } = props;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (dataArr) {
      setIsReady(true);
    }
  }, [dataArr]);

  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });

  const sliderSettingsFeatProduct = {
    dots: true,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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

  function trimStr(str) {
    const setLength = 43;
    let trimmedString = str.substring(0, setLength);
    if (str.length > setLength) {
      trimmedString += "...";
    }
    return trimmedString;
  }

  return (
    isReady && (
      <section className={`section-padding text-center ${props.customStyle}`}>
        <Container>
          <article>
            {title ? <h1 className="m-0 pb-3">{title}</h1> : ""}
            {description ? <p className="m-0">{description}</p> : ""}
            <Slider {...sliderSettingsFeatProduct}>
              {dataArr
                ? dataArr.map((items) => (
                    <Card
                      className="border-0 px-3 acc-featured-producta-bottom pt-lg-5"
                      key={`fp_${items.id}`}
                    >
                      <Card.Body>
                        <div className="acc-next-img acc-pdct-img-feat">
                          <NextImage
                            src={items.productFeatureImage.url}
                            alt={items.productFeatureImage.fileName}
                            width={items.productFeatureImage.width}
                            height={items.productFeatureImage.height}
                            objectFit="contain"
                          />
                        </div>
                        <h4 className="card-title text-uppercase">
                          <I18nLink href={items.productLink} isMagentoRoute={1}>
                            <a>{trimStr(items.productTitle)}</a>
                          </I18nLink>
                        </h4>
                        <I18nLink
                          href={`${items.productLink}#review`}
                          isMagentoRoute={1}
                        >
                          <div
                            className="yotpo bottomLine d-flex justify-content-center py-3"
                            data-yotpo-product-id={items.productId}
                          />
                        </I18nLink>
                      </Card.Body>
                      <I18nLink href={items.productLink} isMagentoRoute={1}>
                        <Button className="btn-first">Shop Now</Button>
                      </I18nLink>
                    </Card>
                  ))
                : ""}
            </Slider>
          </article>
        </Container>
      </section>
    )
  );
};

export default featureProducts;
