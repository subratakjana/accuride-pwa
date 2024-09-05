import { I18nLink } from "@Components/Utilities";
import { Button, Container } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { useState, useEffect, Fragment } from "react";
import { useQuery } from "graphql-hooks";
import { GET_HOME_TOP_BANNER } from "@Graphql/queries/getHomeToBanner.graphql";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useWindowDimensions from "@Hooks/windowDimention";
import Slider from "react-slick";

const TopBanner = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { sliderArr } = props;

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { loading, data } = useQuery(GET_HOME_TOP_BANNER.loc.source.body);
  if (loading) return null;

  // slider settings
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <>
      <section
        className={`banner text-white text-uppercase d-flex flex-column ${
          windowObj && windowSize.width < 768 ? " bg-primary" : "desktop-slider"
        }`}
      >
        {windowObj && windowSize.width < 768 ? (
          <>
            {data.homeBanner
              ? data.homeBanner.map((item) => (
                  <div key={item.slider_id}>
                    {item.image_type === "0" ? (
                      <>
                        <I18nLink href="/products/shop" isMagentoRoute={1}>
                          <LazyLoadImage
                            src={`${process.env.NEXT_PUBLIC_BASE_MEDIA_URL}${item.home_banner_image}`}
                            alt=""
                            className="banner-image"
                          />
                        </I18nLink>
                        <Container className="mt-auto banner-content">
                          <I18nLink href="/products/shop" isMagentoRoute={1}>
                            <Button
                              variant="outline-light"
                              size="lg"
                              className="text-uppercase mb-4 px-5"
                            >
                              Check now
                            </Button>
                          </I18nLink>
                          <span className="d-block bounce">
                            <span className="scroll-down">
                              <ReactSVG src="/assets/images/icons/arrow-down.svg" />
                            </span>
                          </span>
                        </Container>
                      </>
                    ) : null}
                  </div>
                ))
              : null}
          </>
        ) : (
          <section className="mt-auto banner-content">
            <Slider {...sliderSettings}>
              {sliderArr
                ? sliderArr.map((item) => (
                    <Fragment key={item.id}>
                      {item.bannerButtonLink ? (
                        <I18nLink
                          key={item.id}
                          href={item.bannerButtonLink}
                          isMagentoRoute={1}
                        >
                          <a>
                            <LazyLoadImage
                              effect="blur"
                              src={`${item.bannerImage[0].url}`}
                              title=""
                              alt={item.bannerImage[0].fileName}
                              className="banner-image"
                            />
                          </a>
                        </I18nLink>
                      ) : (
                        <LazyLoadImage
                          effect="blur"
                          src={`${item.bannerImage[0].url}`}
                          title=""
                          alt={item.bannerImage[0].fileName}
                          className="banner-image"
                        />
                      )}
                    </Fragment>
                  ))
                : null}
            </Slider>
          </section>
        )}
      </section>
    </>
  );
};

export default TopBanner;
