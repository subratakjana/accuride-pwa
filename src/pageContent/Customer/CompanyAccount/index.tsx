import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import { useQuery, useManualQuery, useMutation } from "graphql-hooks";
import GET_STATELIST_BY_COUNTRY from "@Graphql/queries/getStateList.graphql";
import CREATE_COMPANY_QUERY from "@Graphql/queries/createCompany.graphql";
import GET_INDUSTRY_LIST from "@Graphql/queries/getIndustryList.graphql";
import GET_JOBTITLE_LIST from "@Graphql/queries/getJobTitleList.graphql";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import { LoadingIndicator } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from "@Hooks/addDeleteDynamicScript";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const CompanyAccount = () => {
  const windowSize = useWindowDimensions();
  const router = useRouter();
  const [windowObj, updateWindowObj] = useState(false);
  const zone = (router && router.query.zone_lang) || "en-us";
  const enusCountry = [
    { country_code: "US", country_name: "United States" },
    { country_code: "CA", country_name: "Canada" },
  ];
  const encaCountry = [
    { country_code: "CA", country_name: "Canada" },
    { country_code: "US", country_name: "United States" },
  ];
  const [countryList] = useState(zone === "en-us" ? enusCountry : encaCountry);
  const [selectIndustry, setIndustry] = useState();
  const defaultSelectCountry = () => {
    const selectedCountry = countryList[0].country_code;
    return selectedCountry;
  };
  const [selectedCountry, setContSlct] = useState(defaultSelectCountry());
  const [selectJobTitle, setSelectJobTitle] = useState();
  const { token, notify, cartId, decode } = useContext(AuthContext);
  const [formData, setFormdata] = useState();
  const [prvCartId, setPrvCartId] = useState(false);
  const [guestSignData, setGuestSigndata] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [guestCustomerData, setGuestCustomerData] = useState(false);
  const [webFormFields, setWebFormFields] = useState([]);
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const formId = process.env.NEXT_PUBLIC_COMPANY_ACCOUNT_FORMID;
  //breadcrumbs
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
      name: "Company Account",
    },
  ];

  useEffect(() => {
    if (!token) {
      setPrvCartId(localStorage.getItem("prvCartId"));
    }
    if (!token && prvCartId === decode(router.query.cid)) {
      if (localStorage.guest_shipping_address_cart) {
        setGuestSigndata(JSON.parse(localStorage.guest_shipping_address_cart));
      }
      if (localStorage.guestSignIn) {
        setGuestCustomerData(JSON.parse(localStorage.guestSignIn));
      }
    }
  }, [token, cartId, prvCartId]);

  /** subscription webform details */
  const { data: dataWebForm } = useQuery(WEB_FORM_DETAILS.loc.source.body, {
    variables: {
      formId,
    },
    onSuccess: (data) => {
      if (data) {
        const res = data.data;
        setWebFormFields(res.getWebForms.webformfields);
      }
    },
  });

  useEffect(() => {
    if (dataWebForm && webFormFieldsArr.length === 0) {
      setWebFormFieldsArr(webFormFields);
    }
    if (webFormFieldsArr.length > 0) {
      addDynamicScriptMin(
        "/static/capture-acquisition-source.js",
        "captureHiddenFields",
      );
    }
    return () => {
      removeDynamicScript("captureHiddenFields");
    };
  });

  useEffect(() => {
    if (dataWebForm && webFormFieldsArr && webFormFieldsArr.length === 0) {
      setWebFormFieldsArr(webFormFields);
    }
    if (webFormFieldsArr && webFormFieldsArr.length > 0) {
      addDynamicScriptMin(
        "/static/capture-hiddenfields.js",
        "captureHiddenFields",
      );
    }
    return () => {
      removeDynamicScript("captureHiddenFields");
    };
  });
  /**
   * ACTon form data submit
   * @param {*} actionFormData
   */
  const actOnDataSubmit = (actionFormData) => {
    const actOnLink = `${dataWebForm.getWebForms.act_on_url}${actionFormData}`;
    const actonIframe = document.getElementById("actonIframe");
    if (actonIframe) actonIframe.remove();
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = actOnLink;
    iframe.id = "actonIframe";
    iframe.title = "actonIframe";
    document.body.appendChild(iframe);
    setTimeout(() => {
      const isActonIframe = document.getElementById("actonIframe");
      if (isActonIframe) isActonIframe.remove();
    }, 4000);
  };

  /**
   * on change industry list
   * check if other open other field
   */
  const onChangeIndustry = (e) => {
    const currentValue = e.target.value;
    setIndustry(currentValue);
  };

  /**
   * on change Job Title list
   * check if other open other field
   */
  const onChangeJobTitle = (e) => {
    const currentValuejob = e.target.value;
    setSelectJobTitle(currentValuejob);
  };

  const [getStateListFn, { loading: stateLoading }] = useManualQuery(
    GET_STATELIST_BY_COUNTRY.loc.source.body,
    {
      variables: { id: selectedCountry },
      onSuccess: (res) => {
        const { data } = res;
        setStateList(data.country.available_regions);
      },
    },
  );

  useEffect(() => {
    getStateListFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  }, [selectedCountry]);

  useEffect(() => {
    if (token) {
      const asPath = `/${router.query.zone_lang}/customer/account`;
      const routerPathname = router.pathname;
      const pathName = routerPathname.substring(
        0,
        routerPathname.lastIndexOf("/"),
      );
      router.push({ pathname: `${pathName}/account` }, `${asPath}`, {
        shallow: true,
      });
    }
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  /**
   * Industry list query function
   */
  const { loading: LoadIndustry, data: industryLists } = useQuery(
    GET_INDUSTRY_LIST.loc.source.body,
  );

  const { loading: JobTitle, data: jobTitleList } = useQuery(
    GET_JOBTITLE_LIST.loc.source.body,
  );

  const [validated, setValidated] = useState(false);
  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    if (
      targetObj.required &&
      targetObj.value.trim() === "" &&
      (targetObj.type === "text" || targetObj.type === "textarea")
    ) {
      targetObj.value = "";
    }
    const companyForm = document.querySelector("form[name='createcompany']");
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
    if (targetObj.name === "telephone") {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, "");
    }
    if (companyForm.checkValidity()) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  };

  /** viewCompanyPage function
   * redirect company view page with selected company data display only.
   * @param {*} companyData;
   */
  const viewCompanyPage = (companyData) => {
    const asPath = `/${router.query.zone_lang}/customer/company/view`;
    const pathName = "/[zone_lang]/customer/company/view";
    router.push(
      {
        pathname: pathName,
        query: { companyDtls: JSON.stringify(companyData) },
      },
      `${asPath}`,
      { shallow: true },
    );
  };

  /**
   * Create company form query declare.
   * post form data as a mutation query and accept input *companyInput*
   * @param {*} event;
   */
  const [createNewCompany, { loading: companyLoading }] = useMutation(
    CREATE_COMPANY_QUERY.loc.source.body,
  );
  /**
   * create company form on submit data ready.
   * data ready as per query object.
   * validation checking.
   * @param {*} event.
   */
  const creatcompanyAccountForm = (event) => {
    event.preventDefault();
    const companyForm = event.currentTarget;
    let newFormData = {};
    let company = {};
    let street = [];
    let actionFormData = "?";
    actionFormData += "&";
    for (let i = 0; i < companyForm.elements.length; ) {
      const field = companyForm.elements[i];
      const formField = field.name;
      const fieldActionLabel = field.getAttribute("actionlabel");
      const fieldDatainfo = field.getAttribute("datainfo");
      if (field.type == "hidden") {
        if (formField !== "") {
          actionFormData += `${fieldActionLabel}=${encodeURIComponent(
            fieldDatainfo,
          )}&`;
        }
      } else {
        if (
          formField === "city" ||
          formField === "company_name" ||
          formField === "country_id" ||
          formField === "postcode" ||
          formField === "reseller_id" ||
          formField === "telephone" ||
          formField === "vat_tax_id"
        ) {
          if (formField !== "reseller_id" && formField !== "vat_tax_id")
            actionFormData += `${formField}=${field.value}&`;
          company = { ...company, [formField]: field.value };
        } else if (formField === "region") {
          const regionDd = document.getElementById("JSregion");
          const regionText = regionDd.options[regionDd.selectedIndex].text;
          actionFormData += `${formField}=${regionText}&`;
          company = { ...company, [formField]: JSON.parse(field.value) };
        } else if (formField === "street0" || formField === "street1") {
          actionFormData += `${formField}=${field.value}&`;
          street = [...street, field.value];
        } else if (formField === "job_type") {
          if (field.value) {
            const jobTypeDd = document.getElementById("JSjobType");
            const jobTypeText = jobTypeDd.options[jobTypeDd.selectedIndex].text;

            actionFormData += `${formField}=${jobTypeText}&`;
            newFormData = { ...newFormData, [formField]: Number(field.value) };
          } else {
            actionFormData += `${formField}=${0}&`;
            newFormData = { ...newFormData, [formField]: 0 };
          }
        } else if (formField === "pick_your_industry") {
          const industryDd = document.getElementById("JSindustry");
          const industryText =
            industryDd.options[industryDd.selectedIndex].text;

          actionFormData += `${formField}=${industryText}&`;
          newFormData = { ...newFormData, [formField]: Number(field.value) };
        } else if (formField !== "") {
          actionFormData += `${formField}=${field.value}&`;
          newFormData = { ...newFormData, [formField]: field.value };
        }
      }

      i += 1;
    }

    newFormData.company = [company];
    newFormData.company[0].street = street;
    setFormdata(newFormData);
    const selectCountry = countryList.find(
      (item) => item.country_code === selectedCountry,
    );
    const selectRegion = stateList.find(
      (item) => item.id === company.region.region_id,
    );
    const companyDetailsData = {
      ...newFormData,
      selectRegion,
      selectCountry,
    };

    createNewCompany({
      variables: {
        companyInput: newFormData,
      },
      operationName: {
        headers: [{ headerName: "cf-token", headerValue: cfToken }],
      },
    })
      .then((data) => {
        if (data.error) {
          const { graphQLErrors } = data.error;
          const gqlError = graphQLErrors.map((e) => e.message);
          notify(gqlError[0], "error");
        } else {
          actOnDataSubmit(actionFormData);
          notify(data.data.createCompany.message, "success");
          viewCompanyPage(companyDetailsData);
        }
      })
      .catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors.map((e) => e.message);
        notify(gqlError[0], "error");
      });
  };

  if (LoadIndustry || companyLoading || JobTitle) return <LoadingIndicator />;
  const industryList = industryLists.pickYourIndustry;
  const jobTitleListdata = jobTitleList.jobTitle;

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="section-padding bg-primary company-account">
        <Container>
          <Form
            name="createcompany"
            validated={validated}
            onSubmit={creatcompanyAccountForm}
            className={`${windowObj && windowSize.width > 1024 ? "w-50" : ""} m-auto`}
          >
            <Row>
              {/* company Buyer start */}
              <Col sm={12}>
                <h2
                  className={`mb-3 pb-2 text-uppercase text-left text-md-left ${
                    windowObj && windowSize.width >= 768
                      ? "border-medium border-bottom"
                      : "border-medium border-bottom"
                  }`}
                >
                  company Buyer
                </h2>
                <Form.Row>
                  {/* first name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      First Name
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="firstname"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        (guestCustomerData ? guestCustomerData.fName : "") ||
                        (formData ? formData.firstname : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* last name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Last Name
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="lastname"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        (guestCustomerData ? guestCustomerData.lName : "") ||
                        (formData ? formData.lastname : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* email */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Email
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="customer_email"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="email"
                      required
                      defaultValue={
                        (guestCustomerData ? guestCustomerData.email : "") ||
                        (formData ? formData.customer_email : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* job title */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Job Title
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      id="JSjobType"
                      name="job_type"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      onChange={onChangeJobTitle}
                      as="select"
                      required
                      defaultValue={formData ? formData.job_type : ""}
                    >
                      {jobTitleListdata.map((jobTitle) => (
                        <option key={jobTitle.value} value={jobTitle.value}>
                          {jobTitle.label}
                        </option>
                      ))}
                    </Form.Control>

                    {selectJobTitle === "6" ? (
                      <Form.Control
                        className="mt-3"
                        name="job_title"
                        type="text"
                        required
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        defaultValue={formData ? formData.job_title : ""}
                      />
                    ) : null}
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Col>

              {/* company information start */}
              <Col sm={12} className="mt-3">
                <h2
                  className={`mb-3 pb-2 text-uppercase text-left text-md-left ${
                    windowObj && windowSize.width >= 768
                      ? "border-medium border-bottom"
                      : "border-medium border-bottom"
                  }`}
                >
                  company Info
                </h2>

                <Form.Row>
                  {/* company name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Company Name
                      <span className={"text-white"}> *</span>
                    </Form.Label>
                    <Form.Control
                      name="company_name"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        (guestSignData ? guestSignData.company : "") ||
                        (formData ? formData.company[0].company_name : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* address */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Street Address
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="street0"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      className="mb-2"
                      required
                      defaultValue={
                        (guestSignData ? guestSignData.street[0] : "") ||
                        (formData ? formData.company[0].street[0] : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group as={Col} lg={12}>
                    <Form.Control
                      name="street1"
                      type="text"
                      defaultValue={
                        (guestSignData ? guestSignData.street[1] : "") ||
                        (formData ? formData.company[0].street[1] : "")
                      }
                    />
                  </Form.Group>

                  {/* country */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Country
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="country_id"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      as="select"
                      required
                      onChange={(e) => {
                        setContSlct(e.target.value);
                      }}
                      defaultValue={
                        guestSignData
                          ? guestSignData.country.code
                          : [router.query.zone_lang === "en-ca" ? "CA" : "US"]
                      }
                    >
                      {countryList.map((item) => (
                        <option
                          key={item.country_code}
                          value={item.country_code}
                          id={`country_${item.country_code}`}
                        >
                          {item.country_name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* state */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      State/Province
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      id="JSregion"
                      name="region"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      as="select"
                      required
                      defaultValue={
                        guestSignData
                          ? `{"region_id":${guestSignData.region_id}}`
                          : ""
                      }
                    >
                      {stateList.map((state) => (
                        <option
                          key={state.id}
                          value={JSON.stringify({ region_id: state.id })}
                        >
                          {state.name}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* city */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      City
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="city"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        (guestSignData ? guestSignData.city : "") ||
                        (formData ? formData.company[0].city : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* zip */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Zip/Postal Code
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="postcode"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        (guestSignData ? guestSignData.postcode : "") ||
                        (formData ? formData.company[0].postcode : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* phone number */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Phone Number
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="telephone"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="tel"
                      required
                      defaultValue={
                        (guestSignData ? guestSignData.telephone : "") ||
                        (formData ? formData.company[0].telephone : "")
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Col xs={12}>
                    <Row>
                      <Col xs={12} sm={6}>
                        {/* vat */}
                        <Form.Group>
                          <Form.Label className="text-white">
                            VAT/TAX ID
                          </Form.Label>
                          <Form.Control
                            name="vat_tax_id"
                            type="text"
                            defaultValue={
                              formData ? formData.company[0].vat_tax_id : ""
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={12} sm={6}>
                        {/* re-seller id */}
                        <Form.Group>
                          <Form.Label className="text-white">
                            Re-seller ID
                          </Form.Label>
                          <Form.Control
                            name="reseller_id"
                            type="text"
                            defaultValue={
                              formData ? formData.company[0].reseller_id : ""
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>

                  {/* industry */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label className="text-white">
                      Pick Your Industry
                      <span className="text-white"> *</span>
                    </Form.Label>
                    <Form.Control
                      id="JSindustry"
                      name="pick_your_industry"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      onChange={onChangeIndustry}
                      as="select"
                      required
                      defaultValue={formData ? formData.pick_your_industry : ""}
                    >
                      <option value="">Select Your Industry</option>
                      {industryList.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </Form.Control>

                    {selectIndustry === "736" ? (
                      <Form.Control
                        className="mt-3"
                        name="other_industry"
                        type="text"
                        required
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        defaultValue={formData ? formData.other_industry : ""}
                      />
                    ) : (
                      ""
                    )}
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                  {webFormFields &&
                    webFormFields.map((item) =>
                      item.field_type === "hidden" ? (
                        <Form.Group className="d-none" key={item.field_id}>
                          <Form.Control
                            type="hidden"
                            name={item.field_id}
                            actionlabel={item.field_code}
                            value={
                              item.field_hidden_value
                                ? item.field_hidden_value
                                : ""
                            }
                          />
                        </Form.Group>
                      ) : null,
                    )}
                </Form.Row>
                <input type="hidden" name="cf-token" value={cfToken} />
              </Col>

              <Col sm={12} className="text-left text-md-left pt-3">
                <div className="pb-3">
                  <CloudflareTurnstile
                    setCfToken={setCfToken}
                    cfTokenCall={cfTokenCall}
                    formName="SignUp Form"
                  />
                </div>
                <div className="btn-custom-wrap d-inline-block ml-1">
                  <Button
                    disabled={!cfToken}
                    variant={cfToken ? "secondary" : "medium"}
                    type="submit"
                    className={`text-uppercase ${
                      windowObj && windowSize.width <= 767
                        ? "btn-block btn-lg"
                        : "btn-lg"
                    } px-5`}
                  >
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
      {stateLoading && <LoadingIndicator />}
    </>
  );
};

export default CompanyAccount;
