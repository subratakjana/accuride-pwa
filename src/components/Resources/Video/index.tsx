import { useState } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Banner = dynamic(() => import('@Components/Markets/Banner'));
const Introduction = dynamic(() => import('@Components/Markets/Introduction'));
const VideoGallery = dynamic(() => import('@Components/Resources/VideoGalleryTwoColmn'));
const VideoCarousel = dynamic(() => import('@Components/Resources/VideoCarousol'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const Video = ({ videoGallery }) => {
    const windowSize = useWindowDimensions();
    const [windowObj] = useState(false);
    //breadcrumb
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    const crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1] },
            { url: ``, name: 'Videos'},
        ];
    return (
        <>
            {(videoGallery) ? videoGallery.map((rows) => (
                <div key={`${rows.id}_videogallery`}>
                    <BreadCrumbs crumbs={crumbs}/>
                    <Banner windowSize={windowSize} windowObj={windowObj} bannerList={rows.banner} customStyle="acc-video-banner" />
                    <Introduction dataobj={rows.pages} winSize={windowSize} />
                    <VideoGallery data={rows} />
                    <VideoCarousel title={rows.section2Title} data={rows.section2VideoGallery} />
                    <VideoCarousel title={rows.section3Title} data={rows.section3VideoGallery} />
                    <VideoCarousel title={rows.section4Title} data={rows.section4VideoGallery} />
                    <VideoCarousel title={rows.section5Title} data={rows.section5VideoGallery} />
                    <VideoCarousel title={rows.section6Title} data={rows.section6VideoGallery} />
                    <VideoCarousel title={rows.section7Title} data={rows.section7VideoGallery} />
                    <VideoCarousel title={rows.section8Title} data={rows.section8VideoGallery} />
                    <VideoCarousel title={rows.section9Title} data={rows.section9VideoGallery} />
                </div>
            )) : ''}
        </>
    );
};

export default Video;
