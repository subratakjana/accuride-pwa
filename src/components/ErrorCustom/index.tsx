import { useState, useContext, useEffect } from "react";
import { useQuery } from "graphql-hooks";
import { useRouter } from "next/router";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { Container } from "react-bootstrap";
import Head from "next/head";
import NewProduct from "@Components/NewProduct";
import NextImage from "next/legacy/image";
import { AuthContext } from "@Contexts/AuthContext";
import { drawerSlidesContent } from "@Graphql/queriesgraphcms/drawerSlides.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const ImageHoverCarousel = dynamic(
  () => import("@Components/Markets/ImageHoverCarousel"),
);
const StaticBannerBgImage = dynamic(
  () => import("@Components/Markets/StaticBannerBgImage"),
);

const ErrorCustom = (props) => {
  const router = useRouter();
  const curPath = router.asPath;
  const PageNameArr = curPath.split(/[/?]/);
  const rootPage = PageNameArr[2];
  const searchKey = PageNameArr[3]
    ? PageNameArr[3].replace(/-/g, " ")
    : PageNameArr[3];
  useEffect(() => {
    if (
      curPath !== `/${router.query.zone_lang}/products/shop` &&
      rootPage === "products" &&
      searchKey
    )
      router.push(`/${router.query.zone_lang}/search?keyword=${searchKey}`);
  }, [rootPage, searchKey]);
  const urlSearchKeyword = router.query.keyword ? router.query.keyword : "";
  const { searchWord } = props;
  const windowSize = useWindowDimensions();
  let drawerSlideses = [];
  const { notify } = useContext(AuthContext);
  const {
    loading: DSLoading,
    error,
    data,
  } = useQuery(drawerSlidesContent.loc.source.body, {
    variables: { last: 0 },
    operationName: { clientName: "graphCms" },
  });
  const [searchTimeOut, setSearchTimeOut] = useState(null);
  if (DSLoading) return <LoadingIndicator />;
  if (data) {
    drawerSlideses = data.drawerSlidess;
  }
  if (error) {
    notify(error.message, "error");
    return <h2>No data found</h2>;
  }
  const searchNow = (keyword, isNewSearch) => {
    // Clear the timeout if it has already been set.
    // This will prevent the previous task from executing
    // if it has been less than <MILLISECONDS>
    clearTimeout(searchTimeOut);
    
    // Make a new timeout set to go off in 1000ms (1 second)
    setSearchTimeOut(
      setTimeout(() => {
        if (keyword !== "") {
          const isurlUpdate = !(
            router.query.sort ||
            router.query.limit ||
            router.query.page ||
            router.query.rank ||
            router.query.filter
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
          const msearch = document.querySelector('[name="msearch"]');
          if (msearch) msearch.value = keyword;
        } 
      }, 1000),
    );
  };

  return (
    <>
      <Head>
        <title>Error</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
      </Head>
      <section className="acc-demo-error-page">
        <Container>
          <div className="pt-5 text-center rounded">
            <NextImage
              src="/assets/images/no-result-icon.jpg"
              alt="/assets/images/no-result-icon.jpg"
              layout="intrinsic"
              objectFit="contain"
              objectPosition="center"
              width={235}
              height={149}
            />
            {searchWord ? (
              <div>
                <h3 className="text-dark m-0">
                  Search was unable to find any results with the keyword
                  {` "${urlSearchKeyword}"`}. You may have typed
                </h3>
                <h3 className="text-dark m-0">
                  your word incorrectly, or are being too specific.
                </h3>
              </div>
            ) : (
              <h3 className="text-dark m-0">
                Search was unable to find any results. You may have typed your
                word incorrectly, or are being too specific.
              </h3>
            )}

            <h3 className="text-dark m-0">
              Try using a broader search phrase or try one of our most popular
              search phrases
            </h3>
            {searchWord ? (
              <h3 className="text-dark m-0">
                or you can try to search with&nbsp;
                <span
                  role="button"
                  onKeyPress={() => false}
                  tabIndex={0}
                  className="cursor-pointer font-weight-500 text-primary text-uppercase"
                  onClick={() => searchNow(searchWord)}
                >
                  {searchWord}
                </span>
                &nbsp;keyword.
              </h3>
            ) : (
              ""
            )}
          </div>
          <div className="pt-5">
            <h2 className="text-uppercase">Popular Searches</h2>
            <ul className="d-flex flex-wrap acc-error-page-popular-search-list">
              <li>
                <I18nLink href="/search?keyword=3832" isMagentoRoute={0}>
                  3832
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=locking-drawer-slides"
                  isMagentoRoute={0}
                >
                  locking drawer slides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=9301" isMagentoRoute={0}>
                  9301
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=9308" isMagentoRoute={0}>
                  9308
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3832ec" isMagentoRoute={0}>
                  3832ec
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3634" isMagentoRoute={0}>
                  3634
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3832e" isMagentoRoute={0}>
                  3832e
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=pocket-door-slides"
                  isMagentoRoute={0}
                >
                  pocket door slides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=1029" isMagentoRoute={0}>
                  1029
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=60-drawer-slides"
                  isMagentoRoute={0}
                >
                  60” drawer slides
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=bottom-mount-drawer-slide"
                  isMagentoRoute={0}
                >
                  bottom mount drawer slide
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=7957" isMagentoRoute={0}>
                  7957
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=undermount-drawer-slide"
                  isMagentoRoute={0}
                >
                  undermount drawer slide
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=36-drawer-glides"
                  isMagentoRoute={0}
                >
                  36 drawer glides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=1332" isMagentoRoute={0}>
                  1332
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=4034" isMagentoRoute={0}>
                  4034
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=vertical-slides"
                  isMagentoRoute={0}
                >
                  vertical slides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3308" isMagentoRoute={0}>
                  3308
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=keyboard-slide"
                  isMagentoRoute={0}
                >
                  keyboard slide
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=wide-drawer-slides"
                  isMagentoRoute={0}
                >
                  wide drawer slides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=38/" isMagentoRoute={0}>
                  38/
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=123" isMagentoRoute={0}>
                  123
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=9308e" isMagentoRoute={0}>
                  9308e
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=4032" isMagentoRoute={0}>
                  4032
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=undermount" isMagentoRoute={0}>
                  undermount
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=two-way-travel-drawer-slides"
                  isMagentoRoute={0}
                >
                  two way travel drawer slides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=2002" isMagentoRoute={0}>
                  2002
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3634ec" isMagentoRoute={0}>
                  3634ec
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3640" isMagentoRoute={0}>
                  3640
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=1432" isMagentoRoute={0}>
                  1432
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=flat-mount" isMagentoRoute={0}>
                  flat-mount
                </I18nLink>
              </li>
              <li>
                <I18nLink
                  href="/search?keyword=soft-close-slides"
                  isMagentoRoute={0}
                >
                  soft close slides
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=2109" isMagentoRoute={0}>
                  2109
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=9301e" isMagentoRoute={0}>
                  9301e
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3732" isMagentoRoute={0}>
                  3732
                </I18nLink>
              </li>
              <li>
                <I18nLink href="/search?keyword=3600" isMagentoRoute={0}>
                  3600
                </I18nLink>
              </li>
            </ul>
          </div>
          <div className="text-center py-3 my-5 border-top border-bottom border-medium">
            <h3 className="text-dark m-0">
              If you can&apos;t find what you are looking for please
              <I18nLink href="/contact" isMagentoRoute={0}>
                &nbsp;CONTACT US
              </I18nLink>
              &nbsp;for help!
            </h3>
          </div>
        </Container>
        {drawerSlideses
          ? drawerSlideses.map((rows) => (
              <div key={`ds_${rows.id}`}>
                <ImageHoverCarousel
                  title={rows.section1imagegallery.galleryTitle}
                  title_1={rows.section1imagegallery.imageTitle}
                  hoverTitle={rows.section1imagegallery.galleryTitle}
                  hoverDescription={rows.section1imagegallery.imageDescription}
                  hoverDescriptionTitle={1}
                  data={rows.section1imagegallery}
                  slidestoshow="4"
                  slidestoscroll="4"
                  winSize={windowSize}
                />
                <StaticBannerBgImage
                  data={rows.section8staticbanner}
                  model="drawerSlidess"
                  bgImage={rows.section8staticbanner.bannerImage}
                  sectionDesc={rows.section8staticbanner.bannerDescription.text}
                  winSize={windowSize}
                />
              </div>
            ))
          : ""}
        <Container>
          <div className="pt-5 error-page-populer-product">
            <h2 className="text-uppercase">Popular Products</h2>
            <NewProduct />
            <I18nLink href="/products/shop" isMagentoRoute={1}>
              <a className="d-block text-center mb-5 text-uppercase font-weight-bold">
                View more products
              </a>
            </I18nLink>
          </div>
        </Container>
      </section>
    </>
  );
};

export default ErrorCustom;
