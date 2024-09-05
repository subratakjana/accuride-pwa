import {
  Container,
  Row,
  Col,
  Button,
  Alert,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import { LoadingIndicator, PriceTag } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import { useManualQuery } from "graphql-hooks";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import GET_CUSTOMER_ORDERS from "@Graphql/queries/getCustomerOrders.graphql";
import { useRouter } from "next/router";
import reOrderAddItemInCart from "@Hooks/reOrderAddItemInCart";
import useWindowDimensions from "@Hooks/windowDimention";
import { MdMoreVert } from "react-icons/md";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Order = () => {
  const windowSize = useWindowDimensions();
  const router = useRouter();
  const [windowObj, updateWindowObj] = useState(false);
  const { token, isAuthUser, decode } = useContext(AuthContext);
  const [reorderId, setReorderId] = useState(false);
  const [customerOrdersData, setCustomerOrdersData] = useState([]);
  useEffect(() => {
    isAuthUser();
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
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
      name: "Order",
    },
  ];
  const [getCustomerOrder, { loading, data: customerOrderData }] =
    useManualQuery(GET_CUSTOMER_ORDERS.loc.source.body, {
      fetchPolicy: "no-cache",
    });
  // updated the local data
  useEffect(() => {
    getCustomerOrder();
  }, []);
  useEffect(() => {
    getCustomerOrder();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // assigned API fetched data
  const isLetter = (str) => {
    const strMatch = str.match(/[A-Z]/i);
    return strMatch && strMatch.length > 0;
  };
  useEffect(() => {
    if (
      customerOrdersData.length === 0 &&
      customerOrderData &&
      customerOrderData.customerOrders.items.length > 0
    ) {
      const customerOrderDataArr = customerOrderData.customerOrders.items;
      const newMapArr = customerOrderDataArr.map((item) => {
        const customerRecentOrder = item;
        customerRecentOrder.defaultExpanded = true;
        if (isLetter(item.id)) {
          customerRecentOrder.id = decode(customerRecentOrder.id);
        }
        return customerRecentOrder;
      });
      newMapArr.sort((a, b) => b.id - a.id);
      setCustomerOrdersData(newMapArr);
    }
  }, [customerOrderData]);

  const viewOrderDetails = (orderId) => {
    const asPath = `${router.asPath.split("?")[0]}/view`;
    const querySign = "?";
    const pageQuery = `id=${orderId}`;
    router.push(
      { pathname: `${router.pathname}/view`, query: { id: orderId } },
      `${asPath}${querySign}${pageQuery}`,
      { shallow: true },
    );
  };

  /** re order or add to cart */
  const reOrder = (orderId) => {
    setReorderId(orderId);
  };

  // table columns settings or options
  const columns = [
    {
      name: "Order #",
      selector: "order_number",
      sortable: true,
      grow: 2,
    },
    {
      name: "Date",
      selector: "created_date",
      sortable: true,
      grow: 1,
    },
    {
      name: "Ship To",
      selector: "ship_to",
      sortable: true,
      hide: "md",
      grow: 2,
      cell: (row) => <span>{row.ship_to}</span>,
    },
    {
      name: "Order Total",
      selector: "grand_total",
      sortable: true,
      hide: "md",
      grow: 2,
      cell: (row) => (
        <>
          {row.grand_total === row.base_amount
            ? [
                router.query.zone_lang === "en-ca" ? (
                  `$${row.grand_total.toFixed(2)}`
                ) : (
                  <PriceTag currency="$" value={row.grand_total.toFixed(2)} />
                ),
              ]
            : [
                router.query.zone_lang === "en-ca" ? (
                  <>
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={row.grand_total.toFixed(2)}
                    />
                    {`($${row.base_amount.toFixed(2)})`}
                  </>
                ) : (
                  <>
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={row.base_amount.toFixed(2)}
                    />
                    {`(CA$${row.grand_total.toFixed(2)})`}
                  </>
                ),
              ]}
        </>
      ),
    },
    {
      name: "Status",
      selector: "status",
      sortable: true,
      hide: "md",
      grow: 1,
      cell: (row) => (row.status === "pending2" ? "Pending" : row.status),
    },
    {
      name: "Actions",
      selector: "action",
      cell: (data) => (
        <Dropdown as={ButtonGroup} drop="left">
          <Dropdown.Toggle variant="light" className="btn-action">
            <MdMoreVert />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              eventKey="1"
              onClick={() => viewOrderDetails(data.id)}
              className="text-uppercase font-weight-500 text-primary py-2"
            >
              View Order
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              onClick={() => reOrder(data.id)}
              className="text-uppercase font-weight-500 text-primary py-2"
            >
              Reorder
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      allowOverflow: true,
      button: true,
      width: "65px",
    },
  ];

  /**
   * @param {cartdata} Reorder add item in cart custom hooks.
   * page redirection to cart page after successfull.
   * and return status after successfull add to cart.
   */
  const statusAddCart = reOrderAddItemInCart(reorderId);
  // table expandable row content
  const ExpanableComponent = ({ data }) => (
    <Row>
      <Col sm={6} md={4} className="mb-2">
        <strong>Order: </strong>
        <span>{data.order_number}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Date: </strong>
        <span>{data.created_date}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Ship To: </strong>
        <span>{data.ship_to}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Order Total: </strong>
        {data.grand_total === data.base_amount
          ? [
              router.query.zone_lang === "en-ca" ? (
                <span className="pl-1">{`$${data.grand_total.toFixed(
                  2,
                )}`}</span>
              ) : (
                <span className="d-inline-block">
                  <PriceTag currency="$" value={data.grand_total.toFixed(2)} />
                </span>
              ),
            ]
          : [
              router.query.zone_lang === "en-ca" ? (
                <>
                  <span className="d-inline-block">
                    <PriceTag
                      currency="$"
                      value={data.grand_total.toFixed(2)}
                    />
                  </span>
                  <span className="pl-1">{`($${data.base_amount.toFixed(
                    2,
                  )})`}</span>
                </>
              ) : (
                <>
                  <span className="d-inline-block">
                    <PriceTag
                      currency="$"
                      value={data.base_amount.toFixed(2)}
                    />
                  </span>
                  <span className="pl-1">{`(CA$${data.grand_total.toFixed(
                    2,
                  )})`}</span>
                </>
              ),
            ]}
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Status: </strong>
        <span>{data.status === "pending2" ? "Pending" : data.status}</span>
      </Col>
      <Col
        sm={12}
        className="my-2 d-flex align-items-center justify-content-center"
      >
        <Button
          variant="primary"
          className="text-uppercase mr-2"
          block
          onClick={() => viewOrderDetails(data.id)}
        >
          View Order
        </Button>

        <Button
          variant="primary"
          onClick={() => reOrder(data.id)}
          block
          className="text-uppercase ml-2 mt-0"
        >
          Reorder
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

  if (loading || !token) return <LoadingIndicator />;

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
              <h1 className="text-uppercase mb-0">My Orders</h1>
            </header>
            {customerOrdersData.length > 0 ? (
              <section>
                <DataTable
                  noHeader
                  columns={columns}
                  data={customerOrdersData}
                  className="acc-custom-datatable"
                  pagination={customerOrdersData.length > 12}
                  paginationPerPage={12}
                  highlightOnHover
                  expandableRows={!(windowObj && windowSize.width > 1024)}
                  expandableRowDisabled={(row) => row.disabled}
                  expandableRowsComponent={<ExpanableComponent />}
                  expandableRowExpanded={isExpanded}
                  paginationComponentOptions={paginationOptions}
                  responsive={false}
                  paginationRowsPerPageOptions={[12, 24, 48]}
                />
              </section>
            ) : (
              <Alert variant="warning">You have placed no orders.</Alert>
            )}
          </Col>
          {/* content end */}
        </Row>
      </Container>
      <EmailSubscription />
      {!statusAddCart &&
      reorderId &&
      !statusAddCart.simpleCartAdd &&
      !statusAddCart.configureCartAdd ? (
        <LoadingIndicator />
      ) : null}
    </>
  );
};

export default Order;
