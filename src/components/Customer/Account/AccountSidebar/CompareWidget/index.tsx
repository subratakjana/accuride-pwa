import { I18nLink } from "@Components/Utilities";
import { Button } from "react-bootstrap";
import { IoIosClose } from "react-icons/io";

const compareItems = [1, 2, 3];
const CompareWidget = () => (
  <section className="acc-compare-sidebar section-padding pb-0">
    <h2 className="text-uppercase mb-3">
      Compare Products
      <span className="font-size-md text-medium"> (3 items)</span>
    </h2>

    <ul className="acc-compare-list">
      {compareItems.map((item) => (
        <li
          key={item}
          className="d-flex justify-content-between align-items-start"
        >
          <I18nLink href="#" isMagentoRoute={1}>
            <a aria-label="link" className="text-primary">
              {" "}
              Medium-Duty LInear Track System
            </a>
          </I18nLink>
          <I18nLink href="#" isMagentoRoute={1}>
            <a aria-label="link" className="text-primary h2 flex-none m-0">
              <IoIosClose />
            </a>
          </I18nLink>
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-between align-items-center">
      <Button variant="primary" size="sm" className="text-uppercase">
        Compare
      </Button>
      <Button variant="primary" size="sm" className="text-uppercase">
        Clear All
      </Button>
    </div>
  </section>
);

export default CompareWidget;
