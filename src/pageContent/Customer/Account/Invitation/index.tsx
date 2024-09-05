import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { I18nLink, LoadingIndicator } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import { useManualQuery } from "graphql-hooks";
import GET_CUSTOMER_INVITATIONS from "@Graphql/queries/getCustomerInvitations.graphql";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Invitation = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  // Function for sidebar sticky issue start
  const [isSticky, setIsSticky] = useState(false);
  let customerInvitationsData = [];
  const { token, isAuthUser } = useContext(AuthContext);

  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };

  const [getInvitations, { loading, data }] = useManualQuery(
    GET_CUSTOMER_INVITATIONS.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
    isAuthUser();
    getInvitations();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // assigned API fetched data
  if (data) customerInvitationsData = data.customerInvitation;
  if (loading || !token) return <LoadingIndicator />;

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
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
      name: "Invitation",
    },
  ];
  // table columns settings or options
  const columns = [
    {
      name: "Email",
      selector: "email",
      sortable: true,
      grow: 3,
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      hide: "sm",
    },
  ];

  // table expandable row content
  const ExpanableComponent = (row) => (
    <Row>
      <Col sm={6} md={4} className="mb-2">
        <strong>Email: </strong>
        <span>{row.data.email}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Status: </strong>
        <span>{row.data.status}</span>
      </Col>
    </Row>
  );

  // table paginatyion
  const paginationOptions = {
    rowsPerPageText: "",
    rangeSeparatorText: "of",
  };

  const isExpanded = (row) => row.defaultExpanded;
  customerInvitationsData.map((item) => {
    const invitation = item;
    invitation.defaultExpanded = true;
    return invitation;
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
              <h1 className="text-uppercase mb-0">My Invitations</h1>
            </header>
            <section>
              {customerInvitationsData.length > 0 ? (
                <DataTable
                  noHeader
                  columns={columns}
                  data={customerInvitationsData}
                  className="acc-custom-datatable"
                  pagination={customerInvitationsData.length > 12}
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
              ) : (
                <Alert variant="warning">There are no sent invitations.</Alert>
              )}
              <I18nLink href="/customer/account/invitation/send">
                <Button
                  variant="secondary"
                  className={`text-uppercase mt-3 ${
                    windowObj && windowSize.width <= 1024 ? "btn-block" : ""
                  }`}
                >
                  Send Invitation
                </Button>
              </I18nLink>
            </section>
          </Col>
          {/* content end */}
        </Row>
      </Container>
      <EmailSubscription />
    </>
  );
};

export default Invitation;
