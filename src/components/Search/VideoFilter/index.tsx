import { useState } from 'react';
import { Col, Modal } from 'react-bootstrap';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import NextImage from "next/legacy/image";

const VideoFilter = (props) => {
    const { product, isListView } = props;
    const [show, setShow] = useState(false);
    const [videoUrl, setVideoUrl] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(true);
        const getVideoUrl = e.target.getAttribute('data-url');
        const urlArr = getVideoUrl.split('=');
        const embUrl = urlArr[1];
        setVideoUrl(embUrl);
    };

    const [imgError, setImgError] = useState(false);
    const picture = new Image();

    const toBase64 = (str) => (typeof window === 'undefined'
        ? Buffer.from(str).toString('base64')
        : window.btoa(str));

    const nextPlaceHolder = () => (
        <NextImage
            src="/assets/images/demo-placeholder-350-314.png"
            width={250}
            height={250}
            layout="intrinsic"
            alt="Accuride"
            className={`img ${isListView ? 'acc-list-img' : ''}`}
        />
    );

    const productImage = (image, altText, vidUrl) => {
        picture.src = image;
        picture.onerror = () => setImgError(true);
        return imgError ? nextPlaceHolder() : (
        <NextImage
            src={image}
            alt={altText}
            objectFit="contain"
            objectPosition="center"
            layout="intrinsic"
            width={250}
            height={250}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64('/assets/images/icons/imageLoader.svg')}`}
            className={`img ${isListView ? 'acc-list-img' : ''}`}
        />
        );
    };

    return (
        <>
            <Col sm={4} xl={isListView ? '12' : ''} className={`acc-product-block mb-3 d-flex align-items-center px-2 ${isListView ? 'col-xxl-12 flex-row' : 'col-xxl-3 flex-column'}`}>
                <div className={`position-relative ${isListView ? 'mr-4' : ''}`}>
                    {/* img */}
                    <a href="#" onClick={handleShow}>
                        {productImage(product.image, product.image.label, product.url)}
                    </a>
                </div>
                <div className="flex-1 text-center text-lg-left">
                    {/* sku */}
                    <span className="sku text-primary d-block mt-2">{product.sku}</span>
                    {/* title */}
                    <p className="mb-1 acc-product-title text-center text-xl-left">
                        <a href="#" data-url={product.url} onClick={handleShow}>{product.title}</a>
                    </p>
                </div>
            </Col>
            <Modal size="md" show={show} onHide={handleClose} className="acc-custom-modal">
                <Modal.Body className="text-center">
                    <iframe width="100%" height="420" src={`https://www.youtube.com/embed/${videoUrl}`} title="video" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default VideoFilter;
