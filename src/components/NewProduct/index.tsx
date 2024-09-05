import { Button, Container, ResponsiveEmbed } from "react-bootstrap";
import Slider from "react-slick";
import { I18nLink } from "@Components/Utilities";
import { useQuery } from "graphql-hooks";
import { useEffect, useState } from "react";
import { getNewProduct } from "@Graphql/queries/getHomeNewProduct.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";

const ProductSlider = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });
  // setting
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { data: dataNewProducts } = useQuery(getNewProduct.loc.source.body);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  if (!dataNewProducts) return <section>&nbsp;</section>;

  const newProducts = dataNewProducts.homeNewProduct;

  return (
    <section className="section-padding">
      <Container>
        {/* heading start */}
        <header className="mb-3 text-center">
          <h2 className="mb-0 text-uppercase">New Products</h2>
        </header>
        {/* heading end */}
        <Slider {...sliderSettings} className="acc-newproduct-slide">
          {newProducts.map((item) => (
            <article
              key={item.prod_name}
              className="h-100 d-flex flex-column justify-content-between text-md-center align-items-md-center"
            >
              <div className="w-100">
                <I18nLink
                  href={`/products/${item.prod_url}`}
                  isMagentoRoute={1}
                >
                  <a aria-label="link" className="d-block mb-4">
                    <ResponsiveEmbed aspectRatio="4by3">
                      <NextImage
                        src={item.prod_image}
                        alt=""
                        objectFit="contain"
                        objectPosition="center"
                        layout="fill"
                      />
                    </ResponsiveEmbed>
                  </a>
                </I18nLink>
                <I18nLink
                  href={`/products/${item.prod_url}`}
                  isMagentoRoute={1}
                >
                  <a
                    aria-label="link"
                    className="text-uppercase font-weight-500 mb-0 mt-2 h5"
                  >
                    {item.prod_name}
                  </a>
                </I18nLink>
                <I18nLink
                  href={`/products/${item.prod_url}#review`}
                  isMagentoRoute={1}
                >
                  <div
                    className="yotpo bottomLine justify-content-center d-flex py-3"
                    data-yotpo-product-id={item.prod_id}
                  />
                </I18nLink>
                {/* <Rating
                                    readonly
                                    className="rating d-flex mb-4 mt-2 justify-content-md-center"
                                    initialRating={Math.round(item.prod_rating)}
                                    emptySymbol={<ReactSVG src="/assets/images/icons/star.svg" className="rating-icon rating-empty" />}
                                    fullSymbol={<ReactSVG src="/assets/images/icons/star.svg" className="rating-icon rating-full" />}
                                /> */}
              </div>
              <I18nLink href={`/products/${item.prod_url}`} isMagentoRoute={1}>
                <Button
                  variant="primary"
                  className="text-uppercase"
                  block={!(windowObj && windowSize.width >= 768)}
                >
                  View Product
                </Button>
              </I18nLink>
            </article>
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default ProductSlider;
