import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import globalData from "@Components/Utilities/globalData";
import { useQuery, useMutation } from "graphql-hooks";
import GET_STATELIST_BY_COUNTRY from "@Graphql/queries/getStateList.graphql";
import CREATE_COMPANY_QUERY from "@Graphql/queries/createCompany.graphql";
import GET_INDUSTRY_LIST from "@Graphql/queries/getIndustryList.graphql";
import GET_CUSTOMER_CATEGORY from "@Graphql/queries/getCustomerCategory.graphql";
import { LoadingIndicator } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import Head from "next/head";
import useWindowDimensions from "@Hooks/windowDimention";

const CreatecompanyAccount = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [countryList] = useState(globalData.countryList);
  const [selectedCountry, setCountry] = useState({
    country: countryList.length > 0 ? countryList[0].country_code : "",
  });
  const [selectIndustry, setIndustry] = useState();
  const { token, notify } = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormdata] = useState();

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
   * on change industry list
   * check if other open other field
   */
  const onChangeIndustry = (e) => {
    const currentValue = e.target.value;
    setIndustry(currentValue);
  };

  /**
   * get state list by country id on changing country.
   */
  const getStateList = (event) => {
    const countryId = event.target.value;
    setCountry({
      ...selectedCountry,
      country: countryId,
    });
  };

  /**
   * state list query function
   */
  const { loading: stateLoading, data: stateLists } = useQuery(
    GET_STATELIST_BY_COUNTRY.loc.source.body,
    {
      variables: {
        id: selectedCountry.country,
      },
    },
  );

  /**
   * Industry list query function
   */
  const { loading: LoadIndustry, data: industryLists } = useQuery(
    GET_INDUSTRY_LIST.loc.source.body,
  );

  /**
   * Customer category list query function
   */
  const { loading: LoadCategory, data: customerCategoryLists } = useQuery(
    GET_CUSTOMER_CATEGORY.loc.source.body,
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
    for (let i = 0; i < companyForm.elements.length; ) {
      const field = companyForm.elements[i];
      const formField = field.name;
      if (
        formField === "city" ||
        formField === "company_email" ||
        formField === "company_name" ||
        formField === "country_id" ||
        formField === "legal_name" ||
        formField === "postcode" ||
        formField === "reseller_id" ||
        formField === "telephone" ||
        formField === "vat_tax_id"
      ) {
        company = { ...company, [formField]: field.value };
      } else if (formField === "region") {
        company = { ...company, [formField]: JSON.parse(field.value) };
      } else if (formField === "street0" || formField === "street1") {
        street = [...street, field.value];
      } else if (formField === "customer_category") {
        const multipleOptions = field.options;
        const multiplevalue = [];
        for (let p = 0; p < multipleOptions.length; ) {
          const opt = multipleOptions[p];
          if (opt.selected) {
            multiplevalue.push(Number(opt.value));
          }
          p += 1;
        }
        newFormData = { ...newFormData, [formField]: multiplevalue };
      } else if (formField === "gender") {
        newFormData = { ...newFormData, [formField]: Number(field.value) };
      } else if (formField !== "") {
        newFormData = { ...newFormData, [formField]: field.value };
      }
      i += 1;
    }
    newFormData.company = [company];
    newFormData.company[0].street = street;

    setFormdata(newFormData);
    const selectCountry = countryList.find(
      (item) => item.country_code === selectedCountry.country,
    );
    const selectRegion = stateLists.country.available_regions.find(
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
    })
      .then((data) => {
        notify(data.data.createCompany.message, "success");
        viewCompanyPage(companyDetailsData);
      })
      .catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors.map((e) => e.message);
        notify(gqlError[0], "error");
      });
  };

  if (
    (stateLoading && !stateLists) ||
    LoadIndustry ||
    companyLoading ||
    LoadCategory
  )
    return <LoadingIndicator />;
  const stateList = stateLists.country;
  const industryList = industryLists.pickYourIndustry;
  const customercategoryList = customerCategoryLists.customercategory;

  return (
    <>
      <Head>
        <title>New Company</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
      </Head>
      <section className="section-padding">
        <Container>
          {/* header start */}
          <header className="mb-3 text-center text-md-left">
            <h1 className="mb-0 text-uppercase">New company</h1>
          </header>
          {/* header end */}
          <Form
            name="createcompany"
            validated={validated}
            onSubmit={creatcompanyAccountForm}
            className={`${windowObj && windowSize.width > 1024 ? "w-50" : ""}`}
          >
            <Row>
              {/* company inpormation start */}
              <Col sm={12}>
                <h2
                  className={`mb-3 pb-2 text-uppercase text-center text-md-left ${
                    windowObj && windowSize.width >= 768
                      ? "border-medium border-bottom"
                      : ""
                  }`}
                >
                  company Information
                </h2>
                <Form.Row>
                  {/* company name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Company Name
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="company_name"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        formData ? formData.company[0].company_name : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* company leagal name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>Company Legal Name</Form.Label>
                    <Form.Control
                      name="legal_name"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      defaultValue={
                        formData ? formData.company[0].legal_name : ""
                      }
                    />
                  </Form.Group>

                  {/* email */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Company Email
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="company_email"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="email"
                      required
                      defaultValue={
                        formData ? formData.company[0].company_email : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* vat */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>VAT/TAX ID</Form.Label>
                    <Form.Control
                      name="vat_tax_id"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      defaultValue={
                        formData ? formData.company[0].vat_tax_id : ""
                      }
                    />
                  </Form.Group>

                  {/* re-seller id */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>Re-seller ID</Form.Label>
                    <Form.Control
                      name="reseller_id"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      defaultValue={
                        formData ? formData.company[0].reseller_id : ""
                      }
                    />
                  </Form.Group>
                </Form.Row>
              </Col>
              {/* personal inpormation end */}

              {/* legal address start */}
              <Col sm={12} className="mt-3">
                <h2
                  className={`mb-3 pb-2 text-uppercase text-center text-md-left ${
                    windowObj && windowSize.width >= 768
                      ? "border-medium border-bottom"
                      : ""
                  }`}
                >
                  Legal Address
                </h2>
                <Form.Row>
                  {/* address */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Street Address
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="street0"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      className="mb-2"
                      required
                      defaultValue={
                        formData ? formData.company[0].street[0] : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                    <Form.Control
                      name="street1"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      defaultValue={
                        formData ? formData.company[0].street[1] : ""
                      }
                    />
                  </Form.Group>

                  {/* country */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Country
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="country_id"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      as="select"
                      required
                      onChange={getStateList}
                    >
                      {countryList.map((item) => (
                        <option
                          key={item.country_code}
                          value={item.country_code}
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
                    <Form.Label>
                      State/Province
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="region"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      as="select"
                      required
                    >
                      {stateList.available_regions.map((state) => (
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
                    <Form.Label>
                      City
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="city"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={formData ? formData.company[0].city : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* zip */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      ZIP/Postal Code
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="postcode"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={
                        formData ? formData.company[0].postcode : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* phone number */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Phone Number
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="telephone"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="tel"
                      required
                      defaultValue={
                        formData ? formData.company[0].telephone : ""
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Col>
              {/* legal address end */}

              {/* company administrator start */}
              <Col sm={12} className="mt-3">
                <h2
                  className={`mb-3 pb-2 text-uppercase text-center text-md-left ${
                    windowObj && windowSize.width >= 768
                      ? "border-medium border-bottom"
                      : ""
                  }`}
                >
                  company Administrator
                </h2>
                <Form.Row>
                  {/* job title */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>Job Title</Form.Label>
                    <Form.Control
                      name="job_title"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      defaultValue={formData ? formData.job_title : ""}
                    />
                  </Form.Group>

                  {/* email */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Email
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="customer_email"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="email"
                      required
                      defaultValue={formData ? formData.customer_email : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* first name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      First Name
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="firstname"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={formData ? formData.firstname : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* last name */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Last Name
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="lastname"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      type="text"
                      required
                      defaultValue={formData ? formData.lastname : ""}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* gender */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Gender
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="gender"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      as="select"
                      required
                    >
                      <option value={1}>Male</option>
                      <option value={2}>Female</option>
                      <option value={3}>Not Specified</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* customer category */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Customer Category
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="customer_category"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      as="select"
                      multiple
                      required
                      defaultValue={formData ? formData.customer_category : []}
                    >
                      {customercategoryList.map((industry) => (
                        <option key={industry.value} value={industry.value}>
                          {industry.label}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* industry */}
                  <Form.Group as={Col} lg={12}>
                    <Form.Label>
                      Pick Your Industry
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
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
                        defaultValue={formData ? formData.other_industry : ""}
                      />
                    ) : (
                      ""
                    )}
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </Col>
              {/* company administrator end */}

              <Col sm={12} className="text-right text-md-left">
                <Button
                  variant="secondary"
                  type="submit"
                  className={`text-uppercase ${
                    windowObj && windowSize.width <= 767
                      ? "btn-block"
                      : "btn-lg"
                  }`}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default CreatecompanyAccount;
