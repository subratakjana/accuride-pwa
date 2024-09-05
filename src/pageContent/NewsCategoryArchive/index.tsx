import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import NewsSingle from '@PageContent/NewsSingle';
import ResponsiveEmbed from 'react-bootstrap/ResponsiveEmbed';
import dynamic from 'next/dynamic';
import NextImage from "next/legacy/image";

const NewsList = dynamic(() => import('@Components/News/NewsList'));
const NewsCategoryMenu = dynamic(() => import('@Components/NewsCatMenu'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const NewsCatArchive = ({ archiveNewsLists, newsSingleResp }) => {
    const router = useRouter();
    // breadcrumbs
    const pathSegments = router.asPath.split('/').filter((segment) => segment);

    let crumbs = [];

    if (pathSegments[pathSegments.length - 1] === 'pressreleases') {
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1] },
            { url: '', name: 'Press Releases' },

        ];
    } if (pathSegments[pathSegments.length - 1] === 'inthenews') {
        crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1] },
            { url: '', name: 'In The News' },

        ];
    }
    const clickScrollTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth',
        });
    };

    return (
        ((router && router.asPath.includes('/category/')) && archiveNewsLists && archiveNewsLists.length > 0)
            ? (
                <>
                    <BreadCrumbs crumbs={crumbs} />
                    <div className="news-scroll-top-btn d-xl-block d-none position-fixed" role="button" tabIndex="0" onClick={clickScrollTop} onKeyDown={clickScrollTop}>
                        <FaRegArrowAltCircleUp />
                    </div>
                    {archiveNewsLists ? archiveNewsLists[0].pages.map((EachPage) => (
                        <section key={`banner_${EachPage.banner.id}`} className="acc-news-main-banner acc-small-banner position-relative">
                            <Container>
                                <article className="position-absolute w-25 acc-banner-caption z-index-1">
                                    {(EachPage.banner.bannerHeading) ? <h2 className="text-white">{EachPage.banner.bannerHeading}</h2> : ''}
                                    {(EachPage.banner.bannerDescription) ? <p className="text-white">{EachPage.banner.bannerDescription}</p> : ''}
                                </article>
                            </Container>
                            {(EachPage.banner.bannerImage)
                                ? EachPage.banner.bannerImage.map((bannerimage) => (
                                    <ResponsiveEmbed aspectRatio="1by1">
                                        <NextImage
                                            src={bannerimage.url}
                                            alt={EachPage.banner.bannerHeading}
                                            objectFit="cover"
                                            objectPosition="center"
                                            layout="fill"
                                            key={bannerimage.id}
                                        />
                                    </ResponsiveEmbed>
                                )) : ''}
                        </section>
                    )) : ''}
                    <section>
                        <NewsCategoryMenu data={archiveNewsLists[0]} />
                    </section>
                    <section className="section-padding acc-blog-page">
                        <Container>
                            <NewsList data={archiveNewsLists} />
                        </Container>
                    </section>
                </>
            )
            : <NewsSingle key="cateKeyNews" newssingles={newsSingleResp} />
    );
};
export default NewsCatArchive;
