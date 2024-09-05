import CompanyAccount from "@PageContent/Customer/CompanyAccount";

const CreateAccountPage = () => <CompanyAccount />;

export const getServerSideProps = async () => {
    const seodata = {
        seoTitle: "New Company",
        secKeywords: "",
        description: "",
        content: "NOINDEX,NOFOLLOW",
    };
    return {
        props: { seodata },
    };
};

export default CreateAccountPage;
