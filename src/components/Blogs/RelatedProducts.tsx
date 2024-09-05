import { Button } from "react-bootstrap";
import NextImage from "next/legacy/image";
import { I18nLink } from "@Components/Utilities";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const ProductCurrency = dynamic(import("@Components/Blogs/ProductCurrency"));

const RelatedProducts = (props) => {
  const AllRelatedProducts = props.data;
  useEffect(() => {
    try {
      if (window && window.yotpo) {
        window.yotpo.initWidgets();
      }
    } catch (err) {
      console.log(err);
    }
  });
  return (
    <>
      {AllRelatedProducts.length > 0 ? (
        <h5 className="related-prod-header-wrapper pb-3 text-dark font-weight-bold">
          Related Products
        </h5>
      ) : (
        ""
      )}
      {AllRelatedProducts
        ? AllRelatedProducts.map((blog) => (
            <div className="pb-5" key={`eachcol_${blog.id}`}>
              {/* Call Related post image here */}
              <NextImage
                src={
                  blog.productFeatureImage
                    ? blog.productFeatureImage.url
                    : "/assets/images/accuride-logo-desktop.svg"
                }
                alt={blog.productTitle}
                width={208}
                height={119}
              />
              <h6 className="m-0 pb-2 product-sku-wrapper">
                {blog.productSku}
              </h6>
              <I18nLink
                href={`/products/${blog.productSlug}`}
                isMagentoRoute={1}
              >
                <a className="d-block">
                  <h6 className="m-0 pb-3">{blog.productTitle}</h6>
                </a>
              </I18nLink>
              <ProductCurrency sku={blog.productSku} />
              <I18nLink
                href={`/products/${blog.productSlug}#review`}
                isMagentoRoute={1}
              >
                <div
                  className="related-product-yotpo-wrapper yotpo bottomLine"
                  data-yotpo-product-id={blog.productId}
                />
              </I18nLink>
              <div className="text-center pt-3 button-wrapper">
                <I18nLink
                  href={`/products/${blog.productSlug}`}
                  isMagentoRoute={1}
                >
                  <Button className="btn-secondary">Buy Now</Button>
                </I18nLink>
              </div>
            </div>
          ))
        : ""}
    </>
  );
};
export default RelatedProducts;
