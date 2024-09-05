import { Container, Row, Col } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const StoreCredit = () => {
  const storeData = [
    {
      action: "Created",
      balance_change: "$100.00",
      balance: "$100.00",
      date: "3/4/20, 12:12 AM",
    },
    {
      action: "Created",
      balance_change: "$100.00",
      balance: "$100.00",
      date: "3/4/20, 12:12 AM",
    },
    {
      action: "Created",
      balance_change: "$100.00",
      balance: "$100.00",
      date: "3/4/20, 12:12 AM",
    },
    {
      action: "Created",
      balance_change: "$100.00",
      balance: "$100.00",
      date: "3/4/20, 12:12 AM",
    },
  ];
  // table columns settings or options
  const columns = [
    {
      name: "Action",
      selector: "action",
      sortable: true,
      grow: 1,
    },
    {
      name: "Balance Change",
      selector: "balance_change",
      sortable: true,
      hide: "sm",
    },
    {
      name: "Balance",
      selector: "balance",
      sortable: true,
      hide: "sm",
    },
    {
      name: "Date",
      selector: "date",
      sortable: true,
    },
  ];

  // table expandable row content
  const ExpanableComponent = ({ data }) => (
    <article className="bg-light p-3">
      <Row>
        <Col sm={6} md={4} className="mb-2">
          <strong>Action: </strong>
          <span>{data.action}</span>
        </Col>
        <Col sm={6} md={4} className="mb-2">
          <strong>Balance Change: </strong>
          <span>{data.balance_change}</span>
        </Col>
        <Col sm={6} md={4} className="mb-2">
          <strong>Balance: </strong>
          <span>{data.balance}</span>
        </Col>
        <Col sm={6} md={4} className="mb-2">
          <strong>Date: </strong>
          <span>{data.date}</span>
        </Col>
      </Row>
    </article>
  );

  // table paginatyion
  const paginationOptions = {
    rowsPerPageText: "",
    rangeSeparatorText: "of",
    noRowsPerPage: true,
  };

  return (
    <Container className="section-padding pt-0">
      <Row>
        {/* sidebar start */}
        <Col lg className="acc-account-sidebar">
          <AccountSidebar />
        </Col>
        {/* sidebar end */}

        {/* content start */}
        <Col lg className="acc-account-content">
          {/* header start */}
          <header className="mb-3">
            <h1 className="text-uppercase mb-0">Store Credit</h1>
          </header>
          {/* header end */}

          {/* balance and redeem start */}
          <section className="section-padding pt-0">
            <Row>
              {/* balance start */}
              <Col sm={6} className="mb-3">
                <header className="mb-3">
                  <h2 className="text-uppercase mb-0">Balance</h2>
                </header>
                <span className="h1 text-dark">$0.00</span>
              </Col>
              {/* balance end */}

              {/* balance start */}
              <Col sm={6}>
                <header className="mb-3">
                  <h2 className="text-uppercase mb-0">Redeem Gift Card</h2>
                </header>
                <span>
                  Have a gift card?
                  <I18nLink href="/customer/account/giftcard">
                    <a
                      aria-label="link"
                      className="text-primary font-weight-500"
                    >
                      {" "}
                      Click here{" "}
                    </a>
                  </I18nLink>
                  to redeem it.
                </span>
              </Col>
              {/* balance end */}
            </Row>
          </section>
          {/* balance and redeem end */}

          {/* balance history start */}
          <section>
            <header className="mb-3">
              <h2 className="text-uppercase mb-0">Balance History</h2>
            </header>
            <DataTable
              noHeader
              columns={columns}
              data={storeData}
              className="acc-custom-datatable"
              pagination={storeData.length > 12}
              paginationPerPage={12}
              highlightOnHover
              expandableRows
              expandableRowDisabled={(row) => row.disabled}
              expandableRowsComponent={<ExpanableComponent />}
              paginationComponentOptions={paginationOptions}
              responsive={false}
              paginationRowsPerPageOptions={[12, 24, 48]}
            />
          </section>
          {/* balance history end */}
        </Col>
        {/* content end */}
      </Row>
    </Container>
  );
};

export default StoreCredit;
