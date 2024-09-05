import { Container, Row, Col } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { I18nLink } from "@Components/Utilities";
import styles from "./IconListingSection.module.scss";

const IconListingSection = ({
  iconList,
  sectionHeading,
  customStyle,
  pageName = false,
}) => {
  return (
    <Container
      className={`section-padding text-center ${
        customStyle ? customStyle : ""
      }`}
    >
      {sectionHeading
        ? [
            pageName && pageName === "home" ? (
              <h1
                className={`display-4 font-weight-700 text-primary ${styles["acc-icon-list-section-heading"]} font-family-secondary mb-4 mb-md-5`}
              >
                {sectionHeading}
              </h1>
            ) : (
              <h2
                className={`display-4 font-weight-700 text-primary ${styles["acc-icon-list-section-heading"]} font-family-secondary mb-4 mb-md-5`}
              >
                {sectionHeading}
              </h2>
            ),
          ]
        : null}
      <Row xs={2} sm={3} md={4} xl={5} className={styles["acc-icon-list-row"]}>
        {iconList &&
          iconList.map((item) => (
            <Col
              key={item.id}
              className={`${styles["acc-icon-list-item"]} text-uppercase`}
            >
              {item.link ? (
                <I18nLink href={item.link} isMagentoRoute={0}>
                  <a>
                    <ReactSVG
                      src={item.icon.url}
                      className={`${styles["acc-icon"]} mb-2 mb-md-3`}
                    />
                    <h3 className="font-family-secondary">{item.title}</h3>
                  </a>
                </I18nLink>
              ) : (
                <>
                  <ReactSVG
                    src={item.icon.url}
                    className={`${styles["acc-icon"]} mb-2 mb-md-3`}
                  />
                  <h3 className="font-family-secondary text-primary">
                    {item.title}
                  </h3>
                </>
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};
export default IconListingSection;
