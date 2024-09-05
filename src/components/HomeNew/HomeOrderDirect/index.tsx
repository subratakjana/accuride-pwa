import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { I18nLink } from "@Components/Utilities";
import NextImage from "next/legacy/image";
import { useEffect } from "react";

const HomeOrderDirect = (props) => {
  const { data } = props;
  // cards
  return (
    <>
      {data ? (
        <section className="section-padding acc-home-order-direct">
          <Container>
            <Row noGutters className="align-items-center">
              {data.length > 0
                ? data.map((items) => (
                    <Col
                      key={`${items.id}_orderdirect`}
                      xl={3}
                      md={`${items.galleryTitle ? "" : "4"}`}
                      className={`mb-5 ${
                        items.galleryTitle
                          ? "pr-0 pr-xl-4 d-flex justify-content-between d-xl-block align-items-center mb-xl-0"
                          : "mb-md-0"
                      }`}
                    >
                      {items.galleryTitle ? (
                        <h1 className="pb-1 pb-xl-4 mb-0 mb-xl-5 mb-xl-0">
                          {items.galleryTitle}
                        </h1>
                      ) : (
                        <I18nLink
                          href={items.imageButtonLink}
                          isMagentoRoute={1}
                        >
                          <article className="cursor-pointer acc-home-direct-article">
                            <h4 className="text-left text-xl-right mb-3">
                              {items.imageTitle}
                            </h4>
                            <div className="embed-responsive embed-responsive-16by9">
                              <NextImage
                                src={items.galleryImages.url}
                                alt=""
                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                                priority
                                fetchpriority="high"
                              />
                            </div>
                          </article>
                        </I18nLink>
                      )}
                      {items.galleryTitle ? (
                        <I18nLink
                          href={items.imageButtonLink}
                          isMagentoRoute={1}
                        >
                          <Button variant="outline-primary">
                            {items.imageButtonLabel}
                          </Button>
                        </I18nLink>
                      ) : null}
                    </Col>
                  ))
                : null}
            </Row>
          </Container>
        </section>
      ) : null}
    </>
  );
};

export default HomeOrderDirect;
