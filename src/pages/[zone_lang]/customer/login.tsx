import Login from "@PageContent/Customer/Login";

const CartPage = () => <Login />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: "Customer Login",
        secKeywords: "",
        seoDescription:
            "Access your Accuride account. Manage orders, view product information, and stay connected with the latest updates in motion hardware solutions.",
        content: "NOINDEX,NOFOLLOW",
    };
    return {
        props: { seodata },
    };
};

export default CartPage;
