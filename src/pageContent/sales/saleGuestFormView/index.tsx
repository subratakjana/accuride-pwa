import { Container, Row, Col } from "react-bootstrap";
import { LoadingIndicator } from "@Components/Utilities";
import { useContext, useEffect, useState } from "react";
import Head from "next/head";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const GuestOrderDetailOverview = dynamic(
  () => import("./GuestOrderDetailOverview"),
);
const GuestOrderInformation = dynamic(() => import("./GuestOrderInformation"));
const GuestViewInfo = dynamic(() => import("./GuestViewInfo"));

const GuestFormView = () => {
  const [orderDetail, setOrderDetails] = useState();
  const { token, simpleRedirect } = useContext(AuthContext);
  const router = useRouter();
  useEffect(() => {
    setOrderDetails(
      JSON.parse(window.localStorage.getItem("guestOrderDetails")),
    );
  }, []);

  if (token) simpleRedirect("/customer/account/order");
  if (orderDetail && orderDetail.order_id !== router.query.id)
    simpleRedirect("/sales/guest/form");
  if (
    !orderDetail ||
    token ||
    (orderDetail && orderDetail.order_id !== router.query.id)
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
            <GuestViewInfo
              currency="$"
              items={orderDetail.ordered_items}
              subTotal={orderDetail.subtotal}
              shippingAmount={orderDetail.shipping_amount}
              taxAmount={orderDetail.tax_amount}
              grandTotal={orderDetail.grand_total}
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
export default GuestFormView;
