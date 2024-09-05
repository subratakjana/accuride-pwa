import { useState, useEffect, createRef } from 'react';
import { Button } from 'react-bootstrap';
import ImageGallery from 'react-image-gallery';
import Image from 'next/legacy/image';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';

const ProductMediaGallery = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  let mediaGalleryImages = props.mediaGallery.media_gallery;
  if (props.selectedSku) {
    const selectedVariants = props.mediaGallery.variants.find(
      (item) => item.product.sku === props.selectedSku
    );
    if (selectedVariants.product.media_gallery.length > 0) {
      mediaGalleryImages = selectedVariants.product.media_gallery;
    }
  }
  const imageGallaryObj = createRef(); // create image gallary referance.
  // image gallary with video state handling.
  const [showVideo, setVideo] = useState({
    showPlayButton: true,
    showGalleryFullscreenButton: true,
    showGalleryPlayButton: true,
    videoUrl: false,
    startIndex: 0,
    paused: false,
  });
  // toggle show video button state ready and update.
  const toggleShowVideo = (item) => {
    showVideo.videoUrl = item.embedUrl;
    if (showVideo.videoUrl) {
      if (showVideo.showPlayButton) {
        showVideo.showGalleryPlayButton = false;
      }

      if (showVideo.showFullscreenButton) {
        showVideo.showGalleryFullscreenButton = false;
      }
    }
    showVideo.startIndex = imageGallaryObj.current
      ? imageGallaryObj.current.state.currentIndex
      : 0;
    setVideo({ ...showVideo });
  };

  // render image gallary video iframe or play button from state chacking.
  const renderVideo = (item) => (
    <div>
      {showVideo.videoUrl && item.index === showVideo.startIndex ? (
        <div className="image-gallary-video">
          {!item.isVimeo ? (
            <iframe
              title="video-gallary"
              width="100%"
              height="315"
              src={`${item.embedUrl}?autoplay=1&rel=0&controls=0`}
              frameBorder="0"
              allowFullScreen
            />
          ) : (
            <iframe
              title="video-gallary"
              width="100%"
              height="315"
              src={`https://player.vimeo.com/video/${item.embedUrl}?autoplay=1&controls=1`}
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <a
          aria-label="link"
          onKeyDown={toggleShowVideo.bind(this, item)}
          role="button"
          tabIndex="0"
          onClick={toggleShowVideo.bind(this, item)}
        >
          <span className="play-button">&nbsp;</span>
          <Image
            priority="true"
            src={item.original}
            alt=""
            width={580}
            height={400}
          />
          {item.description && (
            <span
              className="image-gallery-description positionRight positionLeftInitial"
            >
              {item.description}
            </span>
          )}
        </a>
      )}
    </div>
  );
  /**
   * youtube url parser
   * from url get id.
   */
  const youtubeParser = (url) => {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  // ready image gallary items and video from props mediagallary.
  const galleryImages = mediaGalleryImages.map((item, index) => {
    let images = {
      original: item.gallery_url,
      thumbnail: item.url,
      index,
    };

    if (
      item.video_content &&
      item.video_content.video_url.includes('youtube.com')
    ) {
      // video id sending with watch format change to embed format.
      let videoId = youtubeParser(item.video_content.video_url);
      if (videoId) {
        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
          videoId = videoId.substring(0, ampersandPosition);
        }
        const embedLink = `https://www.youtube.com/embed/${videoId}`;
        images = {
          ...images,
          embedUrl: embedLink,
          renderItem: renderVideo.bind(this),
          thumbnailClass: 'video-thumb',
        };
      }
    }

    if (
      item.video_content &&
      item.video_content.video_url.includes('vimeo.com')
    ) {
      // video id sending with watch format change to embed format.
      const videoId = item.video_content.video_url.split('vimeo.com/')[1];
      if (videoId) {
        images = {
          ...images,
          embedUrl: videoId,
          isVimeo: true,
          renderItem: renderVideo.bind(this),
          thumbnailClass: 'video-thumb',
        };
      }
    }
    return images;
  });

  /**
   *  on slide change if store a video link in state remove.
   * once youtube video play and swith slide video will stop playing.
   * */
  const onSlide = () => {
    showVideo.startIndex = imageGallaryObj.current
      ? imageGallaryObj.current.state.currentIndex
      : 0;
    setVideo({ ...showVideo });
  };

  const onBeforeSlide = (nextIndex) => {
    showVideo.startIndex = nextIndex;
    showVideo.videoUrl = false;
    setVideo({ ...showVideo });
  };

  /**
   * click on image gallery item trigger slider fullscreen mode.
   */
  const clickOnSlide = () => {
    if (!imageGallaryObj.current.state.isFullscreen)
      imageGallaryObj.current.toggleFullScreen();
  };

  /**
   * image gallery close fullscreen mode function.
   */
  const closeFullscreen = () => {
    imageGallaryObj.current.toggleFullScreen();
  };

  /**
   * custom image gallery fullscreen button function and return custom html.
   */
  const customFullscreenButton = () => {
    const { isFullscreen } = imageGallaryObj.current
      ? imageGallaryObj.current.state
      : false;
    return isFullscreen ? (
      <div className="d-flex bg-primary acc-custom-fullscreen justify-content-between align-items-center">
        <Button
          variant="link"
          className={`acc-fullscreen-btn${isFullscreen ? ' active' : ''}`}
          onClick={() => closeFullscreen()}
        >
          <ReactSVG
            src="/assets/images/icons/close.svg"
            className="acc-product-close-icon"
          />
        </Button>
        <I18nLink href="/">
          <a aria-label="link" className="logo-icon">
            <ReactSVG
              className="fill-white acc-product-logo-icon"
              src="/assets/images/accuride-logo-icon.svg"
            />
          </a>
        </I18nLink>
      </div>
    ) : (
      ''
    );
  };

  return (
    <div className="acc-product-gallery">
      <ImageGallery
        renderFullscreenButton={() => customFullscreenButton()}
        ref={imageGallaryObj}
        items={galleryImages}
        useBrowserFullscreen={false}
        showPlayButton={false}
        showNav={!(windowObj && windowSize.width <= 1024)}
        onSlide={() => onSlide()}
        onBeforeSlide={(nextIndex) => onBeforeSlide(nextIndex)}
        onClick={() => clickOnSlide()}
        lazyLoad
        showBullets={galleryImages.length > 1}
        startIndex={showVideo.startIndex}
      />
    </div>
  );
};

export default ProductMediaGallery;
