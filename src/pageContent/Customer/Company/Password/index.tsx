import { Container, Form, Button } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "graphql-hooks";
import { useRouter } from "next/router";
import CHANGE_PASSWORD_QUERY from "@Graphql/queries/changePassword.graphql";
import GET_COMPANY_TOKEN from "@Graphql/queries/companyCustomerToken.graphql";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";

const CompanyPasswordPage = () => {
  const router = useRouter();
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const [validated, setValidated] = useState(false);
  const [userNewPassword, setNewPassword] = useState();
  const { notify, goToLogin } = useContext(AuthContext);
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
    if (
      targetObj.required &&
      targetObj.value.trim() === "" &&
      (targetObj.type === "text" || targetObj.type === "textarea")
    ) {
      targetObj.value = "";
    }
    const password = document.querySelector("input[name='password']").value;
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else if (targetObj.name === "password") {
      targetObj.value = targetObj.value.replace(/ /g, "");
      passwordRegex.test(password)
        ? targetObj.classList.remove("is-invalid")
        : targetObj.classList.add("is-invalid");
    } else if (targetObj.name === "confirmPassword" && targetObj.value !== "") {
      const confirmPass = targetObj.value;
      if (password !== confirmPass) {
        targetObj.classList.add("is-invalid");
      } else {
        targetObj.classList.remove("is-invalid");
      }
    } else {
      targetObj.classList.remove("is-invalid");
    }
  };

  // API calling for forgot password method
  const [changePassword, { loading }] = useMutation(
    CHANGE_PASSWORD_QUERY.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (data) {
          notify(data.changePassword.message, "success");
          goToLogin();
        }
      },
    },
  );

  const [companyToken, { loading: tokenLoading }] = useMutation(
    GET_COMPANY_TOKEN.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        if (data.getCompanyCustomerToken) {
          changePassword({
            variables: {
              id: router.query.id,
              newPassword: userNewPassword.newPassword,
              confirmPassword: userNewPassword.confirmPassword,
              newPasswordToken: data.getCompanyCustomerToken.company_token,
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
      },
    },
  );

  // form submition method
  const changeComapnyPasswordForm = (event) => {
    event.preventDefault();
    const newPasswordForm = event.currentTarget;

    if (
      newPasswordForm.checkValidity() === true &&
      userNewPassword.newPassword === userNewPassword.confirmPassword &&
      userNewPassword.newPassword.length >= 7
    ) {
      setValidated(true);
      companyToken({
        variables: {
          company_customer_email: userNewPassword.email,
        },

        operationName: {
          headers: [{ headerName: "cf-token", headerValue: cfToken }],
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

  if (loading || tokenLoading) return <LoadingIndicator />;

  return (
    <>
      {/* <Head>
                <title>Set Your Password</title>
                <meta name="keywords" content="" />
                <meta name="description" content="" />
            </Head> */}
      <section className="section-padding">
        <Container>
          {/* header start */}
          <header className="mb-3 text-center text-md-left">
            <h1 className="mb-3 text-uppercase">Set Your Password</h1>
          </header>
          {/* header end */}

          <Form
            className={`${
              windowObj && windowSize.width > 768 ? "w-50 text-md-left" : ""
            }`}
            validated={validated}
            onSubmit={changeComapnyPasswordForm}
          >
            <Form.Group>
              <Form.Control
                required
                type="email"
                placeholder="Email"
                name="email"
                defaultValue={userNewPassword ? userNewPassword.email : ""}
                onBlur={validationFormField}
                onKeyUp={validationFormField}
                onChange={(event) =>
                  setNewPassword({
                    ...userNewPassword,
                    email: event.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid" className="text-left">
                This is a required field and enter valid email id.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="password"
                placeholder="New Password"
                name="password"
                onBlur={validationFormField}
                onKeyUp={validationFormField}
                onChange={(event) =>
                  setNewPassword({
                    ...userNewPassword,
                    newPassword: event.target.value,
                  })
                }
              />
              <Form.Text className="text-muted text-left">
                Password should be minimum 8 characters. It must contain at
                least 1 of each of the following: Lower Case, Upper Case,
                Digits, Special Characters ( !@#$%^&* ).
              </Form.Text>
              <Form.Control.Feedback className="text-left" type="invalid">
                Please enter a correct password format.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                onBlur={validationFormField}
                onKeyUp={validationFormField}
                onChange={(event) =>
                  setNewPassword({
                    ...userNewPassword,
                    confirmPassword: event.target.value,
                  })
                }
              />
              <Form.Control.Feedback type="invalid" className="text-left">
                Password and confirm password will be same.
              </Form.Control.Feedback>
            </Form.Group>
            <div className="pb-3">
              <CloudflareTurnstile
                setCfToken={setCfToken}
                cfTokenCall={cfTokenCall}
                formName="SignUp Form"
              />
            </div>
            <div>
              <Button
                variant="secondary"
                type="submit"
                className={`text-uppercase ${
                  windowObj && windowSize.width <= 767 ? "btn-block" : "btn-lg"
                }`}
              >
                Set New Password
              </Button>
              <I18nLink href="/customer/forgotpassword">
                <Button
                  variant="link"
                  type="button"
                  className={`mt-3 mt-md-0 d-md-inline ${
                    windowObj && windowSize.width <= 767
                      ? "btn-block"
                      : "btn-lg"
                  }`}
                >
                  Forgot Password?
                </Button>
              </I18nLink>
            </div>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default CompanyPasswordPage;
