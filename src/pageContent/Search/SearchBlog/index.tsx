import { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import axios from "axios";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import { getCookie } from "@Hooks/criptoEncodeDecodeCookie";
import getIpDetails from "@Hooks/getIpDetails";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import dynamic from "next/dynamic";

const SearchBlogData = dynamic(
  () => import("@Components/Search/SearchBlogData"),
);
const ProductToolbarSearch = dynamic(
  () => import("@Components/Search/ProductToolbarSearch"),
);
const SearchFilter = dynamic(() => import("@Components/Search/SearchFilter"));
const SearchMenu = dynamic(() => import("@Components/Search/SearchMenu"));
const ErrorCustom = dynamic(() => import("@Components/ErrorCustom"));
const SearchSkeletonLoader = dynamic(
  () => import("@Components/Search/SearchSkeletonLoader"),
);
const ProductSuggestions = dynamic(
  () => import("@Components/Search/ProductSuggestions"),
);
const SearchPagination = dynamic(
  () => import("@Components/Search/SearchPagination"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const SearchBlog = () => {
  const router = useRouter();
  const urlSearchKeyword = router.query.keyword ? router.query.keyword : "";
  const searchURL = `${process.env.NEXT_PUBLIC_SLI_SEARCH_URL}?lbc=accuride&method=and&p=Q&ts=json-full`;
  const { notify } = useContext(AuthContext);
  const [searchNoResult, setSearchNoResult] = useState(true);
  const [searchList, setSearchList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [searchKey, setSearchKey] = useState("");
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  const [spelling, setSpelling] = useState(null);
  const [totalCount, setTotalCount] = useState(0);
  const [pageURL, setPageURL] = useState("");
  const [clientUserAgent, setClientUserAgent] = useState("");
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  let isListView = true;
  const [searchSLIData, setSearchSLIData] = useState();
  const [isCallIp, setIsCallIp] = useState(false);
  const [clientIpDetails, setClientIpDetails] = useState(false);
  const [AllSearchCountArr, setAllSearchCountArr] = useState([]);
  const loopCount = 1;
  //breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: "Blog",
      isClickable: false,
    },
    { url: "", name: urlSearchKeyword },
  ];
  useEffect(() => {
    getIpDetails().then((data) => {
      setClientIpDetails(data);
    });
  }, []);

  /** readySearchParam  for Search API call */
  const readySelectedSearchParam = () => {
    let selectedFilterObject = "";
    const filterParm = router.query.filter;
    const selectedFilter = filterParm.split("|").filter((x) => x !== "");
    if (selectedFilter.length > 0) {
      selectedFilterObject = selectedFilter.join(" ");
      selectedFilterObject = selectedFilterObject.replace(/-/g, ":");
    }
    return selectedFilterObject;
  };

  if (router.query.view && windowObj && windowSize.width > 1024) {
    if (router.query.view === "list") isListView = true;
  }

  if (router.query.filter) {
    readySelectedSearchParam();
  }

  const provideSliGtmData = (trackinigCode) => {
    GTMEventFn("", trackinigCode);
  };

  /*
   * SLI API call
   */
  const getSearchResult = (keyword) => {
    // setShowLoader(true);
    const sliUserId = localStorage.getItem("sliUserId");
    const searchShort = router.query.sort ? router.query.sort : "globalpop";
    const searchLimit = router.query.limit ? router.query.limit : 12;
    const startfrom = router.query.page
      ? (router.query.page - 1) * searchLimit
      : 0;
    const commands = router.query.rank ? "KK" : "Q";
    const rank = router.query.rank ? router.query.rank : false;
    const prevKeyword = router.query.pw ? router.query.pw : false;
    const filter = router.query.filter
      ? `pagetype:blogs ${readySelectedSearchParam()}`
      : "pagetype:blogs";
    const SLIBeacon = getCookie("SLIBeacon");
    const srachSrt = `${searchURL}&SLIBeacon=${SLIBeacon}${
      sliUserId ? `&uid=${sliUserId}` : ""
    }&cip=${clientIpDetails}&ref=${pageURL}&ua=${clientUserAgent}&p=${commands}&w=${keyword}&isort=${searchShort}&cnt=${searchLimit}&srt=${startfrom}${
      rank ? `&rk=${rank}` : ""
    }${prevKeyword ? `&pw=${prevKeyword}` : ""}${
      filter ? `&af=${filter}` : ""
    }&nocache=${new Date().getTime()}`;
    axios({
      method: "GET",
      url: srachSrt,
      withCredentials: true,
    })
      .then((res) => {
        setShowLoader(false);
        setSearchNoResult(false);
        const searchResult = res.data;
        setSearchSLIData(searchResult);
        setAllSearchCountArr(res.request.response);
        localStorage.setItem("sliUserId", searchResult.userid);
        if (searchResult.results) {
          setSearchList(searchResult.results);
          setTotalCount(searchResult.result_meta.total);
          setSpelling(null);
        } else {
          setTotalCount(0);
          if (searchResult.spelling) {
            setSpelling(searchResult.spelling.phrase);
          }
        }
        provideSliGtmData(searchResult.tracking);
      })
      .catch((error) => {
        setShowLoader(false);
        notify(`Search error ${error}`, "error");
      });
  };

  /**
   * Search the key word
   */
  const searchNow = (keyword, isNewSearch) => {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(searchTimeOut);
    setSearchKey(keyword);
    // Make a new timeout set to go off in 1000ms (1 second)
    setSearchTimeOut(
      setTimeout(() => {
        if (keyword !== "") {
          const isurlUpdate = !(
            router.query.sort ||
            router.query.limit ||
            router.query.page ||
            router.query.rank ||
            router.query.filter ||
            router.query.view
          );

          if (isurlUpdate || isNewSearch) {
            const asPath = router.asPath.split("?")[0];
            const searchKeyword = `keyword=${keyword}`;
            router.push(
              { pathname: router.pathname, query: searchKeyword },
              `${asPath}${"?"}${searchKeyword}`,
              { shallow: true },
            );
          }
          getSearchResult(keyword);
          const msearch = document.querySelector('[name="msearch"]');
          if (msearch) msearch.value = keyword;
        } else {
          setSearchList([]);
        }
      }, 1000),
    );
  };

  useEffect(() => {
    if (pageURL === "" && !isCallIp)
      setPageURL(encodeURIComponent(window.location.href));
    if (clientUserAgent === "" && !isCallIp)
      setClientUserAgent(encodeURIComponent(navigator.userAgent));

    const searchFiled = document.querySelector('input[name="desktop-search"]');
    if (searchFiled && router.query.keyword)
      searchFiled.value = router.query.keyword;
    if (!isCallIp) setIsCallIp(true);
  });

  useEffect(() => {
    setTimeout(() => {
      if (
        urlSearchKeyword !== "" &&
        clientIpDetails &&
        pageURL !== "" &&
        clientUserAgent !== ""
      )
        searchNow(urlSearchKeyword);
    }, 300);
  }, [
    clientIpDetails,
    pageURL,
    clientUserAgent,
    router.query.keyword,
    router.query.sort,
    router.query.limit,
    windowObj,
    router.query.page,
    router.query.filter,
  ]);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    const searchFiled = document.querySelector('input[name="desktop-search"]');
    if (searchFiled && router.query.keyword)
      searchFiled.value = router.query.keyword;
    return () => {
      if (searchFiled) searchFiled.value = "";
    };
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      {showLoader ? (
        <SearchSkeletonLoader pageName="blog" />
      ) : (
        <Container
          className={`acc-products-wrap acc-search-wrap ${
            spelling ? "" : "pt-xl-4"
          } ${isListView ? " listView" : ""}`}
        >
          {router.query.keyword && router.query.keyword !== "" && (
            <h1 className="text-uppercase mt-0 d-none d-xl-block pt-0 pb-3 mb-4 border-bottom border-medium">
              {`Search Results for '${router.query.keyword}'`}
            </h1>
          )}
          <Row>
            {windowObj &&
            windowSize.width > 1024 &&
            searchSLIData &&
            searchSLIData.result_meta.total !== 0 ? (
              <Col
                xs={12}
                xl
                className="acc-product-sidebar stickyFilter px-0 px-xl-3"
              >
                <SearchFilter
                  searchNow={(keyWord, isNewSearch) =>
                    searchNow(keyWord, isNewSearch)
                  }
                  searchSLIData={searchSLIData}
                  showLoader={setShowLoader}
                />
              </Col>
            ) : null}

            {windowObj && windowSize.width < 1024 ? (
              <Col
                xs={12}
                xl
                className="acc-product-sidebar stickyFilter px-0 px-xl-3"
              >
                <SearchFilter
                  searchNow={(keyWord, isNewSearch) =>
                    searchNow(keyWord, isNewSearch)
                  }
                  searchSLIData={searchSLIData}
                  showLoader={setShowLoader}
                />
              </Col>
            ) : null}

            <Col xs={12} xl className="pl-xl-3 px-0">
              <Container className="acc-product-listing">
                <SearchMenu
                  data={AllSearchCountArr}
                  keyWord={urlSearchKeyword}
                />
                {searchList.length > 0 &&
                windowObj &&
                windowSize.width > 1024 &&
                searchSLIData.result_meta.total !== 0 ? (
                  <ProductToolbarSearch
                    suggestions={searchSLIData.suggestions}
                    resultMeta={searchSLIData.result_meta}
                    pageInfo={searchSLIData.pages}
                    searchSLIData={searchSLIData}
                    showLoader={setShowLoader}
                  />
                ) : null}
                <section className="position-relative acc-avilable-product pt-5 pt-xl-0 pb-5 mt-xl-3">
                  {searchKey !== "" ? (
                    <>
                      {totalCount !== 0 ? (
                        <>
                          {[
                            isListView ? (
                              searchList.map((eachData, index) => (
                                <Row key={`blogRowNo_${loopCount + index}`}>
                                  <SearchBlogData
                                    blog={eachData}
                                    isListView={isListView}
                                  />
                                </Row>
                              ))
                            ) : (
                              <Row key="blogRowNo_1" className="px-2">
                                {searchList.map((eachData) => (
                                  <SearchBlogData
                                    blog={eachData}
                                    isListView={isListView}
                                  />
                                ))}
                              </Row>
                            ),
                          ]}
                        </>
                      ) : (
                        <>
                          {!searchNoResult ? (
                            <Col xs={12}>
                              <ErrorCustom searchWord={spelling || ""} />
                            </Col>
                          ) : null}
                        </>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                  {/* suggestions start */}
                  {searchSLIData &&
                  searchSLIData.suggestions &&
                  windowObj &&
                  windowSize.width > 1024 &&
                  searchSLIData.result_meta.total !== 0 ? (
                    <ProductSuggestions
                      suggestions={searchSLIData.suggestions}
                    />
                  ) : null}
                  {/* suggestions end */}
                  {searchSLIData &&
                  searchSLIData.pages &&
                  searchList.length > 0 ? (
                    <>
                      <SearchPagination
                        resultMeta={searchSLIData.result_meta}
                        pageInfo={searchSLIData.pages}
                        showLoader={setShowLoader}
                      />
                    </>
                  ) : null}
                </section>
              </Container>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SearchBlog;
