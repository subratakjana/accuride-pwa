import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ProductFeature = (props) => (
  <HTMLContent id="feature" content={props.feature} />
);

export default ProductFeature;
