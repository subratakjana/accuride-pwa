import { useEffect } from "react";
import parse from "html-react-parser";

const HTMLContent = (props) => {
  const content = parse(props.content);
  const cls = props.class;

  useEffect(() => {
    if (content != null && props.scrollToShipping === true) {
      const element = document.querySelector(".acc-shipping-policy");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return <div className={cls}>{content}</div>;
};

export default HTMLContent;
