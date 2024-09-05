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
const ShipmentInfo = dynamic(() =>
    import("@Components/Customer/Account/Order/ShipmentInfo")
);

const Shipment = ({ orderDetail }) => {
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
                            createdAt={orderDetail.created_at}
                            customerName={orderDetail.customer_name}
                            isInvoiced={orderDetail.is_invoiced}
                            isShipped={orderDetail.is_shipped}
                        />
                        <ShipmentInfo
                            shipmentId={orderDetail.shipment[0].shipment_id}
                            shipmentIncrementId={
                                orderDetail.shipment[0].shipment_increment_id
                            }
                            items={orderDetail.shipment[0].shipmentItems}
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

export default Shipment;
