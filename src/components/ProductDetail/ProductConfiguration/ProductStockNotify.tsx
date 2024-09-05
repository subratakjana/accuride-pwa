import { useContext, useState, useEffect } from "react";
import { useMutation, useManualQuery } from "graphql-hooks";
import { Button, Form, Col, Modal } from "react-bootstrap";
import { getStockNoticeProductData } from "@Graphql/queries/getStockNoticeProductData.graphql";
import { subscribeStockNotice } from "@Graphql/queries/subscribeStockNotice.graphql";
import { unsubscribeStockNotice } from "@Graphql/queries/unsubscribeStockNotice.graphql";
import { getStockNoticeConfiguration } from "@Graphql/queries/getStockNoticeConfiguration.graphql";
import { AuthContext } from "@Contexts/AuthContext";
import useWindowDimensions from "@Hooks/windowDimention";
import { LoadingIndicator } from "@Components/Utilities";

const ProductStockNotify = (props) => {
  const { product, parentProduct, checkStockId, parentProductId } = props;
  const { notify, decode, token } = useContext(AuthContext);
  const config = { storeId: 1 }; // This code will remove after multicurrency deployment
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  const [openNotify, setOpenNotify] = useState({
    notify: false,
    subscribed: false,
  });
  const [guestNotify, setGuestNotify] = useState({
    notify: false,
    subscribed: false,
  });
  const [confirmUnsubscribe, setConfirmUnsubscribe] = useState(false);
  const [stockNoticeData, setStockNoticeData] = useState(null);
  const handleClose = () => setConfirmUnsubscribe(false); // close the confirmation modal

  /**
   * get login user stock notfication subscribed status
   */
  const [getStockNoticeConfig, { loading: StockNoticeConfig }] = useManualQuery(
    getStockNoticeConfiguration.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const resData = data.data;
        const addToCartBtn = document.querySelector(".addToCartBtn");
        const productType = parentProduct.configuration.__typename;
        if (
          stockNoticeData &&
          stockNoticeData.product_stock_alert &&
          resData.getStockNoticeConfiguration.allow_stock
        ) {
          if (stockNoticeData.has_email_subscribed)
            setOpenNotify({ ...{ subscribed: true } });
          else setOpenNotify({ ...{ notify: true } });
          if (productType === "ConfigurableProduct" && addToCartBtn) {
            addToCartBtn.setAttribute("disabled", true);
            addToCartBtn.classList.add("btn-medium", "forceDisabled");
          }
        } else if (productType === "ConfigurableProduct") {
          addToCartBtn.setAttribute("disabled", true);
          addToCartBtn.classList.add("btn-medium", "forceDisabled");
        }
      },
    },
  );

  const [getStockNotice, { loading: loadingStockNotice }] = useManualQuery(
    getStockNoticeProductData.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const res = data.data;
        setStockNoticeData(res.getStockNoticeProductData.product_data[0]);
        getStockNoticeConfig({
          variables: {
            storeId: config.storeId,
          },
        });
      },
    },
  );

  /**
   * stock notification mutation query submission
   */
  const [subscribeStockNotification, { loading: loadingSubscribeStockNotice }] =
    useMutation(subscribeStockNotice.loc.source.body, {
      onSuccess: (res) => {
        const { data } = res;
        if (data.subscribeStockNotice.length === 0) {
          setOpenNotify({ ...{ subscribed: true } });
          notify(
            "You have successfully subscribed to the notification",
            "success",
          );
        } else {
          notify(data.subscribeStockNotice[0].message, "error");
        }
      },
    });

  /**
   * unsubscribed stock notice
   */
  const [
    unsubscribeStockNotification,
    { loading: loadingUnSubscribeStockNotice },
  ] = useMutation(unsubscribeStockNotice.loc.source.body, {
    onSuccess: (res) => {
      const { data } = res;
      if (data.unsubscribeStockNotice.length === 0) {
        setOpenNotify({ ...{ notify: true } });
        notify("Unsubscribe successful", "success");
      } else notify(data.unsubscribeStockNotice[0].message, "error");
    },
  });

  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);

  /**
   * check stock notification for the product
   */
  useEffect(() => {
    if (config && checkStockId) {
      getStockNotice({
        variables: {
          product_id: decode(checkStockId),
          website_id: config.storeId,
        },
      });
    } else setOpenNotify({ ...{ notify: true } });
  }, [checkStockId]);

  /**
   * submit for stock notification
   */

  /**
   * stock subscription form data handling and submission
   * @param {*} e
   */
  const submitNotify = (e, productId, parentId) => {
    e.preventDefault();
    if (guestNotify.subscribed) {
      // unsubscribedStockNotify();
    } else {
      const emailValue = e.target.querySelector(".notifyEmail").value;
      const subscribeVariables = {
        product_id: decode(productId),
        parent_id: decode(parentId),
        website_id: config.storeId,
        email: emailValue,
      };
      subscribeStockNotification({ variables: { ...subscribeVariables } }).then(
        ({ error }) => {
          if (error) {
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              notify(error.graphQLErrors[0].message, "error");
            } else {
              notify("Please check your network connection!", "error");
            }
          }
        },
      );
    }
  };

  /**
   * unsubscribed Stock Notify with confirmation modal
   */
  const unsubscribedStockNotify = () => {
    setConfirmUnsubscribe(true);
  };

  /**
   * confirm unsubscribed product notification
   */
  const confirmedUnsubscribe = () => {
    setConfirmUnsubscribe(false);
    unsubscribeStockNotification({
      variables: {
        product_id: decode(checkStockId),
        parent_id: decode(parentProductId),
        website_id: config.storeId,
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
  };

  return (
    <>
      {openNotify.notify && (
        <Form onSubmit={(e) => submitNotify(e, checkStockId, parentProductId)}>
          <Form.Label>
            Please enter email to
            {guestNotify.subscribed ? " unsubscribe " : " subscribe "}
            for stock alert
          </Form.Label>
          <Form.Row>
            <Form.Group
              as={Col}
              className={
                parentProduct.configuration.__typename === "GroupedProduct"
                  ? "m-0"
                  : ""
              }
            >
              <Form.Control
                required
                type="email"
                className="text-left notifyEmail text-align-last"
                name="notifyEmail"
                placeholder="Your Email"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className={
                parentProduct.configuration.__typename === "GroupedProduct"
                  ? "m-0"
                  : ""
              }
            >
              {!guestNotify.subscribed && (
                <Button
                  type="submit"
                  variant="primary"
                  block={!(windowObj && windowSize.width >= 768)}
                  className="text-uppercase"
                >
                  Notify Me
                </Button>
              )}
            </Form.Group>
          </Form.Row>
        </Form>
      )}

      {openNotify.subscribed && (
        <div
          className={`d-flex align-items-center ${
            parentProduct.configuration.__typename === "GroupedProduct"
              ? "mb-0"
              : "mb-3"
          }`}
        >
          <div>Subscribed to stock alert</div>
          <Button
            type="submit"
            onClick={unsubscribedStockNotify}
            variant="primary"
            block={!(windowObj && windowSize.width >= 768)}
            className="text-uppercase ml-2"
          >
            Unsubscribe
          </Button>
        </div>
      )}

      {loadingStockNotice ||
      loadingSubscribeStockNotice ||
      loadingUnSubscribeStockNotice ||
      StockNoticeConfig ? (
        <LoadingIndicator />
      ) : null}

      {/* delete item modal start */}
      <Modal show={confirmUnsubscribe} onHide={handleClose} centered>
        <Modal.Body>
          <span>
            Are you sure you want to unsubscribe the stock notification?
          </span>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            className="m-0 ml-2 text-uppercase"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={confirmedUnsubscribe}
            className="m-0 ml-2 text-uppercase"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
      {/* delete modal end */}
    </>
  );
};

export default ProductStockNotify;
