import { useState } from 'react';
import {
    Container, Modal, Button,
} from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { AiOutlineYoutube } from 'react-icons/ai';
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri';
import Slider from 'react-slick';
import NextImage from "next/legacy/image";

// slick next arrow
const SlickNextArrow = (props) => {
    const { className, onClick } = props;
    return (
        <>
            <Button
                className={`p-0 ${className}`}
                onClick={onClick}
                variant="link"
            >
                <RiArrowRightSLine size="3rem" />
            </Button>
        </>
    );
};
// slick prev arrow
const SlickPrevArrow = (props) => {
    const { className, onClick } = props;
    return (
        <>
            <Button
                className={`p-0 ${className}`}
                onClick={onClick}
                variant="link"
            >
                <RiArrowLeftSLine size="3rem" />
            </Button>
        </>
    );
};

const VideoCarousel = (props) => {
    const categoryTitle = props.title;
    const videos = props.data;
    // For video modal
    const [show, setShow] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true);
        const getVideoUrl = e.target.getAttribute('data-url');
        setVideoUrl(getVideoUrl);
    };
    // End
    const sliderSettings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        nextArrow: <SlickNextArrow />,
        prevArrow: <SlickPrevArrow />,
        responsive: [
            {
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <>
            <section className="section-padding acc-video-slider">
                <Container fluid>
                    <h2 className="pb-3 m-0">{categoryTitle}</h2>
                    <Slider {...sliderSettings} className="pl-lg-3 pr-lg-3">
                        {(videos) ? videos.map((video) => (
                            <div key={`${video.id}_carousel`}>
                                <div className="acc-video-slide-image">
                                    <div className="position-relative">
                                        <div className="position-absolute top left w-100 h-100 acc-video-onclick-wrap" data-url={video.videoLink} onClick={handleShow} onKeyDown={handleShow} role="button" tabIndex={0}> </div>
                                        {(video.image) ? (
                                            <div className="embed-responsive embed-responsive-4by3">
                                                <NextImage
                                                    src={video.image.url}
                                                    alt={video.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    objectPosition="center"
                                                    className="embed-responsive-item"
                                                />
                                            </div>
                                        ) : ''}
                                        <AiOutlineYoutube className="text-white position-absolute acc-video-slider-play-icon" />
                                    </div>
                                    <p className="m-0 pt-3 text-center">{video.title}</p>
                                </div>
                            </div>
                        )) : ''}
                    </Slider>
                </Container>
                <Modal size="md" show={show} onHide={handleClose} className="acc-custom-modal">
                    <Modal.Body className="text-center">
                        <iframe width="100%" height="420" src={videoUrl} title="video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </Modal.Body>
                </Modal>
            </section>
        </>
    );
};

export default VideoCarousel;
