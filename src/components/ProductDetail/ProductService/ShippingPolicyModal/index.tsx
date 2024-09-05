import { useContext } from "react";
import { useQuery } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import { LoadingIndicator } from "@Components/Utilities";
import { termsOfSalesContent } from "@Graphql/queriesgraphcms/termsOfSale.graphql";
import Shipping from "@PageContent/TermsOfSale";

const ShippingPolicyModal = () => {
  const { notify } = useContext(AuthContext);
  const {
    loading: DSLoading,
    error,
    data,
  } = useQuery(termsOfSalesContent.loc.source.body, {
    variables: { last: 0 },
    operationName: { clientName: "graphCms" },
  });
  if (DSLoading) return <LoadingIndicator />;
  if (error) {
    notify(error.message, "error");
  }
  return (
    <Shipping
      TermsOfSaless={data && data.termsOfSales}
      breadcrumb={false}
      scrollToShippingStatus={true}
    />
  );
};

export default ShippingPolicyModal;
