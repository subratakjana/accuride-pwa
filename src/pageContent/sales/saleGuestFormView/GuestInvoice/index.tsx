import { Container, Row, Col } from "react-bootstrap";
import { LoadingIndicator } from "@Components/Utilities";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const GuestOrderDetailOverview = dynamic(
  () => import("../GuestOrderDetailOverview"),
);
const GuestOrderInformation = dynamic(() => import("../GuestOrderInformation"));
const GuestInvoiceInfo = dynamic(() => import("../GuestInvoiceInfo"));

const GuestInvoice = () => {
  const { token, simpleRedirect } = useContext(AuthContext);
  const router = useRouter();
  const [orderDetail, setOrderDetails] = useState();
  useEffect(() => {
    setOrderDetails(
      JSON.parse(window.localStorage.getItem("guestOrderDetails")),
    );
  }, []);

  if (
    (orderDetail && orderDetail.order_id !== router.query.id) ||
    (orderDetail && orderDetail.order_invoice.length === 0)
  )
    simpleRedirect("/sales/guest/form");
  if (
    !orderDetail ||
    token ||
    (orderDetail && orderDetail.order_id !== router.query.id) ||
    (orderDetail && orderDetail.order_invoice.length === 0)
  )
    return <LoadingIndicator />;

  return (
    <>
      <Head>
        <title>{`Order # ${orderDetail.order_id}`}</title>
        <meta name="keywords" content="" />
        <meta name="description" content="" />
      </Head>
      <Container className="section-padding pt-0">
        <Row>
          {/* content start */}
          <Col xl className="pt-xl-5">
            <GuestOrderDetailOverview
              reorderItems={orderDetail.ordered_items}
              status={orderDetail.state}
              incrementId={orderDetail.order_increment_id}
              createdAt={orderDetail.purchase_date}
              customerName={orderDetail.billing_address.name}
              isInvoiced={
                orderDetail.order_invoice &&
                orderDetail.order_invoice.length > 0
              }
              isShipped={
                orderDetail.order_shipment &&
                orderDetail.order_shipment.length > 0
              }
            />
            <GuestInvoiceInfo
              currency="$"
              invoiceId={orderDetail.order_invoice[0].invoice_id}
              invoiceIncrementId={
                orderDetail.order_invoice[0].invoice_increment_id
              }
              items={orderDetail.order_invoice[0].invoice_items}
              subTotal={orderDetail.order_invoice[0].subtotal}
              shippingAmount={orderDetail.order_invoice[0].shipping_amount}
              taxAmount={orderDetail.tax_amount}
              grandTotal={orderDetail.order_invoice[0].grand_total}
            />
            <GuestOrderInformation
              currency="$"
              shippingMethod={orderDetail.shipping_method}
              shippingDetail={orderDetail.shipping_address}
              billingDetail={orderDetail.billing_address}
              paymentMethod={orderDetail.payment_information.method_name}
              cardDetail={orderDetail.payment_information}
            />
          </Col>
          {/* content end */}
        </Row>
      </Container>
    </>
  );
};
export default GuestInvoice;
