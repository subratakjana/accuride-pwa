import NextImage from "next/legacy/image";
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';

const DisplaySearchProducts = (props) => {
    const { product } = props;

    useEffect(() => {
        try {
            if (window && window.yotpo) {
                window.yotpo.initWidgets();
            }
        } catch (err) {
            console.log(err);
        }
    });
    /**
     * get selected product sku as per product variants change.
    */
    const generateUrl = (_path) => {
        const path = _path.split('/');
        let proUrl = path[path.length - 1];
        proUrl = `/products/${proUrl}`;
        return proUrl;
    };

    /** lazyload image error handling */
    const [imgError, setImgError] = useState(false);
    const productImage = (image, altText) => {
        const picture = new Image();
        picture.src = image;
        picture.onerror = () => setImgError(true);
        return imgError ? (
            <NextImage
                src="/assets/images/demo-placeholder-350-314.png"
                alt=""
                layout="intrinsic"
                objectFit="contain"
                objectPosition="center"
                width={200}
                height={150}
                className="img"
            />
            )
            : (
                <NextImage
                    src={image}
                    alt={altText}
                    layout="intrinsic"
                    objectFit="contain"
                    objectPosition="center"
                    width={188}
                    height={140}
                />
            );
    };

    const closePopover = () => {
        props.closePop(false);
    };

    return (
        <Col xs={4} key={product.sku} className="px-2">
            <a href={product.clickURL} role="button" tabIndex={0} onKeyPress={() => false} onClick={() => closePopover()}>
                {productImage(
                    product.image,
                    product.image.label,
                )}
                <span className="text-center d-block font-weight-500 text-uppercase">{product.title}</span>
                <span className="text-center d-block font-weight-500 text-uppercase">{product.sku}</span>
            </a>
            <a href={`${product.clickURL}#review`} role="button" tabIndex={0} onKeyPress={() => false} onClick={() => closePopover()}>
                <div className="yotpo bottomLine acc-product-overview-yotpo pb-3" data-yotpo-product-id={product.product_id} />
            </a>
        </Col>
    );
};
export default DisplaySearchProducts;
