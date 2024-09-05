import { useMemo } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import CATEGORY_LIST from "@Graphql/queries/getCategoryList.graphql";
import Error from "../../_error";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import axios from "axios";
import { isBrowser } from "react-device-detect";
import GET_PRODUCT_DETAILS_PRODUCT_SLUG from "@Graphql/queries/getProductDetailsByProductSlug.graphql";
import GET_PRODUCTS_BY_FILTER from "@Graphql/queries/getProductsByFilter.graphql";
import { decode } from "@Components/Utilities/base64utils";
import DESKTOP_MEGA_MENU from "@Graphql/queriesgraphcms/getDesktopMegaMenu.graphql";
import { footer } from "@Graphql/queriesgraphcms/getFooterDetials.graphql";
import YotpoScript from "@Components/Utilities/YotpoScript";

const CategoryPage = dynamic(
  () => import("@Components/MangentoRouteTypes/CategoryPage"),
);
const Product = dynamic(() => import("@Components/MangentoRouteTypes/Product"));
const Products = dynamic(() => import("@Components/Store"));

/**
 * @typedef {{ [key:string]: any ,children ?: ObjWithChildren[] }} ObjWithChildren
 */

/**
 *
 *
 * @param {ObjWithChildren[]} array
 * @param {*} key
 * @param {*} value
 * @return {*}
 */
