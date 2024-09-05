import { useContext, useState } from "react";
import { AuthContext } from "@Contexts/AuthContext";
import { useMutation } from "graphql-hooks";
import { guestCartmarge } from "@Graphql/queries/guestCartmarge.graphql";

const guestCartMarge = (data, utmCampaign, utmMedium) => {
  const { notify, addCart, cartId, cartList, token, simpleRedirect } =
    useContext(AuthContext);
  const [guestCartId, setGuestCartId] = useState("");

  /**
   * for completeAddcart status handling
   */
  const [completeHooks, setCompleteHooks] = useState(false);
  const [statusAddCart, setStatusAddCart] = useState({});

  /**
   * read car details before login.
   */
  if (cartId !== "null" && cartList > 0 && token === null) {
    setTimeout(() => {
      if (guestCartId === "") setGuestCartId(cartId);
    }, 1000);
  }

  /**
   * after successfull login.
   * guest cart and user cart data marging.
   * redirect page to my account page.
   */
  const redirectPage = () => {
    // ------------- apply discount coupon --------
    if (!data.redirectPath) {
      if (
        utmCampaign.utmCampaign === "abandoned-cart" &&
        utmMedium.utmMedium === "email"
      ) {
        simpleRedirect("/checkout/cart");
      } else {
        simpleRedirect("/customer/account");
      }
    } else {
      simpleRedirect(data.redirectPath);
    }
  };

  const [guestCartmargeFn] = useMutation(guestCartmarge.loc.source.body, {
    onSuccess: (data1) => {
      const res = data1.data;
      addCart(res.mergeCarts.total_quantity);
      setTimeout(() => {
        redirectPage();
      }, 500);
      setStatusAddCart({
        ...statusAddCart,
        configureCartAdd: true,
        simpleCartAdd: true,
      });
    },
  });

  /**
   * add **guest** simple cart and configure cart data to user cart.
   */
  if (data.cartData && guestCartId !== "" && !completeHooks) {
    setCompleteHooks(true);
    const newCartId = data.cartData.createEmptyCart;
    guestCartmargeFn({
      variables: {
        source_cart_id: guestCartId,
        destination_cart_id: newCartId,
      },
    }).then(({ error }) => {
      if (error) {
        if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          notify(error.graphQLErrors[0].message, "error");
        } else {
          notify("Please check your network connection!", "error");
        }
        setStatusAddCart({
          ...statusAddCart,
          configureCartAdd: true,
          simpleCartAdd: true,
        });
        redirectPage();
      }
    });
  }

  if (guestCartId === "" && data.cartData && cartList === 0 && !completeHooks) {
    setCompleteHooks(true);
    setStatusAddCart({
      ...statusAddCart,
      configureCartAdd: true,
      simpleCartAdd: true,
    });
    redirectPage();
  }

  return { completeHooks, statusAddCart };
};

export default guestCartMarge;
