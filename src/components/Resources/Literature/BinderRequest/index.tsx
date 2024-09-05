import {
  Row,
  Col,
  Container,
  Form,
  Button,
  Alert,
  Accordion,
  Card,
} from "react-bootstrap";
import React, { useState, useEffect, useContext } from "react";
import { useAccordionToggle } from "react-bootstrap/AccordionToggle";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useQuery, useMutation } from "graphql-hooks";
import useWindowDimensions from "@Hooks/windowDimention";
import { LoadingIndicator } from "@Components/Utilities";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import SUBMIT_WEB_FORM from "@Graphql/queries/postWebFormDetails.graphql";
import { AuthContext } from "@Contexts/AuthContext";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from "@Hooks/addDeleteDynamicScript";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const BinderRequest = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { notify } = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [validated, setValidated] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const formId = process.env.NEXT_PUBLIC_BIND_REQUEST_FORMID;
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  let actonData = null;

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
  const newWebFormFields = [];
  const { loading: loadingWebForm, data: dataWebForm } = useQuery(
    WEB_FORM_DETAILS.loc.source.body,
    {
      variables: {
        formId,
      },
    },
  );
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
  if (loadingWebForm) return <LoadingIndicator />;
  if (dataWebForm) {
    webFormDescription = dataWebForm.getWebForms.description;
    webFormFields = dataWebForm.getWebForms.webformfields;
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
    } else if (targetObj.name === "166" || targetObj.name === "167") {
      targetObj.value = targetObj.value.replace(/[^a-zA-Z]+/g, "");
      if (targetObj.value === "") {
        targetObj.classList.add("is-invalid");
      } else {
        targetObj.classList.remove("is-invalid");
      }
    } else if (targetObj.name === "171") {
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

  const ContextAwareToggle = ({ children, eventKey, callback }) => {
    const currentEventKey = useContext(AccordionContext);
    const decoratedOnClick = useAccordionToggle(
      eventKey,
      () => callback && callback(eventKey),
    );
    const isCurrentEventKey = currentEventKey === eventKey;
    return (
      <>
        <Accordion.Toggle
          id="binder-form"
          onClick={decoratedOnClick}
          as={Card.Header}
          variant="link"
          className="p-0 position-relative"
        >
          <h4 className="m-0 pr-5 text-uppercase">{children}</h4>
          {isCurrentEventKey ? (
            <BsChevronUp className="position-absolute top right acc-accordian-arrow" />
          ) : (
            <BsChevronDown className="position-absolute top right acc-accordian-arrow" />
          )}
        </Accordion.Toggle>
      </>
    );
  };
  if (webFormFields.length > 0) {
    webFormFields[0].field_width = "6";
    newWebFormFields.push(webFormFields[0]);

    webFormFields[8].field_width = "6";
    newWebFormFields.push(webFormFields[8]);

    newWebFormFields.push({
      field_type: "description",
      content: webFormDescription,
      field_width: "6",
    });

    webFormFields[9].field_width = "6";
    newWebFormFields.push(webFormFields[9]);

    webFormFields[1].field_width = "3";
    newWebFormFields.push(webFormFields[1]);

    webFormFields[2].field_width = "3";
    newWebFormFields.push(webFormFields[2]);

    webFormFields[10].field_width = "6";
    newWebFormFields.push(webFormFields[10]);

    webFormFields[3].field_width = "3";
    newWebFormFields.push(webFormFields[3]);

    webFormFields[4].field_width = "3";
    newWebFormFields.push(webFormFields[4]);

    webFormFields[11].field_width = "6";
    newWebFormFields.push(webFormFields[11]);

    webFormFields[5].field_width = "3";
    newWebFormFields.push(webFormFields[5]);

    webFormFields[6].field_width = "3";
    newWebFormFields.push(webFormFields[6]);

    webFormFields[12].field_width = "3";
    newWebFormFields.push(webFormFields[12]);

    webFormFields[15].field_width = "3";
    newWebFormFields.push(webFormFields[15]);

    webFormFields[7].field_width = "6";
    newWebFormFields.push(webFormFields[7]);

    webFormFields[16].field_width = "3";
    newWebFormFields.push(webFormFields[16]);

    webFormFields[17].field_width = "3";
    newWebFormFields.push(webFormFields[17]);

    webFormFields[18].field_width = "12";
    newWebFormFields.push(webFormFields[18]);

    newWebFormFields.push(webFormFields[13]);
    newWebFormFields.push(webFormFields[14]);
    newWebFormFields.push(webFormFields[19]);
    newWebFormFields.push(webFormFields[20]);
    newWebFormFields.push(webFormFields[21]);
    newWebFormFields.push(webFormFields[22]);
    newWebFormFields.push(webFormFields[23]);
    newWebFormFields.push(webFormFields[24]);
    newWebFormFields.push(webFormFields[25]);
    newWebFormFields.push(webFormFields[26]);
    newWebFormFields.push(webFormFields[27]);
    newWebFormFields.push(webFormFields[28]);
    newWebFormFields.push(webFormFields[29]);
    newWebFormFields.push(webFormFields[30]);
  }
  return (
    <>
      {/* general content start */}
      <section className="acc-contact-information acc-general-contact section-padding">
        <Container>
          <Accordion className="acc-cms-custom-accordion">
            <Card className="mb-4">
              <Card.Header className="p-0">
                <ContextAwareToggle eventKey="0">
                  BINDER REQUEST
                </ContextAwareToggle>
              </Card.Header>
              {/* form start */}
              <Accordion.Collapse
                eventKey="0"
                className="bg-light acc-card-content p-lg-5 p-3"
              >
                <Row>
                  {/* form start */}
                  <Col md={12}>
                    {submitted !== true ? (
                      <>
                        {newWebFormFields.length > 0 ? (
                          <Form
                            noValidate
                            validated={validated}
                            onSubmit={createGeneralForm}
                          >
                            <Form.Row>
                              {newWebFormFields.map((item) => (
                                <Form.Group
                                  className={
                                    item.field_type === "hidden" ? "d-none" : ""
                                  }
                                  key={`br_${item.field_id}`}
                                  as={Col}
                                  sm={item.field_width}
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
                                          item.required === "1"
                                            ? "required"
                                            : ""
                                        }
                                        type="text"
                                        id={item.field_hint
                                          .replace(" ", "-")
                                          .toLowerCase()}
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
                                        required={
                                          item.required === "1"
                                            ? "required"
                                            : ""
                                        }
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
                                  {item.field_type === "select" &&
                                  item.field_hint !== "State/Province" ? (
                                    <>
                                      <Form.Control
                                        required={
                                          item.required === "1"
                                            ? "required"
                                            : ""
                                        }
                                        as="select"
                                        name={item.field_id}
                                        actionlabel={item.field_code}
                                        onBlur={validationFormField}
                                        onKeyUp={validationFormField}
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
                                  {item.field_type === "description" ? (
                                    <>
                                      <HTMLContent
                                        id="description"
                                        content={item.content}
                                      />
                                    </>
                                  ) : null}
                                  {item.field_type === "textarea" ? (
                                    <>
                                      <Form.Control
                                        required={
                                          item.required === "1"
                                            ? "required"
                                            : ""
                                        }
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
                                  {item.field_type === "subscribe" ? (
                                    <>
                                      <Form.Check
                                        custom
                                        type="checkbox"
                                        id="checkUpdate"
                                        label={item.field_hint}
                                        name={item.field_id}
                                        actionlabel={item.field_code}
                                        onBlur={validationFormField}
                                        onKeyUp={validationFormField}
                                      />
                                      {item.validation_advice !== "" ? (
                                        <Form.Control.Feedback>
                                          {item.validation_advice}
                                        </Form.Control.Feedback>
                                      ) : null}
                                    </>
                                  ) : null}
                                </Form.Group>
                              ))}
                            </Form.Row>
                            <input
                              type="hidden"
                              name="cf-token"
                              value={cfToken}
                            />
                            <div>
                              <CloudflareTurnstile
                                setCfToken={setCfToken}
                                cfTokenCall={cfTokenCall}
                                formName="Literature Binder Request Form"
                              />
                            </div>
                            <Button
                              disabled={!cfToken}
                              variant={cfToken ? "primary" : "medium"}
                              block={!(windowObj && windowSize.width > 1024)}
                              type="submit"
                              className="text-uppercase float-right"
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
                  </Col>
                  {/* form end */}
                </Row>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </Container>
      </section>
      {/* general content end */}
      {loadingFormSubmit ? <LoadingIndicator /> : ""}
    </>
  );
};

export default BinderRequest;
