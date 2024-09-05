import { Button, ButtonGroup, Badge } from "react-bootstrap";
import { I18nLink, LoadingIndicator } from "@Components/Utilities";
import { useManualQuery } from "graphql-hooks";
import { useContext, useState } from "react";
import SEND_EMAIL_ORDER_DETALS from "@Graphql/queries/sendEmailOrderDetails.graphql";
import reOrderAddItemInCart from "@Hooks/reOrderAddItemInCart";
import { AuthContext } from "@Contexts/AuthContext";
import { useRouter } from "next/router";

const GuestOrderDetailOverview = (props) => {
  const { notify } = useContext(AuthContext);
  const router = useRouter();
  const orderId = router.query.id;
  const [reorderitems, setReorderitems] = useState(false);

  // menu tab items
  let orderMenuItemsOrdered = {};
  let orderMenuInvoices = {};
  let orderMenuOrderShipments = {};
  orderMenuItemsOrdered = {
    title: "Items Ordered",
    icon: "items-ordered.svg",
    link: `view?id=${orderId}`,
    isActive: !!router.asPath.includes("/view"),
  };
  if (props.isInvoiced) {
    orderMenuInvoices = {
      title: "Invoices",
      icon: "invoice.svg",
      link: `invoice?id=${orderId}`,
      isActive: !!router.asPath.includes("/invoice"),
    };
  }
  if (props.isShipped) {
    orderMenuOrderShipments = {
      title: "Order Shipments",
      icon: "order-shipment.svg",
      link: `shipment?id=${orderId}`,
      isActive: !!router.asPath.includes("/shipment"),
    };
  }
  const orderRawMenus = [
    orderMenuItemsOrdered,
    orderMenuInvoices,
    orderMenuOrderShipments,
  ];
  const orderMenus = orderRawMenus.filter(
    (value) => JSON.stringify(value) !== "{}",
  );
  // API calling for email order details
  const [emailOrder, { loading: emailOrderLoading }] = useManualQuery(
    SEND_EMAIL_ORDER_DETALS.loc.source.body,
    {
      fetchPolicy: "no-cache",
      onSuccess: (data) => {
        const emailOrderData = data.data;
        // API response check and send the user token to content
        if (emailOrderData) {
          notify(emailOrderData.orderMailSend.message);
        }
      },
    },
  );
  // order email send
  const emailOrderHandler = (oId) => {
    // variables set for API call
    emailOrder({
      variables: {
        id: Number(oId),
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
  /** re order or add to cart */
  const reOrder = () => {
    setReorderitems(props.reorderItems);
  };

  /**
   * @param {cartdata} Reorder add item in cart custom hooks.
   * page redirection to cart page after successfull.
   * and return status after successfull add to cart.
   */
  const statusAddCart = reOrderAddItemInCart(reorderitems, "guestOrder");

  return (
    <>
      {/* header start */}
      <header className="mb-3">
        <h1 className="text-uppercase mb-0 d-flex align-items-center mb-2">
          <span>
            <span>Order #</span>
            <span className="pl-2">{props.incrementId}</span>
          </span>
          <Badge
            variant={props.status === "pending" ? "warning" : "success"}
            className="font-size-sm ml-3 p-2 font-weight-400"
          >
            {props.status}
          </Badge>
        </h1>
        <span className="d-block">
          {router.asPath.includes("/view") ? (
            <strong className="pr-1">Created : </strong>
          ) : null}
          <span>{props.createdAt}</span>
          {router.asPath.includes("/view") ? (
            <span className="pl-1">{`(${props.customerName})`}</span>
          ) : null}
        </span>
      </header>
      {/* header end */}

      <div className="d-flex d-md-block align-items-center justify-content-between">
        <Button
          onClick={() => reOrder()}
          variant="primary"
          className="text-uppercase mr-3"
        >
          Reorder
        </Button>
        <Button
          variant="primary"
          className="text-uppercase"
          onClick={() => {
            emailOrderHandler(orderId);
          }}
        >
          Email Order
        </Button>
      </div>

      {/* order menu start */}
      <div className="section-padding pb-3">
        <ButtonGroup className="d-flex d-xl-block">
          {orderMenus.map((item) => (
            <I18nLink href={`/sales/guest/order/${item.link}`} key={item.title}>
              <Button variant={`${item.isActive === true ? "dark" : "light"}`}>
                {item.title}
              </Button>
            </I18nLink>
          ))}
        </ButtonGroup>
      </div>
      {/* order menu end */}

      {(!statusAddCart &&
        reorderitems &&
        !statusAddCart.simpleCartAdd &&
        !statusAddCart.configureCartAdd) ||
      emailOrderLoading ? (
        <LoadingIndicator />
      ) : null}
    </>
  );
};

export default GuestOrderDetailOverview;
