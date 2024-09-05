import { Container, Row, Col } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const BreadCrumbs = dynamic(import("@Components/BreadCrumbs/BreadCrumbs"));
const HTMLContent = dynamic(
  () => import("@Components/Utilities/HTMLContent"),
);

const ShippingReturns = ({ shippingContent, breadcrumb = true }) => {
  //breadcrumbs
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  const crumbs = [
    { url: `/${router.query.zone_lang}`, name: "Home" },
    {
      url: `/${router.query.zone_lang}/${pathSegments[1]}`,
      name: pathSegments[1],
    },
    { url: ``, name: "Shipping", isClickable: false },
  ];
  return (
    <>
      {breadcrumb && <BreadCrumbs crumbs={crumbsCategory} />}
      {shippingContent
        ? shippingContent.map((rows) => (
            <section key={`${rows.id}_ship`} className="section-padding">
              <Container>
                <Row className="justify-content-between">
                  <Col>
                    <article>
                      <HTMLContent
                        className="m-0"
                        content={rows.description.html}
                      />
                    </article>
                  </Col>
                </Row>
              </Container>
            </section>
          ))
        : ""}
    </>
  );
};

export default ShippingReturns;
