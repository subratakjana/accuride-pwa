import dynamic from 'next/dynamic';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Overlay from 'react-bootstrap/Overlay';
import { ReactSVG } from 'react-svg';
import { useState, useRef, useContext, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '@Contexts/AuthContext';
import { I18nLink } from '@Components/Utilities';
import { useRouter } from 'next/router';
import getIpDetails from '@Hooks/getIpDetails';
import YotpoScript from '@Components/Utilities/YotpoScript';
import Skeleton from 'react-loading-skeleton';
import debounce from 'debounce-wrapper';
import randomAlphanumericString from '@Hooks/randomAlphanumericString';
import styles from './SearchDesktop.module.scss';

const DisplaySearchProducts = dynamic(() => import('./DisplaySearchProducts'));

const SearchPopSkeletonLoader = () => {
  return (
    <>
      <div className="h-100">
        <Row noGutters="true" className="h-100">
          <Col xs={3} className={styles['acc-suggestion-bar']}>
            <Skeleton height={25} count={1} containerClassName="rounded-0" />
            <ul className={`${styles['acc-suggestion-list']} mt-4 px-2`}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <li className="acc-desk-suggest p-3" key={i}>
                  <Skeleton count={1} />
                </li>
              ))}
            </ul>
          </Col>
          <Col xs={9} className={`${styles['acc-search-product']} border-left`}>
            <Skeleton height={25} count={1} containerClassName="rounded-0" />
            <div className="px-3 mt-4">
              <Row>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Col key={i} xs={4} className="pb-4">
                    <Skeleton height={100} />
                    <div className="text-center pt-2">
                      <Skeleton count={2.5} />
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
            <div className="pb-3 px-3">
              <Skeleton height={25} count={1} containerClassName="rounded-0" />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

