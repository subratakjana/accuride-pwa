import { Container, Row, Col, Form, Button } from "react-bootstrap";
import GET_JOBTITLE_LIST from "@Graphql/queries/getJobTitleList.graphql";
import UPDATE_CUSTOMER_ACCOUNT from "@Graphql/queries/updateCustomer.graphql";
import { useMutation, useQuery } from "graphql-hooks";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { LoadingIndicator } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const ChangeInfo = dynamic(
  () => import("@Components/Customer/Account/Edit/ChangeInfo"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Edit = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [editAcconutObj, setAccountEvent] = useState({});
  const [selectJobTitle, setSelectJobTitle] = useState();

  let customerAccountData = "";
  const router = useRouter();
  const formId = process.env.NEXT_PUBLIC_EDIT_ACCOUNT_FORMID;
  const {
    isAuthUser,
    notify,
    goToLogin,
    loggedCustomerData,
    getCustomerDetailsFn,
  } = useContext(AuthContext);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

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

  // breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  let crumbs = [];
  if (pathSegments[pathSegments.length - 1].includes("?")) {
    let isChangePass = pathSegments[pathSegments.length - 1].split("?")[1];
    if (isChangePass === "changepas") {
      crumbs = [
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
          name: "Change Password",
        },
      ];
    }
  }
  if (
    pathSegments[pathSegments.length - 1].includes("?") === false &&
    pathSegments[pathSegments.length - 1].includes("#") === false
  ) {
    crumbs = [
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
        name: "Edit Account",
      },
    ];
  }
  useEffect(() => {
    isAuthUser();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  /**
   * on change Job Title list
   * check if other open other field
   */
  const onChangeJobTitle = (e) => {
    const currentValuejob = e.target.value;
    setSelectJobTitle(currentValuejob);
  };

  /** job type details */
  const { loading: JobTitle, data: jobTitleList } = useQuery(
    GET_JOBTITLE_LIST.loc.source.body,
  );
  useEffect(() => {
    if (loggedCustomerData) {
      const customerData = loggedCustomerData && loggedCustomerData.customer;
      setSelectJobTitle(
        customerData.jobType === "0" ? "6" : customerData.jobType,
      );
    }
  }, [loggedCustomerData]);

  const jobTitleListdata = jobTitleList && jobTitleList.jobTitle;

  /** subscription webform details */
  const { data: dataWebForm } = useQuery(WEB_FORM_DETAILS.loc.source.body, {
    variables: {
      formId,
    },
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
   * submit newsletter action data
   */
  const submitActonNewsletter = (newFormData) => {
    let actionFormData = "?";
    actionFormData += `email=${encodeURIComponent(
      newFormData?.email || editAcconutObj?.customerAccountData?.email,
    )}&`;
    dataWebForm.getWebForms.webformfields.map((item) => {
      if (item.field_type === "hidden") {
        actionFormData += `${item.field_code}=${encodeURIComponent(
          item.field_hidden_value,
        )}&`;
      }
      return item;
    });
    actOnDataSubmit(actionFormData);
  };

  /**
   * update customer query declare
   */
  const [
    updateCustomerAccount,
    { loading: LoadCustomer, data: updateCustomerData },
  ] = useMutation(UPDATE_CUSTOMER_ACCOUNT.loc.source.body, {
    onSuccess: (res) => {
      if (res) {
        getCustomerDetailsFn();
      }
      goToLogin();
    },
  });

  // for validation
  const [validated, setValidated] = useState(false);

  /**
   * on change edit account mode
   */
  const onchangeEdit = () => {
    const email = document.querySelector("input[check_name='isEmail']").checked;
    const password = document.querySelector(
      "input[check_name='isPassword']",
    ).checked;
    let editMode = "";
    if (email) editMode = "email";
    if (password) editMode = "password";
    if (email && password) editMode = "booth";
    setAccountEvent({
      ...editAcconutObj,
      editMode,
      customerAccountData,
    });
  };

  /** check router query change password default open change password section */
  useEffect(() => {
    if ("changepas" in router.query) {
      setAccountEvent({
        ...editAcconutObj,
        editMode: "password",
      });
    }
  }, []);

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
    const passwordFiled = document.querySelector("input[name='password']");
    const password = passwordFiled ? passwordFiled.value : "";
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else if (targetObj.name === "password") {
      targetObj.value = targetObj.value.replace(/ /g, "");
      passwordRegex.test(password)
        ? targetObj.classList.remove("is-invalid")
        : targetObj.classList.add("is-invalid");
    } else if (targetObj.name === "confirmPassword" && targetObj.value !== "") {
      const confirmPass = targetObj.value;
      if (password !== confirmPass) {
        targetObj.classList.add("is-invalid");
      } else {
        targetObj.classList.remove("is-invalid");
      }
    } else if (targetObj.name === "currentPassword" && targetObj.value !== "") {
      targetObj.value = targetObj.value.replace(/ /g, "");
      targetObj.classList.remove("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
  };

  /**
   * edit account form graphql query call.
   * @param {*} newFormData
   */
  const runEditAccountQuery = (newFormData) => {
    const formVariable = {
      firstname: newFormData.firstname,
      lastname: newFormData.lastname,
      is_subscribed: JSON.parse(newFormData.is_subscribed),
      jobType: newFormData.jobType,
      jobTitle: Number(newFormData.jobType) === 6 ? newFormData.jobTitle : "",
    };
    if (newFormData.password) {
      formVariable.updatePassword = {
        currentPassword: newFormData.currentPassword,
        newPassword: newFormData.password,
      };
    }
    if (newFormData.email) {
      formVariable.updateEmail = {
        email: newFormData.email,
        currentPassword: newFormData.currentPassword,
      };
    }
    setValidated(true);
    updateCustomerAccount({
      variables: {
        customerInput: formVariable,
      },
    })
      .then(({ error }) => {
        if (error) throw error;
        notify("Your account successfully updated...", "success");
        if (newFormData.is_subscribed) {
          submitActonNewsletter(newFormData);
        }
      })
      .catch(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          if (graphQLErrors.length > 0)
            notify(graphQLErrors[0].message, "error");
        } else if (networkError) {
          notify("Please check your network connection!", "error");
        }
      });
  };

  /**
   * edit account form validation and ready form data.
   * @param {*} event
   */
  const editAccountForm = (event) => {
    event.preventDefault();
    const accountForm = event.currentTarget;
    let newFormData = {};
    for (let i = 0; i < accountForm.elements.length; ) {
      const field = accountForm.elements[i];
      const formField = field.name;
      if (formField !== "") {
        newFormData = { ...newFormData, [formField]: field.value };
      }
      i += 1;
    }
    if (newFormData.password) {
      const confirmPassword = document.querySelector(
        "input[name='confirmPassword']",
      ).value;
      if (
        newFormData.password.length >= 7 &&
        newFormData.password === confirmPassword &&
        passwordRegex.test(newFormData.password)
      ) {
        setValidated(true);
        runEditAccountQuery(newFormData);
      } else {
        notify("Password is not match or invalid format.", "error");
      }
    } else {
      setValidated(true);
      runEditAccountQuery(newFormData);
    }
  };
  if (!loggedCustomerData || JobTitle) return <LoadingIndicator />;
  customerAccountData = loggedCustomerData && loggedCustomerData.customer;

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
            <header className="mb-3">
              <h1 className="text-uppercase mb-0">Edit Account Information</h1>
            </header>

            <section>
              <header
                className={`mb-3 pb-xl-2 border-medium ${
                  windowObj && windowSize.width > 1024 ? "border-bottom" : ""
                }`}
              >
                <h2 className="text-uppercase mb-0">Account Information</h2>
              </header>
              <Form
                name="editAccount"
                validated={validated}
                onSubmit={editAccountForm}
              >
                <Form.Row>
                  {/* first name */}
                  <Form.Group as={Col} sm={6}>
                    <Form.Label>
                      First Name
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="firstname"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      defaultValue={customerAccountData.firstname}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* last name */}
                  <Form.Group as={Col} sm={6}>
                    <Form.Label>
                      Last Name
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      required
                      name="lastname"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      defaultValue={customerAccountData.lastname}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* change email */}
                  <Form.Group as={Col} sm={6}>
                    <Form.Check
                      type="checkbox"
                      custom
                      label="Change Email"
                      id="changeEmail"
                      check_name="isEmail"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      onChange={() => onchangeEdit()}
                      defaultChecked={
                        editAcconutObj.editMode === "email" ||
                        editAcconutObj.editMode === "booth"
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* change password */}
                  <Form.Group as={Col} sm={6}>
                    <Form.Check
                      type="checkbox"
                      custom
                      label="Change Password"
                      id="changePassword"
                      check_name="isPassword"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      onChange={() => onchangeEdit()}
                      defaultChecked={
                        editAcconutObj.editMode === "password" ||
                        editAcconutObj.editMode === "booth"
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>

                <ChangeInfo
                  validationFormField={validationFormField}
                  editMode={editAcconutObj}
                />

                <Form.Row>
                  {/* job title */}
                  <Form.Group as={Col} md={4} sm={6}>
                    <Form.Label>
                      Job Title
                      <span className="text-danger"> *</span>
                    </Form.Label>
                    <Form.Control
                      name="jobType"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      onChange={onChangeJobTitle}
                      as="select"
                      required
                      defaultValue={
                        customerAccountData
                          ? [
                              customerAccountData.jobType === "0"
                                ? "6"
                                : customerAccountData.jobType,
                            ]
                          : ""
                      }
                    >
                      {jobTitleListdata &&
                        jobTitleListdata.map((jobTitle) => (
                          <option key={jobTitle.value} value={jobTitle.value}>
                            {jobTitle.label}
                          </option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                  {/* subscribe for newsletter */}
                  <Form.Group as={Col} md={4}>
                    <Form.Label>Subscribe For Newsletter</Form.Label>
                    <Form.Control
                      as="select"
                      name="is_subscribed"
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      defaultValue={customerAccountData.is_subscribed}
                    >
                      <option value>Yes</option>
                      <option value={false}>No</option>
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* company */}
                  <Form.Group as={Col} md={4} sm={6}>
                    <Form.Label>Company</Form.Label>
                    <Form.Control
                      type="text"
                      readOnly
                      defaultValue={customerAccountData.company}
                    />
                    <Form.Control.Feedback type="invalid">
                      This is a required field.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  {selectJobTitle === "6" ? (
                    <Form.Group as={Col} md={4} sm={6}>
                      <Form.Control
                        name="jobTitle"
                        type="text"
                        required
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        defaultValue={
                          customerAccountData
                            ? customerAccountData.jobTitle
                            : ""
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        This is a required field.
                      </Form.Control.Feedback>
                    </Form.Group>
                  ) : (
                    ""
                  )}
                </Form.Row>
                <Button
                  variant="secondary"
                  type="submit"
                  className={`text-uppercase ${
                    windowObj && windowSize.width < 768 ? "btn-block" : "btn-lg"
                  }`}
                >
                  Save
                </Button>
              </Form>
            </section>
          </Col>
          {/* account content end */}
        </Row>
      </Container>

      <EmailSubscription />
      {LoadCustomer && !updateCustomerData ? <LoadingIndicator /> : ""}
    </>
  );
};

export default Edit;
