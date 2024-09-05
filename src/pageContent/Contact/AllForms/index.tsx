import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "graphql-hooks";
import useWindowDimensions from "@Hooks/windowDimention";
import { LoadingIndicator } from "@Components/Utilities";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import SUBMIT_WEB_FORM from "@Graphql/queries/postWebFormDetails.graphql";
import { AuthContext } from "@Contexts/AuthContext";
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from "@Hooks/addDeleteDynamicScript";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";
import ContactBanner from "@Components/Contact/ContactBanner";
import EmailSubscription from "@Components/EmailSubscription";
import HTMLContent from "@Components/Utilities/HTMLContent";
import BreadCrumbs from "@Components/BreadCrumbs/BreadCrumbs";

const General = ({ breadcrumb = true }) => {
  // AllForms details
  const allFormsArr = [
    {
      formName: "Accuride Sales",
      formId: process.env.NEXT_PUBLIC_ACCURIDE_SALES_FORMID,
    },
    {
      formName: "Senseon Sales",
      formId: process.env.NEXT_PUBLIC_SENSEON_SALES_FORMID,
    },
    {
      formName: "Customer Service",
      formId: process.env.NEXT_PUBLIC_CUSTOMER_SERVICE_FORMID,
    },
  ];
  const windowSize = useWindowDimensions();
  const router = useRouter();
  const [windowObj, updateWindowObj] = useState(false);
  const { notify, decode } = useContext(AuthContext);
  const urlFormId = router.query.id ? decode(router.query.id) : null;
  const [tellNo, setTellNo] = useState(false);
  const [navControl, setState] = useState({ navExpanded: false });
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const [getFormId, setGetFormId] = useState(urlFormId || 0);
  const [formLoadId, setFormLoadId] = useState(allFormsArr[0].formId);
  const [formLoader, setFormLoader] = useState(true);
  const [dataWebForm, setDataWebForm] = useState(null);
  const [webFormDescription, setWebFormDescription] = useState("");
  const [allDataWebForm, setAllDataWebForm] = useState({});
  const [savedFieldValue, setSavedFieldValue] = useState({});
  const [cfToken, setCfToken] = useState(null);
  const [ifFormDisabled, setIfFormDisabled] = useState(true);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  let actonData = null;

  useEffect(() => {
    if (Number(getFormId) === 0) {
      setIfFormDisabled(true);
    }
    if (!cfToken) {
      setIfFormDisabled(true);
    }
    if (Number(getFormId) > 0 && cfToken) {
      setIfFormDisabled(false);
    }
  }, [getFormId, cfToken]);

  let targetObj = false;
  let count = 0;
  /**
   * for form requird filed stuck under header.
   * with out form required field not fillup submit then scroll and focus
   * the first required field but the field overlap with header.
   * Resolved the issue with this function.
   * implemnt on header to work globally for all form.
   * @param {*} e.
   */
  let lastScrollTop = 0;
  const focusHandle = () => {
    const st = window.scrollY;
    if (st >= lastScrollTop) {
      count += 1;
      if (targetObj && count > 1) {
        targetObj.blur();
      }
    }
    lastScrollTop = st;
  };
  /** breadcrumbs start */
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("#")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
    ];
  }

  /** remove scroll and mouse down event when mouse down */
  const removeFocusHandle = () => {
    count = 0;
    targetObj.focus();
    targetObj = false;
    window.removeEventListener("mousedown", removeFocusHandle, false);
    window.removeEventListener("scroll", focusHandle, false);
  };

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // API calling for submit form
  const [submitGeneralForm, { loading: loadingFormSubmit }] = useMutation(
    SUBMIT_WEB_FORM.loc.source.body,
    {
      onSuccess: (res) => {
        setSubmitMessage(res.data.submitWebForms.message);
        if (actonData) actOnDataSubmit(actonData);
        setSubmitted(true);
        if (res.data.submitWebForms.redirect_url) {
          setTimeout(() => {
            window.location.href = res.data.submitWebForms.redirect_url;
          }, 1000);
        }
      },
    },
  );

  const filterForm = (event) => {
    const val = event.target.value;
    setGetFormId(val);
    if (allDataWebForm && allDataWebForm[Number(val)]) {
      const formData = allDataWebForm[Number(val)];
      setDataWebForm(formData);
      const webFormFields = formData.getWebForms.webformfields;
      setWebFormFieldsArr(webFormFields);
    }
  };
  const { loading: loadingWebForm, data: getDataWebForm } = useQuery(
    WEB_FORM_DETAILS.loc.source.body,
    {
      variables: { formId: formLoadId },
      refetch: { formId: formLoadId },
    },
  );

  useEffect(() => {
    if (
      getDataWebForm &&
      Object.keys(allDataWebForm).length <= allFormsArr.length
    ) {
      const newArr = allDataWebForm;
      newArr[formLoadId] = getDataWebForm;
      setAllDataWebForm(newArr);
      if (allFormsArr) {
        allFormsArr.map((eachItem, indx) => {
          if (newArr[eachItem.formId] === undefined) {
            setFormLoadId(eachItem.formId);
            if (indx === allFormsArr.length - 1) {
              setTimeout(() => {
                setFormLoader(false);
              }, 800);
            }
          }
          return true;
        });
      }
    }
  }, [getDataWebForm]);

  /** navigation close state handling */
  const closeNav = () => {
    setState({
      ...navControl,
      navExpanded: false,
    });
  };

  /** adjust focus for every form field */
  const adjust = (e) => {
    const reletedTarget = e.relatedTarget ? e.relatedTarget.type : false;
    const parentIsForm = e.target.closest("form");
    if (reletedTarget === "submit" && parentIsForm) {
      setTimeout(() => {
        if (e.target.matches(":focus") && e.target.tagName !== "button") {
          const targetFocusPos = e.target.getBoundingClientRect();
          window.scrollBy({
            top: targetFocusPos.top - 170,
            left: 0,
            behavior: "smooth",
          });
          lastScrollTop = window.scrollY;
          targetObj = e.target;
          window.addEventListener("scroll", focusHandle, {
            passive: true,
          });
          window.addEventListener("mousedown", removeFocusHandle);
        }
      });
    }
  };

  useEffect(() => {
    document.body.addEventListener("focusin", adjust);
    setTellNo(true);
    if (
      webFormFieldsArr.length === 0 &&
      allDataWebForm &&
      Object.keys(allDataWebForm).length >= allFormsArr.length
    ) {
      if (urlFormId) {
        const formData = allDataWebForm[Number(urlFormId)];
        setDataWebForm(formData);
        setWebFormDescription(
          allDataWebForm[Number(allFormsArr[0].formId)].getWebForms.description,
        );
        const webFormFields = formData.getWebForms.webformfields;
        setWebFormFieldsArr(webFormFields);
      } else {
        const formData = allDataWebForm[Number(allFormsArr[0].formId)];
        setDataWebForm(formData);
        setWebFormDescription(formData.getWebForms.description);
        const webFormFields = formData.getWebForms.webformfields;
        setWebFormFieldsArr(webFormFields);
      }
    }
  });

  useEffect(() => {
    if (dataWebForm && webFormFieldsArr.length > 0) {
      addDynamicScriptMin(
        "/static/capture-acquisition-source.js",
        "captureHiddenFields",
      );
    }
    return () => {
      removeDynamicScript("captureHiddenFields");
    };
  });

  // Need to discuss for email address restrict characters
  const inputFields = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  };
  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObjt = e.target;
    if (
      targetObjt.required &&
      targetObjt.value.trim() === "" &&
      (targetObjt.type === "text" || targetObjt.type === "textarea")
    ) {
      targetObjt.value = "";
    }

    if (targetObjt.value === "" && targetObjt.required) {
      targetObjt.classList.add("is-invalid");
    } else if (targetObjt.type === "email" && targetObjt.required) {
      if (inputFields.email.test(targetObjt.value)) {
        targetObjt.classList.remove("is-invalid");
        const newArr = savedFieldValue;
        newArr[targetObjt.getAttribute("actionlabel")] = targetObjt.value;
        setSavedFieldValue(newArr);
      } else targetObjt.classList.add("is-invalid");
    } else if (
      targetObjt.getAttribute("actionlabel") === "firstname" ||
      targetObjt.getAttribute("actionlabel") === "lastname"
    ) {
      targetObjt.value = targetObjt.value.replace(/[^a-zA-Z]+/g, "");
      if (targetObjt.value === "") {
        targetObjt.classList.add("is-invalid");
      } else {
        targetObjt.classList.remove("is-invalid");
        const newArr = savedFieldValue;
        newArr[targetObjt.getAttribute("actionlabel")] = targetObjt.value;
        setSavedFieldValue(newArr);
      }
    } else if (targetObjt.getAttribute("actionlabel") === "phone") {
      const newArr = savedFieldValue;
      targetObjt.value = targetObjt.value.replace(/[^0-9]/g, "");
      newArr[targetObjt.getAttribute("actionlabel")] = targetObjt.value;
      setSavedFieldValue(newArr);
    } else {
      targetObjt.classList.remove("is-invalid");
      const newArr = savedFieldValue;
      if (targetObjt.type === "checkbox" && !targetObjt.required) {
        newArr[targetObjt.getAttribute("actionlabel")] = targetObjt.checked;
      } else {
        newArr[targetObjt.getAttribute("actionlabel")] = targetObjt.value;
      }
      setSavedFieldValue(newArr);
    }
  };

  /**
   * ACTon form data submit
   * @param {*} actionFormData
   */
  const actOnDataSubmit = (actionFormData) => {
    const actOnLink = `${dataWebForm.getWebForms.act_on_url}/${actonData}`;
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
      actonData = null;
    }, 4000);
  };

  /**
   * submit webform
   * @param {*} newFormData
   * @param {*} actionFormData
   */

  const submitWebForm = (newFormData, actionFormData) => {
    const submitFormData = {
      formId: getFormId,
      formData: newFormData,
    };

    submitGeneralForm({
      variables: { formInput: submitFormData },
    }).then(({ error }) => {
      actonData = null;
      setCfTokenCall(cfTokenCall + 1);
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  };

  const createGeneralForm = (event) => {
    event.preventDefault();
    const formObject = event.currentTarget;
    let newFormData = [];
    let actionFormData = `?submitForm_${dataWebForm.getWebForms.webform_id}=1&webform_id=${dataWebForm.getWebForms.webform_id}&form_key=${dataWebForm.getWebForms.form_key}&`;
    for (let i = 0; i < formObject.elements.length; ) {
      let fieldData = {};
      const field = formObject.elements[i];
      const formField = field.name;
      const fieldActionLabel = field.getAttribute("actionlabel");
      const fieldDatainfo = field.getAttribute("datainfo");
      const actonValue = encodeURIComponent(field.value);
      if (fieldActionLabel !== null) {
        if (field.type !== "hidden") {
          if (field.type === "checkbox") {
            fieldData = {
              ...fieldData,
              ...{
                fieldId: formField,
                fieldValue: field.checked,
              },
            };
            newFormData = [...newFormData, fieldData];
            if (fieldActionLabel === "opt-in") {
              actionFormData += `${fieldActionLabel}=${!!field.checked}&`;
            } else {
              actionFormData += `${fieldActionLabel}=${field.checked ? 1 : 0}&`;
            }
          } else if (formField !== "" && formField !== "filepond") {
            fieldData = {
              ...fieldData,
              ...{ fieldId: formField, fieldValue: field.value },
            };
            newFormData = [...newFormData, fieldData];
            actionFormData += `${fieldActionLabel}=${actonValue}&`;
          }
          if (formField !== "" && field.value === "" && field.required) {
            field.classList.add("is-invalid");
          }
          if (formField !== "" && field.value === "" && field.required) {
            field.classList.add("is-invalid");
          }
        } else if (fieldDatainfo)
          actionFormData += `${fieldActionLabel}=${encodeURIComponent(
            fieldDatainfo,
          )}&`;
        else actionFormData += `${fieldActionLabel}=${actonValue}&`;
      } else if (field.type === "hidden" && formField === "cf-token") {
        fieldData = {
          ...fieldData,
          ...{ fieldId: formField, fieldValue: field.value },
        };
        newFormData = [...newFormData, fieldData];
      }
      i += 1;
    }

    if (formObject.checkValidity()) {
      actonData = actionFormData;
      submitWebForm(newFormData, actionFormData);
      setValidated(true);
    } else {
      actonData = null;
    }
    return true;
  };
  return (
    <>
      {breadcrumb && <BreadCrumbs crumbs={crumbs} />}
      <ContactBanner />
      {/* general content start */}
      <section className="acc-contact-information acc-general-contact section-padding">
        <Container>
          <Row>
            {/* content start */}
            {!submitted ? (
              <Col
                md={6}
                className="text-center text-md-left acc-desktop-contact-desc"
              >
                <HTMLContent id="description" content={webFormDescription} />
              </Col>
            ) : null}
            {windowObj && windowSize.width <= 767
              ? tellNo && (
                  <Col
                    md={6}
                    className="pb-3 text-center text-md-left acc-desktop-contact-desc"
                  >
                    <a
                      href="tel:888-491-7112"
                      onClick={closeNav}
                      id="phoneNumber"
                      target="_self"
                      aria-label="link"
                      className="font-weight-bold text-dark"
                    >
                      888-491-7112
                    </a>
                  </Col>
                )
              : null}

            {/* content end */}

            {/* form start */}
            <Col md={submitted ? 12 : 6}>
              {submitted !== true ? (
                <>
                  <Form.Control
                    as="select"
                    name="allForms"
                    id="allForms"
                    required="1"
                    onChange={filterForm}
                    defaultValue={urlFormId}
                    className={Number(getFormId) > 0 ? "" : "font-weight-bold"}
                  >
                    <option value="0">
                      {" "}
                      Select Your Reason For Contacting Us*{" "}
                    </option>
                    {allFormsArr.map((option) => (
                      <option key={option.formId} value={option.formId}>
                        {option.formName}
                      </option>
                    ))}
                    <Form.Control.Feedback type="invalid">
                      Please select a form
                    </Form.Control.Feedback>
                  </Form.Control>
                  {webFormFieldsArr.length > 0 ? (
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={createGeneralForm}
                      className="mt-3 acc-contact-form-sec"
                    >
                      <Form.Row>
                        {webFormFieldsArr.map((item) => (
                          <Form.Group
                            className={
                              item.field_type === "hidden" ? "d-none" : ""
                            }
                            key={item.field_id}
                            as={Col}
                            sm={item.field_width === "wide" ? 12 : 6}
                            md={
                              (item.field_id === "187" ? 12 : "") ||
                              (item.field_id === "110" ? 6 : "") ||
                              (item.field_id === "122" ? 6 : "") ||
                              (item.field_id === "123" ? 6 : "") ||
                              (item.field_id === "125" ? 12 : "") ||
                              (item.field_id === "126" ? 6 : "")
                            }
                            xl={
                              (item.field_id === "187" ? 3 : "") ||
                              (item.field_id === "110" ? 3 : "") ||
                              (item.field_id === "122" ? 6 : "") ||
                              (item.field_id === "123" ? 3 : "") ||
                              (item.field_id === "125" ? 3 : "") ||
                              (item.field_id === "126" ? 6 : "")
                            }
                          >
                            {item.field_type === "hidden" ? (
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
                            ) : null}
                            {item.field_type === "text" ? (
                              <>
                                <Form.Control
                                  required={
                                    item.required === "1" ? "required" : ""
                                  }
                                  type="text"
                                  placeholder={
                                    item.required === "1"
                                      ? `${item.field_hint}*`
                                      : item.field_hint
                                  }
                                  name={item.field_id}
                                  actionlabel={item.field_code}
                                  onBlur={validationFormField}
                                  onKeyUp={validationFormField}
                                  defaultValue={
                                    savedFieldValue[item.field_code] &&
                                    savedFieldValue[item.field_code]
                                  }
                                />
                                {item.validation_advice !== "" ? (
                                  <Form.Control.Feedback type="invalid">
                                    {item.validation_advice}
                                  </Form.Control.Feedback>
                                ) : null}
                              </>
                            ) : null}
                            {item.field_type === "email" ? (
                              <>
                                <Form.Control
                                  required={
                                    item.required === "1" ? "required" : ""
                                  }
                                  type="email"
                                  placeholder={
                                    item.required === "1"
                                      ? `${item.field_hint}*`
                                      : item.field_hint
                                  }
                                  name={item.field_id}
                                  actionlabel={item.field_code}
                                  onBlur={validationFormField}
                                  onKeyUp={validationFormField}
                                  defaultValue={
                                    savedFieldValue[item.field_code] &&
                                    savedFieldValue[item.field_code]
                                  }
                                />
                                {item.validation_advice !== "" ? (
                                  <Form.Control.Feedback type="invalid">
                                    {item.validation_advice}
                                  </Form.Control.Feedback>
                                ) : null}
                              </>
                            ) : null}
                            {item.field_type === "select" ? (
                              <>
                                <Form.Control
                                  required={
                                    item.required === "1" ? "required" : ""
                                  }
                                  as="select"
                                  name={item.field_id}
                                  actionlabel={item.field_code}
                                  onBlur={validationFormField}
                                  onKeyUp={validationFormField}
                                  defaultValue={
                                    savedFieldValue[item.field_code] &&
                                    savedFieldValue[item.field_code]
                                  }
                                >
                                  {item.select_options.map((option) => (
                                    <option
                                      key={option.label}
                                      value={option.value}
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                                </Form.Control>
                                {item.validation_advice !== "" ? (
                                  <Form.Control.Feedback type="invalid">
                                    {item.validation_advice}
                                  </Form.Control.Feedback>
                                ) : null}
                              </>
                            ) : null}
                            {item.field_type === "textarea" ? (
                              <>
                                <Form.Control
                                  required={
                                    item.required === "1" ? "required" : ""
                                  }
                                  placeholder={
                                    item.required === "1"
                                      ? `${item.field_hint}*`
                                      : item.field_hint
                                  }
                                  as="textarea"
                                  rows="5"
                                  name={item.field_id}
                                  actionlabel={item.field_code}
                                  onBlur={validationFormField}
                                  onKeyUp={validationFormField}
                                  defaultValue={
                                    savedFieldValue[item.field_code] &&
                                    savedFieldValue[item.field_code]
                                  }
                                />
                                {item.validation_advice !== "" ? (
                                  <Form.Control.Feedback type="invalid">
                                    {item.validation_advice}
                                  </Form.Control.Feedback>
                                ) : null}
                              </>
                            ) : null}
                            {item.field_type === "select/checkbox" ||
                            item.field_type === "subscribe" ? (
                              <>
                                <Form.Check
                                  custom
                                  type="checkbox"
                                  id="checkUpdate"
                                  label={item.select_options[0].label}
                                  name={item.field_id}
                                  actionlabel={item.field_code}
                                  onBlur={validationFormField}
                                  onKeyUp={validationFormField}
                                  defaultChecked={
                                    savedFieldValue[item.field_code] &&
                                    savedFieldValue[item.field_code]
                                  }
                                />
                                {item.validation_advice !== "" ? (
                                  <Form.Control.Feedback type="invalid">
                                    {item.validation_advice}
                                  </Form.Control.Feedback>
                                ) : null}
                              </>
                            ) : null}
                          </Form.Group>
                        ))}
                      </Form.Row>
                      <input type="hidden" name="cf-token" value={cfToken} />
                      <div className="pb-3">
                        <CloudflareTurnstile
                          setCfToken={setCfToken}
                          cfTokenCall={cfTokenCall}
                          formName="Contact Page Form"
                        />
                      </div>
                      <Button
                        variant={
                          Number(getFormId) === 0
                            ? "medium"
                            : [!cfToken ? "medium" : "primary"]
                        }
                        disabled={ifFormDisabled}
                        block={!(windowObj && windowSize.width > 1024)}
                        type="submit"
                        className="text-uppercase"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : null}
                </>
              ) : (
                <>
                  <Alert className="pb-0 pt-3" variant="success">
                    <HTMLContent content={submitMessage} />
                  </Alert>
                </>
              )}
              {windowObj && windowSize.width <= 767 ? (
                <div className="acc-responsive-contact-desc text-center pt-4">
                  <HTMLContent id="description" content={webFormDescription} />
                </div>
              ) : null}
            </Col>
            {/* form end */}
          </Row>
        </Container>
      </section>
      {/* general content end */}
      <EmailSubscription />
      {loadingFormSubmit ||
      formLoader ||
      (!formLoader && loadingWebForm) ? (
        <LoadingIndicator />
      ) : (
        ""
      )}
    </>
  );
};

export default General;
