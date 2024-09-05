import { useContext } from "react";
import Warranty from "@PageContent/Warranty";
import { useQuery } from "graphql-hooks";
import { AuthContext } from "@Contexts/AuthContext";
import { LoadingIndicator } from "@Components/Utilities";
import { warrantyContent } from "@Graphql/queriesgraphcms/warranty.graphql";

const WarrantyModal = () => {
  const { notify } = useContext(AuthContext);
  const {
    loading: DSLoading,
    error,
    data,
  } = useQuery(warrantyContent.loc.source.body, {
    variables: { last: 0 },
    operationName: { clientName: "graphCms" },
  });
  if (DSLoading) return <LoadingIndicator />;
  if (error) {
    notify(error.message, "error");
  }
  return <Warranty warranties={data && data.warranties} breadcrumb={false} />;
};
export default WarrantyModal;
