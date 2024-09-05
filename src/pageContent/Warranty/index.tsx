import { useState } from 'react';
import { Container } from 'react-bootstrap';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Banner = dynamic(() => import('@Components/Markets/Banner'));
const FAQ = dynamic(() => import('@Components/Resources/Faq'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const Warranty = ({ warranties, breadcrumb = true }) => {
    const windowSize = useWindowDimensions();
    const [windowObj] = useState(false);
    //breadcrumbs
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    
    let crumbs = [];
    let removeSpeChar = router.asPath.split('/');
    if (removeSpeChar[removeSpeChar.length - 1].includes('?')) {
        
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: removeSpeChar[removeSpeChar.length - 1].split('?')[0],  },
        ];
    }

    if (removeSpeChar[removeSpeChar.length - 1].includes('#')) {
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: removeSpeChar[removeSpeChar.length - 1].split('#')[0] },
        ];
    }
    if (removeSpeChar[removeSpeChar.length - 1].includes('?') === false &&
        removeSpeChar[removeSpeChar.length - 1].includes('#') === false) {
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1]},
        ];
    }
    return (
        <>
            {breadcrumb && <BreadCrumbs crumbs={crumbs} />}
            {(warranties) ? warranties.map((rows) => (
                <div key={`warr_${rows.id}`}>
                    <Banner
                        windowSize={windowSize}
                        windowObj={windowObj}
                        bannerList={rows.banner}
                        customStyle="acc-small-banner"
                    />
                    <section className="section-padding">
                        <Container>
                            <FAQ data={rows.section1Accordion} />
                        </Container>
                    </section>
                </div>
            )) : ''}
        </>
    );
};

export default Warranty;
