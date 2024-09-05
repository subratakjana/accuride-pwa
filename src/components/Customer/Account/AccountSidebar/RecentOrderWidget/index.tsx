import { I18nLink } from "@Components/Utilities";
import { Button } from "react-bootstrap";

const orders = [1, 2, 3];
const RecentOrderWidget = () => (
  <section className="acc-recentorder-sidebar section-padding pb-0">
    <h2 className="text-uppercase mb-3">Recently Ordered </h2>

    <ul className="acc-recentorder-list">
      {orders.map((item) => (
        <li key={item}>
          <I18nLink href="#" isMagentoRoute={1}>
            <a aria-label="link" className="text-primary">
              Light-Duty Undermount Slide with Disconnect
            </a>
          </I18nLink>
        </li>
      ))}
    </ul>
    <div className="d-flex justify-content-between align-items-center">
      <Button variant="secondary" size="sm" className="text-uppercase">
        Add to Cart
      </Button>
      <Button variant="primary" size="sm" className="text-uppercase">
        View All
      </Button>
    </div>
  </section>
);

export default RecentOrderWidget;
