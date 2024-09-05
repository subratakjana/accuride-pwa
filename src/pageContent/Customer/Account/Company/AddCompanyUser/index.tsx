import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { LoadingIndicator } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation, useManualQuery } from "graphql-hooks";
import { getCompanyTeamAndRoles } from "@Graphql/queries/getCompanyTeamAndRoles.graphql";
import { createCompanyUser } from "@Graphql/queries/createCompanyUser.graphql";
import { updateCompanyUser } from "@Graphql/queries/updateCompanyUser.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);

const AddCompanyUser = (props) => {
  const { notify, encode } = useContext(AuthContext);
  const { isEdit, editUser, setModalShow } = props;
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [getRoles, setGetRoles] = useState([]);
  const [getTeams, setGetTeams] = useState([]);
  const [validated, setValidated] = useState(false);
  const [defaultRole, setDefaultRole] = useState();
  const [CreateCompanyUserFn, { loading: loadingSubmitForm }] = useMutation(
    createCompanyUser.loc.source.body,
    {
      onSuccess: (data) => {
        if (data) {
          const response = data;
          if (response.data.createCompanyUser.user.customer_id) {
            notify("Company user successfully created..", "success");
            router.back();
          }
        }
      },
    },
  );
  const [UpdateCompanyUserFn, { loading: loadingUpdateForm }] = useMutation(
    updateCompanyUser.loc.source.body,
    {
      onSuccess: (data) => {
        if (data) {
          const response = data;
          if (response) {
            if (response.data.updateCompanyUser.user.customer_id) {
              notify("Company user successfully updated..", "success");
              setModalShow(false);
            }
          }
        }
      },
    },
  );
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
  let crumbs = [];
  if (pathSegments[pathSegments.length - 1] === "addcompanyuser") {
    crumbs = [
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
        name: "Add Company User",
      },
    ];
  }
  // API calling to get the company roles
  const [getTeamAndRolesFn, { loading: loadingTeamRoles }] = useManualQuery(
    getCompanyTeamAndRoles.loc.source.body,
    {
      skipCache: true,
      onSuccess: (res) => {
        const { data } = res;
        const { items } = data.company.roles;
        setGetRoles(items);
        const companyTeamsData = data.company.structure.items;
        const getAllData = companyTeamsData
          ? companyTeamsData.filter(
              (item) => item.entity.__typename === "CompanyTeam",
            )
          : [];
        setGetTeams(getAllData);
      },
    },
  );

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    if (
      targetObj.required &&
      targetObj.value.trim() === "" &&
      (targetObj.type === "text" ||
        targetObj.type === "textarea" ||
        targetObj.type === "select-one")
    ) {
      targetObj.value = "";
    }
    targetObj.value = targetObj.value.replace(/\s{2,}/g, " ");
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
    if (targetObj.name === "telephone") {
      targetObj.value = targetObj.value.replace(/[^0-9]/g, "");
    }
  };

  const updateCustomar = (newFormData) => {
    const encodeId = encode(JSON.stringify(editUser.id));
    UpdateCompanyUserFn({
      variables: { updateInput: { ...newFormData, id: encodeId } },
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

  const createCustomer = (newFormData) => {
    CreateCompanyUserFn({
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

  const createCompanyUserForm = (event) => {
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
    newFormData = { ...newFormData };
    newFormData = { ...newFormData };
    if (!isEdit) createCustomer(newFormData);
    else updateCustomar(newFormData);
  };
  const setdefaultRole = () => {
    let selectId = "";
    const roleS = getRoles.filter((item) => item.name === editUser.role);
    if (roleS.length > 0) selectId = roleS[0].id;
    setDefaultRole(selectId);
  };
  useEffect(() => {
    if (getRoles.length === 0) {
      getTeamAndRolesFn().then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
        }
      });
    }
    if (isEdit) setdefaultRole();
  }, [getRoles, isEdit]);
  return (
    <>
      {/* <Head>
                <title>Company Users</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head> */}
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding pt-0">
        <Row className="align-items-start">
          {/* sidebar start */}
          {!isEdit && (
            <Col
              xl
              className={`acc-account-sidebar pt-xl-5 ${
                isSticky ? "sticky" : ""
              }`}
            >
              <AccountSidebar />
            </Col>
          )}

          {/* sidebar end */}
          {/* content start */}
          <Col xl className={`${!isEdit ? "acc-account-content" : ""} pt-xl-5`}>
            {!isEdit && (
              <header className="mb-3">
                <h1 className="text-uppercase mb-0">Add Company User</h1>
              </header>
            )}
            <Form
              name="createCompanyUser"
              validated={validated}
              onSubmit={createCompanyUserForm}
            >
              <Form.Row>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>
                    Job Title
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    name="job_title"
                    type="text"
                    required
                    defaultValue={isEdit ? editUser.job_title : ""}
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} sm={6} xl={6}>
                  <Form.Label>
                    User Role
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    name="role_id"
                    as="select"
                    required
                  >
                    <option value="">Select Role</option>
                    {getRoles.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                        selected={isEdit ? item.name === editUser.role : ""}
                      >
                        {item.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>
                    First Name
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    required
                    name="firstname"
                    type="text"
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    defaultValue={isEdit ? editUser.firstname : ""}
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>
                    Last Name
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    name="lastname"
                    type="text"
                    required
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    defaultValue={isEdit ? editUser.lastname : ""}
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={6}>
                  <Form.Label>
                    Company Email
                    <span className="text-danger"> *</span>
                  </Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    required
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    defaultValue={isEdit ? editUser.email : ""}
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={6} xl={6}>
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
                    pattern="^\S+(\s\S+)*$"
                    defaultValue={isEdit ? editUser.telephone : ""}
                  />
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} sm={6} xl={6}>
                  <Form.Label>Status</Form.Label>
                  <Form.Control
                    onBlur={validationFormField}
                    onKeyUp={validationFormField}
                    name="status"
                    as="select"
                    // defaultValue={isEdit ? editUser.status.toUpperCase() : ""}
                    defaultValue={
                      isEdit ? [editUser.status.toUpperCase() === 'ACTIVE' ? 'ACTIVE' : 'INACTIVE'] : ""
                    }
                  >
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </Form.Control>
                  <Form.Control.Feedback>Message</Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              {!isEdit ? (
                <Button
                  type="submit"
                  variant="primary"
                  className={`text-uppercase ${
                    windowObj && windowSize.width < 480 ? "btn-block" : "mt-0"
                  }`}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className={`text-uppercase ${
                    windowObj && windowSize.width < 480 ? "btn-block" : "mt-0"
                  }`}
                >
                  Update
                </Button>
              )}
            </Form>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      {(loadingTeamRoles && !loadingTeamRoles) ||
      loadingSubmitForm ||
      loadingUpdateForm ? (
        <LoadingIndicator />
      ) : (
        ""
      )}
    </>
  );
};

export default AddCompanyUser;
