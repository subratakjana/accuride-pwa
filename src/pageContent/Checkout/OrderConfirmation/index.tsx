import { useContext, useEffect, useState } from "react";
import { createEmptyCart } from "@Graphql/queries/createEmptyCart.graphql";
import { Container, Button } from "react-bootstrap";
import { LoadingIndicator, I18nLink } from "@Components/Utilities";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation, useQuery, useManualQuery } from "graphql-hooks";
import { getStoreConfig } from "@Graphql/queries/getStoreConfig.graphql";
import WEB_FORM_DETAILS from "@Graphql/queries/getWebFormDetails.graphql";
import useWindowDimensions from "@Hooks/windowDimention";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const OrderConfirmation = () => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const formId = process.env.NEXT_PUBLIC_ORDER_CONFIRMATION_FORMID;
  /** subscription webform details */
  const { data: dataWebForm } = useQuery(WEB_FORM_DETAILS.loc.source.body, {
    fetchPolicy: "no-cache",
    variables: {
      formId,
    },
  });

  /**
   * ACTon form data submit
   * @param {*} actionFormData
   */
  const actOnDataSubmit = (actionFormData) => {
    const actOnLink = actionFormData;
    const actonIframe = document.getElementById("actonIframe");
    if (actonIframe) actonIframe.remove();
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = actOnLink;
    iframe.id = "actonIframe";
    iframe.title = "actonIframe";
    document.body.appendChild(iframe);
    setTimeout(() => {
      const isActonIframe = document.getElementById("actonIframe");
      if (isActonIframe) isActonIframe.remove();
    }, 4000);
  };

  /**
   * submit newsletter action data
   */
  const submitActonNewsletter = (actonEmail) => {
    let actionFormData = `${dataWebForm.getWebForms.act_on_url}?submitForm_${dataWebForm.getWebForms.webform_id}=1&webform_id=${dataWebForm.getWebForms.webform_id}&form_key=${dataWebForm.getWebForms.form_key}&`;
    actionFormData += `email=${encodeURIComponent(actonEmail)}&`;
    dataWebForm.getWebForms.webformfields.map((item) => {
      if (item.field_type === "hidden") {
        actionFormData += `${item.field_code}=${encodeURIComponent(
          item.field_hidden_value,
        )}&`;
      }
      return item;
    });
    actOnDataSubmit(actionFormData);
  };

  const submitConfirmOrderActonData = (checkoutActonUrl) => {
    const checkoutActonData = JSON.parse(localStorage.checkoutActonData);
    let actionFormData = `${checkoutActonUrl}?`;
    actionFormData += `First Name=${checkoutActonData.firstname}&Last Name=${checkoutActonData.lastname}&`;
    actionFormData += `Email Address=${checkoutActonData.email}&Company=${checkoutActonData.company}&`;
    actionFormData += `Phone Number=${checkoutActonData.telephone}&Optin=${checkoutActonData.emailSubs}&`;
    actionFormData +=
      "sens-acton-sales-channel=eCommerce&sens-acton-source=Website&sens-ad-group=null&sens-ad-id=null&sens-content=null&sens-keyword=null&";
    actionFormData +=
      "sens-lead-status=Open&sens-marketing-campaign=null&sens-marketing-source=null&sens-medium=null";
    actOnDataSubmit(actionFormData);
    if (checkoutActonData.emailSubs)
      submitActonNewsletter(checkoutActonData.email);
    localStorage.removeItem("checkoutActonData");
  };

  const [getCheckoutActonUrlFn, { loading: actOnUrlLoading }] = useManualQuery(
    getStoreConfig.loc.source.body,
    {
      onSuccess: (data) => {
        const res = data.data;
        // setCheckoutActonUrl(res.storeConfig.checkoutActonUrl);
        if (localStorage.checkoutActonData)
          submitConfirmOrderActonData(res.storeConfig.checkoutActonUrl);
      },
    },
  );

  useEffect(() => {
    getCheckoutActonUrlFn();
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  const { cartId, simpleRedirect, setCartId, notify, addCart, token, encode } =
    useContext(AuthContext);

  useEffect(() => {
    if (!token) localStorage.setItem("prvCartId", cartId);
  }, [token]);

  const [prvCartId] = useState(cartId);
  const billingId = windowObj ? localStorage.getItem("orderid") : "";
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
      name: "Order Confirmation",
    },
  ];

  // API calling for cart id
  const [createEmptyCartFn, { loading: gotoHome }] = useMutation(
    createEmptyCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setCartId(data.createEmptyCart);
        addCart(0);
      },
    },
  );

  const clearData = () => {
    simpleRedirect("/products/shop");
    localStorage.removeItem("orderid");
  };

  /**
   * ready a lolcal data for guest sign in
   */
  const readyGuestSignInData = () => {
    const orderId = localStorage.getItem("orderid");
    if (orderId && localStorage.checkoutActonData) {
      const checkoutActonData = JSON.parse(localStorage.checkoutActonData);
      localStorage.setItem(
        "guestSignIn",
        JSON.stringify({
          orderId,
          email: checkoutActonData.email,
          fName: checkoutActonData.firstname,
          lName: checkoutActonData.lastname,
        }),
      );
    }
  };

  useEffect(() => {
    localStorage.removeItem("cartList");
    localStorage.removeItem("finalTotal");
    localStorage.removeItem("couponData");
    localStorage.removeItem("shippingData");
    localStorage.removeItem("priceData");
    localStorage.removeItem("cartId");
    readyGuestSignInData();
    createEmptyCartFn().then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
      }
    });
  }, []);
  return (
    <>
      <BreadCrumbs crumbs={crumbs} />
      <Container className="section-padding acc-order-confirmation pt-xl-5">
        <article className="d-md-flex flex-md-column align-items-md-center justify-content-md-center">
          <header className="mb-3">
            <h1
              className={`mb-0 ${
                windowObj && windowSize.width > 1024
                  ? "text-uppercase text-primary"
                  : "text-dark"
              }`}
            >
              THANK YOU FOR YOUR PURCHASE!{" "}
            </h1>
          </header>
          <span className="d-block mb-3">
            Your order id is:&nbsp;#
            <span className="text-dark font-weight-bold">{billingId}</span>
          </span>
          <span className="d-block">
            We’ll email you an order confirmation with details and tracking
            info.
          </span>
          <div>
            <Button
              variant="primary"
              block={!(windowObj && windowSize.width >= 768)}
              className="d-md-inline mt-3"
              onClick={clearData}
            >
              CONTINUE SHOPPING
            </Button>
            {!token && (
              <I18nLink
                href={`/customer/companyaccount?oid=${encode(
                  billingId,
                )}&cid=${encode(prvCartId)}`}
              >
                <Button
                  variant="primary"
                  type="submit"
                  className={`text-uppercase mt-3 ml-md-3 d-md-inline ${
                    windowObj && windowSize.width <= 767 ? "btn-block" : ""
                  }`}
                >
                  Create Account
                </Button>
              </I18nLink>
            )}
          </div>
        </article>
        {gotoHome || actOnUrlLoading ? <LoadingIndicator /> : ""}
      </Container>
    </>
  );
};

export default OrderConfirmation;
