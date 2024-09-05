import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router'

const Banner = dynamic(() => import('@Components/Markets/Banner'));
const Introduction = dynamic(() => import('@Components/Markets/Introduction'));
const TwoColumnSection = dynamic(() => import('@Components/Resources/TwoColumnSection'));
const Accordion = dynamic(() => import('@Components/Resources/Accordion'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const AboutSlides = ({ AboutSlide }) => {
    const windowSize = useWindowDimensions();
    const [windowObj] = useState(false);
    //breadcrumb
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    const crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1]},
            { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name: 'About Slides' },
    ];
    useEffect(() => {
        const hasTagUrl = () => {
            const urlContent = window.location.hash.substr(1);
            const urlId = document.getElementById(urlContent);
            if (urlId) {
                const urlIdOffset = urlId.offsetTop;
                window.scroll({
                    top: urlIdOffset,
                    left: 0,
                    behavior: 'smooth',
                });
            }
        };
        setTimeout(() => {
            hasTagUrl();
        }, 1000);
    }, []);

    return (
        <>
            <BreadCrumbs crumbs={crumbs}/>
            {(AboutSlide) ? AboutSlide.map((rows) => (
                <div key={`${rows.id}_abtslide`}>
                    <Banner windowSize={windowSize} windowObj={windowObj} bannerList={rows.banner} />
                    <Introduction dataobj={rows.pages} winSize={windowSize} />
                    <TwoColumnSection
                        winSize={windowSize}
                        dataImage={rows.section1Image}
                        dataTitle={rows.section1Title}
                        dataDesc={rows.section1Description}
                        customId="slide-terminology"
                    />
                    <section className="section-padding">
                        <Container>
                            <Accordion data={rows.section2Accordion} />
                        </Container>
                    </section>
                    <TwoColumnSection
                        winSize={windowSize}
                        dataImage={rows.section3Image}
                        dataTitle={rows.section3Title}
                        dataDesc={rows.section3Description.html}
                        dataPop={rows.buttonLink}
                        dataBtnLabel={rows.buttonLabel}
                        customId="slide-components"
                    />
                    <section className="section-padding">
                        <Container>
                            <Accordion data={rows.section4Accordion} />
                        </Container>
                    </section>
                </div>
            )) : ''}
        </>
    );
};

export default AboutSlides;
