import { Container, Row, Col } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AccountSidebar = dynamic(() =>
    import("@Components/Customer/Account/AccountSidebar")
);
const OrderDetailOverview = dynamic(() =>
    import("@Components/Customer/Account/Order/OrderDetailOverview")
);
const OrderInformation = dynamic(() =>
    import("@Components/Customer/Account/Order/OrderInformation")
);
const ViewInfo = dynamic(() =>
    import("@Components/Customer/Account/Order/ViewInfo")
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const View = ({ orderDetail }) => {
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

    //breadcrumbs
    const router = useRouter();
    const pathSegments = router.asPath.split("/").filter((segment) => segment);
    console.log(pathSegments, "products router url");
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
            url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}`,
            name: pathSegments[3],
        },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}/${pathSegments[3]}/${pathSegments[4]}`,
            name: "View",
        },
    ];
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
                    {orderDetail && Object.keys(orderDetail).length > 0 ? (
                        <Col xl className="acc-account-content pt-xl-5">
                            <OrderDetailOverview
                                status={orderDetail.order_status}
                                incrementId={orderDetail.increment_id}
                                createdAt={orderDetail.created_at}
                                customerName={orderDetail.customer_name}
                                isInvoiced={orderDetail.is_invoiced}
                                isShipped={orderDetail.is_shipped}
                                tracking={orderDetail.tracking}
                            />
                            <ViewInfo
                                currency="$"
                                orderDetail={orderDetail}
                                items={orderDetail.items}
                                subTotal={orderDetail.sub_total}
                                shippingAmount={orderDetail.shipping_amount}
                                taxAmount={orderDetail.tax_amount}
                                grandTotal={orderDetail.grand_total}
                                BaseSubTotal={orderDetail.base_sub_total}
                                BaseShippingAmount={
                                    orderDetail.base_shipping_amount
                                }
                                BaseTaxAmount={orderDetail.base_tax_amount}
                                BaseGrandTotal={orderDetail.base_grand_total}
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
                    ) : null}
                    {/* content end */}
                </Row>
            </Container>
        </>
    );
};

export default View;
