import { createContext, useState, useEffect, useContext } from "react";
import { useMutation, useManualQuery } from "graphql-hooks";
import { cartDetailsForQuentity } from "@Graphql/queries/cartDetailsForQuentity.graphql";
import { createEmptyCart } from "@Graphql/queries/createEmptyCart.graphql";
import GET_CUSTOMER_ACCOUNT_DETAILS from "@Graphql/queries/getCustomerAccountDetails.graphql";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { setCookie } from "@Hooks/criptoEncodeDecodeCookie";
import { ZoneContext } from "@Contexts/ZoneContext";
import { LocaleContext } from "@Contexts/LocaleContext";

export const AuthContext = createContext({
  notify: () => null,
  token: null,
  setToken: () => null,
  cartId: null,
  setCartId: () => null,
  cartList: 0,
  addCart: () => null,
  isAuthUser: () => false,
  simpleRedirect: () => false,
  goToLogin: () => null,
  getCustomerDetailsFn: () => null,
  window: null,
  loadWebFormEmail: false,
  setLoadWebFormEmail: () => null,
  setUserDetails: () => null,
});

export const AuthProvider = (props) => {
  const router = useRouter();
  const { zone } = useContext(ZoneContext);
  const { locale } = useContext(LocaleContext);

  // --- setting window varialble -----
  const [_window, setWindow] = useState(null);
  const [loggedCustomerData, setLoggedCustomerData] = useState(null);

  /** first time load webform set by context */
  const [loadWebFormEmail, setLoadWebFormEmail] = useState();

  // ------- setting user token --------
  const [token, setToken] = useState(() => {
    try {
      const userAuthToken =
        window.localStorage.getItem("userAuthToken") === "null"
          ? null
          : window.localStorage.getItem("userAuthToken");
      return userAuthToken || null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router.asPath]);

  /** just simple go to login page redirection */
  const gotToLoginPage = () => {
    const asPath = `/${router.query.zone_lang}/customer/login`;
    const pathName = "/[zone_lang]/customer/login";
    const accountPath = "/[zone_lang]/customer/account";
    const accountAsPath = `/${router.query.zone_lang}/customer/account`;
    setTimeout(() => {
      if (!token)
        router.push({ pathname: `${pathName}` }, `${asPath}`, {
          shallow: true,
        });
      if (token)
        router.push({ pathname: `${accountPath}` }, `${accountAsPath}`, {
          shallow: true,
        });
    });
  };

  /**
   * auth handling in header
   */
  const authHandling = () => {
    const urlPath = router.asPath.split("/").indexOf("account");
    if (urlPath > 0 && (!token || token === null)) {
      gotToLoginPage();
    }
  };
  /** Base64 Encoding */
  const Base64Encode = (getStr) => {
    if (getStr) {
      const bufferObjEncode = Buffer.from(getStr, "utf8");
      const encodedString = bufferObjEncode.toString("base64");
      return encodedString;
    }
    return null;
  };
  /** Base64 Decoding */
  const Base64Decode = (getStr) => {
    if (getStr) {
      const bufferObjDecode = Buffer.from(getStr, "base64");
      const decodedString = bufferObjDecode.toString("utf8");
      return decodedString;
    }
    return null;
  };
  // ------- checking cart id --------
  const [cartId, setCartId] = useState(() => {
    try {
      const usercartId = window.localStorage.getItem("cartId");
      return usercartId || null;
    } catch (error) {
      return null;
    }
  });

  // ------- setting cart items --------
  const [cartList, addCart] = useState(0);
  useEffect(
    () =>
      addCart(() => {
        try {
          return JSON.parse(window.localStorage.getItem("cartList")) || 0;
        } catch (error) {
          return 0;
        }
      }),
    [],
  );

  /**
   * store user details
   * @param {*}
   */
  const [userDetails, setUserDetails] = useState(() => {
    try {
      const getUserDetail =
        window.localStorage.getItem("userDetails") === "null"
          ? null
          : window.localStorage.getItem("userDetails");
      return getUserDetail || null;
    } catch (error) {
      return null;
    }
  });

  // get user IP address

  const toastOptions = {
    toastId: "accuride",
    autoClose: 5000,
    hideProgressBar: true,
    position: "top-right",
    pauseOnHover: true,
    enableMultiContainer: false,
  };

  const provider = {
    simpleRedirect: (pagePath, getQuery = "") => {
      const zoneLang = `${locale}-${zone}`;
      const asPath = `/${zoneLang}${pagePath}`;
      router.push(
        {
          pathname: `/[zone_lang]${pagePath}`,
          query: { getQuery },
        },
        `${asPath}`,
        { shallow: true },
      );
    },
    notify: (_message, _type = "success") => {
      if (_type === "success") toast.success(_message, toastOptions);
      else if (_type === "error") toast.error(_message, toastOptions);
      else if (_type === "warn") toast.warn(_message, toastOptions);
    },
    token,
    setToken: (userToken) => {
      if (userToken) {
        setToken(userToken);
        window.localStorage.setItem("userAuthToken", userToken);
        setCookie("userAuthToken", userToken, 30);
      } else {
        setToken(null);
      }
    },
    cartId,
    setCartId: (cartid) => {
      setCartId(cartid);
    },
    cartList,
    addCart: (totalNo) => {
      addCart(totalNo);
    },
    isAuthUser: () => {
      authHandling();
    },
    goToLogin: () => {
      gotToLoginPage();
    },
    getCustomerDetailsFn: () => {
      getCustomerDetails();
    },
    encode: (str) => {
      const encodeStr = Base64Encode(str);
      return encodeStr;
    },
    decode: (str) => {
      const decodeStr = Base64Decode(str);
      return decodeStr;
    },
    userDetails,
    setUserDetails: (userData) => {
      setUserDetails(userData);
      window.localStorage.setItem("userDetails", userData);
    },
    window: _window,
    setLoadWebFormEmail: (flag) => {
      setLoadWebFormEmail(flag);
    },
    loadWebFormEmail,
    loggedCustomerData,
  };

  // API calling to generate cart list
  const [cartDetailsFn] = useManualQuery(
    cartDetailsForQuentity.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        addCart(data.cart.total_quantity);
        window.localStorage.setItem("cartList", data.cart.total_quantity);
      },
      skipCache: true,
    },
  );

  // API calling for cart id
  const [createEmptyCartFn] = useMutation(createEmptyCart.loc.source.body, {
    fetchPolicy: "no-cache",
    onSuccess: (res) => {
      const { data } = res;
      window.localStorage.setItem("cartId", data.createEmptyCart);
      setCartId(data.createEmptyCart);
      cartDetailsFn({ variables: { cartId: data.createEmptyCart } }).then(
        ({ error }) => {
          if (error) {
            setCartId(null);
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              console.log(error.graphQLErrors[0].message, "error");
            } else if (error.fetchError) {
              console.log(error);
            } else {
              provider.notify("Please check your network connection!", "error");
            }
          }
        },
      );
    },
  });

  // ------- set local storage in useeffect hooks -------
  useEffect(() => {
    // ------- checking cartId exist or not on local storage -------
    if (cartId === null || cartId === "null") {
      createEmptyCartFn().then(({ error }) => {
        if (error) {
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            provider.notify(error.graphQLErrors[0].message, "error");
          } else if (error.fetchError) {
            console.log(error);
          } else {
            provider.notify("Please check your network connection!", "error");
          }
        }
      });
    } else {
      cartDetailsFn({ variables: { cartId } }).then(({ error }) => {
        if (error) {
          setCartId(null);
          if (error.graphQLErrors && error.graphQLErrors.length > 0) {
            console.log(error.graphQLErrors[0].message, "error");
          } else if (error.fetchError) {
            console.log(error);
          } else {
            provider.notify("Please check your network connection!", "error");
          }
        }
      });
    }
    if (cartId) window.localStorage.setItem("cartId", cartId);
  }, [cartId]);

  // --- setting window ----
  useEffect(() => {
    setWindow(typeof window !== "undefined" ? window : null);
    // For remove the remember data from existing user, code will be romove after 1 or 2build.
    localStorage.removeItem("remember");
  }, []);

  // ------- setting Logged User Details --------
  const [getCustomerDetails] = useManualQuery(
    GET_CUSTOMER_ACCOUNT_DETAILS.loc.source.body,
    {
      onSuccess: (res) => {
        const { data } = res;
        setLoggedCustomerData(data);
      },
      skipCache: true,
    },
  );

  useEffect(() => {
    function checkCartId() {
      const getCartId = localStorage.getItem("cartId");
      if (getCartId) {
        setCartId(getCartId);
      }
    }
    window.addEventListener("storage", checkCartId);
    return () => {
      window.removeEventListener("storage", checkCartId);
    };
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("userAuthToken")) {
      getCustomerDetails({ variables: { key: Date.now() } }).then(
        ({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              console.log(error.graphQLErrors[0].message, "error");
            } else if (error.fetchError) {
              console.log(error);
            } else {
              provider.notify("Please check your network connection!", "error");
            }
          }
        },
      );
    }
  }, [token, cartId]);

  return (
    <AuthContext.Provider value={provider}>
      {props.children}
      <ToastContainer />
    </AuthContext.Provider>
  );
};
