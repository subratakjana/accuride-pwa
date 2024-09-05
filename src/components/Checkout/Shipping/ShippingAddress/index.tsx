import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';
import dynamic from 'next/dynamic';
const NewAddress = dynamic(() => import('../../NewAddress'));

const ShippingAddress = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { shippinglist, updateShippingAdd } = props;
  const [show, setShow] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const handleShow = (editMiode) => {
    if (editMiode) setEditAddress(editMiode);
    else setEditAddress(null);
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <section className="acc-shipping-address">
      <header
        className={`mb-3 mt-xl-3 ${
          windowObj && windowSize.width > 1024
            ? 'border-bottom border-medium'
            : ''
        }`}
      >
        <h2
          className={`mb-0 ${
            windowObj && windowSize.width > 1024
              ? 'text-uppercase text-primary pb-2'
              : 'text-dark'
          }`}
        >
          Shipping Address
        </h2>
      </header>
      <Row className="acc-address-list">
        {shippinglist.length > 0 ? (
          shippinglist.map((item, itemIndx) => (
            <Col key={item.id} sm={6} md={4} className="acc-item">
              <article
                className={`h-100 d-flex flex-column ${
                  item.default_shipping === true ? 'acc-activated' : ''
                }`}
              >
                <div className="flex-1">
                  <Button
                    variant={`${
                      item.default_shipping === true ? 'secondary' : 'link'
                    }`}
                    onClick={() => {
                      handleShow(item);
                    }}
                    className="p-1 acc-action rounded-0"
                  >
                    <ReactSVG
                      src="/assets/images/icons/edit.svg"
                      className="acc-shipping-edit-icon"
                    />
                  </Button>
                  <h4 className="mb-3 text-uppercase text-dark text-ellipsis mr-4">{`${item.firstname} ${item.lastname}`}</h4>
                  {item.street.map((add) => (
                    <span key={Math.random()} className="d-block mb-1">
                      {add}
                    </span>
                  ))}
                  <span>{item.city}</span>
                  <span className="d-block text-dark">{`${item.region.region_code} ${item.country_code} ${item.postcode}`}</span>
                  <a
                    aria-label="link"
                    className="d-block text-primary mt-3"
                    href={`tel:${item.telephone}`}
                    data-rel="external"
                  >
                    {item.telephone}
                  </a>
                </div>
                <footer>
                  {item.default_shipping === true ? (
                    ''
                  ) : (
                    <Button
                      variant="primary"
                      block={!(windowObj && windowSize.width >= 768)}
                      className="text-uppercase mt-3"
                      onClick={() => {
                        updateShippingAdd(item.id, itemIndx, {
                          region: item.region.region,
                          region_code: item.region.region_code,
                          region_id: item.region.region_id,
                        });
                      }}
                    >
                      Ship here
                    </Button>
                  )}
                </footer>
              </article>
            </Col>
          ))
        ) : (
          <Col>
            <p>You don&apos;t have added any address.</p>
          </Col>
        )}
      </Row>
      <div
        className={`text-md-left ${
          windowObj && windowSize.width > 1024
            ? 'border-top border-medium pt-3'
            : ''
        }`}
      >
        <Button
          variant="primary"
          block={!(windowObj && windowSize.width >= 768)}
          className="text-uppercase mt-3 mt-sm-0"
          onClick={() => {
            handleShow(false);
          }}
        >
          + New Address
        </Button>
      </div>

      {/* new and edit address Modal start */}
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="acc-custom-modal"
        size={windowObj && windowSize.width <= 1024 ? 'xl' : 'md'}
      >
        {/* modal header start */}
        <Modal.Header className="bg-primary">
          <Button
            variant="link"
            className="acc-btn-close"
            onClick={handleClose}
          >
            <ReactSVG
              className="acc-filter-close acc-shipping-close-icon"
              src="/assets/images/icons/close.svg"
            />
          </Button>
          <I18nLink href="/">
            <a aria-label="link" className="logo-icon">
              <ReactSVG
                className="fill-white acc-shipping-logo-icon"
                src="/assets/images/accuride-logo-icon.svg"
              />
            </a>
          </I18nLink>
        </Modal.Header>
        {/* modal header end */}

        {/* modal body start */}
        <Modal.Body>
          <h2 className="mb-3 text-uppercase">Shipping Address</h2>
          <NewAddress
            editMode={editAddress}
            closeModal={handleClose}
            refreshList={(data) => {
              props.refreshList(data);
            }}
          />
        </Modal.Body>
        {/* modal body end */}
      </Modal>
      {/* new and edit address Modal end */}
    </section>
  );
};

export default ShippingAddress;
