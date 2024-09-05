import dynamic from "next/dynamic";
import YotpoScript from "@Components/Utilities/YotpoScript";

const Cart = dynamic(import("@PageContent/Checkout/Cart"));

const CartPage = () => <Cart />;

export const getServerSideProps = async ({ params }) => {
  const seodata = {
    seoTitle: "Shopping Cart",
    secKeywords: "",
    description: "",
    yotpoScript: YotpoScript(params.zone_lang, true),
  };

  return {
    props: { seodata },
  };
};

export default CartPage;
