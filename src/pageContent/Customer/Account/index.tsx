import { Container, Row, Col } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const AccountSidebar = dynamic(() =>
    import("@Components/Customer/Account/AccountSidebar")
);
const AccountInformation = dynamic(() =>
    import("@Components/Customer/Account/AccountInformation")
);
const DefaultAddress = dynamic(() =>
    import("@Components/Customer/Account/DefaultAddress")
);
const RecentOrder = dynamic(() =>
    import("@Components/Customer/Account/RecentOrder")
);
const EmailSubscription = dynamic(() =>
    import("@Components/EmailSubscription")
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Account = () => {
    const { isAuthUser, loggedCustomerData } = useContext(AuthContext);
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
    let crumbs = [];
    crumbs = [
        { url: `/${router.query.zone_lang}`, name: "Home" },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}`,
            name: pathSegments[1],
            isClickable: false,
        },
        {
            url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
            name: "Account",
        },
    ];

    if (!loggedCustomerData) return null;
    const customerAccountData =
        loggedCustomerData && loggedCustomerData.customer;

    return (
        <>
            <BreadCrumbs crumbs={crumbs} />
            {customerAccountData ? (
                <>
                    <Container className="section-padding pt-0">
                        <Row className="align-items-start">
                            {/* account sidebar start */}
                            <Col
                                xl
                                className={`acc-account-sidebar pt-xl-5 ${
                                    isSticky ? "sticky" : ""
                                }`}
                            >
                                <AccountSidebar />
                            </Col>
                            {/* account sidebar end */}

                            {/* account content start */}
                            <Col xl className="acc-account-content pt-xl-5">
                                {/* header start */}
                                <header className="mb-3">
                                    <h1 className="text-uppercase mb-0">
                                        My Account
                                    </h1>
                                </header>
                                {/* header end */}

                                {/* account information start */}
                                <AccountInformation
                                    firstName={customerAccountData.firstname}
                                    lastName={customerAccountData.lastname}
                                    email={customerAccountData.email}
                                />
                                {/* account information end */}

                                {/* default address */}
                                <DefaultAddress
                                    addresses={customerAccountData.addresses}
                                />

                                {/* recent review */}
                                {/* <RecentReview /> */}

                                {/* recent order */}
                                <RecentOrder />
                            </Col>
                            {/* account content end */}
                        </Row>
                    </Container>
                    <EmailSubscription />
                </>
            ) : (
                ""
            )}
        </>
    );
};

export default Account;
