import React, { useState, useEffect, DetailedHTMLProps, HTMLAttributes } from "react";
import Form from "react-bootstrap/Form";
import useWindowDimensions from "@Hooks/windowDimention";
import { validateZoneLocale } from "@I18n/index";
import NextImage from "next/legacy/image";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";
import styled from "styled-components";

const StyledDiv = styled.div<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {customWidth: string}>((props) => ({
  width: props.customWidth
}))

const ShippingMethosSkeletonLoader = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <>
      <section className="acc-shipping-method section-padding pb-0">
        <header
          className={`mb-3 ${
            windowObj && windowSize.width > 1024
              ? "border-bottom border-medium"
              : ""
          }`}
        >
          <h2
            className={`mb-0 ${
              windowObj && windowSize.width > 1024
                ? "text-primary text-uppercase pb-2"
                : "text-dark"
            }`}
          >
            <Skeleton height={36} />
          </h2>
        </header>
        <ul className="acc-method-list pb-3">
          <li className="d-flex p-2 p-xl-1 mb-0 align-items-center justify-content-between">
            <div className="w-25">
              <Skeleton height={24} />
            </div>
            <div className="w-75 pl-4">
              <Skeleton height={60} />
            </div>
          </li>
          <li className="d-flex p-2 p-xl-1 mb-0 align-items-center justify-content-between">
            <div className="w-25">
              <Skeleton height={24} />
            </div>
            <div className="w-75 pl-4">
              <Skeleton height={60} />
            </div>
          </li>
          <li className="d-flex p-2 p-xl-1 mb-0 align-items-center justify-content-between">
            <div className="w-25">
              <Skeleton height={24} />
            </div>
            <div className="w-75 pl-4">
              <Skeleton height={60} />
            </div>
          </li>
          <li className="d-flex p-2 p-xl-1 mb-0 align-items-center justify-content-between">
            <div className="w-25">
              <Skeleton height={24} />
            </div>
            <div className="w-75 pl-4">
              <Skeleton height={60} />
            </div>
          </li>
        </ul>
      </section>
    </>
  );
};

const ShippingMethod = (props) => {
  const router = useRouter();
  const validZoneConfig = validateZoneLocale(router.query.zone_lang);
  const priceCurrency = validZoneConfig.currency === "USD" ? "$" : "CA$";
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const {
    FedxList,
    selectFedex,
    shippingMode,
    shippingAmount,
    shippingMethodLoader,
  } = props;
  
  const [maxWidth, setMaxwidth] = useState();

  const checkMaxWidth = () => {
    const targetWidth = document.querySelectorAll("[name='shipingMaxWidth']");
    let elMaxwidth = 0;
    for (let i = 0; i < targetWidth.length; ) {
      const itemWidth = targetWidth[i].clientWidth + 2;
      elMaxwidth = Math.max(elMaxwidth, itemWidth);
      i += 1;
    }
    setMaxwidth(elMaxwidth);
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  useEffect(() => {
    setMaxwidth();
    setTimeout(() => {
      checkMaxWidth();
    }, 300);
  }, [FedxList, windowSize]);

  return (
    <>
      {shippingMethodLoader ? (
        <ShippingMethosSkeletonLoader />
      ) : (
        <section className="acc-shipping-method section-padding pb-0">
          <header
            className={`mb-3 ${
              windowObj && windowSize.width > 1024
                ? "border-bottom border-medium"
                : ""
            }`}
          >
            <h2
              className={`mb-0 ${
                windowObj && windowSize.width > 1024
                  ? "text-primary text-uppercase pb-2"
                  : "text-dark"
              }`}
            >
              Shipping Methods
            </h2>
          </header>
          {!shippingMode ? (
            <Form>
              <ul className="acc-method-list">
                {FedxList.map((item, indx) => (
                  <React.Fragment key={item.method_code}>
                    {item.error_message === "" ? (
                      <li className="mb-3">
                        <Form.Label className="d-flex bg-light p-2 p-xl-0 rounded position-relative mb-0 align-items-center justify-content-between">
                          <Form.Check
                            custom
                            id={`id-${indx}`}
                            type="radio"
                            label={`${priceCurrency}${item.price_incl_tax.toFixed(
                              2,
                            )}`}
                            name="shipping-method"
                            value={JSON.stringify(item)}
                            onChange={(e) => {
                              selectFedex(JSON.parse(e.target.value));
                            }}
                          />
                          <StyledDiv
                            name="shipingMaxWidth"
                            className="d-flex pl-xl-2 flex-column flex-sm-row align-items-center"
                            customWidth={
                              maxWidth && windowObj && windowSize.width < 576
                                ? `${maxWidth}px`
                                : null
                            }
                          >
                            <span
                              className={`d-block acc-ship-option-name ${
                                windowObj && windowSize.width > 1024
                                  ? "text-center"
                                  : "font-size-md"
                              }`}
                            >
                              {item.method_title.replace(/_/g, " ")}
                            </span>
                            <span className="d-inline-block bg-white rounded px-2 py-3 shadow-1 my-2 my-sm-0 mx-sm-3 mr-xl-0">
                              <span className="acc-next-icon">
                                <NextImage
                                  src="/assets/images/fedex.png"
                                  alt="Fedex"
                                  width={71}
                                  height={20}
                                  objectFit="contain"
                                />
                              </span>
                            </span>
                          </StyledDiv>
                        </Form.Label>
                      </li>
                    ) : (
                      <span className="d-block px-3 pb-3 px-xl-0 bg-light">
                        This is not a valid
                        <strong> Ship To </strong>
                        address.
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </Form>
          ) : (
            <Form>
              <ul className="acc-method-list">
                {FedxList.map((item, indx) => (
                  <React.Fragment key={item.method_code}>
                    {item.error_message === "" ? (
                      <li className="mb-3">
                        <Form.Label className="d-flex bg-light p-3 rounded position-relative mb-0 align-items-center justify-content-between">
                          <Form.Check
                            custom
                            id={`id-${indx}`}
                            type="radio"
                            label={`${priceCurrency}${item.amount.value.toFixed(
                              2,
                            )}`}
                            name="shipping-method"
                            value={JSON.stringify(item)}
                            onChange={(e) => {
                              selectFedex(JSON.parse(e.target.value));
                            }}
                          />
                          <StyledDiv
                            name="shipingMaxWidth"
                            className="d-flex flex-column flex-sm-row align-items-center"
                            customWidth={
                              maxWidth && windowObj && windowSize.width < 576
                                ? `${maxWidth}px`
                                : null
                            }
                          >
                            <span className="d-block font-size-lg">
                              {item.method_title}
                            </span>
                            <span className="d-inline-block bg-white rounded px-2 py-3 shadow-1 my-2 my-sm-0 mx-sm-3">
                              <NextImage
                                src="/assets/images/fedex.png"
                                alt="Fedex"
                                width={71}
                                height={20}
                                objectFit="contain"
                              />
                            </span>
                            <span className="d-block font-size-lg">
                              {item.carrier_title}
                            </span>
                          </StyledDiv>
                        </Form.Label>
                      </li>
                    ) : (
                      <span className="d-block px-3 pb-3 px-xl-0 bg-light">
                        This is not a valid
                        <strong> Ship To </strong>
                        address.
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </Form>
          )}
        </section>
      )}
    </>
  );
};

export default ShippingMethod;
