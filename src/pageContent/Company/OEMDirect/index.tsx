import { useState, useEffect } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';
import { Container, Row, Col } from 'react-bootstrap';
import NextImage from "next/legacy/image";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'

const Banner = dynamic(() => import('@Components/Markets/Banner'));
const Introduction = dynamic(() => import('@Components/Markets/Introduction'));
const ImageCarousel = dynamic(() => import('@Components/Markets/ImageCarousel'));
const StaticBannerBlueBGRightImage = dynamic(() => import('@Components/Markets/StaticBannerBlueBGRightImage'));
const Faq = dynamic(() => import('@Components/Resources/Faq'));
const Tellus = dynamic(() => import('@Components/Company/OEMDirect/Contact'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));
const ContactBarSection = dynamic(() => import('@Components/ContactBar'));

const OEMDirect = ({ OEMDirectss }) => {
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    //breadcrumbs
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    
    let crumbs = [];
    let removeSpeChar = router.asPath.split('/');
    if (removeSpeChar[removeSpeChar.length - 1].includes('?')) {
        
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: ``, name: pathSegments[1] },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name: removeSpeChar[removeSpeChar.length - 1].split('?')[0] },
        ];
    }

    if (removeSpeChar[removeSpeChar.length - 1].includes('#')) {
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1] },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name: removeSpeChar[removeSpeChar.length - 1].split('#')[0] },
        ];
    }
    if (removeSpeChar[removeSpeChar.length - 1].includes('?') === false &&
        removeSpeChar[removeSpeChar.length - 1].includes('#') === false) {
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1] },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name: pathSegments[2] },
        ];
    }
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
        const hasTagUrl = () => {
            const urlContent = window.location.hash.substr(1);
            const urlId = document.getElementById(urlContent);
            if (urlId) {
                if (urlContent === 'aias-contact-form') {
                    const urlIdOffset = urlId.offsetTop;
                    window.scroll({
                        top: urlIdOffset,
                        left: 0,
                        behavior: 'smooth',
                    });
                } else if (urlContent === 'continuous-support') {
                    const windowWidth = window.innerWidth;
                    const urlIdOffset = urlId.parentElement;
                    const mainOffset = urlIdOffset.offsetParent.offsetTop;
                    if (windowWidth >= 1025) {
                        urlId.children[0].click();
                        const urlElem = mainOffset - 400;
                        window.scroll({
                            top: urlElem,
                            left: 0,
                            behavior: 'smooth',
                        });
                    } else {
                        window.scroll({
                            top: mainOffset,
                            left: 0,
                            behavior: 'smooth',
                        });
                    }
                } else {
                    const windowWidth = window.innerWidth;
                    const urlIdOffset = urlId.parentElement;
                    const mainOffset = urlIdOffset.offsetParent.offsetTop;
                    if (windowWidth >= 1025) {
                        urlId.children[0].click();
                        const urlElem = mainOffset - 650;
                        window.scroll({
                            top: urlElem,
                            left: 0,
                            behavior: 'smooth',
                        });
                    } else {
                        window.scroll({
                            top: mainOffset,
                            left: 0,
                            behavior: 'smooth',
                        });
                    }
                }
            }
        };
        setTimeout(() => {
            hasTagUrl();
        }, 1000);
    }, []);
    return (
        <>
            <BreadCrumbs crumbs={crumbs}/>
            {(OEMDirectss) ? OEMDirectss.map((rows) => (
                <div key={`oem_${rows.id}`}>
                    <Banner
                        windowSize={windowSize}
                        windowObj={windowObj}
                        bannerList={rows.banner}
                        customStyle='acc-oem-direct-banner'
                    />
                    <Introduction dataobj={rows.pages} winSize={windowSize} customStyle="acc-custom-introduction" />

                    {/* contact bar section start */}
                    <ContactBarSection content={rows.contactBar} />
                    {/* contact bar section end */}
                    
                    <section className='section-padding text-center text-lg-left acc-oem-desc acc-custom-icon-col-sec'>
                        <Container fluid>
                            <Row>
                                {(rows.section1ImageGallery)
                                    ? rows.section1ImageGallery.map((EachImage) => (
                                        <Col lg={6} key={`oemsub_${EachImage.id}`} className="pb-5">
                                            <Row>
                                                <Col lg={2}>
                                                    <div className="d-flex justify-content-center acc-oem-desc-icon">
                                                        <NextImage
                                                            src={EachImage.galleryImages.url}
                                                            alt="Placeholder"
                                                            layout="intrinsic"
                                                            objectFit="contain"
                                                            objectPosition="right"
                                                            width={99}
                                                            height={117}
                                                        />
                                                    </div>
                                                </Col>
                                                <Col>
                                                    <article>
                                                        <h3>{EachImage.imageTitle}</h3>
                                                        <p>{EachImage.imageDescription}</p>
                                                    </article>
                                                </Col>
                                            </Row>
                                        </Col>
                                    )) : ''}
                                <Col lg={6}>
                                <article className={`border border-medium p-4 text-center acc-border-box ${(windowObj && windowSize.width > 1024) ? 'w-100 mx-auto' : ''}`}>
                                        <h1 className="m-0 pb-3">{rows.section1BlockTitle}</h1>
                                        <a href={rows.section1BlockLink}>
                                            {rows.section1BlockLinkText}
                                        </a>
                                    </article>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <StaticBannerBlueBGRightImage
                        data={rows.section2FixedSlider}
                        winSize={windowSize}
                    />
                    <Introduction
                        dataTitle={rows.section3Title}
                        dataDesc={rows.section3Description}
                        winSize={windowSize}
                    />
                    <ImageCarousel data={rows.section4ImageGalleries} slidestoshow="4" slidestoscroll="4" winSize={windowSize} />
                    <Introduction dataTitle={rows.section5AccordionHeading} winSize={windowSize} customStyle="pb-0" />
                    <section className="section-padding pt-0">
                        <Container>
                            <Faq data={rows.section5Accordion} />
                        </Container>
                    </section>
                    <div id="aias-contact-form">
                        <Tellus />
                    </div>
                </div>
            )) : ''}

        </>
    );
};

export default OEMDirect;
