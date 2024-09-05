import { Container, Button } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import Image from "next/legacy/image";
import Slider from "react-slick";
import styles from "./FeaturedProductCards.module.scss";

const FeaturedProductCardsSection = ({ sectionHeading, featuredProducts }) => {
  const sliderSettings = {
    dots: true,
    infinite: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Container className="section-padding pt-0 text-center">
      {sectionHeading && (
        <h2
          className={`display-4 font-weight-700 text-primary-dark ${styles["acc-featured-products-section-heading"]} font-family-secondary mb-3 mb-md-4`}
        >
          {sectionHeading}
        </h2>
      )}

      <Slider
        {...sliderSettings}
        className={styles["acc-featured-products-slider"]}
      >
        {featuredProducts &&
          featuredProducts.map((item) => (
            <div key={item.id}>
              <div
                className={`${styles["acc-featured-product-cards"]} px-3 py-4`}
              >
                <h3 className="font-family-secondary d-flex flex-column text-primary-dark font-weight-700 mb-3 mb-md-4">
                  {item.productName}
                  <span>{item.productNameDetails}</span>
                </h3>
                <Image
                  src={item.productImage.url}
                  alt={item.productImage.fileName}
                  layout="fill"
                  objectFit="contain"
                  objectPosition="center"
                  className={styles["acc-featured-product-cards-image"]}
                />
                <I18nLink href={item.buttonLink} isMagentoRoute={1}>
                  <Button
                    size="lg"
                    variant="primary"
                    className="font-weight-500"
                  >
                    {item.buttonText}
                  </Button>
                </I18nLink>
              </div>
            </div>
          ))}
      </Slider>
    </Container>
  );
};
export default FeaturedProductCardsSection;
