import { Spinner } from "react-bootstrap";
import styles from "./LoadingIndicator.module.scss";

const LoadingIndicator = (props) => {
  const { message = "", className = "" } = props;
  const additionalClasses = className ? className.split(" ") : [];

  const combinedClasses = [
    styles["acc-fullLoader"],
    ...additionalClasses.map((classItem) => styles[classItem] || classItem),
  ].join(" ");

  return (
    <div className={`${combinedClasses}`}>
      <Spinner animation="grow" variant="primary" />
      <p className="m-2 font-weight-500">{message}</p>
    </div>
  );
};
export default LoadingIndicator;
