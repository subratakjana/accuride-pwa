import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { useManualQuery } from "graphql-hooks";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { getCustomerAddresses } from "@Graphql/queries/getCustomerAddresses.graphql";
import { I18nLink, LoadingIndicator } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const DefaultAddress = dynamic(
  () => import("@Components/Customer/Account/DefaultAddress"),
);
const AdditionalAddress = dynamic(
  () => import("@Components/Customer/Account/Address/AdditionalAddress"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const Address = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  let customerAddressData = "";
  const { token, isAuthUser } = useContext(AuthContext);

  // Function for sidebar sticky issue start
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // Function for sidebar sticky issue end

  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: pathSegments[2],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
      name: "Address",
    },
  ];

  useEffect(() => {
    isAuthUser();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // API calling to get the customer address query declare.
  const [userAddress, { loading, data }] = useManualQuery(
    getCustomerAddresses.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );
  useEffect(() => {
    userAddress();
  }, []);
  if (loading || !token) return <LoadingIndicator />;

  if (data) customerAddressData = data.customer.addresses;

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding pt-0">
        <Row className="align-items-start">
          {/* account sidebar start */}
          <Col
            xl
            className={`acc-account-sidebar pt-xl-5 ${
              isSticky ? "sticky" : ""
            }`}
          >
            <AccountSidebar />
          </Col>
          {/* account sidebar end */}

          {/* account content start */}
          <Col xl className="acc-account-content pt-xl-5">
            {customerAddressData.length > 0 ? (
              <>
                <header className="mb-3">
                  <h1 className="mb-0 text-uppercase">Address Book</h1>
                </header>
                {/* default addresses */}
                <DefaultAddress
                  addresses={customerAddressData}
                  className="pt-0"
                />

                {/* additional addresses */}
                <AdditionalAddress addresses={customerAddressData} />
              </>
            ) : (
              <Alert variant="warning">
                You don&#39;t have added any address.
              </Alert>
            )}
            <I18nLink href="/customer/account/address/addaddress">
              <Button
                variant="secondary"
                className={`text-uppercase mt-3 ${
                  windowObj && windowSize.width <= 1024 ? "btn-block" : ""
                } `}
              >
                Add New Address
              </Button>
            </I18nLink>
          </Col>
          {/* account content end */}
        </Row>
      </Container>
      <EmailSubscription />
    </>
  );
};

export default Address;
