import { useState, useEffect } from 'react';
import {
    Container,
} from 'react-bootstrap';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Banner = dynamic(() => import('@Components/Markets/Banner'));
const PaginateComponent = dynamic(() => import('@Components/Resources/Cads/PaginateComponent'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const CadsLists = ({ Cadsspecs }) => {
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    //breadcrumbs
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    const crumbs = [
        { url: `/${router.query.zone_lang}`, name: 'Home' },
        { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1]},
        { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name: 'CADS' },
    ];
    
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);

    return (
        <>
            <BreadCrumbs crumbs={crumbs}/>
            {(Cadsspecs) ? Cadsspecs.map((rows) => (
                <div key={`${rows.id}_cads`}>
                    <Banner windowSize={windowSize} windowObj={windowObj} bannerList={rows.banner} customStyle="acc-small-banner" />
                    <section className="section-padding acc-cads-page">
                        <Container>
                            <div className={`${(windowObj && windowSize.width > 1024) ? 'w-75 mx-auto' : ''}`}>
                                <PaginateComponent
                                    itemsperpage={20}
                                    nocolumns={2}
                                    items={rows.cadAllLinks}
                                    pagesspan={6}
                                />
                            </div>
                        </Container>
                    </section>
                </div>
            )) : ''}
        </>
    );
};

export default CadsLists;
