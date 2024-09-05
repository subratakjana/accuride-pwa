import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { useQuery, useMutation, useManualQuery } from 'graphql-hooks';
import { useRouter } from 'next/router';
import GET_STATELIST_BY_COUNTRY from '@Graphql/queries/getStateList.graphql';
import { createCustomerAddress } from '@Graphql/queries/createCustomerAddress.graphql';
import { getCustomerAddresses } from '@Graphql/queries/getCustomerAddresses.graphql';
import { useState, createRef, useContext, useEffect } from 'react';
import { AuthContext } from '@Contexts/AuthContext';
import globalData from '@Components/Utilities/globalData';
import { LoadingIndicator, I18nLink } from '@Components/Utilities';
import useWindowDimensions from '@Hooks/windowDimention';
import { getValidateAddress } from '@Graphql/queries/addressValidation.graphql';
import { ReactSVG } from 'react-svg';
import dynamic from 'next/dynamic';
import styles from './../Address.module.scss';

const BreadCrumbs = dynamic(import('@Components/BreadCrumbs/BreadCrumbs'));
const AccountSidebar = dynamic(
  () => import('@Components/Customer/Account/AccountSidebar')
);
const EmailSubscription = dynamic(
  () => import('@Components/EmailSubscription')
);

const AddAddress = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  const { notify, isAuthUser } = useContext(AuthContext);
  const [countryList] = useState(globalData.countryList);
  const addAddressFormObj = createRef();
  const [selectedCountry, setCountry] = useState({
    country: countryList.length > 0 ? countryList[0].country_code : '',
  });
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const [suggestionAddress, setSuggestionAddress] = useState(false);
  const [localAddress, setLocalAddress] = useState(false);

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  // Function for sidebar sticky issue end

  //breadcrumbs
  const pathSegments = router.asPath.split('/').filter((segment) => segment);
  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: 'Home' },
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
      name: pathSegments[3],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
      name: 'Add Address',
    },
  ];
  useEffect(() => {
    isAuthUser();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

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

  const [getCustomerAddressesFn] = useManualQuery(
    getCustomerAddresses.loc.source.body
  );

  /**
   * state list query function
   */
  const { loading: stateLoading, data: stateLists } = useQuery(
    GET_STATELIST_BY_COUNTRY.loc.source.body,
    {
      variables: {
        id: selectedCountry.country,
      },
    }
  );

  /**
   * Add new address API mutation assign for crate new address.
   * On submit add address form call the function with passing required variables.
   */
  const [createNewAddress, { loading: addressLoading, data: addAddressData }] =
    useMutation(createCustomerAddress.loc.source.body, {
      onSuccess: () => {
        getCustomerAddressesFn();
      },
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
    if (targetObj.value.trim() === '') {
      targetObj.classList.add('is-invalid');
    } else {
      targetObj.classList.remove('is-invalid');
    }
    if (targetObj.name === 'telephone') {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, '');
    }
  };

  /**
   * add address mution query call
   */
  const runAddAddressMutionQuery = (newAddressFormObj) => {
    createNewAddress({
      variables: {
        customerNewAddress: newAddressFormObj,
      },
    })
      .then(() => {
        notify('You have successfully add address...', 'success');
        router.back();
      })
      .catch((error) => {
        const { graphQLErrors } = error;
        const gqlError = graphQLErrors.map((e) => e.message);
        notify(gqlError[0], 'error');
      });
  };

  /**
   * after confirm save loacl address
   */
  const saveConfirmAddress = (data) => {
    setShow(false);
    delete localAddress.region_name;
    if (data === 'local') {
      runAddAddressMutionQuery(localAddress);
    } else {
      const selectRegion =
        stateLists &&
        stateLists.country.available_regions.filter(
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
      runAddAddressMutionQuery(suggestAddress);
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
        street = [...street, formField.value.trim()];
      } else if (fieldName === 'region') {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: JSON.parse(formField.value),
        };
      } else {
        newAddressFormObj = {
          ...newAddressFormObj,
          [fieldName]: formField.value.trim(),
        };
      }
      return newAddressFormObj;
    });
    newAddressFormObj = { ...newAddressFormObj, street };
    if (addressFormObj.checkValidity()) {
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
   * get state list by country id on changing country.
   */
  const getStateList = (event) => {
    const countryId = event.target.value;
    setCountry({
      ...selectedCountry,
      country: countryId,
    });
  };

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

  // loading for api calling
  // if (
  //   (addressLoading && !addAddressData) ||
  //   (stateLoading && !stateLists) ||
  //   addressValidateLoading
  // )
  // if (stateLoading) return <LoadingIndicator />;

  const stateList = stateLists && stateLists.country;

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding acc-card pt-0 acc-card">
        <Row className="align-items-start">
          {/* sidebar start */}
          <Col
            xl
            className={`acc-account-sidebar pt-xl-5 ${
              isSticky ? 'sticky' : ''
            }`}
          >
            <AccountSidebar />
          </Col>
          {/* sidebar end */}

          {/* content start */}
          <Col xl className="acc-account-content pt-xl-5">
            <header className="mb-3">
              <h1 className="text-uppercase mb-0">Add New Address</h1>
            </header>
            <Form
              ref={addAddressFormObj}
              name="addAddressForm"
              validated={validated}
              onSubmit={addAddressForm}
            >
              {/* contact information start */}
              <article className="mb-3">
                <header
                  className={`mb-3 pb-xl-2 border-medium ${
                    windowObj && windowSize.width > 1024 ? 'border-bottom' : ''
                  }`}
                >
                  <h2 className="text-uppercase mb-0">Contact Information</h2>
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
                      pattern="^\S+(\s\S+)*$"
                      required
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      defaultValue={localAddress ? localAddress.firstname : ''}
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
                      pattern="^\S+(\s\S+)*$"
                      required
                      defaultValue={localAddress ? localAddress.lastname : ''}
                    />
                    <Form.Control.Feedback>Message</Form.Control.Feedback>
                  </Form.Group>

                  {/* conpany */}
                  <Form.Group as={Col} sm={6}>
                    <Form.Label>Company </Form.Label>
                    <Form.Control
                      onBlur={validationFormField}
                      onKeyUp={validationFormField}
                      name="company"
                      pattern="^\S+(\s\S+)*$"
                      type="text"
                      defaultValue={localAddress ? localAddress.company : ''}
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
                      defaultValue={localAddress ? localAddress.telephone : ''}
                    />
                    <Form.Control.Feedback>Message</Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
              </article>
              {/* contact information end */}

              {/* address start */}
              <article>
                <header
                  className={`mb-3 pb-xl-2 border-medium ${
                    windowObj && windowSize.width > 1024 ? 'border-bottom' : ''
                  }`}
                >
                  <h2 className="text-uppercase mb-0">Address</h2>
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
                      pattern="^\S+(\s\S+)*$"
                      className="mb-2"
                      required
                      defaultValue={localAddress ? localAddress.street[0] : ''}
                    />
                    <Form.Control
                      name="street1"
                      defaultValue={localAddress ? localAddress.street[1] : ''}
                      type="text"
                      className="mb-2"
                    />
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
                      onChange={getStateList}
                      name="country_id"
                      as="select"
                      required
                      defaultValue={
                        selectedCountry ? selectedCountry.country : ''
                      }
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
                    <Form.Control.Feedback>Message</Form.Control.Feedback>
                  </Form.Group>

                  {/* state */}
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
                      defaultValue={
                        localAddress
                          ? JSON.stringify({
                              region: localAddress.region.region,
                              region_code: localAddress.region.region_code,
                              region_id: localAddress.region.region_id,
                            })
                          : ''
                      }
                    >
                      {stateList &&
                        stateList.available_regions.map((state) => (
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
                      pattern="^\S+(\s\S+)*$"
                      required
                      defaultValue={localAddress ? localAddress.city : ''}
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
                      pattern="^\S+(\s\S+)*$"
                      required
                      defaultValue={localAddress ? localAddress.postcode : ''}
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
                      defaultChecked={
                        localAddress ? localAddress.default_billing : ''
                      }
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
                      defaultChecked={
                        localAddress ? localAddress.default_shipping : ''
                      }
                    />
                  </Form.Group>
                </Form.Row>
              </article>
              {/* address end */}
              <Button
                type="submit"
                variant="secondary"
                className={`text-uppercase ${
                  windowObj && windowSize.width < 991 ? 'btn-block' : ''
                }`}
              >
                Save Address
              </Button>
            </Form>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      <EmailSubscription />
      {(addressLoading && !addAddressData) ||
      (stateLoading && !stateLists) ||
      addressValidateLoading ? (
        <LoadingIndicator />
      ) : null}
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
    </>
  );
};
export default AddAddress;
