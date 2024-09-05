import { Row, Col, Container, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { useQuery, useMutation } from "graphql-hooks";
import useWindowDimensions from "@Hooks/windowDimention";
import { LoadingIndicator } from "@Components/Utilities";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import SUBMIT_WEB_FORM from "@Graphql/queries/postWebFormDetails.graphql";
import { AuthContext } from "@Contexts/AuthContext";
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from "@Hooks/addDeleteDynamicScript";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const TELLUS = (props) => {
  const { formId, description, pageName } = props;
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { notify } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  let actonData = null;
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

  // API calling to genarate the form
  let webFormDescription = "";
  let webFormFields = [];
  const { loading: loadingWebForm, data: dataWebForm } = useQuery(WEB_FORM_DETAILS.loc.source.body,
    {variables: {formId}},
  );
  useEffect(() => {
    if (dataWebForm && webFormFieldsArr.length === 0) {
      setWebFormFieldsArr(webFormFields);
    }
    if (webFormFieldsArr.length > 0) {
      addDynamicScriptMin("/static/capture-acquisition-source.js", "captureHiddenFields");
    }
    return () => {
      removeDynamicScript("captureHiddenFields");
    };
  });
  if (loadingWebForm) return <LoadingIndicator />;
  if (dataWebForm) {
    webFormDescription = dataWebForm.getWebForms.description;
    webFormFields = dataWebForm.getWebForms.webformfields;
  }
  if (description) {
    webFormDescription = description;
  }
  // Need to discuss for email address restrict characters
  const inputFields = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  };
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
    if (targetObj.value === "" && targetObj.required) {
      targetObj.classList.add("is-invalid");
    } else if (targetObj.type === "email") {
      if (inputFields.email.test(targetObj.value))
        targetObj.classList.remove("is-invalid");
      else targetObj.classList.add("is-invalid");
    } else if (targetObj.name === "188" || targetObj.name === "189") {
      targetObj.value = targetObj.value.replace(/[^a-zA-Z]+/g, "");
      if (targetObj.value === "") {
        targetObj.classList.add("is-invalid");
      } else {
        targetObj.classList.remove("is-invalid");
      }
    } else if (targetObj.name === "194") {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, "");
    } else {
      targetObj.classList.remove("is-invalid");
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
      formId,
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
      if (field.type !== "hidden") {
        if (field.type === "checkbox") {
          fieldData = {
            ...fieldData,
            ...{ fieldId: formField, fieldValue: field.checked },
          };
          newFormData = [...newFormData, fieldData];
          if (fieldActionLabel === "opt-in") {
            actionFormData += `${fieldActionLabel}=${!!field.checked}&`;
          } else {
            actionFormData += `${fieldActionLabel}=${field.checked ? 1 : 0}&`;
          }
        } else if (formField !== "") {
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
      } else if (field.type === "hidden" && formField === "cf-token") {
        fieldData = {
          ...fieldData,
          ...{ fieldId: formField, fieldValue: field.value },
        };
        newFormData = [...newFormData, fieldData];
      } else if (fieldDatainfo)
        actionFormData += `${fieldActionLabel}=${encodeURIComponent(
          fieldDatainfo,
        )}&`;
      else
        actionFormData += `${fieldActionLabel}=${encodeURIComponent(
          field.value,
        )}&`;
      i += 1;
    }
    if (formObject.checkValidity()) {
      actonData = actionFormData;
      submitWebForm(newFormData, actionFormData);
      setValidated(true);
    } else {
      actonData = null;
    }
  };

  return (
    <>
      {/* general content start */}
      <Container>
        <Row>
          {/* content start */}
          <Col
            md={6}
            className={`section-padding text-center text-md-left ${
              description ? "" : "text-uppercase"
            }`}
          >
            <HTMLContent id="description" content={webFormDescription} />
          </Col>
          {/* content end */}

          {/* form start */}
          <Col md={6} className="bg-light section-padding">
            {submitted !== true ? (
              <>
                {webFormFields.length > 0 ? (
                  <Form
                    noValidate
                    validated={validated}
                    onSubmit={createGeneralForm}
                  >
                    <Form.Row>
                      {webFormFields.map((item) => (
                        <Form.Group
                          className={
                            item.field_type === "hidden" ? "d-none" : ""
                          }
                          key={item.field_id}
                          as={Col}
                          sm={item.field_width === "wide" ? 12 : 6}
                        >
                          {item.field_type === "hidden" ? (
                            <Form.Control
                              type="hidden"
                              name={item.field_id}
                              actionlabel={item.field_code}
                              value={item.field_hidden_value ? item.field_hidden_value : ""}
                            />
                          ) : null}
                          {item.field_type === "text" ? (
                            <>
                              <Form.Control
                                required={item.required === "1" ? "required" : ""}
                                type="text"
                                placeholder={item.field_hint}
                                name={item.field_id}
                                actionlabel={item.field_code}
                                onBlur={validationFormField}
                                onKeyUp={validationFormField}
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
                                required={item.required === "1" ? "required" : ""}
                                type="email"
                                placeholder={item.field_hint}
                                name={item.field_id}
                                actionlabel={item.field_code}
                                onBlur={validationFormField}
                                onKeyUp={validationFormField}
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
                                required={item.required === "1" ? "required" : ""}
                                as="select"
                                name={item.field_id}
                                actionlabel={item.field_code}
                                onBlur={validationFormField}
                                onKeyUp={validationFormField}
                              >
                                {item.select_options.map((option) => (
                                  <option key={option.label} value={option.value}>
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
                                required={item.required === "1" ? "required" : ""}
                                placeholder={item.field_hint}
                                as="textarea"
                                rows="5"
                                name={item.field_id}
                                actionlabel={item.field_code}
                                onBlur={validationFormField}
                                onKeyUp={validationFormField}
                              />
                              {item.validation_advice !== "" ? (
                                <Form.Control.Feedback type="invalid">
                                  {item.validation_advice}
                                </Form.Control.Feedback>
                              ) : null}
                            </>
                          ) : null}
                          {item.field_type === "select/checkbox" ? (
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
                    <div>
                      <CloudflareTurnstile
                        setCfToken={setCfToken}
                        cfTokenCall={cfTokenCall}
                        formName={`${pageName} Form`}
                      />
                    </div>
                    <Button
                      disabled={!cfToken}
                      variant={cfToken ? "secondary" : "medium"}
                      block={!(windowObj && windowSize.width > 1024)}
                      type="submit"
                      className="text-uppercase float-right"
                    >
                      LET US HELP
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
          </Col>
          {/* form end */}
        </Row>
      </Container>
      {/* </section> */}
      {/* general content end */}

      {loadingFormSubmit ? <LoadingIndicator /> : ""}
    </>
  );
};

export default TELLUS;
