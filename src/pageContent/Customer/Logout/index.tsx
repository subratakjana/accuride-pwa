import { Container } from "react-bootstrap";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation } from "graphql-hooks";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LoadingIndicator } from "@Components/Utilities";
import { createEmptyCart } from "@Graphql/queries/createEmptyCart.graphql";
import { ProductCompareContext } from "@Contexts/ProductCompareContext";

import styles from "./Logout.module.scss";

const Logout = () => {
  const router = useRouter();
  const { clearCProducts } = useContext(ProductCompareContext);
  const [showLoader, setShowLoader] = useState(false);
  // using auth context
  const { notify, setToken, setCartId, addCart } = useContext(AuthContext);
  // API calling for cart id
  const [createEmptyCartFn, { loading: loadingCart }] = useMutation(
    createEmptyCart.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setShowLoader(true);
        notify("You have successfully logged out");
        setCartId(data.createEmptyCart);
        addCart(0);
        // after a time interval redirect to hompage
        setTimeout(() => {
          if (router.query.msg == 1)
            router.push(`/${router.query.zone_lang}/customer/login`);
          else router.push(`/${router.query.zone_lang}`);
          setShowLoader(false);
        }, 1000);
      },
    },
  );

  useEffect(() => {
    setToken();
    localStorage.removeItem("shippingData");
    localStorage.removeItem("guest_shipping_address_cart");
    localStorage.removeItem("guestSignIn");
    localStorage.removeItem("userDetails");

    localStorage.removeItem("cartList");
    localStorage.removeItem("finalTotal");
    localStorage.removeItem("couponData");
    localStorage.removeItem("priceData");
    localStorage.removeItem("cartId");
    localStorage.removeItem("sliUserId");
    localStorage.removeItem("checkoutActonData");
    localStorage.removeItem("orderid");
    localStorage.removeItem("guestOrderDetails");
    localStorage.removeItem("zone");
    localStorage.removeItem("locale");
    localStorage.removeItem("userAuthToken");
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
    clearCProducts();
  }, []);

  return (
    <>
      <section
        className={`${styles["acc-logout"]} text-center section-padding d-flex align-items-center`}
      >
        <Container>
          <h1>You are signed out</h1>
          <span className="d-block">
            You have signed out and will go to our homepage in 5 seconds.
          </span>
        </Container>
        {loadingCart || showLoader ? <LoadingIndicator /> : ""}
      </section>
    </>
  );
};

export default Logout;
