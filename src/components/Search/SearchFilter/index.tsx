import {
  Container,
  Button,
  Badge,
  Tab,
  Row,
  Col,
  Nav,
  Form,
} from 'react-bootstrap';
import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { ReactSVG } from 'react-svg';
import { I18nLink } from '@Components/Utilities';
import axios from 'axios';
import { AuthContext } from '@Contexts/AuthContext';
import useWindowDimensions from '@Hooks/windowDimention';
import debounce from 'debounce-wrapper';
import dynamic from 'next/dynamic';
import styles from './SearchFilter.module.scss';

const SearchRefine = dynamic(() => import('./SearchRefine'));
const SearchSortBy = dynamic(() => import('./SearchSortBy'));

const SearchFilter = (props) => {
  const { searchSLIData, showLoader } = props;
  const { notify } = useContext(AuthContext);
  const [searchData, setSearchData] = useState(false);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchWord, setSearchWord] = useState(false);
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const searchURL = `${process.env.NEXT_PUBLIC_SLI_SEARCH_URL}?lbc=accuride&method=and&p=Q&ts=rac-json-api&cnt=6&srt=0`;
  const searchLimit = 3;

  let selectedFilter = [];

  if (router.query.filter) {
    const filterParm = router.query.filter;
    selectedFilter = filterParm.split('|').filter((x) => x !== '');
  }

  const readyNoOfFilter = () => {
    const selectedFilterCat = [];
    selectedFilter.map((item) => {
      const itemCategory = item.split('-')[0];
      if (selectedFilterCat.indexOf(itemCategory) < 0) {
        selectedFilterCat.push(itemCategory);
      }
      return selectedFilterCat;
    });
    return selectedFilterCat.length;
  };
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  /** tap refine product button, open filter panel from right side */
  const [filterBox, stateSet] = useState({ activeState: false });
  // open filter box
  const openFilterBox = () => {
    const stickyFilter = document.querySelector('.stickyFilter');
    stateSet({
      ...filterBox,
      activeState: true,
    });
    stickyFilter.classList.add('openFilter');
  };

  /** close filter by tap close icon from header */
  const closeFilter = () => {
    const stickyFilter = document.querySelector('.stickyFilter');
    stateSet({
      ...filterBox,
      activeState: false,
    });
    stickyFilter.classList.remove('openFilter');
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const searchKeyword = e.target.msearch.value;
    if (searchData && searchData.searched_term) {
      props.searchNow(searchData.searched_term, true);
    } else if (
      searchData &&
      searchData.search_suggestions &&
      searchData.search_suggestions[0].suggestion
    ) {
      props.searchNow(searchData.search_suggestions[0].suggestion, true);
    } else {
      props.searchNow(searchKeyword, true);
    }
  };

  const resetFilter = () => {
    let filterParmHref = '';
    let querySign = '';
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete('filter');
      urlParams.delete('sort');
      urlParams.delete('page');
      filterParmHref += `${urlParams.toString()}&`;
      querySign = '?';
    }
    if (filterParmHref === '&') {
      filterParmHref = '';
      querySign = '';
    }
    const asPath = router.asPath.split('?')[0];
    router.push(
      { pathname: router.pathname, query: filterParmHref },
      `${asPath}${querySign}${filterParmHref}`,
      { shallow: true }
    );
  };

  /*
   * SLI API call
   */
  const getSearchResult = (targetObj, isSuggestion) => {
    const sliUserId = localStorage.getItem('sliUserId');
    const srachSrt = `
        ${searchURL}
        ${sliUserId ? `&uid=${sliUserId}` : ''}
        &w=${targetObj.value}
        ${targetObj.facet ? `&af=${targetObj.facet}` : '&af=pagetype:products'}
        `;
    axios
      .get(srachSrt)
      .then((res) => {
        const searchResult = res.data;
        localStorage.setItem('sliUserId', searchResult.userid);
        if (searchResult.results && searchResult.result_meta.total > 0) {
          if (!isSuggestion) {
            setSearchData({
              ...searchResult.results,
              result_meta: { ...searchResult.result_meta },
            });
          }
          if (isSuggestion) {
            setSearchData({
              search_suggestions: [...searchData.search_suggestions],
              product_suggestions: [
                ...searchResult.results.product_suggestions,
              ],
              search_suggestions_scopes: {
                ...searchData.search_suggestions_scopes,
              },
              suggestion_text: targetObj.facet
                ? targetObj.facet
                : targetObj.value,
              result_meta: { ...searchResult.result_meta },
            });
          }
        } else {
          setSearchData({
            search_suggestions: [
              {
                logURL: `${process.env.NEXT_PUBLIC_BASE_PATH}/${
                  router.query.zone_lang
                }/search?keyword=${
                  document.getElementsByName('msearch')[0].value
                }`,
                suggestion: searchWord,
              },
            ],
          });
        }
      })
      .catch((error) => {
        notify(`Search error ${error}`, 'error');
        setSearchData(false);
      });
  };

  /** search now on change */
  const searchNow = (e) => {
    const targetObj = e.target;
    if (targetObj.value.trim() === '') {
      targetObj.value = '';
    }
    const targetValue = targetObj.value;
    clearTimeout(searchTimeOut);
    setSearchWord(targetValue);
    if (targetValue.length > 0) {
      setSearchTimeOut(
        setTimeout(() => {
          getSearchResult(targetObj);
        }, 0)
      );
    }
  };

  const callFnWithDebounce = debounce(searchNow, 300);

  /** onclick trigger search */
  const triggerSearch = (e) => {
    const targetObj = e.target;
    const targetValue = targetObj.value;
    if (targetValue.length > 0) {
      setTimeout(() => {
        getSearchResult(targetObj);
      }, 0);
    } else {
      setSearchData(false);
    }
  };

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    const getVal = targetObj.value;
    if (
      targetObj.required &&
      targetObj.value.trim() === '' &&
      targetObj.type === 'text'
    ) {
      targetObj.value = '';
    }
    if (targetObj.value.length === 0) setSearchData(false);
    const keyWordRegex = /^([a-zA-Z0-9,/\s/-]*)$/;
    if (keyWordRegex.test(getVal) === false) {
      targetObj.value = targetObj.value.replace(/[^a-zA-Z0-9,/\s/-]/g, '');
    }
  };

  return (
    <>
      <Container className="acc-product-filter p-0">
        <div className="p-3 bg-primary d-xl-none">
          <Form onSubmit={formSubmit}>
            <Form.Row>
              <Form.Group className="mb-0" controlId="search" as={Col}>
                <Form.Control
                  size="lg"
                  type="text"
                  name="msearch"
                  required
                  placeholder="SEARCH"
                  defaultValue={router.query.keyword}
                  onChange={async (e) => callFnWithDebounce(e)}
                  onClick={(e) => {
                    triggerSearch(e);
                  }}
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  className="border-0"
                  autoComplete="off"
                  list="mylist"
                />
              </Form.Group>
              <Button
                variant="secondary"
                disabled={
                  !searchSLIData ||
                  (searchSLIData && searchSLIData.result_meta.total === 0)
                }
                className="text-uppercase d-flex align-items-center mr-1 text-primary"
                onClick={() => openFilterBox()}
              >
                <ReactSVG
                  src="/assets/images/icons/filter.svg"
                  className={`mr-2 fill-medium ${styles['acc-filter-icon']}`}
                />
                Refine
              </Button>
            </Form.Row>
          </Form>
        </div>
        <div>
          {searchData && searchWord.length > 0 ? (
            <>
              <ul className="p-3 bg-light">
                {searchData && searchData.product_suggestions
                  ? searchData.product_suggestions.map((product) => (
                      <li
                        className="pb-2 mb-2 border-bottom"
                        key={`liKey${product.sku}`}
                        name={product.sku}
                      >
                        <a className="text-dark" href={product.clickURL}>
                          <span className="font-weight-bold">
                            {' '}
                            {product.sku}{' '}
                          </span>
                          {product.title}
                        </a>
                      </li>
                    ))
                  : searchData &&
                    searchData.search_suggestions &&
                    searchData.search_suggestions.map((product) => (
                      <li
                        className="pb-2 mb-2 border-bottom"
                        key={`liKey${product.suggestion}`}
                        name={product.suggestion}
                      >
                        <p className="m-0">No Products Found</p>
                      </li>
                    ))}
                {searchData &&
                searchData.product_suggestions &&
                searchData.product_suggestions.length > 5 &&
                searchWord.length > searchLimit ? (
                  <a
                    href={`/${router.query.zone_lang}/search?keyword=${
                      searchData.searched_term === ''
                        ? searchWord
                        : searchData.searched_term
                    }`}
                    key="liKeyAll"
                  >
                    <Button className="text-uppercase btn-block">
                      {`View All (${searchData.result_meta.total})`}
                    </Button>
                  </a>
                ) : null}
              </ul>
              {searchData &&
              searchData.product_suggestions &&
              searchData.product_suggestions.length <= 5 ? (
                <div className="p-4 text-center bg-white">
                  <h2 className="font-weight-bold mb-4 text-uppercase">
                    Popular Search
                  </h2>
                  <div className="w-100">
                    {searchData && searchData.search_suggestions
                      ? searchData.search_suggestions
                          .slice(0, 3)
                          .map((populerSearch, index) => (
                            <a
                              key={`suggestion_${index}`}
                              className="d-block bg-primary p-2 text-white rounded my-1"
                              href={`${process.env.NEXT_PUBLIC_BASE_PATH}/${router.query.zone_lang}/search?keyword=${populerSearch.suggestion}`}
                            >
                              {populerSearch.suggestion}
                            </a>
                          ))
                      : null}
                  </div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>

        <div
          className={`acc-filter-wrap ${
            filterBox.activeState ? 'openFilterBox' : ''
          }`}
        >
          {/* header start */}
          {windowObj && windowSize.width <= 1024 ? (
            <div className="acc-filter-header">
              <Button
                aria-label="refine-panel-close"
                className="acc-filter-close"
                variant="outline-primary"
                onClick={() => closeFilter()}
              >
                <ReactSVG
                  src="/assets/images/icons/close.svg"
                  className={`${styles['acc-close-icon']}`}
                />
              </Button>
              <I18nLink href="/">
                <a aria-label="link" className="logo-icon">
                  <ReactSVG
                    className={`fill-white ${styles['acc-logo-icon']}`}
                    src="/assets/images/accuride-logo-icon.svg"
                  />
                </a>
              </I18nLink>
              {readyNoOfFilter() > 0 ? (
                <Button
                  variant="link"
                  className="text-white p-0"
                  size="lg"
                  onClick={() => resetFilter()}
                >
                  Reset
                </Button>
              ) : null}
            </div>
          ) : null}
          {/* header end */}

          {/* content start */}
          {searchSLIData && searchSLIData.facets ? (
            <div className="acc-filter-body">
              <Tab.Container id="left-tabs-example" defaultActiveKey="refine">
                <Row
                  className={
                    windowObj && windowSize.width <= 1024 ? 'h-100' : ''
                  }
                  noGutters
                >
                  {windowObj && windowSize.width <= 1024 ? (
                    <Col className="acc-filter-menu">
                      <Nav variant="pills" className="d-block">
                        <Nav.Item>
                          <Nav.Link eventKey="refine">
                            <ReactSVG src="/assets/images/icons/filter.svg" />
                            <span className="d-block">Refine</span>
                            <Badge pill variant="secondary">
                              {readyNoOfFilter()}
                            </Badge>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="sort">
                            <ReactSVG src="/assets/images/icons/sort.svg" />
                            <span className="d-block">Sort By</span>
                            <Badge pill variant="secondary">
                              1
                            </Badge>
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Col>
                  ) : null}
                  <Col className=" bg-white">
                    <div className="acc-filter-content p-3 p-xl-0">
                      <Tab.Content>
                        <Tab.Pane eventKey="refine">
                          {searchSLIData ? (
                            <SearchRefine
                              closeFilterCalBack={() => closeFilter()}
                              searchSLIData={searchSLIData}
                              showLoader={showLoader}
                            />
                          ) : null}
                        </Tab.Pane>

                        {windowObj && windowSize.width <= 1024 ? (
                          <Tab.Pane eventKey="sort">
                            <SearchSortBy
                              closeFilterCalBack={() => closeFilter()}
                            />
                          </Tab.Pane>
                        ) : null}
                      </Tab.Content>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </div>
          ) : null}

          {/* content end */}
        </div>
      </Container>
    </>
  );
};
export default SearchFilter;
