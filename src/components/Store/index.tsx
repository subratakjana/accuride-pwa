import { useState, useEffect, useContext } from "react";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import { useManualQuery } from "graphql-hooks";
import GET_PRODUCTS_BY_FILTER from "@Graphql/queries/getProductsByFilter.graphql";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AuthContext } from "@Contexts/AuthContext";
import Accordion from "react-bootstrap/Accordion";
import { useRouter } from "next/router";
import { ProductCompareProvider } from "@Contexts/ProductCompareContext";
import { GTMEventFn } from "@Components/Utilities/gtmUtils";
import NextImage from "next/legacy/image";
import useWindowDimensions from "@Hooks/windowDimention";
import { isBrowser } from "react-device-detect";

const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);
const DynamicImportFilter = dynamic(() => import("./Filters"));
const DynamicImportProductsWrapper = dynamic(
  () => import("./ProductsWrapper"),
);
const DynamicImportGenerateCompareBlock = dynamic(
  () => import("@PageContent/CompareProductBlock"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const ProductAdvertisements = dynamic(
  () => import("@Components/ProductAdvertisements"),
);
const ProductToolbar = dynamic(() => import("./ProductToolbar"));
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const LoadingSkeleton = (/** @type {{ isListView: any; }} */ props) => {
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
          <Col xs={{ order: 2, span: 12 }} className="px-xl-3 px-0" />
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
                      ? "border-bottom border-light pb-2"
                      : ""
                  }`}
                >
                  <Skeleton count={0.5} />
                </h3>
                <Row className="px-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Col
                      xs={6}
                      sm={4}
                      xl={isListView ? "12" : ""}
                      key={i}
                      className={`acc-product-block mb-3 px-2 ${
                        isListView
                          ? "col-xxl-12 d-flex flex-row align-items-start"
                          : "col-xxl-3"
                      }`}
                    >
                      <div
                        className={`position-relative w-100 ${
                          isListView ? "mr-4" : "mb-3"
                        }`}
                      >
                        <Skeleton height={248} />
                      </div>
                      <div className={`flex-1 ${isListView ? "mr-3" : ""}`}>
                        <Skeleton count={0.5} />
                        <Skeleton count={1.25} />
                      </div>
                      <div
                        className={`${
                          isListView ? "flex-none acc-product-btns" : "w-100"
                        }`}
                      >
                        <div
                          className={`d-flex w-100 ${
                            isListView ? "flex-column" : ""
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
                        <h6 className={`${isListView ? "mt-2 mb-0" : "mt-3"}`}>
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

/**
 *
 *
 * @param {string | string[]} [filterParm=""]
 * @return {*}
 */
const readyObjectFromQueryParam = (filterParm = "") => {
  const filterAsStr = Array.isArray(filterParm)
    ? filterParm.join("")
    : filterParm;
  const multipleFilter = filterAsStr.split("|").filter((x) => x !== "");
  /** @type {Record<string, any>} */
  const filterObjUrl = {};
  multipleFilter.map((item) => {
    const multipleObject = item.split("-");
    filterObjUrl[multipleObject[0]] = {
      in: multipleObject[1].split(","),
    };
    return filterObjUrl;
  });
  return filterObjUrl;
};

const targetLimit = [12, 24, 48];

/**
 *
 *
 * @param {number} defaultLimit
 * @param {boolean} isOnBrowser
 * @param {number[]} [targetLimits]
 * @param {string} [urlLimit]
 * @return {number}
 */
const getSelectedLimit = (
  defaultLimit,
  isOnBrowser,
  targetLimits,
  urlLimit,
) => {
  if (!isOnBrowser) return defaultLimit;
  if (!urlLimit) return 12;
  return targetLimits.includes(Number(urlLimit)) ? Number(urlLimit) : 12;
};

/**
 * @typedef {{id: number;name: string;}} Category
 */

/**
 *
 *
 * @param {{
 *  categories?: Category[],
 *  sku : string,
 *  name : string,
 *  product_price_range : {
 *  minimum_price: {
 *      final_price: {
 *          value: number
 *      }
 *  }
 * },
 * }[]} productsArr
 */
const provideGtmValue = (productsArr) => {
  let itemArr = [];
  let totalVal = 0;
  const gtmProducts = productsArr.map((item, index) => {
    totalVal =
      totalVal + item.product_price_range.minimum_price.final_price.value;
    itemArr.push({
      id: item.sku,
      google_business_vertical: "retail",
    });

    const categoryNames =
      item.categories
        ?.map((cat) => (cat.id !== 7 ? cat.name : false))
        .filter(Boolean) ?? [];

    return {
      id: item.sku, // Product ID or SKU of the product.
      name: item.name, // The name of the product.
      brand: "Accuride", // The brand name of the product.
      category: categoryNames.length > 0 ? categoryNames.join(",") : "Shop", // Product category*
      list: "Mini Catalog", // The list name of item**
      price: item.product_price_range.minimum_price.final_price.value, // Item price
      position: index + 1,
    };
  });
  GTMEventFn({
    event: "view_item_list",
    ecommerce: {
      impressions: [...gtmProducts],
    },
  });
  if (window && window.dataLayer) {
    function gtag() {
      window.dataLayer.push(arguments);
    }
    // Call gtag with the 'view_item_list' event and relevant arguments
    gtag("event", "view_item_list", {
      value: Number(totalVal.toFixed(2)),
      items: itemArr,
    });
  }
};

const Store = ({ getZoneLang, catId, productFilteredResp, queryData }) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [pageLoad, setPageLoad] = useState(queryData);
  const [allFilteredData, setAllFilteredData] = useState(
    productFilteredResp.data,
  );
  // breadcrumb
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbsPLP = [];
  let crumbsShop = [];
  let crumbsAccessoriesPLP = [];
  let removeSpeCharact = router.asPath.split("/");
  if (
    removeSpeCharact[removeSpeCharact.length - 1].includes("?") === false &&
    removeSpeCharact[removeSpeCharact.length - 1].includes("#") === false &&
    pathSegments.length > 2 &&
    pathSegments[2] !== "accessories"
  ) {
    crumbsPLP = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("?")[0],
      },
    ];
    crumbsShop = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("?")[0],
      },
    ];
  }

  if (
    pathSegments.length > 2 &&
    (pathSegments[2] !== "accessories" || pathSegments[2] !== "accessories?")
  ) {
    if (removeSpeCharact[removeSpeCharact.length - 1].includes("?")) {
      crumbsPLP = [
        { url: `/${router.query.zone_lang}`, name: "Home" },
        {
          url: `/${router.query.zone_lang}/${pathSegments[1]}`,
          name: pathSegments[1],
        },
        {
          url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
          name: pathSegments[2],
        },
        {
          url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[2]}`,
          name: removeSpeCharact[removeSpeCharact.length - 1].split("?")[0],
        },
      ];
      crumbsShop = [
        { url: `/${router.query.zone_lang}`, name: "Home" },
        {
          url: `/${router.query.zone_lang}/${pathSegments[1]}`,
          name: pathSegments[1],
        },
        {
          url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
          name: removeSpeCharact[removeSpeCharact.length - 1].split("?")[0],
        },
      ];
    }
  }
  if (
    removeSpeCharact[removeSpeCharact.length - 1].includes("#") &&
    pathSegments.length > 2 &&
    pathSegments[2] !== "accessories"
  ) {
    crumbsPLP = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: pathSegments[2],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("#")[0],
      },
    ];
    crumbsShop = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("#")[0],
      },
    ];
  }
  if (
    removeSpeCharact[removeSpeCharact.length - 1].includes("?") &&
    pathSegments.length === 3
  ) {
    crumbsAccessoriesPLP = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("?")[0],
      },
    ];
  }
  if (
    removeSpeCharact[removeSpeCharact.length - 1].includes("#") === false &&
    removeSpeCharact[removeSpeCharact.length - 1].includes("?") === false &&
    pathSegments.length > 2 &&
    pathSegments[2] === "accessories"
  ) {
    crumbsAccessoriesPLP = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeCharact[removeSpeCharact.length - 1].split("#")[0],
      },
    ];
  }
  if (
    removeSpeCharact[removeSpeCharact.length - 1].includes("#") &&
    pathSegments.length === 3
  ) {
    crumbsAccessoriesPLP = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
      {
        url: `/${pathSegments[0]}/${pathSegments[1]}/${pathSegments[2]}`,
        name: pathSegments[2],
      },
    ];
  }
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (error) {
      console.log("error", error);
    }
  });
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const [accordion, setState] = useState({ activeKey: 0 });
  const [routeChangeMode, setRouteChangeMode] = useState(false);
  const { notify, simpleRedirect } = useContext(AuthContext);
  const [isCrossImageChecked, crossImagecheck] = useState(true);
  // const siteConfig = useContext(StoreConfigContext);

  // For get the scroll position
  const [otherProductShow, setOtherProductShow] = useState(false);
  useEffect(() => {
    const onScroll = (e) => {
      const windowElem = e.target.documentElement.scrollTop;
      if (windowElem >= 10) {
        setOtherProductShow(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // End

  /** accordian expanded state handling */
  const accordianClickedEvent = (index) => {
    setState({
      ...accordion,
      activeKey: accordion.activeKey !== index ? index : -1,
    });
  };
  const paginationData = {
    currentPageOnline: router.query.p ? router.query.p : 1,
    currentPageOther: router.query.o_p ? router.query.o_p : 1,
  };
  const filterQueryFilter = {
    category_id: { eq: catId },
  };

  const selectedFiltersQuery = readyObjectFromQueryParam(router.query.filter);
  const selectedShortQuery = Object.fromEntries(
    router?.query?.sort ? [router?.query?.sort.split("-")] : [],
  );
  const isListView = router?.query?.view === "list" && windowSize.width > 1024;
  /** check noumber of limit from url query */
  const limit = getSelectedLimit(
    6,
    isBrowser,
    targetLimit,
    Array.isArray(router.query.limit)
      ? router.query.limit[0]
      : router.query.limit,
  );

  const [getFilteredData, { loading }] = useManualQuery(
    GET_PRODUCTS_BY_FILTER.loc.source.body,
    {
      context: {
        headers: {
          Store: getZoneLang === "en-ca" ? "canada" : "default",
          "Content-Currency": getZoneLang === "en-ca" ? "CAD" : "USD",
        },
      },
      fetchPolicy: "cache-and-network",
      errorPolicy: "ignore",

      onSuccess: (data) => {
        const res = data.data;
        setAllFilteredData(res);
        const avilableProducts =
          res.online && res.online.products.length > 0
            ? res.online.products.filter((item) => item.product_for_sales !== 0)
            : [];
        provideGtmValue(avilableProducts);
      },
    },
  );

  useEffect(() => {
    if (router.isReady) {
      if (pageLoad === 1 && allFilteredData) {
        setPageLoad(2);
        if (
          router.query.filter ||
          router.query.sort ||
          router.query.p ||
          router.query.o_p ||
          router.query.limit
        ) {
          getFilteredData({
            variables: {
              category_id: catId,
              current_page_online:
                Number(paginationData.currentPageOnline) === 0
                  ? 1
                  : paginationData.currentPageOnline,
              current_page_other:
                Number(paginationData.currentPageOther) === 0
                  ? 1
                  : paginationData.currentPageOther,
              filter_obj_online: {
                ...filterQueryFilter,
                ...selectedFiltersQuery,
                product_for_sales: { eq: "1" },
              },
              filter_obj_other: {
                ...filterQueryFilter,
                ...selectedFiltersQuery,
                product_for_sales: { eq: "0" },
              },
              filter_obj_filter: {
                ...filterQueryFilter,
                ...selectedFiltersQuery,
              },
              filter_obj_short: { ...selectedShortQuery },
              page_size: limit,
              zone: getZoneLang,
            },
          });
        }
      } else {
        getFilteredData({
          variables: {
            category_id: catId,
            current_page_online:
              Number(paginationData.currentPageOnline) === 0
                ? 1
                : paginationData.currentPageOnline,
            current_page_other:
              Number(paginationData.currentPageOther) === 0
                ? 1
                : paginationData.currentPageOther,
            filter_obj_online: {
              ...filterQueryFilter,
              ...selectedFiltersQuery,
              product_for_sales: { eq: "1" },
            },
            filter_obj_other: {
              ...filterQueryFilter,
              ...selectedFiltersQuery,
              product_for_sales: { eq: "0" },
            },
            filter_obj_filter: {
              ...filterQueryFilter,
              ...selectedFiltersQuery,
            },
            filter_obj_short: { ...selectedShortQuery },
            page_size: limit,
            zone: getZoneLang,
          },
        });
      }
    }
  }, [router]);

  /** error handling listing page */
  const iferrorRedirect = (errorMode) => {
    setRouteChangeMode(true);
    if (!errorMode)
      notify("sorry, we are not getting any data with this filter...", "error");
    const asPath = router.asPath.split("?");
    if (asPath.length >= 2) {
      router.push(asPath[0]);
    } else {
      simpleRedirect("/");
    }
  };

  if (
    !routeChangeMode &&
    windowObj &&
    loading === false &&
    (!allFilteredData ||
      allFilteredData.length === 0 ||
      (allFilteredData && allFilteredData.online === null) ||
      allFilteredData.others === null)
  ) {
    iferrorRedirect();
  }

  const avilableProductsList = allFilteredData
    ? [...allFilteredData.online.products]
    : [];
  const avilableProducts = avilableProductsList.filter(
    (item) => item.product_for_sales !== 0,
  );
  const otherProductsList = allFilteredData
    ? [...allFilteredData.others.products]
    : [];
  const otherProducts = otherProductsList.filter(
    (item) => item.product_for_sales !== 1,
  );

  /**
   * Url param set when tap on prev or next button.
   * set url by window history push state with out reloading page.
   * @param {*} paginationObj
   * @param {*} currentPage
   */
  const paginationUrlSet = (paginationObj, currentPage) => {
    let querySign = "";
    let pageQuery = "";
    if (window.location.search) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.delete("p");
      urlParams.delete("o_p");
      pageQuery += `${urlParams.toString()}`;
      if (pageQuery !== "") pageQuery += "&";
      querySign = "?";
    }
    const currentPageOnline =
      paginationObj.productFor === 1
        ? currentPage
        : allFilteredData.online.page_info.current_page;
    const currentPageOther =
      paginationObj.productFor === 0
        ? currentPage
        : allFilteredData.others.page_info.current_page;
    const pageKey = ["o_p", "p"];
    const searchParmas = window.location.search;
    if (
      searchParmas &&
      searchParmas !== "" &&
      (searchParmas.indexOf("p") > 0 || searchParmas.indexOf("o_p") > 0)
    ) {
      pageQuery += `${[pageKey[1]]}=${currentPageOnline}&${[
        pageKey[0],
      ]}=${currentPageOther}`;
      querySign = "?";
    } else {
      querySign = "?";
      pageQuery += `${[pageKey[paginationObj.productFor]]}=${currentPage}`;
    }
    const asPath = router.asPath.split("?")[0];

    router.push(
      { pathname: router.pathname, query: pageQuery },
      `${asPath}${querySign}${pageQuery}`,
      { shallow: true },
    );
  };

  /**
   * Pagination product listing.
   * controll online and other product pagination with one handler.
   * With this handler Get response from child component.
   * pass the function with paginationCallback key in child component.
   * @param {{ productFor: number; states: string; selectPageNo: any; }} paginationObj
   */
  const paginationProduct = (paginationObj) => {
    const totalPage =
      paginationObj.productFor === 1
        ? allFilteredData.online.page_info.total_pages
        : allFilteredData.others.page_info.total_pages;
    let currentPage =
      paginationObj.productFor === 1
        ? allFilteredData.online.page_info.current_page
        : allFilteredData.others.page_info.current_page;

    if (
      totalPage !== currentPage &&
      paginationObj.states === "next" &&
      currentPage >= 1
    ) {
      currentPage += 1;
    } else if (paginationObj.states === "prev") {
      currentPage -= 1;
    }
    if (paginationObj.selectPageNo) currentPage = paginationObj.selectPageNo;
    paginationUrlSet(paginationObj, currentPage);
  };

  const returnHtmlContent = (id, content) => (
    <Col xs="12" md="6" className="d-flex align-items-center">
      <div className="acc-cms-content">
        <HTMLContent id={id} content={content} />
      </div>
    </Col>
  );

  return (
    <>
      {loading ? (
        <LoadingSkeleton isListView={isListView} />
      ) : (
        <>
          {allFilteredData ? (
            <>
              {allFilteredData.categoryDescription[0].description !== null &&
                (pathSegments[2] !== "accessories" ||
                  pathSegments[2] !== "accessories?") &&
                pathSegments.length !== 3 && <BreadCrumbs crumbs={crumbsPLP} />}
              {allFilteredData.categoryDescription[0].description == null &&
                pathSegments[2] !== "accessories" && (
                  <BreadCrumbs crumbs={crumbsShop} />
                )}
              {allFilteredData.categoryDescription[0].description !== null &&
                pathSegments.length === 3 && (
                  <BreadCrumbs crumbs={crumbsAccessoriesPLP} />
                )}
              <ProductCompareProvider>
                <Container
                  className={`acc-products-wrap pt-xl-2 ${
                    isListView ? " listView" : ""
                  }`}
                >
                  <Row>
                    {allFilteredData?.categoryDescription[0]?.description !==
                    null ? (
                      <Col xs={{ order: 2, span: 12 }} className="px-xl-3 px-0">
                        {windowObj && windowSize.width <= 1024 ? (
                          <article className="acc-category-view-mob">
                            <div className="embed-responsive embed-responsive-10by9">
                              <NextImage
                                src={`${
                                  allFilteredData.categoryDescription[0].category_image_url.includes(
                                    process.env
                                      .NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT,
                                  ) ||
                                  allFilteredData.categoryDescription[0].category_image_url.includes(
                                    process.env.NEXT_PUBLIC_BASE_PATH,
                                  )
                                    ? allFilteredData.categoryDescription[0]
                                        .category_image_url
                                    : `${process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT}${allFilteredData.categoryDescription[0].category_image_url}`
                                }?width=700`}
                                alt={
                                  allFilteredData.categoryDescription[0].name
                                }
                                layout="fill"
                                objectFit="contain"
                                objectPosition="center"
                                className="object-cover"
                                priority
                              />
                            </div>
                            <div className="acc-content px-3 text-center pt-4 pb-0">
                              <h1 className="text-uppercase mb-3">
                                {allFilteredData.categoryDescription[0].name}
                              </h1>
                              <div className="acc-cms-content">
                                <HTMLContent
                                  id={allFilteredData.categoryDescription[0].id}
                                  content={
                                    allFilteredData.categoryDescription[0]
                                      .description
                                  }
                                />
                              </div>
                            </div>
                          </article>
                        ) : (
                          <Accordion
                            defaultActiveKey="0"
                            className="acc-category-view-web border-bottom border-medium mb-4 acc-custom-accordion"
                          >
                            <Accordion.Toggle
                              as={Col}
                              variant="link"
                              eventKey="0"
                              className={`px-0 text-left bg-white ${
                                accordion.activeKey === 0
                                  ? "text-primary acc-arrow-transform"
                                  : "text-dark"
                              }`}
                              onClick={() => accordianClickedEvent(0)}
                            >
                              <h1 className="text-uppercase mb-2 cursor-pointer">
                                {allFilteredData.categoryDescription[0].name}
                              </h1>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                              <Row className="pb-4 pt-2">
                                <Col xs="12" md="6">
                                  <NextImage
                                    src={`${
                                      allFilteredData.categoryDescription[0].category_image_url.includes(
                                        process.env
                                          .NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT,
                                      ) ||
                                      allFilteredData.categoryDescription[0].category_image_url.includes(
                                        process.env.NEXT_PUBLIC_BASE_PATH,
                                      )
                                        ? allFilteredData.categoryDescription[0]
                                            .category_image_url
                                        : `${process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT}${allFilteredData.categoryDescription[0].category_image_url}`
                                    }?width=700`}
                                    alt={
                                      allFilteredData.categoryDescription[0]
                                        .name
                                    }
                                    width={660}
                                    height={382}
                                    objectFit="contain"
                                    objectPosition="center"
                                    className="acc-img"
                                    priority
                                  />
                                </Col>
                                {returnHtmlContent(
                                  allFilteredData.categoryDescription[0].id,
                                  allFilteredData.categoryDescription[0]
                                    .description,
                                )}
                              </Row>
                            </Accordion.Collapse>
                          </Accordion>
                        )}
                      </Col>
                    ) : (
                      ""
                    )}
                    <Col
                      xs={{ order: 1, span: 12 }}
                      xl={{ order: 2 }}
                      className="stickyFilter acc-product-sidebar px-0 px-xl-3"
                    >
                      <DynamicImportFilter
                        selectedFiltersQuery={selectedFiltersQuery}
                        selectedShortsQuery={selectedShortQuery}
                        filters={allFilteredData.filters.aggregations}
                      />
                      <DynamicImportGenerateCompareBlock
                        isDesktop={windowObj && windowSize.width > 1024}
                      />
                      {windowObj && windowSize.width > 1024 ? (
                        <ProductAdvertisements />
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col
                      xs={{ order: 3, span: 12 }}
                      xl={{ order: 3 }}
                      className="pl-xl-3 px-0"
                    >
                      <Container>
                        {windowObj && windowSize.width > 1024 ? (
                          <ProductToolbar
                            selectedShortQuery={selectedShortQuery}
                            crossImageCheck={crossImagecheck}
                          />
                        ) : null}

                        <div className="acc-product-listing">
                          {avilableProducts.length !== 0 ? (
                            <DynamicImportProductsWrapper
                              paginationCallback={paginationProduct}
                              products={avilableProducts}
                              productForSales={1}
                              pageInfo={allFilteredData.online.page_info}
                              onlinePageInfo={allFilteredData.online.page_info}
                              otherPageInfo={allFilteredData.others.page_info}
                              isListView={isListView}
                              selectedLimit={limit}
                              loading={false}
                              isCrossImageChecked={isCrossImageChecked}
                            />
                          ) : (
                            ""
                          )}
                          {otherProductShow &&
                            (otherProducts?.length !== 0 ? (
                              <DynamicImportProductsWrapper
                                paginationCallback={paginationProduct}
                                products={otherProducts}
                                productForSales={0}
                                pageInfo={allFilteredData.others.page_info}
                                onlinePageInfo={
                                  allFilteredData.online.page_info
                                }
                                otherPageInfo={allFilteredData.others.page_info}
                                isListView={isListView}
                                selectedLimit={limit}
                                loading={false}
                                isCrossImageChecked={isCrossImageChecked}
                              />
                            ) : (
                              ""
                            ))}
                        </div>
                      </Container>
                    </Col>
                  </Row>
                  {windowObj && windowSize.width < 1024 ? (
                    <ProductAdvertisements />
                  ) : (
                    ""
                  )}
                </Container>

                {/* email subscription start */}
                <EmailSubscription />
                {/* email subscription end */}
              </ProductCompareProvider>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
};

export default Store;
