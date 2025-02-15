import { useState, useEffect, useContext, createRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  OverlayTrigger,
  Tooltip,
  InputGroup,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { LoadingIndicator } from "@Components/Utilities";
import { useManualQuery, useMutation } from "graphql-hooks";
import creditCardType from "credit-card-type";
import {
  FaQuestion,
  FaCcMastercard,
  FaCcAmex,
  FaCcVisa,
  FaCcDiscover,
  FaCreditCard,
} from "react-icons/fa";
import globalData from "@Components/Utilities/globalData";
import GET_STATELIST_BY_COUNTRY from "@Graphql/queries/getStateList.graphql";
import { createTokenBaseCard } from "@Graphql/queries/createTokenBaseCard.graphql";
import { generateCyberSourceKey } from "@Graphql/queries/generateCyberSourceKey.graphql";
import { getClientIpAPI } from "@Graphql/queries/getClientIP.graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import flex from "@cybersource/flex-sdk-web";
import dynamic from "next/dynamic";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const AddCard = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { decode, token, notify, loggedCustomerData } = useContext(AuthContext);
  const [countryList] = useState(globalData.countryList);
  const [validated, setValidated] = useState(false);
  const [selectedCountry, setCountry] = useState(countryList[0].country_code);
  const [stateList, setStateList] = useState(null);
  const [cardTypeList, setCardTypeList] = useState([]);
  const [cardType, setcardType] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [minLength, setMinLength] = useState(0);
  const [maxLength, setMaxLength] = useState(20);
  const [userEmail, setUserEmail] = useState("");
  const [clientIp, setClientIp] = useState("");
  const [sessionModalOpen, setSessionModalOpen] = useState(false);

  const [CSEncodedKey, setCSEncodedKey] = useState("");

  const cardForm = createRef();
  const router = useRouter();
  const monthList = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const yearListCal = () => {
    const yer = [];
    const date = new Date();
    let i = 0;
    do {
      yer.push(JSON.stringify(date.getFullYear() + i));
      i += 1;
    } while (i < 11);
    return yer;
  };
  const yearList = yearListCal();

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

  //breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  const crumbs = [
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
      name: pathSegments[3],
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
      name: "Add Card",
    },
  ];
  //  API calling for get cybersource key
  const [generateCyberSourceKeyFn] = useManualQuery(
    generateCyberSourceKey.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const datakey = data.data;
        const getdata = datakey.generateCyberSourceKey;
        setCSEncodedKey(getdata.keyId);
      },
    },
  );

  const [getClientIpAPIFn] = useManualQuery(getClientIpAPI.loc.source.body, {
    fetchPolicy: "no-cache",
    onSuccess: (data) => {
      const dataClientIp = data.data;
      setClientIp(dataClientIp.getClientIp.ip);
    },
  });

  useEffect(() => {
    if (token && token !== "" && token !== "null") {
      getClientIpAPIFn().then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
        }
      });
    }
  }, [token]);

  useEffect(() => {
    if (loggedCustomerData) {
      const getData = loggedCustomerData.customer;
      setUserEmail(getData.email);
    }
  }, [loggedCustomerData]);
  /**
   * state list query function
   */
  const [getStateListFn, { loading: stateListLoading }] = useManualQuery(
    GET_STATELIST_BY_COUNTRY.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setStateList(data.country.available_regions);
      },
    },
  );

  //  API calling for get card type list
  const getCardTypes = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REST_API}/all/V1/cardtypes/availablecardtypes`,
      )
      .then((response) => {
        if (response.status === 200) {
          setCardTypeList(response.data);
        }
      })
      .catch(() => {
        // NA
      });
  };

  /** on blur and on key each form field check validation */
  const typeHandler = (evnt) => {
    setcardType(evnt.target.value);
    setCardNumber("");
    setCardMonth("");
    setCardYear("");
    setCvv("");
  };

  /**
   * cvv Validation from form subittion and field change
   * @param {*} e
   */
  const cvvValidation = (targetObj, isInputGroup) => {
    if (targetObj.name === "cc_cid") {
      if (
        (targetObj.value.length !== 3 && cardType !== "AE") ||
        (targetObj.value.length !== 4 && cardType === "AE")
      ) {
        targetObj.classList.add("is-invalid");
        if (isInputGroup) {
          targetObj.parentElement.classList.add("is-invalid");
        }
      } else {
        targetObj.classList.remove("is-invalid");
        if (isInputGroup) {
          targetObj.parentElement.classList.remove("is-invalid");
        }
      }
    }
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
    const isInputGroup =
      targetObj.parentElement.classList.contains("input-group");
    if (targetObj.value === "") targetObj.classList.add("is-invalid");
    else targetObj.classList.remove("is-invalid");

    if (
      targetObj.name === "cc_number" ||
      targetObj.name === "telephone" ||
      targetObj.name === "cc_cid"
    ) {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, "");
    }
    if (targetObj.name === "cc_number") {
      let curCardType = "";
      let numDigit = 0;
      let cardt;
      if (targetObj.value.length > 0) {
        cardt = creditCardType(targetObj.value);
        if (cardt.length > 0) {
          curCardType = cardt[0].niceType.toLowerCase();
          numDigit = cardt[0].lengths;
        } else {
          notify("Invalid card number!", "warn");
        }
      }
      if (
        curCardType === "american express" ||
        curCardType === "visa" ||
        curCardType === "mastercard" ||
        curCardType === "discover"
      ) {
        targetObj.classList.remove("is-invalid");
        setMinLength(numDigit[0]);
        if (numDigit.length > 1) setMaxLength(numDigit[numDigit.length - 1]);
        else setMaxLength(numDigit[0]);

        if (curCardType === "american express") setcardType("AE");
        else if (curCardType === "visa") setcardType("VI");
        else if (curCardType === "mastercard") setcardType("MC");
        else if (curCardType === "discover") setcardType("DI");
      } else {
        targetObj.classList.add("is-invalid");
        setcardType("");
        setMinLength(0);
        setMaxLength(20);
        if (curCardType !== "" && cardt.length > 0) {
          notify(`${cardt[0].niceType} type card is not acceptable!`, "warn");
        }
      }
      if (
        targetObj.value.length < minLength ||
        targetObj.value.length > maxLength
      )
        targetObj.classList.add("is-invalid");
      else targetObj.classList.remove("is-invalid");
    }
    cvvValidation(targetObj, isInputGroup);
  };

  /** edit card form submit handler
   * field type wise ready query object.
   * object key as field name and store field value.
   */

  const [CyberSourceCardHashDataFn, { loading: hashCardLoading }] = useMutation(
    createTokenBaseCard.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (data.createTokenBaseCard.hash) {
          notify("Your card has been added successfully", "success");
          router.back();
        } else notify("Please provide a valid data!", "warn");
      },
    },
  );

  const CSCreateToken = (addressJson) => {
    const tokens = CSEncodedKey.split(".");
    const decodeToekn = JSON.parse(decode(tokens[1]));
    const { jwk } = decodeToekn.flx;
    const cardTypeNum = {
      VI: "001",
      MC: "002",
      AE: "003",
      DI: "004",
    };
    const options = {
      kid: jwk.kid,
      keystore: jwk,
      encryptionType: "RsaOaep", // ensure this matches the encryptionType you specified when creating your key
      cardInfo: {
        cardNumber,
        cardType: cardTypeNum[cardType],
        cardExpirationMonth: cardMonth,
        cardExpirationYear: cardYear,
      },
    };

    flex.createToken(options, (response) => {
      if (response.error) {
        const errMsg = response.error.responseStatus.message;
        if (errMsg.includes("Cannot find private RSA key with keyId")) {
          setSessionModalOpen(true);
        } else {
          notify(errMsg, "error");
        }
      } else {
        const lastDayDate = new Date(cardYear, cardMonth + 1, 0);
        const lastDay = lastDayDate.getDate();

        const lastDate = `${cardYear}-${cardMonth}-${lastDay} 23:59:59`;

        const getinput = {
          expires: lastDate,
          customer_ip: clientIp,
          customer_email: userEmail,
          payment_id: response.token,
          method: "paradoxlabs_cybersource",
          active: true,
          address: addressJson,
          additional: {
            cc_type: cardType,
            cc_last4: cardNumber.substr(cardNumber.length - 4),
            cc_exp_year: cardYear,
            cc_exp_month: cardMonth,
            cc_bin: "400700",
          },
        };
        CyberSourceCardHashDataFn({ variables: { getinput } }).then(
          ({ error }) => {
            if (error) {
              if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                notify(error.graphQLErrors[0].message, "error");
              } else {
                notify("Please check your network connection!", "error");
              }
            }
          },
        );
      }
    });
  };

  const cardFormSubmit = (e) => {
    e.preventDefault();
    const formName = [
      "firstname",
      "lastname",
      "company",
      "telephone",
      "street",
      "city",
      "country_id",
      "postcode",
      "region",
      "cc_exp_month",
      "cc_exp_year",
      "cc_number",
      "cc_type",
      "cc_cid",
      "website_id",
    ];
    const cardFormObj = cardForm.current;
    let cardObj = {};

    formName.map((fieldName) => {
      const formField = cardFormObj[fieldName];
      if (fieldName === "region") {
        const regionVal = JSON.parse(formField.value);
        cardObj = { ...cardObj, region_id: regionVal.id };
        cardObj = { ...cardObj, state: regionVal.region };
      } else {
        cardObj = { ...cardObj, [fieldName]: formField.value };
      }
      return cardObj;
    });

    const cyberSourceFormName = [
      "firstname",
      "lastname",
      "company",
      "telephone",
      "street",
      "city",
      "country_id",
      "postcode",
      "region",
    ];

    let addressJson = {};

    cyberSourceFormName.map((fieldName) => {
      const formField = cardFormObj[fieldName];
      if (fieldName === "region") {
        const regionVal = JSON.parse(formField.value);
        addressJson = {
          ...addressJson,
          region: {
            region_code: regionVal.id,
            region: regionVal.region,
            region_id: regionVal.id,
          },
        };
      } else {
        addressJson = { ...addressJson, [fieldName]: formField.value };
      }
      return addressJson;
    });

    if (cardFormObj.checkValidity()) {
      CSCreateToken(addressJson);
    } else {
      setValidated(false);
    }
  };

  // ------- watching country change -------
  useEffect(() => {
    if (selectedCountry) {
      getStateListFn({ variables: { id: selectedCountry } }).then(
        ({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        },
      );
    }
  }, [selectedCountry]);

  // ---- To call the saed cart address list ----
  useEffect(() => {
    generateCyberSourceKeyFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
    getCardTypes();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding acc-card pt-0">
        <Row className="align-items-start">
          {/* sidebar start */}
          <Col
            xl
            className={`acc-account-sidebar pt-xl-5 ${
              isSticky ? "sticky" : ""
            }`}
          >
            <AccountSidebar />
          </Col>
          {/* sidebar end */}

          {/* content start */}
          <Col xl className="acc-account-content pt-xl-5">
            <header className="mb-3">
              <h1 className="text-uppercase mb-0">Add New Card</h1>
            </header>
            {stateList ? (
              <Form
                ref={cardForm}
                name="cardForm"
                validated={validated}
                onSubmit={cardFormSubmit}
              >
                {/* contact information start */}
                <article className="mb-3">
                  <header
                    className={`mb-3 border-medium pb-2 ${
                      windowObj && windowSize.width > 1024
                        ? "border-bottom"
                        : ""
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
                        type="text"
                        required
                        pattern="^\S+(\s\S+)*$"
                        name="firstname"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      />
                      <Form.Control.Feedback>
                        Error Message
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
                        pattern="^\S+(\s\S+)*$"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      />
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* company */}
                    <Form.Group as={Col} sm={12}>
                      <Form.Label>Company</Form.Label>
                      <Form.Control
                        type="text"
                        name="company"
                        pattern="^\S+(\s\S+)*$"
                      />
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* street address */}
                    <Form.Group as={Col} sm={12}>
                      <Form.Label>
                        Street Address
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        className="mb-2"
                        required
                        pattern="^\S+(\s\S+)*$"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      />
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* country */}
                    <Form.Group as={Col} sm={6} md={4}>
                      <Form.Label>
                        Country
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="country_id"
                        required
                        onChange={(e) => {
                          setCountry(e.target.value);
                        }}
                      >
                        {countryList.map((cnt) => (
                          <option
                            key={cnt.country_name}
                            value={cnt.country_code}
                          >
                            {cnt.country_name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* state */}
                    <Form.Group as={Col} sm={6} md={4}>
                      <Form.Label>
                        State/Province
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control as="select" name="region" required>
                        {stateList.map((state) => (
                          <option
                            key={state.id}
                            value={JSON.stringify({
                              id: state.id,
                              region: state.name,
                            })}
                          >
                            {state.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* city */}
                    <Form.Group as={Col} sm={6} md={4}>
                      <Form.Label>
                        City
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        pattern="^\S+(\s\S+)*$"
                        name="city"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      />
                      <Form.Control.Feedback>
                        Error Message
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
                        name="postcode"
                        required
                        pattern="^\S+(\s\S+)*$"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      />
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* telephone */}
                    <Form.Group as={Col} sm={12} md={6}>
                      <Form.Label>
                        Telephone
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        required
                        pattern="^\S+(\s\S+)*$"
                        name="telephone"
                        onBlur={validationFormField}
                        onKeyUp={validationFormField}
                      />
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                </article>

                {/* contact information end */}

                {/* card information start */}
                <article>
                  <header
                    className={`mb-3 border-medium pb-2 ${
                      windowObj && windowSize.width > 1024
                        ? "border-bottom"
                        : ""
                    }`}
                  >
                    <h2 className="text-uppercase mb-0">Card Information</h2>
                  </header>
                  <Form.Row>
                    {/* card type */}
                    <Form.Group as={Col} sm={6}>
                      <Form.Label>
                        Credit Card Type
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <Form.Control
                        name="cc_type"
                        as="select"
                        required
                        value={cardType}
                        onChange={typeHandler}
                      >
                        <option key="none" value="">
                          --- Select a card type ---
                        </option>
                        {cardTypeList.map((item) => (
                          <option key={item.code} value={item.code}>
                            {item.name}
                          </option>
                        ))}
                      </Form.Control>
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* card number */}
                    <Form.Group as={Col} sm={6}>
                      <Form.Label>
                        Credit Card Number
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          className="cardNumber"
                          name="cc_number"
                          required
                          value={cardNumber}
                          onChange={(e) => {
                            setCardNumber(e.target.value);
                          }}
                          pattern={`.{${minLength},${maxLength}}`}
                          onBlur={validationFormField}
                          onKeyUp={validationFormField}
                        />
                        <InputGroup.Append className="cardPosition">
                          {cardType === "VI" ? <FaCcVisa /> : ""}
                          {cardType === "AE" ? <FaCcAmex /> : ""}
                          {cardType === "MC" ? <FaCcMastercard /> : ""}
                          {cardType === "DI" ? <FaCcDiscover /> : ""}
                          {cardType === "" ? <FaCreditCard /> : ""}
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Control.Feedback>Message</Form.Control.Feedback>
                    </Form.Group>

                    {/* expiration date */}
                    <Form.Group as={Col} sm={6}>
                      <Form.Label>
                        Expiration Date
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          name="cc_exp_month"
                          as="select"
                          value={cardMonth}
                          required
                          onChange={(e) => {
                            setCardMonth(e.target.value);
                          }}
                        >
                          <option key="null" value="">
                            -- select month --
                          </option>
                          {monthList.map((item) => (
                            <option key={item + item} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control
                          className="rounded-right"
                          name="cc_exp_year"
                          as="select"
                          value={cardYear}
                          required
                          onChange={(e) => {
                            setCardYear(e.target.value);
                          }}
                        >
                          <option key="null" value="">
                            -- select year --
                          </option>
                          {yearList.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </Form.Control>
                        <Form.Control
                          name="website_id"
                          type="number"
                          defaultValue="1"
                          hidden
                        />
                      </InputGroup>
                      <Form.Control.Feedback>
                        Error Message
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* CVV number */}
                    <Form.Group as={Col} xs={6}>
                      <Form.Label>
                        CVV Number
                        <span className="text-danger"> *</span>
                      </Form.Label>
                      <InputGroup>
                        {cardType === "AE" ? (
                          <Form.Control
                            name="cc_cid"
                            type="password"
                            pattern=".{4,4}"
                            required
                            value={cvv}
                            onChange={(e) => {
                              setCvv(e.target.value);
                            }}
                            onBlur={validationFormField}
                            onKeyUp={validationFormField}
                          />
                        ) : (
                          <Form.Control
                            name="cc_cid"
                            type="password"
                            pattern=".{3,3}"
                            required
                            value={cvv}
                            onChange={(e) => {
                              setCvv(e.target.value);
                            }}
                            onBlur={validationFormField}
                            onKeyUp={validationFormField}
                          />
                        )}
                        <InputGroup.Append>
                          <OverlayTrigger
                            placement="top"
                            trigger="focus"
                            overlay={
                              <Tooltip>
                                Card Verification Number Visual Reference
                              </Tooltip>
                            }
                          >
                            <Button variant="outline-dark">
                              <FaQuestion />
                            </Button>
                          </OverlayTrigger>
                        </InputGroup.Append>
                      </InputGroup>
                      <Form.Control.Feedback>Message</Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                </article>
                {/* card information end */}
                <Button
                  type="submit"
                  variant="secondary"
                  className={`text-uppercase ${
                    windowObj && windowSize.width <= 767
                      ? "btn-block"
                      : "btn-lg"
                  }`}
                >
                  Save Card
                </Button>
              </Form>
            ) : (
              ""
            )}
          </Col>
          {/* content end */}
        </Row>
      </Container>

      {/* Session modal start */}
      <Modal
        show={sessionModalOpen}
        dialogClassName="acc-custom-modal"
        bsclass="my-modal"
        size="md"
        backdrop="static"
        centered
      >
        {/* modal body start */}
        <Modal.Body className="p-2 text-center border border-primary">
          <h5 className="text-center pt-5 text-dark font-weight-bold pb-3">
            {" "}
            Your session will expire shortly. Once it does you will be logged
            out for security.{" "}
          </h5>
          <Button
            variant="primary"
            className="btn-lg mb-5"
            onClick={() => {
              router.reload();
            }}
          >
            I’m Still Here
          </Button>
        </Modal.Body>
        {/* modal body end */}
      </Modal>
      {/* Session modal end */}

      <EmailSubscription />
      {stateListLoading || hashCardLoading ? <LoadingIndicator /> : ""}
    </>
  );
};
export default AddCard;
