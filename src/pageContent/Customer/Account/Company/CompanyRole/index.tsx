import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import { useMutation, useManualQuery } from "graphql-hooks";
import { getCompanyRole } from "@Graphql/queries/getCompanyRole.graphql";
import { updateCompanyRole } from "@Graphql/queries/updateCompanyRole.graphql";
import { deleteCompanyRole } from "@Graphql/queries/deleteCompanyRole.graphql";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import { MdClear } from "react-icons/md";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const CompanyRole = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [getConpanyRoles, setGetCompanyRoles] = useState([]);
  const [UpdateCompanyRoleFn] = useMutation(updateCompanyRole.loc.source.body, {
    onSuccess: (data) => {
      getCompanyRoleFn({
        variables: {
          identifier: "home",
        },
      });
      if (data) {
        notify("Company role successfully updated..", "success");
      }
      setModalShow(false);
    },
  });
  const { decode, notify } = useContext(AuthContext);
  const [deleteRole, setDeleteRole] = useState(false);
  const [deleteCompanyRoleFN, { loading: deleteRoleLoad }] = useMutation(
    deleteCompanyRole.loc.source.body,
    {
      onSuccess: (data) => {
        if (data) {
          const response = data;
          setDeleteRole(false);
          if (response.data && response.data.deleteCompanyRole.success) {
            setDeleteRole(false);
            getCompanyRoleFn({
              variables: {
                identifier: "home",
              },
            });
            notify(
              "The Company role has been successfully deleted...",
              "success",
            );
          } else {
            notify("Sorry, This role is already assigned", "warn");
          }
        }
      },
    },
  );

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
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);
  // console.log(pathSegments, "products router url");
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
      name: "Company Role",
    },
  ];
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const [getCompanyRoleFn, { loading: roleLoading }] = useManualQuery(
    getCompanyRole.loc.source.body,
    {
      skipCache: true,
      onSuccess: (res) => {
        const { data } = res;
        setGetCompanyRoles(data.company.roles.items);
      },
    },
  );
  const [modalShow, setModalShow] = useState(false);
  const [editVal, setEditVal] = useState(null);
  const onModalShow = (role) => {
    setEditVal(role);
    setModalShow(true);
  };
  const onModalExiting = () => {
    setModalShow(false);
  };

  const confirmDelete = (data) => {
    setDeleteRole(data);
  };

  /**
   * confirm delete team
   */
  const confirmDeleteRole = () => {
    deleteCompanyRoleFN({
      variables: {
        id: deleteRole.id,
      },
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

  useEffect(() => {
    getCompanyRoleFn({
      variables: {
        identifier: "home",
      },
    });
  }, []);
  const companyRoleTreeFn = (permissionsArr) => {
    let allRoles = "";
    return "All";
  };

  // table columns settings or options
  const columns = [
    {
      name: "Role",
      selector: "name",
      sortable: true,
      grow: 3,
    },
    {
      name: "Permissions",
      selector: "permissions",
      sortable: true,
      grow: 3,
      cell: (row) => <span>{companyRoleTreeFn(row.permissions[0])}</span>,
    },
    {
      name: "Users",
      selector: "users_count",
      sortable: true,
      grow: 3,
    },
    {
      name: "Action",
      selector: "name",
      sortable: true,
      hide: "sm",
      cell: (row) => (
        <>
          <Button
            onClick={() => onModalShow(row)}
            variant="link"
            className="p-0 mr-2"
          >
            Edit
          </Button>
          <Button
            onClick={() => confirmDelete(row)}
            variant="link"
            className="p-0"
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  // table expandable row content
  const ExpanableComponent = (row) => (
    <Row>
      <Col sm={6} md={4} className="mb-2">
        <strong>ID: </strong>
        <span>{decode(row.data.id)}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Role: </strong>
        <span>{row.data.name}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Users: </strong>
        <span>{row.data.users_count !== "" ? row.data.users_count : "0"}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Action: </strong>
        <Button
          onClick={() => onModalShow(row.data)}
          variant="link"
          className="p-0 mr-2"
        >
          Edit
        </Button>
        <Button
          onClick={() => confirmDelete(row.data)}
          variant="link"
          className="p-0"
        >
          Delete
        </Button>
      </Col>
    </Row>
  );

  // table paginatyion
  const paginationOptions = {
    rowsPerPageText: "",
    rangeSeparatorText: "of",
  };

  const isExpanded = (row) => row.defaultExpanded;
  getConpanyRoles.map((item) => {
    const companyRole = item;
    companyRole.defaultExpanded = true;
    return companyRole;
  });
  const UpdateRoleName = (event) => {
    event.preventDefault();
    const accountForm = event.currentTarget;
    let getName = "";
    let getId = "";
    for (let i = 0; i < accountForm.elements.length;) {
      const field = accountForm.elements[i];
      const formField = field.name;
      if (formField.length > 0) {
        if (formField === "name") {
          getName = field.value;
        }
        if (formField === "id") {
          getId = field.value;
        }
      }
      i += 1;
    }
    UpdateCompanyRoleFn({
      variables: { id: getId, name: getName },
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
      targetObj.type === "text"
    ) {
      targetObj.value = "";
    }
    targetObj.value = targetObj.value.replace(/\s{2,}/g, " ");
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
  };

  if (deleteRoleLoad) return <LoadingIndicator />;

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding pt-0">
        <Row className="align-items-start">
          {/* sidebar start */}
          <Col
            xl
            className={`acc-account-sidebar pt-xl-5 ${isSticky ? "sticky" : ""
              }`}
          >
            <AccountSidebar />
          </Col>
          {/* sidebar end */}

          {/* content start */}
          <Col xl className="acc-account-content pt-xl-5">
            <header className="mb-3">
              <h1 className="text-uppercase mb-0">Roles and Permissions</h1>
            </header>
            <section className="customer-user-filter">
              <I18nLink
                href="/customer/account/company/addcompanyrole"
                isMagentoRoute={0}
              >
                <Button
                  type="button"
                  variant="primary"
                  className={`text-uppercase mt-4 ${windowObj && windowSize.width < 480 ? "btn-block mb-4" : ""
                    }`}
                >
                  Add New Role
                </Button>
              </I18nLink>
              <DataTable
                noHeader
                columns={columns}
                data={getConpanyRoles}
                className="acc-custom-datatable"
                pagination={getConpanyRoles.length > 12}
                paginationPerPage={12}
                highlightOnHover
                expandableRows={!(windowObj && windowSize.width > 1024)}
                expandableRowDisabled={(row) => row.disabled}
                expandableRowsComponent={<ExpanableComponent />}
                paginationComponentOptions={paginationOptions}
                expandableRowExpanded={isExpanded}
                responsive={false}
                paginationRowsPerPageOptions={[12, 24, 48]}
              />
              {roleLoading ? <LoadingIndicator /> : ""}
            </section>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      <EmailSubscription />
      {/* Edit Team Modal */}
      <Modal
        show={modalShow}
        centered
        size="xs"
        animation
        onHide={onModalExiting}
      >
        <Modal.Header className="bg-lightest-primary customer-details-header pb-2">
          <Modal.Title>Company Role Edit</Modal.Title>
          <Button
            variant="link"
            onClick={onModalExiting}
            className="modal-close"
          >
            <MdClear />
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-lightest-primary customer-details-body pb-3">
          <Form
            className="customer-details-form pt-3"
            onSubmit={UpdateRoleName}
          >
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label className="font-size-md text-dark-gray">
                  Role
                </Form.Label>
                <Form.Control
                  required
                  defaultValue={editVal ? editVal.name : null}
                  name="name"
                  type="text"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                />
                <Form.Control
                  defaultValue={editVal ? editVal.id : null}
                  name="id"
                  type="hidden"
                />
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal
        show={deleteRole.defaultExpanded}
        centered
        size="xs"
        animation
        onHide={() => setDeleteRole(false)}
      >
        <Modal.Body className="bg-lightest-primary customer-details-body pb-3">
          <p>Are you sure want to delete the role</p>
          <div className="d-flex">
            <Button
              className="mr-2"
              onClick={() => setDeleteRole(false)}
              variant="primary"
              type="submit"
            >
              Cancel
            </Button>
            <Button
              onClick={() => confirmDeleteRole()}
              variant="primary"
              type="submit"
            >
              Ok
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CompanyRole;
