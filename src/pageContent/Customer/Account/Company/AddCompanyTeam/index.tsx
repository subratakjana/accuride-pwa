import { Container, Row, Col, Form, Button } from "react-bootstrap";
import React, { useEffect, useState, useContext } from "react";
import { useManualQuery, useMutation } from "graphql-hooks";
import { LoadingIndicator } from "@Components/Utilities";
import { getCompanyTeam } from "@Graphql/queries/getCompanyTeam.graphql";
import { createCompanyTeam } from "@Graphql/queries/createCompanyTeam.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const AddCompanyTeam = () => {
  const router = useRouter();
  const { notify } = useContext(AuthContext);
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [getAllData, setGetAllData] = useState([]);
  const [createCompanyTeamFn] = useMutation(createCompanyTeam.loc.source.body, {
    onSuccess: (data) => {
      if (data) {
        const response = data;
        if (response) {
          if (response.data) {
            notify("Company team successfully created..", "success");
            router.push(
              `/${router.query.zone_lang}/customer/account/company/companyteam`,
            );
          }
        }
      }
    },
  });
  const [validated, setValidated] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

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
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[3]}`,
      name: pathSegments[3],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
      name: "Add Company Team",
    },
  ];
  const [getCompanyTeamFn, { loading: loadingTeamRoles }] = useManualQuery(
    getCompanyTeam.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (res) => {
        const { data } = res;
        const companyTeamsData = data.company.structure.items;
        const allData = companyTeamsData
          ? companyTeamsData.filter(
              (item) => item.entity.__typename === "CompanyTeam",
            )
          : [];
        setGetAllData(allData);
      },
    },
  );

  useEffect(() => {
    getCompanyTeamFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  }, []);

  // For Update Team Name and Description
  const AddTeam = (event) => {
    event.preventDefault();
    const accountForm = event.currentTarget;
    let newFormData = {};
    for (let i = 0; i < accountForm.elements.length; ) {
      const field = accountForm.elements[i];
      const formField = field.name;
      if (formField.length > 0)
        newFormData = { ...newFormData, [formField]: field.value };
      i += 1;
    }
    createCompanyTeamFn({
      variables: { getInput: newFormData },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
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
    if (targetObj.value.trim() === "") {
      targetObj.classList.add("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
  };

  getAllData.map((item) => {
    const companyTeam = item;
    companyTeam.defaultExpanded = true;
    return companyTeam;
  });

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding pt-0">
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
              <h1 className="text-uppercase mb-0">Add Company Team</h1>
            </header>
            <Form
              name="createCompanyTeam"
              validated={validated}
              onSubmit={AddTeam}
            >
              <Form.Row>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>
                    Team Name
                    <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    required
                    pattern="^\S+(\s\S+)*$"
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={12}>
                  <Form.Label>
                    Team Description
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    name="description"
                    as="textarea"
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    rows={3}
                    required
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button
                type="submit"
                variant="primary"
                className={`text-uppercase ${
                  windowObj && windowSize.width < 480 ? "btn-block" : "mt-0"
                }`}
              >
                Submit
              </Button>
            </Form>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      {loadingTeamRoles && !loadingTeamRoles ? <LoadingIndicator /> : ""}
    </>
  );
};

export default AddCompanyTeam;
