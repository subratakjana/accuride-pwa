import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { useState, useEffect, useContext, createRef } from 'react';
import { useManualQuery, useMutation } from 'graphql-hooks';
import { MdWarning } from 'react-icons/md';
import LOGIN_BY_EMAIL_PASSWORD from '@Graphql/queries/loginByEmailPassword.graphql';
import { AuthContext } from '@Contexts/AuthContext';
import globalData from '@Components/Utilities/globalData';
import GET_STATELIST_BY_COUNTRY from '@Graphql/queries/getStateList.graphql';
import { setGuestEmailOnCart } from '@Graphql/queries/setGuestEmailOnCart.graphql';
import { isEmailAvailable } from '@Graphql/queries/isEmailAvailable.graphql';
import { getValidateAddress } from '@Graphql/queries/addressValidation.graphql';
import { LoadingIndicator, I18nLink } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';
import { FaQuestion } from 'react-icons/fa';
import { ReactSVG } from 'react-svg';
import CloudflareTurnstile from '@Components/Utilities/CloudflareTurnstile';

const GuestShippingAddress = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const { FedxList, setShippingAddress, createEmptyCartFn } = props;
  const [show, setShow] = useState(false);
  const [suggestionAddress, setSuggestionAddress] = useState(false);
  const [localAddress, setLocalAddress] = useState(false);

  const [shippingConfig, setShippingConfig] = useState(false);
  const [guestAddress, setGuestAddress] = useState(null);
  const [countryList] = useState(globalData.countryList);
  const [stateList, setStateList] = useState([]);
  const [selectedCountry, setCountry] = useState(null);
  const [selectedPin, setPin] = useState('');
  const [validated, setValidated] = useState(false);
  const [userExist, setUserExist] = useState(true);
  const [invalidEmail, setInValidEmail] = useState(false);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const { notify, cartId, setToken, encode, setUserDetails } =
    useContext(AuthContext);
  const addAddressFormObj = createRef();
  const emailFormObj = createRef();
  let loginform;

  const formName = [
    'firstname',
    'lastname',
    'company',
    'telephone',
    'street0',
    'street1',
    'city',
    'country_code',
    'postcode',
    'region',
    'save_in_address_book',
  ];

  // API calling for login method
  const [loginByEmailPassword, { loading: loginLoading }] = useMutation(
    LOGIN_BY_EMAIL_PASSWORD.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        // API response check and send the user token to content
        if (data) {
          notify('You have successfully logged in...');
          const userToken = data.generateCustomerToken.token;
          // send userAuthTokek to context
          setToken(userToken);
          // create cart id
          createEmptyCartFn().then(({ error }) => {
            if (error) {
              if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                notify(error.graphQLErrors[0].message, 'error');
              } else {
                notify('Please check your network connection!', 'error');
              }
            }
          });
          setUserDetails(JSON.stringify(data.generateCustomerToken));
        }
      },
    }
  );

  // fake form submition method
  const fakeSubmit = (event) => {
    event.preventDefault();
  };

  // form submition method
  const loginForm = (event) => {
    event.preventDefault();
    let logingFormObject = {};
    const loginFormObj = emailFormObj.current;
    const emailFormName = ['email', 'password'];
    emailFormName.map((fieldName) => {
      const formField = loginFormObj[fieldName];
      logingFormObject = { ...logingFormObject, [fieldName]: formField.value };
      return logingFormObject;
    });
    if (loginFormObj.checkValidity()) {
      loginByEmailPassword({
        variables: {
          email: encode(logingFormObject.email),
          password: encode(logingFormObject.password),
        },
        operationName: {
          headers: [{ headerName: 'cf-token', headerValue: cfToken }],
        },
      }).then(({ error }) => {
        setCfTokenCall(cfTokenCall + 1);
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, 'error');
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
   * Add email address API mutation assign for guest user.
   * On submit add address form call the function with passing required variables.
   */
  const [
    setGuestEmailOnCartFn,
    { loading: emailLoading, data: emailAddressData },
  ] = useMutation(setGuestEmailOnCart.loc.source.body);

  /**
   * after confirm save loacl address
   */
  const saveConfirmAddress = (data) => {
    setShow(false);
    const loginFormObj2 = document.querySelector('[name="loginForm"]');
    let logingFormObject2 = {};
    const emailFormName2 = ['email'];
    emailFormName2.map((fieldName) => {
      const formField = loginFormObj2[fieldName];
      logingFormObject2 = {
        ...logingFormObject2,
        [fieldName]: formField.value,
      };
      return logingFormObject2;
    });
    delete localAddress.region_name;
    if (data === 'local') {
      setShippingAddress(localAddress);
    } else {
      setSuggestionAddress({ ...suggestionAddress, isSaved: true });
      const selectRegion = stateList.filter(
        (state) =>
          state.id === Number(suggestionAddress.getValidateAddress.region_id)
      );
      const suggestAddress = {
        ...localAddress,
        city: suggestionAddress.getValidateAddress.city,
        country_code: suggestionAddress.getValidateAddress.country_id,
        postcode: suggestionAddress.getValidateAddress.postcode,
        region: selectRegion[0].code,
        street: suggestionAddress.getValidateAddress.street,
      };
      setShippingAddress(suggestAddress);
      const getLength = suggestAddress && Object.keys(suggestAddress).length;

      document.querySelector('[name="postcode"]').value =
        suggestAddress.postcode;
      document.querySelector('[name="city"]').value = suggestAddress.city;
      document.querySelector('[name="street0"]').value =
        suggestAddress.street[0];
      document.querySelector('[name="street1"]').value =
        getLength > 1 ? suggestAddress.street[1] : '';
      document.querySelector('[name="region"]').value = JSON.stringify({
        id: Number(selectRegion[0].id),
        region_code: selectRegion[0].code,
        region: selectRegion[0].name,
      });
      document.querySelector('[name="country_code"]').value =
        suggestAddress.country_code;
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

  /**
   * Check email address API.
   * If this email is already registered or not.
   */
  const [isEmailAvailableFn] = useManualQuery(
    isEmailAvailable.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (data.isEmailAvailable) {
          setUserExist(data.isEmailAvailable.is_email_available);
          setInValidEmail(false);
        }
      },
    }
  );

  /** on blur and on key each form field check validation */
  const validationLoginFormField = (e) => {
    const targetObj = e.target;
    if (targetObj.value === '' && targetObj.required) {
      targetObj.classList.add('is-invalid');
    } else {
      targetObj.classList.remove('is-invalid');
    }
  };

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

  /** add address form submit handler
   * field type wise ready query object.
   * object key as field name and store field value.
   */
  const addAddressFormSubmit = (e) => {
    e.preventDefault();
    loginform = document.querySelector('[name="logSubmit"]');
    loginform.click();
    const addressFormObj = addAddressFormObj.current;
    const loginFormObj2 = emailFormObj.current;
    let street = [];
    let newAddressFormObj = {};
    let logingFormObject2 = {};
    const emailFormName2 = ['email'];

    emailFormName2.map((fieldName) => {
      const formField = loginFormObj2[fieldName];
      logingFormObject2 = {
        ...logingFormObject2,
        [fieldName]: formField.value,
      };
      return logingFormObject2;
    });

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
        const regionVal = JSON.parse(formField.value);
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: regionVal.region_code,
          region_name: regionVal.region,
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
    if (addressFormObj.checkValidity() && loginFormObj2.checkValidity()) {
      setLocalAddress(newAddressFormObj);
      getAddressValidation({
        variables: {
          country_id: newAddressFormObj.country_code,
          region: newAddressFormObj.region_name,
          region_code: newAddressFormObj.region,
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
      setGuestEmailOnCartFn({
        variables: { cart_id: cartId, email: logingFormObject2.email },
      }).then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, 'error');
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
  const [getStateListFn, { loading: GuestStateListLoading }] = useManualQuery(
    GET_STATELIST_BY_COUNTRY.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setStateList(data.country.available_regions);
      },
      skipCache: true,
    }
  );

  const handlerPin = (evt) => {
    setPin(evt.target.value);
  };

  // ------- watching country change -------
  useEffect(() => {
    if (selectedCountry) {
      getStateListFn({ variables: { id: selectedCountry } }).then(
        ({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, 'error');
            } else {
              notify('Please check your network connection!', 'error');
            }
          }
        }
      );
    }
  }, [selectedCountry]);

  // ------- watching country change -------
  useEffect(() => {
    if (shippingConfig !== false) {
      setCountry(
        shippingConfig ? shippingConfig.country_id : countryList[0].country_code
      );
      setPin(shippingConfig ? shippingConfig.postcode : '');
    }
  }, [shippingConfig, countryList]);

  useEffect(() => {
    setShippingConfig(
      localStorage.getItem('shippingData')
        ? JSON.parse(localStorage.getItem('shippingData'))
        : null
    );
    setGuestAddress(
      localStorage.getItem('guest_shipping_address_cart') &&
        localStorage.getItem('guest_shipping_address_cart') !== 'undefined'
        ? JSON.parse(localStorage.getItem('guest_shipping_address_cart'))
        : null
    );
  }, []);

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
        <span>{localAddress.region}</span>
        <span>
          &nbsp;
          {localAddress.postcode}
        </span>
      </p>
    </>
  );

  return (
    <>
      <header
        className={`mb-3 mt-xl-3 ${
          windowObj && windowSize.width > 1024
            ? 'border-bottom border-medium'
            : ''
        }`}
      >
        <h2
          className={`mb-0 ${
            windowObj && windowSize.width > 1024
              ? 'text-uppercase text-primary pb-2'
              : 'text-dark'
          }`}
        >
          Shipping Address
        </h2>
      </header>

      <Form
        ref={emailFormObj}
        name="loginForm"
        className="mb-4 acc-shipping-formsize acc-guest-loginform"
        validated={validated}
        onSubmit={fakeSubmit}
      >
        <Form.Row>
          {/* first name */}
          <Form.Group as={Col} sm={6}>
            <Form.Label>
              Email Address
              <span className="text-danger"> *</span>
            </Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                required
                name="email"
                defaultValue={guestAddress ? guestAddress.email : ''}
                autoComplete="false"
                onChange={(e) => {
                  isEmailAvailableFn({
                    variables: { email: e.target.value },
                  }).then(({ error }) => {
                    if (error) {
                      if (
                        error.graphQLErrors &&
                        error.graphQLErrors.length > 0
                      ) {
                        if (
                          error.graphQLErrors[0].message === 'Email is invalid'
                        ) {
                          setInValidEmail(true);
                          setUserExist(true);
                        }
                      } else {
                        notify(
                          'Please check your network connection!',
                          'error'
                        );
                      }
                    }
                  });
                }}
                onBlur={validationLoginFormField}
                onKeyUp={validationLoginFormField}
              />
              <InputGroup.Append>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>
                      We&#39;ll send your order confirmation here.
                    </Tooltip>
                  }
                >
                  <Button variant="outline-dark">
                    <FaQuestion />
                  </Button>
                </OverlayTrigger>
              </InputGroup.Append>
            </InputGroup>
            <Form.Control.Feedback type="invalid" className="text-left">
              This is a required field.
            </Form.Control.Feedback>
            {invalidEmail ? (
              <p className="pt-2 m-0 text-warning">
                Please enter a valid email address (Ex: johndoe@domain.com).
              </p>
            ) : (
              ''
            )}
            <Form.Text className="text-muted">
              You can create an account after checkout.
            </Form.Text>
          </Form.Group>

          {userExist ? (
            ''
          ) : (
            <>
              {/* password */}
              <Form.Group as={Col} sm={6}>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onBlur={validationLoginFormField}
                  onKeyUp={validationLoginFormField}
                />
                <Form.Text className="text-muted">
                  You already have an account with us. Sign in or continue as
                  guest.
                </Form.Text>
              </Form.Group>
              <input type="hidden" name="cf-token" value={cfToken} />
              <div className="d-flex pb-3">
                <div>
                  <CloudflareTurnstile
                    setCfToken={setCfToken}
                    cfTokenCall={cfTokenCall}
                    formName="Shipping Login Form"
                  />
                </div>
                <Form.Group as={Col} sm={12} className="flex-row-reverse">
                  <Button
                    type="button"
                    disabled={!cfToken}
                    variant={cfToken ? 'secondary' : 'medium'}
                    block={!(windowObj && windowSize.width >= 768)}
                    className="text-uppercase"
                    onClick={loginForm}
                  >
                    Login
                  </Button>
                  <I18nLink href="/customer/forgotpassword">
                    <Button
                      block={!(windowObj && windowSize.width >= 768)}
                      variant="link"
                      type="button"
                      className="mt-3 mt-md-0"
                    >
                      Forgot Password?
                    </Button>
                  </I18nLink>
                </Form.Group>
              </div>
            </>
          )}
        </Form.Row>
        {/* form end */}
        <Button
          type="submit"
          hidden
          variant="secondary"
          name="logSubmit"
          block
          className="text-uppercase"
        >
          Save Address
        </Button>
      </Form>

      {stateList.length > 0 ? (
        <>
          <Form
            ref={addAddressFormObj}
            name="addAddressForm"
            className="acc-shipping-formsize"
            validated={validated}
            onSubmit={addAddressFormSubmit}
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
                  defaultValue={guestAddress ? guestAddress.firstname : ''}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
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
                  defaultValue={guestAddress ? guestAddress.lastname : ''}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field.
                </Form.Control.Feedback>
              </Form.Group>

              {/* conpany */}
              <Form.Group as={Col} sm={12}>
                <Form.Label>Company </Form.Label>
                <Form.Control
                  type="text"
                  name="company"
                  defaultValue={guestAddress ? guestAddress.company : ''}
                />
              </Form.Group>

              {/* street adderss */}
              <Form.Group as={Col} sm={12}>
                <Form.Label>
                  Street Address
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="street0"
                  className="mb-2"
                  required
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  defaultValue={guestAddress ? guestAddress.street[0] : ''}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="text-left mb-2"
                >
                  This is a required field.
                </Form.Control.Feedback>
                <Form.Control
                  type="text"
                  name="street1"
                  className="mb-2"
                  defaultValue={guestAddress ? guestAddress.street[1] : ''}
                />
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
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  name="country_code"
                  defaultValue={selectedCountry}
                >
                  {countryList.map((cnt) => (
                    <option key={cnt.country_name} value={cnt.country_code}>
                      {cnt.country_name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field.
                </Form.Control.Feedback>
              </Form.Group>

              {/* state */}
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
                    shippingConfig
                      ? JSON.stringify({
                          id: shippingConfig.region_id,
                          region_code: shippingConfig.region_code,
                          region: shippingConfig.region,
                        })
                      : ''
                  }
                >
                  {stateList.map((state) => (
                    <option
                      key={state.id}
                      value={JSON.stringify({
                        id: state.id,
                        region_code: state.code,
                        region: state.name,
                      })}
                    >
                      {state.name}
                    </option>
                  ))}
                </Form.Control>
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field.
                </Form.Control.Feedback>
              </Form.Group>

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
                  defaultValue={guestAddress ? guestAddress.city : ''}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field.
                </Form.Control.Feedback>
              </Form.Group>

              {/* zip */}
              <Form.Group as={Col} sm={6}>
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
                  onChange={handlerPin}
                  defaultValue={selectedPin}
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field.
                </Form.Control.Feedback>
                {FedxList && FedxList.length === 0 && emailAddressData ? (
                  <div className="p-3 pl-5 mt-2 text-warning bg-message message warning">
                    <MdWarning className="iconElmnt" />
                    <span>
                      Provided Zip/Postal Code seems to be invalid. Example:
                      12345-6789; 12345. If you believe it is the right one you
                      can ignore this notice.
                    </span>
                  </div>
                ) : (
                  ''
                )}
              </Form.Group>

              {/* phone number */}
              <Form.Group as={Col} sm={6} xl={12}>
                <Form.Label>
                  Phone Number
                  <span className="text-danger"> *</span>
                </Form.Label>

                <InputGroup>
                  <FormControl
                    type="text"
                    required
                    name="telephone"
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    defaultValue={guestAddress ? guestAddress.telephone : ''}
                  />
                  <InputGroup.Append>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>For delivery questions.</Tooltip>}
                    >
                      <Button variant="outline-dark">
                        <FaQuestion />
                      </Button>
                    </OverlayTrigger>
                  </InputGroup.Append>
                </InputGroup>
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field.
                </Form.Control.Feedback>
              </Form.Group>

              {/* default billing address */}
              <Form.Group as={Col} sm={12} hidden>
                <Form.Check
                  custom
                  type="checkbox"
                  label="Use as my default billing address"
                  id="defaultBillingAddress"
                  name="save_in_address_book"
                />
              </Form.Group>
            </Form.Row>
            {/* address end */}
            <div className="text-xl-right">
              <Button
                disabled={`${
                  (emailLoading && !emailAddressData) || addressValidateLoading
                    ? 'disabled'
                    : ''
                }`}
                type="submit"
                name="addressSubmit"
                variant="secondary"
                block={!(windowObj && windowSize.width >= 768)}
                className="text-uppercase"
              >
                {(emailLoading && !emailAddressData) || addressValidateLoading
                  ? 'Validating Address...'
                  : 'Save Shipping Address'}
              </Button>
            </div>
          </Form>
        </>
      ) : (
        <p>No state list found</p>
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
              className="acc-filter-close acc-guest-shipping-close-icon"
              src="/assets/images/icons/close.svg"
            />
          </Button>
          <I18nLink href="/">
            <a aria-label="link" className="logo-icon">
              <ReactSVG
                className="fill-white acc-guest-shipping-logo-icon"
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
                          localAddress.region_name !==
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
      {loginLoading || GuestStateListLoading ? <LoadingIndicator /> : ''}
    </>
  );
};

export default GuestShippingAddress;
