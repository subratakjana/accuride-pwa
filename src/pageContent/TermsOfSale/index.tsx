import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);
const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));

const TermsOfSale = ({
  TermsOfSaless,
  breadcrumb = true,
  scrollToShippingStatus = false,
}) => {
  //breadcrumb
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  let crumbs = [];
  let removeSpeChar = router.asPath.split("/");
  if (removeSpeChar[removeSpeChar.length - 1].includes("?")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("?")[0],
      },
    ];
  }

  if (removeSpeChar[removeSpeChar.length - 1].includes("#")) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: removeSpeChar[removeSpeChar.length - 1].split("#")[0],
      },
    ];
  }
  if (
    removeSpeChar[removeSpeChar.length - 1].includes("?") === false &&
    removeSpeChar[removeSpeChar.length - 1].includes("#") === false
  ) {
    crumbs = [
      { url: `/${router.query.zone_lang}`, name: "Home" },
      {
        url: `/${router.query.zone_lang}/${pathSegments[1]}`,
        name: pathSegments[1],
      },
    ];
  }
  return (
    <>
      {breadcrumb && <BreadCrumbs crumbs={crumbs} />}
      {TermsOfSaless
        ? TermsOfSaless.map((rows) => (
            <div key={`tos_${rows.id}`}>
              <section className="section-padding">
                <Container>
                  <HTMLContent
                    className="m-0"
                    content={rows.description.html}
                    scrollToShipping={scrollToShippingStatus}
                  />
                </Container>
              </section>
            </div>
          ))
        : ""}
    </>
  );
};

export default TermsOfSale;
