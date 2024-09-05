import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/legacy/image';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import Slider from 'react-slick';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';

const ProductImageGallery = ({ mediaGallery, selectedSku }) => {
  const [galFullView, setGalFullView] = useState(false);
  const [videoShow, setvideoShow] = useState(false);

  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // For Gallery
  const sliderRef = useRef();
  const [carouselindex, setCarouselindex] = useState(0);
  const handleSelect = (selectedIndex) => {
    setCarouselindex(selectedIndex);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(selectedIndex);
    }
  };
  // For Gallery End

  // For Product Data
  let mediaGalleryImages = mediaGallery.media_gallery;
  const galleryImagesLength = mediaGalleryImages.length;
  if (selectedSku) {
    const selectedVariants = mediaGallery.variants.find(
      (item) => item.product.sku === selectedSku
    );
    if (selectedVariants.product.media_gallery.length > 0) {
      mediaGalleryImages = selectedVariants.product.media_gallery;
    }
  }
  // End

  // For Thumb Image Slider
  const thumbImage = {
    dots: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    infinite: galleryImagesLength > 4,
  };
  // End

  // For Full View
  const fullViewClik = () => {
    setGalFullView(true);
  };
  const closeFullscreen = () => {
    setGalFullView(false);
    setvideoShow(false);
  };
  // end

  // For Video
  const galVideoPlay = () => {
    setvideoShow(true);
  };
  // End

  useEffect(() => {
    const getBodyElement = document.querySelector('body');
    if (galFullView) {
      getBodyElement.setAttribute('style', 'overflow: hidden');
    } else {
      getBodyElement.removeAttribute('style', 'overflow: hidden');
    }
  }, [galFullView]);

  return (
    <>
      <div className={`${galFullView ? 'acc-gal-full-view' : ''}`}>
        {galFullView ? (
          <div className="d-flex bg-primary acc-custom-fullscreen justify-content-between align-items-center">
            <Button
              variant="link"
              className={`m-0 p-0 acc-fullscreen-btn${
                galFullView ? 'active' : ''
              }`}
              onClick={() => closeFullscreen()}
            >
              <ReactSVG
                src="/assets/images/icons/close.svg"
                className="acc-product-image-close-icon"
              />
            </Button>
            <I18nLink href="/">
              <a
                aria-label="link"
                className="logo-icon"
                onClick={() => closeFullscreen()}
                onKeyPress={() => closeFullscreen()}
                role="button"
                tabIndex={0}
              >
                <ReactSVG
                  src="/assets/images/accuride-logo-icon.svg"
                  className="fill-white acc-product-image-logo-icon"
                />
              </a>
            </I18nLink>
          </div>
        ) : null}
        {/* Large image */}
        <div className="acc-product-gallery-main-image-sec pb-4 pb-md-0">
          <Carousel
            controls={galleryImagesLength > 1}
            indicators={!!(windowObj && windowSize.width <= 767)}
            activeIndex={carouselindex}
            onSelect={handleSelect}
            onSlide={() => setvideoShow(false)}
            interval={null}
          >
            {mediaGalleryImages.map((item, index) => (
              <Carousel.Item key={`accd_${index}`} className="acc-next-image">
                {item.video_content ? (
                  <>
                    {videoShow ? (
                      <>
                        {item.video_content.video_url.includes('vimeo.com') ? (
                          <iframe
                            title="video-gallary"
                            width="100%"
                            height="315"
                            src={`https://player.vimeo.com/video/${
                              item.video_content.video_url.split(
                                'vimeo.com/'
                              )[1]
                            }?autoplay=1&controls=1`}
                            frameBorder="0"
                            allow="autoplay; fullscreen"
                            allowFullScreen
                          />
                        ) : (
                          <iframe
                            title="video-gallary"
                            width="100%"
                            src={`${item.video_content.video_url}?autoplay=1&rel=0&controls=0`}
                            frameBorder="0"
                            allowFullScreen
                          />
                        )}
                      </>
                    ) : (
                      <>
                        <Image
                          src={item.gallery_url}
                          alt={item.label}
                          layout="fill"
                          onClick={fullViewClik}
                        />
                        <div
                          className="play-button"
                          onClick={galVideoPlay}
                          role="button"
                          tabIndex={0}
                          onKeyPress={galVideoPlay}
                          aria-label="play"
                        />
                      </>
                    )}
                  </>
                ) : (
                  <Image
                    src={item.gallery_url}
                    alt={item.label}
                    layout="fill"
                    onClick={fullViewClik}
                    priority={index === 0}
                  />
                )}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        {/* Large image end */}
        {/* Thumb Image */}
        {(windowObj && windowSize.width > 767) || galFullView ? (
          <div className="acc-product-gallery-thum-image-sec px-5 pt-4">
            <Slider {...thumbImage} ref={sliderRef}>
              {mediaGalleryImages.map((item, checkindex) => (
                <div
                  aria-label="Thumb Image"
                  onClick={() => handleSelect(checkindex)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={() => handleSelect(checkindex)}
                  className={`acc-next-image ${
                    carouselindex === checkindex ? 'thum-active' : ''
                  }`}
                  key={`accd_${checkindex}`}
                >
                  {item.video_content ? (
                    <div className="thumb-video-icon">
                      <Image
                        src={item.gallery_url}
                        alt={item.label}
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <Image
                      src={item.gallery_url + '?w=142&h'}
                      alt={item.label}
                      layout="fill"
                      priority={true}
                      quality={17}
                    />
                  )}
                </div>
              ))}
            </Slider>
          </div>
        ) : null}
        {/* Thumb Image end */}
      </div>
    </>
  );
};

export default ProductImageGallery;