const SearchDesktop = () => {
  const { notify } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(false);
  const ref = useRef(null);
  const [showLoader, setShowLoader] = useState(false);
  const [isCallIp, setIsCallIp] = useState(false);
  const [pageURL, setPageURL] = useState('');
  const [clientUserAgent, setClientUserAgent] = useState('');
  const [searchData, setSearchData] = useState(false);
  const [clientIpDetails, setClientIpDetails] = useState(false);
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [searchWord, setSearchWord] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const router = useRouter();
  const [searchSeggestionText, setSearchSeggestionText] = useState(false);
  const searchURL = `${process.env.NEXT_PUBLIC_SLI_SEARCH_URL}?lbc=accuride&method=and&p=Q&ts=rac-json-api&cnt=6&srt=0`;
  const searchLimit = 3;

  useEffect(() => {
    if (target && !clientIpDetails) {
      getIpDetails().then((data) => {
        setClientIpDetails(data);
      });
    }
  }, [target]);

  /*
   * SLI API call
   */
  const getSearchResult = (targetObj, isSuggestion) => {
    setShowLoader(true);
    const sliUserId = localStorage.getItem('sliUserId');
    const srachSrt = `
        ${searchURL}
        ${sliUserId ? `&uid=${sliUserId}` : ''}
        &cip=${clientIpDetails}
        &w=${targetObj.value}
        &ref=${pageURL}
        &ua=${clientUserAgent}
        ${targetObj.facet ? `&af=${targetObj.facet}` : '&af=pagetype:products'}
        `;
    axios
      .get(srachSrt)
      .then((res) => {
        setShowLoader(false);
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
          setSearchData(false);
        }
      })
      .catch((error) => {
        setShowLoader(false);
        notify(`Search error ${error}`, 'error');
        setSearchData(false);
      });
  };

  /** on change seacrh field value and update functionality */
  const searchNow = (e) => {
    const targetObj = e.target;
    if (targetObj.value.trim() === '') {
      targetObj.value = '';
    }
    const targetValue = targetObj.value;
    if (show && targetValue.length === 0) {
      setShow(false);
    }
    clearTimeout(searchTimeOut);
    setSearchWord(targetValue);
    if (targetValue.length > 0) {
      setSearchTimeOut(
        setTimeout(() => {
          setShow(true);
          setTarget(targetObj);
          getSearchResult(targetObj);
        }, 0)
      );
    }
  };

  const callFnWithDebounce = debounce(searchNow, 300);

  /** hide popover logicaly checking stop propagation when click search filed */
  const onHidePop = (e) => {
    if (e.target.value !== target.value) setShow(false);
  };

  /** checking client IP and update storage */
  useEffect(() => {
    if (isCallIp) setPageURL(encodeURIComponent(window.location.href));
    if (clientUserAgent === '' && !isCallIp)
      setClientUserAgent(encodeURIComponent(navigator.userAgent));
    if (!isCallIp) setIsCallIp(true);
    return () => false;
  });

  const closePop = () => {
    setShow(false);
  };

  /** onclick trigger search */
  const triggerSearch = (e) => {
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
    if (!show) {
      const targetObj = e.target;
      const targetValue = targetObj.value;
      if (targetValue.length > 0) {
        setTimeout(() => {
          setShow(true);
          setTarget(targetObj);
          getSearchResult(targetObj);
        }, 0);
      }
    }
  };

  /** suggestion over search */
  const suggestionOver = (e, suggestion, facet) => {
    if (
      facet
        ? searchSeggestionText !== facet
        : searchSeggestionText !== suggestion
    ) {
      const targetObj = {
        value: suggestion,
        facet,
      };
      setSearchSeggestionText(facet || suggestion);
      setTimeout(() => {
        getSearchResult(targetObj, true);
      }, 0);
      const isActive = document.querySelector('.acc-active-suggest');
      if (isActive) isActive.classList.remove('acc-active-suggest');
      e.target.closest('.acc-desk-suggest').classList.add('acc-active-suggest');
    }
  };

  /**
   * display the suggestion text
   */
  const displaySuggestion = () => {
    let suggestionText = `"${searchData.suggestion_text}"`;
    const scopeSuggest =
      searchData.search_suggestions_scopes &&
      searchData.search_suggestions_scopes.scopes.length > 0
        ? searchData.search_suggestions_scopes.scopes.filter(
            (item) => item.facet === searchData.suggestion_text
          )
        : false;
    if (scopeSuggest.length > 0) {
      suggestionText = `"${searchData.search_suggestions[0].suggestion}" IN ${scopeSuggest[0].title}`;
    }
    return suggestionText;
  };

  /**
   * submit search by form submit and enter key
   */

  const submitSearch = (e) => {
    e.preventDefault();
    const keyword = document.querySelector('[name=desktop-search').value;
    const asPath = `/${router.query.zone_lang}/search`;
    if (keyword.length > searchLimit) {
      const searchKeyword =
        searchData && searchData.searched_term
          ? `keyword=${searchData.searched_term}`
          : `keyword=${keyword}`;
      router.push(`/${router.query.zone_lang}/search?${searchKeyword}`);
      setShow(false);
    } else {
      notify('Please use 4 or more characters', 'warn');
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
    const keyWordRegex = /^([a-zA-Z0-9,/\s/-]*)$/;
    if (keyWordRegex.test(getVal) === false) {
      targetObj.value = targetObj.value.replace(/[^a-zA-Z0-9,/\s/-]/g, '');
    }
  };
  return (
    <>
      <Form onSubmit={(e) => submitSearch(e)}>
        <Form.Group className={`${styles['acc-desktop-search']} w-100 mb-0`}>
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text className="bg-white">
                <ReactSVG
                  src="/assets/images/icons/search.svg"
                  className={`fill-medium ${styles['acc-search-icon']}`}
                />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="SEARCH"
              type="text"
              name="desktop-search"
              className="border-left-0"
              onChange={(e) => callFnWithDebounce(e)}
              onClick={(e) => {
                triggerSearch(e);
              }}
              onBlur={validationFormField}
              onKeyUp={validationFormField}
              autoComplete="off"
            />
          </InputGroup>
          <input
            type="hidden"
            name="_csrf"
            value={randomAlphanumericString(16)}
          />
        </Form.Group>
      </Form>
      <Overlay
        show={show}
        placement="bottom-end"
        containerPadding={20}
        target={target}
        container={ref.current}
        rootClose
        onHide={(e) => onHidePop(e)}
      >
        <Popover
          id="popover-search"
          className={`${styles['acc-popover-search']} shadow-1`}
        >
          {showLoader ? (
            <SearchPopSkeletonLoader />
          ) : (
            <Popover.Content className={styles['popover-body']}>
              <Row noGutters="true" className="h-100">
                <Col xs className={styles['acc-suggestion-bar']}>
                  <header className="text-uppercase bg-primary text-white text-center px-3 py-2">
                    Search Suggestions
                  </header>
                  <ul className={styles['acc-suggestion-list']}>
                    {!(searchData && searchData.search_suggestions) &&
                    target ? (
                      <li>
                        <I18nLink href={`/search?keyword=${target.value}`}>
                          <a
                            className="d-block p-3"
                            role="button"
                            tabIndex={0}
                            onKeyPress={() => false}
                            onClick={() => setShow(false)}
                          >
                            {target.value}
                          </a>
                        </I18nLink>
                      </li>
                    ) : null}
                    {searchData && searchData.search_suggestions
                      ? searchData.search_suggestions.map(
                          (suggestion, indx) => (
                            <li
                              className="acc-desk-suggest"
                              key={suggestion.suggestion}
                            >
                              <I18nLink
                                href={`/search?keyword=${suggestion.suggestion}`}
                              >
                                <a
                                  className="d-block p-3"
                                  onMouseEnter={(e) => {
                                    suggestionOver(e, suggestion.suggestion);
                                  }}
                                  role="button"
                                  tabIndex={0}
                                  onKeyPress={() => false}
                                  onClick={() => setShow(false)}
                                >
                                  {suggestion.suggestion}
                                </a>
                              </I18nLink>
                              {indx === 0 &&
                              searchData.search_suggestions_scopes &&
                              searchData.search_suggestions_scopes.scopes
                                .length > 0 ? (
                                <ul>
                                  {searchData.search_suggestions_scopes.scopes.map(
                                    (suggestionScope) => (
                                      <li
                                        className="acc-desk-suggest"
                                        key={suggestionScope.facet}
                                      >
                                        <I18nLink
                                          href={`/search?keyword=${
                                            searchData.search_suggestions[0]
                                              .suggestion
                                          }&filter=|${suggestionScope.facet.replace(
                                            /:/g,
                                            '-'
                                          )}`}
                                        >
                                          <a
                                            className="d-block p-3 pl-4"
                                            onMouseEnter={(e) => {
                                              suggestionOver(
                                                e,
                                                searchData.search_suggestions[0]
                                                  .suggestion,
                                                suggestionScope.facet
                                              );
                                            }}
                                            role="button"
                                            tabIndex={0}
                                            onKeyPress={() => false}
                                            onClick={() => setShow(false)}
                                          >
                                            <em className="text-medium">in</em>
                                            {` ${suggestionScope.title}`}
                                          </a>
                                        </I18nLink>
                                      </li>
                                    )
                                  )}
                                </ul>
                              ) : null}
                            </li>
                          )
                        )
                      : null}
                  </ul>
                </Col>
                <Col className={`${styles['acc-search-product']} border-left`}>
                  {searchData && searchData.suggestion_text ? (
                    <header className="text-uppercase bg-primary text-white text-center px-3 py-2 text-ellipsis">{`Product Suggestions for ${displaySuggestion()}`}</header>
                  ) : (
                    <header className="text-uppercase bg-primary text-white text-center px-3 py-2 text-ellipsis">{`Product Suggestions for "${
                      target ? target.value : ''
                    }"`}</header>
                  )}
                  <div className="p-3">
                    {searchData && searchData.product_suggestions ? (
                      <>
                        <Row className="px-2">
                          {searchData.product_suggestions.map((product) => (
                            <DisplaySearchProducts
                              key={product.sku}
                              closePop={() => closePop()}
                              product={product}
                            />
                          ))}
                        </Row>
                        {searchData.result_meta.total > 6 &&
                        searchWord.length > searchLimit ? (
                          <I18nLink
                            href={`/search?keyword=${
                              searchData.searched_term || searchWord
                            }`}
                          >
                            <Button
                              onClick={() => setShow(false)}
                              variant="secondary"
                              block
                              className="text-uppercase mt-3"
                            >
                              {`View More (${searchData.result_meta.total})`}
                            </Button>
                          </I18nLink>
                        ) : null}
                      </>
                    ) : (
                      <div className="text-center">No Products Found</div>
                    )}
                  </div>
                </Col>
              </Row>
            </Popover.Content>
          )}
        </Popover>
      </Overlay>
    </>
  );
};

export default SearchDesktop;
