import { Row, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { PriceTag, LoadingIndicator } from "@Components/Utilities";
import { useManualQuery } from "graphql-hooks";
import { useContext, useEffect, useState } from "react";
import SEND_EMAIL_ALL_INVOICE_DETALS from "@Graphql/queries/sendEmailAllInvoiceDetails.graphql";
import SEND_EMAIL_INVOICE_DETALS from "@Graphql/queries/sendEmailInvoiceDetails.graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";

const InvoiceInfo = (props) => {
  const windowSize = useWindowDimensions();
  const router = useRouter();
  const [windowObj, updateWindowObj] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { notify } = useContext(AuthContext);
  // collect review id from URL
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id");
  const { orderDetail } = props;
  // table data
  const invoice = props.items;
  useEffect(() => {
    if (orderDetail) {
      const { invoiceItems } = orderDetail.invoice[0];
      invoiceItems.map((item, index) => {
        const allShippingArray =
          orderDetail && orderDetail.shipment[0]
            ? orderDetail.shipment[0].shipmentItems
            : [];
        const shippingArray =
          allShippingArray && allShippingArray.length > 0
            ? allShippingArray.filter((eachItem) => eachItem.sku === item.sku)
            : false;
        invoiceItems[index].shipment = shippingArray;
        return true;
      });
      setOrderDetails(invoiceItems);
    }
  }, [orderDetail]);

  // table columns settings or options
  const columns = [
    {
      name: "Product Name",
      selector: "product_name",
      sortable: true,
      grow: 4,
      width: `${windowObj && windowSize.width < 1200 ? "250px" : ""}`,
      cell: (row) => (
        <div>
          <strong className="mb-1 d-block text-ellipsis">{row.title}</strong>
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
      width: `${router.query.zone_lang === "en-ca" ? "" : "150px"}`,
      cell: (row) =>
        row.price === row.base_price
          ? [
              router.query.zone_lang === "en-ca" ? (
                <strong>{`$${Number(row.price).toFixed(2)}`}</strong>
              ) : (
                <strong>
                  <PriceTag
                    className="d-inline-block"
                    currency="$"
                    value={Number(row.price).toFixed(2)}
                  />
                </strong>
              ),
            ]
          : [
              router.query.zone_lang === "en-ca" ? (
                <strong className="text-right d-block">
                  <PriceTag
                    className="d-inline-block pr-1"
                    currency="$"
                    value={Number(row.price).toFixed(2)}
                  />
                  {`($${Number(row.base_price).toFixed(2)})`}
                </strong>
              ) : (
                <strong className="text-right d-block">
                  <PriceTag
                    className="d-inline-block pr-1"
                    currency="$"
                    value={Number(row.base_price).toFixed(2)}
                  />
                  {`(CA$${Number(row.price).toFixed(2)})`}
                </strong>
              ),
            ],
    },
    {
      name: "Qty Invoiced",
      selector: "qty_invoiced",
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

          {row.shipment ? (
            <div>
              <strong>Shipped : </strong>
              {row.shipment[0].qty}
            </div>
          ) : null}
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
      width: `${router.query.zone_lang === "en-ca" ? "80px" : "150px"}`,
      cell: (row) =>
        row.price === row.base_price
          ? [
              router.query.zone_lang === "en-ca" ? (
                <strong>{`$${Number(row.price).toFixed(2)}`}</strong>
              ) : (
                <strong>
                  <PriceTag
                    className="d-inline-block"
                    currency="$"
                    value={Number(row.price).toFixed(2)}
                  />
                </strong>
              ),
            ]
          : [
              router.query.zone_lang === "en-ca" ? (
                <strong className="d-block text-right">
                  <PriceTag
                    className="d-inline-block pr-1"
                    currency="$"
                    value={Number(row.price).toFixed(2)}
                  />
                  {`($${Number(row.base_price).toFixed(2)})`}
                </strong>
              ) : (
                <strong className="d-block text-right">
                  <PriceTag
                    className="d-inline-block pr-1"
                    currency="$"
                    value={Number(row.base_price).toFixed(2)}
                  />
                  {`(CA$${Number(row.price).toFixed(2)})`}
                </strong>
              ),
            ],
    },
  ];

  // table expandable row content
  const ExpanableComponent = ({ data }) => (
    <Row className="acc-invoice-info">
      <Col sm={6} md={4} className="mb-2">
        <div className="mb-2">
          <strong>Product Name: </strong>
          <span>{data.title}</span>
        </div>
        {data.product_type === "configurable" ? (
          <div>
            <strong>Length: </strong>
            <span>{data.productoptions[0].value}</span>
          </div>
        ) : (
          ""
        )}
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>SKU: </strong>
        <span>{data.sku}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Price: </strong>
        {data.price === data.base_price
          ? [
              router.query.zone_lang === "en-ca" ? (
                `$${Number(data.price).toFixed(2)}`
              ) : (
                <PriceTag
                  className="test"
                  currency="$"
                  value={Number(data.price).toFixed(2)}
                />
              ),
            ]
          : [
              router.query.zone_lang === "en-ca" ? (
                <>
                  <PriceTag
                    className="test"
                    currency="$"
                    value={Number(data.price).toFixed(2)}
                  />
                  {`($${Number(data.base_price).toFixed(2)})`}
                </>
              ) : (
                <>
                  <PriceTag
                    className="test"
                    currency="$"
                    value={Number(data.base_price).toFixed(2)}
                  />
                  {`(CA$${Number(data.price).toFixed(2)})`}
                </>
              ),
            ]}
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Qty Invoiced: </strong>
        <span>{data.qty}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Subtotal: </strong>
        {data.sub_total === data.base_sub_total
          ? [
              router.query.zone_lang === "en-ca" ? (
                `$${Number(data.sub_total).toFixed(2)}`
              ) : (
                <PriceTag
                  lassName="d-inline-block"
                  currency="$"
                  value={Number(data.sub_total).toFixed(2)}
                />
              ),
            ]
          : [
              router.query.zone_lang === "en-ca" ? (
                <div className="d-flex justify-content-end text-right">
                  <PriceTag
                    className="d-inline-block"
                    currency="$"
                    value={Number(data.sub_total).toFixed(2)}
                  />
                  <span className="pl-1">{`($${Number(
                    data.base_sub_total,
                  ).toFixed(2)})`}</span>
                </div>
              ) : (
                <div className="d-flex justify-content-end text-right">
                  <PriceTag
                    className="d-inline-block"
                    currency="$"
                    value={Number(data.base_sub_total).toFixed(2)}
                  />
                  <span className="pl-1">{`(CA$${Number(data.sub_total).toFixed(
                    2,
                  )})`}</span>
                </div>
              ),
            ]}
      </Col>
    </Row>
  );

  const isExpanded = (row) => row.defaultExpanded;
  invoice.map((item) => {
    const invoiceItem = item;
    invoiceItem.defaultExpanded = true;
    return invoiceItem;
  });

  // API calling for email all invoice details
  const [allInvoice, { loading: allInvoiceLoading }] = useManualQuery(
    SEND_EMAIL_ALL_INVOICE_DETALS.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const allInvoiceData = data.data;
        if (allInvoiceData) {
          notify(allInvoiceData.allInvoiceMailSend.message);
        }
      },
    },
  );
  // all invoice email send
  const emailAllInvoiceHandler = (aiId) => {
    allInvoice({
      variables: {
        orderId: aiId,
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

  // API calling for email invoice details
  const [singleInvoice, { loading: invoiceLoading }] = useManualQuery(
    SEND_EMAIL_INVOICE_DETALS.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const invoiceData = data.data;
        if (invoiceData) {
          notify(invoiceData.invoiceMailSend.message);
        }
      },
    },
  );
  // single invoice email send
  const emailInvoiceHandler = (siId) => {
    singleInvoice({
      variables: {
        invoiceId: siId,
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
  if (allInvoiceLoading || invoiceLoading) return <LoadingIndicator />;

  return (
    <>
      <Button
        variant="secondary"
        block={!(windowObj && windowSize.width >= 768)}
        className="text-uppercase mb-3"
        onClick={() => {
          emailAllInvoiceHandler(orderId);
        }}
      >
        EMAIL ALL INVOICES
      </Button>
      <header
        className={`d-flex align-items-center justify-content-between mb-3 pb-xl-2 border-medium ${
          windowObj && windowSize.width > 1024 ? "border-bottom" : ""
        }`}
      >
        <h2 className="mb-0 text-uppercase">{`Invoice #${props.invoiceIncrementId}`}</h2>
        <Button
          variant="primary"
          className="text-uppercase"
          onClick={() => {
            emailInvoiceHandler(Number(props.invoiceId));
          }}
        >
          EMAIL INVOICE
        </Button>
      </header>
      <DataTable
        noHeader
        columns={columns}
        data={orderDetails}
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
      <article className="acc-total-area bg-light p-3 px-xl-2">
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Subtotal: </strong>
          {props.subTotal === props.BaseSubTotal
            ? [
                router.query.zone_lang === "en-ca" ? (
                  <div className="acc-ca-price-figure">
                    {`$${Number(props.subTotal).toFixed(2)}`}
                  </div>
                ) : (
                  <div className="acc-ca-price-figure">
                    <PriceTag
                      currency="$"
                      value={Number(props.subTotal).toFixed(2)}
                    />
                  </div>
                ),
              ]
            : [
                router.query.zone_lang === "en-ca" ? (
                  <div className="d-flex justify-content-end text-right acc-ca-price-figure">
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(props.subTotal).toFixed(2)}
                    />
                    {`($${Number(props.BaseSubTotal).toFixed(2)})`}
                  </div>
                ) : (
                  <div className="d-flex justify-content-end text-right acc-ca-price-figure">
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(props.BaseSubTotal).toFixed(2)}
                    />
                    {`(CA$${Number(props.subTotal).toFixed(2)})`}
                  </div>
                ),
              ]}
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Shipping &amp; Handling: </strong>
          {props.shippingAmount === props.BaseShippingAmount
            ? [
                router.query.zone_lang === "en-ca" ? (
                  <div className="acc-ca-price-figure">
                    {`$${Number(props.shippingAmount).toFixed(2)}`}
                  </div>
                ) : (
                  <div className="acc-ca-price-figure">
                    <PriceTag
                      currency="$"
                      value={Number(props.shippingAmount).toFixed(2)}
                    />
                  </div>
                ),
              ]
            : [
                router.query.zone_lang === "en-ca" ? (
                  <div className="d-flex justify-content-end text-right acc-ca-price-figure">
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(props.shippingAmount).toFixed(2)}
                    />
                    {`($${Number(props.BaseShippingAmount).toFixed(2)})`}
                  </div>
                ) : (
                  <div className="d-flex justify-content-end text-right acc-ca-price-figure">
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(props.BaseShippingAmount).toFixed(2)}
                    />
                    {`(CA$${Number(props.shippingAmount).toFixed(2)})`}
                  </div>
                ),
              ]}
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Tax: </strong>
          {props.taxAmount === props.BaseTaxAmount
            ? [
                router.query.zone_lang === "en-ca" ? (
                  <div className="acc-ca-price-figure">
                    {`$${Number(props.taxAmount).toFixed(2)}`}
                  </div>
                ) : (
                  <div className="acc-ca-price-figure">
                    <PriceTag
                      currency="$"
                      value={Number(props.taxAmount).toFixed(2)}
                    />
                  </div>
                ),
              ]
            : [
                router.query.zone_lang === "en-ca" ? (
                  <div className="d-flex justify-content-end text-right acc-ca-price-figure">
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(props.taxAmount).toFixed(2)}
                    />
                    {`($${Number(props.BaseTaxAmount).toFixed(2)})`}
                  </div>
                ) : (
                  <div className="d-flex justify-content-end text-right acc-ca-price-figure">
                    <PriceTag
                      className="pr-1"
                      currency="$"
                      value={Number(props.BaseTaxAmount).toFixed(2)}
                    />
                    {`(CA$${Number(props.taxAmount).toFixed(2)})`}
                  </div>
                ),
              ]}
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center">
          <strong className="font-size-lg">Grand Total: </strong>
          <strong className="d-flex text-right justify-content-end align-items-center acc-ca-price-figure">
            {props.grandTotal === props.BaseGrandTotal
              ? [
                  router.query.zone_lang === "en-ca" ? (
                    <div className="acc-ca-price-figure">
                      {`$${Number(props.grandTotal).toFixed(2)}`}
                    </div>
                  ) : (
                    <div className="acc-ca-price-figure">
                      <PriceTag
                        currency="$"
                        value={Number(props.grandTotal).toFixed(2)}
                      />
                    </div>
                  ),
                ]
              : [
                  router.query.zone_lang === "en-ca" ? (
                    <>
                      <PriceTag
                        className="pr-1"
                        currency="$"
                        value={Number(props.grandTotal).toFixed(2)}
                      />
                      {`($${Number(props.BaseGrandTotal).toFixed(2)})`}
                    </>
                  ) : (
                    <>
                      <PriceTag
                        className="pr-1"
                        currency="$"
                        value={Number(props.BaseGrandTotal).toFixed(2)}
                      />
                      {`(CA$${Number(props.grandTotal).toFixed(2)})`}
                    </>
                  ),
                ]}
          </strong>
        </div>
      </article>
      {/* total end */}
    </>
  );
};

export default InvoiceInfo;