function findRecursively(array, key, value) {
  let o;
  array.some(function iter(a) {
    if (a[key] === value) {
      o = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  });
  return o;
}

const getCategoryId = (dataCategoryList, lastSlug) => {
  const foundCategory = findRecursively(
    dataCategoryList?.categoryList[0].children ?? [],
    "url_key",
    lastSlug,
  );
  return (
    foundCategory &&
    `${foundCategory.display_mode === "PAGE" ? "cat" : "list"} ${decode(
      foundCategory.id,
    )}`
  );
};

const MagentoRoutePage = ({
  dataCategoryList,
  productDetails,
  productFilteredResp,
  queryData,
}) => {
  const router = useRouter();
  const getZoneLang = router.query.zone_lang;

  const lastSlug =
    router.query.magento_route[router.query.magento_route.length - 1];

  const categoryId = useMemo(
    () => getCategoryId(dataCategoryList, lastSlug),
    [dataCategoryList, lastSlug],
  );

  if (!router?.query?.magento_route) return null;

  if (!categoryId) {
    return (
      <Product
        getZoneLang={getZoneLang}
        slug={lastSlug}
        productDetails={productDetails}
      />
    );
  }

  if (categoryId.includes("cat")) {
    return <CategoryPage catId={categoryId.split(" ")[1]} />;
  }

  if (categoryId.includes("list")) {
    console.log("products");
    return (
      <Products
        queryData={queryData}
        getZoneLang={getZoneLang}
        catId={categoryId.split(" ")[1]}
        productFilteredResp={productFilteredResp}
      />
    );
  }

  return <Error statusCode={404} />;
};

export const getStaticProps = async (context) => {
  const queryParams = context.params;
  let notFound = false;
  let dataCategoryList = null;
  let productDetails = null;
  let productFilteredResp = null;
  let seodata = null;
  let megaMenu = { desktopMegaMenus: [] };
  let footerMenu = { footerMenus: [] };

  try {
    const { data } = await gqlFetch(
      DESKTOP_MEGA_MENU,
      {
        languages: "English",
        pageSlug: "megamenu",
      },
      "CMS",
      queryParams.zone_lang,
    );
    megaMenu = data;

    const footerMenuData = await gqlFetch(
      footer,
      {
        languages: "English",
      },
      "CMS",
      queryParams.zone_lang,
    );
    footerMenu = footerMenuData?.data;

    const dataCategoryListResp = await gqlFetch(
      CATEGORY_LIST,
      {},
      "MAGENTO",
      queryParams.zone_lang,
    );
    dataCategoryList = dataCategoryListResp.data;

    const lastSlug =
      queryParams.magento_route[queryParams.magento_route.length - 1];

    const categoryId = getCategoryId(dataCategoryList, lastSlug);

    if (!categoryId) {
      const productDetailsResp = await gqlFetch(
        GET_PRODUCT_DETAILS_PRODUCT_SLUG,
        {
          url_key:
            queryParams.magento_route[queryParams.magento_route.length - 1],
          zone: queryParams.zone_lang,
        },
        "MAGENTO",
        queryParams.zone_lang,
      );
      productDetails = productDetailsResp.data;

      const getDetails =
        productDetails && productDetails.products.items.length > 1
          ? productDetails.products.items.filter(
              (productItem) => productItem.__typename === "SimpleProduct",
            )[0]
          : productDetails && productDetails.products.items[0];

      if (getDetails) {
        let yotpoRatingsData = "";
        try {
          const yotpoAppKey =
            queryParams.zone_lang === "en-ca"
              ? process.env.NEXT_PUBLIC_YOTPO_CA_APP_KEY
              : process.env.NEXT_PUBLIC_YOTPO_NA_APP_KEY;
          const bufferObjDecode = Buffer.from(getDetails.uid, "base64");
          const prodId = bufferObjDecode.toString("utf8");

          const apiEndPoint = `https://api.yotpo.com/products/${yotpoAppKey}/${prodId}/bottomline`;
          const getResp = await axios.get(apiEndPoint);
          if (getResp && getResp.status === 200 && getResp.data)
            yotpoRatingsData = getResp.data.response.bottomline;
        } catch (err) {
          // console.error(err);
        }

        const markupTemplate = {
          "@context": "https://schema.org",
          "@type": "Product",
          name: `${getDetails.meta_title}`,
          image: `${getDetails.image.gallery_url}`,
          description: `${getDetails.meta_description}`,
          brand: {
            "@type": "Brand",
            name: "Accuride",
          },
          sku: `${getDetails.sku}`,
          offers: {
            "@type": "AggregateOffer",
            lowPrice: `${getDetails.product_price_range.minimum_price.final_price.value}`,
            highPrice: `${getDetails.product_price_range.maximum_price.final_price.value}`,
            priceCurrency: `${
              queryParams.zone_lang === "en-us" ? "USD" : "CAD"
            }`,
          },
        };
        try {
          if (
            yotpoRatingsData &&
            yotpoRatingsData.total_reviews &&
            yotpoRatingsData.total_reviews > 0
          ) {
            markupTemplate.aggregateRating = {
              "@type": "AggregateRating",
              ratingValue: `${
                yotpoRatingsData && yotpoRatingsData.average_score
              }`,
              reviewCount: `${
                yotpoRatingsData && yotpoRatingsData.total_reviews
              }`,
            };
          }
        } catch (err) {
          console.log(err);
        }
        seodata = {
          seoTitle: getDetails && getDetails.meta_title,
          seoDescription: getDetails && getDetails.meta_description,
          secKeywords: getDetails && getDetails.meta_keyword,
          seoImage: {
            url: getDetails && getDetails.image && getDetails.image.gallery_url,
          },
          canonical:
            getDetails && getDetails.custom_canonical
              ? `${process.env.NEXT_PUBLIC_BASE_PATH}/${queryParams.zone_lang}/${getDetails.custom_canonical}`
              : null,
          prodMarkupTemplate: markupTemplate,
          yotpoScript: YotpoScript(queryParams.zone_lang, true),
        };
      }
      if (!productDetails.products.total_count) notFound = true;
    } else if (categoryId && categoryId.includes("list")) {
      const catArr = categoryId.split(" ");
      const catId = categoryId && catArr[1];
      const paginationData = {
        currentPageOnline: queryParams.p ? queryParams.p : 1,
        currentPageOther: queryParams.o_p ? queryParams.o_p : 1,
      };

      const filterQueryFilter = {
        category_id: { eq: catId },
      };
      let selectedFiltersQuery = "";
      const selectedShortQuery = {};
      let selectedLimit = 6;

      /** check noumber of limit from url query */
      if (isBrowser) {
        selectedLimit = 12;
        if (queryParams.limit) {
          const urlLimit = Number(queryParams.limit);
          const targetLimit = [12, 24, 48];
          if (targetLimit.indexOf(urlLimit) >= 0) {
            selectedLimit = urlLimit;
          }
        }
      }

      /** ready filter query object from url query param */
      const readyObjectFromQueryParam = () => {
        const filterParm = queryParams.filter;
        const multipleFilter = filterParm.split("|").filter((x) => x !== "");
        const filterObjUrl = {};
        multipleFilter.map((item) => {
          const multipleObject = item.split("-");
          filterObjUrl[multipleObject[0]] = {
            in: multipleObject[1].split(","),
          };
          return filterObjUrl;
        });
        selectedFiltersQuery = filterObjUrl;
      };

      const readyShortObjectFromQueryParam = () => {
        const shortParm = queryParams.sort;
        const shortParamObjAsArr = shortParm.split("-");
        const shortParamObjAsValue = shortParamObjAsArr[1];
        selectedShortQuery[shortParamObjAsArr[0]] = shortParamObjAsValue;
      };

      if (queryParams.filter) {
        readyObjectFromQueryParam();
      }

      if (queryParams.sort) {
        readyShortObjectFromQueryParam();
      }

      if (queryParams.p || queryParams.o_p) {
        paginationData.currentPageOnline = queryParams.p ? queryParams.p : 1;
        paginationData.currentPageOther = queryParams.o_p ? queryParams.o_p : 1;
      }

      const variables = {
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
        page_size: selectedLimit,
        zone: queryParams.zone_lang,
      };

      productFilteredResp = await gqlFetch(
        GET_PRODUCTS_BY_FILTER,
        variables,
        "MAGENTO",
        queryParams.zone_lang,
      );
      if (productFilteredResp) {
        const itemListElementArr = [];
        const getDetails =
          productFilteredResp &&
          productFilteredResp.data &&
          productFilteredResp.data.categoryDescription
            ? productFilteredResp.data.categoryDescription[0]
            : null;
        const allFilteredData = getDetails && productFilteredResp.data;
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
        avilableProducts.map((val) => {
          itemListElementArr.push({
            "@type": "ListItem",
            position: 1,
            url: `/products/${val.url_key}`,
            name: `${val.name}`,
            image: {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              contentUrl: `${val.cross_image || val.image.gallery_url}`,
              description: `${val.meta_description}`,
              width: 247,
              height: 222,
            },
          });
          return true;
        });
        otherProducts.map((val) => {
          itemListElementArr.push({
            "@type": "ListItem",
            position: 1,
            url: `/products/${val.url_key}`,
            name: `${val.name}`,
            image: {
              "@context": "https://schema.org",
              "@type": "ImageObject",
              contentUrl: `${val.cross_image || val.image.gallery_url}`,
              description: `${val.meta_description}`,
              width: 247,
              height: 222,
            },
          });
          return true;
        });

        const markupTemplate = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: `${getDetails && getDetails.meta_title}`,
          url: `${process.env.NEXT_PUBLIC_BASE_PATH}/${queryParams.zone_lang}/${
            queryParams.magento_route[0]
          }${
            queryParams.magento_route.length > 1
              ? `/${queryParams.magento_route[1]}`
              : ""
          }`,
          description: `${getDetails && getDetails.meta_description}`,
          itemListOrder: "Unordered",
          numberOfItems: `${queryParams.limit || 12}`,
        };
        try {
          if (itemListElementArr) {
            markupTemplate.itemListElement = itemListElementArr;
          }
        } catch (err) {
          console.log(err);
        }
        seodata = {
          seoTitle: getDetails ? getDetails.meta_title : null,
          seoDescription: getDetails ? getDetails.meta_description : null,
          secKeywords: getDetails ? getDetails.meta_keywords : null,
          seoImage: {
            url:
              getDetails &&
              getDetails.category_image_url &&
              (getDetails.category_image_url.includes(
                process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT,
              ) ||
                getDetails.category_image_url.includes(
                  process.env.NEXT_PUBLIC_BASE_PATH,
                ))
                ? getDetails.category_image_url
                : `${process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT}${getDetails.category_image_url}`,
          },
          // canonical: `${process.env.NEXT_PUBLIC_BASE_PATH}/${queryParams.zone_lang}/products/${queryParams.magento_route[0]}`,
          markupTemplate: markupTemplate,
          yotpoScript: YotpoScript(queryParams.zone_lang, true),
        };
      }
      if (
        !productFilteredResp ||
        productFilteredResp.length === 0 ||
        (productFilteredResp && productFilteredResp.online === null) ||
        productFilteredResp.others === null
      )
        notFound = true;
    }
  } catch (err) {
    notFound = true;
  }

  return {
    props: {
      seodata,
      dataCategoryList,
      productDetails,
      productFilteredResp,
      queryData: 1,
      megaMenu,
      footerMenu,
    },
    notFound,
    revalidate: 600,
  };
};
export async function getStaticPaths() {
  const slugs = [];
  return {
    paths: slugs.map((slug) => ({
      params: { magento_route: [slug], zone_lang: "en-us" },
    })),
    fallback: "blocking",
  };
}

export default MagentoRoutePage;
