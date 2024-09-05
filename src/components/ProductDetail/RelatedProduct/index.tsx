import { PriceTag } from '@Components/Utilities';
import { AuthContext } from '@Contexts/AuthContext';
import NextImage from 'next/legacy/image';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Slider from 'react-slick';

const sliderSettings = {
  dots: true,
  arrows: false,
  infinite: false,
  speed: 500,
  margin: 15,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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

const RelatedProduct = (props) => {
  const relatedProducts = props.related.related_products;
  const { decode } = useContext(AuthContext);

  // display price
  const displayPrice = (productType, priceRange) => {
    switch (productType) {
      case 'GroupedProduct':
        return `${priceRange.minimum_price.final_price.value.toFixed(
          2
        )} - $${priceRange.maximum_price.final_price.value.toFixed(2)}`;
      case 'ConfigurableProduct':
        return priceRange.minimum_price.final_price.value;
      default:
        return priceRange.minimum_price.final_price.value;
    }
  };

  return (
    <section className="acc-related-product section-padding pt-0">
      <h2 className="text-uppercase text-center mb-3">You may Also Like</h2>
      {/* related product slider start */}
      <Slider {...sliderSettings} className="acc-related-slider text-center">
        {relatedProducts.map((item) => (
          <article
            key={item.uid}
            className="h-100 d-flex flex-column text-md-center justify-content-start align-items-md-center"
          >
            <div className="w-100 mb-2">
              <a
                href={`/products/${item.url_key}`}
                aria-label="link"
                className="d-block mb-4"
              >
                <div className="embed-responsive embed-responsive-4by3">
                  <NextImage
                    src={item.image.gallery_url}
                    alt={item.name}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="center"
                    className="embed-responsive-item"
                  />
                </div>
              </a>
              <a
                href={`/products/${item.url_key}`}
                aria-label="link"
                className="text-uppercase font-weight-500 mb-0 mt-2 h5"
              >
                {item.name}
              </a>
              {/* <Rating
                                readonly
                                className="rating d-flex mb-4 mt-2 justify-content-center"
                                initialRating={averageRating(item.average_rating)}
                                emptySymbol={<ReactSVG src="/assets/images/icons/star.svg" className="rating-icon rating-empty" />}
                                fullSymbol={<ReactSVG src="/assets/images/icons/star.svg" className="rating-icon rating-full" />}
                                /> */}
            </div>
            {item.product_for_sales !== 0 ? (
              <span className="d-block price mt-auto">
                <PriceTag
                  currency={
                    item.product_price_range.minimum_price.final_price
                      .currency === 'USD'
                      ? '$'
                      : ''
                  }
                  value={displayPrice(
                    item.__typename,
                    item.product_price_range
                  )}
                />
              </span>
            ) : (
              ''
            )}
            <a
              aria-label="link"
              href={`/products/${item.url_key}#review`}
              className={item.product_for_sales === 0 ? 'mt-auto' : ''}
            >
              <div
                className="yotpo bottomLine acc-yotpo-related d-flex justify-content-center py-3"
                data-yotpo-product-id={decode(item.uid)}
              />
            </a>
            <a href={`/products/${item.url_key}`}>
              <Button variant="secondary" className="text-uppercase">
                View Product
              </Button>
            </a>
          </article>
        ))}
      </Slider>
      {/* related product slider end */}
    </section>
  );
};

export default RelatedProduct;
