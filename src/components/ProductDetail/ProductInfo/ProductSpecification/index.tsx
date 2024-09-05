import dynamic from "next/dynamic";

const HTMLContent = dynamic(() => import("@Components/Utilities/HTMLContent"));

const ProductSpecification = (props) => (
  <HTMLContent id="specification" content={props.specification} />
);

export default ProductSpecification;
