import { Row, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { PriceTag, LoadingIndicator } from "@Components/Utilities";
import { useManualQuery } from "graphql-hooks";
import { useContext, useEffect, useState } from "react";
import SEND_EMAIL_ALL_INVOICE_DETALS from "@Graphql/queries/sendEmailAllInvoiceDetails.graphql";
import SEND_EMAIL_INVOICE_DETALS from "@Graphql/queries/sendEmailInvoiceDetails.graphql";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";

const GuestInvoiceInfo = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { notify } = useContext(AuthContext);
  // collect review id from URL
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id");

  // table data
  const invoice = props.items;
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
    <Row className="acc-invoice-info">
      <Col sm={6} md={4} className="mb-2">
        <div className="mb-2">
          <strong>Product Name: </strong>
          <span>{data.name}</span>
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
        <PriceTag
          currency={props.currency}
          value={data.price}
          className="test"
        />
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Qty Invoiced: </strong>
        <span>{data.qty}</span>
      </Col>
      <Col sm={6} md={4} className="mb-2">
        <strong>Subtotal: </strong>
        <PriceTag
          currency={props.currency}
          value={data.price * data.qty}
          className="d-inline-block"
        />
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
    // variables set for API call
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
        data={invoice}
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
          <PriceTag currency={props.currency} value={Number(props.subTotal)} />
        </div>
        <div className="d-flex justify-content-between justify-content-xl-end text-xl-right align-items-center mb-3">
          <strong>Shipping & Handling: </strong>
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

export default GuestInvoiceInfo;
