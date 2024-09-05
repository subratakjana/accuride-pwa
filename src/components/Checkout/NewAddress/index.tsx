import { Button, Form, Col, Modal, Row } from 'react-bootstrap';
import { useState, useEffect, useContext, createRef } from 'react';
import { useManualQuery, useMutation } from 'graphql-hooks';
import { AuthContext } from '@Contexts/AuthContext';
import useWindowDimensions from '@Hooks/windowDimention';
import globalData from '@Components/Utilities/globalData';
import GET_STATELIST_BY_COUNTRY from '@Graphql/queries/getStateList.graphql';
import { getCartAdress } from '@Graphql/queries/getCartAdress.graphql';
import { setBillingAddressOnCart } from '@Graphql/queries/setBillingAddressOnCart.graphql';
import { createCustomerAddress } from '@Graphql/queries/createCustomerAddress.graphql';
import { getCustomerAddresses } from '@Graphql/queries/getCustomerAddresses.graphql';
import { updateCustomerAddress } from '@Graphql/queries/updateCustomerAddress.graphql';
import { LoadingIndicator, I18nLink } from '@Components/Utilities';
import { getValidateAddress } from '@Graphql/queries/addressValidation.graphql';
import { ReactSVG } from 'react-svg';
import styles from './NewAddress.module.scss';

