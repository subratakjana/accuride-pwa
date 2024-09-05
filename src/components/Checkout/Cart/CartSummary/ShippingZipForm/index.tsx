import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useManualQuery } from "graphql-hooks";
import { MdWarning } from "react-icons/md";
import { LoadingIndicator } from "@Components/Utilities";
import { useRouter } from "next/router";
import { Accordion, Card, Button, Form, Col } from "react-bootstrap";
import GET_STATELIST_BY_COUNTRY from "@Graphql/queries/getStateList.graphql";
import globalData from "@Components/Utilities/globalData";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const ShippingMethod = dynamic(
  () => import("../../../Shipping/ShippingMethod"),
);

const ShippingZipForm = (props) => {
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const {
    refreshCount,
    shippingConfigData,
    setShippingAmount,
    setGlobalLoader,
    setCartSummaryLoader,
  } = props;
  const [accordion, setState] = useState({ activeKey: "0" });
  const [countryList] = useState(globalData.countryList);
  const [selectedCountry, setContSlct] = useState(
    shippingConfigData
      ? shippingConfigData.country_id
      : countryList[0].country_code,
  );
  const [FedxList, setFedxList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [shippingMethodLoader, setShippingMethodLoader] = useState(false);
  const [selectedState, setStateSlct] = useState(
    shippingConfigData
      ? {
          id: shippingConfigData.region_id,
          code: shippingConfigData.region_code,
          name: shippingConfigData.region,
        }
      : {},
  );
  const [selectedPin, setPinSlct] = useState(
    shippingConfigData ? shippingConfigData.postcode : "",
  );
  const [getStore, setGetStore] = useState(
    router.query.zone_lang === "en-ca" ? "canada" : "default",
  );
  const { token, notify, cartId } = useContext(AuthContext);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  /**
   * state list query function
   */
  const [getStateListFn] = useManualQuery(
    GET_STATELIST_BY_COUNTRY.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );

  // ----------- get shipping total after selecting quote for shipping and tax -----------
  const getShippingQuoteTotal = (choosendMode) => {
    setCartSummaryLoader(true);
    if (selectedState === undefined) return;
    const link =
      token !== null
        ? `${process.env.NEXT_PUBLIC_REST_API}/${getStore}/V1/carts/mine/totals-information`
        : `${process.env.NEXT_PUBLIC_REST_API}/${getStore}/V1/guest-carts/${cartId}/totals-information`;

    let shipQury;
    if (choosendMode === "blank") {
      const targetObj = document.querySelectorAll('[name="shipping-method"]');
      if (targetObj.length > 0) {
        for (let i = 0; i < targetObj.length; ) {
          targetObj[i].checked = false;
          i += 1;
        }
      }
      shipQury = {
        addressInformation: {
          address: {
            region_id:
              selectedState && selectedState.id ? selectedState.id : -1,
            region:
              selectedState && selectedState.region_code
                ? selectedState.id
                : "",
            country_id: selectedCountry || "",
            postcode: selectedPin || "",
          },
          shipping_method_code: "",
          shipping_carrier_code: "",
        },
      };
    } else {
      shipQury = {
        addressInformation: {
          address: {
            region_id: selectedState.id,
            region: selectedState.region_code,
            country_id: selectedCountry,
            postcode: selectedPin,
          },
          shipping_method_code: choosendMode.method_code,
          shipping_carrier_code: choosendMode.carrier_code,
        },
      };
    }
    axios
      .post(link, shipQury, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      })
      .then((response) => {
        setCartSummaryLoader(false);
        setGlobalLoader(false);
        if (response.status === 200) {
          setShippingAmount(response.data);
        }
      })
      .catch((error) => {
        setCartSummaryLoader(false);
        setGlobalLoader(false);
        console.log("getShippingQuoteTotal response error axios = ", error);
      });
  };

  // ----------- get quote for shipping and tax -----------
  const getFedxList = () => {
    setCartSummaryLoader(true);
    setShippingMethodLoader(true);
    const link =
      token !== null
        ? `${process.env.NEXT_PUBLIC_REST_API}/${getStore}/V1/carts/mine/estimate-shipping-methods`
        : `${process.env.NEXT_PUBLIC_REST_API}/${getStore}/V1/guest-carts/${cartId}/estimate-shipping-methods`;
    const shipQury = {
      address: {
        region_id: selectedState.id,
        region: selectedState.name,
        region_code: selectedState.code,
        country_id: selectedCountry,
        postcode: selectedPin,
      },
    };
    axios
      .post(link, shipQury, {
        headers: { Authorization: token ? `Bearer ${token}` : "" },
      })
      .then((response) => {
        setShippingMethodLoader(false);
        if (response.status === 200) {
          setFedxList(response.data);
          getShippingQuoteTotal("blank");
          localStorage.setItem(
            "shippingData",
            JSON.stringify(shipQury.address),
          );
        } else {
          setFedxList([]);
        }
      })
      .catch((error) => {
        setShippingMethodLoader(false);
        setCartSummaryLoader(false);
        setGlobalLoader(false);
        console.log("shipping response error axios = ", error);
      });
  };

  const handlerPin = (evt) => {
    setCartSummaryLoader(true);
    setPinSlct(evt.target.value);
  };

  // ------- watching country change -------
  useEffect(() => {
    getStateListFn({ variables: { id: selectedCountry } }).then(
      ({ error, data }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
          return;
        }
        setStateList(data.country.available_regions);
      },
    );
  }, [selectedCountry]);

  // ------- watching state and Pin change -------
  useEffect(() => {
    setShippingMethodLoader(true);
    setCartSummaryLoader(true);
    getFedxList();
  }, [selectedState, selectedPin]);

  // ------- calling function to generate state list -------
  useEffect(() => {
    if (refreshCount) {
      getFedxList();
    }
    if (router.query.zone_lang === "en-ca") {
      setGetStore("canada");
    } else {
      setGetStore("default");
    }
  }, [refreshCount]);

  const accordianClickedEvent = (index) => {
    if (accordion.activeKey !== index) {
      setState({
        ...accordion,
        activeKey: index,
      });
    } else {
      setState({
        ...accordion,
        activeKey: false,
      });
    }
  };

  return (
    <>
      {/* accordion start */}
      <Accordion
        className="acc-custom-accordion acc-estimationform-accordion"
        defaultActiveKey={accordion.activeKey}
      >
        {/* estimate shipping start */}
        <Card>
          <Card.Header
            className={`p-0 ${
              windowObj && windowSize.width > 1024
                ? "border-0"
                : "border-bottom border-medium"
            }`}
          >
            <Accordion.Toggle
              onClick={() => accordianClickedEvent("0")}
              className={`px-0 text-left ${
                windowObj && windowSize.width > 1024
                  ? "bg-transparent"
                  : "bg-white"
              } ${
                accordion.activeKey === "0"
                  ? "text-primary acc-arrow-transform"
                  : "text-dark"
              }`}
              as={Button}
              block
              variant="link"
              eventKey="0"
            >
              Estimate Shipping and Tax
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <>
              <Card.Body className="bg-light px-xl-0 pt-xl-0">
                <span className="d-block mb-3">
                  Enter your destination to get a shipping estimate.
                </span>
                <Form>
                  <Form.Row>
                    {/* country */}
                    <Form.Group
                      as={Col}
                      md={4}
                      xl={12}
                      className="mb-md-0 mb-xl-3"
                    >
                      <Form.Label>Country</Form.Label>
                      {countryList.length > 0 ? (
                        <Form.Control
                          as="select"
                          defaultValue={selectedCountry}
                          onChange={(e) => {
                            setContSlct(e.target.value);
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
                      ) : (
                        ""
                      )}
                    </Form.Group>

                    {/* state */}
                    <Form.Group
                      as={Col}
                      md={4}
                      xl={12}
                      className="mb-md-0 mb-xl-3"
                    >
                      <Form.Label> State/Province </Form.Label>
                      {stateList.length > 0 ? (
                        <Form.Control
                          as="select"
                          defaultValue={
                            selectedState && JSON.stringify(selectedState)
                          }
                          onChange={(e) => {
                            setStateSlct(
                              e.target.value && JSON.parse(e.target.value),
                            );
                          }}
                        >
                          <option key="default" value="">
                            {" "}
                            --- Please Select A State ---{" "}
                          </option>
                          {stateList.map((sts) => (
                            <option
                              key={sts.id}
                              value={JSON.stringify({
                                id: sts.id,
                                code: sts.code,
                                name: sts.name,
                              })}
                            >
                              {sts.name}
                            </option>
                          ))}
                        </Form.Control>
                      ) : (
                        ""
                      )}
                    </Form.Group>

                    {/* zip */}
                    <Form.Group as={Col} md={4} xl={12} className="mb-md-0">
                      <Form.Label>Zip/Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Zip/Postal Code"
                        defaultValue={selectedPin}
                        onChange={handlerPin}
                      />
                      <Form.Text className="text-danger d-none">
                        Error text
                      </Form.Text>
                      {(FedxList.length === 0 ||
                        FedxList.filter((item) => item.error_message !== "")
                          .length > 0) &&
                      selectedPin.length >= 4 ? (
                        <div className="p-3 pl-5 mt-2 text-warning bg-message message warning">
                          <MdWarning className="iconElmnt" />
                          <span>
                            Provided Zip/Postal Code seems to be invalid.
                            Example: 12345-6789; 12345. If you believe it is the
                            right one you can ignore this notice.
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </Form.Group>
                  </Form.Row>
                </Form>
              </Card.Body>
              {FedxList.length > 0 &&
              FedxList.filter((item) => item.error_message === "").length >
                0 ? (
                <ShippingMethod
                  FedxList={FedxList}
                  shippingMode={false}
                  selectFedex={getShippingQuoteTotal}
                  shippingMethodLoader={shippingMethodLoader}
                />
              ) : (
                <span className="d-block px-3 pb-3 px-xl-0 bg-light">
                  This is not a valid
                  <strong> Ship To </strong>
                  address.
                </span>
              )}
            </>
          </Accordion.Collapse>
        </Card>
        {/* estimate shipping end */}
      </Accordion>
      {/* accordion end */}
    </>
  );
};

export default ShippingZipForm;
