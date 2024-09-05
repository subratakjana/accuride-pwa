import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "graphql-hooks";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import LOGIN_BY_EMAIL_PASSWORD from "@Graphql/queries/loginByEmailPassword.graphql";
import { createEmptyCart } from "@Graphql/queries/createEmptyCart.graphql";
import EmailSubscription from "@Components/EmailSubscription";
import randomAlphanumericString from "@Hooks/randomAlphanumericString";
import useWindowDimensions from "@Hooks/windowDimention";
import criptoEncode, {
  criptoDecode,
  getCookie,
  setCookie,
} from "@Hooks/criptoEncodeDecodeCookie";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import dynamic from "next/dynamic";
import NextImage from "next/legacy/image";
import guestCartMarge from "@Hooks/guestCartMarge";
import { encode } from "@Components/Utilities/base64utils";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";
// import styles from "./Login.module.scss";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const Login = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [loginMesg, setLoginMesg] = useState(false);
  const [storeRemember, setStoreRemember] = useState(false);
  const [customerData, setCustomerData] = useState("");
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const router = useRouter();
  // For password show
  const [showPassword, setshowPassword] = useState(false);
  const showPasswordClick = () => setshowPassword(!showPassword);

  // abnadant cart vals
  const utmCampaign = router.query.utm_campaign;
  const utmMedium = router.query.utm_medium;
  const { notify, token, setToken, setCartId, setUserDetails } =
    useContext(AuthContext);

  // for validation
  const [validated, setValidated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  //breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
        isClickable: false,
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
        isClickable: false,
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
        isClickable: false,
      },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}/${pathSegments[2]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }
  useEffect(() => {
    const getToken = window.localStorage.getItem("userAuthToken");
    // if not logged in redirect to hompage
    const rememberObj = criptoDecode(getCookie("remember"));
    setStoreRemember(rememberObj !== "" ? JSON.parse(rememberObj) : false);
    if (
      getToken &&
      getToken !== "" &&
      getToken !== "null" &&
      getToken !== null
    ) {
      setToken(getToken);
      // setUserDetails(customerData);
      const asPath = `/${router.query.zone_lang}/customer/account`;
      const routerPathname = router.pathname;
      const pathName = routerPathname.substring(
        0,
        routerPathname.lastIndexOf("/"),
      );
      if (utmCampaign === "abandoned-cart" && utmMedium === "email") {
        router.push(`/${router.query.zone_lang}/checkout/cart`);
      } else {
        router.push({ pathname: `${pathName}/account` }, `${asPath}`, {
          shallow: true,
        });
      }
    }

    if (windowSize.width !== 0) updateWindowObj(true);

    const loginUserId = document.getElementById("login_user_name");
    loginUserId.focus();
  }, []);

  useEffect(() => {
    if (token !== null && customerData) {
      setUserDetails(customerData);
    }
  }, [token, customerData]);

  useEffect(() => {
    if (storeRemember && storeRemember.remember) {
      setUserEmail(storeRemember.email);
      setUserPassword(storeRemember.password);
      const rememberField = document.querySelector('[name="remember"]');
      if (rememberField) rememberField.checked = true;
    }
  }, [storeRemember]);

  // API calling for cart id
  const [createEmptyCartFn, { loading: loadingCart, data: cartData }] =
    useMutation(createEmptyCart.loc.source.body, {
      onSuccess: (res) => {
        const { data } = res;
        setCartId(data.createEmptyCart);
      },
    });

  /**
   * login field keypress
   */
  const fieldKeypress = () => {
    setLoginMesg();
  };
  // API calling for login method
  const [loginByEmailPassword, { loading: loginLoading }] = useMutation(
    LOGIN_BY_EMAIL_PASSWORD.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (data) {
          notify("You have successfully logged in...");
          localStorage.setItem(
            "userAuthToken",
            data.generateCustomerToken.token,
          );
          setCookie("userAuthToken", data.generateCustomerToken.token, 30);
          const userToken = data.generateCustomerToken.token;
          // send userAuthTokek to context
          setCustomerData(JSON.stringify(data.generateCustomerToken));
          setToken(userToken);
          // create cart id
          createEmptyCartFn().then(({ error }) => {
            if (error) {
              if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                notify(error.graphQLErrors[0].message, "error");
              } else {
                notify("Please check your network connection!", "error");
              }
            }
          });
          setCartId(null);
        }
      },
    },
  );

  /**
   * remember Me Handling.
   * auth context and local storage handling.
   */
  const rememberMeHandling = () => {
    const rememberField = document.querySelector(
      'input[name="remember"]:checked',
    );
    /** remember me store user remember details */
    const rememberObj = {
      remember: !!rememberField,
    };
    if (rememberField) {
      rememberObj.email = userEmail;
      rememberObj.password = userPassword;
    }
    const emcodeData = criptoEncode(JSON.stringify(rememberObj));
    setCookie("remember", emcodeData, 30);
  };

  // form submition method
  const loginForm = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    if (form.checkValidity() === true) {
      event.preventDefault();
      rememberMeHandling();
      loginByEmailPassword({
        variables: {
          email: encode(userEmail),
          password: encode(userPassword),
        },
        operationName: {
          headers: [{ headerName: "cf-token", headerValue: cfToken }],
        },
      }).then(({ error }) => {
        setCfTokenCall(cfTokenCall + 1);
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            setLoginMesg(error.graphQLErrors[0].message);
          } else {
            notify("Please check your network connection!", "error");
          }
          setTimeout(() => {
            setLoginMesg();
          }, 10000);
        }
      });
    }
  };

  /**
   * @param {cartdata} guestCartMarge custom hooks.
   * guest cart marging with user cart.
   * page redirection after successfull login.
   * and return status after successfull add to cart.
   * if no guest cart page redirect also with this custom hooks.
   */
  const statusAddCart = guestCartMarge(
    { cartData },
    { utmCampaign },
    { utmMedium },
  );

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="preauth-bg h-100 position-relative">
        <div className="acc-background-image">
          <NextImage
            src={"/assets/images/login-background-slides.jpg"}
            alt="Background Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <Container
          className={`section-padding acc-login-custom-container-md px-0 form-gradient-bg position-relative ${
            windowObj && windowSize.width < 1025 && "pt-0"
          }`}
        >
          <Row noGutters>
            {/* login */}
            <Col md={12} className="bg-secondary login-form">
              <div className="acc-login-custom-container-sm py-4 px-3">
                {/* <span className="d-block mb-3">If you have an account, sign in with your email address.</span> */}
                <span className="d-block mb-3 text-center">
                  Already have an account? Sign in below.
                </span>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={loginForm}
                  className="acc-login-custom-container-sm"
                >
                  <Form.Group>
                    <input
                      required
                      type="email"
                      placeholder="Email"
                      defaultValue={
                        storeRemember.remember ? storeRemember.email : userEmail
                      }
                      onChange={(event) => setUserEmail(event.target.value)}
                      onKeyPress={fieldKeypress}
                      className="rounded-0 form-control"
                      id="login_user_name"
                    />
                    <Form.Control.Feedback type="invalid" className="text-left">
                      Required field, please enter valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="position-relative">
                    <input
                      required
                      type={`${showPassword ? "text" : "password"}`}
                      placeholder="Password"
                      defaultValue={
                        storeRemember.remember
                          ? storeRemember.password
                          : userPassword
                      }
                      onChange={(event) => setUserPassword(event.target.value)}
                      onKeyPress={fieldKeypress}
                      className="rounded-0 form-control"
                    />
                    <Button
                      onClick={showPasswordClick}
                      variant="link"
                      type="button"
                      className="acc-login-eye-bttn p-0 font-size-lg"
                    >
                      {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </Button>
                    <Form.Control.Feedback type="invalid" className="text-left">
                      Required field, please enter valid password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  {loginMesg ? (
                    <Alert variant="danger" className="bg-white">
                      {loginMesg}
                    </Alert>
                  ) : null}
                  <input type="hidden" name="cf-token" value={cfToken} />
                  <div className="pb-3">
                    <CloudflareTurnstile
                      setCfToken={setCfToken}
                      cfTokenCall={cfTokenCall}
                      formName="Login Form"
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between flex-sm-nowrap flex-wrap">
                    <Form.Group
                      className={`order-0 text-left text-dark mb-0 ${
                        windowObj && windowSize.width >= 576 && "flex-1"
                      }`}
                    >
                      <Form.Check
                        custom
                        type="checkbox"
                        onChange={() =>
                          storeRemember ? storeRemember.remember : storeRemember
                        }
                        defaultChecked={
                          storeRemember ? storeRemember.remember : storeRemember
                        }
                        name="remember"
                        label="Remember Me"
                        id="checkbox-1"
                      />
                    </Form.Group>
                    <div
                      className={`order-2 flex-1 text-center mt-3 mt-sm-0 ${
                        windowObj && windowSize.width >= 576 && "order-1"
                      }`}
                    >
                      <Button
                        disabled={!cfToken}
                        variant={cfToken ? "primary" : "medium"}
                        type="submit"
                        className="text-uppercase btn-primary-gradient"
                      >
                        Log in
                      </Button>
                    </div>
                    <div
                      className={`order-1 ${
                        windowObj &&
                        windowSize.width >= 576 &&
                        "flex-1 text-right order-2"
                      }`}
                    >
                      <I18nLink href="/customer/forgotpassword">
                        <Button
                          variant="link"
                          type="button"
                          className="d-md-inline text-dark font-size-md p-0"
                        >
                          Forgot Password?
                        </Button>
                      </I18nLink>
                    </div>
                  </div>
                  <input
                    type="hidden"
                    name="_csrf"
                    value={randomAlphanumericString(16)}
                  />
                </Form>
              </div>
            </Col>

            {/* signup */}
            <Col md={12} className="mt-4 text-center pb-3">
              <div className="bg-primary h3 py-2 px-3 text-shadow font-weight-300">
                <span className="text-white pr-2">Take</span>
                <span className="text-secondary font-weight-700 font-italic pr-2">
                  ADVANTAGE
                </span>
                <span className="text-white">
                  of Our Member Benefits TODAY!
                </span>
              </div>

              <div className="pro-advantage-wrap">
                <div className="text-center py-5 position-relative px-4 px-md-0">
                  <I18nLink href="/proadvantage">
                    <Button variant="link" type="button" className="p-0">
                      <NextImage
                        width={466}
                        height={113}
                        src="/assets/images/login/pro-advantage-login.png"
                        objectFit="cover"
                      />

                      <span className="pro-advantage-hover position-absolute">
                        <span className="unset-img">
                          <NextImage
                            layout="fill"
                            priority
                            objectFit="contain"
                            src="/assets/images/login/pro-advantage-hover.png"
                            className="custom-img"
                          />
                        </span>
                      </span>
                    </Button>
                  </I18nLink>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <EmailSubscription />
      {/* page loader when API calling and busy component */}
      {loadingCart ||
      loginLoading ||
      statusAddCart.completeHooks ||
      (statusAddCart.completeHooks &&
        statusAddCart.statusAddCart.simpleCartAdd &&
        statusAddCart.statusAddCart.configureCartAdd) ? (
        <LoadingIndicator />
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
