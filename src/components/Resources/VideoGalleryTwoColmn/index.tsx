import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Modal,
} from 'react-bootstrap';
import { AiOutlineYoutube } from 'react-icons/ai';
import NextImage from "next/legacy/image";

const VideoGallery = (props) => {
    const videos = props.data;
    const [showleft, setShowLeft] = useState(false);
    const handleCloseLeft = () => setShowLeft(false);
    const handleShowLeft = () => setShowLeft(true);
    const [showright, setShowRight] = useState(false);
    const handleCloseRight = () => setShowRight(false);
    const handleShowRight = () => setShowRight(true);
    return (
        <>
            <section className="section-padding">
                <Container>
                    <Row className="justify-content-between">
                        <Col xxl={5} md={6} className="pb-4 pb-md-0">
                            <article className="text-center">
                                <div role="button" tabIndex={0} className="acc-video-image-holder position-relative" onClick={handleShowLeft} onKeyDown={handleShowLeft}>
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <NextImage
                                            src={videos.homeownersImage.url}
                                            alt={videos.homeownersTitle}
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                            className="embed-responsive-item"
                                        />
                                    </div>
                                    <AiOutlineYoutube className="text-white position-absolute acc-video-play-icon" />
                                </div>
                                <h2 className="pt-4">{videos.homeownersTitle}</h2>
                                <p>{videos.homeownersDescription}</p>
                            </article>
                            <Modal size="md" show={showleft} onHide={handleCloseLeft} className="acc-custom-modal">
                                <Modal.Body className="text-center">
                                    <iframe width="100%" height="420" src={videos.homeownersVideoLink} title={videos.homeownersTitle} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </Modal.Body>
                            </Modal>
                        </Col>
                        <Col xxl={5} md={6}>
                            <article className="text-center">
                                <div role="button" tabIndex={0} className="acc-video-image-holder position-relative" onClick={handleShowRight} onKeyDown={handleShowRight}>
                                    <div className="embed-responsive embed-responsive-16by9">
                                        <NextImage
                                            src={videos.automotiveTransportationImage.url}
                                            alt={videos.automotiveTransportationTitle}
                                            layout="fill"
                                            objectFit="cover"
                                            objectPosition="center"
                                            className="embed-responsive-item"
                                        />
                                    </div>
                                    <AiOutlineYoutube className="text-white position-absolute acc-video-play-icon" />
                                </div>
                                <h2 className="pt-4">{videos.automotiveTransportationTitle}</h2>
                                <p>{videos.automotiveTransportationDesc}</p>
                            </article>
                            <Modal size="md" show={showright} onHide={handleCloseRight} className="acc-custom-modal">
                                <Modal.Body className="text-center">
                                    <iframe width="100%" height="420" src={videos.automotiveTransportationVideoUrl} title={videos.automotiveTransportationTitle} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                                </Modal.Body>
                            </Modal>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
};

export default VideoGallery;
