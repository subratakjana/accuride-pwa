import { useState, useEffect, memo } from 'react';
import Skeleton from 'react-loading-skeleton';
import dynamic from 'next/dynamic';
import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { ReactSVG } from 'react-svg';
import useWindowDimensions from '@Hooks/windowDimention';
import { useRouter } from 'next/router';
import styles from './ProductsWrapper.module.scss';

const Product = dynamic(() => import('../Product'));

const LoadingSkeleton = (props) => {
  const { isListView } = props;
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      <Container className="acc-products-wrap pt-xl-5">
        <Row>
          <Col
            xs={{ order: 1, span: 12 }}
            xl={{ order: 2 }}
            className="stickyFilter border-light acc-product-sidebar px-0 px-xl-3"
          >
            {windowObj && windowSize.width <= 1024 ? (
              <div className="p-3 bg-primary">
                <Skeleton height={44} />
              </div>
            ) : (
              <>
                <h5 className="mb-3">
                  <Skeleton height={27} />
                </h5>
                <div className="d-flex justify-content-between py-2">
                  <Skeleton count={0.75} containerClassName="flex-fill" />
                  <Skeleton width={16} circle="true" />
                </div>
                {[1, 2].map((i) => (
                  <div className="d-flex mb-3" key={i}>
                    <Skeleton
                      width={16}
                      circle="true"
                      containerClassName="flex-none mr-3"
                    />
                    <Skeleton count={0.5} containerClassName="flex-fill" />
                  </div>
                ))}
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                  <div className="d-flex justify-content-between py-2" key={i}>
                    <Skeleton count={0.75} containerClassName="flex-fill" />
                    <Skeleton width={16} circle="true" />
                  </div>
                ))}
                <h5 className="mt-4">
                  <Skeleton height={27} />
                </h5>
                <Skeleton count="0.50" />
              </>
            )}
          </Col>
          <Col
            xs={{ order: 3, span: 12 }}
            xl={{ order: 3 }}
            className="pl-xl-3 px-0"
          >
            <Container>
              {windowObj && windowSize.width > 1024 ? (
                <div className="acc-product-toolbar">
                  <Row>
                    <Col className="acc-modes d-flex">
                      <Skeleton
                        circle="true"
                        width={16}
                        height={16}
                        containerClassName="mr-3"
                      />
                      <Skeleton circle="true" width={16} height={16} />
                    </Col>

                    <Col>
                      <Skeleton count={0.25} />
                    </Col>
                    <Col xs={5} className="col-xxl-4">
                      <Skeleton />
                    </Col>
                  </Row>
                </div>
              ) : null}
              <div className="section-padding pt-xl-5">
                <h3
                  className={`text-center text-xl-left mt-0 mb-3 ${
                    windowObj && windowSize.width > 1024
                      ? 'border-bottom border-light pb-2'
                      : ''
                  }`}
                >
                  <Skeleton count={0.5} />
                </h3>
                <Row className="px-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Col
                      xs={6}
                      sm={4}
                      xl={isListView ? '12' : ''}
                      key={i}
                      className={`acc-product-block mb-3 px-2 ${
                        isListView
                          ? 'col-xxl-12 d-flex flex-row align-items-start'
                          : 'col-xxl-3'
                      }`}
                    >
                      <div
                        className={`position-relative w-100 ${
                          isListView ? 'mr-4' : 'mb-3'
                        }`}
                      >
                        <Skeleton height={248} />
                      </div>
                      <div className={`flex-1 ${isListView ? 'mr-3' : ''}`}>
                        <Skeleton count={0.5} />
                        <Skeleton count={1.25} />
                      </div>
                      <div
                        className={`${
                          isListView ? 'flex-none acc-product-btns' : 'w-100'
                        }`}
                      >
                        <div
                          className={`d-flex w-100 ${
                            isListView ? 'flex-column' : ''
                          }`}
                        >
                          <Skeleton
                            containerClassName="mt-3 mr-1 flex-fill"
                            height={32}
                          />
                          <Skeleton
                            containerClassName="mt-3 ml-1 flex-fill"
                            height={32}
                          />
                        </div>
                        <h6 className={`${isListView ? 'mt-2 mb-0' : 'mt-3'}`}>
                          <Skeleton count={0.25} />
                        </h6>
                      </div>
                    </Col>
                  ))}
                </Row>
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ProductsWrapper = (props) => {
  const {
    products,
    productForSales,
    pageInfo,
    isListView,
    selectedLimit,
    onlinePageInfo,
    otherPageInfo,
    loading,
  } = props;

  const [$document] = useState({ documentObj: false });
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  const numberOfLimit = [12, 24, 48];

  useEffect(() => {
    // documnet referrence error fix with useeffect hoock.
    $document.documentObj = document;
    if (windowSize.width !== 0) updateWindowObj(true);
  });

  useEffect(() => {
    const limitSelect = document.querySelector(
      `select[name="limit-${productForSales}"]`
    );
    if (limitSelect) limitSelect.value = selectedLimit;
    return () => null;
  }, [selectedLimit]);

  const displayPrice = (productType, priceRange) => {
    switch (productType) {
      case 'GroupedProduct':
        return `${priceRange.minimum_price.final_price.value.toFixed(
          2
        )} - $${priceRange.maximum_price.final_price.value.toFixed(2)}`;
      case 'ConfigurableProduct':
        return priceRange.minimum_price.final_price.value;
      default:
        return priceRange.minimum_price.final_price.value;
    }
  };
  /**
   * Smooth scroll when tap on pagination (prev,next).
   * Set target scroll top from online or other product section.
   * @param {*} paginationObj
   */
  const urlSmoothScroll = (paginationObj) => {
    if (paginationObj.productFor === 1) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (paginationObj.productFor === 0) {
      const targetScroll =
        document.getElementsByClassName('acc-other-product')[0].offsetTop;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  /**
   * When tap any pagination button from online or other product.
   * pass data in store component from which section pagination and page status.
   * @param {*} state
   * @param {*} productFor
   */

  const tapPagination = (state, productFor) => {
    const paginationData = {
      states: state,
      productFor,
    };
    props.paginationCallback(paginationData);
    urlSmoothScroll(paginationData);
  };

  /** desktop noumber of product display limit pass to url */
  const productLimit = (e) => {
    const targetLimit = e.target.value;
    let limitParmHref = '';
    let querySign = '';
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      let pagination = '';

      const totalPageOnlineWillBe = Number(
        (onlinePageInfo.page_size * onlinePageInfo.total_pages) / targetLimit
      ).toFixed();
      if (totalPageOnlineWillBe <= onlinePageInfo.current_page) {
        urlParams.delete('p');
        pagination += `p=${
          totalPageOnlineWillBe === 0 ? 1 : totalPageOnlineWillBe
        }&`;
      }
      const totalPageOtherWillBe = Number(
        (otherPageInfo.page_size * otherPageInfo.total_pages) / targetLimit
      ).toFixed();
      if (totalPageOtherWillBe <= otherPageInfo.current_page) {
        urlParams.delete('o_p');
        pagination += `o_p=${
          totalPageOtherWillBe === 0 ? 1 : totalPageOtherWillBe
        }&`;
      }

      urlParams.delete('limit');
      limitParmHref += `${urlParams.toString()}&`;
      limitParmHref += pagination;
      querySign = '?';
    }
    if (targetLimit) {
      limitParmHref += `limit=${targetLimit}`;
      querySign = '?';
    }

    if (limitParmHref === '&') {
      limitParmHref = '';
      querySign = '';
    }

    const asPath = router.asPath.split('?')[0];
    router.push(
      { pathname: router.pathname, query: limitParmHref },
      `${asPath}${querySign}${limitParmHref}`,
      { shallow: true }
    );
  };

  /** desktop pagination when tap perticular page number */
  const tapPaginationNoumber = (pageNo, productFor) => {
    const paginationData = {
      selectPageNo: pageNo,
      productFor,
    };
    props.paginationCallback(paginationData);
    urlSmoothScroll(paginationData);
  };

  const getProductImageFn = (isCrossImageChecked, cross_image, gallery_url) => {
    const imageUrl = (gallery_url === null || gallery_url === `${process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT}/media/catalog/product`) ? '/assets/images/demo-placeholder-350-314.png' : gallery_url;
    if (isCrossImageChecked) {
      return imageUrl;
    } else if(cross_image) {
      return cross_image;
    } else {
      return imageUrl;
    }
  }

  return (
    <section
      className={`position-relative section-padding pt-xl-5 ${
        productForSales === 1 ? 'acc-avilable-product' : 'acc-other-product'
      }`}
    >
      <h3
        className={`text-center text-xl-left mt-0 mb-3 ${
          windowObj && windowSize.width > 1024
            ? 'border-bottom border-medium pb-2'
            : ''
        }`}
      >
        {productForSales === 1 ? 'AVAILABLE ONLINE' : 'OTHER PRODUCTS'}
      </h3>
      {loading ? (
        ''
      ) : (
        <Row className="px-2">
          {products.map((product, index) => (
            <Product
              key={product.sku}
              productObj={product}
              index={index}
              type={productForSales}
              price={displayPrice(
                product.__typename,
                product.product_price_range
              )}
              imgSrc={getProductImageFn(props.isCrossImageChecked, product.cross_image, product.image.gallery_url)}
              isCrossImage={!props.isCrossImageChecked}
              currency={
                product.product_price_range.minimum_price.final_price.currency
              }
              isListView={isListView}
            />
          ))}
        </Row>
      )}

      {/* pagination start */}
      <div
        className={`d-flex mt-3 ${
          windowObj && windowSize.width > 1024
            ? 'justify-content-between'
            : 'justify-content-center'
        }`}
      >
        <>
          <Pagination size="sm">
            {pageInfo.total_pages !== 1 ? (
              <>
                <Pagination.Prev
                  disabled={pageInfo.current_page === 1}
                  onClick={() => tapPagination('prev', productForSales)}
                  className="prev"
                >
                  <ReactSVG
                    src="/assets/images/icons/pagination-prev.svg"
                    className={styles['acc-pagination-nav']}
                  />
                </Pagination.Prev>
                {windowObj && windowSize.width > 1024 ? (
                  <>
                    {Array.from(Array(pageInfo.total_pages).keys()).map(
                      (page) => (
                        <Pagination.Item
                          onClick={() =>
                            tapPaginationNoumber(page + 1, productForSales)
                          }
                          key={page + 1}
                          className={`${
                            pageInfo.current_page === page + 1
                              ? ' active'
                              : null
                          }`}
                        >
                          {page + 1}
                        </Pagination.Item>
                      )
                    )}
                  </>
                ) : null}
                <Pagination.Next
                  className="next"
                  disabled={pageInfo.total_pages === pageInfo.current_page}
                  onClick={() => tapPagination('next', productForSales)}
                >
                  <ReactSVG
                    src="/assets/images/icons/pagination-next.svg"
                    className={styles['acc-pagination-nav']}
                  />
                </Pagination.Next>
              </>
            ) : (
              ''
            )}
          </Pagination>

          {/* show per page */}
          {windowObj && windowSize.width > 1024 ? (
            <div className="acc-pagination-limiter">
              <InputGroup size="sm">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-transparent">
                    Show
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  onChange={(e) => productLimit(e)}
                  defaultValue={selectedLimit}
                  name={`limit-${productForSales}`}
                  as="select"
                  className="rounded"
                >
                  {numberOfLimit.map((limit) => (
                    <option key={limit} value={limit}>
                      {limit}
                    </option>
                  ))}
                </FormControl>
                <InputGroup.Append>
                  <InputGroup.Text className="border-0 bg-transparent">
                    per page
                  </InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </div>
          ) : null}
        </>
      </div>
      {/* pagination end */}
    </section>
  );
};

export default memo(ProductsWrapper);
