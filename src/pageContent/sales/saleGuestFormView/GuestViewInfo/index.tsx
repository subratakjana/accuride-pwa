import { Row, Col } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { PriceTag } from "@Components/Utilities";
import { useEffect, useState } from "react";
import useWindowDimensions from "@Hooks/windowDimention";

const GuestViewInfo = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const orders = props.items;
  // table columns settings or options
  const columns = [
    {
      name: "Product Name",
      selector: "title",
      sortable: true,
      grow: 4,
      width: `${windowObj && windowSize.width < 1200 ? "250px" : ""}`,
      cell: (row) => (
        <div>
          <strong className="mb-1 d-block text-ellipsis">{row.name}</strong>
          {row.product_type === "configurable"
            ? row.productoptions.map((option) => (
                <div key={option.label}>
                  <strong>{`${option.label}: `}</strong>
                  <span>{option.value}</span>
                </div>
              ))
            : null}
        </div>
      ),
    },
    {
      name: "SKU",
      selector: "sku",
      sortable: true,
      grow: 1,
      hide: "sm",
    },
    {
      name: "Price",
      selector: "price",
      sortable: true,
      grow: 1,
      hide: "md",
      right: true,
      cell: (row) => (
        <strong>
          <PriceTag
            className="d-inline-block"
            currency={props.currency}
            value={Number(row.price)}
          />
        </strong>
      ),
    },
    {
      name: "Qty",
      selector: "qty",
      sortable: true,
      grow: 1,
      hide: "md",
      right: true,
      cell: (row) => (
        <div>
          <div>
            <strong>Ordered : </strong>
            {row.qty}
          </div>

          <div>
            <strong>Shipped : </strong>
            {row.qty}
          </div>
        </div>
      ),
    },
    {
      name: "Subtotal",
      selector: "subtotal",
      sortable: true,
      grow: 1,
      hide: "sm",
      right: true,
      width: "80px",
      cell: (row) => (
        <strong>
          <PriceTag
            className="d-inline-block"
            currency={props.currency}
            value={row.price * row.qty}
          />
        </strong>
      ),
    },
  ];
  // table expandable row content
  const ExpanableComponent = ({ data }) => (
    <Row className="acc-view-info">
      <Col sm={6} md={4} className="mb-2">
        <div className="mb-2">
          <strong>Product Name: </strong>
          <span>{data.name}</span>
        </div>
        {data.product_type === "configurable"
          ? data.productoptions.map((option) => (
              <div key={option.label}>
                <strong>{`${option.label}: `}</strong>
                <span>{option.value}</span>
              </div>
            ))
          : ""}
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>SKU: </strong>
        <span>{data.sku}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Price: </strong>
        <PriceTag
          className="d-inline-block"
          currency={props.currency}
          value={data.price}
        />
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Qty Ordered: </strong>
        <span>{data.qty}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Qty Shipped: </strong>
        <span>{data.qty}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Subtotal: </strong>
        <PriceTag
          className="d-inline-block"
          currency={props.currency}
          value={data.price * data.qty}
        />
      </Col>
    </Row>
  );

  const isExpanded = (row) => row.defaultExpanded;
  orders.map((item) => {
    const order = item;
    order.defaultExpanded = true;
    return order;
  });

  return (
    <>
      <DataTable
        noHeader
        columns={columns}
        data={orders}
        className="acc-custom-datatable"
        pagination={false}
        highlightOnHover
        expandableRows={!(windowObj && windowSize.width > 1024)}
        expandableRowDisabled={(row) => row.disabled}
        expandableRowsComponent={<ExpanableComponent />}
        expandableRowExpanded={isExpanded}
        responsive={false}
      />

      {/* total start */}
      <article className="acc-total-area bg-light p-3 px-xl-2 mt-2">
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Subtotal: </strong>
          <PriceTag currency={props.currency} value={Number(props.subTotal)} />
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Shipping &amp; Handling: </strong>
          <PriceTag
            currency={props.currency}
            value={Number(props.shippingAmount)}
          />
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Tax: </strong>
          <PriceTag currency={props.currency} value={Number(props.taxAmount)} />
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center">
          <strong className="font-size-lg">Grand Total: </strong>
          <strong className="font-size-lg">
            <PriceTag
              currency={props.currency}
              value={Number(props.grandTotal)}
            />
          </strong>
        </div>
      </article>
      {/* total end */}
    </>
  );
};

export default GuestViewInfo;
