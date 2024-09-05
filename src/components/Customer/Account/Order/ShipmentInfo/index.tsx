import { Row, Col, Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { LoadingIndicator } from "@Components/Utilities";
import { useManualQuery } from "graphql-hooks";
import { useContext, useEffect, useState } from "react";
import SEND_EMAIL_ALL_SHIPMENT_DETALS from "@Graphql/queries/sendEmailAllShipmentDetails.graphql";
import SEND_EMAIL_SHIPMENT_DETALS from "@Graphql/queries/sendEmailShipmentDetails.graphql";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";

const ShipmentInfo = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { notify } = useContext(AuthContext);
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("id");
  const shipment = props.items;
  // table columns settings or options
  const columns = [
    {
      name: "Product Name",
      selector: "product_name",
      sortable: true,
      grow: 4,
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
      name: "Qty Shipped",
      selector: "qty",
      sortable: true,
      grow: 1,
      hide: "md",
      right: true,
    },
  ];

  // table expandable row content
  const ExpanableComponent = ({ data }) => (
    <Row>
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
        <strong>Qty Shipped: </strong>
        <span>{data.qty}</span>
      </Col>
    </Row>
  );

  const isExpanded = (row) => row.defaultExpanded;
  shipment.map((item) => {
    const newItem = item;
    newItem.defaultExpanded = true;
    return newItem;
  });

  // API calling for email all shipment details
  const [allShipment, { loading: allShipmentLoading }] = useManualQuery(
    SEND_EMAIL_ALL_SHIPMENT_DETALS.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const allShipmentData = data.data;
        if (allShipmentData) {
          notify(allShipmentData.allShipmentMailSend.message);
        }
      },
    },
  );
  // all invoice email send
  const emailAllShipmentHandler = (aiId) => {
    allShipment({
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

  // API calling for email shipment details
  const [singleShipment, { loading: shipmentLoading }] = useManualQuery(
    SEND_EMAIL_SHIPMENT_DETALS.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const shipmentData = data.data;
        if (shipmentData) {
          notify(shipmentData.shipmentMailSend.message);
        }
      },
    },
  );
  // single invoice email send
  const emailShipmentHandler = (siId) => {
    singleShipment({
      variables: {
        shipmentId: siId,
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
  if (allShipmentLoading || shipmentLoading) return <LoadingIndicator />;

  return (
    <>
      <Button
        variant="secondary"
        block={!(windowObj && windowSize.width >= 768)}
        className="text-uppercase mb-3"
        onClick={() => {
          emailAllShipmentHandler(orderId);
        }}
      >
        EMAIL ALL SHIPMENTS
      </Button>
      <header
        className={`d-flex align-items-center justify-content-between mb-3 pb-xl-2 border-medium ${
          windowObj && windowSize.width > 1024 ? "border-bottom" : ""
        }`}
      >
        <h2 className="text-uppercase mb-0">{`Shipment #${props.shipmentIncrementId}`}</h2>
        <Button
          variant="primary"
          className="text-uppercase"
          onClick={() => {
            emailShipmentHandler(Number(props.shipmentId));
          }}
        >
          EMAIL SHIPMENT
        </Button>
      </header>
      <DataTable
        noHeader
        columns={columns}
        data={shipment}
        className="acc-custom-datatable"
        pagination={shipment.length > 12}
        paginationPerPage={12}
        highlightOnHover
        expandableRows={!(windowObj && windowSize.width > 1024)}
        expandableRowDisabled={(row) => row.disabled}
        expandableRowsComponent={<ExpanableComponent />}
        expandableRowExpanded={isExpanded}
        responsive={false}
        paginationRowsPerPageOptions={[12, 24, 48]}
      />
    </>
  );
};

export default ShipmentInfo;