const NewAddress = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [show, setShow] = useState(false);
  const [suggestionAddress, setSuggestionAddress] = useState(false);
  const [localAddress, setLocalAddress] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const {
    editMode,
    guestMode,
    newMode,
    closeModal,
    setbillingAddress,
    billingAddress,
    refreshList,
  } = props;
  const [countryList] = useState(globalData.countryList);
  const defaultSelectCountry = () => {
    let selectedCountry = countryList[0].country_code;
    if (editMode !== null) selectedCountry = editMode.country_code;
    if (billingAddress) selectedCountry = billingAddress.country.code;
    return selectedCountry;
  };
  const [selectedCountry, setContSlct] = useState(defaultSelectCountry());
  const [stateList, setStateList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [addEditAddressMode, setAddEditAddressMode] = useState(false);
  const { notify, cartId } = useContext(AuthContext);
  const addAddressFormObj = createRef();
  const editAddressFormObj = createRef();

  const formName = [
    'firstname',
    'lastname',
    'company',
    'telephone',
    'street0',
    'street1',
    'city',
    'country_id',
    'default_shipping',
    'default_billing',
    'postcode',
    'region',
  ];

  const [getCustomerAddressFn] = useManualQuery(
    getCustomerAddresses.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        refreshList(data.customer.addresses);
      },
      skipCache: true,
    }
  );

  const [getCartAdressFn] = useManualQuery(getCartAdress.loc.source.body);

  /**
   * Add new address API mutation assign for crate new address.
   * On submit add address form call the function with passing required variables.
   */
  const [createNewAddress, { loading: addressLoading, data: addAddressData }] =
    useMutation(createCustomerAddress.loc.source.body, {
      onSuccess: () => {
        notify('Address successfully added.');
        closeModal();
        getCustomerAddressFn();
      },
      skipCache: true,
    });

  /**
   * Add new address API mutation assign for crate new address.
   * On submit add address form call the function with passing required variables.
   */
  const [
    createGuestBillingAddressFn,
    { loading: guestAddressLoading, data: guestAddressData },
  ] = useMutation(setBillingAddressOnCart.loc.source.body, {
    onSuccess: (res) => {
      const { data } = res;
      setbillingAddress(data.setBillingAddressOnCart.cart.billing_address);
      getCartAdressFn();
      notify('Billing address successfully added.');
      closeModal();
    },
  });

  /**
   * Add new address API mutation assign for crate new address.
   * On submit add address form call the function with passing required variables.
   */
  const [
    updateAddressQuery,
    { loading: updateaddressLoading, data: updateaddAddressData },
  ] = useMutation(updateCustomerAddress.loc.source.body, {
    onSuccess: () => {
      notify('Address updated successfully.');
      setTimeout(() => {
        closeModal();
      }, 3000);
      getCustomerAddressFn();
    },
    skipCache: true,
  });

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    if (
      targetObj.required &&
      targetObj.value.trim() === '' &&
      (targetObj.type === 'text' || targetObj.type === 'textarea')
    ) {
      targetObj.value = '';
    }
    targetObj.value = targetObj.value.replace(/\s{2,}/g, ' ');
    if (targetObj.value === '') {
      targetObj.classList.add('is-invalid');
    } else {
      targetObj.classList.remove('is-invalid');
    }
    if (targetObj.name === 'telephone') {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, '');
    }
  };

  /**
   * add address mutaion query call
   */
  const runAddAddressMutionQuery = (newAddressFormObj) => {
    createNewAddress({
      variables: { customerNewAddress: newAddressFormObj },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  };

  /**
   * update address mutaion query call
   */
  const runUpdateAddressMutionQuery = (newAddressFormObj) => {
    updateAddressQuery({
      variables: {
        id: editMode.id,
        customerUpdateAddress: newAddressFormObj,
      },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  };

  /**
   * add billing address mutaion query call
   */
  const runBillingAddressMutionQuery = (newAddressFormObj) => {
    const modifiedObj = { ...newAddressFormObj };
    modifiedObj.region = modifiedObj.region.region_code;
    modifiedObj.country_code = modifiedObj.country_id;
    modifiedObj.street = modifiedObj.street.join(' ');
    modifiedObj.save_in_address_book = false;
    delete modifiedObj.country_id;
    delete modifiedObj.default_shipping;
    delete modifiedObj.default_billing;

    createGuestBillingAddressFn({
      variables: { cartId, billingAddress: { address: modifiedObj } },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  };

  /**
   * after confirm save loacl address
   */
  const saveConfirmAddress = (data) => {
    setShow(false);
    delete localAddress.region_name;
    if (data === 'local') {
      if (addEditAddressMode === 'add') {
        runAddAddressMutionQuery(localAddress);
      } else {
        runUpdateAddressMutionQuery(localAddress);
      }
    } else {
      const selectRegion = stateList.filter(
        (state) =>
          state.id === Number(suggestionAddress.getValidateAddress.region_id)
      );
      const suggestAddress = {
        ...localAddress,
        city: suggestionAddress.getValidateAddress.city,
        country_id: suggestionAddress.getValidateAddress.country_id,
        postcode: suggestionAddress.getValidateAddress.postcode,
        region: {
          region: selectRegion[0].name,
          region_code: selectRegion[0].code,
          region_id: selectRegion[0].id,
        },
        street: suggestionAddress.getValidateAddress.street,
      };
      if (addEditAddressMode === 'add') {
        runAddAddressMutionQuery(suggestAddress);
      } else {
        runUpdateAddressMutionQuery(suggestAddress);
      }
    }
  };

  /**
   * address validation
   */
  const [getAddressValidation, { loading: addressValidateLoading }] =
    useMutation(getValidateAddress.loc.source.body, {
      onSuccess: (data) => {
        const res = data.data;
        if (res.getValidateAddress) {
          if (
            res.getValidateAddress.validate === 'true' ||
            res.getValidateAddress.validate === '1'
          ) {
            setShow(true);
            setSuggestionAddress(res);
          } else {
            saveConfirmAddress('local');
          }
        }
      },
    });

  /** add address form submit handler
   * field type wise ready query object.
   * object key as field name and store field value.
   */
  const addAddressForm = (event) => {
    event.preventDefault();
    const addressFormObj = addAddressFormObj.current;
    let street = [];
    let newAddressFormObj = {};
    formName.map((fieldName) => {
      const formField = addressFormObj[fieldName];
      if (formField.type === 'checkbox') {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: formField.checked,
        };
      } else if (fieldName === 'street0' || fieldName === 'street1') {
        street = [...street, formField.value];
      } else if (fieldName === 'region') {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: JSON.parse(formField.value),
        };
      } else {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: formField.value,
        };
      }
      return newAddressFormObj;
    });
    newAddressFormObj = { ...newAddressFormObj, street };
    if (addressFormObj.checkValidity()) {
      if (guestMode) runBillingAddressMutionQuery(newAddressFormObj);
      setAddEditAddressMode('add');
      setLocalAddress(newAddressFormObj);
      if (!guestMode) {
        getAddressValidation({
          variables: {
            country_id: newAddressFormObj.country_id,
            region: newAddressFormObj.region.region,
            region_code: newAddressFormObj.region.region_code,
            street: newAddressFormObj.street.filter(
              (streetItem) => streetItem !== ''
            ),
            postcode: newAddressFormObj.postcode,
            city: newAddressFormObj.city,
          },
        }).then(({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              setShow(true);
              setSuggestionAddress(error.graphQLErrors[0]);
            } else {
              notify('Please check your network connection!', 'error');
            }
          }
        });
      }
    } else {
      setValidated(false);
    }
  };

  /** add address form submit handler
   * field type wise ready query object.
   * object key as field name and store field value.
   */
  const editAddressForm = (event) => {
    event.preventDefault();
    const addressFormObj = editAddressFormObj.current;
    let street = [];
    let newAddressFormObj = {};
    formName.map((fieldName) => {
      const formField = addressFormObj[fieldName];
      if (formField.type === 'checkbox') {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: formField.checked,
        };
      } else if (fieldName === 'street0' || fieldName === 'street1') {
        street = [...street, formField.value];
      } else if (fieldName === 'region') {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: JSON.parse(formField.value),
        };
      } else {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: formField.value,
        };
      }
      return newAddressFormObj;
    });
    newAddressFormObj = { ...newAddressFormObj, street };
    if (addressFormObj.checkValidity()) {
      setAddEditAddressMode('edit');
      setLocalAddress(newAddressFormObj);
      getAddressValidation({
        variables: {
          country_id: newAddressFormObj.country_id,
          region: newAddressFormObj.region.region,
          region_code: newAddressFormObj.region.region_code,
          street: newAddressFormObj.street.filter(
            (streetItem) => streetItem !== ''
          ),
          postcode: newAddressFormObj.postcode,
          city: newAddressFormObj.city,
        },
      }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            setShow(true);
            setSuggestionAddress(error.graphQLErrors[0]);
          } else {
            notify('Please check your network connection!', 'error');
          }
        }
      });
    } else {
      setValidated(false);
    }
  };

  /**
   * state list query function
   */
  const [getStateListFn, { loading: stateLoading, data: stateLists }] =
    useManualQuery(GET_STATELIST_BY_COUNTRY.loc.source.body, {
      skipCache: true,
      onSuccess: (res) => {
        const { data } = res;
        setStateList(data.country.available_regions);
      },
    });

  // ------- watching country change -------
  useEffect(() => {
    getStateListFn({ variables: { id: selectedCountry } }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, 'error');
        } else {
          notify('Please check your network connection!', 'error');
        }
      }
    });
  }, [selectedCountry]);

  /** modal close */
  const handleClose = () => {
    setShow(false);
  };

  /**
   * save address confirmation
   */
  const saveAddressConfirm = () => {
    const suggestAddObj = document.getElementById('suggAdd-1');
    const localAddObj = document.getElementById('suggAdd-2');
    if (suggestAddObj && localAddObj) {
      const issSuggestAddObj = suggestAddObj.checked;
      const isLocalAddObj = localAddObj.checked;
      if (issSuggestAddObj) {
        saveConfirmAddress('suggest');
      } else if (isLocalAddObj) {
        saveConfirmAddress('local');
      } else {
        notify('Please select one of these options', 'warn');
      }
    } else {
      saveConfirmAddress('local');
    }
  };

  /**
   * return loacl/original address html
   */

  const originalAddress = () => (
    <>
      <p className="mb-0">
        {`${localAddress.firstname} ${localAddress.lastname}`}
      </p>
      {localAddress.street.map((street) => (
        <p key={Math.random()} className="mb-0">
          {street}
        </p>
      ))}
      <p className="mb-0">
        <span>{localAddress.city}</span>
        ,&nbsp;
        <span>{localAddress.region.region}</span>
        <span>
          &nbsp;
          {localAddress.postcode}
        </span>
      </p>
    </>
  );

  return (
    <>
      {editMode !== null ? (
        <Form
          ref={editAddressFormObj}
          name="editAddressForm"
          validated={validated}
          onSubmit={editAddressForm}
        >
          {/* contact information start */}
          <article className="mb-3">
            <header
              className={`mb-3 ${
                windowObj && windowSize.width > 1024
                  ? 'border-bottom border-medium pb-2'
                  : ''
              }`}
            >
              <h3 className="text-uppercase mb-0">Contact Information</h3>
            </header>
            <Form.Row>
              {/* first name */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  First Name
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  name="firstname"
                  type="text"
                  required
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  defaultValue={editMode.firstname}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* last name */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  Last Name
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="lastname"
                  type="text"
                  required
                  defaultValue={editMode.lastname}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* conpany */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>Company </Form.Label>
                <Form.Control
                  name="company"
                  type="text"
                  defaultValue={editMode.company}
                />
              </Form.Group>

              {/* phone number */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  Phone Number
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="telephone"
                  type="text"
                  required
                  defaultValue={editMode.telephone}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
          </article>
          {/* contact information end */}

          {/* address start */}
          <article>
            <header
              className={`mb-3 ${
                windowObj && windowSize.width > 1024
                  ? 'border-bottom border-medium pb-2'
                  : ''
              }`}
            >
              <h3 className="text-uppercase mb-0">Address</h3>
            </header>
            <Form.Row>
              {/* street adderss */}
              <Form.Group as={Col} sm={12}>
                <Form.Label>
                  Street Address
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="street0"
                  type="text"
                  className="mb-2"
                  required
                  defaultValue={editMode.street[0]}
                />
                <Form.Control
                  name="street1"
                  type="text"
                  defaultValue={editMode.street[1]}
                  className="mb-2"
                />
                {/* <Form.Control name="street2" defaultValue={editMode.street[2]} type="text" /> */}
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* country */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  Country
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="country_id"
                  as="select"
                  required
                  onChange={(e) => {
                    setContSlct(e.target.value);
                  }}
                  defaultValue={editMode.country_code}
                >
                  {countryList.map((item) => (
                    <option key={item.country_code} value={item.country_code}>
                      {item.country_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* state */}
              {stateList.length > 0 ? (
                <Form.Group as={Col} sm={6}>
                  <Form.Label>
                    State/Province
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    name="region"
                    as="select"
                    required
                    defaultValue={JSON.stringify({
                      region: editMode.region.region,
                      region_code: editMode.region.region_code,
                      region_id: editMode.region.region_id,
                    })}
                  >
                    {stateList.map((state) => (
                      <option
                        key={state.id}
                        value={JSON.stringify({
                          region: state.name,
                          region_code: state.code,
                          region_id: state.id,
                        })}
                      >
                        {state.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
              ) : (
                ''
              )}

              {/* city */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  City
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="city"
                  type="text"
                  required
                  defaultValue={editMode.city}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* zip */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>
                  Zip/Postal Code
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="postcode"
                  type="text"
                  required
                  defaultValue={editMode.postcode}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* default billing address */}
              <Form.Group as={Col} sm={12}>
                <Form.Check
                  custom
                  type="checkbox"
                  label="Use as my default billing address"
                  id="defaultBillingAddress"
                  name="default_billing"
                  defaultChecked={editMode.default_billing}
                  disabled={editMode.default_billing}
                />
              </Form.Group>

              {/* default shipping address */}
              <Form.Group as={Col} sm={12}>
                <Form.Check
                  custom
                  type="checkbox"
                  label="Use as my default shipping address"
                  id="defaultShippingAddress"
                  name="default_shipping"
                  defaultChecked={editMode.default_shipping}
                  disabled={editMode.default_shipping}
                />
              </Form.Group>
            </Form.Row>
          </article>
          {/* address end */}
          <Button
            type="submit"
            variant="secondary"
            block={!(windowObj && windowSize.width > 1024)}
            className="text-uppercase"
          >
            Update Address
          </Button>
        </Form>
      ) : (
        <Form
          ref={addAddressFormObj}
          name="addAddressForm"
          validated={validated}
          onSubmit={addAddressForm}
        >
          {/* contact information start */}
          <article className="mb-3">
            <header className="mb-3">
              <h3 className="text-uppercase mb-0">Contact Information</h3>
            </header>
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
                  defaultValue={billingAddress ? billingAddress.firstname : ''}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
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
                  defaultValue={billingAddress ? billingAddress.lastname : ''}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* conpany */}
              <Form.Group as={Col} sm={12}>
                <Form.Label>Company </Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  defaultValue={billingAddress ? billingAddress.company : ''}
                />
              </Form.Group>
            </Form.Row>
          </article>
          {/* contact information end */}

          {/* address start */}
          <article>
            <header className="mb-3">
              <h3 className="text-uppercase mb-0">Address</h3>
            </header>
            <Form.Row>
              {/* street adderss */}
              <Form.Group as={Col} sm={12}>
                <Form.Label>
                  Street Address
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  className="mb-2"
                  required
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="street0"
                  defaultValue={billingAddress ? billingAddress.street : ''}
                />
                <Form.Control
                  type="text"
                  name="street1"
                  className="mb-2"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* country */}
              <Form.Group as={Col} sm={4} xl={6}>
                <Form.Label>
                  Country
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  required
                  defaultValue={
                    billingAddress ? billingAddress.country.code : ''
                  }
                  onChange={(e) => {
                    setContSlct(e.target.value);
                  }}
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="country_id"
                >
                  {countryList.map((cnt) => (
                    <option key={cnt.country_name} value={cnt.country_code}>
                      {cnt.country_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* state */}
              {stateList.length > 0 ? (
                <Form.Group as={Col} sm={4} xl={6}>
                  <Form.Label>
                    State/Province
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    required
                    name="region"
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    defaultValue={
                      billingAddress
                        ? JSON.stringify({
                            region: billingAddress.region.label,
                            region_code: billingAddress.region.code,
                            region_id: billingAddress.region_id,
                          })
                        : ''
                    }
                  >
                    {stateList.map((state) => (
                      <option
                        key={state.id}
                        value={JSON.stringify({
                          region: state.name,
                          region_code: state.code,
                          region_id: state.id,
                        })}
                      >
                        {state.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
              ) : (
                ''
              )}

              {/* city */}
              <Form.Group as={Col} sm={4} xl={6}>
                <Form.Label>
                  City
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="city"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  defaultValue={billingAddress ? billingAddress.city : ''}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* zip */}
              <Form.Group as={Col} sm={4} xl={6}>
                <Form.Label>
                  Zip/Postal Code
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="postcode"
                  defaultValue={billingAddress ? billingAddress.postcode : ''}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* phone number */}
              <Form.Group as={Col} sm={8} xl={12}>
                <Form.Label>
                  Phone Number
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  name="telephone"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  defaultValue={billingAddress ? billingAddress.telephone : ''}
                />
                <Form.Control.Feedback>Message</Form.Control.Feedback>
              </Form.Group>

              {/* default billing address */}
              <Form.Group as={Col} sm={12} hidden={guestMode}>
                <Form.Check
                  custom
                  type="checkbox"
                  label="Use as my default billing address"
                  id="defaultBillingAddress"
                  name="default_billing"
                />
              </Form.Group>

              {/* default shipping address */}
              <Form.Group as={Col} sm={12} hidden={guestMode}>
                <Form.Check
                  custom
                  type="checkbox"
                  label="Use as my default shipping address"
                  id="defaultShippingAddress"
                  name="default_shipping"
                />
              </Form.Group>
            </Form.Row>
          </article>
          {/* address end */}
          {guestMode || !newMode ? (
            <>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                className="text-uppercase mr-2"
              >
                Save Address
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-uppercase"
                onClick={closeModal}
              >
                Cancel
              </Button>
            </>
          ) : (
            <Button
              type="submit"
              variant="secondary"
              block={!(windowObj && windowSize.width > 1024)}
              className="text-uppercase"
            >
              Save Address
            </Button>
          )}
        </Form>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="acc-custom-modal"
        size={windowObj && windowSize.width <= 1024 ? 'xl' : 'md'}
      >
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
        <Modal.Body>
          <h2 className="mb-3 text-uppercase">Verify Your Address</h2>
          {suggestionAddress && suggestionAddress.getValidateAddress ? (
            <>
              <p>
                To ensure accurate delivery, we suggest the changes highlighted
                below. Please choose which address you would like to use. If
                neither option is correct,
                <Button
                  variant="link"
                  className="p-0 acc-edit-address-text"
                  onClick={handleClose}
                >
                  &nbsp;edit your address.
                </Button>
              </p>
              <Row>
                <Col>
                  <div className="h-100 border border-medium p-3">
                    <Form.Check
                      custom
                      id="suggAdd-1"
                      type="radio"
                      label="Suggested address"
                      name="suggestAddress"
                      className="font-weight-500"
                      checked
                    />
                    <p className="mb-0 pl-4">
                      {`${localAddress.firstname} ${localAddress.lastname}`}
                    </p>
                    {suggestionAddress.getValidateAddress.street.map(
                      (street, indx) => (
                        <p
                          key={Math.random()}
                          className={`mb-0 pl-4 ${
                            localAddress.street[indx] !== street
                              ? 'bg-secondary px-2'
                              : ''
                          }`}
                        >
                          {street}
                        </p>
                      )
                    )}
                    <p className="mb-0 pl-4">
                      <span
                        className={`${
                          localAddress.city !==
                          suggestionAddress.getValidateAddress.city
                            ? 'bg-secondary px-2'
                            : ''
                        }`}
                      >
                        {suggestionAddress.getValidateAddress.city}
                      </span>
                      ,&nbsp;
                      <span
                        className={`${
                          localAddress.region.region !==
                          suggestionAddress.getValidateAddress.region
                            ? 'bg-secondary px-2'
                            : ''
                        }`}
                      >
                        {suggestionAddress.getValidateAddress.region}
                      </span>
                      &nbsp;
                      <span
                        className={`${
                          localAddress.postcode !==
                          suggestionAddress.getValidateAddress.postcode
                            ? 'bg-secondary px-2'
                            : ''
                        }`}
                      >
                        {suggestionAddress.getValidateAddress.postcode}
                      </span>
                    </p>
                  </div>
                </Col>
                <Col>
                  <div className="h-100 border border-medium p-3">
                    <Form.Check
                      custom
                      id="suggAdd-2"
                      type="radio"
                      label="Original address"
                      name="suggestAddress"
                      className="font-weight-500"
                    />
                    <div className="pl-4">{originalAddress()}</div>
                  </div>
                </Col>
              </Row>
            </>
          ) : null}
          {suggestionAddress && suggestionAddress.message ? (
            <>
              <p>We were unable to validate your address</p>
              <p className="p-3 border border-medium">
                {suggestionAddress.message}
              </p>
              <p>
                If the address below is correct then you don&apos;t need to do
                anything. To change your address,
                <Button variant="link" className="p-0" onClick={handleClose}>
                  Click here.
                </Button>
              </p>
              <div className="p-3 border border-medium">
                {originalAddress()}
              </div>
            </>
          ) : null}
          <footer className="mt-3">
            <Button
              variant="secondary"
              onClick={saveAddressConfirm}
              className="m-0 mr-2"
            >
              USE SELECTED ABOVE
            </Button>
            <Button
              variant="link"
              onClick={handleClose}
              className="m-0 acc-custom-gray-btn"
            >
              GO BACK AND EDIT
            </Button>
          </footer>
        </Modal.Body>
      </Modal>

      {(addressLoading && !addAddressData) ||
      (updateaddressLoading && !updateaddAddressData) ||
      (stateLoading && !stateLists) ||
      (guestAddressLoading && !guestAddressData) ||
      addressValidateLoading ? (
        <LoadingIndicator />
      ) : (
        ''
      )}
    </>
  );
};

export default NewAddress;
