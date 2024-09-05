import ForgotPassword from "@PageContent/Customer/ForgotPassword";

const ForgotPasswordPage = () => <ForgotPassword />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: "Forgot Your Password?",
        secKeywords: "",
        description: "",
        content: "NOINDEX,NOFOLLOW",
    };
    return {
        props: { seodata },
    };
};

export default ForgotPasswordPage;
