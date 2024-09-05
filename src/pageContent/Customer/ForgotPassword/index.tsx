import { Container, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "graphql-hooks";
import FORGOT_PASSWORD from "@Graphql/queries/forgotPassword.graphql";
import { LoadingIndicator } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";
import dynamic from "next/dynamic";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ForgotPassword = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { notify } = useContext(AuthContext);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  //breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
      isClickable: false,
    },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
      name: "Forgot Password",
    },
  ];

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  // API calling for forgot password method
  const [forgotPassword, { loading }] = useMutation(
    FORGOT_PASSWORD.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (data) {
          notify(data.forgotPassword.message);
          router.back();
        }
      },
    },
  );

  // form submition method
  const forgotPasswwordForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      event.preventDefault();
      forgotPassword({
        variables: {
          email: userEmail,
        },
        operationName: {
          headers: [{ headerName: "cf-token", headerValue: cfToken }],
        },
      }).then(({ error }) => {
        setCfTokenCall(cfTokenCall + 1);
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
  if (loading) return <LoadingIndicator />;

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="section-padding">
        <Container>
          {/* header start */}
          <header className="mb-3 text-center text-md-left">
            <h1 className="mb-3 text-uppercase">Forgot Your Password?</h1>
            <span className="d-block">
              Please enter your email address below to receive a password reset
              link.
            </span>
          </header>
          {/* header end */}

          <Form
            noValidate
            validated={validated}
            onSubmit={forgotPasswwordForm}
            className={`${windowObj && windowSize.width > 768 ? "w-50" : ""}`}
          >
            <Form.Group>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                onChange={(event) => setUserEmail(event.target.value)}
              />
              <Form.Control.Feedback type="invalid" className="text-left">
                This is a required field and enter valid email id.
              </Form.Control.Feedback>
            </Form.Group>
            <input type="hidden" name="cf-token" value={cfToken} />
            <div>
              <div className="pb-3">
                <CloudflareTurnstile
                  setCfToken={setCfToken}
                  cfTokenCall={cfTokenCall}
                  formName="Forgot Password Form"
                />
              </div>
            </div>
            <Button
              disabled={!cfToken}
              variant={cfToken ? "secondary" : "medium"}
              type="submit"
              className={`text-uppercase ${
                windowObj && windowSize.width <= 767 ? "btn-block" : "btn-lg"
              }`}
            >
              Reset My Password
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default ForgotPassword;
