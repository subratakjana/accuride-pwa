import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useManualQuery, useMutation } from "graphql-hooks";
import { LoadingIndicator } from "@Components/Utilities";
import { isBrowser } from "react-device-detect";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import SEND_NEWSLETTER_SUBSCRIPTION from "@Graphql/queries/postNewsletterSubscription.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import { LazyLoadImage } from "react-lazy-load-image-component";
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from "@Hooks/addDeleteDynamicScript";
import Image from "next/legacy/image";
import CloudflareTurnstile from '@Components/Utilities/CloudflareTurnstile';

const EmailSubscription = (/** @type {{ productLogos: any[]; }} */ props) => {
  const { notify, loadWebFormEmail, setLoadWebFormEmail } =
    useContext(AuthContext);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [validated, setValidated] = useState(false);
  const [webFormFields, setWebFormFields] = useState([]);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const formId = process.env.NEXT_PUBLIC_EMAIL_SUBSCRIPTION_FORMID;
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const [ifButtonActive, setIfButtonActive] = useState(false);
  const [ifCaptchaVisible, setIfCaptchaVisible] = useState(false);
  const [csrfToken, setCsrfToken] = useState(false);
  // Need to discuss for email address restrict characters
  const inputFields = {
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/,
  };
  // const [newsletterSubscription] = useMutation(
  //   SEND_NEWSLETTER_SUBSCRIPTION.loc.source.body,
  // );
  let actonData = null;
  const [newsletterSubscription] = useMutation(SEND_NEWSLETTER_SUBSCRIPTION.loc.source.body, {
      onSuccess: (data) => {
          if (document.getElementById('js_email_subs')) {
              document.getElementById('js_email_subs').value = '';
          }
          setIfButtonActive(false);
          setIfCaptchaVisible(false);
          setSubscriberEmail('');
          const response = data.data;
          if (response) {
              if (response.newsletterSubscription.message.success !== null) {
                  if (actonData) actOnDataSubmit(actonData);
                  notify(response.newsletterSubscription.message.success, 'success');
              }
              if (response.newsletterSubscription.message.notice !== null) {
                  notify(response.newsletterSubscription.message.notice, 'error');
              }
              if (response.newsletterSubscription.message.error !== null) {
                  notify(response.newsletterSubscription.message.error, 'error');
              }
          }
      },
  });
  useEffect(() => {
    if (inputFields.email.test(subscriberEmail)) {
        setIfCaptchaVisible(true);
    }
    if (inputFields.email.test(subscriberEmail) && cfToken) {
        setIfButtonActive(false);
    } else {
        setIfButtonActive(true);
    }
}, [inputFields, subscriberEmail, cfToken, ifCaptchaVisible]);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // API calling for newsletter subscription method
  
  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    if (targetObj.type === "email" && targetObj.required) {
      if (inputFields.email.test(targetObj.value)) {
        targetObj.classList.remove("is-invalid");
        setValidated(true);
      } else {
        targetObj.classList.add("is-invalid");
        setValidated(false);
      }
    } else {
      targetObj.classList.remove("is-invalid");
      setValidated(false);
    }
  };

  /**
   * ACTon form data submit
   * @param {*} actionFormData
   */
  const [getWebFormDetail, { loading: loadingWebForm, data: dataWebForm }] =
    useManualQuery(WEB_FORM_DETAILS.loc.source.body, {
      fetchPolicy: "cache-and-network",
      variables: {
        formId,
      },
    });

  useEffect(() => {
    if ((!loadWebFormEmail || !dataWebForm) && !isBrowser) {
      getWebFormDetail();
      setLoadWebFormEmail(true);
    }
  }, []);

  useEffect(() => {
    if (dataWebForm && webFormFieldsArr.length === 0) {
      setCsrfToken(dataWebForm.getWebForms.form_key);
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

  if (loadingWebForm) return null;
  if (dataWebForm && webFormFields.length === 0) {
    setWebFormFields(dataWebForm.getWebForms.webformfields);
  }

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
    newsletterSubscription({
      variables: { email: newFormData },
      formKey: csrfToken,
    }).then(({ error }) => {
      if (document.getElementById('js_email_subs')) {
        document.getElementById('js_email_subs').value = "";
        setIfButtonActive(false);
        setIfCaptchaVisible(false);
      }
      actonData = null;
      setSubscriberEmail('');
      if (error) {
        if ((error.graphQLErrors) && (error.graphQLErrors).length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  };

  // form submition method
  const newsletterSubscriptionForm = (event) => {
    const form = event.currentTarget;
    let actionFormData = `?submitForm_${dataWebForm.getWebForms.webform_id}=1&webform_id=${dataWebForm.getWebForms.webform_id}&form_key=${dataWebForm.getWebForms.form_key}&`;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (
      form.checkValidity() === true &&
      inputFields.email.test(subscriberEmail)
    ) {
      setValidated(true);
      event.preventDefault();
      for (let i = 0; i < form.elements.length; ) {
        const field = form.elements[i];
        const formField = field.name;
        const fieldActionLabel = field.getAttribute("actionlabel");
        const fieldDatainfo = field.getAttribute("datainfo");
        if (field.type !== "hidden") {
          if (formField !== "") {
            actionFormData += `${fieldActionLabel}=${encodeURIComponent(
              field.value,
            )}&`;
          }
          if (formField !== "" && field.value === "" && field.required) {
            field.classList.add("is-invalid");
          }
        } else if (fieldDatainfo) {
          actionFormData += `${fieldActionLabel}=${encodeURIComponent(
            fieldDatainfo,
          )}&`;
        } else {
          actionFormData += `${fieldActionLabel}=${encodeURIComponent(
            field.value,
          )}&`;
        }
        i += 1;
      }
      actonData = actionFormData;
      submitWebForm(subscriberEmail, actionFormData);
    }
  };

  return (
    <>
      {windowObj && windowSize.width <= 1024 && webFormFields.length > 0 ? (
        <section className="acc-email-subscription bg-light section-padding">
          <Container>
            {props.productLogos === undefined ? (
              <div className="text-center mb-3">
                <Image
                  layout="fixed"
                  width={80}
                  height={65}
                  src="/assets/images/rohs.jpg"
                  objectFit="contain"
                />
              </div>
            ) : (
              props.productLogos.map((logoItem) => (
                <div className="text-center mb-3" key={logoItem.logo_url}>
                  <Image
                    layout="fixed"
                    width={80}
                    height={65}
                    src={logoItem.logo_url}
                    alt=""
                    objectFit="contain"
                  />
                </div>
              ))
            )}
            {/* subscription form start */}
            <Form
              noValidate
              validated={validated}
              onSubmit={newsletterSubscriptionForm}
            >
              {webFormFields.map((item, index) => (
                <Form.Group
                  className={item.field_type === "hidden" ? "d-none" : ""}
                  key={item.field_id}
                >
                  {item.field_type === "hidden" ? (
                    <Form.Control
                      type="hidden"
                      name={item.field_id}
                      actionlabel={item.field_code}
                      value={
                        item.field_hidden_value ? item.field_hidden_value : ""
                      }
                    />
                  ) : null}
                  {item.field_type === "email" ? (
                    <Form.Label className="d-block">
                      <Form.Control
                        id="js_email_subs"
                        required={item.required === "1" ? "required" : ""}
                        type="email"
                        placeholder={item.field_hint}
                        name={item.field_id}
                        actionlabel={item.field_code}
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                        onChange={(event) =>
                          setSubscriberEmail(event.target.value)
                        }
                      />
                      {/* {item.validation_advice !== "" ? (
                        <Form.Control.Feedback
                          type="invalid"
                          className="text-left"
                        >
                          This is a required field. Please enter valid email-id.
                        </Form.Control.Feedback>
                      ) : null} */}
                      {(item.validation_advice !== ''
                      && (document.getElementById('js_email_subs') && document.getElementById('js_email_subs').value !== '')) ? (
                      <Form.Control.Feedback type="invalid" className="text-left text-secondary">
                        This is a required field. Please enter valid email-id.
                      </Form.Control.Feedback>
                    ) : null}
                    </Form.Label>
                  ) : null}
                </Form.Group>
              ))}
              <Button variant="primary" disabled={ifButtonActive} block type="submit" className={`text-uppercase ${ifButtonActive ? 'cursorAuto' : null}`}>Subscribe</Button>
              <input type="hidden" name="cf-token" value={cfToken} />
              {ifCaptchaVisible
                && (
                  <div className="pt-3">
                    <CloudflareTurnstile setCfToken={setCfToken} cfTokenCall={cfTokenCall} formName="Email Subscription" />
                  </div>
                )}
              <input type="hidden" name="_csrf" value={csrfToken} />
            </Form>
            {/* subscription form end */}
          </Container>
        </section>
      ) : null}
    </>
  );
};
export default EmailSubscription;
