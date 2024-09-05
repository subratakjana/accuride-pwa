import { Container, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { useMutation } from "graphql-hooks";
import CHANGE_PASSWORD_QUERY from "@Graphql/queries/changePassword.graphql";
import { LoadingIndicator } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import CloudflareTurnstile from "@Components/Utilities/CloudflareTurnstile";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const ChangePassword = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [userNewPassword, setNewPassword] = useState();
  const [cfToken, setCfToken] = useState(null);
  const [cfTokenCall, setCfTokenCall] = useState(1);
  const { notify, goToLogin, simpleRedirect } = useContext(AuthContext);
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  //breadcrumbs
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
      isClickable: false,
    },
    { url: ``, name: "Change Password", isClickable: false },
  ];
  useEffect(() => {
    if (!router.query.token) {
      const windowPathname = router.pathname;
      const lastPathIndx = windowPathname.lastIndexOf("/");
      const lastPath = windowPathname.substring(lastPathIndx + 1);
      if (lastPath === "changepassword") simpleRedirect("/customer/login");
    }
  }, [router]);

  /** on blur and on key each form field check validation */
  const validationFormField = (e) => {
    const targetObj = e.target;
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
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD_QUERY.loc.source.body,{
      onSuccess: (res) => {
        const { data } = res;
        if (data) {
          notify(data.changePassword.message, "success");
          goToLogin();
        }
      },
    },
  );

  // form submition method
  const forgotPasswwordForm = (event) => {
    event.preventDefault();
    const newPasswordForm = event.currentTarget;
    if (
      newPasswordForm.checkValidity() === true &&
      userNewPassword.newPassword === userNewPassword.confirmPassword &&
      userNewPassword.newPassword.length >= 7
    ) {
      setValidated(true);
      changePassword({
        variables: {
          id: router.query.id,
          newPassword: userNewPassword.newPassword,
          confirmPassword: userNewPassword.confirmPassword,
          newPasswordToken: router.query.token,
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

  if (loading) return <LoadingIndicator />;

  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <section className="section-padding">
        <Container>
          {/* header start */}
          <header className="mb-3 text-center text-md-left">
            <h1 className="mb-3 text-uppercase">Change Your Password</h1>
            <span className="d-block">Please enter your new password.</span>
          </header>
          {/* header end */}

          <Form
            validated={validated}
            onSubmit={forgotPasswwordForm}
            className={`${windowObj && windowSize.width > 768 ? "w-50" : ""}`}
          >
            <Form.Group>
              <Form.Control
                required
                type="password"
                placeholder="Password"
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
            <input type="hidden" name="cf-token" value={cfToken} />
            <div>
              <div className="pb-3">
                <CloudflareTurnstile
                  setCfToken={setCfToken}
                  cfTokenCall={cfTokenCall}
                  formName="Change Password Form"
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
              Set New Password
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};

export default ChangePassword;
