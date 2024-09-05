import { useState } from "react";
import { Col } from "react-bootstrap";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));
const SearchNewsData = (props) => {
  const { news, isListView } = props;

  const [imgError, setImgError] = useState(false);
  const picture = new Image();

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const nextPlaceHolder = () => (
    <NextImage
      src="/assets/images/demo-placeholder-350-314.png"
      width={250}
      height={250}
      layout="intrinsic"
      alt="Accuride"
      className={`img ${isListView ? "acc-list-img" : ""}`}
    />
  );

  const productImage = (image, altText) => {
    picture.src = image;
    picture.onerror = () => setImgError(true);
    return imgError ? (
      nextPlaceHolder()
    ) : (
      <NextImage
        src={image}
        alt={altText}
        objectFit="contain"
        objectPosition="center"
        layout="intrinsic"
        width={250}
        height={250}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          "/assets/images/icons/imageLoader.svg",
        )}`}
        className={`img ${isListView ? "acc-list-img" : ""}`}
      />
    );
  };
  function trimStr(str) {
    const setLength = 150;
    let trimmedString = str.substring(0, setLength);
    if (str.length > setLength) {
      trimmedString += "[...]";
    }
    return trimmedString;
  }

  return (
    <Col
      sm={12}
      className={`acc-news-search-block acc-product-block mb-3 d-flex align-items-center px-2 ${
        isListView ? "col-xxl-12 flex-row" : "col-xxl-3 flex-column"
      }`}
    >
      <div
        className={`${
          isListView
            ? "d-flex flex-column flex-sm-row align-items-center mb-4"
            : "position-relative d-md-flex text-center text-md-left align-items-center"
        }`}
      >
        <a
          className="acc-serach-news-image acc-list-image-view"
          href={news.clickURL}
        >
          {productImage(news.image, news.image.label)}
        </a>
        <div className={`${isListView ? "pl-3 flex-1" : "flex-1 pl-md-3"}`}>
          <h5 className="mt-0 text-uppercase text-center text-sm-left">
            <a href={news.clickURL}>
              <HTMLContent classclassName="m-0" content={news.title} />
            </a>
          </h5>
          <a
            href={news.clickURL}
            className="text-center text-sm-left text-dark"
          >
            <HTMLContent className="m-0" content={trimStr(news.text)} />
          </a>
        </div>
      </div>
    </Col>
  );
};

export default SearchNewsData;
