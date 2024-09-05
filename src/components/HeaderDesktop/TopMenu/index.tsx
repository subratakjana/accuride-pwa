import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { I18nLink } from "@Components/Utilities";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useQuery } from "graphql-hooks";
import { desktopTopMenu } from "@Graphql/queriesgraphcms/getDesktopTopMenu.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import styles from "./TopMenu.module.scss";

const TopMenu = () => {
  const { token, loggedCustomerData } = useContext(AuthContext);
  const [customerName, setCustomerName] = useState("");
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  useEffect(() => {
    if (token && loggedCustomerData && loggedCustomerData.customer) {
      const customerDetails = loggedCustomerData.customer;
      setCustomerName(customerDetails.firstname);
    }
  }, [token, loggedCustomerData]);

  // API calling for other stores menu
  let topMenuOneData = [];
  let topMenuTwoData = [];
  const { loading: loadingTopMenu, data: dataTopMenu } = useQuery(
    desktopTopMenu.loc.source.body,
    {
      variables: {
        languages: "English",
      },
      operationName: { clientName: "graphCms" },
    },
  );

  if (loadingTopMenu) return null;
  if (dataTopMenu) topMenuOneData = dataTopMenu.desktopTopMenuOnes[0].childMenu;
  if (dataTopMenu) topMenuTwoData = dataTopMenu.desktopTopMenuTwos;

  const closeMenu = () => {
    document.body.click();
  };

  return (
    <Container
      className={`${styles["acc-header-top-bar"]} ${
        windowObj && windowSize.width <= 1024 ? "px-0" : null
      }`}
    >
      <Row noGutters>
        {/* Right Menu Start */}
        <Col xs={6} className="text-xl-right">
          <Nav className="justify-content-xl-end align-items-center h-100">
            {token === null ? (
              <Nav.Item>
                <I18nLink href="/customer/login">
                  <a aria-label="link">Login / Sign Up</a>
                </I18nLink>
              </Nav.Item>
            ) : (
              <NavDropdown
                title={`Welcome ${customerName}`}
                alignRight
                rootCloseEvent="click"
              >
                <I18nLink href="/customer/account">
                  <a
                    href="/customer/account"
                    aria-label="link"
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    My Account
                  </a>
                </I18nLink>
                <I18nLink href="/customer/logout">
                  <a
                    href="/customer/logout"
                    aria-label="link"
                    className="dropdown-item"
                    onClick={closeMenu}
                  >
                    Logout
                  </a>
                </I18nLink>
              </NavDropdown>
            )}
          </Nav>
        </Col>
        {/* Right Menu End */}
        {/* Left Menu Start */}
        <Col xs={6} xl className="text-right">
          <div className="pr-0">
            <Nav className="justify-content-end align-items-center h-100">
              {topMenuOneData.length > 0 ? (
                <>
                  {topMenuOneData.map((topMenuOneItem) => (
                    <Nav.Item
                      className={`${
                        topMenuOneItem.show === false ? "d-none" : ""
                      }`}
                      key={topMenuOneItem.id}
                    >
                      {topMenuOneItem.externalLink !== "0" ? (
                        <I18nLink
                          href={topMenuOneItem.pageSlugUrl}
                          isMagentoRoute={
                            topMenuOneItem.staticLink === "0" ? 0 : 1
                          }
                        >
                          <a
                            aria-label="link"
                            target={
                              topMenuOneItem.openInNewTab === true
                                ? "_blank"
                                : "_self"
                            }
                            rel="noopener noreferrer"
                            className={
                              topMenuOneItem.menuHighlighter === true
                                ? "text-secondary font-weight-700"
                                : null
                            }
                          >
                            {topMenuOneItem.menuTitle}
                          </a>
                        </I18nLink>
                      ) : (
                        <a
                          href={topMenuOneItem.pageSlugUrl}
                          target={
                            topMenuOneItem.openInNewTab === true
                              ? "_blank"
                              : "_self"
                          }
                          aria-label="link"
                          className={
                            topMenuOneItem.menuHighlighter === true
                              ? "text-secondary font-weight-700"
                              : null
                          }
                          rel="noreferrer noopener"
                        >
                          {topMenuOneItem.menuTitle}
                        </a>
                      )}
                    </Nav.Item>
                  ))}
                </>
              ) : null}
              {topMenuTwoData.length > 0 ? (
                <>
                  {topMenuTwoData.map((topMenuTwoItem) => (
                    <Nav.Item key={topMenuTwoItem.id}>
                      {topMenuTwoItem.externalLink !== "0" ? (
                        <I18nLink
                          href={topMenuTwoItem.pageSlugUrl}
                          isMagentoRoute={
                            topMenuTwoItem.staticLink === "0" ? 0 : 1
                          }
                        >
                          <a
                            aria-label="link"
                            target={
                              topMenuTwoItem.openInNewTab === true
                                ? "_blank"
                                : "_self"
                            }
                            rel="noopener noreferrer"
                            className={
                              topMenuTwoItem.menuHighlighter === true
                                ? "text-secondary font-weight-700"
                                : null
                            }
                          >
                            {topMenuTwoItem.menuTitle}
                          </a>
                        </I18nLink>
                      ) : (
                        <a
                          href={topMenuTwoItem.pageSlugUrl}
                          target={
                            topMenuTwoItem.openInNewTab === true
                              ? "_blank"
                              : "_self"
                          }
                          aria-label="link"
                          id="phNo"
                          className={
                            topMenuTwoItem.menuHighlighter === true
                              ? "text-secondary font-weight-700"
                              : null
                          }
                          rel="noreferrer noopener"
                        >
                          {topMenuTwoItem.menuTitle}
                        </a>
                      )}
                    </Nav.Item>
                  ))}
                </>
              ) : null}
            </Nav>
          </div>
        </Col>
        {/* Left Menu End */}
      </Row>
    </Container>
  );
};

export default TopMenu;
