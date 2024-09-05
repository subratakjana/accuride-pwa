import dynamic from 'next/dynamic';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState, useContext, useEffect } from 'react';
import { IoIosClose } from 'react-icons/io';
import { ProductCompareContext } from '@Contexts/ProductCompareContext';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import { useManualQuery, useMutation } from 'graphql-hooks';
import { addToCompareMultiple } from '@Graphql/queries/addToCompareMultiple.graphql';
import { getCompareProducts } from '@Graphql/queries/getCompareProducts.graphql';
import { AuthContext } from '@Contexts/AuthContext';
import { useRouter } from 'next/router';
import YotpoScript from '@Components/Utilities/YotpoScript';
const Compare = dynamic(() => import('@PageContent/Compare'));

const GenerateCompareBlock = (props) => {
  const { isDesktop } = props;
  const [accordion, setState] = useState({ activeKey: '0' });
  const [addedComare, setAddedComare] = useState(false);
  const { cProducts, sliceProduct, clearCProducts, setCProducts } = useContext(
    ProductCompareContext
  );
  const [displayComare, setDisplayComare] = useState([]);
  const [compareModal, setCompareModal] = useState(false);
  const [compareMarged, setComapremarged] = useState(false);
  const { token } = useContext(AuthContext);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const router = useRouter();
  /** get user compare products form server */
  const [getUserCompare, { data: userCompare }] = useManualQuery(
    getCompareProducts.loc.source.body,
    {
      fetchPolicy: 'no-cache',
      onSuccess: (data) => {
        const res = data.data;
        setDisplayComare(res.getCompareProducts);
      },
    }
  );

  /** function declare for add multiple comapre
   * one function handling add edit delete.
   */
  const [addNewCompare] = useMutation(addToCompareMultiple.loc.source.body, {
    onSuccess: (data) => {
      const res = data.data;
      if (
        res.addToCompareMultiple.length > 0 &&
        res.addToCompareMultiple[0].product_id
      ) {
        setCProducts(res.addToCompareMultiple, true);
        setAddedComare(false);
        setDisplayComare(res.addToCompareMultiple);
      } else {
        setCProducts(false, true);
        setAddedComare(false);
        setDisplayComare([]);
      }
    },
  });
  /** accordian expanded state handling */
  const accordianClickedEvent = (index) => {
    if (accordion.activeKey !== index) {
      setState({
        ...accordion,
        activeKey: index,
      });
    } else {
      setState({
        ...accordion,
        activeKey: false,
      });
    }
  };

  // --- remove compareItem ---
  const removeCompareItem = (product) => {
    sliceProduct(product);
  };

  // --- clear compareItem ---
  const clearCompareItem = () => {
    clearCProducts();
    accordion.activeKey = 0;
  };

  /**
   * add multiple compare products at a time with local and user existing compare products.
   * this array cleen user compare from server and store full array.
   */
  const addUserComareProduct = () => {
    const updateId = [];
    let margeComare = [...cProducts];
    if (!compareMarged)
      margeComare = [...cProducts, ...userCompare.getCompareProducts];
    margeComare.filter((item) => updateId.push(Number(item.product_id)));
    let uniQupdateId = Array.from(new Set(updateId));
    if (uniQupdateId[0] === 0) uniQupdateId = [];
    addNewCompare({
      variables: { product_id: uniQupdateId },
    });
  };

  /**
   * this function check equal array or not return Boolean;
   * @param {*} a1
   * @param {*} a2
   */
  const isEqualArray = (a1, a2) => JSON.stringify(a1) === JSON.stringify(a2);

  /**
   * Run this function if any changes reflect with satisfy the conditions.
   */
  if (
    userCompare &&
    token &&
    !addedComare &&
    !isEqualArray(cProducts, displayComare)
  ) {
    setAddedComare(true);
    addUserComareProduct();
    setComapremarged(true);
  }

  /** only first time/one time run */
  useEffect(() => {
    if (token) {
      getUserCompare();
    }
  }, []);

  /** if any changes in localstorage with compare products for guest user. */
  useEffect(() => {
    if (!token) {
      setDisplayComare(cProducts);
    }
  }, [cProducts]);

  const handleCompare = () => {
    if (!isScriptLoaded && !window.yotpo) {
      // Dynamically load your script here
      const script = document.createElement('script');
      script.src = YotpoScript(router.query.zone_lang, true);
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);
    }
    setCompareModal(true);
  };

  const deviceCompare = () => (
    <Accordion className="acc-compare-accordion bg-white" defaultActiveKey="">
      {/* header start */}
      <header className="d-flex justify-content-between bg-light align-items-center border-top border-medium">
        <span className="d-block font-weight-500">{`Compare Product(s): ${displayComare.length}`}</span>
        <Accordion.Toggle
          onClick={() => accordianClickedEvent('0')}
          as={Button}
          variant="primary"
          size="sm"
          eventKey="0"
          className="acc-compare-action"
        >
          {accordion.activeKey === '0' ? 'SHOW' : 'HIDE'}
        </Accordion.Toggle>
      </header>
      {/* header end */}
      <Accordion.Collapse eventKey="0">
        <>
          <section className="acc-compare-sticky d-flex  border-top border-medium">
            {displayComare.map((product) => (
              <article
                className="item position-relative font-weight-500"
                key={product.product_sku}
              >
                <a
                  href="#"
                  tabIndex="0"
                  onKeyPress={() => removeCompareItem(product)}
                  className="h1 d-inline-block mb-0 position-absolute right top"
                  onClick={() => removeCompareItem(product)}
                >
                  <IoIosClose />
                </a>
                {product.product_name}
              </article>
            ))}
          </section>

          {/* footer start */}
          <footer className="d-flex justify-content-between bg-light align-items-center border-top border-medium">
            <Button
              variant="danger"
              size="sm"
              onClick={() => clearCompareItem()}
            >
              CLEAR ALL
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCompare}
              disabled={displayComare.length < 2}
            >
              COMPARE NOW
            </Button>
          </footer>
          {/* footer end */}
        </>
      </Accordion.Collapse>
    </Accordion>
  );

  const desktopCompare = () => (
    <>
      {/* Compare Widget start */}
      <article className="mt-4">
        <header className="mb-3">
          <h5 className="text-primary mb-0 text-uppercase d-flex align-items-center">
            Compare Products
            <span className="font-size-sm text-capitalize text-medium d-block ml-1">{`(${
              cProducts.length
            }${cProducts.length > 1 ? ' items' : ' item'})`}</span>
          </h5>
        </header>
        {displayComare.map((product) => (
          <div
            className="d-flex align-items-start mt-1"
            key={product.product_sku}
          >
            <span className="d-block flex-1">{product.product_name}</span>
            <Button
              className="p-0 flex-none"
              variant="link"
              onClick={() => removeCompareItem(product)}
            >
              <IoIosClose size="1.5rem" />
            </Button>
          </div>
        ))}
        <footer className="mt-3">
          <Button
            className="mr-1 text-uppercase"
            variant="primary"
            size="sm"
            onClick={handleCompare}
            disabled={displayComare.length < 2}
          >
            Compare
          </Button>
          <Button
            className="ml-1 text-uppercase"
            variant="dark"
            size="sm"
            onClick={() => clearCompareItem()}
          >
            Clear All
          </Button>
        </footer>
      </article>
      {/* Compare Widget end */}
    </>
  );

  return (
    <>
      {isDesktop ? (
        <>
          {displayComare.length > 0 ? (
            desktopCompare()
          ) : (
            <article className="mt-4">
              <header className="mb-3">
                <h5 className="text-primary mb-0 text-uppercase d-flex align-items-center">
                  Compare Products{' '}
                </h5>
              </header>
              <span className="d-block text-medium">
                You have no items to compare.
              </span>
            </article>
          )}
        </>
      ) : (
        <>{displayComare.length > 0 ? deviceCompare() : null}</>
      )}

      {/* compare modal start */}
      <Modal
        show={compareModal}
        onHide={() => {
          setCompareModal(false);
        }}
        dialogClassName="acc-custom-modal acc-compare-modal"
        bsclass="my-modal"
        size="xl"
        backdrop="static"
      >
        {/* modal header start */}
        <Modal.Header className="bg-primary">
          <Button
            variant="link"
            className="acc-btn-close"
            onClick={() => {
              setCompareModal(false);
            }}
          >
            <ReactSVG
              src="/assets/images/icons/close.svg"
              className="acc-compare-close-icon"
            />
          </Button>
          <I18nLink href="/">
            <a aria-label="link" className="logo-icon">
              <ReactSVG
                className="fill-white acc-compare-logo-icon"
                src="/assets/images/accuride-logo-icon.svg"
              />
            </a>
          </I18nLink>
        </Modal.Header>
        {/* modal header end */}

        {/* modal body start */}
        <Modal.Body className="p-0">
          <Compare refreshList={removeCompareItem} />
        </Modal.Body>
        {/* modal body end */}
      </Modal>
      {/* compare modal end */}
    </>
  );
};

export default GenerateCompareBlock;
