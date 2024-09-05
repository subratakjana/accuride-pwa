import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { useMutation } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import { deleteTokenBaseCard } from "@Graphql/queries/deleteTokenBaseCard.graphql";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);

const Card = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const { notify, simpleRedirect, decode, userDetails } =
    useContext(AuthContext);
  const [cardList, setCardList] = useState([]);
  const [delCardId, setDelCardId] = useState(null);
  const [show, setShow] = useState(false);
  const [loaderShow, setLoaderShow] = useState(false);

  // Function for sidebar sticky issue start
  const [isSticky, setIsSticky] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 150) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
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
      name: "Card",
    },
  ];
  const handleClose = () => {
    setShow(false);
    setDelCardId(null);
  };
  const handleShow = (cardid) => {
    setShow(true);
    setDelCardId(cardid);
  };

  //  API calling for get billing and shipping data on cart
  const cybersourceCardListFn = () => {
    setLoaderShow(true);
    const userParseDetails = JSON.parse(userDetails);
    const customerId = decode(userParseDetails.customer_id);
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ADMIN_ACCESS_KEY}`,
      },
    };

    const apiEndPoint = `${process.env.NEXT_PUBLIC_GRAPHQL_BASE_ENDPOINT}/rest/V1/tokenbase/search?searchCriteria[filter_groups][0][filters][0][field]=customer_id&searchCriteria[filter_groups][0][filters][0][value]=${customerId}&searchCriteria[filter_groups][0][filters][0][condition_type]=finset`;

    axios
      .get(apiEndPoint, config)
      .then((response) => {
        setLoaderShow(false);
        if (response.status === 200) {
          setCardList(response.data.items);
        }
      })
      .catch((error) => {
        setLoaderShow(false);
        notify(error, "error");
      });
  };

  const [InactiveCardByHashFn, { loading: inactiveCardLoading }] = useMutation(
    deleteTokenBaseCard.loc.source.body,
    {
      onSuccess: () => {
        cybersourceCardListFn();
        notify("Your card has been successfully deleted", "success");
      },
    },
  );

  // --- delete card function ----
  const deleteCard = () => {
    InactiveCardByHashFn({ variables: { hash: delCardId } }).then(
      ({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            notify(error.graphQLErrors[0].message, "error");
          } else {
            notify("Please check your network connection!", "error");
          }
        }
      },
    );
    handleClose();
  };

  const redirectAddEditPage = (pageUrl, cardId) => {
    if (cardId) localStorage.setItem("cardId", cardId);
    simpleRedirect(pageUrl);
  };

  /**
   * To call the saed cart address list
   */
  useEffect(() => {
    cybersourceCardListFn();
    if (windowSize.width !== 0) updateWindowObj(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* <Head>
                <title>Customer Saved Cards</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head> */}
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding pt-0 acc-card">
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
            <header className="mb-3">
              <h1 className="text-uppercase mb-2">My Saved Credit Cards</h1>
              <I18nLink href="/customer/account/card/addcard">
                <Button
                  variant="secondary"
                  className={`text-uppercase ${
                    windowObj && windowSize.width < 991 ? "btn-block" : ""
                  }`}
                >
                  Add New Card
                </Button>
              </I18nLink>
            </header>

            <Row className="acc-card-list">
              {cardList.map((item) => [
                Number(item.active) === 1 ? (
                  <Col key={item.id} sm={6} xl={6} className="acc-item">
                    <article
                      className={`${
                        windowObj && windowSize.width >= 768
                          ? "bg-light p-3"
                          : ""
                      }`}
                    >
                      <span className="d-block mb-3">
                        <strong>Card: </strong>
                        {`XXXX-${item.additional_object.cc_last4}`}
                      </span>
                      <strong className="d-block">Card Info</strong>
                      <span className="d-block">
                        {item.address_object.firstname}
                        &nbsp;
                        {item.address_object.lastname}
                      </span>
                      <span className="d-block">
                        {item.address_object.city}
                      </span>
                      <span className="d-block">{item.address[3]}</span>
                      <span className="d-block">{item.address[2]}</span>
                      <span className="d-block">
                        T:
                        <span className="text-primary pl-1">
                          {item.address[5]}
                        </span>
                      </span>
                      <footer className="d-flex align-items-center mt-3">
                        <Button
                          variant="secondary"
                          className={`text-uppercase mr-2 ${
                            windowObj && windowSize.width <= 991
                              ? "btn-block"
                              : ""
                          }`}
                          onClick={() => {
                            redirectAddEditPage(
                              "/customer/account/card/editcard",
                              item.hash,
                            );
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="secondary"
                          className={`text-uppercase ml-2 mt-0 ${
                            windowObj && windowSize.width <= 991
                              ? "btn-block"
                              : ""
                          }`}
                          onClick={() => {
                            handleShow(item.hash);
                          }}
                        >
                          Delete
                        </Button>
                      </footer>
                    </article>
                  </Col>
                ) : null,
              ])}
            </Row>
          </Col>
          {/* account content end */}
        </Row>

        {/* delete modal start */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Body>
            <span>Are you sure want to delete credit card details?</span>
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={handleClose}
              className="m-0 ml-2 text-uppercase"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={deleteCard}
              className="m-0 ml-2 text-uppercase"
            >
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        {/* delete modal end */}
      </Container>
      <EmailSubscription />
      {loaderShow || inactiveCardLoading ? <LoadingIndicator /> : ""}
    </>
  );
};
export default Card;
