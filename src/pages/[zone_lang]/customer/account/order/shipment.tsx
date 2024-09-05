import Shipment from "@PageContent/Customer/Account/Order/Shipment";
import gqlFetch from "@Graphql/Utilities/gqlFetch";
import GET_CUSTOMER_ORDER_DETAILS from "@Graphql/queries/getCustomerOrderDetails.graphql";

const ShipmentPage = ({ orderDetail }) => (
  <Shipment orderDetail={orderDetail} />
);

export const getServerSideProps = async ({ res, req, query }) => {
  let notFound = false;
  let getResponse = null;
  let seodata = null;

  if (!req.cookies.userAuthToken || req.cookies.userAuthToken === "null") {
    res.statusCode = 401;
  } else if (query && query.id) {
    const getData = await gqlFetch(
      GET_CUSTOMER_ORDER_DETAILS,
      { id: query.id },
      "MAGENTO",
      "en-us",
      req.cookies.userAuthToken,
    );
    getResponse = getData.data.orderDetails;

    if (getResponse) {
      seodata = {
        seoTitle: `Order # ${getResponse.increment_id}`,
        secKeywords: "",
        description: "",
      };
    }
  } else {
    notFound = true;
  }
  if (!getResponse) notFound = true;
  return {
    props: { orderDetail: getResponse, seodata },
    notFound,
  };
};

export default ShipmentPage;
