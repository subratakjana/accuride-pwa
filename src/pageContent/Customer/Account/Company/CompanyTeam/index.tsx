import { Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import { useManualQuery, useMutation } from "graphql-hooks";
import { getCompanyTeam } from "@Graphql/queries/getCompanyTeam.graphql";
import { updateCompanyTeam } from "@Graphql/queries/updateCompanyTeam.graphql";
import { deleteCompanyTeam } from "@Graphql/queries/deleteCompanyTeam.graphql";

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

const CompanyTeam = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [getAllData, setGetAllData] = useState([]);
  const [getTeamName, setGetTeamName] = useState(null);
  const [deleteTeam, setDeleteTeam] = useState(false);
  const [UpdateCompanyTeamFn] = useMutation(updateCompanyTeam.loc.source.body, {
    onSuccess: (data) => {
      if (data) {
        const response = data;
        if (response) {
          getCompanyTeamFn();
          notify("Company team successfully updated..", "success");
        }
        setModalShow(false);
      }
    },
  });
  const [deleteCompanyTeamFN, { loading: deleteTeamLoad }] = useMutation(
    deleteCompanyTeam.loc.source.body,
    {
      onSuccess: (data) => {
        if (data) {
          const response = data;
          if (response.data && response.data.deleteCompanyTeam.success) {
            setDeleteTeam(false);
            getCompanyTeamFn();
            notify(
              "The Company team has been successfully deleted...",
              "success",
            );
          }
        }
      },
    },
  );
  const { notify } = useContext(AuthContext);
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
  const router = useRouter();
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
      name: "Company Team",
    },
  ];
  const [getCompanyTeamFn, { loading: roleLoading }] = useManualQuery(
    getCompanyTeam.loc.source.body,
    {
      skipCache: true,
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
  // For Modal Close And Open
  const [modalShow, setModalShow] = useState(false);
  const onModalShow = (teamName) => {
    setGetTeamName(teamName);
    setModalShow(true);
  };
  const onModalExiting = () => {
    setModalShow(false);
  };

  const confirmDelete = (data) => {
    setDeleteTeam(data);
  };

  /**
   * confirm delete team
   */
  const confirmDeleteTeam = () => {
    deleteCompanyTeamFN({
      variables: {
        id: deleteTeam.entity.id,
      },
    }).then(({ error }) => {
      setModalShow(false);
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
    getCompanyTeamFn();
  }, []);

  // table columns settings or options
  const columns = [
    {
      name: "Name",
      selector: "entity.name",
      sortable: true,
      grow: 3,
    },
    {
      name: "Description",
      selector: "entity.description",
      sortable: true,
      grow: 3,
    },
    {
      name: "Action",
      selector: "entity.name",
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
      {/* <Col sm={6} md={4} className="mb-2">
                <strong>ID: </strong>
                <span>{decode(row.data.entity.id)}</span>
            </Col> */}
      <Col sm={6} md={4} className="mb-2">
        <strong>Role: </strong>
        <span>{row.data.entity.name}</span>
      </Col>
      {/* <Col sm={6} md={4} className="mb-2">
                <strong>Users: </strong>
                <span>
                    {row.data.entity.users_count !== '' ? row.data.entity.users_count : '—'}
                </span>
            </Col> */}
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
  getAllData.map((item) => {
    const companyTeam = item;
    companyTeam.defaultExpanded = true;
    return companyTeam;
  });

  // For Update Team Name and Description
  const UpdateTeam = (event) => {
    event.preventDefault();
    const accountForm = event.currentTarget;
    let getName = "";
    let getDesc = "";
    let getId = "";
    for (let i = 0; i < accountForm.elements.length; ) {
      const field = accountForm.elements[i];
      const formField = field.name;
      if (formField.length > 0) {
        if (formField === "name") {
          getName = field.value;
        }
        if (formField === "teamDesc") {
          getDesc = field.value;
        }
        if (formField === "id") {
          getId = field.value;
        }
      }
      i += 1;
    }
    UpdateCompanyTeamFn({
      variables: { id: getId, name: getName, description: getDesc },
    }).then(({ error }) => {
      setModalShow(false);
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

  if (deleteTeamLoad) return <LoadingIndicator />;

  return (
    <>
      {/* <Head>
                <title>Company Team</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head> */}
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
              <h1 className="text-uppercase mb-0">Company Team List</h1>
            </header>
            <section className="customer-user-filter">
              <I18nLink
                href="/customer/account/company/addcompanyteam"
                isMagentoRoute={0}
              >
                <Button
                  type="button"
                  variant="primary"
                  className={`text-uppercase mt-4 ${
                    windowObj && windowSize.width < 480 ? "btn-block mb-4" : ""
                  }`}
                >
                  Add New Team
                </Button>
              </I18nLink>
              <DataTable
                noHeader
                columns={columns}
                data={getAllData}
                className="acc-custom-datatable"
                pagination={getAllData.length > 12}
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
          <Modal.Title>Company Team Edit</Modal.Title>
          <Button
            variant="link"
            onClick={onModalExiting}
            className="modal-close"
          >
            <MdClear />
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-lightest-primary customer-details-body pb-3">
          <Form className="customer-details-form pt-3" onSubmit={UpdateTeam}>
            <Form.Row>
              <Form.Group as={Col} controlId="name">
                <Form.Label className="font-size-md text-dark-gray">
                  Name
                </Form.Label>
                <Form.Control
                  defaultValue={getTeamName ? getTeamName.entity.name : null}
                  name="name"
                  type="text"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  required
                />
                <Form.Label className="font-size-md text-dark-gray mt-4">
                  Description
                </Form.Label>
                <Form.Control
                  name="teamDesc"
                  as="textarea"
                  defaultValue={
                    getTeamName ? getTeamName.entity.description : null
                  }
                  rows={3}
                  className="text-black"
                  required
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                />
                <Form.Control
                  defaultValue={getTeamName ? getTeamName.entity.id : null}
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
        show={deleteTeam.defaultExpanded}
        centered
        size="xs"
        animation
        onHide={() => setDeleteTeam(false)}
      >
        <Modal.Body className="bg-lightest-primary customer-details-body pb-3">
          <p>Are you sure want to delete the team</p>
          <div className="d-flex">
            <Button
              className="mr-2"
              onClick={() => setDeleteTeam(false)}
              variant="primary"
              type="submit"
            >
              Cancel
            </Button>
            <Button
              onClick={() => confirmDeleteTeam()}
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

export default CompanyTeam;
