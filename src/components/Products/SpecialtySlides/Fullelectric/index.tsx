import { useState, useEffect, useRef } from 'react';
import {
    Container,
    Card,
    Row,
    Col,
    Modal,
} from 'react-bootstrap';
import useWindowDimensions from '@Hooks/windowDimention';
import NextImage from "next/legacy/image";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));
import Introduction from '@Components/Markets/Introduction';
import TabSection from '@Components/Markets/TabSection';
import ImageSlider from '@Components/Markets/ImageSlider';
import ScrollAnimation from 'react-animate-on-scroll';
import Slider from 'react-slick';
import { BsPlus } from 'react-icons/bs';

const Fullelectrics = ({fullelectrics}) => {
    const sliderRef = useRef(null);
    const windowSize = useWindowDimensions();
    const [showVideo, setShowVideo] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const [dotActive, setDotActive] = useState(null);
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    const crumbs = [
        { url: `/${router.query.zone_lang}`, name: 'Home' },
        { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1] },
        { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name: pathSegments[2] },
        { url: ``, name: 'Fullelectric-Ball-Bearing-Slides' }
    ];
    

    const toBase64 = (str) => (typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str));

    const handleVideoClose = () => setShowVideo(false);
    const handleVideoShow = (e) => {        
        setShowVideo(true);
        const getVideoUrl = e.target.getAttribute('data-url');
        setVideoUrl(getVideoUrl);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleVideoShow();
        }
    };

    const sliderSettings1 = {
        dots: false,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 5,
        rows: 1,
        focusOnSelect: true,
        centerMargin: '15px',
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                    arrows: false,
                    rows: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: true,
                    arrows: false,
                    rows: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: false,
                    rows: 1,
                },
            },
        ],
    };

    useEffect(() => {
        const initialDot = document.getElementById('dot-id-0');
        if(initialDot) {
            initialDot.click();
        }
    }, []);

    const goToSlide = (index) => {
        setDotActive(index);
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(index);
        }
    };
    const goToDot = (index) => {
        setDotActive(index);
        const initialDot = document.getElementById(`dot-id-${index}`);
        if(initialDot) {
            initialDot.click();
        }
    };
    
    return fullelectrics ? <>
        <BreadCrumbs crumbs={crumbs} />
        <div className='acc-full-electrics-page'>
            {/**Banner Start */}
            <div className='acc-full-electrics-banner'>
                <NextImage
                    src={fullelectrics.banner.multiImages[2].url}
                    alt="Accuride"
                    layout="fill"
                    height="410"
                    objectFit="contain"
                    objectPosition="right"
                    key=''
                    className="acc-full-electrics-banner-img"
                />
                <Container>
                    <Row>
                        <Col lg={12} xs={7}>
                            <article className="position-relative acc-banner-caption">
                                <div className='acc-full-electrics-logo'>
                                    <NextImage
                                        src={fullelectrics.banner.multiImages[0].url}
                                        width={528}
                                        height={52}
                                        alt="Accuride"
                                    />
                                </div>
                                <h1>{fullelectrics.banner.bannerTitles[0]}</h1>
                                <div className='acc-full-electrics-product-img'>
                                    <NextImage
                                        src={fullelectrics.banner.multiImages[1].url}
                                        width={710}
                                        height={280}
                                        alt="Accuride"
                                    />
                                </div>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/**Banner End */}

            {/**Section1 Title With Description Start */}
            <Introduction
                dataTitle={fullelectrics.section1TitleWithDescription.title[0]}
                dataDesc={fullelectrics.section1TitleWithDescription.description[0].html}
                winSize={windowSize}
                customStyle='acc-custom-introduction'
            />
            {/**Section1 Title With Description End */}
            
            {/**Section2 Title Start */}
            <section className="text-center acc-custom-sec-title pt-4 pt-md-5">
                <Container>
                    <h2>{fullelectrics.section2Title}</h2>
                </Container>
            </section>
            {/**Section2 Title End */}
            {/* Section2 Component */}
            <TabSection tabList={fullelectrics.section2TabArea} PointerDisplay="false" customStyle="acc-market-constrail-tab" />
            {/* Section2 Component End */}
            {/* Section3 Component */}
            <section className="section-padding acc-drawer-slide-animation">
                <Container>
                    <div className="acc-slides-image-wrap w-75 mx-auto acc-slides-undermount position-relative">
                        <ScrollAnimation animateIn="fadeIn" animateOnce>
                        {[...Array(7)].map((_, index) => (
                            <div
                                id={`dot-id-${index}`}
                                key={`card-${index}`}
                                title={`card-${index}`}
                                tabIndex={0}
                                role="button"
                                onClick={() => goToSlide(index.toString())}
                                className={`dot dot-${index} position-absolute rounded-circle ${dotActive === index.toString() ? 'active' : ''}`}
                            >
                                <BsPlus />
                            </div>
                        ))}
                    </ScrollAnimation>
                        <ScrollAnimation animateIn="fadeIn">
                            <div className='acc-next-img acc-pdct-anim-img-dwr-sld-3100'>
                                <NextImage src={fullelectrics.section3SliderImage.url} alt={fullelectrics.section3SliderImage.fileName} width={1014} height={624} objectFit="contain" />
                            </div>
                        </ScrollAnimation>
                    </div>
                    <ScrollAnimation animateIn="fadeIn" animateOnce>
                        <Slider ref={sliderRef} {...sliderSettings1} className="pt-5">
                            {(fullelectrics.section3SliderDescription)
                                ? fullelectrics.section3SliderDescription.map((items, indx) => (
                                    <Card 
                                        id={`card-${indx}`} 
                                        key={`${items.id}_slideani`} 
                                        onClick={() => goToDot(indx.toString())}
                                        className={`border-0 text-center ${((dotActive === `${indx}`) ? 'acc-drawerslides-ani-bg' : '')}`}
                                    >
                                        <Card.Body>
                                            <h3>{items.cardTitle}</h3>
                                            {(items.cardDescription) ? <Card.Text>{items.cardDescription}</Card.Text> : '' }
                                        </Card.Body>
                                    </Card>
                                )) : ''}
                        </Slider>
                    </ScrollAnimation>
                </Container>
            </section>
            {/* Section3 Component End */}
            {/**Section5 Title With Description Start */}
            <Introduction
                dataTitle={fullelectrics.section5TitleWithDescription.title[0]}
                dataDesc={fullelectrics.section5TitleWithDescription.description[0].html}
                ifButton={true}
                buttonLink={fullelectrics.section5TitleWithDescription.button.buttonLink}
                buttonText={fullelectrics.section5TitleWithDescription.button.buttonText}
                winSize={windowSize}
                customStyle='acc-custom-introduction'
            />
            {/**Section5 Title With Description End */}
            {/* Section8 Component Start */}
            <div className="section-padding text-center acc-slide-full-extension">
                <Container>
                        <NextImage
                            src={fullelectrics.section8VideoImage.url}
                            width={1400}
                            height={600}
                            alt="FullElectrics Slide Full Extension"
                            layout="intrinsic"
                            objectFit="contain"
                            objectPosition="center"
                            placeholder="blur"
                            blurDataURL={`data:image/svg+xml;base64,${toBase64('/assets/images/icons/imageLoader.svg')}`}
                            data-url={fullelectrics.section8VideoLink} onClick={handleVideoShow} onKeyDown={handleKeyPress} role="button" tabIndex={0}
                        />
                </Container>
            </div>
            {/* Section8 Component End */}
            {/* Section9 Component Start*/}
            <ImageSlider slider={false} ImageSliders={fullelectrics.section9StaticBanner} title={fullelectrics.section9Title} description={fullelectrics.section9Description} customStyle="acc-custom-jeeves-service-robot" />
            {/* Section9 Component End */}
        </div>
        <Modal size="md" show={showVideo} onHide={handleVideoClose} className="acc-custom-modal" centered>
            <Modal.Body className="text-center">
                <iframe width="100%" height="420" src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1`} title="video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
            </Modal.Body>
        </Modal>
    </>: null;
};

export default Fullelectrics;