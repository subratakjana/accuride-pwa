/**
 * Apply for quote modal-pmondal70-29-01-21
 */
import { I18nLink, LoadingIndicator } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';
import { useMutation, useQuery } from 'graphql-hooks';
import React, { useContext, useEffect, useState } from 'react';
import CloudflareTurnstile from '@Components/Utilities/CloudflareTurnstile';
import WEB_FORM_DETAILS from '@Graphql/queries/getWebFormDetails.graphql';
import SUBMIT_WEB_FORM from '@Graphql/queries/postWebFormDetails.graphql';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import {
  addDynamicScriptMin,
  removeDynamicScript,
} from '@Hooks/addDeleteDynamicScript';
import { AuthContext } from '@Contexts/AuthContext';
import { ReactSVG } from 'react-svg';
import styles from './ProductQuoteModal.module.scss';

const ProductQuoteModal = (props) => {
  const { willOpenModal, isCloseModal, data, activeVarients, selectedSku } =
    props;
  const formId = process.env.NEXT_PUBLIC_TIERED_PRICING_FORM_ID;
  const [activeQuoteModal, setActiveQuoteModal] = useState(false);
  const [userDetails, setUserDetails] = useState(false);
  const [isSubmitQuote, setIsSubmitQuote] = useState(false);
  const { notify, loggedCustomerData } = useContext(AuthContext);
  const [validated, setValidated] = useState(false);
  const [noValidate, setNoValidate] = useState(true);
  const [webFormFieldsArr, setWebFormFieldsArr] = useState([]);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  let actonData = null;

  const handleClose = () => {
    setActiveQuoteModal(false);
    isCloseModal(false);
  };
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    if (willOpenModal) setActiveQuoteModal(willOpenModal);
  }, [props, willOpenModal]);

  useEffect(() => {
    if (loggedCustomerData) setUserDetails(loggedCustomerData.customer);
  }, [loggedCustomerData]);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    setUserDetails(false);
    // userDetailsAPI();
  }, []);

  // API calling for submit form
  const [submitGeneralForm, { loading: loadingFormSubmit }] = useMutation(
    SUBMIT_WEB_FORM.loc.source.body,
    {
      onSuccess: (res) => {
        if (actonData) {
          actOnDataSubmit(actonData);
        } else {
          setIsSubmitQuote(false);
          notify('Thank you, Your Quote has been successfully submited');
          handleClose();
        }
        if (res.data.submitWebForms.redirect_url) {
          setTimeout(() => {
            window.location.href = res.data.submitWebForms.redirect_url;
          }, 1000);
        }
      },
    }
  );

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    const fieldCode = targetObj.getAttribute('actionlabel');
    if (
      targetObj.required &&
      targetObj.value.trim() === '' &&
      (targetObj.type === 'text' || targetObj.type === 'textarea')
    ) {
      targetObj.value = '';
    }
    if (
      targetObj.value === '' ||
      (fieldCode === 'product-quantity' &&
        Number(targetObj.value) <
          Number(activeVarients.product.price_tier_quote))
    ) {
      targetObj.classList.add('is-invalid');
    } else {
      targetObj.classList.remove('is-invalid');
    }

    if (fieldCode === 'firstname' || fieldCode === 'lastname') {
      targetObj.value = targetObj.value.replace(/[^a-zA-Z]+/g, '');
    }
  };

  /**
   * get hubspot form
   */
  let webFormFields = [];
  const { data: dataWebForm } = useQuery(WEB_FORM_DETAILS.loc.source.body, {
    fetchPolicy: 'cache-and-network',
    variables: { formId },
  });

  useEffect(() => {
    if (dataWebForm && webFormFieldsArr.length === 0) {
      setWebFormFieldsArr(webFormFields);
    }
    if (webFormFieldsArr.length > 0) {
      addDynamicScriptMin(
        '/static/capture-acquisition-source.js',
        'captureHiddenFields'
      );
    }
    return () => {
      removeDynamicScript('captureHiddenFields');
    };
  });

  if (dataWebForm) {
    webFormFields = dataWebForm.getWebForms.webformfields;
  }

  /**
   * ACTon form data submit
   * @param {*} actionFormData
   */
  const actOnDataSubmit = (actionFormData) => {
    const actOnLink = `${dataWebForm.getWebForms.act_on_url}/${actonData}`;
    const actonIframe = document.getElementById('actonIframe');
    if (actonIframe) actonIframe.remove();
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = actOnLink;
    iframe.id = 'actonIframe';
    iframe.title = 'actonIframe';
    document.body.appendChild(iframe);
    setIsSubmitQuote(false);
    notify('Thank you, Your Quote has been successfully submited');
    handleClose();
    setTimeout(() => {
      const isActonIframe = document.getElementById('actonIframe');
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
    const submitFormData = { formId, formData: newFormData };
    submitGeneralForm({
      variables: { formInput: submitFormData },
    }).then(({ error }) => {
      actonData = null;
      setCfTokenCall(cfTokenCall + 1);
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  };

  /** requestQuoteForm form submit handler
   * field type wise ready query object.
   */
  const requestQuoteForm = (event) => {
    event.preventDefault();
    const formObject = event.currentTarget;
    let newFormData = [];
    let actionFormData = `?submitForm_${dataWebForm.getWebForms.webform_id}=1&webform_id=${dataWebForm.getWebForms.webform_id}&form_key=${dataWebForm.getWebForms.form_key}&`;
    for (let i = 0; i < formObject.elements.length; ) {
      let fieldData = {};
      const field = formObject.elements[i];
      const formField = field.name;
      const fieldActionLabel = field.getAttribute('actionlabel');
      const fieldDatainfo = field.getAttribute('datainfo');
      const actonValue = encodeURIComponent(field.value);
      if (field.type !== 'hidden') {
        if (formField !== '') {
          fieldData = {
            ...fieldData,
            ...{ fieldId: formField, fieldValue: field.value },
          };
          newFormData = [...newFormData, fieldData];
          actionFormData += `${fieldActionLabel}=${actonValue}&`;
        }
        if (formField !== '' && field.value === '' && field.required) {
          field.classList.add('is-invalid');
        }
      } else if (field.type === 'hidden' && formField === 'cf-token') {
        fieldData = {
          ...fieldData,
          ...{ fieldId: formField, fieldValue: field.value },
        };
        newFormData = [...newFormData, fieldData];
      } else if (fieldDatainfo)
        actionFormData += `${fieldActionLabel}=${encodeURIComponent(
          fieldDatainfo
        )}&`;
      else
        actionFormData += `${fieldActionLabel}=${encodeURIComponent(
          field.value
        )}&`;
      i += 1;
    }

    if (formObject.checkValidity()) {
      setIsSubmitQuote(true);
      actonData = actionFormData;
      submitWebForm(newFormData, actionFormData);
      setValidated(true);
    } else {
      actonData = null;
      setNoValidate(false);
    }
  };

  /**
   * check is selected handed
   */
  const isSelectHanded = () => {
    let isHanded = false;
    const selectHanded = document.querySelector(
      `[name='configure-${data.configurable_options[1].attribute_code}']`
    );
    if (selectHanded && selectHanded.value !== '') {
      isHanded = true;
    }
    return isHanded;
  };

  /**
   * form set default value
   */
  const setDefaultValue = (item) => {
    switch (item.field_code) {
      case 'product-name':
        return activeVarients && data.__typename === 'GroupedProduct'
          ? activeVarients.product.name
          : data.name;
      case 'product-sku':
        return activeVarients && data.__typename === 'GroupedProduct'
          ? activeVarients.product.sku
          : data.sku;
      case 'firstname':
        return userDetails.firstname;
      case 'lastname':
        return userDetails.lastname;
      case 'email':
        return userDetails.email;
      case 'product-length':
        return activeVarients ? activeVarients.attributes[0].label : '';
      case 'product-handedness':
        return activeVarients && isSelectHanded()
          ? activeVarients.attributes[1].label
          : '';
      default:
        return '';
    }
  };

  /**
   * form set default value
   */
  const setDefaultDisabled = (item) => {
    switch (item.field_code) {
      case 'product-name':
        return true;
      case 'product-sku':
        return true;
      case 'firstname':
        return !!userDetails;
      case 'lastname':
        return !!userDetails;
      case 'email':
        return !!userDetails;
      case 'product-length':
        return true;
      default:
        return '';
    }
  };

  /**
   * check selected length handed item stock quntity and populate option
   */
  const checkCurrentHandedStock = (index) => {
    let isOutOfStock = false;
    if (selectedSku) {
      const valuIndxObj = data.variants.filter(
        (item) => item.product.sku === selectedSku
      )[0];
      const handedArr = data.variants.filter(
        (item) =>
          item.attributes[0].value_index ===
          valuIndxObj.attributes[0].value_index
      );
      if (
        handedArr.length > 0 &&
        handedArr[index].product.stock_status !== 'IN_STOCK'
      ) {
        isOutOfStock = true;
      }
    }
    return isOutOfStock;
  };
  return (
    <>
      <Modal
        show={activeQuoteModal}
        onHide={handleClose}
        centered
        dialogClassName="acc-custom-modal"
        size={windowObj && windowSize.width <= 1024 ? 'xl' : 'md'}
      >
        {/* modal header start */}
        <Modal.Header className="bg-primary">
          <Button
            variant="link"
            className="acc-btn-close"
            onClick={handleClose}
          >
            <ReactSVG
              className={`acc-filter-close ${styles['acc-close-icon']}`}
              src="/assets/images/icons/close.svg"
            />
          </Button>
          <I18nLink href="/">
            <a aria-label="link" className="logo-icon">
              <ReactSVG
                className={`fill-white ${styles['acc-logo-icon']}`}
                src="/assets/images/accuride-logo-icon.svg"
              />
            </a>
          </I18nLink>
        </Modal.Header>
        {/* modal header end */}
        <Modal.Body>
          <h3 className="mb-3 text-uppercase">Request for Quote</h3>
          {webFormFields.length > 0 ? (
            <Form
              name="requestQuote"
              noValidate={noValidate}
              validated={validated}
              onSubmit={requestQuoteForm}
            >
              <Form.Row>
                {webFormFields.map(
                  (item) =>
                    ((data.__typename === 'ConfigurableProduct' &&
                      item.field_code !== 'product-handedness') ||
                      (data.__typename === 'ConfigurableProduct' &&
                        item.field_code === 'product-handedness' &&
                        activeVarients.attributes.length > 1) ||
                      (data.__typename !== 'ConfigurableProduct' &&
                        item.field_code !== 'product-length' &&
                        item.field_code !== 'product-handedness')) && (
                      <Form.Group
                        className={item.field_type === 'hidden' ? 'd-none' : ''}
                        key={item.field_id}
                        as={Col}
                        sm={item.field_code === 'message' ? 12 : 6}
                      >
                        {item.field_type === 'hidden' ? (
                          <Form.Control
                            type="hidden"
                            name={item.field_id}
                            actionlabel={item.field_code}
                            value={
                              item.field_hidden_value
                                ? item.field_hidden_value
                                : ''
                            }
                          />
                        ) : null}
                        {item.field_type === 'text' &&
                        item.field_code !== 'product-length' &&
                        item.field_code !== 'product-handedness' ? (
                          <>
                            <Form.Label>
                              {item.field_label}
                              {item.required === '1' && (
                                <span className="text-danger"> *</span>
                              )}
                            </Form.Label>
                            <Form.Control
                              required={item.required === '1' ? 'required' : ''}
                              type="text"
                              placeholder={item.field_hint}
                              name={item.field_id}
                              actionlabel={item.field_code}
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              defaultValue={setDefaultValue(item)}
                              disabled={setDefaultDisabled(item)}
                            />
                            {item.validation_advice !== '' ? (
                              <Form.Control.Feedback type="invalid">
                                {item.validation_advice}
                              </Form.Control.Feedback>
                            ) : null}
                          </>
                        ) : null}

                        {item.field_code === 'product-length' ? (
                          <>
                            <Form.Label>
                              {item.field_label}
                              {item.required === '1' && (
                                <span className="text-danger"> *</span>
                              )}
                            </Form.Label>
                            <Form.Control
                              required={item.required === '1' ? 'required' : ''}
                              type="text"
                              placeholder={item.field_hint}
                              name={item.field_id}
                              actionlabel={item.field_code}
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              defaultValue={setDefaultValue(item)}
                              disabled={setDefaultDisabled(item)}
                            />
                            {item.validation_advice !== '' ? (
                              <Form.Control.Feedback type="invalid">
                                {item.validation_advice}
                              </Form.Control.Feedback>
                            ) : null}
                          </>
                        ) : null}

                        {item.field_code === 'product-handedness' &&
                        activeVarients &&
                        activeVarients.attributes.length > 1 ? (
                          <>
                            <Form.Label>
                              {item.field_label}
                              {item.required === '1' && (
                                <span className="text-danger"> *</span>
                              )}
                            </Form.Label>
                            <Form.Control
                              required={item.required === '1' ? 'required' : ''}
                              as="select"
                              placeholder={item.field_hint}
                              name={item.field_id}
                              actionlabel={item.field_code}
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              defaultValue={setDefaultValue(item)}
                            >
                              <option value="">
                                {data.configurable_options[1].label}
                              </option>
                              {data.configurable_options[1].values.map(
                                (configurLabel, index) => (
                                  <React.Fragment
                                    key={configurLabel.value_index}
                                  >
                                    {checkCurrentHandedStock(index) ? (
                                      <option
                                        key={configurLabel.label}
                                        value={configurLabel.label}
                                        disabled
                                      >
                                        {`${configurLabel.label} - Out of Stock`}
                                      </option>
                                    ) : (
                                      <option
                                        key={configurLabel.label}
                                        value={configurLabel.label}
                                      >
                                        {`${configurLabel.label}`}
                                      </option>
                                    )}
                                  </React.Fragment>
                                )
                              )}
                            </Form.Control>
                            {item.validation_advice !== '' ? (
                              <Form.Control.Feedback type="invalid">
                                {item.validation_advice}
                              </Form.Control.Feedback>
                            ) : null}
                          </>
                        ) : null}

                        {item.field_type === 'number' && (
                          <>
                            <Form.Label>
                              {item.field_label}
                              {item.required === '1' && (
                                <span className="text-danger"> *</span>
                              )}
                            </Form.Label>
                            <Form.Control
                              required={item.required === '1' ? 'required' : ''}
                              type="number"
                              min={
                                activeVarients &&
                                Number(
                                  activeVarients.product.price_tier_quote
                                ) > 0
                                  ? activeVarients.product.price_tier_quote
                                  : 1
                              }
                              placeholder={
                                activeVarients &&
                                Number(
                                  activeVarients.product.price_tier_quote
                                ) > 0
                                  ? activeVarients.product.price_tier_quote
                                  : 1
                              }
                              name={item.field_id}
                              actionlabel={item.field_code}
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              defaultValue={
                                activeVarients &&
                                Number(
                                  activeVarients.product.price_tier_quote
                                ) > 0
                                  ? activeVarients.product.price_tier_quote
                                  : 1
                              }
                            />
                            {item.validation_advice !== '' ? (
                              <>
                                <Form.Control.Feedback type="invalid">
                                  {`The value must be greater than or equal to ${
                                    activeVarients &&
                                    Number(
                                      activeVarients.product.price_tier_quote
                                    ) > 0
                                      ? activeVarients.product.price_tier_quote
                                      : 1
                                  }`}
                                </Form.Control.Feedback>
                              </>
                            ) : null}
                          </>
                        )}
                        {item.field_type === 'email' ? (
                          <>
                            <Form.Label>
                              {item.field_label}
                              {item.required === '1' && (
                                <span className="text-danger"> *</span>
                              )}
                            </Form.Label>
                            <Form.Control
                              required={item.required === '1' ? 'required' : ''}
                              type="email"
                              placeholder={item.field_hint}
                              name={item.field_id}
                              actionlabel={item.field_code}
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                              defaultValue={setDefaultValue(item)}
                              disabled={setDefaultDisabled(item)}
                            />
                            {item.validation_advice !== '' ? (
                              <Form.Control.Feedback type="invalid">
                                {item.validation_advice}
                              </Form.Control.Feedback>
                            ) : null}
                          </>
                        ) : null}

                        {item.field_type === 'textarea' ? (
                          <>
                            <Form.Label>
                              {item.field_label}
                              {item.required === '1' && (
                                <span className="text-danger"> *</span>
                              )}
                            </Form.Label>
                            <Form.Control
                              required={item.required === '1' ? 'required' : ''}
                              placeholder={item.field_hint}
                              as="textarea"
                              rows="5"
                              name={item.field_id}
                              actionlabel={item.field_code}
                              onBlur={validationFormField}
                              onKeyUp={validationFormField}
                            />
                            {item.validation_advice !== '' ? (
                              <Form.Control.Feedback type="invalid">
                                {item.validation_advice}
                              </Form.Control.Feedback>
                            ) : null}
                          </>
                        ) : null}
                      </Form.Group>
                    )
                )}
              </Form.Row>
              <input type="hidden" name="cf-token" value={cfToken} />
              <div className="pb-3">
                <CloudflareTurnstile
                  setCfToken={setCfToken}
                  cfTokenCall={cfTokenCall}
                  formName="PDP Product quote Form"
                />
              </div>
              <Button
                disabled={!cfToken}
                variant={cfToken ? 'primary' : 'medium'}
                block={!(windowObj && windowSize.width > 1024)}
                type="submit"
                className="text-uppercase"
              >
                Submit
              </Button>
            </Form>
          ) : null}
        </Modal.Body>
        {(isSubmitQuote || loadingFormSubmit) && activeQuoteModal ? (
          <LoadingIndicator />
        ) : null}
      </Modal>
    </>
  );
};

export default ProductQuoteModal;
