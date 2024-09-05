import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useManualQuery, useMutation } from "graphql-hooks";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import SEND_NEWSLETTER_SUBSCRIPTION from "@Graphql/queries/postNewsletterSubscriptionFooter.graphql";
import { IoIosMail } from "react-icons/io";
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from "@Hooks/addDeleteDynamicScript";
import CloudflareTurnstile from '@Components/Utilities/CloudflareTurnstile';


const EmailSubscriptionFooter = ({ hasClick }) => {
  const { notify, loadWebFormEmail, setLoadWebFormEmail } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [webFormFields, setWebFormFields] = useState([]);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const formId = process.env.NEXT_PUBLIC_EMAIL_SUBSCRIPTION_FOOTER_FORMID;
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const [csrfToken, setCsrfToken] = useState(false);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const [ifButtonActive, setIfButtonActive] = useState(false);
  const [ifCaptchaVisible, setIfCaptchaVisible] = useState(false);
  const [isEmailInputFocused, setIsEmailInputFocused] = useState(false)

  let actonData = null;
  // API calling for newsletter subscription method
  // Need to discuss for email address restrict characters
  const inputFields = { email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/ };
  useEffect(() => {
    if (hasClick && document.getElementById('js_email_subs')) {
      document.getElementById('js_email_subs').focus();
    }
  }, [hasClick]);

  const [newsletterSubscription] = useMutation(SEND_NEWSLETTER_SUBSCRIPTION.loc.source.body, {
    onSuccess: (data) => {
      if (document.getElementById('js_email_subs')) {
        document.getElementById('js_email_subs').value = "";
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

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    setIsEmailInputFocused(false);
    const targetObj = e.target;
    if (targetObj.value.trim() !== '') {
      if (targetObj.type === 'email' && targetObj.required) {
        if (inputFields.email.test(targetObj.value)) {
          targetObj.classList.remove('is-invalid');
          setValidated(true);
        } else {
          targetObj.classList.add('is-invalid');
          setValidated(false);
        }
      } else {
        targetObj.classList.remove('is-invalid');
        setValidated(true);
      }
    } else {
      setValidated(false);
    }
  };
  /**
   * ACTon form data submit
   * @param {*} actionFormData
   */
  const [getWebFormDetail, { loading: loadingWebForm, data: dataWebForm }] =
    useManualQuery(WEB_FORM_DETAILS.loc.source.body, {
      variables: { formId },
    });

  useEffect(() => {
    if (!loadWebFormEmail || !dataWebForm) {
      getWebFormDetail();
      setLoadWebFormEmail(true);
    }
  }, []);

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

  if (dataWebForm && webFormFields.length === 0) {
    setCsrfToken(dataWebForm.getWebForms.form_key);
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
      variables: {
        email: newFormData,
        formKey: csrfToken,
      },
      operationName: { headers: [{ headerName: 'cf-token', headerValue: cfToken }] },
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
    // checking validation for false
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // checking validation for true
    if (
      form.checkValidity() === true &&
      inputFields.email.test(subscriberEmail)
    ) {
      setValidated(true);
      event.preventDefault();
      // variables set for API call
      for (let i = 0; i < form.elements.length;) {
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
      actonData = actionFormData;
      submitWebForm(subscriberEmail, actionFormData);
    }
  };

  return (
    <>
      {/* subscription form start */}

      <>
        {webFormFields.length > 0 ? (
          <Form
            noValidate
            validated={validated}
            onSubmit={newsletterSubscriptionForm}
            className="acc-email-footer"
          >
            {webFormFields.map((item, index) => (
              <Form.Group className={item.field_type === "hidden" ? "d-none" : "mb-4"} key={item.field_id}>
                {item.field_type === "hidden" ? (
                  <Form.Control
                    type="hidden"
                    name={item.field_id}
                    actionlabel={item.field_code}
                    value={item.field_hidden_value ? item.field_hidden_value : ""}
                  />
                ) : null}
                {item.field_type === "email" ? (
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text className={`text-white bg-transparent ${isEmailInputFocused ? 'border-yellow' : 'border-white'} border-right-0 font-size-lg py-1`}><IoIosMail /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      id="js_email_subs"
                      className={`bg-dark ${isEmailInputFocused ? 'border-yellow' : 'border-white'} border-left-0 border-right-0 text-white`}
                      required={item.required === '1' ? 'required' : ''}
                      type="email"
                      placeholder={item.field_hint}
                      name={item.field_id}
                      actionlabel={item.field_code}
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      onChange={(event) => setSubscriberEmail(event.target.value)}
                      onFocus={() => setIsEmailInputFocused(true)}
                    />
                    {index === 0 ? (
                      <InputGroup.Append>
                        <Button variant="primary" disabled={ifButtonActive} block type="submit" className={`text-uppercase ${ifButtonActive ? 'cursorAuto' : null}`}>Subscribe</Button>
                      </InputGroup.Append>
                    ) : ''}
                    {(item.validation_advice !== ''
                      && (document.getElementById('js_email_subs') && document.getElementById('js_email_subs').value !== '')) ? (
                      <Form.Control.Feedback type="invalid" className="text-left text-secondary">
                        This is a required field. Please enter valid email-id.
                      </Form.Control.Feedback>
                    ) : null}
                  </InputGroup>
                ) : null}
              </Form.Group>
            ))}
            <input type="hidden" name="cf-token" value={cfToken} />
            {ifCaptchaVisible
              && (
                <div className="pb-3">
                  <CloudflareTurnstile setCfToken={setCfToken} cfTokenCall={cfTokenCall} formName="Email Subscription Footer" />
                </div>
              )}
            <input type="hidden" name="_csrf" value={csrfToken} />
          </Form>
        ) : null}
      </>
    </>
  );
};
export default EmailSubscriptionFooter;
