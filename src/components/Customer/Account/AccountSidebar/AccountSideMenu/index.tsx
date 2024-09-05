import { useState, useContext } from "react";
import { Accordion, Card, Button, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import { I18nLink } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";

const AccountSideMenu = () => {
  const [accordion, setState] = useState({ activeKey: "0" });
  const router = useRouter();
  const { loggedCustomerData } = useContext(AuthContext);

  const accordianClickedEvent = (index) => {
    if (accordion.activeKey !== index) {
      setState({
        ...accordion,
        activeKey: index,
      });
    } else {
      setState({
        ...accordion,
        activeKey: false,
      });
    }
  };

  if (!loggedCustomerData) return null;
  const companyAccount =
    loggedCustomerData && loggedCustomerData.customer.company;

  // my account menu
  const aspathArray = router.asPath.split("/");
  const currentPage = aspathArray[aspathArray.length - 1];
  const accountRawMenu = [
    {
      title: "My Account",
      link: "/customer/account",
      isDelimiter: false,
      isActive: currentPage === "account",
    },
    {
      title: "My Orders",
      link: "/customer/account/order",
      isDelimiter: true,
      isActive: currentPage === "order",
    },
    {
      title: "Address Book",
      link: "/customer/account/address",
      isDelimiter: false,
      isActive: currentPage === "address",
    },
    {
      title: "Account Information",
      link: "/customer/account/edit",
      isDelimiter: true,
      isActive: currentPage === "edit",
    },
    companyAccount !== ""
      ? {
          title: "Company Profile",
          link: "/customer/account/company/profile",
          isDelimiter: false,
          isActive: currentPage === "profile",
        }
      : null,
    companyAccount !== ""
      ? {
          title: "Company Users",
          link: "/customer/account/company/users",
          isDelimiter: false,
          isActive: currentPage === "users",
        }
      : null,
    companyAccount !== ""
      ? {
          title: "Company Team",
          link: "/customer/account/company/companyteam",
          isDelimiter: false,
          isActive: currentPage === "companyteam",
        }
      : null,
    companyAccount !== ""
      ? {
          title: "Roles and Permissions",
          link: "/customer/account/company/companyrole",
          isDelimiter: false,
          isActive: currentPage === "companyrole",
        }
      : null,
    {
      title: "My Invitations",
      link: "/customer/account/invitation",
      isDelimiter: false,
      isActive: currentPage === "invitation",
    },
    {
      title: "My Saved Cards",
      link: "/customer/account/card",
      isDelimiter: false,
      isActive: currentPage === "card",
    },
  ];
  const accountMenu = accountRawMenu.filter((el) => el !== null);

  return (
    <section className="acc-acount-sidemenu">
      {/* accordion start */}
      <Accordion className="acc-custom-accordion">
        <Card key={accordion.index} className="rounded-0">
          <Card.Header
            className={`p-0 border-bottom d-xl-none ${
              accordion.activeKey === "0" ? "border-medium" : "border-light"
            }`}
          >
            <Accordion.Toggle
              onClick={() => accordianClickedEvent("0")}
              className={`font-size-lg px-0 text-left bg-white text-dark font-weight-500 ${
                accordion.activeKey === "0" ? "" : "acc-arrow-transform"
              }`}
              as={Button}
              block
              variant="link"
              eventKey="0"
            >
              My Account
            </Accordion.Toggle>
          </Card.Header>

          {/* accordion body start */}
          <Accordion.Collapse eventKey="0" className="d-xl-block">
            <Card.Body className="bg-light">
              <Nav className="flex-column">
                {accountMenu.map((item) => (
                  <Nav.Item
                    key={item.title}
                    className={`${
                      item.isDelimiter === true
                        ? "border-bottom border-medium mb-2 pb-3"
                        : ""
                    } ${item.isActive === true ? "acc-activated" : ""}`}
                  >
                    <I18nLink href={item.link}>
                      <a>{item.title}</a>
                    </I18nLink>
                  </Nav.Item>
                ))}
              </Nav>
            </Card.Body>
          </Accordion.Collapse>
          {/* accordion body end */}
        </Card>
      </Accordion>
      {/* accordion end */}
    </section>
  );
};

export default AccountSideMenu;
