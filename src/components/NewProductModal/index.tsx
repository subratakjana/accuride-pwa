import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import NextImage from "next/legacy/image";
import { useRouter } from 'next/router';
import { setCookie } from '@Hooks/criptoEncodeDecodeCookie';

const NewProductModal = (props) => {
    const [productModal, setProductModal] = useState(true);
    const { modalContent } = props;
    const router = useRouter();

    useEffect(() => {
        if (modalContent.showModal) {
            setProductModal(true);
        }
    }, []);

    const handleCloseModal = (getVal) => {
        if(getVal === 2) setCookie('newProductModalClosed', true, 7);
        setProductModal(false);
    }

    const goToProductPage = (pageLink) => {
        handleCloseModal();
        router.push(`/${router.query.zone_lang}/${pageLink}`);
    }

    return (
        <>
            <Modal
                show={productModal}
                onHide={() => { handleCloseModal(1); }}
                dialogClassName="acc-product-intro-modal"
                bsclass="my-modal"
                size="md"
                backdrop="static"
                centered
            >
                {/* modal body start */}
                <Modal.Body className="p-0">
                    <NextImage src={modalContent.lightboxImage.url} alt={modalContent.lightboxImage.fileName} width={696} height={725} className="acc-product-img" />
                    <Button variant="link" className="acc-btn-close" onClick={() => handleCloseModal(2) }>
                        <ReactSVG src="/assets/images/icons/close_bold.svg" />
                    </Button>
                    <Button size="lg" variant="secondary" className="acc-product-btn" onClick={() => goToProductPage(modalContent.buttonLink)}>{modalContent.buttonText}</Button>
                </Modal.Body>
                {/* modal body end */}
            </Modal>
        </>
    );
};

export default NewProductModal;
