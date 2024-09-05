import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { Col, Row } from 'react-bootstrap';

const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const Reviews = () => {
  // breadcrumbs
  const router = useRouter();
  const [isYotpoLoaded, setIsYotpoLoaded] = useState(true);

  useEffect(() => {
    const checkYotpo = () => {
      if (window && window.yotpo) {
        setIsYotpoLoaded(true);
        try {
          window.yotpo.initWidgets();
        } catch (error) {
          window.yotpo.refreshWidgets();
          console.error('Yotpo widget error:', error);
        }
      } else {
        setIsYotpoLoaded(false);
      }
    };

    if (!window.yotpo) {
      setTimeout(checkYotpo, 300);
    } else {
      checkYotpo();
    }
  }, []);

  const pathSegments = router.asPath.split('/').filter((segment) => segment);
  let crumbs = [];
  const removeSpeChar = router.asPath.split('/');
  if (removeSpeChar[removeSpeChar.length - 1].includes('?')) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: 'Home' },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split('?')[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes('#')) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: 'Home' },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split('?')[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes('?') === false &&
    removeSpeChar[removeSpeChar.length - 1].includes('#') === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: 'Home' },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split('?')[0],
      },
    ];
  }

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="customReviewPage">
        <header className="bg-primary py-2 py-md-3 header-review">
          <h3 className="d-block m-0 text-center font-weight-500 text-white">
            Accuride Reviews
          </h3>
        </header>
        <section className={`${isYotpoLoaded ? 'section-padding pt-0' : ''}`}>
          <Container>
            {isYotpoLoaded ? (
              <Row>
                <Col md={11} lg={10} className="m-auto">
                  <div id="yotpo-testimonials-custom-tab" />
                </Col>
              </Row>
            ) : (
              <div className="d-flex flex-column acc_not_found_review py-4 py-md-5 text-center">
                <ReactSVG
                  src="/assets/images/icons/not_found.svg"
                  className="text-primary mx-auto mb-3 mb-md-4 acc-reviews-not-found-icon"
                />
                <p className="text-muted h5 mb-0">
                  We're having trouble loading reviews right now. Please check
                  back shortly.
                </p>
              </div>
            )}
          </Container>
        </section>
      </section>
    </>
  );
};

export default Reviews;
