import { Button } from "react-bootstrap";
import { I18nLink } from "@Components/Utilities";
import useWindowDimensions from "@Hooks/windowDimention";
import { useEffect, useState } from "react";

const AccountInformation = (props) => {
  const windowSize = useWindowDimensions();
  const [windowObj, updateWindowObj] = useState(false);
  useEffect(() => {
    if (windowSize.width !== 0) updateWindowObj(true);
  }, []);
  return (
    <section>
      <header
        className={`mb-3 pb-xl-2 border-medium ${
          windowObj && windowSize.width > 1024 ? "border-bottom" : ""
        }`}
      >
        <h2 className="text-uppercase mb-0">Account Information</h2>
      </header>
      <h5 className="font-weight-700 text-dark mb-2">Contact Information</h5>
      <span className="d-block">{`${props.firstName} ${props.lastName}`}</span>
      <span className="d-block">{props.email}</span>
      <footer className="mt-3 d-flex align-items-center">
        <I18nLink href="/customer/account/edit">
          <Button variant="primary" className="text-uppercase">
            Edit
          </Button>
        </I18nLink>
        <I18nLink href="/customer/account/edit?changepas">
          <Button variant="primary" className="text-uppercase ml-2">
            Change Password
          </Button>
        </I18nLink>
      </footer>
    </section>
  );
};
export default AccountInformation;
