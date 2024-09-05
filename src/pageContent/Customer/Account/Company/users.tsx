import {
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Modal,
} from "react-bootstrap";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import { useManualQuery } from "graphql-hooks";
import GET_COMPANY_USERS from "@Graphql/queries/getCompanyUser.graphql";
import { getCompanyUsers } from "@Graphql/queries/getCompanyUsers.graphql";
import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import { FiFilter } from "react-icons/fi";
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
const AddCompanyUser = dynamic(() => import("./AddCompanyUser"));

// filter component
const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <InputGroup>
      <Form.Control
        type="Text"
        placeholder="Filter by Active and Inactive Status"
        value={filterText}
        onChange={onFilter}
        size="md"
      />
      <InputGroup.Append>
        <Button variant="primary" onClick={onClear}>
          <FiFilter className="font-size-lg" />
        </Button>
      </InputGroup.Append>
    </InputGroup>
  </>
);

const CompanyUsers = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editVal, setEditVal] = useState(null);
  const [companyUsersData, setCompanyUsersData] = useState([]);

  const { isAuthUser } = useContext(AuthContext);
  useEffect(() => {
    isAuthUser();
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
      name: "Users",
    },
  ];
  // API calling to get the company users
  const [geCompanyUsers, { loading, data }] = useManualQuery(
    GET_COMPANY_USERS.loc.source.body,
    {
      skipCache: true,
    },
  );
  const [geCompanyUsersLazy, { loading: loadData, data: companyUser }] =
    useManualQuery(getCompanyUsers.loc.source.body, {
      skipCache: true,
    });

  // updated the local data
  useEffect(() => {
    geCompanyUsers();
    geCompanyUsersLazy();
  }, [modalShow]);
  useEffect(() => {
    if (data && companyUser) {
      const companyUsersDataA = data.getCompanyUser;
      const companyUsersDataB = companyUser.company.users.items;
      const margeArr = [];
      companyUsersDataB.filter((item) => {
        const arrB = companyUsersDataA.filter(
          (itemB) => itemB.email === item.email,
        )[0];
        const newObj = { ...item, ...arrB };
        margeArr.push(newObj);
        return item;
      });
      setCompanyUsersData([...margeArr]);
    }
  }, [data, companyUser]);

  // For Modal Close And Open
  const onModalShow = (role) => {
    setEditVal(role);
    setModalShow(true);
  };
  const onModalExiting = () => {
    setModalShow(false);
  };

  // table columns settings or options
  const columns = [
    {
      name: "Name",
      selector: "name",
      sortable: true,
      grow: 3,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
      grow: 3,
      cell: (row) => {
        if (row?.role && typeof row.role === 'object') {
          return <span>{row.role.name !== "" ? row.role.name : "--"}</span>
        } else {
          return <span>{row?.role !== "" ? row?.role : "--"}</span>
        }
        
      },
    },
    {
      name: "Job Title",
      selector: "job_title",
      sortable: true,
      grow: 1,
    },
    {
      name: "Phone",
      selector: "telephone",
      sortable: true,
      grow: 3,
      center: true,
      cell: (row) => <span>{row.telephone !== "" ? row.telephone : "--"}</span>,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      grow: 4,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      hide: "sm",
      cell: (row) => (
        <span>{row.status.match("Active") ? row.status : "Inactive"}</span>
      ),
    },
    {
      name: "Action",
      selector: "name",
      sortable: true,
      hide: "sm",
      grow: 1,
      center: true,
      cell: (row) => (
        <Button onClick={() => onModalShow(row)} variant="link" className="p-0">
          Edit
        </Button>
      ),
    },
  ];

  // table expandable row content
  const ExpanableComponent = (row) => (
    <Row>
      <Col sm={6} md={4} className="mb-2">
        <strong>Name: </strong>
        <span>{row.data.name}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Role: </strong>
        <span>{row.data.role}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Job Title: </strong>
        <span>{row.data.job_title}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Phone: </strong>
        <span>{row.data.telephone !== "" ? row.data.telephone : "—"}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Email: </strong>
        <span>{row.data.email}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Status: </strong>
        <span>
          {row.data.status.match("Active") ? row.data.status : "Inactive"}
        </span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Action: </strong>
        <Button
          onClick={() => onModalShow(row.data)}
          variant="link"
          className="p-0"
        >
          Edit
        </Button>
      </Col>
    </Row>
  );

  // data table filter
  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = companyUsersData.filter(
    (item) =>
      item.status &&
      (item.status.toLowerCase().includes(filterText.toLowerCase()) ||
        (filterText &&
          filterText.includes("ina") &&
          item.status.toLowerCase() === "pending approval")),
  );

  // sub header
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  // table paginatyion
  const paginationOptions = {
    rowsPerPageText: "",
    rangeSeparatorText: "of",
  };

  const isExpanded = (row) => row.defaultExpanded;
  companyUsersData.map((item) => {
    const getCompanyUser = item;
    getCompanyUser.defaultExpanded = true;
    return getCompanyUser;
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
              <h1 className="text-uppercase mb-0">Company Users</h1>
            </header>
            <section className="customer-user-filter">
              <I18nLink
                href="/customer/account/company/addcompanyuser"
                isMagentoRoute={0}
              >
                <Button
                  type="button"
                  variant="primary"
                  className={`text-uppercase mt-4 ${
                    windowObj && windowSize.width < 575 ? "btn-block" : ""
                  }`}
                >
                  Add User
                </Button>
              </I18nLink>
              <DataTable
                noHeader
                columns={columns}
                data={filteredItems}
                className="acc-custom-datatable"
                pagination={filteredItems.length > 12}
                paginationPerPage={12}
                highlightOnHover
                expandableRows={!(windowObj && windowSize.width > 1024)}
                expandableRowDisabled={(row) => row.disabled}
                expandableRowsComponent={<ExpanableComponent />}
                paginationComponentOptions={paginationOptions}
                expandableRowExpanded={isExpanded}
                responsive={false}
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                paginationRowsPerPageOptions={[12, 24, 48]}
              />
              {loading && loadData ? <LoadingIndicator /> : ""}
            </section>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      {/* Edit Team Modal */}
      <Modal show={modalShow} centered animation onHide={onModalExiting}>
        <Modal.Header className="bg-lightest-primary customer-details-header pb-2">
          <Modal.Title>Company User Edit</Modal.Title>
          <Button
            variant="link"
            onClick={onModalExiting}
            className="modal-close"
          >
            <MdClear />
          </Button>
        </Modal.Header>
        <Modal.Body className="bg-lightest-primary customer-details-body pb-3">
          <AddCompanyUser
            isEdit
            editUser={editVal}
            setModalShow={setModalShow}
          />
        </Modal.Body>
      </Modal>
      <EmailSubscription />
    </>
  );
};

export default CompanyUsers;
