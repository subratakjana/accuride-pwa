import { useEffect, useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";

const StaticBannerWhiteBGRightMultiImage = (props) => {
  const windowSize = props.winSize;
  const [windowObj, updateWindowObj] = useState(false);

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      {props.data ? (
        <Row className={`align-items-center ${props.customStyle}`}>
          <Col lg={6}>
            <article>
              <h1 className="m-0 pb-3">{props.data.bannerTitle}</h1>
              <p className="m-0 pb-3">{props.data.bannerDescription.text}</p>
              {props.data.bannerButtonLabel ? (
                <I18nLink href={props.data.bannerButtonLink}>
                  <Button
                    variant="primary"
                    className={`text-uppercase ${
                      windowObj && windowSize.width <= 991 ? "btn-block" : ""
                    }`}
                  >
                    {props.data.bannerButtonLabel}
                  </Button>
                </I18nLink>
              ) : (
                ""
              )}
            </article>
          </Col>
          <Col lg={6} className="pt-4 pt-lg-0">
            <NextImage
              src={props.data.bannerImage.url}
              alt=""
              objectFit="contain"
              objectPosition="center"
              layout="intrinsic"
              width={600}
              height={212}
              className="mx-auto"
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                "/assets/images/icons/imageLoader.svg",
              )}`}
            />
          </Col>
        </Row>
      ) : (
        ""
      )}
    </>
  );
};

export default StaticBannerWhiteBGRightMultiImage;
