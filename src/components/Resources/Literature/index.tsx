import { useState } from 'react';
import {
    Container, Row, Col, Button, Modal,
} from 'react-bootstrap';
import NextImage from "next/legacy/image";
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Banner = dynamic(() => import('@Components/Markets/Banner'));
const BinderRequest = dynamic(() => import('@Components/Resources/Literature/BinderRequest'));
const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));

const LiteratureDoc = ({ literarures }) => {
    const windowSize = useWindowDimensions();
    const [windowObj, updateWindowObj] = useState(false);
    const [show, setShow] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    //breadcrumb
    const router = useRouter();
    const pathSegments = router.asPath.split('/').filter((segment) => segment);
    const crumbs = [
            { url: `/${router.query.zone_lang}`, name: 'Home' },
            { url: `/${router.query.zone_lang}/${pathSegments[1]}`, name: pathSegments[1]},
            { url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`, name:'Literature' },
    ];
    
    const handleShow = (e) => {
        const pdfPath = e.target.getAttribute('data-url');
        if (pdfPath !== '' || pdfPath !== '#') {
            setShow(true);
            setPdfUrl(pdfPath);
        }
    };
    const handleClose = () => setShow(false);

    const onButtonClick = () => {
        const selElement = document.getElementById('binder-form');
        const selParnetElement = document.getElementsByClassName('acc-cms-custom-accordion')[0].children;
        if (selParnetElement[0].children[1].classList.contains('show') === false) {
            selElement.click();
        }
    };

    return (
        <>
            <BreadCrumbs crumbs={crumbs}/>
            <Banner windowSize={windowSize} windowObj={windowObj} bannerList={literarures[0].banner} customStyle="acc-small-banner" />
            <BinderRequest />
            {(literarures) ? literarures.map((rows) => (
                <div key={`${rows.id}_literature`}>
                    {/* <SeoDetails pageSlug={rows.pages.pageSlug} /> */}
                    <section className="section-padding">
                        <Container>
                            <h2 className="text-center text-lg-left m-0 pb-3">LITERATURE DOWNLOADS</h2>
                            <Row>
                                {(rows.literatureDownloadsBlocks)
                                    ? rows.literatureDownloadsBlocks.map((listdata) => (
                                        <Col key={`${listdata.id}_liters`} sm={6} lg={3} className="pb-5">
                                            <article className="text-center acc-literature-content">
                                                <NextImage
                                                    src={listdata.image.url}
                                                    alt={listdata.title}
                                                    layout="intrinsic"
                                                    objectFit="contain"
                                                    objectPosition="center"
                                                    width={211}
                                                    height={211}
                                                />
                                                <div className="acc-literature-content-body">
                                                    <h5 className="m-0 py-3">{listdata.title}</h5>
                                                </div>
                                                <div className="acc-literature-bttn text-center">
                                                    {(listdata.buttonLabel === 'Download')
                                                        ? (
                                                            <Button
                                                                data-url={listdata.buttonLink}
                                                                onClick={handleShow}
                                                                onKeyDown={handleShow}
                                                                className={`text-uppercase ${(windowObj && windowSize.width < 576) ? 'btn-block' : ''}`}
                                                            >
                                                                {listdata.buttonLabel}
                                                            </Button>
                                                        )
                                                        : (
                                                            <a href="#binder-form" onClick={onButtonClick} className={`text-uppercase btn btn-primary ${(windowObj && windowSize.width < 576) ? 'btn-block' : ''}`}>{listdata.buttonLabel}</a> 
                                                        )}
                                                </div>
                                            </article>
                                        </Col>
                                    )) : '' }
                            </Row>
                            <Modal size="md" show={show} onHide={handleClose} className="acc-custom-modal">
                                <Modal.Body className="text-center">
                                    <iframe width="100%" height="600" src={pdfUrl} title="video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </Modal.Body>
                            </Modal>
                        </Container>
                    </section>
                </div>
            )) : ''}
        </>
    );
};

export default LiteratureDoc;
