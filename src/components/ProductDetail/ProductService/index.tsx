import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Modal, Button } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';

const WarrantyModal = dynamic(
  () => import('@Components/ProductDetail/ProductService/WarrantyModal')
);
const ContactModal = dynamic(
  () => import('@Components/ProductDetail/ProductService/ContactModal')
);
const ShippingPolicyModal = dynamic(
  () => import('@Components/ProductDetail/ProductService/ShippingPolicyModal')
);

const ProductService = () => {
  const [modalData, setModalData] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openModal = useCallback((data) => {
    handleShow();
    setModalData(data);
  });

  const getComponent = (data) => {
    switch (data) {
      case '0':
        return <WarrantyModal />;
      case '1':
        return <ContactModal />;
      default:
        return <ShippingPolicyModal />;
    }
  };

  const services = [
    {
      id: '0',
      icon: 'warranty.svg',
      title: 'Limited Lifetime Warranty',
    },
    {
      id: '1',
      icon: 'customer-support.svg',
      title: 'Contact',
    },
    {
      id: '2',
      icon: 'shipping.svg',
      title: 'Shipping Policy',
    },
  ];

  return (
    <div className="acc-product-service mt-5 py-3">
      <ul className="acc-service-list d-flex">
        {services.map((item) => (
          <li key={item.id}>
            <span
              onClick={() => openModal(item)}
              tabIndex={0}
              onKeyPress={() => false}
              role="button"
              className="d-flex"
            >
              <ReactSVG
                src={`/assets/images/icons/${item.icon}`}
                className="flex-none"
              />
              <span className="d-xl-block d-none ml-3 ml-xl-2 ml-xxl-3">
                {item.title}
              </span>
            </span>
          </li>
        ))}
      </ul>

      {/* modal start */}
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="xl"
        dialogClassName="acc-custom-modal acc-service-modal"
      >
        {/* modal header start */}
        <Modal.Header className="bg-primary position-sticky top z-index-1">
          <Button
            variant="link"
            className="acc-btn-close"
            onClick={handleClose}
          >
            <ReactSVG
              src="/assets/images/icons/close.svg"
              className="acc-service-close-icon"
            />
          </Button>
          <I18nLink href="/">
            <a aria-label="link" className="logo-icon">
              <ReactSVG
                className="fill-white acc-service-logo-icon"
                src="/assets/images/accuride-logo-icon.svg"
              />
            </a>
          </I18nLink>
        </Modal.Header>
        {/* modal header end */}

        <Modal.Body className="p-0">
          {modalData ? <>{getComponent(modalData.id)}</> : null}
        </Modal.Body>
      </Modal>
      {/* modal end */}
    </div>
  );
};

export default ProductService;
