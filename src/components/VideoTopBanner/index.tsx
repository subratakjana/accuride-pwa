import { useEffect, useState } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';
import { useRouter } from 'next/router';
import NextImage from "next/legacy/image";

const VideoTopBanner = (props) => {
    const { data, mobileData, customStyle } = props;
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    const router = useRouter();
    const pathName = router.asPath;
    useEffect(() => {
        if (windowSize.width !== 0) updateWindowObj(true);
    }, []);
    useEffect(() => {
        setTimeout(() => {
            if (pathName === `/${router.query.zone_lang}/products/specialty-slides/roller-bearing-slides`) {
                const bannerVideoID = document.getElementById('vid');
                if (bannerVideoID) {
                    bannerVideoID.play();
                }
            }
        }, 1000);
    }, []);
    return (
        <>
            {(data) ? (
                <section className={`acc-top-video-banner ${customStyle}`}>
                    {(windowObj && windowSize.width > 767) ? (
                        <video width="100%" autoPlay muted loop id="vid">
                            <source src={data.url} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ) : (
                        <div className="acc-main-video-banner">
                            <NextImage
                                src={mobileData.url}
                                alt=""
                                objectFit="cover"
                                objectPosition="center"
                                layout="fill"
                                className="acc-video-banner-image"
                            />
                        </div>
                    )}
                </section>
            ) : null}
        </>
    );
};

export default VideoTopBanner;
