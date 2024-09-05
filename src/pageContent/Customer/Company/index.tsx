import { Container } from "react-bootstrap";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import GET_JOBTITLE_LIST from "@Graphql/queries/getJobTitleList.graphql";
import { useQuery } from "graphql-hooks";
import { useContext, useEffect, useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";
import { LoadingIndicator } from "@Components/Utilities";

const Company = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [getJobType, setGetJobType] = useState(false);
  const router = useRouter();
  const { goToLogin } = useContext(AuthContext);
  let companyDtls = "";

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { loading: JobTitle, data: jobTitleList } = useQuery(
    GET_JOBTITLE_LIST.loc.source.body,
  );

  const jobTitleListdata = jobTitleList && jobTitleList.jobTitle;

  companyDtls =
    router.query.companyDtls && JSON.parse(router.query.companyDtls);
  useEffect(() => {
    if (jobTitleListdata && companyDtls) {
      const getData = jobTitleListdata.filter(
        (item) => Number(item.value) === Number(companyDtls.job_type),
      );
      setGetJobType(getData[0].label);
    }
  }, [jobTitleListdata, companyDtls]);

  if (!router.query.companyDtls && windowObj) {
    const windowPathname = window.location.pathname;
    const windowPathArr = windowPathname.split("/");
    if (
      windowPathArr.indexOf("company") > 0 &&
      windowPathArr.indexOf("view") > 0
    )
      goToLogin();
    return null;
  }
  if (!windowObj) return <LoadingIndicator />;

  const getGender = () => {
    switch (companyDtls.gender) {
      case 1:
        return "Male";
      case 2:
        return "Female";
      case 3:
        return "Not Specified";
      default:
        return null;
    }
  };

  return (
    <>
      <Container className="section-padding">
        <header className="mb-3">
          <h1 className="mb-0 text-uppercase">Create New Company</h1>
        </header>

        {/* company information start */}
        <article className="border-bottom border-medium pb-3 mb-3">
          <header
            className={`mb-3 pb-2 border-medium ${
              windowObj && windowSize.width > 767 ? "border-bottom" : ""
            }`}
          >
            <h3 className="mb-0 text-uppercase">Company Information</h3>
          </header>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">Company Name: </strong>
            <span>{companyDtls.company[0].company_name}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">VAT/TAX ID: </strong>
            <span>{companyDtls.company[0].vat_tax_id}</span>
          </div>
          <div className="d-flex justify-content-between">
            <strong className="white-space-nowrap mr-3">Re-seller ID: </strong>
            <span>{companyDtls.company[0].reseller_id}</span>
          </div>
        </article>
        {/* company information end */}

        {/* legal address start */}
        <article className="border-bottom border-medium pb-3 mb-3">
          <header
            className={`mb-3 pb-2 border-medium ${
              windowObj && windowSize.width > 767 ? "border-bottom" : ""
            }`}
          >
            <h3 className="mb-0 text-uppercase">Legal Address</h3>
          </header>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">
              Street Address:{" "}
            </strong>
            <div className="text-right">
              <span className="d-block">
                {companyDtls.company[0].street[0]}
              </span>
              {companyDtls.company[0].street[1] === "" ? null : (
                <span className="d-block mt-2">
                  {companyDtls.company[0].street[1]}
                </span>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">City: </strong>
            <span>{companyDtls.company[0].city}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">Country: </strong>
            <span>{companyDtls.selectCountry.country_name}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">
              State/Province:{" "}
            </strong>
            <span>{companyDtls.selectRegion.name}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">
              ZIP/Postal Code:{" "}
            </strong>
            <span>{companyDtls.company[0].postcode}</span>
          </div>
          <div className="d-flex justify-content-between">
            <strong className="white-space-nowrap mr-3">Phone Number: </strong>
            <span>{companyDtls.company[0].telephone}</span>
          </div>
        </article>
        {/* legal address end */}

        {/* company administrator start */}
        <article>
          <header
            className={`mb-3 pb-2 border-medium ${
              windowObj && windowSize.width > 767 ? "border-bottom" : ""
            }`}
          >
            <h3 className="mb-0 text-uppercase">Company Administrator</h3>
          </header>
          {companyDtls.job_type === 6 && companyDtls.job_title ? (
            <div className="d-flex justify-content-between mb-2">
              <strong className="white-space-nowrap mr-3">Job Title: </strong>
              <span>{companyDtls.job_title}</span>
            </div>
          ) : null}
          {companyDtls.job_type !== 6 && companyDtls.job_type && getJobType ? (
            <div className="d-flex justify-content-between mb-2">
              <strong className="white-space-nowrap mr-3">Job Title: </strong>
              <span>{getJobType}</span>
            </div>
          ) : null}
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">Email Address: </strong>
            <span>{companyDtls.customer_email}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">First Name: </strong>
            <span>{companyDtls.firstname}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <strong className="white-space-nowrap mr-3">Last Name: </strong>
            <span>{companyDtls.lastname}</span>
          </div>
        </article>
        {/* company administrator end */}
      </Container>
    </>
  );
};
export default Company;
