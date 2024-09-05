import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "graphql-hooks";
import SEND_INVITATION from "@Graphql/queries/postCustomerInvitation.graphql";
import { useRouter } from "next/router";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";

const AccountSidebar = dynamic(
  () => import("@Components/Customer/Account/AccountSidebar"),
);
const EmailSubscription = dynamic(
  () => import("@Components/EmailSubscription"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Send = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  const { notify } = useContext(AuthContext);

  const [validated, setValidated] = useState(false);
  const [sendEmail, setSendEmail] = useState("");
  const [sendMessage, setSendMessage] = useState("");

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
      name: "Send",
    },
  ];
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // API calling for send invitation method
  const [sendInvitation] = useMutation(SEND_INVITATION.loc.source.body, {
    onSuccess: (res) => {
      const { data } = res;
      if (data) {
        if (data.sendInvitation.message.success !== null) {
          notify(data.sendInvitation.message.success, "success");
        }
        if (data.sendInvitation.message.notice !== null) {
          notify(data.sendInvitation.message.notice, "error");
        }
        if (data.sendInvitation.message.error !== null) {
          notify(data.sendInvitation.message.error, "error");
        }
        router.back();
      }
    },
  });

  // form submition method
  const sendInvitationForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      event.preventDefault();
      sendInvitation({
        variables: {
          email: sendEmail,
          message: sendMessage,
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
    }
  };

  return (
    <>
      {/* <Head>
                <title>Send Invitations</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head> */}
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
          <Col xl className="acc-account-content pt-xl-5">
            <section>
              <header className="mb-3">
                <h2 className="text-uppercase">Send Invitations</h2>
                <p>Invite your friend by entering the email addresses.</p>
              </header>
              <Form
                noValidate
                validated={validated}
                onSubmit={sendInvitationForm}
              >
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(event) => setSendEmail(event.target.value)}
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-50" : ""
                    }`}
                  />
                  <Form.Control.Feedback type="invalid" className="text-left">
                    This is a required field.
                  </Form.Control.Feedback>
                </Form.Group>
                {/* message */}
                <Form.Group>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="5"
                    onChange={(event) => setSendMessage(event.target.value)}
                    className={`${
                      windowObj && windowSize.width > 1024 ? "w-50" : ""
                    }`}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  type="submit"
                  className={`text-uppercase mt-3 ${
                    windowObj && windowSize.width <= 991
                      ? "btn-block"
                      : "btn-lg"
                  }`}
                >
                  Send Invitation
                </Button>
              </Form>
            </section>
          </Col>
          {/* content end */}
        </Row>
      </Container>

      <EmailSubscription />
    </>
  );
};

export default Send;
