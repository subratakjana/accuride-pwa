import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { useContext, useState, useEffect, useMemo } from "react";
import { LoadingIndicator } from "@Components/Utilities";
import { useQuery, useManualQuery } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import DistributorsDetails from "@Graphql/queries/getDistributors.graphql";
import AttributesValue from "@Graphql/queries/getDistributorAttribute.graphql";
import FilterDistributors from "@Graphql/queries/filterDistributor.graphql";
import FilterDistributorswithLocation from "@Graphql/queries/filterDistributorByLocation.graphql";
import dynamic from "next/dynamic";
import { PlaceAutocompleteClassic } from "@Components/GoogleMap/Autocomplete";

const FilterData = dynamic(
  () => import("@Components/DistributorFilter/FilterResult/FilterData"),
);
const GoogleMap = dynamic(
  () => import("@Components/DistributorFilter/FilterResult/googleMap"),
);

const DistributorFilterResult = () => {
  const [cats, setCats] = useState("");
  const [catsLabel, setCatLabel] = useState("null");
  const [regions, setRegions] = useState("");
  const [loader, setLoader] = useState(false);
  const [provinces, setProvinces] = useState("");
  const [statetype, setStateType] = useState("");
  const [states, setStates] = useState("");
  const [radius, setRadius] = useState("");
  const [curlat, setCurLat] = useState("");
  const [curlng, setCurLng] = useState("");
  const [filterRows, setFilterRows] = useState([]);
  const showPosition = (position) => {
    const currentLattitude = position.coords.latitude;
    const currentLongitude = position.coords.longitude;
    setCurLng(currentLongitude);
    setCurLat(currentLattitude);
  };
  const showLoader = (getId) => {
    setLoader(true);
    document.getElementById(getId).classList.remove("loader--hide");
  };
  const hideLoader = (getId) => {
    setLoader(false);
    document.getElementById(getId).classList.add("loader--hide");
  };

  if (global.navigator) navigator.geolocation.getCurrentPosition(showPosition);

  const MilesArr = [1, 3, 5, 10, 15, 50, 100, 500];
  let distributorsContent = [];
  let distributorCat = [];
  let distributorState = [];
  let distributorRegion = [];
  let distributorProvience = [];
  const { notify } = useContext(AuthContext);

  // API Call for distributor details
  const {
    loading: DALoading,
    error: DLerror,
    data: DLdata,
  } = useQuery(DistributorsDetails.loc.source.body, {
    fetchPolicy: "cache-and-network",
  });

  // API Call for distributor Attributes
  const { error: DAerror, data: DAdata } = useQuery(
    AttributesValue.loc.source.body,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        attributeId: 3,
      },
    },
  );

  // API Call for distributor State
  const { error: DA2error, data: DA2data } = useQuery(
    AttributesValue.loc.source.body,
    {
      fetchPolicy: "cache-and-network",
      variables: {
        attributeId: 4,
      },
    },
  );

  // API Call for distributor region
  const { data: DA3data } = useQuery(AttributesValue.loc.source.body, {
    fetchPolicy: "cache-and-network",
    variables: {
      attributeId: 5,
    },
  });

  // API Call for distributor region
  const { data: DA4data } = useQuery(AttributesValue.loc.source.body, {
    fetchPolicy: "cache-and-network",
    variables: {
      attributeId: 6,
    },
  });

  if (DLdata) distributorsContent = DLdata.getDistributors;
  if (DAdata) distributorCat = DAdata.getDistributorsAttributesById;
  if (DA2data) distributorState = DA2data.getDistributorsAttributesById;
  if (DA3data) distributorRegion = DA3data.getDistributorsAttributesById;
  if (DA4data) distributorProvience = DA4data.getDistributorsAttributesById;

  const filterCategory = (event) => {
    showLoader("loaderDiv");
    let optionText = event.target.options[event.target.selectedIndex].text;
    setCats([event.target.value]);
    if (optionText === "All" || optionText === "Select Industry") {
      optionText = "null";
    }
    setCatLabel(optionText);
  };

  const filterState = (event) => {
    showLoader("loaderDiv");
    const val = event.target.value;
    setStateType([val]);
    const getValArr = val.split("_");
    const getVal = getValArr[1];
    const type = getValArr[0];
    if (type === "region") {
      setRegions([getVal]);
      setStates([""]);
      setProvinces([""]);
    } else if (type === "province") {
      setProvinces([getVal]);
      setStates([""]);
      setRegions([""]);
    } else {
      setStates([getVal]);
      setProvinces([""]);
      setRegions([""]);
    }

    if (getVal !== "") {
      document.querySelector("input.storeLocatorAutocomplete").value = "";
    }
  };
  const filterRadius = (event) => {
    showLoader("loaderDiv");
    setRadius([event.target.value]);
  };

  const filterZipCode = (event) => {
    showLoader("loaderDiv");
    setStateType([""]);
    setStates([""]);
    setRegions([""]);
    setProvinces([""]);
    if (event.geometry) {
      const latitude = event.geometry.location.lat();
      const longitude = event.geometry.location.lng();
      setCurLat(latitude);
      setCurLng(longitude);
    }
  };
  const zipCodeOnChange = () => {};

  let useLoc = false;
  const whereStr = useMemo(() => {
    if (states !== "" && states[0] !== "") {
      return `attribute_id[]=3&attribute_id[]=4&attribute_id[]=5&attribute_id[]=6&option[4]=${states}&option[3]=${
        cats.length === 0 || cats[0] === "3" ? "" : cats[0]
      }&radius=${radius}&`;
    } else if (regions !== "" && regions[0] !== "") {
      return `attribute_id[]=3&attribute_id[]=4&attribute_id[]=5&attribute_id[]=6&option[5]=${regions}&option[3]=${
        cats.length === 0 || cats[0] === "3" ? "" : cats[0]
      }&radius=${radius}`;
    } else if (provinces !== "" && provinces[0] !== "") {
      return `attribute_id[]=3&attribute_id[]=4&attribute_id[]=5&attribute_id[]=6&option[6]=${provinces}&option[3]=${
        cats.length === 0 || cats[0] === "3" ? "" : cats[0]
      }&radius=${radius}`;
    } else {
      if (!radius) useLoc = true;
      return `lat=${curlat}&lng=${curlng}&radius=${radius}&industry=${
        cats[0] === "3" ? "" : cats
      }`;
    }
  }, [cats, curlat, curlng, provinces, radius, regions, states]);
  const [getFilterWithLocationCat] = useManualQuery(
    FilterDistributorswithLocation.loc.source.body,
    {
      variables: { qryStr: whereStr },
      onSuccess: (data) => {
        const res = data.data;
        const getData = res.filterDistributorsByLocation;
        if (getData && getData.length > 0 && getData[0].items) {
          setFilterRows(res.filterDistributorsByLocation);
        }
        if (document.getElementById("loaderDiv")) {
          hideLoader("loaderDiv");
        }
      },
      skipCache: true,
    },
  );
  const [getFilterCat] = useManualQuery(FilterDistributors.loc.source.body, {
    variables: { qryStr: whereStr },
    // fetchPolicy: "cache-and-network",
    onSuccess: (data) => {
      const res = data.data;
      const getData = res.filterDistributorsByAttribute;
      if (getData && getData.length > 0 && getData[0].items) {
        setFilterRows(res.filterDistributorsByAttribute);
      }
      if (document.getElementById("loaderDiv")) {
        hideLoader("loaderDiv");
      }
    },
    skipCache: true,
  });
  useEffect(() => {
    (useLoc ? getFilterWithLocationCat : getFilterCat)().then(({ error }) => {
      if (error) {
        if (document.getElementById("loaderDiv")) {
          hideLoader("loaderDiv");
        }
      }
    });
  }, [whereStr, loader]);

  if (DLerror || DAerror || DA2error) {
    notify(DLerror.message, "error");
    return <h2>No data found</h2>;
  }
  if (DALoading) return <LoadingIndicator />;
  if (distributorState && distributorState.length > 0) {
    distributorState[0].options.sort((a, b) => {
      const fa = a.label.toLowerCase();
      const fb = b.label.toLowerCase();
      if (fa < fb) return -1;
      if (fa > fb) return 1;
      return 0;
    });
  }
  return (
    <>
      <section>
        <div className="acc-fullLoader loader--hide" id="loaderDiv">
          <Spinner animation="grow" variant="primary" />
        </div>
        <Container>
          <Row>
            <Col lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Control
                  as="select"
                  name="category"
                  value={cats}
                  onChange={filterCategory}
                >
                  <option value="">Select Industry</option>
                  {distributorCat && distributorCat.length > 0
                    ? distributorCat[0].options.map((items, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <option key={`enumcat_${index}`} value={items.value}>
                          {items.label}
                        </option>
                      ))
                    : ""}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col lg={4}>
              <div className="d-lg-flex align-items-center">
                <Form.Group
                  className="m-0"
                  controlId="exampleForm.ControlSelect2"
                >
                  <Form.Control
                    as="select"
                    value={statetype}
                    name="state"
                    onChange={filterState}
                  >
                    <option value="">Select State</option>
                    <optgroup label="State">
                      {distributorState[0]
                        ? distributorState[0].options.map((items) => (
                            <option
                              key={`enumstate_${items.value}`}
                              value={`state_${items.value}`}
                            >
                              {items.label}
                            </option>
                          ))
                        : ""}
                    </optgroup>
                    <optgroup label="Region">
                      {distributorRegion[0]
                        ? distributorRegion[0].options.map((items) => (
                            <option
                              key={`enumregion_${items.value}`}
                              value={`region_${items.value}`}
                            >
                              {items.label}
                            </option>
                          ))
                        : ""}
                    </optgroup>
                    <optgroup label="Province">
                      {distributorProvience[0]
                        ? distributorProvience[0].options.map((items) => (
                            <option
                              key={`enumprovience_${items.value}`}
                              value={`province_${items.value}`}
                            >
                              {items.label}
                            </option>
                          ))
                        : ""}
                    </optgroup>
                  </Form.Control>
                </Form.Group>
                <span className="px-2 d-block py-2 text-center py-lg-0">
                  {" "}
                  OR{" "}
                </span>
                <PlaceAutocompleteClassic onPlaceSelect={filterZipCode} />
              </div>
            </Col>
            <Col lg={4}>
              <Form.Group controlId="exampleForm.ControlSelect3">
                <Form.Control
                  as="select"
                  name="radius"
                  value={radius}
                  onChange={filterRadius}
                >
                  <option>Miles From My Location</option>
                  {MilesArr
                    ? MilesArr.map((dataItems) => (
                        <option key={`milesList_${dataItems}`}>
                          {dataItems}
                        </option>
                      ))
                    : ""}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="section-padding acc-distrib-details-area">
        <Container>
          <Row className="justify-content-between">
            <Col lg={4} md={6} className="pb-4 pb-md-0 order-2 order-xl-1">
              <FilterData
                filterRows={filterRows}
                distributorsContent={distributorsContent}
              />
            </Col>
            <Col
              lg={8}
              md={6}
              className="pb-4 pb-md-0 disti-map-area order-1 order-xl-2"
            >
              <GoogleMap
                distributorsContent={distributorsContent}
                locations={filterRows}
                catsLabel={catsLabel}
                // lat={lat}
                // lng={lng}
              />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default DistributorFilterResult;
