import useWindowDimensions from "@Hooks/windowDimention";
import { Container, Form, Button } from "react-bootstrap";
import { useEffect, useState, useContext } from "react";
import { useMutation } from "graphql-hooks";
import { GetSalesGuestOrderStatusquery } from "@Graphql/queries/getGuestOrderStatus.graphql";
import { useRouter } from "next/router";
import { AuthContext } from "@Contexts/AuthContext";
import { LoadingIndicator } from "@Components/Utilities";

const GuestForm = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [orderBy, setOrderBy] = useState("email");
  const [validated, setValidated] = useState(false);
  const router = useRouter();
  const { notify, token, simpleRedirect } = useContext(AuthContext);
  const [formData, setFormData] = useState();
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const [getSalesGuestOrderStatus, { loading }] = useMutation(
    GetSalesGuestOrderStatusquery.loc.source.body,
  );

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
    if (targetObj.value === "") {
      targetObj.classList.add("is-invalid");
    } else {
      targetObj.classList.remove("is-invalid");
    }
  };

  const viewOrderDetails = (orderData) => {
    const zoneLang = router.query.zone_lang;
    const querySign = "?";
    const pageQuery = `id=${orderData.order_id}`;
    window.localStorage.setItem("guestOrderDetails", JSON.stringify(orderData));
    router.push(
      {
        pathname: "/[zone_lang]/sales/guest/order/view",
        query: { id: orderData.order_id },
      },
      `/${zoneLang}/sales/guest/order/view${querySign}${pageQuery}`,
      { shallow: true },
    );
  };

  /**
   * for order deatils guser user form
   */
  const guestOrderForm = (e) => {
    e.preventDefault();
    const orderForm = e.currentTarget;
    let newFormData = {};
    for (let i = 0; i < orderForm.elements.length; ) {
      const field = orderForm.elements[i];
      const formField = field.name;
      if (formField !== "") {
        newFormData = { ...newFormData, [formField]: field.value };
      }
      i += 1;
    }
    setFormData(newFormData);
    if (orderForm.checkValidity()) {
      setValidated(true);
      getSalesGuestOrderStatus({
        variables: {
          orderId: newFormData.orderId,
          billing_lastname: newFormData.billing_lastname,
          billing_user_email: newFormData.billing_user_email
            ? newFormData.billing_user_email
            : "",
          billing_zip_code: newFormData.billing_zip_code
            ? newFormData.billing_zip_code
            : "",
        },
      })
        .then((res) => {
          if (res.data.GetSalesGuestOrderStatus.order_id) {
            viewOrderDetails(res.data.GetSalesGuestOrderStatus);
          }
        })
        .catch((error) => {
          const { graphQLErrors, networkError } = error;
          if (graphQLErrors && graphQLErrors.length > 0) {
            const gqlError = graphQLErrors.map((item) => item.message);
            notify(gqlError[0], "error");
          } else if (networkError) {
            notify("Please check your network connection!", "error");
          }
        });
    }
  };

  if (token) simpleRedirect("/customer/account");
  if (loading || token) return <LoadingIndicator />;

  return (
    <>
      <section className="section-padding">
        <Container>
          {/* header start */}
          <header className="mb-3 text-center text-md-left">
            <h1 className="text-uppercase">Orders and Returns</h1>
          </header>
          {/* header end */}

          <Form
            name="guestOrder"
            validated={validated}
            onSubmit={guestOrderForm}
            className={`${windowObj && windowSize.width > 768 ? "w-50" : ""}`}
          >
            <Form.Group>
              <Form.Label>
                Order ID
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Control
                name="orderId"
                onBlur={validationFormField}
                onKeyUp={validationFormField}
                type="text"
                defaultValue={formData ? formData.orderId : ""}
                required
              />
              <Form.Control.Feedback type="invalid" className="text-left">
                This is a required field..
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Billing Last Name
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Control
                name="billing_lastname"
                onBlur={validationFormField}
                onKeyUp={validationFormField}
                type="text"
                defaultValue={formData ? formData.billing_lastname : ""}
                required
              />
              <Form.Control.Feedback type="invalid" className="text-left">
                This is a required field..
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Find Order By
                <span className="text-danger"> *</span>
              </Form.Label>
              <Form.Control
                name="orderBy"
                as="select"
                required
                onBlur={validationFormField}
                onKeyUp={validationFormField}
                onChange={(e) => setOrderBy(e.target.value)}
                defaultValue={formData ? formData.orderBy : ""}
              >
                <option value="email">Email</option>
                <option value="zip">Zip Code</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid" className="text-left">
                This is a required field..
              </Form.Control.Feedback>
            </Form.Group>
            {orderBy === "email" ? (
              <Form.Group>
                <Form.Label>
                  Email
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  name="billing_user_email"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  type="email"
                  defaultValue={formData ? formData.billing_user_email : ""}
                  required
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field..
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}

            {orderBy === "zip" ? (
              <Form.Group>
                <Form.Label>
                  Zip Code
                  <span className="text-danger"> *</span>
                </Form.Label>
                <Form.Control
                  name="billing_zip_code"
                  onBlur={validationFormField}
                  onKeyUp={validationFormField}
                  type="text"
                  defaultValue={formData ? formData.billing_zip_code : ""}
                  required
                />
                <Form.Control.Feedback type="invalid" className="text-left">
                  This is a required field..
                </Form.Control.Feedback>
              </Form.Group>
            ) : null}
            <Button
              variant="secondary"
              type="submit"
              className={`text-uppercase ${
                windowObj && windowSize.width <= 767 ? "btn-block" : "btn-lg"
              }`}
            >
              Continue
            </Button>
          </Form>
        </Container>
      </section>
    </>
  );
};
export default GuestForm;
