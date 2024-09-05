import { Container, Row, Col, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import useWindowDimensions from "@Hooks/windowDimention";
import NextImage from "next/legacy/image";
import { BiLinkExternal } from "react-icons/bi";
import ProductInfo from '@Components/ProductDetail/ProductInfo';
import ProductConfiguration from '@Components/ProductDetail/ProductConfiguration';
const ProductImageGallery = dynamic(
  () => import("@Components/ProductDetail/ProductImageGallery"),
);
const ProductOverview = dynamic(
  () => import("@Components/ProductDetail/ProductOverview"),
);
// const ProductConfiguration = dynamic(
//   () => import("@Components/ProductDetail/ProductConfiguration"),
// );
const RelatedProduct = dynamic(
  () => import("@Components/ProductDetail/RelatedProduct"),
);
const ProductService = dynamic(
  () => import("@Components/ProductDetail/ProductService"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ProductDetail = (props) => {
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [loadReview, setLoadReview] = useState(false);
  const [loadDiv, setLoadDiv] = useState(true);
  const [reviewScroll, setReviewScroll] = useState(
    router && router.asPath.includes("review"),
  );
  const [reviewScrollRes, setReviewScrollRes] = useState(
    router && router.asPath.includes("review"),
  );

  //Breadcrumbs starts
  const productItem =
    props.data && props.data.products.items.length > 1
      ? props.data.products.items.filter(
        (productItem) => productItem.__typename === "SimpleProduct",
      )[0]
      : props.data && props.data.products.items[0];
  let crumbsWithSubCategory,
    crumbsWithOutSubCategory = [];
  let canonicalUrl = productItem.custom_canonical.split("/");
  let productCode = productItem.sku;

  // canonicalurl with subcategory
  if (canonicalUrl.length > 2) {
    crumbsWithSubCategory = [
      { url: `/${router.query.zone_lang}/`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/products`,
        name: productItem.custom_canonical.split("/")[0],
      },
      {
        url: `/${router.query.zone_lang}/${canonicalUrl[0]}/${canonicalUrl[1]}`,
        name: canonicalUrl[1],
      },
      { url: ``, name: productCode }, // We use 'code' instead of 'name'
    ];
  } else {
    // canonicalurl without subcategory
    crumbsWithOutSubCategory = [
      { url: `/${router.query.zone_lang}/`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/products`,
        name: productItem.custom_canonical.split("/")[0],
      },
      { url: ``, name: productCode }, // We use 'code' instead of 'name'
    ];
  }
  // Breadcrumbs end
  // For Yotpo
  const scrollToReview = () => {
    const reviewUrlYotpo = router.asPath;
    if (reviewUrlYotpo.includes("review")) {
      const targetReviewBtnYotpo = document.querySelector("[name='reviewBtn']");
      const targetReviewBtnYotpoRes = document.querySelector(
        "[name='reviewBtnRes']",
      );
      const targetReviewObjYotpo = document.querySelector(
        '[name="acc-product-details"]',
      );
      const reviewSecYotpo = document.querySelector('[name="reviewPanel"]');
      const reviewSecYotpoRes = document.querySelector(
        '[name="reviewPanelRes"]',
      );

      const offsetTopSec = (targetReviewObjYotpo.clientHeight) < 100 ? 820 : (targetReviewObjYotpo.clientHeight);
      // window.scrollTo({ top: offsetTopSec, behavior: "smooth" });
      const reviewsSection = document.querySelector('.acc-product-service');
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (reviewSecYotpo) {
        const isOpen = reviewSecYotpo.classList.contains("show");
        if (!isOpen) {
          targetReviewBtnYotpo.click();
        }
        setReviewScroll(false);
      }
      if (reviewSecYotpoRes) {
        const isOpen = reviewSecYotpoRes.classList.contains("show");
        if (!isOpen) {
          targetReviewBtnYotpoRes.click();
        }
        setReviewScrollRes(false);
      }
    }
  };

  useEffect(() => {
    if (reviewScroll && reviewScrollRes) {
      if (!loadDiv) {
        setLoadDiv(true);
        scrollToReview();
      } else {
        scrollToReview();
      }
    }
  }, [loadDiv, reviewScroll, reviewScrollRes]);
  
  useEffect(() => {
    setTimeout(() => {
      if(loadReview) scrollToReview();
    }, 500);
  }, [loadReview]);
  

  const loadOnScroll = () => {
    const onScroll = (e) => {
      const windowElemScrollTop = e.target.documentElement.scrollTop;
      if (windowElemScrollTop > 0 && !loadDiv) {
        setLoadDiv(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  };

  const reviewStarScroll = () => {
    const targetBtn = document.querySelector("[name='reviewBtn']");
    const targetObj = document.querySelector('[name="acc-product-details"]');
    const targetBtnRes = document.querySelector("[name='reviewBtnRes']");
    const reviewSecRes = document.querySelector('[name="reviewPanelRes"]');

    if (targetObj && targetBtn) {
      const offsetTop = targetObj.clientHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      targetBtn.click();
    }
    if (targetObj && targetBtnRes) {
      const offsetTop = targetObj.clientHeight;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      const isOpen = reviewSecRes.classList.contains("show");
      if (!isOpen) targetBtnRes.click();
    }
  };

  /** go to review section javascript window scroll and trigger button */
  const goToReview = () => {
    if (!loadDiv) {
      setLoadDiv(true);
        reviewStarScroll();
    } else {
      reviewStarScroll();
    }
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    loadOnScroll();
    /** go to downloads section javascript window scroll and trigger button */
    const goToDownloads = () => {
      const urlContent = window.location.hash.substr(1);
      const targetBtn = document.querySelector("[name='downloadBtn']");
      const targetObj = document.querySelector('[name="acc-product-details"]');
      const reviewSec = document.querySelector('[name="downloadPanel"]');
      if (urlContent === "amfile.attachment") {
        const offsetTop = targetObj.clientHeight;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
        const isOpen = reviewSec.classList.contains("show");
        if (!isOpen) targetBtn.click();
      }
    };
    setTimeout(() => {
      goToDownloads();
    }, 1000);
  }, []);
  const editCartDetails = router.query.editCart
    ? JSON.parse(router.query.editCart)
    : false;
  if (!props.data) return null;

  const productDetails =
    props.data.products.items.length > 1
      ? props.data.products.items.filter(
        (productItem) => productItem.__typename === "SimpleProduct",
      )[0]
      : props.data.products.items[0];

  const [selectedSku, setSelectedSku] = useState();
  const selectedLengthEvent = (selectSku) => {
    setSelectedSku(selectSku);
  };
  const productLogos = productDetails && productDetails.product_logos;

  return (
    <>
      {/* Breadcrumbs start */}
      {canonicalUrl.length > 2 ? (
        <BreadCrumbs crumbs={crumbsWithSubCategory} />
      ) : (
        <BreadCrumbs crumbs={crumbsWithOutSubCategory} />
      )}
      {/* Breadcrumbs end */}
      {/* product gallery and overview start */}
      <Container>
        <Row
          name="acc-product-details"
          className={`${!editCartDetails
            ? "py-3 py-md-5 pt-xl-5 pb-xl-0"
            : "pt-3 pt-md-4 pt-xl-5 section-padding"
            }`}
        >
          <Col md={6} lg={7} className="mb-4">
            {/* <ProductMediaGallery
                            selectedSku={selectedSku}
                            mediaGallery={productDetails}
                        /> */}
            <ProductImageGallery
              selectedSku={selectedSku}
              mediaGallery={productDetails}
            />
          </Col>
          <Col md={6} lg={5}>
            <ProductOverview
              editCartDetails={editCartDetails}
              selectedSku={selectedSku}
              overview={productDetails}
              goToReview={goToReview}
            />
            {productDetails.available_exit_link !== 1 ? (
              <ProductConfiguration
                selectedSku={selectedSku}
                selectedLength={selectedLengthEvent}
                editCartDetails={editCartDetails}
                configuration={productDetails}
              />
            ) : (
              <a
                href={productDetails.exit_link}
                target="_blank"
                rel="noreferrer noopener"
              >
                <Button
                  variant="primary"
                  block={!(windowObj && windowSize.width >= 768)}
                  className="text-uppercase mt-3 d-flex align-items-center justify-content-center"
                >
                  See Details on Senseon.com
                  <BiLinkExternal className="ml-3" />
                </Button>
              </a>
            )}
            {!editCartDetails ? <ProductService /> : ""}
          </Col>
        </Row>
      </Container>
      {/* product gallery and overview end */}

      {/* product info start */}
      {loadDiv && !editCartDetails ? (
        <ProductInfo setLoadReview={setLoadReview} otherInformation={productDetails} />
      ) : (
        ""
      )}
      {/* product info end */}

      {/* logo section start */}
      {loadDiv && windowObj && windowSize.width >= 1024 && !editCartDetails ? (
        <section className="section-padding pt-0">
          <Container className="d-flex">
            {productLogos ? (
              productLogos.map((logoItem) => (
                <div
                  key={logoItem.logo_url}
                  className={`${windowObj && windowSize.width <= 1024 ? "mx-auto" : ""
                    } mr-3`}
                >
                  <NextImage
                    src={`${logoItem.logo_url}?w=100`}
                    height={65}
                    width={80}
                    alt=""
                    objectFit="contain"
                    objectPosition="center"
                  />
                </div>
              ))
            ) : (
              <div
                className={`${windowObj && windowSize.width <= 1024 ? "mx-auto" : ""
                  } mr-3`}
              >
                <NextImage
                  src="/assets/images/rohs.jpg?w=100"
                  height={65}
                  width={80}
                  alt=""
                  objectFit="contain"
                  objectPosition="center"
                />
              </div>
            )}
          </Container>
        </section>
      ) : null}
      {/* logo section end */}

      {/* related product start */}
      {loadDiv && productDetails.available_exit_link !== 1 ? (
        <Container>
          {productDetails.related_products.length !== 0 && !editCartDetails ? (
            <RelatedProduct related={productDetails} />
          ) : (
            ""
          )}
        </Container>
      ) : null}
      {/* related product end */}

      {/* email subscription start */}
      {loadDiv && productLogos && windowObj && windowSize.width <= 1024 ? (
        <EmailSubscription productLogos={productLogos} />
      ) : null}
      {/* email subscription end */}
    </>
  );
};

export default ProductDetail;
