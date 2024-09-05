import { Row, Col, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { useEffect, useState } from "react";

const DefaultAddress = (props) => {
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  /**
   * edit address function.
   * redirect edit addresss page with selected address data.
   * @param {*} editAddress;
   */
  const editAddressPage = (editAddress) => {
    let asPath = "";
    if (window.location.pathname.match("/address")) {
      asPath = `${router.asPath.split("?")[0]}/editaddress`;
    } else {
      asPath = `${router.asPath.split("?")[0]}/address/editaddress`;
    }
    const querySign = "?";
    const pageQuery = `id-${editAddress.id}`;
    if (window.location.pathname.match("/address")) {
      router.push(
        {
          pathname: `${router.pathname}/editaddress`,
          query: { editAddressObj: JSON.stringify(editAddress) },
        },
        `${asPath}${querySign}${pageQuery}`,
        { shallow: true },
      );
    } else {
      router.push(
        {
          pathname: `${router.pathname}/address/editaddress`,
          query: { editAddressObj: JSON.stringify(editAddress) },
        },
        `${asPath}${querySign}${pageQuery}`,
        { shallow: true },
      );
    }
  };

  const displayDefaultAddress = (type) => {
    if (props.addresses.length > 0) {
      const defaultAddress = props.addresses.filter((info) => {
        if (type === "billing") if (info.default_billing === true) return info;
        if (type === "shipping")
          if (info.default_shipping === true) return info;
        return false;
      });
      if (defaultAddress.length > 0) {
        return (
          <div key={type}>
            <span className="d-block">
              {defaultAddress[0].firstname}
              &nbsp;
              {defaultAddress[0].lastname}
              <br />
              {defaultAddress[0].street.map((streetLine) => (
                <span className="" key={Math.random()}>
                  {`${streetLine}, `}
                </span>
              ))}
              <span className="">{`${defaultAddress[0].city}, `}</span>
              <span className="">
                {windowObj.width < 768
                  ? defaultAddress[0].region.region_code
                  : defaultAddress[0].region.region}
              </span>
              <span className="">{` ${defaultAddress[0].postcode}`}</span>
              <br />
              {defaultAddress[0].country_code}
            </span>
            <span className="d-block">
              T:
              <strong className="text-primary font-weight-500">
                {defaultAddress[0].telephone}
              </strong>
            </span>
            <Button
              variant="primary"
              onClick={() => editAddressPage(defaultAddress[0])}
              className="text-uppercase mt-3"
            >
              Edit Address
            </Button>
          </div>
        );
      }
      return (
        <Alert variant="warning">
          You have not set a default&nbsp;
          {type}
          &nbsp;address.
        </Alert>
      );
    }
    return (
      <Alert variant="warning">
        You have not set a default&nbsp;
        {type}
        &nbsp;address.
      </Alert>
    );
  };

  return (
    <section className={`section-padding pb-0 ${props.className}`}>
      <header
        className={`mb-3 pb-xl-2 d-flex align-items-center border-medium justify-content-between ${
          windowObj && windowSize.width > 1024 ? "border-bottom" : ""
        } `}
      >
        <h2 className="text-uppercase mb-0">
          {!window.location.pathname.match(/address/)
            ? "Address Book"
            : "Default Addresses"}
        </h2>
        {!window.location.pathname.match(/address/) ? (
          <I18nLink href="/customer/account/address">
            <Button variant="primary" className="text-uppercase">
              Manage Address
            </Button>
          </I18nLink>
        ) : null}
      </header>

      <Row>
        {/* default billing address start */}
        <Col sm>
          <article>
            <h5 className="font-weight-700 text-dark mb-2">
              Default Billing Address
            </h5>
            {displayDefaultAddress("billing")}
          </article>
        </Col>
        {/* default billing address end */}

        {/* default shipping address start */}
        <Col sm className="mt-3 mt-sm-0">
          <article
            className={`border-medium pt-3 pt-sm-0 ${
              windowObj && windowSize.width < 576 ? "border-top" : ""
            }`}
          >
            <h5 className="font-weight-700 text-dark mb-2">
              Default Shipping Address
            </h5>
            {displayDefaultAddress("shipping")}
          </article>
        </Col>
        {/* default shipping address end */}
      </Row>
    </section>
  );
};
export default DefaultAddress;
