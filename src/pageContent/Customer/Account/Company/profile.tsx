import { Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { useManualQuery } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import GET_COMPANY_PROFILE from "@Graphql/queries/getCustomerCompany.graphql";
import { LoadingIndicator } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const CompanyProfile = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { isAuthUser } = useContext(AuthContext);
  useEffect(() => {
    isAuthUser();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

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
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[3]}`,
      name: pathSegments[3],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
      name: "Profile",
    },
  ];

  // API Calling to get the Customer Company Profile details
  let companyProfile = {};
  const [getCompanyProfile, { loading, data }] = useManualQuery(
    GET_COMPANY_PROFILE.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );
  useEffect(() => {
    getCompanyProfile();
  }, []);
  if (data) companyProfile = { ...data.getCustomerCompany[0] };

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding pt-0">
        <Row className="align-items-start">
          {/* sidebar start */}
          <Col
            xl
            className={`acc-account-sidebar pt-xl-5 ${
              isSticky ? "sticky" : ""
            }`}
          >
            <AccountSidebar />
          </Col>
          {/* sidebar end */}

          {/* content start */}
          <Col xl className="acc-account-content pt-xl-5">
            <header className="mb-3">
              <h1 className="text-uppercase mb-0">Company Profile</h1>
            </header>
            {/* account iformation start */}
            <section className="section-padding pb-0 pt-0">
              <header
                className={`mb-3 pb-xl-2 d-flex align-items-center border-medium justify-content-between ${
                  windowObj && windowSize.width > 1024 ? "border-bottom" : ""
                }`}
              >
                <h2 className="text-uppercase mb-0">Account Information</h2>
              </header>
              <Row>
                <Col sm className="col-sm">
                  <article>
                    <div>
                      <span className="d-block">
                        {`${companyProfile.company_name} (${companyProfile.legal_name})`}
                      </span>
                      <span className="d-block">
                        {companyProfile.company_email}
                      </span>
                      <span className="d-block">
                        {`VAT/TAX ID: ${companyProfile.vat_tax_id}`}
                      </span>
                      <span className="d-block">
                        {`Re-seller ID: ${companyProfile.reseller_id}`}
                      </span>
                    </div>
                  </article>
                </Col>
              </Row>
            </section>
            {/* account iformation end */}
            {/* legal address start */}
            <section className="section-padding pb-0">
              <header
                className={`mb-3 pb-xl-2 d-flex align-items-center border-medium justify-content-between ${
                  windowObj && windowSize.width > 1024 ? "border-bottom" : ""
                }`}
              >
                <h2 className="text-uppercase mb-0">Legal Address</h2>
              </header>
              <Row>
                <Col sm className="col-sm">
                  <article>
                    <div>
                      <span className="d-block">{companyProfile.street}</span>
                      <span className="d-block">
                        {`${companyProfile.city}, ${companyProfile.region_name}, ${companyProfile.postcode}`}
                      </span>
                      <span className="d-block">
                        {companyProfile.country_name}
                      </span>
                      <span className="d-block">
                        {`T: ${companyProfile.telephone}`}
                      </span>
                    </div>
                  </article>
                </Col>
              </Row>
            </section>
            {/* legal address end */}
            {/* contacts start */}
            <section className="section-padding pb-0">
              <header
                className={`mb-3 pb-xl-2 d-flex align-items-center border-medium justify-content-between ${
                  windowObj && windowSize.width > 1024 ? "border-bottom" : ""
                }`}
              >
                <h2 className="text-uppercase mb-0">Contacts</h2>
              </header>
              <Row>
                <Col sm>
                  <article>
                    <h5 className="font-weight-700 text-dark mb-2">
                      Company Administrator
                    </h5>
                    <div>
                      <span className="d-block">
                        {companyProfile.administrator_name}
                      </span>
                      <span className="d-block">
                        {companyProfile.job_title}
                      </span>
                      <span className="d-block">{companyProfile.email}</span>
                    </div>
                  </article>
                </Col>
                <Col sm className="mt-3 mt-sm-0">
                  <article
                    className={`border-medium pt-3 pt-sm-0 ${
                      windowObj && windowSize.width <= 575 ? "border-top" : ""
                    }`}
                  >
                    <h5 className="font-weight-700 text-dark mb-2">
                      Sales Representative
                    </h5>
                    <div>
                      <span className="d-block">
                        {companyProfile.sales_representative_name}
                      </span>
                      <span className="d-block">
                        {companyProfile.sales_representative_email}
                      </span>
                    </div>
                  </article>
                </Col>
              </Row>
            </section>
            {/* contacts end */}
            {/* payment information start */}
            <section className="section-padding pb-0">
              <header
                className={`mb-3 pb-xl-2 d-flex align-items-center border-medium justify-content-between ${
                  windowObj && windowSize.width > 1024 ? "border-bottom" : ""
                }`}
              >
                <h2 className="text-uppercase mb-0">Payment Information</h2>
              </header>
              <Row>
                <Col sm>
                  <article>
                    <h5 className="font-weight-700 text-dark mb-2">
                      Available Payment Methods
                    </h5>
                    <div>
                      {companyProfile.paymentMethods
                        ? companyProfile.paymentMethods.map((item) => (
                            <span className="d-block" key={Math.random()}>
                              {item.method_name}
                            </span>
                          ))
                        : ""}
                    </div>
                  </article>
                </Col>
              </Row>
            </section>
            {/* payment information end */}
          </Col>
          {/* content end */}
        </Row>
        {loading ? <LoadingIndicator /> : ""}
      </Container>
      <EmailSubscription />
    </>
  );
};

export default CompanyProfile;
