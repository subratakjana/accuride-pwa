import { useRouter } from "next/router";
import TermsOfSale from "@PageContent/TermsOfSale";
import CaliforniaProp65 from "@PageContent/CaliforniaProp65Page";
import Privacy from "@PageContent/Privacy";
import Warranty from "@PageContent/Warranty";
import Error from "../../pages/_error";

const CmsSingle = ({
  p65warningsData,
  warrantyData,
  termsData,
  privacyData,
}) => {
  const router = useRouter();
  const pageName = router.query.id;

  return pageName === "terms-of-sale" ? (
    <TermsOfSale key="ter" TermsOfSaless={termsData} />
  ) : (
    [
      pageName === "p65warnings-california" ? (
        <CaliforniaProp65 key="cal" CaliforniaProp65es={p65warningsData} />
      ) : (
        [
          pageName === "privacy" ? (
            <Privacy key="priv" privacys={privacyData} />
          ) : (
            [
              pageName === "warranty" ? (
                <Warranty key="warr" warranties={warrantyData} />
              ) : (
                <Error statusCode={404} />
              ),
            ]
          ),
        ]
      ),
    ]
  );
};

export default CmsSingle;
