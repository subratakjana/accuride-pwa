import { Row, Col, Button, Dropdown, ButtonGroup } from "react-bootstrap";
import { I18nLink, LoadingIndicator, PriceTag } from "@Components/Utilities";
import DataTable from "react-data-table-component";
import { useManualQuery } from "graphql-hooks";
import GET_CUSTOMER_ORDERS from "@Graphql/queries/getCustomerOrders.graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import reOrderAddItemInCart from "@Hooks/reOrderAddItemInCart";
import useWindowDimensions from "@Hooks/windowDimention";
import { MdMoreVert } from "react-icons/md";

const RecentOrder = () => {
  const windowSize = useWindowDimensions();
  const router = useRouter();
  const [windowObj, updateWindowObj] = useState(false);
  let customerOrdersData = [];
  const [reorderId, setReorderId] = useState(false);
  const [customerRecentOrdersData, setCustomerRecentOrdersData] = useState([]);

  // API call to get the customer orders
  const [getCustomerOrder, { loading, data: customerOrder }] = useManualQuery(
    GET_CUSTOMER_ORDERS.loc.source.body,
    {
      fetchPolicy: "no-cache",
    },
  );
  useEffect(() => {
    getCustomerOrder();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  // assigned API fetched data
  if (customerOrder) customerOrdersData = customerOrder.customerOrders.items;
  useEffect(() => {
    if (customerRecentOrdersData.length === 0) {
      const customerRecentOrders = customerOrdersData
        .sort((a, b) => new Date(b.created_date) - new Date(a.created_date))
        .slice(0, 3);
      const newMapArr = customerRecentOrders.map((item) => {
        const customerRecentOrder = item;
        customerRecentOrder.defaultExpanded = true;
        return customerRecentOrder;
      });
      setCustomerRecentOrdersData(newMapArr);
    }
  }, [customerOrder]);

  const viewOrderDetails = (orderId) => {
    const asPath = `${router.asPath.split("?")[0]}/order/view`;
    const querySign = "?";
    const pageQuery = `id=${orderId}`;
    router.push(
      { pathname: `${router.pathname}/order/view`, query: { id: orderId } },
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
    },
    {
      name: "Date",
      selector: "created_date",
      sortable: true,
    },
    {
      name: "Ship To",
      selector: "ship_to",
      sortable: true,
      hide: "md",
      cell: (row) => <span>{row.ship_to}</span>,
    },
    {
      name: "Order Total",
      selector: "grand_total",
      sortable: true,
      hide: "md",
      cell: (row) => (
        <>
          {row.grand_total === row.base_amount
            ? [
                router.query.zone_lang === "en-ca" ? (
                  `$${Number(row.grand_total).toFixed(2)}`
                ) : (
                  <PriceTag
                    className="pl-1"
                    currency="$"
                    value={Number(row.grand_total).toFixed(2)}
                  />
                ),
              ]
            : [
                router.query.zone_lang === "en-ca" ? (
                  <>
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(row.grand_total).toFixed(2)}
                    />
                    {`($${Number(row.base_amount).toFixed(2)})`}
                  </>
                ) : (
                  <>
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(row.base_amount).toFixed(2)}
                    />
                    {`(CA$${Number(row.grand_total).toFixed(2)})`}
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
                <span className="pl-1">{`$${Number(data.grand_total).toFixed(
                  2,
                )}`}</span>
              ) : (
                <span className="d-inline-block">
                  <PriceTag
                    currency="$"
                    value={Number(data.grand_total).toFixed(2)}
                  />
                </span>
              ),
            ]
          : [
              router.query.zone_lang === "en-ca" ? (
                <>
                  <span className="d-inline-block">
                    <PriceTag
                      currency="$"
                      value={Number(data.grand_total).toFixed(2)}
                    />
                  </span>
                  <span className="pr-1">{`($${Number(data.base_amount).toFixed(
                    2,
                  )})`}</span>
                </>
              ) : (
                <>
                  <span className="d-inline-block">
                    <PriceTag
                      currency="$"
                      value={Number(data.base_amount).toFixed(2)}
                    />
                  </span>
                  <span className="pr-1">{`(CA$${Number(
                    data.grand_total,
                  ).toFixed(2)})`}</span>
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

  // table pagination
  const paginationOptions = {
    rowsPerPageText: "",
    rangeSeparatorText: "of",
  };
  const isExpanded = (row) => row.defaultExpanded;

  if (loading) return null;

  return (
    <>
      {customerRecentOrdersData.length > 0 ? (
        <section className="section-padding pb-0">
          <header
            className={`d-flex align-items-start justify-content-between align-items-center mb-3 pb-xl-2 border-medium ${
              windowObj && windowSize.width > 1024 ? "border-bottom" : ""
            }`}
          >
            <h2 className="text-uppercase mb-0">Recent Orders</h2>
            <I18nLink href="/customer/account/order">
              <Button variant="primary" className="text-uppercase flex-none">
                View All
              </Button>
            </I18nLink>
          </header>
          <DataTable
            noHeader
            columns={columns}
            data={customerRecentOrdersData}
            className="acc-custom-datatable"
            pagination={customerRecentOrdersData.length > 12}
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
      ) : null}
      {!statusAddCart &&
      reorderId &&
      !statusAddCart.simpleCartAdd &&
      !statusAddCart.configureCartAdd ? (
        <LoadingIndicator />
      ) : null}
    </>
  );
};

export default RecentOrder;
