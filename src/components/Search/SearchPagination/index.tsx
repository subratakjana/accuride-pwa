import { useState, useEffect } from 'react';
import useWindowDimensions from '@Hooks/windowDimention';
import { InputGroup, Pagination, FormControl } from 'react-bootstrap';
import { ReactSVG } from 'react-svg';
import { useRouter } from 'next/router';
import styles from './SearchPagination.module.scss';

const SearchPagination = (props) => {
  const { pageInfo, resultMeta, showLoader } = props;
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const numberOfLimit = [12, 24, 48];
  const router = useRouter();
  const selectedLimit = router.query.limit ? router.query.limit : 12;

  /** display noumber of search product list handling */
  const searchProductLimit = (e) => {
    showLoader(true);
    const searchLimit = e.target.value;
    let limitParmHref = '';
    let querySign = '';

    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      let pagination = '';
      const totalePageWillBe = Number(resultMeta.total / searchLimit).toFixed();
      if (totalePageWillBe <= pageInfo.current.name) {
        urlParams.delete('page');
        pagination += `page=${totalePageWillBe === 0 ? 1 : totalePageWillBe}&`;
      }
      urlParams.delete('limit');
      limitParmHref += `${urlParams.toString()}&`;
      limitParmHref += pagination;
      querySign = '?';
    }

    limitParmHref += `limit=${searchLimit}`;
    querySign = '?';

    const asPath = router.asPath.split('?')[0];
    router.push(
      { pathname: router.pathname, query: limitParmHref },
      `${asPath}${querySign}${limitParmHref}`,
      { shallow: true }
    );
  };

  /**
   * Smooth scroll when tap on pagination (prev,next).
   * Set target scroll top from online or other product section.
   * @param {*} paginationObj
   */
  const urlSmoothScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /** search pagination url update */
  const urlUpdateForPagination = (targetPage) => {
    let pageParmHref = '';
    let querySign = '';
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('page');
      pageParmHref += `${urlParams.toString()}&`;
      querySign = '?';
    }
    pageParmHref += `page=${targetPage}`;
    querySign = '?';

    const asPath = router.asPath.split('?')[0];
    router.push(
      { pathname: router.pathname, query: pageParmHref },
      `${asPath}${querySign}${pageParmHref}`,
      { shallow: true }
    );
    urlSmoothScroll();
  };

  /**
   * When tap any pagination button from online or other product.
   * pass data in store component from which section pagination and page status.
   * @param {*} state
   * @param {*} productFor
   */
  const tapPagination = (state) => {
    showLoader(true);
    let targetPage = pageInfo.current.name;
    if (state === 'prev') targetPage -= 1;
    if (state === 'next') targetPage += 1;
    urlUpdateForPagination(targetPage);
  };

  /**
   * tap pagination when select specific page noumebr.
   * @param {*} selectPageNo
   */
  const tapPaginationNoumber = (selectPageNo) => {
    showLoader(true);
    urlUpdateForPagination(selectPageNo);
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  });

  useEffect(() => {
    if (router.query.page >= pageInfo.total) {
      urlUpdateForPagination(pageInfo.total);
    }

    if (router.query.limit) {
      const urlLimit = Number(router.query.limit);
      const targetLimit = [12, 24, 48];
      if (targetLimit.indexOf(urlLimit) >= 0) {
        // NA
      } else {
        searchProductLimit({ target: { value: 12 } });
      }
    }
  }, [pageInfo]);

  useEffect(() => {
    const limitSelect = document.querySelector('select[name="limit-search"]');
    if (limitSelect) limitSelect.value = selectedLimit;
    return () => null;
  }, [selectedLimit]);
  return (
    <>
      {/* pagination start */}
      <div
        className={`d-flex mt-3 ${
          windowObj && windowSize.width > 1024
            ? 'justify-content-between'
            : 'justify-content-center'
        }`}
      >
        {pageInfo.total !== 1 && pageInfo.total !== 0 ? (
          <>
            <Pagination size="sm">
              <Pagination.Prev
                disabled={pageInfo.current.name === 1}
                onClick={() => tapPagination('prev')}
                className="prev"
              >
                <ReactSVG
                  src="/assets/images/icons/pagination-prev.svg"
                  className={styles['acc-pagination-nav']}
                />
              </Pagination.Prev>
              {windowObj && windowSize.width > 1024 ? (
                <>
                  {Array.from(Array(pageInfo.total).keys()).map((page) => (
                    <Pagination.Item
                      onClick={() => tapPaginationNoumber(page + 1)}
                      key={page + 1}
                      className={`${
                        pageInfo.current.name === page + 1 ? ' active' : null
                      }`}
                    >
                      {page + 1}
                    </Pagination.Item>
                  ))}
                </>
              ) : null}
              <Pagination.Next
                disabled={pageInfo.total === pageInfo.current.name}
                className="next"
                onClick={() => tapPagination('next')}
              >
                <ReactSVG
                  src="/assets/images/icons/pagination-next.svg"
                  className={styles['acc-pagination-nav']}
                />
              </Pagination.Next>
            </Pagination>
          </>
        ) : (
          <span>&nbsp;</span>
        )}

        {/* show per page */}
        {windowObj && windowSize.width > 1024 && pageInfo.total !== 0 ? (
          <div className="acc-pagination-limiter">
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text className="border-0 bg-transparent">
                  Show
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                onChange={(e) => searchProductLimit(e)}
                defaultValue={selectedLimit}
                as="select"
                name="limit-search"
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
      </div>
      {/* pagination end */}
    </>
  );
};
export default SearchPagination;
