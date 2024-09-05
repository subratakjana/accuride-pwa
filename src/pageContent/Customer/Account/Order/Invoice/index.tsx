import { Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(() =>
    import("@Components/Customer/Account/AccountSidebar")
);
const OrderDetailOverview = dynamic(() =>
    import("@Components/Customer/Account/Order/OrderDetailOverview")
);
const OrderInformation = dynamic(() =>
    import("@Components/Customer/Account/Order/OrderInformation")
);
const InvoiceInfo = dynamic(() =>
    import("@Components/Customer/Account/Order/InvoiceInfo")
);

const Invoice = ({ orderDetail }) => {
    const { isAuthUser } = useContext(AuthContext);
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

    return (
        <>
            {/* <Head>
                <title>{`Order # ${orderDetail.increment_id}`}</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head> */}
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
                        <OrderDetailOverview
                            status={orderDetail.order_status}
                            incrementId={orderDetail.increment_id}
                            createdAt={orderDetail.invoice[0].created_at}
                            customerName={orderDetail.customer_name}
                            isInvoiced={orderDetail.is_invoiced}
                            isShipped={orderDetail.is_shipped}
                        />
                        <InvoiceInfo
                            orderDetail={orderDetail}
                            currency="$"
                            invoiceId={orderDetail.invoice[0].invoice_id}
                            invoiceIncrementId={
                                orderDetail.invoice[0].invoice_increment_id
                            }
                            items={orderDetail.invoice[0].invoiceItems}
                            subTotal={orderDetail.invoice[0].sub_total}
                            shippingAmount={
                                orderDetail.invoice[0].shipping_amount
                            }
                            taxAmount={orderDetail.tax_amount}
                            BaseTaxAmount={orderDetail.base_tax_amount}
                            grandTotal={orderDetail.invoice[0].grand_total}
                            BaseSubTotal={orderDetail.invoice[0].base_sub_total}
                            BaseShippingAmount={
                                orderDetail.invoice[0].base_shipping_amount
                            }
                            BaseGrandTotal={
                                orderDetail.invoice[0].base_grand_total
                            }
                        />
                        <OrderInformation
                            currency="$"
                            shippingMethod={orderDetail.shipping_method}
                            shippingDetail={orderDetail.shipping}
                            billingDetail={orderDetail.billing}
                            paymentMethod={orderDetail.payment_method}
                            cardDetail={orderDetail.card_details}
                        />
                    </Col>
                    {/* content end */}
                </Row>
            </Container>
        </>
    );
};

export default Invoice;
