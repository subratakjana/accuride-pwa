import { Container } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import styles from "./ContactBar.module.scss";

const ContactBar = ({ content, customStyle }) => {
  return (
    // TODO: shouldn't have nested a tag inside Link component
    <I18nLink href={content.link} isMagentoRoute={0}>
      <a
        className={`${styles["acc-contact-bar"]} text-center d-block py-3 ${
          customStyle ? customStyle : ""
        }`}
      >
        <Container>
          <p className="mb-0 display-4 text-secondary">
            <span className="d-block d-md-inline">{content.barText}</span>
            <span
              className={`${styles["acc-contact-bar-separator"]} px-2 px-md-3`}
            >
              •
            </span>
            <strong className="font-weight-700">{content.contactNumber}</strong>
          </p>
        </Container>
      </a>
    </I18nLink>
  );
};
export default ContactBar;
